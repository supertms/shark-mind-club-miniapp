//app.js
const { mockUser } = require('./data/mockData');

App({
  onLaunch: function (options) {
    // 小程序启动时执行
    console.log('App Launch');

    // 初始化全局数据
    this.initGlobalData();
  },

  onShow: function (options) {
    // 小程序显示时执行
  },

  onHide: function () {
    // 小程序隐藏时执行
  },

  onError: function (msg) {
    // 小程序发生错误时执行
    console.error(msg);
  },

  // 初始化全局数据
  initGlobalData: function () {
    // 尝试从本地存储恢复sessionId
    let sessionId = '';
    try {
      sessionId = wx.getStorageSync('sessionId') || '';
    } catch (e) {
      console.error('读取sessionId失败:', e);
    }

    this.globalData = {
      // 用户相关
      userInfo: mockUser,
      isLoggedIn: false,
      sessionId: sessionId, // 服务器登录令牌

      // 购物车相关
      cart: [],

      // 订单相关
      ongoingOrders: [],

      // 其他状态
      currentPage: 'home',
      
      // 评论定义
      commentsDefines: {}
    };
  },

  // 更新用户信息
  updateUserInfo: function (userInfo) {
    this.globalData.userInfo = userInfo;
    // 可以在这里添加数据持久化逻辑
  },

  // 更新登录状态
  setLoginStatus: function (isLoggedIn) {
    this.globalData.isLoggedIn = isLoggedIn;
  },

  // 购物车操作
  addToCart: function (product, quantity = 1, variant) {
    const existingItem = this.globalData.cart.find(
      (item) => item.product.id === product.id && item.variant === variant
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.globalData.cart.push({ product, quantity, variant });
    }
  },

  removeFromCart: function (product, variant) {
    const existingItem = this.globalData.cart.find(
      (item) => item.product.id === product.id && item.variant === variant
    );

    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        this.globalData.cart = this.globalData.cart.filter(
          (item) => !(item.product.id === product.id && item.variant === variant)
        );
      }
    }
  },

  clearCart: function () {
    this.globalData.cart = [];
  },

  // 订单操作
  addOrder: function (order) {
    this.globalData.ongoingOrders.unshift(order);
  },

  // 获取购物车总金额
  getCartTotal: function () {
    return this.globalData.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  },

  // 获取购物车商品数量
  getCartItemCount: function () {
    return this.globalData.cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  globalData: {}
});