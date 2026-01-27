// pages/home/index.js
const app = getApp();
const {
  eventsData,
  playerEvaluationsData,
  weekRankingData,
  mockUser
} = require('../../data/mockData');
const { GetNoticeList } = require('../../utils/notice');
const { GetDefineList } = require('../../utils/RankCommentDef');

Page({
  data: {
    // 页面状态
    currentPage: 'home',
    user: mockUser,
    cart: [],
    showInfoModal: null,
    showInviteModal: false,
    showOrderModal: false,
    showEventsModal: false,
    showLocationGuideModal: false,
    showParkingGuideModal: false,
    showCompetitionRulesModal: false,
    showStoreEnvironmentModal: false,
    showRewardsGuideModal: false,
    selectedPlayer: null,
    showScanSuccessModal: false,
    isLoggedIn: false,
    ongoingOrders: [],

    // 页面数据
    events: [],
    topPlayer: null,
    notices: [], // 公告列表
    commentsDefines: {}, // 评论定义映射表，key=枚举值, value=中文描述

    // UI状态
    loading: false
  },

  onLoad: function (options) {
    this.initializeData();
  },

  onShow: function () {
    // 页面显示时更新数据
    this.updateData();
  },

  // 初始化页面数据
  initializeData: function () {
    const statusOrder = {
      '今日特色': 1,
      '明日预告': 2,
      '持续进行中': 3
    };

    const sortedEvents = [...eventsData].sort((a, b) => {
      return statusOrder[a.statusTag] - statusOrder[b.statusTag];
    });

    const topPlayer = this.getTopPlayer();

    this.setData({
      events: sortedEvents,
      topPlayer: topPlayer
    });

    // 同步全局状态
    this.updateData();

    // 加载公告列表
    this.loadNotices();

    // 加载定义列表
    this.loadDefineList();
  },

  // 更新页面数据
  updateData: function () {
    // 从全局状态同步数据
    const globalData = app.globalData;
    this.setData({
      user: globalData.userInfo || mockUser,
      isLoggedIn: globalData.isLoggedIn || false,
      cart: globalData.cart || [],
      ongoingOrders: globalData.ongoingOrders || []
    });
  },

  // 获取本周最受关注选手
  getTopPlayer: function () {
    const playerStats = {};

    // 统计每个玩家的总点赞数
    Object.entries(playerEvaluationsData).forEach(([playerId, evaluations]) => {
      const totalLikes = evaluations.reduce((sum, e) => sum + e.voters.length, 0);
      if (totalLikes > 0) {
        // 找出该玩家点赞最多的标签
        const topEvaluation = [...evaluations].sort((a, b) => b.voters.length - a.voters.length)[0];

        // 从weekRankingData中找到玩家名字
        const playerInfo = weekRankingData.find(p => p.id === playerId);
        if (playerInfo) {
          playerStats[playerId] = {
            name: playerInfo.name,
            totalLikes,
            topTag: {
              type: topEvaluation.type,
              count: topEvaluation.voters.length
            }
          };
        }
      }
    });

    // 找出点赞最多的玩家
    const topPlayerId = Object.keys(playerStats).reduce((a, b) =>
      playerStats[a].totalLikes > playerStats[b].totalLikes ? a : b
      , Object.keys(playerStats)[0]);

    return topPlayerId ? {
      id: topPlayerId,
      ...playerStats[topPlayerId]
    } : null;
  },

  // 导航到订单页面
  // 导航到赛事桌列表
  onNavigateToBattle: function () {
    wx.navigateTo({
      url: '/pages/battle/index'
    });
  },

  onNavigateToOrder: function () {
    wx.navigateTo({
      url: '/pages/order/index'
    });
  },

  // 邀请好友
  onInviteFriends: function () {
    this.setData({
      showInviteModal: true
    });
  },

  // 扫码参加比赛
  onScanCode: function () {
    if (!this.data.isLoggedIn) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }

    // 模拟扫码功能
    wx.showLoading({
      title: '扫码中...'
    });

    setTimeout(() => {
      wx.hideLoading();
      this.setData({
        showScanSuccessModal: true
      });
    }, 1000);
  },

  // 显示活动模态框
  onShowEventsModal: function () {
    this.setData({
      showEventsModal: true
    });
  },

  // 显示位置指引模态框
  onShowLocationGuideModal: function () {
    this.setData({
      showLocationGuideModal: true
    });
    // 计算滚动区域高度
    this.calculateLocationGuideHeight();
  },

  // 计算位置指引滚动区域高度
  calculateLocationGuideHeight: function () {
    const query = wx.createSelectorQuery().in(this);
    const systemInfo = wx.getSystemInfoSync();
    const screenHeight = systemInfo.windowHeight;
    
    // 使用 nextTick 确保 DOM 已经渲染
    wx.nextTick(() => {
      // 查询模态框和头部高度
      query.select('.location-guide-modal').boundingClientRect();
      query.select('.location-header').boundingClientRect();
      query.exec((res) => {
        if (res[0] && res[1]) {
          const modalHeight = res[0].height;
          const headerHeight = res[1].height;
          const modalPadding = 64; // 32rpx * 2
          const availableHeight = modalHeight - headerHeight - modalPadding;
          const scrollHeight = Math.max(availableHeight * 2, 600); // 转换为rpx，至少600rpx
          
          console.log('位置指引滚动区域高度计算:', {
            screenHeight,
            modalHeight,
            headerHeight,
            availableHeight,
            scrollHeight
          });
        } else if (res[0]) {
          // 如果只查询到模态框，使用估算的头部高度
          const modalHeight = res[0].height;
          const estimatedHeaderHeight = 120; // 估算头部高度（px）
          const modalPadding = 64;
          const availableHeight = modalHeight - estimatedHeaderHeight - modalPadding;
          const scrollHeight = Math.max(availableHeight * 2, 600);
          
          console.log('位置指引滚动区域高度计算（估算头部）:', {
            screenHeight,
            modalHeight,
            estimatedHeaderHeight,
            availableHeight,
            scrollHeight
          });
        } else {
          // 如果查询失败，使用默认计算方式
          const modalHeight = screenHeight * 0.9;
          const estimatedHeaderHeight = 120; // 估算头部高度（px）
          const modalPadding = 64;
          const availableHeight = modalHeight - estimatedHeaderHeight - modalPadding;
          const scrollHeight = Math.max(availableHeight * 2, 600);
          
          console.log('位置指引滚动区域高度计算（完全估算）:', {
            screenHeight,
            modalHeight,
            estimatedHeaderHeight,
            availableHeight,
            scrollHeight
          });
        }
      });
    });
  },

  // 关闭位置指引模态框
  onCloseLocationGuideModal: function () {
    this.setData({
      showLocationGuideModal: false
    });
  },

  // 关闭停车指引模态框
  onCloseParkingGuideModal: function () {
    this.setData({
      showParkingGuideModal: false
    });
  },

  // 关闭店铺环境模态框
  onCloseStoreEnvironmentModal: function () {
    this.setData({
      showStoreEnvironmentModal: false
    });
  },

  // 关闭奖励说明模态框
  onCloseRewardsGuideModal: function () {
    this.setData({
      showRewardsGuideModal: false
    });
  },

  // 关闭比赛规则模态框
  onCloseCompetitionRulesModal: function () {
    this.setData({
      showCompetitionRulesModal: false
    });
  },


  // 显示停车指引模态框
  onShowParkingGuideModal: function () {
    this.setData({
      showParkingGuideModal: true
    });
    // 计算滚动区域高度
    this.calculateParkingGuideHeight();
  },

  // 计算停车指引滚动区域高度
  calculateParkingGuideHeight: function () {
    const query = wx.createSelectorQuery().in(this);
    const systemInfo = wx.getSystemInfoSync();
    const screenHeight = systemInfo.windowHeight;
    
    // 使用 nextTick 确保 DOM 已经渲染
    wx.nextTick(() => {
      // 查询模态框和头部高度
      query.select('.parking-guide-modal').boundingClientRect();
      query.select('.parking-header').boundingClientRect();
      query.exec((res) => {
        if (res[0] && res[1]) {
          const modalHeight = res[0].height;
          const headerHeight = res[1].height;
          const modalPadding = 64; // 32rpx * 2
          const availableHeight = modalHeight - headerHeight - modalPadding;
          const scrollHeight = Math.max(availableHeight * 2, 600); // 转换为rpx，至少600rpx
          
          console.log('停车指引滚动区域高度计算:', {
            screenHeight,
            modalHeight,
            headerHeight,
            availableHeight,
            scrollHeight
          });
        } else if (res[0]) {
          // 如果只查询到模态框，使用估算的头部高度
          const modalHeight = res[0].height;
          const estimatedHeaderHeight = 120; // 估算头部高度（px）
          const modalPadding = 64;
          const availableHeight = modalHeight - estimatedHeaderHeight - modalPadding;
          const scrollHeight = Math.max(availableHeight * 2, 600);
          
          console.log('停车指引滚动区域高度计算（估算头部）:', {
            screenHeight,
            modalHeight,
            estimatedHeaderHeight,
            availableHeight,
            scrollHeight
          });
        } else {
          // 如果查询失败，使用默认计算方式
          const modalHeight = screenHeight * 0.7;
          const estimatedHeaderHeight = 120; // 估算头部高度（px）
          const modalPadding = 64;
          const availableHeight = modalHeight - estimatedHeaderHeight - modalPadding;
          const scrollHeight = Math.max(availableHeight * 2, 600);
          
          console.log('停车指引滚动区域高度计算（完全估算）:', {
            screenHeight,
            modalHeight,
            estimatedHeaderHeight,
            availableHeight,
            scrollHeight
          });
        }
      });
    });
  },

  // 显示比赛规则模态框
  onShowCompetitionRulesModal: function () {
    this.setData({
      showCompetitionRulesModal: true
    });
    // 计算滚动区域高度
    this.calculateCompetitionRulesHeight();
  },

  // 计算比赛规则滚动区域高度
  calculateCompetitionRulesHeight: function () {
    const query = wx.createSelectorQuery().in(this);
    const systemInfo = wx.getSystemInfoSync();
    const screenHeight = systemInfo.windowHeight;
    
    // 使用 nextTick 确保 DOM 已经渲染
    wx.nextTick(() => {
      // 查询模态框和头部高度
      query.select('.competition-rules-modal').boundingClientRect();
      query.select('.competition-header').boundingClientRect();
      query.exec((res) => {
        if (res[0] && res[1]) {
          const modalHeight = res[0].height;
          const headerHeight = res[1].height;
          const modalPadding = 64; // 32rpx * 2
          const availableHeight = modalHeight - headerHeight - modalPadding;
          const scrollHeight = Math.max(availableHeight * 2, 600); // 转换为rpx，至少600rpx
          
          console.log('比赛规则滚动区域高度计算:', {
            screenHeight,
            modalHeight,
            headerHeight,
            availableHeight,
            scrollHeight
          });
        } else if (res[0]) {
          // 如果只查询到模态框，使用估算的头部高度
          const modalHeight = res[0].height;
          const estimatedHeaderHeight = 120; // 估算头部高度（px）
          const modalPadding = 64;
          const availableHeight = modalHeight - estimatedHeaderHeight - modalPadding;
          const scrollHeight = Math.max(availableHeight * 2, 600);
          
          console.log('比赛规则滚动区域高度计算（估算头部）:', {
            screenHeight,
            modalHeight,
            estimatedHeaderHeight,
            availableHeight,
            scrollHeight
          });
        } else {
          // 如果查询失败，使用默认计算方式
          const modalHeight = screenHeight * 0.7;
          const estimatedHeaderHeight = 120; // 估算头部高度（px）
          const modalPadding = 64;
          const availableHeight = modalHeight - estimatedHeaderHeight - modalPadding;
          const scrollHeight = Math.max(availableHeight * 2, 600);
          
          console.log('比赛规则滚动区域高度计算（完全估算）:', {
            screenHeight,
            modalHeight,
            estimatedHeaderHeight,
            availableHeight,
            scrollHeight
          });
        }
      });
    });
  },

  // 显示奖励说明模态框
  onShowRewardsGuideModal: function () {
    this.setData({
      showRewardsGuideModal: true
    });
    // 计算滚动区域高度
    this.calculateRewardsGuideHeight();
  },

  // 计算奖励说明滚动区域高度
  calculateRewardsGuideHeight: function () {
    const query = wx.createSelectorQuery().in(this);
    const systemInfo = wx.getSystemInfoSync();
    const screenHeight = systemInfo.windowHeight;
    
    // 使用 nextTick 确保 DOM 已经渲染
    wx.nextTick(() => {
      // 查询模态框和头部高度
      query.select('.rewards-guide-modal').boundingClientRect();
      query.select('.rewards-header').boundingClientRect();
      query.exec((res) => {
        if (res[0] && res[1]) {
          const modalHeight = res[0].height;
          const headerHeight = res[1].height;
          const modalPadding = 64; // 32rpx * 2
          const availableHeight = modalHeight - headerHeight - modalPadding;
          const scrollHeight = Math.max(availableHeight * 2, 600); // 转换为rpx，至少600rpx
          
          console.log('奖励说明滚动区域高度计算:', {
            screenHeight,
            modalHeight,
            headerHeight,
            availableHeight,
            scrollHeight
          });
        } else if (res[0]) {
          // 如果只查询到模态框，使用估算的头部高度
          const modalHeight = res[0].height;
          const estimatedHeaderHeight = 120; // 估算头部高度（px）
          const modalPadding = 64;
          const availableHeight = modalHeight - estimatedHeaderHeight - modalPadding;
          const scrollHeight = Math.max(availableHeight * 2, 600);
          
          console.log('奖励说明滚动区域高度计算（估算头部）:', {
            screenHeight,
            modalHeight,
            estimatedHeaderHeight,
            availableHeight,
            scrollHeight
          });
        } else {
          // 如果查询失败，使用默认计算方式
          const modalHeight = screenHeight * 0.7;
          const estimatedHeaderHeight = 120; // 估算头部高度（px）
          const modalPadding = 64;
          const availableHeight = modalHeight - estimatedHeaderHeight - modalPadding;
          const scrollHeight = Math.max(availableHeight * 2, 600);
          
          console.log('奖励说明滚动区域高度计算（完全估算）:', {
            screenHeight,
            modalHeight,
            estimatedHeaderHeight,
            availableHeight,
            scrollHeight
          });
        }
      });
    });
  },

  // 显示店铺环境模态框
  onShowStoreEnvironmentModal: function () {
    this.setData({
      showStoreEnvironmentModal: true
    });
  },

  // 选择玩家查看评价
  onSelectPlayer: function (e) {
    const player = e.currentTarget.dataset.player;
    this.setData({
      selectedPlayer: player
    });
  },

  // 反馈功能
  onFeedback: function () {
    wx.showModal({
      title: '反馈',
      content: '反馈功能将打开微信反馈界面',
      showCancel: true,
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
          // 这里可以调用微信反馈API
          console.log('用户点击确定');
        }
      }
    });
  },

  // 关闭模态框
  onCloseModal: function (e) {
    const modalType = e.currentTarget.dataset.modal;
    this.setData({
      [modalType]: false
    });
  },

  // 关闭扫描成功模态框
  onCloseScanSuccessModal: function () {
    this.setData({
      showScanSuccessModal: false
    });
  },

  // 关闭玩家评价模态框
  onClosePlayerEvaluationModal: function () {
    this.setData({
      selectedPlayer: null
    });
  },


  // 加载公告列表
  loadNotices: async function () {
    try {
      const noticeRes = await GetNoticeList();
      console.log('获取公告列表成功:', noticeRes);
      
      // 服务器返回的是 S2CGetNotice，包含 noticeList 字段
      const noticeList = noticeRes.noticeList || [];
      
      // 只显示大厅公告（type=0）
      const hallNotices = noticeList.filter(notice => notice.type === 0);
      
      this.setData({
        notices: hallNotices
      });
    } catch (err) {
      console.error('获取公告列表失败:', err);
      // 失败时不影响页面显示，静默处理
      this.setData({
        notices: []
      });
    }
  },

  // 加载定义列表
  loadDefineList: function () {
    GetDefineList().then((responseData) => {
      // 服务器返回的数据格式：{ commentsDefines: { "1": "描述1", "2": "描述2", ... } }
      const commentsDefines = responseData.commentsDefines || {};
      
      console.log('获取定义列表成功:', commentsDefines);
      
      // 保存到页面数据
      this.setData({
        commentsDefines: commentsDefines
      });
      
      // 同时保存到全局数据，供其他页面使用
      app.globalData.commentsDefines = commentsDefines;
    }).catch((error) => {
      console.error('获取定义列表失败:', error);
      // 失败时不显示错误提示，静默处理
    });
  },

  // 显示Toast提示
  showToast: function (message, type = 'success') {
    wx.showToast({
      title: message,
      icon: type === 'success' ? 'success' : 'none',
      duration: 2000
    });
  }
});