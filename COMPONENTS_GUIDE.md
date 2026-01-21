# 组件清单与代码组织指南

## 📦 组件目录结构

```
src/app/components/
├── 📄 页面级组件（Pages）
│   ├── HomePage.tsx              # 首页
│   ├── RankingPage.tsx          # 排行榜页面
│   ├── ProfilePage.tsx          # 我的页面
│   ├── OrderPage.tsx            # 点餐页面
│   └── OrderModal.tsx           # 点餐弹窗（移动端全屏）
│
├── 📄 弹窗组件（Modals）
│   ├── WeChatLoginModal.tsx           # 微信登录引导弹窗
│   ├── ScanSuccessModal.tsx          # 扫码成功弹窗 ⭐
│   ├── EventsModal.tsx               # 店内活动弹窗
│   ├── LocationGuideModal.tsx        # 到店指引弹窗
│   ├── ParkingGuideModal.tsx         # 停车指引弹窗
│   ├── CompetitionRulesModal.tsx     # 比赛规则弹窗
│   ├── RewardsGuideModal.tsx         # 奖励说明弹窗
│   ├── StoreEnvironmentModal.tsx     # 店铺环境弹窗
│   ├── PlayerEvaluationModal.tsx     # 玩家评价弹窗
│   ├── InviteRewardModal.tsx         # 邀请好友奖励弹窗
│   ├── ConvertPointsModal.tsx        # 积分兑换弹窗
│   ├── RechargeModal.tsx             # 充值弹窗
│   └── EvaluationSettingsModal.tsx   # 评价设置弹窗
│
└── 📄 UI组件（UI Components）
    └── ui/
        └── sonner.tsx                 # Toast提示组件
```

---

## 🏠 1. HomePage.tsx（首页）

### 功能说明
- 展示俱乐部Logo和欢迎语
- 扫码参加比赛入口（登录后显示）⭐
- 店内活动预览
- 快捷功能入口（点餐、到店指引、停车指引等）
- 本周最受关注选手

### 主要状态
```typescript
const [showEventsModal, setShowEventsModal] = useState(false);
const [showLocationGuideModal, setShowLocationGuideModal] = useState(false);
const [showParkingGuideModal, setShowParkingGuideModal] = useState(false);
const [showCompetitionRulesModal, setShowCompetitionRulesModal] = useState(false);
const [showStoreEnvironmentModal, setShowStoreEnvironmentModal] = useState(false);
const [showRewardsGuideModal, setShowRewardsGuideModal] = useState(false);
const [showScanSuccessModal, setShowScanSuccessModal] = useState(false); // ⭐新增
const [selectedPlayer, setSelectedPlayer] = useState<{ id: string; name: string } | null>(null);
```

### 关键功能点
1. **扫码参赛按钮**（仅登录后显示）
   - 点击调用 `wx.scanCode()` 
   - 扫码成功后显示 `ScanSuccessModal`

2. **活动预览**
   - 滚动展示今日特色、明日预告、持续进行中的活动
   - 点击打开完整活动列表

3. **本周最受关注选手**
   - 自动计算点赞最多的玩家
   - 点击查看玩家详细评价

### Props接口
```typescript
interface HomePageProps {
  onNavigateToOrder: () => void;    // 跳转到点餐页面
  onInviteFriends: () => void;      // 邀请好友
  isLoggedIn: boolean;              // 是否已登录
}
```

---

## 🏆 2. RankingPage.tsx（排行榜）

### 功能说明
- 多维度排行榜切换（月榜、周榜、季榜、年榜、胜率榜）
- 展示玩家排名、战绩、胜率
- 点击玩家打开评价弹窗

### 主要状态
```typescript
const [selectedTab, setSelectedTab] = useState<'month' | 'week' | 'quarter' | 'year' | 'winrate'>('month');
const [selectedPlayer, setSelectedPlayer] = useState<{ id: string; name: string } | null>(null);
```

