// pages/ranking/index.js
const app = getApp();
const {
  monthRankingData,
  weekRankingData,
  quarterRankingData,
  yearRankingData,
  winRateRankingData,
  playerEvaluationsData,
  mockUser
} = require('../../data/mockData');

Page({
  data: {
    // 页面状态
    selectedTab: 'week',
    selectedPlayer: null,
    showRankingRules: false,
    rankingRulesScrollHeight: 0,
    isLoggedIn: false,

    // 榜单数据
    rankings: [],
    myRankingData: null,
    myRank: null,
    isInTop50: false,

    // 用户数据
    currentUser: mockUser,

    // UI状态
    loading: false
  },

  onLoad: function (options) {
    this.initializeData();
  },

  onShow: function () {
    // 从全局状态同步数据
    const globalData = app.globalData;
    this.setData({
      currentUser: globalData.userInfo || mockUser,
      isLoggedIn: globalData.isLoggedIn || false
    });
    this.updateRankings();
  },

  // 初始化页面数据
  initializeData: function () {
    this.updateRankings();
  },

  // 更新排行榜数据
  updateRankings: function () {
    const rankings = this.getCurrentRankings();
    const myRankingData = rankings.find(user => user.id === this.data.currentUser.id);
    const myRank = myRankingData ? myRankingData.rank : null;
    const isInTop50 = myRank && myRank <= 50;

    // 为每个排行榜项添加评价标签和格式化数据
    const rankingsWithEvaluations = rankings.map(item => ({
      ...item,
      evaluationTags: this.getPlayerEvaluations(item.id),
      allowEvaluation: this.isEvaluationAllowed(item.id),
      formattedPoints: item.points.toLocaleString()
    }));

    // 格式化我的排名数据
    const formattedMyRankingData = myRankingData ? {
      ...myRankingData,
      formattedPoints: myRankingData.points.toLocaleString()
    } : null;

    this.setData({
      rankings: rankingsWithEvaluations,
      myRankingData: formattedMyRankingData,
      myRank: myRank,
      isInTop50: isInTop50
    });
  },

  // 获取当前选中的榜单数据
  getCurrentRankings: function () {
    const { selectedTab } = this.data;
    switch (selectedTab) {
      case 'week':
        return weekRankingData;
      case 'month':
        return monthRankingData;
      case 'quarter':
        return quarterRankingData;
      case 'year':
        return yearRankingData;
      case 'winRate':
        return winRateRankingData;
      default:
        return weekRankingData;
    }
  },

  // 检查玩家是否允许被评价
  isEvaluationAllowed: function (playerId) {
    // 如果是当前用户，使用当前用户的设置
    if (playerId === this.data.currentUser.id) {
      return this.data.currentUser.allowEvaluation ?? true;
    }
    // 这里可以扩展为从其他来源获取设置
    return true;
  },

  // 获取玩家评价数据
  getPlayerEvaluations: function (playerId) {
    const evaluations = playerEvaluationsData[playerId] || [];
    return evaluations
      .sort((a, b) => b.voters.length - a.voters.length)
      .slice(0, 3);
  },

  // 切换标签
  onTabChange: function (e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      selectedTab: tab
    });
    this.updateRankings();
  },

  // 显示榜单说明
  onShowRules: function () {
    this.setData({
      showRankingRules: true
    });
    // 计算滚动区域高度
    this.calculateRankingRulesHeight();
  },

  // 计算榜单说明滚动区域高度
  calculateRankingRulesHeight: function () {
    const query = wx.createSelectorQuery().in(this);
    const systemInfo = wx.getSystemInfoSync();
    const screenHeight = systemInfo.windowHeight;
    
    query.select('.ranking-rules-header').boundingClientRect();
    query.select('.ranking-rules-footer').boundingClientRect();
    query.exec((res) => {
      if (res[0] && res[1]) {
        const headerHeight = res[0].height;
        const footerHeight = res[1].height;
        const modalPadding = 64; // 32rpx * 2
        const availableHeight = screenHeight - headerHeight - footerHeight - modalPadding;
        const scrollHeight = Math.max(availableHeight * 2, 600); // 至少600rpx
        
        this.setData({
          rankingRulesScrollHeight: scrollHeight
        });
      }
    });
  },

  // 关闭榜单说明
  onCloseRankingRules: function () {
    this.setData({
      showRankingRules: false
    });
  },

  // 选择玩家进行评价
  onSelectPlayer: function (e) {
    const player = e.currentTarget.dataset.player;
    if (this.isEvaluationAllowed(player.id) && this.data.isLoggedIn) {
      // 获取完整的评价数据
      const evaluations = playerEvaluationsData[player.id] || [];
      const selectedPlayerWithEvaluations = {
        ...player,
        evaluations: evaluations
      };
      this.setData({
        selectedPlayer: selectedPlayerWithEvaluations
      });
    } else if (!this.data.isLoggedIn) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
    }
  },

  // 关闭玩家评价模态框
  onClosePlayerEvaluation: function () {
    this.setData({
      selectedPlayer: null
    });
  },


  // 获取排名图标
  getRankIcon: function (rank) {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank.toString();
  },

  // 获取排名徽章样式
  getRankBadgeStyle: function (rank) {
    if (rank <= 3) {
      return 'rank-medal';
    }
    return 'rank-badge';
  }
});