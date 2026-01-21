// pages/order/index.js
const app = getApp();
const { categories, products } = require('../../data/mockData');

Page({
  data: {
    // 页面状态
    selectedCategory: 'general-package',
    cart: [],
    cartTotal: 0,
    formattedCartTotal: '0.00',
    cartCount: 0,
    ongoingOrders: [],
    isLoggedIn: false,

    // 数据
    categories: [],
    products: [],
    filteredProducts: [],

    // UI状态
    showCheckoutModal: false
  },

  onLoad: function (options) {
    this.initializeData();
  },

  onShow: function () {
    // 从全局状态同步数据
    this.updateData();
    this.updateFilteredProducts();
  },

  // 初始化数据
  initializeData: function () {
    // 根据是否有进行中订单来过滤分类
    const globalData = app.globalData;
    const availableCategories = categories.filter(category => {
      if (category.id === 'ongoing-orders') {
        return (globalData.ongoingOrders || []).length > 0;
      }
      return true;
    });

    this.setData({
      categories: availableCategories,
      products: products,
      selectedCategory: availableCategories[0].id
    });

    this.updateFilteredProducts();
    this.updateData();
  },

  // 更新页面数据
  updateData: function () {
    const globalData = app.globalData;
    const cart = (globalData.cart || []).map(item => {
      const price = item.product?.price ?? 0;
      return {
        ...item,
        formattedPrice: (price * item.quantity).toFixed(2)
      };
    });
    const cartTotal = cart.reduce((sum, item) => {
      const price = item.product?.price ?? 0;
      return sum + price * item.quantity;
    }, 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    // 处理进行中订单，为每个订单项添加格式化的价格
    const ongoingOrders = (globalData.ongoingOrders || []).map(order => {
      const orderTotal = order.items.reduce((sum, item) => {
        const itemPrice = item.product?.price ?? 0;
        return sum + itemPrice * item.quantity;
      }, 0);

      return {
        ...order,
        formattedTotal: orderTotal.toFixed(2),
        items: order.items.map(orderItem => {
          const itemPrice = orderItem.product?.price ?? 0;
          return {
            ...orderItem,
            formattedPrice: (itemPrice * orderItem.quantity).toFixed(2)
          };
        })
      };
    });

    this.setData({
      cart: cart,
      cartTotal: cartTotal,
      formattedCartTotal: cartTotal.toFixed(2),
      cartCount: cartCount,
      ongoingOrders: ongoingOrders,
      isLoggedIn: globalData.isLoggedIn || false
    });
  },

  // 更新过滤后的商品列表
  updateFilteredProducts: function () {
    const { selectedCategory, products, cart } = this.data;
    if (selectedCategory === 'ongoing-orders') {
      this.setData({
        filteredProducts: []
      });
      return;
    }

    const filtered = products.filter(p => p.category === selectedCategory).map(product => {
      // 计算每个商品在购物车中的数量
      const cartItem = cart.find(item => item.product.id === product.id && !item.variant);
      return {
        ...product,
        quantity: cartItem ? cartItem.quantity : 0,
        formattedPrice: product.price.toFixed(2)
      };
    });

    this.setData({
      filteredProducts: filtered
    });
  },

  // 切换分类
  onCategoryChange: function (e) {
    const categoryId = e.currentTarget.dataset.category;
    this.setData({
      selectedCategory: categoryId
    });
    this.updateFilteredProducts();
  },

  // 添加到购物车
  onAddToCart: function (e) {
    const productId = e.currentTarget.dataset.productId;
    const product = this.data.products.find(p => p.id === productId);
    
    if (!product) return;

    const variant = e.currentTarget.dataset.variant;
    app.addToCart(product, 1, variant);

    // 更新本地数据
    this.updateData();
    this.updateFilteredProducts();

    wx.showToast({
      title: `已添加${product.name}到购物车`,
      icon: 'success',
      duration: 1000
    });
  },

  // 从购物车移除
  onRemoveFromCart: function (e) {
    const productId = e.currentTarget.dataset.productId;
    const product = this.data.products.find(p => p.id === productId);
    
    if (!product) return;

    const variant = e.currentTarget.dataset.variant;
    app.removeFromCart(product, variant);

    // 更新本地数据
    this.updateData();
    this.updateFilteredProducts();

    wx.showToast({
      title: `已移除${product.name}`,
      icon: 'success',
      duration: 1000
    });
  },

  // 获取商品在购物车中的数量
  getProductQuantity: function (productId, variant) {
    const item = this.data.cart.find(
      item => item.product.id === productId && item.variant === variant
    );
    return item ? item.quantity : 0;
  },

  // 计算购物车总金额
  getCartTotal: function () {
    return this.data.cart.reduce((sum, item) => {
      const price = item.product?.price ?? 0;
      return sum + price * item.quantity;
    }, 0);
  },

  // 计算购物车商品数量
  getCartCount: function () {
    return this.data.cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  // 显示结算模态框
  onShowCheckoutModal: function () {
    if (!this.data.isLoggedIn) {
      wx.showToast({
        title: '请先登录后再进行结算',
        icon: 'none'
      });
      return;
    }

    if (this.data.cart.length === 0) {
      wx.showToast({
        title: '购物车为空',
        icon: 'none'
      });
      return;
    }

    this.setData({
      showCheckoutModal: true
    });
  },

  // 关闭结算模态框
  onCloseCheckoutModal: function () {
    this.setData({
      showCheckoutModal: false
    });
  },

  // 确认订单
  onConfirmOrder: function () {
    if (this.data.cart.length === 0) return;

    // 生成订单号
    const now = new Date();
    const orderNumber = `SM${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    
    // 格式化时间
    const orderTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    // 计算总金额
    const totalAmount = this.data.cartTotal;

    // 创建新订单
    const newOrder = {
      id: `order${Date.now()}`,
      orderNumber,
      items: this.data.cart.map(item => ({
        product: item.product,
        quantity: item.quantity,
        variant: item.variant,
      })),
      totalAmount,
      orderTime,
      isCompleted: false,
    };

    // 添加到进行中订单列表
    app.addOrder(newOrder);

    // 清空购物车
    app.clearCart();

    // 更新本地数据
    this.updateData();
    this.setData({
      showCheckoutModal: false
    });

    // 显示成功提示
    wx.showToast({
      title: '订单已确认！工作人员会尽快为您送达！',
      icon: 'success',
      duration: 2000
    });

    // 切换到进行中订单分类
    setTimeout(() => {
      this.setData({
        selectedCategory: 'ongoing-orders'
      });
      this.updateFilteredProducts();
    }, 2000);
  },

  // 返回首页
  onBack: function () {
    wx.navigateBack();
  }
});