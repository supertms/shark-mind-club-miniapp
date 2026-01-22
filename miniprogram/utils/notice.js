// miniprogram/utils/notice.js
// 公告相关工具函数

const { API_BASE_URL, sendRequest, IS_DEBUG_MODE } = require('./request');

/**
 * 获取公告列表
 * 协议：cmd=NOTICE_GET_LIST (104)
 * 无需登录
 * @returns {Promise} 返回公告列表，包含 noticeList 数组
 */
function GetNoticeList() {
  // 构建请求数据（C2SGetNotice 为空对象）
  const requestData = {};

  // 将请求数据转换为JSON字符串
  const dataString = JSON.stringify(requestData);
  const cmd = '104';

  // 打印请求信息（调试用）
  console.log('请求公告列表:', {
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
  GetNoticeList
};
