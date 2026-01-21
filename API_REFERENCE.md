# 鲨曼 Shark Mind Club - API 接口文档

## 🌐 基础信息

**Base URL**: `https://api.sharkmindclub.com` (示例，需替换为实际域名)  
**认证方式**: 微信小程序 session_key + openid  
**数据格式**: JSON

---

## 📋 通用响应格式

### 成功响应
```json
{
  "code": 200,
  "message": "success",
  "data": { ... }
}
```

### 错误响应
```json
{
  "code": 400,
  "message": "错误描述",
  "data": null
}
```

---

## 🔐 1. 用户认证

### 1.1 微信登录
**接口**: `POST /api/auth/login`

**请求参数**:
```json
{
  "code": "微信登录返回的code",
  "userInfo": {
    "nickName": "用户昵称",
    "avatarUrl": "用户头像URL"
  }
}
```

**响应数据**:
```json
{
  "code": 200,
  "data": {
    "token": "用户token",
    "openid": "用户openid",
    "user": {
      "id": "user_001",
      "nickname": "玩家昵称",
      "avatar": "头像URL",
      "points": 1000,
      "coins": 50,
      "totalGames": 120,
      "wins": 75,
      "winRate": 62.5
    }
  }
}
```

---

### 1.2 获取用户信息
**接口**: `GET /api/user/profile`

**请求头**:
```
Authorization: Bearer {token}
```

**响应数据**:
```json
{
  "code": 200,
  "data": {
    "id": "user_001",
    "nickname": "德州老炮儿",
    "avatar": "https://...",
    "points": 1000,
    "coins": 50,
    "totalGames": 120,
    "wins": 75,
    "winRate": 62.5,
    "memberSince": "2024-01-01"
  }
}
```

---

## 💰 2. 金币系统

### 2.1 积分兑换金币
**接口**: `POST /api/user/convert-points`

**请求参数**:
```json
{
  "points": 100
}
```

**说明**: 100积分 = 1金币

**响应数据**:
```json
{
  "code": 200,
  "data": {
    "points": 900,
    "coins": 51,
    "convertedCoins": 1
  },
  "message": "成功兑换1个金币"
}
```

---

### 2.2 充值金币
**接口**: `POST /api/user/recharge`

**请求参数**:
```json
{
  "amount": 50,
  "paymentMethod": "wechat"
}
```

**响应数据**:
```json
{
  "code": 200,
  "data": {
    "orderId": "recharge_001",
    "amount": 50,
    "wechatPayParams": {
      "timeStamp": "...",
      "nonceStr": "...",
      "package": "...",
      "signType": "MD5",
      "paySign": "..."
    }
  }
}
```

**前端调用示例**:
```javascript
const res = await request('/api/user/recharge', { amount: 50 });
wx.requestPayment({
  ...res.data.wechatPayParams,
  success: () => {
    // 支付成功，刷新金币余额
  }
});
```

---

## 🎉 3. 活动管理

### 3.1 获取活动列表
**接口**: `GET /api/events`

**响应数据**:
```json
{
  "code": 200,
  "data": [
    {
      "id": "event_001",
      "title": "周一新人专场",
      "description": "每周一专为新人设立的特别场次...",
      "time": "每周一 19:00-23:00",
      "statusTag": "今日特色",
      "imageUrl": "https://...",
      "rules": [
        "报名费：1个金币",
        "起始记分牌：3000分"
      ]
    }
  ]
}
```

**statusTag 枚举值**:
- `今日特色`
- `明日预告`
- `持续进行中`

---

## 🏆 4. 排行榜

### 4.1 获取周榜
**接口**: `GET /api/rankings/week`

**响应数据**:
```json
{
  "code": 200,
  "data": [
    {
      "id": "player_001",
      "rank": 1,
      "name": "德州老炮儿",
      "avatar": "https://...",
      "wins": 12,
      "totalGames": 15,
      "winRate": 80.0,
      "prize": "本周冠军奖杯🏆"
    }
  ]
}
```

### 4.2 获取月榜
**接口**: `GET /api/rankings/month`

### 4.3 获取季榜
**接口**: `GET /api/rankings/quarter`

### 4.4 获取年榜
**接口**: `GET /api/rankings/year`

### 4.5 获取胜率榜
**接口**: `GET /api/rankings/winrate`

> 以上排行榜接口返回数据结构相同

---

## 🍽️ 5. 点餐系统

### 5.1 获取商品列表
**接口**: `GET /api/products`

**响应数据**:
```json
{
  "code": 200,
  "data": {
    "categories": [
      {
        "id": "snacks",
        "name": "零食",
        "icon": "🍿"
      },
      {
        "id": "alcohol",
        "name": "酒水",
        "icon": "🍺"
      }
    ],
    "products": [
      {
        "id": "product_001",
        "name": "薯片",
        "price": 2,
        "category": "snacks",
        "icon": "🍟",
        "description": "原味薯片",
        "stock": 50
      }
    ]
  }
}
```

---

### 5.2 创建订单
**接口**: `POST /api/orders`

**请求参数**:
```json
{
  "items": [
    {
      "productId": "product_001",
      "quantity": 2
    }
  ]
}
```

**响应数据**:
```json
{
  "code": 200,
  "data": {
    "orderId": "order_001",
    "items": [...],
    "totalPrice": 4,
    "status": "pending",
    "orderTime": 1737360000000,
    "estimatedTime": "15分钟"
  },
  "message": "下单成功！预计15分钟送达"
}
```

---

### 5.3 获取进行中订单
**接口**: `GET /api/orders/active`

