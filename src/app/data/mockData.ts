// Mock data for Play+ Club App

export interface Event {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  validityPeriod: string; // 有效期日期
  statusTag: '持续进行中' | '今日特色' | '明日预告'; // 状态标签
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
  stock: number;
  variants?: string[];
  description?: string; // 商品描述，主要用于通用套餐
}

export interface User {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  points: number;
  balance: number;
  coins: number;
  allowEvaluation?: boolean; // 是否允许其他人评价
  lastEvaluationSettingTime?: string; // 上次设置时间
}

export interface RankingUser {
  rank: number;
  name: string;
  avatar?: string;
  points: number;
  winRate?: number; // 进圈率
  games?: number; // 游戏局数
  id: string; // 玩家ID
}

export interface PlayerEvaluation {
  type: string;
  voters: { id: string; name: string; avatar?: string }[];
}

export interface OrderItem {
  product: Product;
  quantity: number;
  variant?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  orderTime: string;
  isCompleted: boolean; // 后台传来的订单是否已完成状态
  estimatedTime?: string; // 预计送达时间
}

export interface Seat {
  id: string;
  position: string;
  status: 'available' | 'reserved' | 'occupied';
  user?: {
    name: string;
    avatar?: string;
  };
}

export interface Table {
  id: string;
  name: string;
  status: string;
  basePoints: string;
  seats: string;
  updateTime: string;
  seatLayout: Seat[];
}

export const categories = [
  { id: 'general-package', name: '通用套餐', icon: 'gift' },
  { id: 'snacks', name: '小吃', icon: 'cookie' },
  { id: 'beer', name: '啤酒', icon: 'beer' },
  { id: 'craft-beer', name: '精酿', icon: 'wine' },
  { id: 'soft-drinks', name: '软饮', icon: 'cup-soda' },
  { id: 'ongoing-orders', name: '进行中订单', icon: 'clock' },
];