### 数据结构
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

### 关键功能点
1. **Tab切换**
   - 月榜、周榜、季榜、年榜、胜率榜
   - 不同榜单显示不同奖励

2. **排名展示**
   - 前3名特殊样式（金银铜）
   - 当前用户高亮显示

3. **玩家评价**
   - 点击玩家打开评价弹窗
   - 需要登录才能投票

---

## 👤 3. ProfilePage.tsx（我的页面）

### 功能说明
- 显示用户头像、昵称、战绩
- 金币和积分管理
- 积分兑换、充值入口
- 历史订单、玩家生涯（即将开放）

### 主要状态
```typescript
const [showWeChatLoginModal, setShowWeChatLoginModal] = useState(false);
const [showConvertModal, setShowConvertModal] = useState(false);
const [showRechargeModal, setShowRechargeModal] = useState(false);
const [showEvaluationSettings, setShowEvaluationSettings] = useState(false);
```

### 金币系统
- **积分 → 金币**: 100积分 = 1金币
- **充值**: 1元 = 1金币
- **用途**: 点餐、比赛报名等

### 关键功能点
1. **未登录状态**
   - 显示"点击登录"按钮
   - 点击打开微信登录弹窗

2. **登录后状态**
   - 显示用户信息和战绩
   - 金币/积分余额
   - 积分兑换和充值功能

3. **菜单功能**
   - 历史订单（即将开放）
   - 玩家生涯（即将开放）
   - 评价设置
   - 邀请好友

---

## 🍽️ 4. OrderPage.tsx（点餐页面）

### 功能说明
- 商品分类浏览（零食、酒水、饮料等）
- 购物车管理
- 金币支付
- 进行中订单展示

### 主要状态
```typescript
const [selectedCategory, setSelectedCategory] = useState('all');
const [cart, setCart] = useState<{ [key: string]: number }>({});
const [currentOrders, setCurrentOrders] = useState<Order[]>([]);
```

### 数据结构
```typescript
interface Product {
  id: string;
  name: string;
  price: number;      // 金币价格
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

### 关键功能点
1. **商品分类**
   - 全部、零食、酒、饮料、其他
   - 点击切换分类

2. **购物车**
   - 加减数量
   - 实时计算总价
   - 金币余额检查

3. **下单流程**
   - 检查金币余额
   - 扣除金币
   - 创建订单
   - 显示进行中订单

4. **进行中订单**
   - 显示订单时间
   - 显示订单商品
   - 预计送达时间

---

## 5. OrderModal.tsx（点餐弹窗）

### 功能说明
移动端全屏弹窗版本的点餐界面，功能与 OrderPage 相同

### 何时使用
- 小屏设备优化版本
- 从底部弹出的全屏弹窗
- 更好的移动端体验

---

## 📱 6. ScanSuccessModal.tsx（扫码成功弹窗）⭐

### 功能说明
扫码参赛成功后的提示界面

### UI组成
```
┌─────────────────────────┐
│                         │
│         ✓ 图标          │
│                         │
│       扫码成功          │
│      您已加入比赛       │
│                         │
│  技术领先，绿色竞技     │
│  Shark Mind Club       │
│     预祝您夺冠！        │
│                         │
│     [ 确定按钮 ]        │
│                         │
└─────────────────────────┘
```

### Props接口
```typescript
interface ScanSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}
```

### 使用场景
```typescript
// 在 HomePage.tsx 中
<button onClick={() => {
  // 调用微信扫码
  wx.scanCode({
    success: (res) => {
      // 验证二维码
      // 如果有效
      setShowScanSuccessModal(true);
    }
  });
}}>
  扫码参加比赛
</button>

<ScanSuccessModal 
  isOpen={showScanSuccessModal} 
  onClose={() => setShowScanSuccessModal(false)} 
