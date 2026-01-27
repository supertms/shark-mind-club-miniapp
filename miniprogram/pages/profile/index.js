// pages/profile/index.js
const app = getApp();
const { playerEvaluationsData, mockUser } = require('../../data/mockData');
const { LoginToServer } = require('../../utils/login');
const { GetPlayerInfo, UpdatePlayerAvatar, UpdatePlayerNickname, UpdatePlayerCommentsSwitch } = require('../../utils/player');

Page({
  data: {
    // 页面状态
    isLoggedIn: false,
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
    
    // 尝试从本地存储恢复登录状态
    try {
      const savedUserInfo = wx.getStorageSync('userInfo');
      const savedIsLoggedIn = wx.getStorageSync('isLoggedIn');
      
      if (savedUserInfo && savedIsLoggedIn) {
        this.setData({
          user: savedUserInfo,
          isLoggedIn: true
        });
        app.globalData.userInfo = savedUserInfo;
        app.globalData.isLoggedIn = true;
      } else {
        this.setData({
          user: globalData.userInfo || mockUser,
          isLoggedIn: globalData.isLoggedIn || false
        });
      }
    } catch (e) {
      console.error('读取本地存储失败:', e);
      this.setData({
        user: globalData.userInfo || mockUser,
        isLoggedIn: globalData.isLoggedIn || false
      });
    }
    
    this.updateEvaluations();
    
    // 如果全局数据中有 commentsDefines，重新更新评价数据
    if (app.globalData.commentsDefines && this.data.user.comments) {
      this.updateEvaluations();
    }
  },

  // 初始化页面数据
  initializeData: function () {
    this.updateEvaluations();
  },

  // 更新评价数据
  updateEvaluations: function () {
    const user = this.data.user;
    const commentsDefines = app.globalData.commentsDefines || {};
    
    // 优先使用服务器返回的 comments 数据
    let evaluations = [];
    
    if (user.comments && typeof user.comments === 'object') {
      // 将 comments 转换为 evaluations 格式
      Object.keys(user.comments).forEach(commentId => {
        const count = user.comments[commentId];
        const commentText = commentsDefines[commentId] || `评论${commentId}`;
        if (count > 0) {
          evaluations.push({
            type: commentText,
            count: count,
            commentId: commentId
          });
        }
      });
      
      // 按数量降序排序
      evaluations.sort((a, b) => b.count - a.count);
    } else {
      // 如果没有服务器数据，使用模拟数据作为降级方案
      const myEvaluations = playerEvaluationsData[user.id] || [];
      const evaluationsWithVotes = myEvaluations.filter(e => e.voters.length > 0);
      evaluations = evaluationsWithVotes.sort((a, b) => b.voters.length - a.voters.length).map(e => ({
        type: e.type,
        count: e.voters.length,
        voters: e.voters
      }));
    }

    this.setData({
      evaluations: evaluations
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


  // 处理登录按钮点击 - 使用 getUserProfile
  onLoginClick: async function () {
    // 显示加载提示
    wx.showLoading({
      title: '登录中...',
      mask: true
    });

    try {
      // 先获取用户信息（必须在用户点击时直接调用）
      const userRes = await new Promise((resolve, reject) => {
        wx.getUserProfile({
          desc: '用于完善用户资料',
          success: resolve,
          fail: reject
        });
      });

      console.log('获取用户信息成功:', userRes);
      const userInfo = userRes.userInfo;

      // 获取微信登录凭证 code
      const loginRes = await new Promise((resolve, reject) => {
        wx.login({
          success: resolve,
          fail: reject
        });
      });

      if (!loginRes.code) {
        throw new Error('获取登录凭证失败');
      }

      console.log('获取登录凭证成功:', loginRes.code);

      // 调用服务器登录接口
      const serverRes = await LoginToServer(loginRes.code);
      console.log('服务器登录响应:', serverRes);
      
      // 保存 sessionId（如果服务器返回了）
      if (serverRes && serverRes.sessionId) {
        app.globalData.sessionId = serverRes.sessionId;
        try {
          wx.setStorageSync('sessionId', serverRes.sessionId);
        } catch (e) {
          console.error('保存sessionId失败:', e);
        }
      }

      // 向服务器获取玩家信息
      const playerRes = await GetPlayerInfo();
      console.log('获取玩家信息成功:', playerRes);
      
      // 解析服务器返回的 PlayerInfo（服务器返回的是 S2CGetPlayerInfo，包含 playerInfo 字段）
      const playerInfo = playerRes.playerInfo || {};
      
      // 将 winPer（万分比）转换为百分比（用于显示）
      const winRate = playerInfo.winPer != null ? (Number(playerInfo.winPer) / 100).toFixed(2) : 0;

      // 构建用户数据（优先使用服务器返回的数据）
      const userData = {
        id: playerInfo.uid ? playerInfo.uid.toString() : (this.data.user.id || 'user_' + Date.now()),
        name: playerInfo.showName || userInfo.nickName || '微信用户',
        avatar: playerInfo.showIconUrl || userInfo.avatarUrl || '',
        phone: this.data.user.phone || '',
        points: playerInfo.monthScore ? Number(playerInfo.monthScore) : (this.data.user.points || 0),
        balance: this.data.user.balance || 0,
        coins: this.data.user.coins || 0,
        // 服务器返回的积分数据
        dayScore: playerInfo.dayScore ? Number(playerInfo.dayScore) : 0,
        weekScore: playerInfo.weekScore ? Number(playerInfo.weekScore) : 0,
        monthScore: playerInfo.monthScore ? Number(playerInfo.monthScore) : 0,
        winPer: playerInfo.winPer ? Number(playerInfo.winPer) : 0, // 万分比格式
        winRate: winRate, // 百分比格式（用于显示）
        createTime: playerInfo.createTime || null,
        // 评价相关设置（使用服务器返回的数据）
        allowEvaluation: playerInfo.commentsSwitch !== undefined ? playerInfo.commentsSwitch : (this.data.user.allowEvaluation !== undefined ? this.data.user.allowEvaluation : true),
        commentsSwitch: playerInfo.commentsSwitch !== undefined ? playerInfo.commentsSwitch : true,
        comments: playerInfo.comments || {}, // 点评信息，key=评论定义Id，value=次数
        lastEvaluationSettingTime: this.data.user.lastEvaluationSettingTime || null
      };

      // 更新页面数据
      this.setData({
        isLoggedIn: true,
        user: userData
      });

      // 更新全局状态
      app.globalData.isLoggedIn = true;
      app.globalData.userInfo = userData;

      // 保存到本地存储
      try {
        wx.setStorageSync('userInfo', userData);
        wx.setStorageSync('isLoggedIn', true);
      } catch (e) {
        console.error('保存用户信息失败:', e);
      }

      wx.hideLoading();
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      });
    } catch (err) {
      console.error('登录失败:', err);
      wx.hideLoading();
      
      const errorMessage = err.errMsg && err.errMsg.includes('getUserProfile') 
        ? '需要授权才能登录' 
        : '登录失败，请重试';
      
      wx.showToast({
        title: errorMessage,
        icon: 'none',
        duration: 2000
      });
    }
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
    const currentValue = this.data.user.commentsSwitch !== undefined ? this.data.user.commentsSwitch : this.data.user.allowEvaluation;
    
    if (this.canToggleEvaluation()) {
      // 显示加载提示
      wx.showLoading({
        title: '更新中...',
        mask: true
      });

      // 调用服务器API更新评论开关
      // StringValue 需要是字符串格式，将布尔值转换为字符串
      UpdatePlayerCommentsSwitch(value ? 'true' : 'false')
        .then((responseData) => {
          wx.hideLoading();
          
          // 服务器返回更新后的玩家信息
          const playerInfo = responseData.playerInfo || {};
          
          // 更新用户设置
          const updatedUser = {
            ...this.data.user,
            allowEvaluation: value,
            commentsSwitch: playerInfo.commentsSwitch !== undefined ? playerInfo.commentsSwitch : value,
            comments: playerInfo.comments || this.data.user.comments || {},
            lastEvaluationSettingTime: new Date().toISOString()
          };

          this.setData({
            user: updatedUser
          });

          // 更新全局状态
          app.globalData.userInfo = updatedUser;

          // 更新评价数据（因为 comments 可能已更新）
          this.updateEvaluations();

          wx.showToast({
            title: value ? '已开启评价功能' : '已关闭评价功能',
            icon: 'success'
          });
        })
        .catch((error) => {
          wx.hideLoading();
          console.error('更新评价设置失败:', error);
          
          // 如果更新失败，恢复原来的值
          this.setData({
            'user.commentsSwitch': currentValue,
            'user.allowEvaluation': currentValue
          });

          wx.showModal({
            title: '更新失败',
            content: error.message || '网络错误，请稍后重试',
            showCancel: false,
            confirmText: '确定'
          });
        });
    } else {
      // 如果不能切换，恢复原来的值
      this.setData({
        'user.commentsSwitch': currentValue,
        'user.allowEvaluation': currentValue
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
    return this.data.evaluations.reduce((sum, e) => {
      // 如果是从服务器返回的数据，使用 count 字段
      if (e.count !== undefined) {
        return sum + e.count;
      }
      // 如果是模拟数据，使用 voters.length
      return sum + (e.voters ? e.voters.length : 0);
    }, 0);
  },

  // 处理头像选择
  onChooseAvatar: async function (e) {
    const { avatarUrl } = e.detail;
    
    if (!avatarUrl) {
      console.error('未获取到头像URL');
      return;
    }

    // 显示加载提示
    wx.showLoading({
      title: '更新头像中...',
      mask: true
    });

    try {
      // 先更新本地显示（立即反馈）
      this.setData({
        'user.avatar': avatarUrl
      });

      // 调用服务器接口更新头像
      const updateRes = await UpdatePlayerAvatar(avatarUrl);
      console.log('更新头像成功:', updateRes);

      // 如果服务器返回了新的玩家信息，使用服务器数据
      if (updateRes && updateRes.playerInfo) {
        const playerInfo = updateRes.playerInfo;
        const updatedUser = {
          ...this.data.user,
          avatar: playerInfo.showIconUrl || avatarUrl,
          name: playerInfo.showName || this.data.user.name,
          commentsSwitch: playerInfo.commentsSwitch !== undefined ? playerInfo.commentsSwitch : this.data.user.commentsSwitch,
          comments: playerInfo.comments || this.data.user.comments || {}
        };

        this.setData({
          user: updatedUser
        });

        // 更新全局状态
        app.globalData.userInfo = updatedUser;

        // 保存到本地存储
        try {
          wx.setStorageSync('userInfo', updatedUser);
        } catch (e) {
          console.error('保存用户信息失败:', e);
        }
      } else {
        // 如果服务器没有返回新数据，只更新头像URL
        const updatedUser = {
          ...this.data.user,
          avatar: avatarUrl
        };

        // 更新全局状态
        app.globalData.userInfo = updatedUser;

        // 保存到本地存储
        try {
          wx.setStorageSync('userInfo', updatedUser);
        } catch (e) {
          console.error('保存用户信息失败:', e);
        }
      }

      wx.hideLoading();
      wx.showToast({
        title: '头像更新成功',
        icon: 'success',
        duration: 2000
      });
    } catch (err) {
      console.error('更新头像失败:', err);
      wx.hideLoading();
      
      // 恢复原来的头像
      const originalAvatar = app.globalData.userInfo?.avatar || '';
      this.setData({
        'user.avatar': originalAvatar
      });

      wx.showToast({
        title: '更新头像失败，请重试',
        icon: 'none',
        duration: 2000
      });
    }
  },

  // 处理昵称输入失焦
  onNicknameBlur: async function (e) {
    const newNickname = (e.detail.value || '').trim();
    await this.updateNickname(newNickname);
  },

  // 处理昵称输入确认
  onNicknameConfirm: async function (e) {
    const newNickname = (e.detail.value || '').trim();
    await this.updateNickname(newNickname);
  },

  // 更新昵称的通用函数
  updateNickname: async function (newNickname) {
    // 如果昵称为空或与当前昵称相同，不处理
    if (!newNickname || newNickname === this.data.user.name) {
      return;
    }

    // 显示加载提示
    wx.showLoading({
      title: '更新昵称中...',
      mask: true
    });

    try {
      // 先更新本地显示（立即反馈）
      this.setData({
        'user.name': newNickname
      });

      // 调用服务器接口更新昵称
      const updateRes = await UpdatePlayerNickname(newNickname);
      console.log('更新昵称成功:', updateRes);

      // 如果服务器返回了新的玩家信息，使用服务器数据
      if (updateRes && updateRes.playerInfo) {
        const playerInfo = updateRes.playerInfo;
        const updatedUser = {
          ...this.data.user,
          name: playerInfo.showName || newNickname,
          avatar: playerInfo.showIconUrl || this.data.user.avatar,
          commentsSwitch: playerInfo.commentsSwitch !== undefined ? playerInfo.commentsSwitch : this.data.user.commentsSwitch,
          comments: playerInfo.comments || this.data.user.comments || {}
        };

        this.setData({
          user: updatedUser
        });

        // 更新全局状态
        app.globalData.userInfo = updatedUser;

        // 保存到本地存储
        try {
          wx.setStorageSync('userInfo', updatedUser);
        } catch (e) {
          console.error('保存用户信息失败:', e);
        }
      } else {
        // 如果服务器没有返回新数据，只更新昵称
        const updatedUser = {
          ...this.data.user,
          name: newNickname
        };

        // 更新全局状态
        app.globalData.userInfo = updatedUser;

        // 保存到本地存储
        try {
          wx.setStorageSync('userInfo', updatedUser);
        } catch (e) {
          console.error('保存用户信息失败:', e);
        }
      }

      wx.hideLoading();
      wx.showToast({
        title: '昵称更新成功',
        icon: 'success',
        duration: 2000
      });
    } catch (err) {
      console.error('更新昵称失败:', err);
      wx.hideLoading();
      
      // 恢复原来的昵称
      const originalName = app.globalData.userInfo?.name || '';
      this.setData({
        'user.name': originalName
      });

      wx.showToast({
        title: '更新昵称失败，请重试',
        icon: 'none',
        duration: 2000
      });
    }
  }
});