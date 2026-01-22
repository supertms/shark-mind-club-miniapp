// components/competition-rules/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示组件
    show: {
      type: Boolean,
      value: true,
      observer: function(newVal) {
        if (newVal) {
          // 当组件显示时，重新计算高度
          setTimeout(() => {
            this.calculateScrollHeight();
          }, 300);
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    scrollHeight: 600, // 默认高度（rpx）
    competitions: [
      {
        id: 'regular',
        name: '常规赛',
        icon: '🎲',
        tagColor: '#60a5fa',
        tagBg: 'rgba(59, 130, 246, 0.2)',
        tagBorder: 'rgba(59, 130, 246, 0.3)',
        buyIn: '酒水券一张',
        reward: '酒水券 + 积分',
        schedule: '每日 15:30',
        tagText: '每日',
        rules: [
          '时间：每日 15:30开始',
          '盲注结构：第一级别为 100/200 筹码，每 12分钟升一级',
          '前注：大盲位置玩家需要额外支付一个 BB 作为 ante',
          '起始筹码：30,000',
          '最少参赛人数：7人（第六级别之前可以随时加入）',
          '最多参赛人数：9人',
          '参赛门槛：酒水券一张',
          '奖励分配：前三名选手分别获得酒水券一张，积分 5 分、3 分、1 分',
          'Rebuy规则：第一二级别筹码为 0 后，可以购买 38 元酒水套餐赠送 20,000筹码；三四五级别筹码为 0 后，可以购买 58 元酒水套餐赠送30,000筹码；最多只可以 rebuy 两次（一至五级别相加）；第六级别开始，不可以 rebuy',
        ],
      },
      {
        id: 'weekly',
        name: '周赛',
        icon: '🏆',
        tagColor: '#FFED00',
        tagBg: 'rgba(255, 237, 0, 0.2)',
        tagBorder: 'rgba(255, 237, 0, 0.3)',
        buyIn: '酒水券一张',
        reward: '酒水券 + 积分 + 奖品',
        schedule: '每周六 15:30',
        tagText: '每周',
        rules: [
          '时间：每周六下午 15:30 开始',
          '参赛资格：每周积分排名前 18 名',
          '报名费：酒水券一张',
          'Rebuy 规则：前五级别筹码为0 后，可以购买 128 元酒水套餐赠送 30,000 筹码，最多可以 rebuy 一次',
          '特殊规定：仅限 9 人参加，按报名顺序排序',
          '奖励：前三名选手分别获得酒水券一张，积分 5 分、3 分、1 分，另有精彩奖励，每周不同',
        ],
      },
      {
        id: 'monthly',
        name: '月赛',
        icon: '👑',
        tagColor: '#a78bfa',
        tagBg: 'rgba(139, 92, 246, 0.2)',
        tagBorder: 'rgba(139, 92, 246, 0.3)',
        buyIn: '免费',
        reward: '精彩奖励',
        schedule: '每月初周日',
        tagText: '每月',
        rules: [
          '时间：每月初的周日',
          '参赛资格：每月积分排名前 27 名',
          '报名费：免费',
          'Rebuy 规则：与常规赛一致',
          '奖励：前三名选手分别获得精彩奖励，每月不同',
          '特殊规定：27 人分三张比赛桌同时开赛，每张比赛桌只前三名共计九名选手进入决赛桌。进入决赛桌后，比赛级别设置为第十级别开始。',
        ],
      },
      {
        id: 'doubles',
        name: '双人赛',
        icon: '👥',
        tagColor: '#f472b6',
        tagBg: 'rgba(236, 72, 153, 0.2)',
        tagBorder: 'rgba(236, 72, 153, 0.3)',
        buyIn: '酒水券一张',
        reward: '酒水券 + 积分',
        schedule: '每周六 19:30',
        tagText: '每周',
        rules: [
          '时间：每周六19:30',
          '报名费：酒水券一张',
          '组队规则：两人提前组队，共四队，另有单人一名',
          'Rebuy 规则：与常规赛相同',
          '奖励分配：第一名队伍每位玩家获得酒水券一张加积分 3 分，另有精彩奖励，每场不同，敬请期待；若单人猎手夺冠，获得双倍奖励',
          '特殊规定：第五级别结束时，停表，两位玩家互相之间可以自由分配筹码；单人玩家起始筹码多 5,000',
        ],
      },
    ]
  },

  /**
   * 组件生命周期
   */
  ready: function () {
    // 动态计算 scroll-view 高度
    // 使用延迟确保 DOM 完全渲染后再计算
    setTimeout(() => {
      this.calculateScrollHeight();
    }, 300);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭组件
    onClose: function () {
      this.triggerEvent('close');
    },

    // 计算滚动区域高度
    calculateScrollHeight: function () {
      const query = wx.createSelectorQuery().in(this);
      const systemInfo = wx.getSystemInfoSync();
      const screenHeight = systemInfo.windowHeight;
      
      // 查询头部高度和整个内容容器高度
      query.select('.competition-header').boundingClientRect();
      query.select('.competition-rules-content').boundingClientRect();
      query.exec((res) => {
        if (res[0] && res[1]) {
          // 成功查询到头部和容器
          const headerHeight = res[0].height;
          const contentHeight = res[1].height;
          // 使用实际容器高度减去头部高度，确保占满可用空间
          const availableHeight = contentHeight - headerHeight;
          // 转换为rpx：px * 2
          const scrollHeight = Math.max(availableHeight * 2, 600); // 至少600rpx
          
          console.log('比赛规则滚动区域高度计算:', {
            screenHeight,
            contentHeight,
            headerHeight,
            availableHeight,
            scrollHeight
          });
          
          this.setData({
            scrollHeight: scrollHeight
          });
        } else if (res[0]) {
          // 只查询到头部，尝试查询父级模态框的实际高度
          const headerHeight = res[0].height;
          
          // 查询父级模态框的实际高度（在页面中）
          const parentQuery = wx.createSelectorQuery();
          parentQuery.selectAll('.competition-rules-modal').boundingClientRect();
          parentQuery.exec((parentRes) => {
            let modalHeight = screenHeight * 0.7; // 默认值：70vh
            
            // 如果查询到模态框，使用实际高度
            if (parentRes[0] && parentRes[0].length > 0) {
              modalHeight = parentRes[0][0].height;
            }
            
            const availableHeight = modalHeight - headerHeight;
            // 转换为rpx：px * 2，确保占满可用空间
            const scrollHeight = Math.max(availableHeight * 2, 600);
            
            console.log('比赛规则滚动区域高度计算（使用模态框实际高度）:', {
              screenHeight,
              modalHeight,
              headerHeight,
              availableHeight,
              scrollHeight,
              '查询结果': parentRes[0] && parentRes[0].length > 0 ? '查询到模态框' : '使用默认值70vh'
            });
            
            this.setData({
              scrollHeight: scrollHeight
            });
          });
        } else {
          // 如果查询失败，延迟重试
          setTimeout(() => {
            this.calculateScrollHeight();
          }, 200);
        }
      });
    }
  }
});