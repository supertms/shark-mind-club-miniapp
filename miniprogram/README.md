# 鲨曼 Shark Mind Club 小程序

这是将React应用转换为微信小程序的项目。

## 项目结构

```
miniprogram/
├── app.js              # 小程序入口文件
├── app.json            # 小程序配置文件
├── app.wxss            # 小程序全局样式
├── pages/              # 页面文件夹
│   ├── home/          # 首页
│   ├── ranking/       # 排行榜页面
│   ├── profile/       # 个人资料页面
│   ├── order/         # 订单页面
│   └── pickup/        # 取餐页面
├── components/         # 组件文件夹
│   ├── location-guide/      # 到店指引组件
│   ├── parking-guide/       # 停车指引组件
│   ├── competition-rules/   # 比赛规则组件
│   ├── rewards-guide/       # 奖励说明组件
│   └── store-environment/   # 店铺环境组件
├── utils/              # 工具函数文件夹
│   ├── request.js     # 公共请求工具（API_BASE_URL, sendRequest）
│   ├── login.js       # 登录相关工具（LoginToServer）
│   ├── player.js      # 玩家信息工具（GetPlayerInfo, UpdatePlayerAvatar, UpdatePlayerNickname）
│   └── api.js         # API请求工具（排行榜相关）
├── styles/             # 样式文件夹
│   └── common.wxss    # 公共样式
├── data/               # 数据文件夹
│   └── mockData.js    # 模拟数据（降级方案）
├── assets/             # 图片资源文件夹（WebP格式）
│   ├── logo.webp
│   ├── guide*.webp
│   ├── parking*.webp
│   └── store*.webp
└── README.md          # 项目说明
```

## 功能特性

### 已实现功能
- ✅ **首页**：活动展示、扫码参赛、点餐、各种指引
- ✅ **排行榜**：周榜、月榜、季榜、年榜、进圈率榜单（支持服务器数据）
- ✅ **个人资料**：
  - 微信登录（getUserProfile）
  - 头像更换（chooseAvatar）
  - 昵称修改（nickname input）
  - 评价设置
  - 玩家信息展示
- ✅ **底部导航**：页面切换
- ✅ **全局状态管理**：用户状态、购物车、订单、sessionId
- ✅ **响应式设计**：适配不同屏幕尺寸
- ✅ **服务器API集成**：
  - 用户登录（cmd=101）
  - 获取玩家信息（cmd=102）
  - 更新玩家信息（cmd=103）
  - 获取排行榜（cmd=105）

### 主要组件
- **location-guide**：到店指引（动态滚动高度计算）
- **parking-guide**：停车指引（动态滚动高度计算）
- **competition-rules**：比赛规则（动态滚动高度计算）
- **rewards-guide**：奖励说明（动态滚动高度计算）
- **store-environment**：店铺环境展示
- **活动模态框**：店内活动展示
- **排行榜列表**：支持多种榜单类型
- **玩家评价系统**：玩家风格标签评价
- **登录设置界面**：微信授权登录

## 开发说明

### 环境要求
- 微信开发者工具
- 支持ES6语法
- Node.js（可选，用于本地代理服务器）

### 如何运行
1. 使用微信开发者工具打开 `miniprogram` 文件夹
2. 配置 `miniprogram/utils/request.js` 中的 `API_BASE_URL`
3. 设置 `IS_DEBUG_MODE` 调试模式开关
4. 点击"编译"运行小程序

### 配置说明

#### API配置 (`miniprogram/utils/request.js`)
```javascript
// API 基础地址
const API_BASE_URL = 'http://127.0.0.1:6999/game';

// 调试模式开关
// true: 使用测试模式登录 (USER_LOGIN_TYPE_TEST)
// false: 使用微信小游戏登录 (USER_LOGIN_TYPE_WX_MINI_GAME)
const IS_DEBUG_MODE = true;
```

#### 协议定义
项目使用 Protocol Buffers 定义API协议，协议文件位于 `proto/` 目录：
- `User.proto`：用户相关协议（登录、玩家信息、用户编辑）
- `Rank.proto`：排行榜相关协议
- `CmdCode.proto`：命令码定义
- `Common.proto`：通用协议

### 数据说明
- **服务器数据**：优先使用服务器API返回的数据
- **降级方案**：API请求失败时使用 `data/mockData.js` 中的模拟数据
- **本地缓存**：用户信息、登录状态、sessionId 存储在本地
- **全局状态**：通过 `app.js` 的 `globalData` 管理

## API接口说明