/>
```

---

## 🔐 7. WeChatLoginModal.tsx（微信登录弹窗）

### 功能说明
引导用户进行微信登录

### 登录流程
1. 点击"点击登录"按钮
2. 弹出登录弹窗
3. 点击"微信登录"
4. 调用 `wx.login()` + `wx.getUserProfile()`
5. 获取用户信息并保存
6. 关闭弹窗

### 小程序代码示例
```javascript
wx.getUserProfile({
  desc: '用于完善会员资料',
  success: (res) => {
    // 获取用户信息
    const userInfo = res.userInfo;
    
    wx.login({
      success: (loginRes) => {
        // 发送 code 到后端
        request('/api/auth/login', {
          code: loginRes.code,
          userInfo: userInfo
        }).then(data => {
          // 保存token和用户信息
          wx.setStorageSync('token', data.token);
          wx.setStorageSync('userInfo', data.user);
        });
      }
    });
  }
});
```

---

## 🎉 8. EventsModal.tsx（店内活动弹窗）

### 功能说明
展示所有店内活动的详细信息

### 活动分类
- 今日特色（黄色标签）
- 明日预告（蓝色标签）
- 持续进行中（绿色标签）

### 数据结构
```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  time: string;
  statusTag: '今日特色' | '明日预告' | '持续进行中';
  imageUrl: string;
  rules: string[];
}
```

---

## 📍 9. LocationGuideModal.tsx（到店指引弹窗）

### 功能说明
展示如何到达店铺的详细指引

### 包含信息
- 店铺地址
- 地图（调用微信地图API）
- 公共交通指引
- 附近地标

### 调用微信地图
```javascript
wx.openLocation({
  latitude: 23.120935,
  longitude: 113.324520,
  name: '鲨曼 Shark Mind Club',
  address: '广州市天河区珠江新城保利中达广场A座2楼'
});
```

---

## 🚗 10. ParkingGuideModal.tsx（停车指引弹窗）

### 功能说明
展示停车场位置和收费标准

---

## 📖 11. CompetitionRulesModal.tsx（比赛规则弹窗）

### 功能说明
展示各类比赛的详细规则

### 比赛类型
- 常规赛
- 周赛
- 月赛
- 双人赛

---

## 🎁 12. RewardsGuideModal.tsx（奖励说明弹窗）

### 功能说明
说明各类奖励的获取方式和内容

---

## 📸 13. StoreEnvironmentModal.tsx（店铺环境弹窗）

### 功能说明
展示店铺环境图片

### 图片展示
- 轮播图或宫格展示
- 点击放大查看
- 使用 `wx.previewImage()` 预览

---

## 👥 14. PlayerEvaluationModal.tsx（玩家评价弹窗）

### 功能说明
查看和投票玩家评价标签

### 评价类型
- 稳健派
- 激进派
- 幸运星
- 技术流
- 心理战大师
- 翻盘王
- 读牌高手
- 冷静型
- bluff大师
- 计算器

### 投票规则
- 需要登录
- 每个标签只能投一次
- 可以取消投票

### Props接口
```typescript
interface PlayerEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerId: string;
  playerName: string;
  isLoggedIn: boolean;
}
```

---

## 🎁 15. InviteRewardModal.tsx（邀请好友弹窗）

### 功能说明
展示邀请好友的奖励机制

### 奖励规则
- 邀请1位好友：获得XX积分
- 被邀请的好友：获得XX积分
- 生成邀请海报或链接

### 小程序分享
```javascript
wx.shareAppMessage({
  title: '邀请你加入鲨曼德州扑克俱乐部',
  path: '/pages/index/index?inviteCode=xxx',
  imageUrl: '分享图片URL'
});
```

---

## 💰 16. ConvertPointsModal.tsx（积分兑换弹窗）

### 功能说明
积分兑换金币的操作界面

### 兑换规则
- 100积分 = 1金币
- 实时显示可兑换数量
- 确认兑换

---

## 💳 17. RechargeModal.tsx（充值弹窗）

### 功能说明
金币充值界面

### 充值档位
- 10金币 = 10元
- 50金币 = 50元
- 100金币 = 100元

### 支付流程
1. 选择充值档位
2. 点击充值
3. 调用后端接口获取支付参数
4. 调用 `wx.requestPayment()`
5. 支付成功后更新金币余额

---

## ⚙️ 18. EvaluationSettingsModal.tsx（评价设置弹窗）

### 功能说明
管理自己收到的评价

### 功能点
- 查看自己被评价的标签
- 隐私设置（是否允许他人评价）

---

## 📊 数据流转说明

### 用户登录流程
```
App.tsx (维护登录状态)
    ↓
