# 鲨曼 Shark Mind Club - 微信小程序开发交接文档

## 📋 项目概述

这是一个德州扑克俱乐部的管理应用，包含以下核心功能：
- 🏠 **首页**：店内活动、到店指引、停车指引、比赛规则等
- 🏆 **排行榜**：月榜、周榜、季榜、年榜、胜率榜
- 👤 **我的**：个人信息、金币系统、积分兑换、充值系统
- 🍽️ **点餐系统**：完整的餐饮点单流程
- 📷 **扫码参赛**：扫码加入比赛功能

## 🎨 设计规范

### 颜色方案
- **主背景色**：`#000000` (纯黑)
- **卡片背景色**：`#1a1a1a`, `#2a2a2a`
- **主题色（黄色）**：`#FFED00`, `#FFD700`
- **文字颜色**：
  - 主文字：`#ffffff`
  - 次要文字：`#9ca3af`, `#6b7280`
- **其他强调色**：
  - 粉色：`#FF6B9D`
  - 绿色：用于成功状态
  - 蓝色：用于信息提示

### 屏幕规格
- **设计宽度**：750px (标准微信小程序设计稿宽度)
- **响应式适配**：需适配各种设备，特别是iPhone 16等小屏设备
- **重要原则**：所有界面不应出现横向滚动，核心功能区域无需纵向滚动

---

## 🔧 技术栈迁移指南

### 当前技术栈（Web版本）
- **框架**：React 18.3.1
- **样式**：Tailwind CSS v4
- **图标**：Lucide React
- **Toast提示**：Sonner
- **构建工具**：Vite

### 需要迁移到微信小程序
使用以下小程序技术栈：
- **框架选择**：
  - 原生小程序（WXML + WXSS + JS）
  - 或 uni-app（可复用部分React代码逻辑）
  - 或 Taro（React语法，迁移成本最低）

---

## 📱 核心功能说明

### 1. 登录系统
**文件**：`WeChatLoginModal.tsx`

**功能说明**：
- 显示微信登录引导弹窗
- 需要调用微信小程序登录API

**需要集成的微信API**：
```javascript
// 微信登录
wx.login({
  success: (res) => {
    // res.code 发送到后端换取 openid 和 session_key
  }
})

// 获取用户信息
wx.getUserProfile({
  desc: '用于完善会员资料',
  success: (res) => {
    // res.userInfo 包含用户昵称、头像等
  }
})
```

---

### 2. 扫码参赛功能 ⭐
**文件**：`ScanSuccessModal.tsx`, `HomePage.tsx`

**功能说明**：
- 用户点击"扫码参加比赛"按钮
- 调用微信扫码接口
- 扫码成功后弹出成功提示界面

**需要集成的微信API**：
```javascript
// 在 HomePage.tsx 的扫码按钮点击事件中
wx.scanCode({
  onlyFromCamera: true, // 只允许从相机扫码
  scanType: ['qrCode'], // 只支持二维码
  success: (res) => {
    // res.result 是扫码结果
    // 发送到后端验证二维码是否有效
    // 如果有效，显示 ScanSuccessModal
    setShowScanSuccessModal(true);
  },
  fail: (err) => {
    // 扫码失败处理
    wx.showToast({
      title: '扫码失败',
      icon: 'none'
    });
  }
})
```

**UI界面**：
- 绿色勾号图标 ✓
- "扫码成功" 标题
- "您已加入比赛" 副标题
- 祝福语：技术领先，绿色竞技 / Shark Mind Club 预祝您夺冠！
- 黄色渐变确定按钮

---

### 3. 点餐系统
**文件**：`OrderPage.tsx`, `OrderModal.tsx`

**功能说明**：
- 分类浏览商品（零食、酒水等）
- 加入购物车、修改数量
- 使用金币支付
- 查看进行中订单和订单历史

**数据结构**：
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  icon: string;
  description?: string;
}

interface Order {
  id: string;
  items: { productId: string; quantity: number; }[];
  totalPrice: number;
  status: 'pending' | 'preparing' | 'completed';
  orderTime: number;
}
```

**需要的后端接口**：
- `GET /api/products` - 获取商品列表
- `POST /api/orders` - 创建订单
- `GET /api/orders/active` - 获取进行中订单
- `GET /api/orders/history` - 获取历史订单

---

### 4. 积分/金币系统
**文件**：`ProfilePage.tsx`

**功能说明**：
- 显示用户金币余额
- 积分兑换金币（100积分=1金币）
- 充值金币（微信支付）

**需要集成的微信API**：
```javascript
// 微信支付
wx.requestPayment({
  timeStamp: '',
  nonceStr: '',
  package: '',
  signType: 'MD5',
  paySign: '',
  success: (res) => {
    // 支付成功，更新金币余额
  },
  fail: (err) => {
    // 支付失败处理
  }
})
```

---

### 5. 排行榜系统
**文件**：`RankingPage.tsx`

**功能说明**：
- 多维度排行榜：月榜、周榜、季榜、年榜、胜率榜
- 玩家评价系统（点赞标签）

**数据结构**：
```typescript
interface Player {
  id: string;
  rank: number;
  name: string;
  wins: number;
  totalGames: number;
  winRate: number;
  prize: string;
  avatar?: string;
}
```

---

## 🎯 关键迁移要点

### 1. 路由导航
**Web版本**使用状态切换页面：
```typescript
const [currentPage, setCurrentPage] = useState<'home' | 'ranking' | 'profile'>('home');
```

**小程序版本**需要改为：
- 使用小程序的 TabBar 配置
- 或使用页面路由 `wx.navigateTo()`, `wx.switchTab()`

### 2. 样式系统
**Tailwind CSS** → **WXSS**

常用类名转换参考：
```
bg-black          → background: #000000;
text-white        → color: #ffffff;
rounded-xl        → border-radius: 12px;
p-4               → padding: 16px;
flex              → display: flex;
items-center      → align-items: center;
gap-3             → gap: 12px; (或使用 margin)
```

建议：
- 提取公共样式到全局 WXSS
- 使用 rpx 单位适配不同屏幕（750rpx = 设计稿宽度）

### 3. 图标处理
**Lucide React图标** → 小程序图标方案：
- 方案A：使用 emoji（如当前设计：📷、🍽️、📍）
- 方案B：使用小程序图标库（如 Vant Weapp）
- 方案C：导出SVG转为图片引用

### 4. Toast提示
**Sonner** → **wx.showToast**

```javascript
// Web版本
toast.success('操作成功');
toast.error('操作失败');
toast.info('功能开发中，敬请期待！');

