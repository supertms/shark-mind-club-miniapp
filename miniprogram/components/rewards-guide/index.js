// components/rewards-guide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    scrollHeight: 600 // 默认高度（rpx）
  },

  /**
   * 组件生命周期
   */
  ready: function () {
    // 动态计算 scroll-view 高度
    this.calculateScrollHeight();
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
      
      query.select('.rewards-header').boundingClientRect();
      query.exec((res) => {
        if (res[0]) {
          const headerHeight = res[0].height;
          // 模态框高度是 90vh，减去头部高度和 padding
          const modalPadding = 64; // 32rpx * 2
          const availableHeight = screenHeight * 0.9 - headerHeight - modalPadding;
          const scrollHeight = Math.max(availableHeight * 2, 600); // 转换为rpx，至少600rpx
          
          this.setData({
            scrollHeight: scrollHeight
          });
        }
      });
    }
  }
});