ProfilePage (未登录时显示登录按钮)
    ↓
WeChatLoginModal (引导用户登录)
    ↓
调用 wx.login() + wx.getUserProfile()
    ↓
后端接口验证并返回用户信息
    ↓
App.tsx 更新登录状态和用户信息
```

### 扫码参赛流程 ⭐
```
HomePage (登录后显示扫码按钮)
    ↓
点击"扫码参加比赛"
    ↓
调用 wx.scanCode()
    ↓
后端接口验证二维码
    ↓
验证成功：显示 ScanSuccessModal
验证失败：显示错误提示
```

### 点餐流程
```
HomePage (点击点餐入口)
    ↓
OrderPage/OrderModal (选择商品)
    ↓
加入购物车
    ↓
确认下单
    ↓
检查金币余额
    ↓
调用后端接口创建订单
    ↓
扣除金币，显示进行中订单
```

### 玩家评价流程
```
RankingPage (点击玩家)
    ↓
PlayerEvaluationModal (显示评价标签)
    ↓
检查登录状态
    ↓
点击标签投票
    ↓
调用后端接口
    ↓
更新投票数量和状态
```

---

## 🎨 样式系统说明

### 颜色变量（需要在小程序中定义）
```css
/* 主题色 */
--color-primary: #FFED00;
--color-primary-dark: #FFD700;

/* 背景色 */
--color-bg-black: #000000;
--color-bg-dark: #1a1a1a;
--color-bg-card: #2a2a2a;

/* 文字色 */
--color-text-white: #ffffff;
--color-text-gray: #9ca3af;
--color-text-dark-gray: #6b7280;

/* 强调色 */
--color-accent-pink: #FF6B9D;
--color-accent-green: #10b981;
--color-accent-blue: #3b82f6;
```

### 圆角规范
```
小圆角: 8px   (border-radius: 8px)
中圆角: 12px  (border-radius: 12px)
大圆角: 16px  (border-radius: 16px)
超大圆角: 24px (border-radius: 24px)
圆形: 50%
```

### 间距规范
```
xs:  4px
sm:  8px
md:  12px
lg:  16px
xl:  20px
2xl: 24px
3xl: 32px
```

---

## 📝 开发建议

### 推荐使用 Taro 框架
如果使用 Taro 框架，可以直接复用大部分组件代码：

1. **安装 Taro**
```bash
npm install -g @tarojs/cli
taro init shark-mind-club
```

2. **选择 React 模板**

3. **迁移组件**
   - 将 `.tsx` 文件复制到 `src/pages` 或 `src/components`
   - 替换样式：Tailwind → Taro 的样式方案
   - 替换图标：Lucide → Taro UI 图标
   - 替换 Toast：Sonner → Taro.showToast()

4. **配置路由**
```javascript
// app.config.js
export default {
  pages: [
    'pages/index/index',
    'pages/ranking/ranking',
    'pages/profile/profile',
    'pages/order/order'
  ],
  tabBar: {
    list: [
      { pagePath: 'pages/index/index', text: '首页' },
      { pagePath: 'pages/ranking/ranking', text: '排行榜' },
      { pagePath: 'pages/profile/profile', text: '我的' }
    ]
  }
}
```

---

**文档版本**: v1.0  
**更新日期**: 2026-01-20
