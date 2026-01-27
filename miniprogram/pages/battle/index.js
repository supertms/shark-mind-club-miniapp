// pages/battle/index.js
const app = getApp();
const { GetRoomList, JoinRoom } = require('../../utils/battle');

Page({
  data: {
    // 页面状态
    loading: false,
    isLoggedIn: false,

    // 房间列表
    rooms: [],

    // 刷新定时器
    refreshTimer: null
  },

  onLoad: function (options) {
    this.initializeData();
  },

  onShow: function () {
    // 从全局状态同步数据
    const globalData = app.globalData;
    this.setData({
      isLoggedIn: globalData.isLoggedIn || false
    });
    
    // 加载房间列表
    this.loadRoomList();
    
    // 启动定时刷新（每5秒刷新一次）
    this.startAutoRefresh();
  },

  onHide: function () {
    // 停止定时刷新
    this.stopAutoRefresh();
  },

  onUnload: function () {
    // 停止定时刷新
    this.stopAutoRefresh();
  },

  // 初始化页面数据
  initializeData: function () {
    this.loadRoomList();
  },

  // 加载房间列表
  loadRoomList: function () {
    // 设置加载状态
    this.setData({
      loading: true
    });

    // 请求服务器数据（statusValue=0表示进行中的比赛）
    GetRoomList(0)
      .then((serverData) => {
        // 转换数据格式
        const rooms = (serverData.rooms || []).map(room => {
          return {
            ...room,
            // 格式化比赛类型
            battleTypeText: this.getBattleTypeText(room.battleTypeValue),
            // 格式化桌号
            tableNumber: this.getTableNumber(room.id),
            // 格式化时间
            formattedStartTime: this.formatTime(room.startTime)
          };
        });

        // 更新页面数据
        this.setData({
          rooms: rooms,
          loading: false
        });
      })
      .catch((error) => {
        console.error('加载房间列表失败:', error);
        
        this.setData({
          loading: false
        });

        wx.showModal({
          title: '加载失败',
          content: error.message || '获取房间列表失败，请稍后重试',
          showCancel: false,
          confirmText: '确定'
        });
      });
  },

  // 加入房间
  onJoinRoom: function (e) {
    const roomId = e.currentTarget.dataset.roomId;
    const room = e.currentTarget.dataset.room;
    
    if (!this.data.isLoggedIn) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (!room.canJoin) {
      wx.showToast({
        title: '该房间不可加入',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 显示确认对话框
    wx.showModal({
      title: '确认加入',
      content: `确定要加入${room.tableNumber}吗？`,
      success: (res) => {
        if (res.confirm) {
          this.joinRoom(roomId);
        }
      }
    });
  },

  // 执行加入房间操作
  joinRoom: function (roomId) {
    // 显示加载提示
    wx.showLoading({
      title: '加入中...',
      mask: true
    });

    // 调用服务器API
    JoinRoom(roomId)
      .then((responseData) => {
        wx.hideLoading();
        
        wx.showToast({
          title: '加入成功',
          icon: 'success',
          duration: 2000
        });

        // 刷新房间列表
        setTimeout(() => {
          this.loadRoomList();
        }, 1000);
      })
      .catch((error) => {
        wx.hideLoading();
        console.error('加入房间失败:', error);
        
        wx.showModal({
          title: '加入失败',
          content: error.message || '网络错误，请稍后重试',
          showCancel: false,
          confirmText: '确定'
        });
      });
  },

  // 获取比赛类型文本
  getBattleTypeText: function (battleTypeValue) {
    const battleTypes = {
      0: '常规赛',
      2: '锦标赛'
    };
    return battleTypes[battleTypeValue] || '未知类型';
  },

  // 获取桌号（从房间id提取，或使用id作为桌号）
  getTableNumber: function (roomId) {
    // 这里可以根据实际业务逻辑调整
    // 暂时使用房间id作为桌号
    return `${roomId}号桌`;
  },

  // 格式化时间
  formatTime: function (timeString) {
    if (!timeString) return '';
    // 格式：yyyy-MM-dd HH:mm:ss -> MM-dd HH:mm
    const date = new Date(timeString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}-${day} ${hours}:${minutes}`;
  },

  // 启动自动刷新
  startAutoRefresh: function () {
    // 清除之前的定时器
    this.stopAutoRefresh();
    
    // 每5秒刷新一次
    const timer = setInterval(() => {
      this.loadRoomList();
    }, 5000);
    
    this.setData({
      refreshTimer: timer
    });
  },

  // 停止自动刷新
  stopAutoRefresh: function () {
    if (this.data.refreshTimer) {
      clearInterval(this.data.refreshTimer);
      this.setData({
        refreshTimer: null
      });
    }
  },

  // 手动刷新
  onRefresh: function () {
    this.loadRoomList();
  }
});
