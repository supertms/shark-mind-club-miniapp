// miniprogram/utils/comment.js
// 评论相关工具函数

const { API_BASE_URL, sendRequest, IS_DEBUG_MODE } = require('./request');

/**
 * 点评玩家（点赞）
 * 协议：cmd=COMMENT (107)
 * 需要登录
 * @param {number|string} uid - 被点评的玩家id
 * @param {number|string} defineId - 点评定义Id（评论类型Id）
 * @returns {Promise} 返回空对象（S2CComment 为空）
 */
function CommentPlayer(uid, defineId) {
  // 构建请求数据（C2SComment）
  const requestData = {
    uid: typeof uid === 'string' ? parseInt(uid) : uid,
    defineId: typeof defineId === 'string' ? parseInt(defineId) : defineId
  };

  // 将请求数据转换为JSON字符串
  const dataString = JSON.stringify(requestData);
  const cmd = '107'; // COMMENT

  // 打印请求信息（调试用）
  console.log('请求点评玩家:', {
    url: API_BASE_URL,
    method: 'PUT',
    contentType: 'application/x-www-form-urlencoded',
    debugMode: IS_DEBUG_MODE,
    formData: {
      cmd: cmd,
      data: dataString
    },
    uid: uid,
    defineId: defineId
  });

  return sendRequest(cmd, dataString);
}

module.exports = {
  CommentPlayer
};
