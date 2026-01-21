// pages/location-guide/index.js
Page({
  data: {
    // 页面数据
  },

  onLoad: function (options) {
    // 页面加载
  },

  onReady: function () {
    // 页面初次渲染完成
  },

  onShow: function () {
    // 页面显示
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

  // 返回上一页
  onBack: function () {
    wx.navigateBack();
  }
});