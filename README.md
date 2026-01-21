# 鲨曼 Shark Mind Club - 德州扑克俱乐部应用

> 完整的俱乐部管理应用，包含点餐系统、德州扑克座位预约、积分排行榜、个人中心等核心功能

## 🎯 项目概述

这是一个为"鲨曼 Shark Mind Club"德州扑克俱乐部设计的Web应用，采用黑色背景+黄色强调色的设计风格。

**设计宽度**：750px（标准微信小程序设计稿宽度）  
**目标平台**：微信小程序（当前为Web版本，需要迁移）

## ✨ 核心功能

### 🏠 首页模块
- 俱乐部欢迎页
- 店内活动预览（今日特色、明日预告、持续进行中）
- 扫码参加比赛 ⭐（需要微信扫码API）
- 快捷功能入口：
  - 🍽️ 点餐系统
  - 📍 到店指引
  - 🚗 停车指引
  - 📖 比赛规则
  - 🎁 奖励说明
  - 📸 店铺环境
  - 💬 意见反馈
- 本周最受关注选手

### 🏆 排行榜模块
- 多维度排行榜：月榜、周榜、季榜、年榜、胜率榜
- 玩家战绩展示（胜场、总场次、胜率）
- 玩家评价系统（10种评价标签）
- 点赞互动功能

### 👤 我的模块
- 用户信息展示（昵像、昵称、战绩）
- 金币系统（1元=1金币）
- 积分系统（100积分=1金币）
- 积分兑换功能
- 充值功能（微信支付）
- 历史订单（即将开放）
- 玩家生涯（即将开放）
- 评价设置
- 邀请好友

### 🍽️ 点餐系统
- 商品分类浏览（零食、酒水、饮料等）
- 购物车管理
- 金币支付
- 进行中订单实时展示
- 预计送达时间

### 📷 扫码参赛功能 ⭐（最新）
- 登录后显示扫码入口
- 调用微信扫码API
- 后端验证二维码有效性
- 成功后显示精美提示界面
- 显示祝福语："技术领先，绿色竞技 / Shark Mind Club 预祝您夺冠！"

## 🛠️ 技术栈

### 当前版本（Web）
- **框架**：React 18.3.1
- **语言**：TypeScript
- **样式**：Tailwind CSS v4
- **图标**：Lucide React
- **Toast提示**：Sonner
- **动画**：Motion (Framer Motion)
- **构建工具**：Vite

### 目标版本（微信小程序）
推荐使用以下技术栈：
- **框架**：Taro（React语法，迁移成本低）
- **UI库**：Taro UI 或 Vant Weapp
- **小程序API**：wx.login, wx.scanCode, wx.requestPayment 等

## 📦 项目结构

```
src/
├── app/
│   ├── App.tsx                        # 主应用组件
│   ├── components/
│   │   ├── HomePage.tsx               # 首页 ⭐
│   │   ├── RankingPage.tsx            # 排行榜
│   │   ├── ProfilePage.tsx            # 我的
│   │   ├── OrderPage.tsx              # 点餐页面
│   │   ├── OrderModal.tsx             # 点餐弹窗
│   │   ├── BottomNavigation.tsx       # 底部导航
│   │   ├── ScanSuccessModal.tsx       # 扫码成功弹窗 ⭐
│   │   ├── WeChatLoginModal.tsx       # 登录弹窗
│   │   ├── EventsModal.tsx            # 活动弹窗
│   │   ├── LocationGuideModal.tsx     # 到店指引
│   │   ├── ParkingGuideModal.tsx      # 停车指引
│   │   ├── CompetitionRulesModal.tsx  # 比赛规则
│   │   ├── RewardsGuideModal.tsx      # 奖励说明
│   │   ├── StoreEnvironmentModal.tsx  # 店铺环境
│   │   ├── PlayerEvaluationModal.tsx  # 玩家评价
│   │   ├── InviteRewardModal.tsx      # 邀请好友
│   │   ├── PointsModal.tsx            # 积分兑换
│   │   └── ... (其他组件)
│   ├── data/
│   │   └── mockData.ts                # 模拟数据
│   └── ...
├── styles/
│   ├── theme.css                      # 主题样式
│   └── fonts.css                      # 字体样式
└── imports/
    └── (图片资源)
```

