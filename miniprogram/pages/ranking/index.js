// pages/ranking/index.js
const app = getApp();
const {
  playerEvaluationsData,
  mockUser,
  weekRankingData,
  monthRankingData,
  winRateRankingData
} = require('../../data/mockData');
const { requestRankList, convertRankListData } = require('../../utils/api');
const { CommentPlayer } = require('../../utils/comment');

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
    loading: false,

    // 评价模态框状态
    showEvaluationModal: false,
    evaluationPlayer: null, // 当前评价的玩家信息
    evaluationTypes: [], // 评价类型列表
    likedCommentType: null, // 已点赞的评论类型
    likedCommentTypeName: '', // 已点赞的评论类型名称
    showAlreadyLikedDialog: false, // 已点赞提示对话框
    isSubmittingLike: false, // 是否正在提交点赞

    // 缓存数据
    cachedRankings: {
      week: [],
      month: [],
      quarter: [],
      year: [],
      winRate: []
    }
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
    
    // 如果全局数据中有 commentsDefines，重新处理排行榜数据
    if (globalData.commentsDefines && this.data.rankings.length > 0) {
      this.updateRankings(this.data.rankings);
    }
    
    this.loadRankings();
  },

  // 初始化页面数据
  initializeData: function () {
    this.loadRankings();
  },

  // 将小程序 tab 映射到服务器 rankType
  getRankTypeForTab: function (tab) {
    const mapping = {
      'week': 1,      // WEEK
      'month': 2,     // MONTH
      'quarter': 2,   // 季度也用 MONTH，可能需要根据实际需求调整
      'year': 2,      // 年度也用 MONTH，可能需要根据实际需求调整
      'winRate': 4    // WIN (胜率榜)
    };
    return mapping[tab] || 1;
  },

  // 从服务器加载排行榜数据
  loadRankings: function () {
    const { selectedTab, cachedRankings } = this.data;
    
    // 如果已有缓存数据，先显示缓存
    if (cachedRankings[selectedTab] && cachedRankings[selectedTab].length > 0) {
      this.updateRankings(cachedRankings[selectedTab]);
    }

    // 设置加载状态
    this.setData({
      loading: true
    });

    // 获取对应的 rankType
    const rankType = this.getRankTypeForTab(selectedTab);

    // 请求服务器数据
    requestRankList({
      rankType: rankType,
      page: 1,
      pageNum: 100,
      season: 0
    }).then((serverData) => {
      // 转换数据格式
      const convertedData = convertRankListData(serverData);
      const rankings = convertedData.rankList || [];

      // 更新缓存
      const newCachedRankings = { ...cachedRankings };
      newCachedRankings[selectedTab] = rankings;

      // 更新页面数据
      this.setData({
        cachedRankings: newCachedRankings,
        loading: false
      });

      // 处理我的排名
      this.processMyRanking(convertedData.myRankIndex, rankings);

      // 更新排行榜显示
      this.updateRankings(rankings);
    }).catch((error) => {
      console.error('加载排行榜失败:', error);
      
      this.setData({
        loading: false
      });

      // 如果加载失败，尝试使用缓存数据
      if (cachedRankings[selectedTab] && cachedRankings[selectedTab].length > 0) {
        console.log('使用缓存数据');
        this.updateRankings(cachedRankings[selectedTab]);
        return;
      }

      // 如果缓存也没有，使用模拟数据作为降级方案
      console.log('使用模拟数据作为降级方案');
      let fallbackData = [];
      switch (selectedTab) {
        case 'week':
          fallbackData = weekRankingData || [];
          break;
        case 'month':
          fallbackData = monthRankingData || [];
          break;
        case 'winRate':
          fallbackData = winRateRankingData || [];
          break;
        default:
          fallbackData = weekRankingData || [];
      }
      
      if (fallbackData.length > 0) {
        this.updateRankings(fallbackData);
        wx.showToast({
          title: '使用离线数据',
          icon: 'none',
          duration: 2000
        });
      } else {
        // 显示错误信息
        wx.showModal({
          title: '加载失败',
          content: error.message || '获取排行榜数据失败，请稍后重试',
          showCancel: false,
          confirmText: '确定'
        });
      }
    });
  },

  // 处理我的排名数据
  processMyRanking: function (myRankIndex, rankings) {
    const { currentUser, selectedTab } = this.data;
    let myRankingData = null;
    let myRank = null;
    let isInTop50 = false;

    if (myRankIndex > 0) {
      // 在榜单中找到我的排名数据
      myRankingData = rankings.find(user => user.id === currentUser.id.toString());
      myRank = myRankIndex;
      isInTop50 = myRankIndex <= 50;
    } else if (myRankIndex === 0) {
      // 未上榜
      myRank = null;
      isInTop50 = false;
    } else {
      // myRankIndex === -1，未登录
      myRank = null;
      isInTop50 = false;
    }

    // 格式化我的排名数据
    const formattedMyRankingData = myRankingData ? {
      ...myRankingData,
      formattedPoints: myRankingData.points ? myRankingData.points.toLocaleString() : '0',
      formattedWinRate: myRankingData.winRate ? myRankingData.winRate.toFixed(1) : '0.0'
    } : null;

    this.setData({
      myRankingData: formattedMyRankingData,
      myRank: myRank,
      isInTop50: isInTop50
    });
  },

  // 更新排行榜显示
  updateRankings: function (rankings) {
    if (!rankings || rankings.length === 0) {
      this.setData({
        rankings: []
      });
      return;
    }

    // 获取评论定义映射表（从全局数据或页面数据）
    const commentsDefines = app.globalData.commentsDefines || {};

    // 为每个排行榜项添加评价标签和格式化数据
    const rankingsWithEvaluations = rankings.map(item => {
      // 确保 winRate 是数字类型
      const winRate = typeof item.winRate === 'number' ? item.winRate : (item.winRate ? Number(item.winRate) : 0);
      // 确保 points 是数字类型
      const points = typeof item.points === 'number' ? item.points : (item.points ? Number(item.points) : 0);
      
      // 处理 comments，将评论定义Id转换为中文描述
      const commentTags = [];
      if (item.comments && typeof item.comments === 'object') {
        Object.keys(item.comments).forEach(commentId => {
          const commentCount = item.comments[commentId];
          const commentText = commentsDefines[commentId] || `评论${commentId}`;
          if (commentCount > 0) {
            commentTags.push({
              id: commentId,
              type: commentText,
              count: commentCount
            });
          }
        });
        // 按次数排序，取前3个
        commentTags.sort((a, b) => b.count - a.count);
        commentTags.splice(3);
      }
      
      return {
        ...item,
        winRate: winRate, // 确保是数字类型
        points: points,   // 确保是数字类型
        evaluationTags: this.getPlayerEvaluations(item.id),
        commentTags: commentTags, // 评论标签（从服务器获取）
        allowEvaluation: item.commentsSwitch !== undefined ? item.commentsSwitch : this.isEvaluationAllowed(item.id),
        formattedPoints: points ? points.toLocaleString() : '0',
        formattedWinRate: winRate ? winRate.toFixed(1) : '0.0'
      };
    });

    this.setData({
      rankings: rankingsWithEvaluations
    });
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
    // 重新加载数据
    this.loadRankings();
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
    if (!this.data.isLoggedIn) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }
    
    // 检查玩家是否允许被评价（使用 commentsSwitch 字段）
    if (player.commentsSwitch === false) {
      wx.showToast({
        title: '该玩家不允许评价',
        icon: 'none'
      });
      return;
    }

    // 获取评价类型列表
    const evaluationTypes = this.getEvaluationTypesWithCounts(player);
    
    // 获取已点赞的类型名称（如果有）
    const commentsDefines = app.globalData.commentsDefines || {};
    const likedCommentTypeName = this.data.likedCommentType ? (commentsDefines[this.data.likedCommentType] || '') : '';

    // 打开评价模态框
    this.setData({
      showEvaluationModal: true,
      evaluationPlayer: player,
      evaluationTypes: evaluationTypes,
      likedCommentType: null, // 重置点赞状态，实际应该从服务器获取
      likedCommentTypeName: likedCommentTypeName || ''
    });
  },

  // 关闭玩家评价模态框
  onClosePlayerEvaluation: function () {
    this.setData({
      showEvaluationModal: false,
      evaluationPlayer: null,
      showAlreadyLikedDialog: false
    });
  },

  // 处理点赞（直接发送协议）
  onLikeComment: function (e) {
    const commentType = e.currentTarget.dataset.type;
    const { likedCommentType, evaluationPlayer, isSubmittingLike } = this.data;
    
    // 防止重复提交
    if (isSubmittingLike) {
      return;
    }
    
    // 如果已经点赞过，显示提示对话框
    if (likedCommentType) {
      this.setData({
        showAlreadyLikedDialog: true
      });
      return;
    }
    
    if (!evaluationPlayer || !evaluationPlayer.id) {
      wx.showToast({
        title: '参数错误',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    // 设置提交状态
    this.setData({
      isSubmittingLike: true
    });
    
    // 显示加载提示
    wx.showLoading({
      title: '提交中...',
      mask: true
    });
    
    // 直接调用服务器API提交点赞
    CommentPlayer(evaluationPlayer.id, commentType)
      .then((responseData) => {
        wx.hideLoading();
        
        // 重置提交状态
        this.setData({
          isSubmittingLike: false
        });
        
        // 获取评论类型名称
        const commentsDefines = app.globalData.commentsDefines || {};
        const likedCommentTypeName = commentsDefines[commentType] || `评论${commentType}` || '';
        
        // 更新评价类型列表，增加点赞数
        const updatedTypes = this.data.evaluationTypes.map(type => {
          if (type.id === commentType) {
            return {
              ...type,
              count: type.count + 1,
              hasVotes: true
            };
          }
          return type;
        });
        
        // 更新状态
        this.setData({
          likedCommentType: commentType,
          likedCommentTypeName: likedCommentTypeName || '',
          evaluationTypes: updatedTypes
        });
        
        wx.showToast({
          title: '点赞成功',
          icon: 'success',
          duration: 2000
        });
      })
      .catch((error) => {
        wx.hideLoading();
        console.error('点赞失败:', error);
        
        // 重置提交状态
        this.setData({
          isSubmittingLike: false
        });
        
        wx.showModal({
          title: '点赞失败',
          content: error.message || '网络错误，请稍后重试',
          showCancel: false,
          confirmText: '确定'
        });
      });
  },

  // 关闭已点赞提示对话框
  onCloseAlreadyLikedDialog: function () {
    this.setData({
      showAlreadyLikedDialog: false
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
  },

  // 获取所有评价类型列表（从 commentsDefines 获取），并包含玩家的点赞数
  getEvaluationTypesWithCounts: function (player) {
    const commentsDefines = app.globalData.commentsDefines || {};
    const types = [];
    
    // 将 commentsDefines 转换为数组
    Object.keys(commentsDefines).forEach(key => {
      const count = this.getCommentCount(player, key);
      types.push({
        id: key,
        name: commentsDefines[key],
        count: count,
        hasVotes: count > 0
      });
    });
    
    // 按点赞数降序排序（有评价的放前面）
    types.sort((a, b) => {
      if (a.hasVotes && !b.hasVotes) return -1;
      if (!a.hasVotes && b.hasVotes) return 1;
      return b.count - a.count;
    });
    
    return types;
  },

  // 获取玩家某个评价类型的点赞数
  getCommentCount: function (player, commentId) {
    if (!player || !player.comments) {
      return 0;
    }
    return player.comments[commentId] || 0;
  }
});