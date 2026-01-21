# 🚀 微信小程序部署指南

## 📱 快速开始

### 1. 开发环境准备
```bash
# 确保你有以下工具：
# 1. 微信开发者工具 (下载地址: https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
# 2. Node.js (用于可能的构建工具)
```

### 2. 导入项目
1. **打开微信开发者工具**
2. **选择"小程序"项目类型**
3. **导入项目**
   - 项目目录: 选择 `miniprogram` 文件夹
   - AppID: 使用你的小程序AppID (或选择"测试号")
4. **点击"导入"**

### 3. 运行项目
1. 在开发者工具中点击"编译"按钮
2. 预览小程序效果
3. 使用模拟器测试各项功能

## 🏗️ 项目结构说明

```
miniprogram/
├── app.js              # 小程序入口，全局状态管理
├── app.json            # 页面配置，tabBar设置
├── app.wxss            # 全局样式，基础样式重置
├── pages/              # 页面文件
│   ├── home/          # 首页 - 活动展示、功能入口
│   ├── ranking/       # 排行榜 - 各种榜单展示
│   └── profile/        # 个人中心 - 用户信息管理
├── styles/             # 样式文件
│   └── common.wxss    # 公共样式库
├── data/               # 数据文件
│   └── mockData.js    # 模拟数据
└── README.md          # 项目说明文档
```

## 🎯 核心功能验证

### 首页功能测试
- [ ] 活动展示和切换
- [ ] 扫码参赛功能（模拟）
- [ ] 点餐功能入口
- [ ] 各种指引模态框
- [ ] 玩家评价展示

### 排行榜功能测试
- [ ] 标签页切换（周/月/季/年/进圈率）
- [ ] 排行榜数据展示
- [ ] 玩家评价功能
- [ ] 个人排名显示

### 个人资料功能测试
- [ ] 登录/登出功能
- [ ] 评价设置功能
- [ ] 24小时冷却机制
- [ ] 玩家评价展示

### 底部导航测试
- [ ] 页面间切换
- [ ] 激活状态显示

## 🔧 自定义配置

### 修改应用信息
编辑 `app.json`:
```json
{
  "window": {
    "navigationBarTitleText": "你的小程序名称"
  }
}
```

### 自定义配色
编辑 `styles/common.wxss`:
```css
:root {
  --primary-yellow: #你的主色调;
  --bg-black: #背景色;
}
```

### 添加新页面
1. 在 `app.json` 的 `pages` 数组中添加页面路径
2. 创建对应的页面文件夹和文件
3. 按照现有页面结构编写代码

## 🌐 API对接指南

### 当前状态
项目使用模拟数据 (`data/mockData.js`)，所有功能都是本地数据驱动。

### 真实API对接步骤

#### 1. 用户认证API
```javascript
// 在 app.js 中添加
wx.login({
  success: function (res) {
    // 调用后端API获取用户信息
    // 更新 globalData.userInfo
  }
});
```

#### 2. 数据获取API
```javascript
// 示例：获取排行榜数据
wx.request({
  url: 'https://your-api.com/ranking',
  method: 'GET',
  success: function (res) {
    // 更新页面数据
  }
});
```

#### 3. 扫码功能
```javascript
// 替换首页的扫码功能
wx.scanCode({
  success: function (res) {
    // 处理扫码结果
  }
});
```

## 📸 资源文件处理

### 图片资源
1. **下载网络图片**到 `images/` 文件夹
2. **更新代码中的图片路径**
3. **压缩图片**以减少包体积

### 图标资源
1. 使用小程序支持的格式 (PNG, JPG, SVG)
2. 建议尺寸: tabBar图标 81x81px
3. 文件命名: 英文小写，单词间用下划线

## 🐛 常见问题解决

### 1. 页面无法显示
- 检查 `app.json` 中的页面路径是否正确
- 确认所有必需文件 (js, wxml, wxss, json) 都存在

### 2. 样式不生效
- 检查WXSS文件语法
- 确认样式文件已正确导入
- 使用开发者工具的调试面板检查样式

### 3. 数据不更新
- 检查数据绑定语法 `{{dataField}}`
- 确认 `setData()` 调用正确
- 使用 `console.log()` 调试数据流

### 4. 事件不响应
- 检查事件绑定语法 `bindtap="handler"`
- 确认方法名在JS文件中存在
- 检查事件参数传递

## 🚀 发布准备

### 1. 代码审查
- [ ] 移除所有 `console.log` 语句
- [ ] 检查错误处理是否完善
- [ ] 验证所有功能在不同设备上的表现

### 2. 性能优化
- [ ] 压缩图片资源
- [ ] 移除未使用的代码
- [ ] 优化数据请求频率

### 3. 提交审核
1. 在开发者工具中点击"上传"
2. 登录微信公众平台
3. 填写版本信息和更新说明
4. 提交审核

### 4. 线上部署
- 审核通过后，在公众平台发布
- 版本更新时重复上述步骤

## 📞 技术支持

如果在部署过程中遇到问题：

1. **查看官方文档**: https://developers.weixin.qq.com/miniprogram/dev/
2. **开发者社区**: https://developers.weixin.qq.com/community/develop
3. **检查项目README**: `miniprogram/README.md`

## 🎉 恭喜！

完成以上步骤后，你就成功将React应用转换为微信小程序了！小程序具有更好的性能和用户体验，祝你开发顺利！