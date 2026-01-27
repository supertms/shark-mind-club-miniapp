// components/comment-confirm-dialog/index.js
const { CommentPlayer } = require('../../utils/comment');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示对话框
    show: {
      type: Boolean,
      value: false
    },
    // 玩家名称
    playerName: {
      type: String,
      value: ''
    },
    // 待确认的点赞类型名称
    commentTypeName: {
      type: String,
      value: ''
    },
    // 被点评的玩家id
    playerId: {
      type: Number,
      value: 0
    },
    // 点评定义Id（评论类型Id）
    defineId: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isSubmitting: false // 防止重复提交
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 取消点赞
    onCancel: function (e) {
      // 阻止事件冒泡和默认行为
      if (e) {
        e.stopPropagation && e.stopPropagation();
        e.preventDefault && e.preventDefault();
      }
      this.triggerEvent('cancel');
    },

    // 确认点赞
    onConfirm: function (e) {
      // 防止重复提交
      if (this.data.isSubmitting) {
        return;
      }
      
      // 阻止事件冒泡和默认行为
      if (e) {
        e.stopPropagation && e.stopPropagation();
        e.preventDefault && e.preventDefault();
      }
      
      const { playerId, defineId } = this.properties;
      
      if (!playerId || !defineId) {
        wx.showToast({
          title: '参数错误',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      // 设置提交状态
      this.setData({
        isSubmitting: true
      });

      // 显示加载提示
      wx.showLoading({
        title: '提交中...',
        mask: true
      });

      // 调用服务器API提交点赞
      CommentPlayer(playerId, defineId)
        .then((responseData) => {
          wx.hideLoading();
          
          // 重置提交状态
          this.setData({
            isSubmitting: false
          });
          
          // 服务器返回成功（S2CComment 为空对象）
          // 触发成功事件，让父页面更新状态
          this.triggerEvent('confirm', {
            success: true,
            playerId: playerId,
            defineId: defineId
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
            isSubmitting: false
          });
          
          // 触发失败事件
          this.triggerEvent('confirm', {
            success: false,
            error: error
          });
          
          wx.showModal({
            title: '点赞失败',
            content: error.message || '网络错误，请稍后重试',
            showCancel: false,
            confirmText: '确定'
          });
        });
    },

    // 阻止事件冒泡
    stopPropagation: function (e) {
      // 阻止事件冒泡
      if (e) {
        e.stopPropagation && e.stopPropagation();
      }
    }
  }
});