export const products: Product[] = [
  // 小吃
  { id: '6', name: '包浆豆腐', price: 30, category: 'snacks', stock: 60,
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllc3xlbnwxfHx8fDE3Njg4MzExNjV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: '7', name: '爆汁小香肠', price: 30, category: 'snacks', stock: 55,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwd2luZ3N8ZW58MXx8fHwxNzY4NzU3MTYzfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: '8', name: '薯角', price: 30, category: 'snacks', stock: 70,
    image: 'https://images.unsplash.com/photo-1625938146369-adc83368bda7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmlvbiUyMHJpbmdzfGVufDF8fHx8MTc2ODgyNjQ1MHww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: '9', name: '东南亚虾片', price: 30, category: 'snacks', stock: 50,
    image: 'https://images.unsplash.com/photo-1682264895449-f75b342cbab6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNhbGFtYXJpfGVufDF8fHx8MTc2ODgwMjEzNHww&ixlib=rb-4.1.0&q=80&w=1080' },
  
  // 精酿
  { id: '11', name: '龙井小麦', price: 60, category: 'craft-beer', stock: 100,
    image: 'https://images.unsplash.com/photo-1713474839481-9462da510b23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGJlZXJ8ZW58MXx8fHwxNzY4ODE1MzEzfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  
  // 啤酒
  { id: '16', name: '百威', price: 18, category: 'beer', stock: 200,
    image: 'https://images.unsplash.com/photo-1671116807936-6b68593fb992?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWR3ZWlzZXIlMjBiZWVyfGVufDF8fHx8MTc2ODgzNTAxOHww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: '17', name: '百威铝瓶装', price: 20, category: 'beer', stock: 150,
    image: 'https://images.unsplash.com/photo-1671116807936-6b68593fb992?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWR3ZWlzZXIlMjBiZWVyfGVufDF8fHx8MTc2ODgzNTAxOHww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: '18', name: '白熊接骨木', price: 50, category: 'beer', stock: 80,
    image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVyJTIwYm90dGxlfGVufDF8fHx8MTc2ODc2MjQxN3ww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: '19', name: '白熊', price: 45, category: 'beer', stock: 90,
    image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVyJTIwYm90dGxlfGVufDF8fHx8MTc2ODc2MjQxN3ww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: '20', name: '喜力', price: 22, category: 'beer', stock: 180,
    image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWluZWtlbiUyMGJlZXJ8ZW58MXx8fHwxNzY4ODM1MDE4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  
  // 软饮
  { id: '24', name: '柠檬雪碧', price: 20, category: 'soft-drinks', stock: 100,
    image: 'https://images.unsplash.com/photo-1664665239609-c07159ff308c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpdGUlMjBzb2RhfGVufDF8fHx8MTc2ODgzNTAyMXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: '25', name: '椰汁', price: 20, category: 'soft-drinks', stock: 80,
    image: 'https://images.unsplash.com/photo-1638688569176-5b6db19f9d2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5lcmFsJTIwd2F0ZXIlMjBib3R0bGV8ZW58MXx8fHwxNzY4ODA3ODQzfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: '26', name: '可乐', price: 20, category: 'soft-drinks', stock: 120,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NhJTIwY29sYXxlbnwxfHx8fDE3Njg3OTgwNDR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: '27', name: '泰象苏打水', price: 20, category: 'soft-drinks', stock: 90,
    image: 'https://images.unsplash.com/photo-1638688569176-5b6db19f9d2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5lcmFsJTIwd2F0ZXIlMjBib3R0bGV8ZW58MXx8fHwxNzY4ODA3ODQzfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: '28', name: '椰奶', price: 20, category: 'soft-drinks', stock: 70,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjBqdWljZXxlbnwxfHx8fDE3Njg4MzUwMjF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  
  // 通用套餐
  { id: '36', name: '会员积分促销', price: 60, category: 'general-package', stock: 100,
    image: 'https://images.unsplash.com/photo-1643307282439-08cb542c6edf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdCUyMGJlZXIlMjBnbGFzc3xlbnwxfHx8fDE3Njg3ODQ4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '任选精酿一杯并赠送筹码30,000限时特惠专享！会员专属福利，积分翻倍，超值优惠不容错过。' },
  { id: '37', name: '每日积分套餐', price: 180, category: 'general-package', stock: 50,
    image: 'https://images.unsplash.com/photo-1617909660121-ee367f2874ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmlua3MlMjBzbmFja3MlMjBwYXJ0eXxlbnwxfHx8fDE3Njg4MzQ4NDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '包含任选软饮两杯+小吃拼盘+赠送筹码80,000，每日限量供应！性价比之选，适合长时间游戏的您。' },
  { id: '38', name: '每日挑战套餐', price: 120, category: 'general-package', stock: 60,
    image: 'https://images.unsplash.com/photo-1768178130840-93b35a185bd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVyJTIwcG9wY29ybnxlbnwxfHx8fDE3Njg4MzQ4NDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '精选啤酒两瓶+爆米花+赠送筹码50,000，挑战榜单必备！助您冲击排行榜，赢取更多奖励。' },
  { id: '39', name: '180酒水套餐', price: 180, category: 'general-package', stock: 40,
    image: 'https://images.unsplash.com/photo-1649798510566-4a52cd4fe463?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdCUyMGJlZXIlMjBmbGlnaHR8ZW58MXx8fHwxNzY4ODA5Mzg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '含精酿啤酒三杯+特色小吃+赠送码100,000，畅饮之选！适合与好友分享，享受欢聚时光。' },
  { id: '40', name: '280酒水套餐', price: 280, category: 'general-package', stock: 35,
    image: 'https://images.unsplash.com/photo-1667927041742-b20353eb3f4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkcmlua3MlMjBmb29kfGVufDF8fHx8MTc2ODgzNDg0NHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: '豪华套餐：精酿五杯+豪华拼盘+赠送筹码200,000，尊享体验！多种口味任你选择，满足不同需求。' },
  { id: '41', name: '480酒水套餐', price: 480, category: 'general-package', stock: 25,
    image: 'https://images.unsplash.com/photo-1673448223618-db3345bcb253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwYmVlciUyMHNlbGVjdGlvbnxlbnwxfHx8fDE3Njg4MzQ4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '至尊套餐：精酿十杯+超值大礼包+赠送筹码500,000，VIP专享！全场最超值组合，让您玩得尽兴。' },
  { id: '42', name: '240手环兑换酒水套餐', price: 240, category: 'general-package', stock: 30,
    image: 'https://images.unsplash.com/photo-1557420286-bacad24b4d51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMGRyaW5rc3xlbnwxfHx8fDE3Njg4MzQ4NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '手环专属：精酿四杯+特色美食+赠送筹码150,000，会员福利！使用手环兑换更优惠，积分双倍返还。' },
];

export const mockUser: User = {
  id: '1',
  name: '罗泽',
  phone: '188****2570',
  points: 12500, // 增加积分，让他能在榜单上
  balance: 0,
  coins: 0,
  allowEvaluation: true,
  lastEvaluationSettingTime: '2026-01-18T12:00:00',
};

export const rankingData: RankingUser[] = [
  { rank: 1, name: '微信用户', points: 12500 },
  { rank: 2, name: '微信用户', points: 10200 },
  { rank: 3, name: '微信用户', points: 8900 },
  { rank: 4, name: '微信用户', points: 7600 },
];

// 本月榜数据
export const monthRankingData: RankingUser[] = [
  { rank: 1, id: '1', name: '罗白泽', points: 12500 },
  { rank: 2, id: 'user2', name: '王牌玩家', points: 10200 },
  { rank: 3, id: 'user3', name: 'All in King', points: 8900 },
  { rank: 4, id: 'user4', name: '微信用户', points: 7600 },
  { rank: 5, id: 'user5', name: '德州之星', points: 6800 },
  { rank: 6, id: 'user6', name: '牌神降临', points: 5900 },
  { rank: 7, id: 'user7', name: 'Poker Pro', points: 5200 },
  { rank: 8, id: 'user8', name: '运气爆棚', points: 4500 },
  { rank: 9, id: 'user9', name: '牌桌霸主', points: 4200 },
  { rank: 10, id: 'user10', name: '读心高手', points: 3980 },
  { rank: 11, id: 'user11', name: '筹码收割机', points: 3750 },
  { rank: 12, id: 'user12', name: '全压王者', points: 3600 },
  { rank: 13, id: 'user13', name: '顶尖玩家', points: 3450 },
  { rank: 14, id: 'user14', name: '牌技大师', points: 3280 },
  { rank: 15, id: 'user15', name: '稳赢专家', points: 3120 },
  { rank: 16, id: 'user16', name: '德扑传奇', points: 2980 },
  { rank: 17, id: 'user17', name: '牌场老手', points: 2850 },
  { rank: 18, id: 'user18', name: 'Bluff大师', points: 2720 },
  { rank: 19, id: 'user19', name: '策略高手', points: 2600 },
  { rank: 20, id: 'user20', name: '冷静玩家', points: 2480 },
  { rank: 21, id: 'user21', name: '计算专家', points: 2360 },
  { rank: 22, id: 'user22', name: '位置大师', points: 2240 },
  { rank: 23, id: 'user23', name: '翻牌高手', points: 2120 },
  { rank: 24, id: 'user24', name: '河牌杀手', points: 2000 },
  { rank: 25, id: 'user25', name: '转牌王者', points: 1880 },
  { rank: 26, id: 'user26', name: '起手牌专家', points: 1760 },
  { rank: 27, id: 'user27', name: 'GTO玩家', points: 1640 },
  { rank: 28, id: 'user28', name: '范围大师', points: 1520 },
  { rank: 29, id: 'user29', name: '赔率专家', points: 1400 },
  { rank: 30, id: 'user30', name: '概率达人', points: 1280 },
  { rank: 31, id: 'user31', name: '底池控制', points: 1180 },
  { rank: 32, id: 'user32', name: '诈唬艺术家', points: 1090 },
  { rank: 33, id: 'user33', name: '值下注', points: 1010 },
  { rank: 34, id: 'user34', name: '加注机器', points: 950 },
  { rank: 35, id: 'user35', name: '跟注站', points: 890 },
  { rank: 36, id: 'user36', name: '紧凶玩家', points: 830 },
  { rank: 37, id: 'user37', name: '松凶高手', points: 770 },
  { rank: 38, id: 'user38', name: '被动天王', points: 710 },
  { rank: 39, id: 'user39', name: '激进战士', points: 650 },
  { rank: 40, id: 'user40', name: '保守派', points: 600 },
  { rank: 41, id: 'user41', name: '冒险家', points: 560 },
  { rank: 42, id: 'user42', name: '稳健选手', points: 520 },
  { rank: 43, id: 'user43', name: '新星崛起', points: 480 },
  { rank: 44, id: 'user44', name: '潜力股', points: 440 },
  { rank: 45, id: 'user45', name: '黑马玩家', points: 400 },
  { rank: 46, id: 'user46', name: '进步之星', points: 360 },
  { rank: 47, id: 'user47', name: '学习者', points: 320 },
  { rank: 48, id: 'user48', name: '追梦人', points: 280 },
  { rank: 49, id: 'user49', name: '初心者', points: 240 },
  { rank: 50, id: 'user50', name: '新手村长', points: 200 },
];

// 本周榜数据
export const weekRankingData: RankingUser[] = [
  { rank: 1, id: 'user51', name: '周冠军', points: 4200 },
  { rank: 2, id: 'user52', name: '本周之星', points: 3800 },
  { rank: 3, id: '1', name: '罗白泽', points: 3200 },
  { rank: 4, id: 'user4', name: '微信用户', points: 2900 },
  { rank: 5, id: 'user54', name: '牌场新秀', points: 2500 },
  { rank: 6, id: 'user55', name: 'Lucky Boy', points: 2100 },
  { rank: 7, id: 'user56', name: '稳健玩家', points: 1800 },
  { rank: 8, id: 'user57', name: '进步之星', points: 1500 },
  { rank: 9, id: 'user58', name: '周末战神', points: 1420 },
  { rank: 10, id: 'user59', name: '连胜王者', points: 1340 },
  { rank: 11, id: 'user60', name: '翻盘高手', points: 1280 },
  { rank: 12, id: 'user61', name: '逆袭专家', points: 1220 },
  { rank: 13, id: 'user62', name: '本周黑马', points: 1160 },
  { rank: 14, id: 'user63', name: '爆发玩家', points: 1100 },
  { rank: 15, id: 'user64', name: '稳定输出', points: 1050 },
  { rank: 16, id: 'user65', name: '持续进步', points: 1000 },
  { rank: 17, id: 'user66', name: '周榜新星', points: 950 },
  { rank: 18, id: 'user67', name: '短期高手', points: 900 },
  { rank: 19, id: 'user68', name: '七天王者', points: 850 },
  { rank: 20, id: 'user69', name: '周榜常客', points: 800 },
  { rank: 21, id: 'user70', name: '周一王者', points: 760 },
  { rank: 22, id: 'user71', name: '周二英雄', points: 720 },
  { rank: 23, id: 'user72', name: '周三战神', points: 680 },
  { rank: 24, id: 'user73', name: '周四之星', points: 640 },
  { rank: 25, id: 'user74', name: '周五狂欢', points: 600 },
  { rank: 26, id: 'user75', name: '周六夜王', points: 560 },
  { rank: 27, id: 'user76', name: '周日休闲', points: 520 },
  { rank: 28, id: 'user77', name: '工作日玩家', points: 480 },
  { rank: 29, id: 'user78', name: '周末战士', points: 450 },
  { rank: 30, id: 'user79', name: '夜猫子', points: 420 },
  { rank: 31, id: 'user80', name: '早鸟玩家', points: 390 },
  { rank: 32, id: 'user81', name: '午间高手', points: 360 },
  { rank: 33, id: 'user82', name: '傍晚达人', points: 330 },
  { rank: 34, id: 'user83', name: '深夜玩家', points: 300 },
  { rank: 35, id: 'user84', name: '全天候', points: 280 },
  { rank: 36, id: 'user85', name: '周榜追逐者', points: 260 },
  { rank: 37, id: 'user86', name: '积分猎人', points: 240 },
  { rank: 38, id: 'user87', name: '榜单冲刺', points: 220 },
  { rank: 39, id: 'user88', name: '后起之秀', points: 200 },
  { rank: 40, id: 'user89', name: '努力玩家', points: 185 },
  { rank: 41, id: 'user90', name: '勤奋之星', points: 170 },
  { rank: 42, id: 'user91', name: '坚持者', points: 155 },
  { rank: 43, id: 'user92', name: '每日签到', points: 140 },
  { rank: 44, id: 'user93', name: '活跃玩家', points: 125 },
  { rank: 45, id: 'user94', name: '参与者', points: 110 },
  { rank: 46, id: 'user95', name: '周榜新人', points: 95 },
  { rank: 47, id: 'user96', name: '初乍到', points: 80 },
  { rank: 48, id: 'user97', name: '试水玩家', points: 65 },
  { rank: 49, id: 'user98', name: '观望者', points: 50 },
  { rank: 50, id: 'user99', name: '新加入', points: 35 },
];

// 进圈率榜单数据
export const winRateRankingData: RankingUser[] = [
  { rank: 1, id: 'user101', name: '稳赢高手', winRate: 68.5, games: 120, points: 0 },
  { rank: 2, id: 'user102', name: '进圈王者', winRate: 65.2, games: 98, points: 0 },
  { rank: 3, id: 'user103', name: '德扑精英', winRate: 62.8, games: 145, points: 0 },
  { rank: 4, id: 'user4', name: '微信用户', winRate: 58.3, games: 76, points: 0 },
  { rank: 5, id: 'user104', name: '稳健选手', winRate: 56.7, games: 88, points: 0 },
  { rank: 6, id: 'user105', name: '牌技大师', winRate: 54.9, games: 102, points: 0 },
  { rank: 7, id: 'user106', name: '策略专家', winRate: 52.1, games: 67, points: 0 },
  { rank: 8, id: '1', name: '罗白泽', winRate: 50.4, games: 94, points: 0 },
  { rank: 9, id: 'user108', name: '胜率之王', winRate: 49.8, games: 156, points: 0 },
  { rank: 10, id: 'user109', name: '常胜将军', winRate: 48.5, games: 112, points: 0 },
  { rank: 11, id: 'user110', name: '高手在民间', winRate: 47.3, games: 89, points: 0 },
  { rank: 12, id: 'user111', name: '进圈专家', winRate: 46.9, games: 134, points: 0 },
  { rank: 13, id: 'user112', name: '稳定发挥', winRate: 45.6, games: 78, points: 0 },
  { rank: 14, id: 'user113', name: '胜率担当', winRate: 44.8, games: 165, points: 0 },
  { rank: 15, id: 'user114', name: '可靠玩家', winRate: 43.5, games: 91, points: 0 },
  { rank: 16, id: 'user115', name: '概率大师', winRate: 42.7, games: 143, points: 0 },
  { rank: 17, id: 'user116', name: '进圈能手', winRate: 41.9, games: 108, points: 0 },
  { rank: 18, id: 'user117', name: '稳扎稳打', winRate: 41.2, games: 85, points: 0 },
  { rank: 19, id: 'user118', name: '胜率追求者', winRate: 40.5, games: 127, points: 0 },
  { rank: 20, id: 'user119', name: '均衡玩家', winRate: 39.8, games: 96, points: 0 },
  { rank: 21, id: 'user120', name: '进圈达人', winRate: 39.1, games: 154, points: 0 },
  { rank: 22, id: 'user121', name: '稳定输出', winRate: 38.4, games: 72, points: 0 },
  { rank: 23, id: 'user122', name: '胜率保证', winRate: 37.7, games: 118, points: 0 },
  { rank: 24, id: 'user123', name: '可靠之选', winRate: 37.0, games: 139, points: 0 },
  { rank: 25, id: 'user124', name: '进圈高手', winRate: 36.3, games: 83, points: 0 },
  { rank: 26, id: 'user125', name: '稳定表现', winRate: 35.6, games: 161, points: 0 },
  { rank: 27, id: 'user126', name: '胜率玩家', winRate: 34.9, games: 94, points: 0 },
  { rank: 28, id: 'user127', name: '可靠选手', winRate: 34.2, games: 176, points: 0 },
  { rank: 29, id: 'user128', name: '进圈选手', winRate: 33.5, games: 68, points: 0 },
  { rank: 30, id: 'user129', name: '稳步前进', winRate: 32.8, games: 125, points: 0 },
  { rank: 31, id: 'user130', name: '胜率中坚', winRate: 32.1, games: 148, points: 0 },
  { rank: 32, id: 'user131', name: '进圈战士', winRate: 31.4, games: 79, points: 0 },
  { rank: 33, id: 'user132', name: '稳定成长', winRate: 30.7, games: 192, points: 0 },
  { rank: 34, id: 'user133', name: '胜率新星', winRate: 30.0, games: 101, points: 0 },
  { rank: 35, id: 'user134', name: '进圈追求', winRate: 29.3, games: 87, points: 0 },
  { rank: 36, id: 'user135', name: '稳健发展', winRate: 28.6, games: 158, points: 0 },
  { rank: 37, id: 'user136', name: '胜率进步', winRate: 27.9, games: 73, points: 0 },
  { rank: 38, id: 'user137', name: '进圈努力', winRate: 27.2, games: 136, points: 0 },
  { rank: 39, id: 'user138', name: '稳定学习', winRate: 26.5, games: 114, points: 0 },
  { rank: 40, id: 'user139', name: '胜率提升', winRate: 25.8, games: 91, points: 0 },
  { rank: 41, id: 'user140', name: '进圈成长', winRate: 25.1, games: 169, points: 0 },
  { rank: 42, id: 'user141', name: '稳步提升', winRate: 24.4, games: 82, points: 0 },
  { rank: 43, id: 'user142', name: '胜率学习', winRate: 23.7, games: 147, points: 0 },
  { rank: 44, id: 'user143', name: '进圈新手', winRate: 23.0, games: 65, points: 0 },
  { rank: 45, id: 'user144', name: '稳定新人', winRate: 22.3, games: 128, points: 0 },
  { rank: 46, id: 'user145', name: '胜率探索', winRate: 21.6, games: 93, points: 0 },
  { rank: 47, id: 'user146', name: '进圈初学', winRate: 20.9, games: 174, points: 0 },
  { rank: 48, id: 'user147', name: '稳定起步', winRate: 20.2, games: 58, points: 0 },
  { rank: 49, id: 'user148', name: '胜率新兵', winRate: 19.5, games: 106, points: 0 },
  { rank: 50, id: 'user149', name: '进圈萌新', winRate: 18.8, games: 81, points: 0 },
];

// 本季度榜数据
export const quarterRankingData: RankingUser[] = [
  { rank: 1, id: 'user201', name: '季度冠军', points: 28500 },
  { rank: 2, id: '1', name: '罗白泽', points: 24200 },
  { rank: 3, id: 'user202', name: '季度之星', points: 21800 },
  { rank: 4, id: 'user4', name: '微信用户', points: 19600 },
  { rank: 5, id: 'user203', name: '季度王者', points: 17800 },
  { rank: 6, id: 'user204', name: 'Q1霸主', points: 16200 },
  { rank: 7, id: 'user205', name: '三月战神', points: 14800 },
  { rank: 8, id: 'user206', name: '季度精英', points: 13600 },
  { rank: 9, id: 'user207', name: '常胜玩家', points: 12500 },
  { rank: 10, id: 'user208', name: '季度高手', points: 11400 },
  { rank: 11, id: 'user209', name: '稳定输出', points: 10500 },
  { rank: 12, id: 'user210', name: '季榜常客', points: 9800 },
  { rank: 13, id: 'user211', name: '长期玩家', points: 9200 },
  { rank: 14, id: 'user212', name: '季度黑马', points: 8700 },
  { rank: 15, id: 'user213', name: '积分大户', points: 8200 },
  { rank: 16, id: 'user214', name: '三月英雄', points: 7800 },
  { rank: 17, id: 'user215', name: '季度达人', points: 7400 },
  { rank: 18, id: 'user216', name: '稳健选手', points: 7000 },
  { rank: 19, id: 'user217', name: '季榜强者', points: 6700 },
  { rank: 20, id: 'user218', name: '长期坚持', points: 6400 },
  { rank: 21, id: 'user219', name: '季度新星', points: 6100 },
  { rank: 22, id: 'user220', name: '持续进步', points: 5800 },
  { rank: 23, id: 'user221', name: '三月之光', points: 5500 },
  { rank: 24, id: 'user222', name: '季榜追逐', points: 5200 },
  { rank: 25, id: 'user223', name: '稳定成长', points: 4900 },
  { rank: 26, id: 'user224', name: '季度勇士', points: 4600 },
  { rank: 27, id: 'user225', name: '长期奋斗', points: 4300 },
  { rank: 28, id: 'user226', name: '三月战士', points: 4000 },
  { rank: 29, id: 'user227', name: '季度努力', points: 3800 },
  { rank: 30, id: 'user228', name: '坚持不懈', points: 3600 },
  { rank: 31, id: 'user229', name: '季榜冲刺', points: 3400 },
  { rank: 32, id: 'user230', name: '持续输出', points: 3200 },
  { rank: 33, id: 'user231', name: '三月奋进', points: 3000 },
  { rank: 34, id: 'user232', name: '季度参与', points: 2800 },
  { rank: 35, id: 'user233', name: '长期活跃', points: 2600 },
  { rank: 36, id: 'user234', name: '季榜参战', points: 2400 },
  { rank: 37, id: 'user235', name: '稳步前行', points: 2200 },
  { rank: 38, id: 'user236', name: '三月征战', points: 2000 },
  { rank: 39, id: 'user237', name: '季度挑战', points: 1850 },
  { rank: 40, id: 'user238', name: '持续参与', points: 1700 },
  { rank: 41, id: 'user239', name: '季榜新兵', points: 1550 },
  { rank: 42, id: 'user240', name: '三月奋战', points: 1400 },
  { rank: 43, id: 'user241', name: '季度起步', points: 1250 },
  { rank: 44, id: 'user242', name: '长期学习', points: 1100 },
  { rank: 45, id: 'user243', name: '季榜探索', points: 950 },
  { rank: 46, id: 'user244', name: '三月试炼', points: 800 },
  { rank: 47, id: 'user245', name: '季度初学', points: 650 },
  { rank: 48, id: 'user246', name: '稳定起航', points: 500 },
  { rank: 49, id: 'user247', name: '季榜萌新', points: 350 },
  { rank: 50, id: 'user248', name: '三月新人', points: 200 },
];

// 本年度榜数据
export const yearRankingData: RankingUser[] = [
  { rank: 1, id: 'user301', name: '年度王者', points: 98500 },
  { rank: 2, id: '1', name: '罗白泽', points: 86200 },
  { rank: 3, id: 'user302', name: '年度传奇', points: 78900 },
  { rank: 4, id: 'user4', name: '微信用户', points: 72600 },
  { rank: 5, id: 'user303', name: '年度霸主', points: 68500 },
  { rank: 6, id: 'user304', name: '全年冠军', points: 64200 },
  { rank: 7, id: 'user305', name: '年榜至尊', points: 60800 },
  { rank: 8, id: 'user306', name: '年度精英', points: 57500 },
  { rank: 9, id: 'user307', name: '十二月战神', points: 54200 },
  { rank: 10, id: 'user308', name: '年度高手', points: 51000 },
  { rank: 11, id: 'user309', name: '全年强者', points: 48500 },
  { rank: 12, id: 'user310', name: '年榜常客', points: 46200 },
  { rank: 13, id: 'user311', name: '长期王者', points: 44000 },
  { rank: 14, id: 'user312', name: '年度黑马', points: 41800 },
  { rank: 15, id: 'user313', name: '积分巨星', points: 39600 },
  { rank: 16, id: 'user314', name: '全年英雄', points: 37500 },
  { rank: 17, id: 'user315', name: '年度达人', points: 35400 },
  { rank: 18, id: 'user316', name: '稳健王者', points: 33300 },
  { rank: 19, id: 'user317', name: '年榜强者', points: 31200 },
  { rank: 20, id: 'user318', name: '长期坚守', points: 29100 },
  { rank: 21, id: 'user319', name: '年度之星', points: 27500 },
  { rank: 22, id: 'user320', name: '持续领先', points: 26000 },
  { rank: 23, id: 'user321', name: '全年之光', points: 24500 },
  { rank: 24, id: 'user322', name: '年榜追梦', points: 23000 },
  { rank: 25, id: 'user323', name: '稳定王牌', points: 21500 },
  { rank: 26, id: 'user324', name: '年度勇士', points: 20000 },
  { rank: 27, id: 'user325', name: '长期征战', points: 18800 },
  { rank: 28, id: 'user326', name: '全年战士', points: 17600 },
  { rank: 29, id: 'user327', name: '年度努力', points: 16400 },
  { rank: 30, id: 'user328', name: '坚持到底', points: 15200 },
  { rank: 31, id: 'user329', name: '年榜奋斗', points: 14000 },
  { rank: 32, id: 'user330', name: '持续奋战', points: 12800 },
  { rank: 33, id: 'user331', name: '全年奋进', points: 11600 },
  { rank: 34, id: 'user332', name: '年度参与', points: 10400 },
  { rank: 35, id: 'user333', name: '长期活跃', points: 9800 },
  { rank: 36, id: 'user334', name: '年榜参战', points: 9200 },
  { rank: 37, id: 'user335', name: '稳步成长', points: 8600 },
  { rank: 38, id: 'user336', name: '全年征战', points: 8000 },
  { rank: 39, id: 'user337', name: '年度挑战', points: 7400 },
  { rank: 40, id: 'user338', name: '持续打卡', points: 6800 },
  { rank: 41, id: 'user339', name: '年榜参赛', points: 6200 },
  { rank: 42, id: 'user340', name: '全年拼搏', points: 5600 },
  { rank: 43, id: 'user341', name: '年度起步', points: 5000 },
  { rank: 44, id: 'user342', name: '长期学习', points: 4400 },
  { rank: 45, id: 'user343', name: '年榜探索', points: 3800 },
  { rank: 46, id: 'user344', name: '全年试炼', points: 3200 },
  { rank: 47, id: 'user345', name: '年度初学', points: 2600 },
  { rank: 48, id: 'user346', name: '稳健起航', points: 2000 },
  { rank: 49, id: 'user347', name: '年榜萌新', points: 1400 },
  { rank: 50, id: 'user348', name: '全年新人', points: 800 },
];

export const mockTable: Table = {
  id: 'b',
  name: 'B. 蓝桌',
  status: '预约中',
  basePoints: '20/40',
  seats: '9/9',
  updateTime: '14:14:10',
  seatLayout: [
    { id: 'b0', position: 'B0', status: 'reserved' },
    { id: 'b1', position: 'B1', status: 'occupied', user: { name: '玩家1' } },
    { id: 'b2', position: 'B2', status: 'available' },
    { id: 'b3', position: 'B3', status: 'occupied', user: { name: '玩家2' } },
    { id: 'b4', position: 'B4', status: 'available' },
    { id: 'b5', position: 'B5', status: 'reserved' },
    { id: 'b6', position: 'B6', status: 'occupied', user: { name: '玩家3' } },
    { id: 'b7', position: 'B7', status: 'available' },
    { id: 'b8', position: 'B8', status: 'occupied', user: { name: '玩家4' } },
  ],
};

// 活动数据
export const eventsData: Event[] = [
  {
    id: '1',
    title: '新人专享福利',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
    description: '首次充值500元即送200积分，更有新人礼包等你来领取！活动时间有限，快来参加吧。',
    validityPeriod: '2026.01.01 - 2026.12.31',
    statusTag: '持续进行中'
  },
  {
    id: '2',
    title: '周末狂欢夜',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    description: '【周一｜新人&女士友好日】\n📣 周一活动接龙\n🕒 时间：晚上7:30 第一场开赛\n🎫 新人酒水券8折｜拉新到店送酒水\n 女生酒券8折｜到店即送酒水',
    validityPeriod: '每周五、六 20:00-24:00',
    statusTag: '今日特色'
  },
  {
    id: '3',
    title: '好友邀赛',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    description: '邀请好友一起玩德州扑克，每成功邀请1位好友，双方各得100积分和50金币奖励。',
    validityPeriod: '2026.01.15 - 2026.02.28',
    statusTag: '持续进行中'
  },
  {
    id: '4',
    title: '月度冠军挑战',
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80',
    description: '本月积分榜前10名玩家将获得专属奖励，冠军更可赢取价值3000元的豪华礼包！',
    validityPeriod: '2026.01.20 14:00 开启',
    statusTag: '明日预告'
  },
  {
    id: '5',
    title: '美食优惠季',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    description: '使用金币兑换指定美食饮品，享受8折优惠。更有每日限量特价菜品，先到先得！',
    validityPeriod: '2026.01.19 12:00-22:00',
    statusTag: '今日特色'
  }
];

// 玩家评价数据
export const playerEvaluationsData: Record<string, PlayerEvaluation[]> = {
  '1': [
    { type: '紧凶型', voters: [
      { id: 'user2', name: '王牌玩家' }, 
      { id: 'user5', name: '德州之星' }, 
      { id: 'user10', name: '读心高手' },
      { id: 'user15', name: '稳赢专家' },
      { id: 'user20', name: '冷静玩家' },
      { id: 'user25', name: '转牌王者' },
      { id: 'user30', name: '概率达人' },
      { id: 'user35', name: '加注机器' },
      { id: 'user40', name: '保守派' },
      { id: 'user999', name: '这是一个超级无敌霹雳长的玩家名字测试' }, // 20个字符的超长名字
    ] },
    { type: '算牌型', voters: [
      { id: 'user3', name: 'All in King' }, 
      { id: 'user7', name: 'Poker Pro' },
      { id: 'user12', name: '全压王者' },
      { id: 'user18', name: 'Bluff大师' },
      { id: 'user22', name: '位置大师' },
      { id: 'user27', name: 'GTO玩家' },
      { id: 'user32', name: '诈唬艺术家' },
      { id: 'user37', name: '松凶高手' },
    ] },
    { type: '冷血狙击', voters: [
      { id: 'user9', name: '牌桌霸主' },
      { id: 'user14', name: '牌技大师' },
      { id: 'user19', name: '策略高手' },
      { id: 'user24', name: '河牌杀手' },
      { id: 'user29', name: '赔率专家' },
      { id: 'user34', name: '加注机器' },
      { id: 'user39', name: '激进战士' },
    ] },
    { type: '价值型', voters: [
      { id: 'user6', name: '牌神降临' },
      { id: 'user11', name: '筹码收割机' },
      { id: 'user16', name: '德扑传' },
      { id: 'user21', name: '计算专家' },
      { id: 'user26', name: '起手牌专家' },
      { id: 'user31', name: '底池控制' },
    ] },
    { type: '松凶型', voters: [
      { id: 'user4', name: '微信用户' },
      { id: 'user8', name: '运气爆棚' },
      { id: 'user13', name: '顶尖玩家' },
      { id: 'user17', name: '牌场老手' },
      { id: 'user23', name: '翻牌高手' },
      { id: 'user28', name: '范围大师' },
      { id: 'user33', name: '价值下注' },
      { id: 'user38', name: '被动天' },
      { id: 'user42', name: '稳健选手' },
    ] },
    { type: '诈唬型', voters: [
      { id: 'user36', name: '紧凶玩家' },
      { id: 'user41', name: '冒险家' },
      { id: 'user43', name: '新星崛起' },
      { id: 'user44', name: '潜力股' },
      { id: 'user46', name: '进步之星' },
    ] },
    { type: '疯狗型', voters: [
      { id: 'user47', name: '技术流' },
      { id: 'user48', name: '经验丰富' },
      { id: 'user49', name: '战术大师' },
      { id: 'user50', name: '牌局主宰' },
    ] },
    { type: '娱乐型', voters: [
      { id: 'user51', name: '快乐玩家' },
      { id: 'user52', name: '氛围组' },
      { id: 'user53', name: '社交达人' },
    ] },
    { type: '紧被动型', voters: [
      { id: 'user54', name: '谨慎选手' },
      { id: 'user55', name: '观察者' },
    ] },
    { type: '社交型', voters: [
      { id: 'user56', name: '话痨王' },
      { id: 'user57', name: '牌友' },
      { id: 'user58', name: '聊天高手' },
      { id: 'user59', name: '牌桌活宝' },
      { id: 'user60', name: '气氛调节' },
      { id: 'user61', name: '开心果' },
    ] },
  ],
  'user1': [
    { type: '紧凶型', voters: [
      { id: 'user2', name: '王牌玩家' }, 
      { id: 'user5', name: '德州之星' }, 
      { id: 'user10', name: '读心高手' },
      { id: 'user15', name: '稳赢专家' },
      { id: 'user20', name: '冷静玩家' },
      { id: 'user25', name: '转牌王者' },
      { id: 'user30', name: '概率达人' },
    ] },
    { type: '算牌型', voters: [
      { id: 'user3', name: 'All in King' }, 
      { id: 'user7', name: 'Poker Pro' },
      { id: 'user12', name: '全压王者' },
      { id: 'user18', name: 'Bluff大师' },
      { id: 'user22', name: '位置大师' },
    ] },
    { type: '冷血狙击', voters: [
      { id: 'user9', name: '牌桌霸主' },
      { id: 'user14', name: '牌技大师' },
      { id: 'user19', name: '策略高手' },
    ] },
  ],
  'user2': [
    { type: '松凶型', voters: [
      { id: 'user1', name: '德扑高手' }, 
      { id: 'user4', name: '微信用户' },
      { id: 'user11', name: '筹码收割机' },
      { id: 'user16', name: '德扑传奇' },
      { id: 'user21', name: '计算专家' },
      { id: 'user26', name: '起手牌专家' },
      { id: 'user31', name: '底池控制' },
      { id: 'user35', name: '跟注站' },
    ] },
    { type: '诈唬型', voters: [
      { id: 'user3', name: 'All in King' }, 
      { id: 'user6', name: '牌神降临' }, 
      { id: 'user8', name: '运气爆棚' },
      { id: 'user13', name: '顶尖玩家' },
      { id: 'user17', name: '牌场老手' },
      { id: 'user23', name: '翻牌高手' },
    ] },
  ],
  'user3': [
    { type: '疯狗型', voters: [
      { id: 'user1', name: '德扑高手' }, 
      { id: 'user2', name: '王牌玩' }, 
      { id: 'user5', name: '德州之星' },
      { id: 'user8', name: '运气爆棚' },
      { id: 'user11', name: '筹码收割机' },
      { id: 'user14', name: '牌技大师' },
      { id: 'user17', name: '牌场老手' },
      { id: 'user20', name: '冷静玩家' },
      { id: 'user23', name: '翻牌高手' },
      { id: 'user26', name: '起手牌专家' },
      { id: 'user29', name: '赔率专家' },
      { id: 'user32', name: '诈唬艺术家' },
    ] },
    { type: '松凶型', voters: [
      { id: 'user4', name: '微信用户' },
      { id: 'user7', name: 'Poker Pro' },
      { id: 'user10', name: '读心高手' },
      { id: 'user13', name: '顶尖玩家' },
    ] },
  ],
  'user4': [
    { type: '娱乐型', voters: [
      { id: 'user1', name: '德扑高手' }, 
      { id: 'user3', name: 'All in King' },
      { id: 'user6', name: '牌神降临' },
      { id: 'user9', name: '牌桌霸主' },
      { id: 'user12', name: '全压王者' },
    ] },
    { type: '社交型', voters: [
      { id: 'user2', name: '王牌玩家' }, 
      { id: 'user6', name: '牌神降临' },
      { id: 'user10', name: '读心高手' },
      { id: 'user15', name: '稳赢专家' },
      { id: 'user19', name: '策略高手' },
      { id: 'user24', name: '河牌杀手' },
    ] },
  ],
  'user5': [
    { type: '紧动型', voters: [
      { id: 'user1', name: '德扑高手' },
      { id: 'user4', name: '微信用户' },
      { id: 'user8', name: '运气爆棚' },
    ] },
    { type: '沉默型', voters: [
      { id: 'user3', name: 'All in King' }, 
      { id: 'user7', name: 'Poker Pro' },
      { id: 'user11', name: '筹码收割机' },
      { id: 'user16', name: '德扑传奇' },
    ] },
  ],
};

// 进行中订单模拟数据
export const mockOngoingOrders: Order[] = [];

// 示例订单数据（取消注释即可测试）
// export const mockOngoingOrders: Order[] = [
//   {
//     id: 'order001',
//     orderNumber: 'SM20260119001',
//     items: [
//       { product: products.find(p => p.id === '36')!, quantity: 1 },
//       { product: products.find(p => p.id === '26')!, quantity: 2 },
//     ],
//     totalAmount: 100,
//     orderTime: '2026-01-19 19:25:30',
//     isCompleted: false,
//     estimatedTime: '约5分钟送达',
//   },
//   {
//     id: 'order002',
//     orderNumber: 'SM20260119002',
//     items: [
//       { product: products.find(p => p.id === '38')!, quantity: 1 },
//       { product: products.find(p => p.id === '11')!, quantity: 1 },
//       { product: products.find(p => p.id === '6')!, quantity: 2 },
//     ],
//     totalAmount: 240,
//     orderTime: '2026-01-19 19:15:18',
//     isCompleted: false,
//     estimatedTime: '约8分钟送达',
//   },
// ];