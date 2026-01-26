// miniprogram/utils/RankCommentDef.js
// 评论定义相关工具函数

const { API_BASE_URL, sendRequest, IS_DEBUG_MODE } = require('./request');

/**
 * 获取各种定义列表（评论定义等）
 * 协议：cmd=DEFINE_GET_LIST (106)
 * 无需登录
 * @returns {Promise} 返回定义列表，包含 commentsDefines 对象（key=枚举值, value=中文描述）
 */
function GetDefineList() {
  // 构建请求数据（C2SDefineGetList 为空对象）
  const requestData = {};

  // 将请求数据转换为JSON字符串
  const dataString = JSON.stringify(requestData);
  const cmd = '106'; // DEFINE_GET_LIST

  // 打印请求信息（调试用）
  console.log('请求定义列表:', {
    url: API_BASE_URL,
    method: 'PUT',
    contentType: 'application/x-www-form-urlencoded',
    debugMode: IS_DEBUG_MODE,
    formData: {
      cmd: cmd,
      data: dataString
    }
  });

  return sendRequest(cmd, dataString);
}

module.exports = {
  GetDefineList
};
