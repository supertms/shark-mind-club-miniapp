# TabBar 图标说明

## 图标要求

小程序 tabBar 需要以下图标文件：

### 图标尺寸
- **尺寸**: 81x81px (像素)
- **格式**: PNG
- **背景**: 透明

### 需要的图标文件

1. **首页图标**
   - `home.png` - 未选中状态（灰色 #9ca3af）
   - `home-active.png` - 选中状态（黄色 #FFED00）

2. **排行榜图标**
   - `ranking.png` - 未选中状态（灰色 #9ca3af）
   - `ranking-active.png` - 选中状态（黄色 #FFED00）

3. **我的图标**
   - `profile.png` - 未选中状态（灰色 #9ca3af）
   - `profile-active.png` - 选中状态（黄色 #FFED00）

## 图标设计建议

### 首页图标 (home)
- 使用房子图标
- 未选中：灰色线条图标
- 选中：黄色填充或黄色线条图标

### 排行榜图标 (ranking)
- 使用柱状图/图表图标
- 未选中：灰色线条图标
- 选中：黄色填充或黄色线条图标

### 我的图标 (profile)
- 使用用户头像图标
- 未选中：灰色线条图标
- 选中：黄色填充或黄色线条图标

## 如何添加图标

1. 准备图标文件（可以使用设计工具如 Figma、Sketch、Photoshop 等）
2. 将图标文件保存为 PNG 格式，尺寸为 81x81px
3. 将文件放入 `miniprogram/images/tabbar/` 目录
4. 确保文件名与 app.json 中的配置一致

## 临时方案

如果暂时没有图标文件，小程序会显示文字标签，功能正常，只是没有图标显示。

## 图标资源

你可以从以下资源获取图标：
- [IconFont](https://www.iconfont.cn/)
- [Flaticon](https://www.flaticon.com/)
- [Icons8](https://icons8.com/)
- 或者使用设计工具自行设计