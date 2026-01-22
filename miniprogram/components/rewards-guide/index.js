// components/rewards-guide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示组件
    show: {
      type: Boolean,
      value: true,
      observer: function(newVal) {
        if (newVal) {
          // 当组件显示时，重新计算高度
          setTimeout(() => {
            this.calculateScrollHeight();
          }, 300);
        }
      }
    }
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
    // 使用延迟确保 DOM 完全渲染后再计算
    setTimeout(() => {
      this.calculateScrollHeight();
    }, 300);
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
      
      // 查询头部高度和整个内容容器高度
      query.select('.rewards-header').boundingClientRect();
      query.select('.rewards-guide-content').boundingClientRect();
      query.exec((res) => {
        if (res[0] && res[1]) {
          // 成功查询到头部和容器
          const headerHeight = res[0].height;
          const contentHeight = res[1].height;
          // 使用实际容器高度减去头部高度，确保占满可用空间
          const availableHeight = contentHeight - headerHeight;
          // 转换为rpx：px * 2
          const scrollHeight = Math.max(availableHeight * 2, 600); // 至少600rpx
          
          console.log('奖励说明滚动区域高度计算:', {
            screenHeight,
            contentHeight,
            headerHeight,
            availableHeight,
            scrollHeight
          });
          
          this.setData({
            scrollHeight: scrollHeight
          });
        } else if (res[0]) {
          // 只查询到头部，尝试查询父级模态框的实际高度
          const headerHeight = res[0].height;
          
          // 查询父级模态框的实际高度（在页面中）
          const parentQuery = wx.createSelectorQuery();
          parentQuery.selectAll('.rewards-guide-modal').boundingClientRect();
          parentQuery.exec((parentRes) => {
            let modalHeight = screenHeight * 0.7; // 默认值：70vh
            
            // 如果查询到模态框，使用实际高度
            if (parentRes[0] && parentRes[0].length > 0) {
              modalHeight = parentRes[0][0].height;
            }
            
            const availableHeight = modalHeight - headerHeight;
            // 转换为rpx：px * 2，确保占满可用空间
            const scrollHeight = Math.max(availableHeight * 2, 600);
            
            console.log('奖励说明滚动区域高度计算（使用模态框实际高度）:', {
              screenHeight,
              modalHeight,
              headerHeight,
              availableHeight,
              scrollHeight,
              '查询结果': parentRes[0] && parentRes[0].length > 0 ? '查询到模态框' : '使用默认值70vh'
            });
            
            this.setData({
              scrollHeight: scrollHeight
            });
          });
        } else {
          // 如果查询失败，延迟重试
          setTimeout(() => {
            this.calculateScrollHeight();
          }, 200);
        }
      });
    }
  }
});