## 🚀 快速开始

### 前置要求
- Node.js 16+
- npm 或 yarn 或 pnpm

### 安装依赖
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发运行
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 📚 完整文档

### 交付文档（共4份）

1. **📘 HANDOVER_DOCUMENT.md** - 技术交接文档
   - 项目概述和设计规范
   - 技术栈迁移指南（Web → 小程序）
   - 核心功能详细说明
   - 微信API集成指南

2. **📗 API_REFERENCE.md** - API接口文档
   - 完整的后端接口定义
   - 请求/响应数据格式
   - 所有功能模块的接口
   - 错误码说明

3. **📙 COMPONENTS_GUIDE.md** - 组件清单与代码组织指南
   - 所有组件的详细说明
   - 组件功能、状态、Props接口
   - 数据流转说明
   - Taro框架迁移建议

4. **📋 CODE_FILES_CHECKLIST.md** - 代码文件清单
   - 完整的文件列表
   - 每个文件的作用说明
   - 开发优先级建议

5. **📦 EXPORT_GUIDE.md** - 导出指南
   - 如何导出项目
   - 手动导出步骤

## 🎨 设计规范

### 颜色方案
- **主背景色**：`#000000` (纯黑)
- **卡片背景色**：`#1a1a1a`, `#2a2a2a`
- **主题色（黄色）**：`#FFED00`, `#FFD700`
- **文字颜色**：
  - 主文字：`#ffffff`
  - 次要文字：`#9ca3af`, `#6b7280`

### 圆角规范
- 小圆角: 8px
- 中圆角: 12px
- 大圆角: 16px
- 超大圆角: 24px

### 间距规范
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 20px

## 🔐 重要说明

### 合规性
- ✅ 本俱乐部采取线下快速锦标赛模式
- ✅ 所有奖励均为无价值奖励，不可兑换不可销售
- ✅ 拒绝赌博，绿色竞技
- ✅ Figma Make不适合收集PII或存储敏感数据

### 数据说明
- 当前使用模拟数据（mockData.ts）
- 生产环境需要对接真实后端API
- 所有API接口定义见 API_REFERENCE.md

## 📱 微信小程序迁移

### 推荐使用 Taro 框架
```bash
# 安装Taro CLI
npm install -g @tarojs/cli

# 创建Taro项目（选择React模板）
taro init shark-mind-club-miniapp
```

### 需要集成的微信API
- `wx.login()` - 用户登录
- `wx.getUserProfile()` - 获取用户信息
- `wx.scanCode()` - 扫码参赛 ⭐
- `wx.requestPayment()` - 微信支付
- `wx.openLocation()` - 打开地图
- `wx.shareAppMessage()` - 分享给好友
- `wx.showToast()` - 提示信息

详细说明请参考 **HANDOVER_DOCUMENT.md**

## 🎯 开发优先级

### 第一阶段：核心框架
- [ ] 主应用框架（App.tsx）
- [ ] 底部导航（三个Tab）
- [ ] 首页基础布局
- [ ] 排行榜基础布局
- [ ] 我的页面基础布局

### 第二阶段：核心功能
- [ ] 微信登录集成
- [ ] 扫码参赛功能 ⭐
- [ ] 点餐系统
- [ ] 金币/积分系统
- [ ] 玩家评价系统

### 第三阶段：完善功能
- [ ] 所有弹窗组件
- [ ] 后端API对接
- [ ] 微信支付集成
- [ ] 分享功能

### 第四阶段：优化与测试
- [ ] 性能优化
- [ ] 各机型适配
- [ ] 小程序审核合规
- [ ] 上线发布

## 🆕 最新更新

### 2026-01-20
- ✅ 新增扫码参赛功能
- ✅ 创建 ScanSuccessModal 组件
- ✅ 完善交付文档
- ✅ 添加导出指南

## 📞 技术支持

如有任何技术问题，请参考完整文档或联系项目负责人。

---

**项目版本**：v1.0  
**最后更新**：2026-01-20  
**适用范围**：鲨曼 Shark Mind Club 德州扑克俱乐部应用
