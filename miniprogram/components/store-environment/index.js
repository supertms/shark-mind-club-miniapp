// components/store-environment/index.js
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
    currentIndex: 0,
    storeImages: [
      { url: '/assets/store1.png', title: '德州扑克专业牌桌' },
      { url: '/assets/store2.png', title: 'Shark Mind Logo墙' },
      { url: '/assets/store3.png', title: '店内欢乐氛围' },
      { url: '/assets/store4.png', title: '金色水晶灯与鸡尾酒' },
      { url: '/assets/store5.png', title: 'Shark Mind品牌周边' },
      { url: '/assets/store6.png', title: '精选特调饮品' },
      { url: '/assets/store7.png', title: '扑克牌桌氛围' },
      { url: '/assets/store8.png', title: '品牌钥匙扣展示' },
      { url: '/assets/store9.png', title: 'Shark Mind钥匙扣' },
      { url: '/assets/store10.png', title: '店内灯光氛围' }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭组件
    onClose: function () {
      this.triggerEvent('close');
    },

    // 上一张
    goToPrevious: function () {
      const { currentIndex, storeImages } = this.data;
      const newIndex = currentIndex === 0 ? storeImages.length - 1 : currentIndex - 1;
      this.setData({
        currentIndex: newIndex
      });
    },

    // 下一张
    goToNext: function () {
      const { currentIndex, storeImages } = this.data;
      const newIndex = currentIndex === storeImages.length - 1 ? 0 : currentIndex + 1;
      this.setData({
        currentIndex: newIndex
      });
    },

    // 跳转到指定图片
    goToImage: function (e) {
      const index = e.currentTarget.dataset.index;
      this.setData({
        currentIndex: index
      });
    }
  }
});