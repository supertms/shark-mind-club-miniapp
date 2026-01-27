// components/comment-confirm-dialog/index.js
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 取消点赞
    onCancel: function () {
      this.triggerEvent('cancel');
    },

    // 确认点赞
    onConfirm: function () {
      this.triggerEvent('confirm');
    },

    // 阻止事件冒泡
    stopPropagation: function () {
      // 空函数，用于阻止事件冒泡
    }
  }
});