**响应数据**:
```json
{
  "code": 200,
  "data": [
    {
      "id": "order_001",
      "items": [
        {
          "productId": "product_001",
          "productName": "薯片",
          "quantity": 2,
          "price": 2
        }
      ],
      "totalPrice": 4,
      "status": "preparing",
      "orderTime": 1737360000000,
      "estimatedTime": "还需10分钟"
    }
  ]
}
```

**status 枚举值**:
- `pending` - 待处理
- `preparing` - 制作中
- `completed` - 已完成

---

### 5.4 获取历史订单
**接口**: `GET /api/orders/history`

**查询参数**:
- `page`: 页码（默认1）
- `limit`: 每页数量（默认10）

**响应数据**:
```json
{
  "code": 200,
  "data": {
    "orders": [...],
    "total": 50,
    "page": 1,
    "limit": 10
  }
}
```

---

## 🎮 6. 比赛相关

### 6.1 验证扫码结果
**接口**: `POST /api/competition/scan`

**请求参数**:
```json
{
  "qrCode": "扫码得到的二维码内容"
}
```

**响应数据**:
```json
{
  "code": 200,
  "data": {
    "valid": true,
    "competitionId": "comp_001",
    "competitionName": "周一新人专场",
    "tableNumber": 3,
    "startTime": "2026-01-20 19:00"
  },
  "message": "扫码成功，您已加入比赛"
}
```

**错误响应**:
```json
{
  "code": 400,
  "data": {
    "valid": false
  },
  "message": "二维码无效或比赛已结束"
}
```

---

### 6.2 获取我的比赛记录
**接口**: `GET /api/competition/my-matches`

**查询参数**:
- `status`: `ongoing` | `completed`（默认all）
- `page`: 页码
- `limit`: 每页数量

**响应数据**:
```json
{
  "code": 200,
  "data": {
    "matches": [
      {
        "id": "match_001",
        "competitionName": "周一新人专场",
        "tableNumber": 3,
        "startTime": "2026-01-20 19:00",
        "endTime": "2026-01-20 22:30",
        "finalRank": 2,
        "prize": "亚军奖品",
        "status": "completed"
      }
    ],
    "total": 25
  }
}
```

---

## 👥 7. 玩家评价

### 7.1 获取玩家评价
**接口**: `GET /api/evaluations/{playerId}`

**响应数据**:
```json
{
  "code": 200,
  "data": {
    "playerId": "player_001",
    "playerName": "德州老炮儿",
    "evaluations": [
      {
        "type": "稳健派",
        "count": 15,
        "hasVoted": false
      },
      {
        "type": "激进派",
        "count": 3,
        "hasVoted": true
      }
    ]
  }
}
```

**评价类型枚举**:
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

---

### 7.2 给玩家投票
**接口**: `POST /api/evaluations/{playerId}/vote`

**请求参数**:
```json
{
  "type": "稳健派"
}
```

**响应数据**:
```json
{
  "code": 200,
  "data": {
    "type": "稳健派",
    "count": 16,
    "hasVoted": true
  },
  "message": "投票成功"
}
```

**错误情况**:
- 未登录: `code: 401, message: "请先登录"`
- 重复投票: `code: 400, message: "您已经投过这个标签了"`

---

### 7.3 取消投票
**接口**: `DELETE /api/evaluations/{playerId}/vote`

**请求参数**:
```json
{
  "type": "稳健派"
}
```

**响应数据**:
```json
{
  "code": 200,
  "data": {
    "type": "稳健派",
    "count": 15,
    "hasVoted": false
  },
  "message": "已取消投票"
}
```

---

## 📍 8. 店铺信息

### 8.1 获取店铺详情
**接口**: `GET /api/store/info`

**响应数据**:
```json
{
  "code": 200,
  "data": {
    "name": "鲨曼 Shark Mind Club",
    "address": "广州市天河区珠江新城保利中达广场A座2楼",
    "phone": "020-12345678",
    "hours": "周一至周日 14:00-02:00",
    "coordinates": {
      "latitude": 23.120935,
      "longitude": 113.324520
    },
    "parking": {
      "location": "地下停车场B2层",
      "rate": "前2小时免费，之后每小时10元"
    },
    "images": [
      "https://...",
      "https://..."
    ]
  }
}
```

---

## 🎁 9. 奖励系统

### 9.1 获取奖励列表
**接口**: `GET /api/rewards`

**响应数据**:
```json
{
  "code": 200,
  "data": [
    {
      "id": "reward_001",
      "name": "周冠军奖杯",
      "description": "周赛第一名奖励",
      "imageUrl": "https://...",
      "value": "纪念奖杯一座"
    }
  ]
}
```

---

## 🔔 10. 通知系统

### 10.1 获取通知列表
**接口**: `GET /api/notifications`

**查询参数**:
- `unreadOnly`: `true` | `false`（仅未读）

**响应数据**:
```json
{
  "code": 200,
  "data": [
    {
      "id": "notif_001",
      "type": "order",
      "title": "您的订单已送达",
      "content": "订单#001的餐品已送达，请享用",
      "time": 1737360000000,
      "read": false
    }
  ]
}
```

---

## 🛠️ 错误码说明

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未登录或token过期 |
| 403 | 无权限 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

---

## 📝 开发注意事项

1. **所有需要用户身份的接口都需要在请求头携带 token**:
   ```
   Authorization: Bearer {token}
   ```

2. **金币扣除操作需要在后端进行**，前端只负责展示和调用接口

3. **支付相关的敏感操作必须在后端完成签名**

4. **二维码验证必须在后端进行**，防止伪造

5. **建议使用微信小程序的 request 封装统一的请求方法**

---

**文档版本**: v1.0  
**更新日期**: 2026-01-20
