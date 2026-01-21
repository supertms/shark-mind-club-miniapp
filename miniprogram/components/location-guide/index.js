// components/location-guide/index.js
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

    // 拨打电话
    onCallPhone: function (e) {
      const phone = e.currentTarget.dataset.phone;
      wx.makePhoneCall({
        phoneNumber: phone,
        success: function () {
          console.log('拨打电话成功');
        },
        fail: function (err) {
          console.error('拨打电话失败', err);
          wx.showToast({
            title: '拨打电话失败',
            icon: 'none'
          });
        }
      });
    },

    // 计算滚动区域高度
    calculateScrollHeight: function () {
      const query = wx.createSelectorQuery().in(this);
      const systemInfo = wx.getSystemInfoSync();
      const screenHeight = systemInfo.windowHeight;
      
      query.select('.location-header').boundingClientRect();
      query.exec((res) => {
        if (res[0]) {
          const headerHeight = res[0].height;
          // 模态框高度是 90vh，减去头部高度
          const modalHeight = screenHeight * 0.9;
          const availableHeight = modalHeight - headerHeight;
          const scrollHeight = Math.max(availableHeight * 2, 600); // 转换为rpx，至少600rpx
          
          this.setData({
            scrollHeight: scrollHeight
          });
        }
      });
    }
  }
});