// 小程序版本
wx.showToast({
  title: '操作成功',
  icon: 'success'
});

wx.showToast({
  title: '功能开发中，敬请期待！',
  icon: 'none'
});
```

### 5. 弹窗组件
所有 `Modal` 组件需要改为小程序的：
- 使用 `<view>` + 样式实现自定义弹窗
- 或使用 `wx.showModal()` 实现简单确认框

---

## 📊 数据模拟与API对接

### 当前使用模拟数据
**文件**：`src/app/data/mockData.ts`

包含的模拟数据：
- `mockUser` - 用户信息
- `eventsData` - 店内活动
- `weekRankingData`, `monthRankingData` 等 - 排行榜数据
- `products` - 商品列表
- `playerEvaluationsData` - 玩家评价数据

### 需要对接的后端API清单

#### 用户相关
- `POST /api/auth/login` - 微信登录
- `GET /api/user/profile` - 获取用户信息
- `POST /api/user/convert-points` - 积分兑换金币
- `POST /api/user/recharge` - 充值金币

#### 活动相关
- `GET /api/events` - 获取活动列表

#### 排行榜相关
- `GET /api/rankings/week` - 周榜
- `GET /api/rankings/month` - 月榜
- `GET /api/rankings/quarter` - 季榜
- `GET /api/rankings/year` - 年榜
- `GET /api/rankings/winrate` - 胜率榜

#### 点餐相关
- `GET /api/products` - 商品列表
- `POST /api/orders` - 创建订单
- `GET /api/orders/active` - 进行中订单
- `GET /api/orders/history` - 历史订单

#### 比赛相关
- `POST /api/competition/scan` - 验证扫码结果
- `GET /api/competition/my-matches` - 我的比赛记录

#### 玩家评价相关
- `GET /api/evaluations/:playerId` - 获取玩家评价
- `POST /api/evaluations/:playerId/vote` - 给玩家点赞

---

## 🖼️ 静态资源

### Logo图片
- 文件引用：`figma:asset/a0b6c5636a61e33736440ebf69782ae68beca905.png`
- 需要导出实际图片文件

### 活动图片
- 活动列表中使用了 Unsplash 图片URL
- 生产环境需要替换为实际活动图片
- 建议上传到CDN或小程序云存储

---

## ⚠️ 注意事项

### 1. 小程序限制
- 单个小程序包大小不能超过 2MB（主包）
- 总包大小不能超过 20MB
- 图片建议使用云存储，不要打包到小程序内

### 2. 性能优化
- 长列表使用 `<scroll-view>` 和虚拟列表
- 图片使用懒加载
- 避免频繁 setData

### 3. 安全问题
- 所有敏感操作需要后端验证
- 支付接口必须在后端生成签名
- 用户身份验证使用 session_key

### 4. 审核合规
- 不涉及真实货币交易（仅虚拟金币）
- 明确标注"拒绝赌博，绿色竞技"
- 所有奖励均为无价值奖励

---

## 📞 开发建议

### 推荐开发流程
1. **第一阶段**：页面框架搭建
   - 实现底部导航（首页、排行榜、我的）
   - 完成静态页面布局
   
2. **第二阶段**：核心功能开发
   - 微信登录集成
   - 扫码功能集成
   - 点餐系统开发
   
3. **第三阶段**：数据对接
   - 对接后端API
   - 替换模拟数据
   - 集成微信支付
   
4. **第四阶段**：优化与测试
   - 性能优化
   - 各机型适配测试
   - 提交审核

### 推荐使用 Taro 框架的理由
- ✅ 支持 React 语法，迁移成本低
- ✅ 可以复用大部分组件逻辑
- ✅ 一套代码多端运行（小程序 + H5）
- ✅ 有完善的 UI 组件库（Taro UI）

---

## 🔗 相关资源

- 微信小程序官方文档：https://developers.weixin.qq.com/miniprogram/dev/framework/
- Taro 官方文档：https://taro-docs.jd.com/
- Vant Weapp 组件库：https://vant-contrib.gitee.io/vant-weapp/

---

## 📝 补充说明

如有任何技术问题或需要详细代码示例，请随时联系产品/设计团队。

**文档版本**：v1.0  
**更新日期**：2026-01-20  
**适用范围**：鲨曼 Shark Mind Club 微信小程序开发
