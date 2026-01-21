// pages/profile/index.js
const app = getApp();
const { playerEvaluationsData, mockUser } = require('../../data/mockData');

Page({
  data: {
    // 页面状态
    isLoggedIn: false,
    showLoginModal: false,
    showSettingsModal: false,

    // 用户数据
    user: mockUser,

    // 评价数据
    evaluations: [],

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
      user: globalData.userInfo || mockUser,
      isLoggedIn: globalData.isLoggedIn || false
    });
    this.updateEvaluations();
  },

  // 初始化页面数据
  initializeData: function () {
    this.updateEvaluations();
  },

  // 更新评价数据
  updateEvaluations: function () {
    const myEvaluations = playerEvaluationsData[this.data.user.id] || [];
    // 只显示有点赞的评价，按点赞数量降序排序
    const evaluationsWithVotes = myEvaluations.filter(e => e.voters.length > 0);
    const sortedEvaluations = evaluationsWithVotes.sort((a, b) => b.voters.length - a.voters.length);

    this.setData({
      evaluations: sortedEvaluations
    });
  },

  // 检查是否可以切换评价设置（距离上次设置是否超过24小时）
  canToggleEvaluation: function () {
    if (!this.data.user.lastEvaluationSettingTime) return true;
    const lastTime = new Date(this.data.user.lastEvaluationSettingTime);
    const now = new Date();
    const diffHours = (now.getTime() - lastTime.getTime()) / (1000 * 60 * 60);
    return diffHours >= 24;
  },

  // 处理登录按钮点击
  onLoginClick: function () {
    this.setData({
      showLoginModal: true
    });
  },

  // 确认登录
  onLoginConfirm: function () {
    this.setData({
      showLoginModal: false,
      isLoggedIn: true
    });

    // 更新全局状态
    app.globalData.isLoggedIn = true;

    wx.showToast({
      title: '登录成功',
      icon: 'success'
    });
  },

  // 关闭登录模态框
  onCloseLoginModal: function () {
    this.setData({
      showLoginModal: false
    });
  },

  // 打开设置模态框
  onOpenSettings: function () {
    this.setData({
      showSettingsModal: true
    });
  },

  // 关闭设置模态框
  onCloseSettingsModal: function () {
    this.setData({
      showSettingsModal: false
    });
  },

  // 处理switch组件的change事件
  onToggleEvaluationSwitch: function (e) {
    const value = e.detail.value;
    if (this.canToggleEvaluation()) {
      // 更新用户设置
      const updatedUser = {
        ...this.data.user,
        allowEvaluation: value,
        lastEvaluationSettingTime: new Date().toISOString()
      };

      this.setData({
        user: updatedUser
      });

      // 更新全局状态
      app.globalData.userInfo = updatedUser;

      wx.showToast({
        title: value ? '已开启评价功能' : '已关闭评价功能',
        icon: 'success'
      });
    } else {
      // 如果不能切换，恢复原来的值
      this.setData({
        'user.allowEvaluation': !value
      });

      wx.showToast({
        title: '设置过于频繁，请24小时后再试',
        icon: 'none'
      });
    }
  },

  // 历史订单
  onHistoryOrders: function () {
    wx.showToast({
      title: '功能开发中，敬请期待！',
      icon: 'none'
    });
  },

  // 玩家生涯
  onPlayerCareer: function () {
    wx.showToast({
      title: '功能开发中，敬请期待！',
      icon: 'none'
    });
  },


  // 获取总评价数
  getTotalEvaluations: function () {
    return this.data.evaluations.reduce((sum, e) => sum + e.voters.length, 0);
  }
});