### 请求格式
- **方法**：PUT
- **Content-Type**：`application/x-www-form-urlencoded`
- **数据格式**：`cmd` 和 `data` 作为表单字段提交
- **认证**：请求头中包含 `sessionId`（登录后）

### 主要接口

#### 1. 用户登录 (cmd=101)
- **请求**：`C2SUserLogin`
- **响应**：`S2CUserLogin`（包含 sessionId）
- **工具函数**：`LoginToServer(wxcode)`

#### 2. 获取玩家信息 (cmd=102)
- **请求**：`C2SGetPlayerInfo`
- **响应**：`S2CGetPlayerInfo`（包含 PlayerInfo）
- **工具函数**：`GetPlayerInfo()`

#### 3. 更新玩家信息 (cmd=103)
- **请求**：`C2SUserEdit`
  - `editType=0`：修改昵称
  - `editType=1`：修改头像
  - `editType=2`：修改电话号码
- **响应**：`S2CUserEdit`（包含更新后的 PlayerInfo）
- **工具函数**：`UpdatePlayerAvatar(avatarUrl)`, `UpdatePlayerNickname(nickname)`

#### 4. 获取排行榜 (cmd=105)
- **请求**：`C2SRankGetList`
  - `rankType`：WEEK, MONTH, DAY, WIN（枚举字符串）
  - `page`：页码
  - `pageNum`：每页数量
  - `season`：赛季号
- **响应**：`S2CRankGetList`（包含排行榜列表和我的排名）
- **工具函数**：`requestRankList(params)`

## 注意事项

### 图片资源
- 图片已转换为 WebP 格式，位于 `assets/` 目录
- 使用本地图片资源，无需网络请求
- 图片已优化压缩

### 网络请求
- 微信开发者工具对本地 IP 的 HTTP 请求可能返回 502 错误
- **解决方案**：
  1. 使用真机调试（真机可以访问内网）
  2. 使用本地代理服务器（参考 `proxy-server.js`）
  3. 使用 `127.0.0.1` 代替局域网 IP
  4. 在 `project.config.json` 中设置 `urlCheck: false`

### 样式适配
- 使用 `rpx` 单位适配不同屏幕
- 模态框滚动区域高度动态计算
- 使用 `wx.createSelectorQuery()` 获取元素实际高度
- 支持不同屏幕尺寸的自适应

### 调试模式
- 在 `miniprogram/utils/request.js` 中设置 `IS_DEBUG_MODE`
- 调试模式下使用测试账号登录（`USER_LOGIN_TYPE_TEST`）
- 生产环境应设置为 `false`，使用微信登录（`USER_LOGIN_TYPE_WX_MINI_GAME`）

## 技术栈

- **框架**: 微信小程序原生框架
- **语言**: JavaScript ES6+ (async/await)
- **样式**: WXSS (类似CSS)
- **数据**: JSON + JavaScript对象
- **状态管理**: 小程序全局数据 (`app.globalData`) + 页面数据
- **网络请求**: `wx.request` + Promise封装
- **协议**: Protocol Buffers (`.proto` 文件定义)
- **存储**: `wx.setStorageSync` / `wx.getStorageSync`

## 核心功能实现

### 微信登录流程
1. 用户点击登录按钮
2. 调用 `wx.getUserProfile()` 获取用户信息
3. 调用 `wx.login()` 获取 code
4. 调用 `LoginToServer(code)` 发送登录请求
5. 保存 `sessionId` 到全局状态和本地存储
6. 调用 `GetPlayerInfo()` 获取玩家详细信息
7. 更新页面显示

### 头像和昵称修改
- **头像**：使用 `<button open-type="chooseAvatar">` 调用微信默认头像选择
- **昵称**：使用 `<input type="nickname">` 调用微信默认昵称输入
- 修改后自动调用服务器API更新，并同步到全局状态和本地存储

### 滚动区域高度计算
- 使用 `wx.createSelectorQuery()` 查询元素实际高度
- 动态计算滚动区域高度，确保占满可用空间
- 支持延迟查询和重试机制
- 适配不同屏幕尺寸

## 后续优化

1. **性能优化**
   - 图片懒加载
   - 列表虚拟化
   - 数据分页加载
   - 请求缓存策略

2. **功能完善**
   - 订单系统完整实现
   - 支付功能集成
   - 消息推送
   - 分享功能

3. **用户体验**
   - 加载状态优化
   - 错误处理完善
   - 离线数据支持
   - 无障碍访问支持

## 许可证

本项目仅用于学习和演示目的。