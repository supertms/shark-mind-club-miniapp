// miniprogram/utils/player.js
// 玩家信息相关工具函数

const { API_BASE_URL, sendRequest, IS_DEBUG_MODE } = require('./request');

/**
 * 获取玩家信息
 * @returns {Promise} 返回玩家信息，包含 PlayerInfo
 */
function GetPlayerInfo() {
  // 构建请求数据（C2SGetPlayerInfo 为空对象）
  const requestData = {};

  // 将请求数据转换为JSON字符串
  const dataString = JSON.stringify(requestData);
  const cmd = '102';

  // 打印请求信息（调试用）
  console.log('请求玩家数据:', {
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

/**
 * 更新玩家头像
 * @param {string} avatarUrl - 头像URL
 * @returns {Promise} 返回更新后的玩家信息
 */
function UpdatePlayerAvatar(avatarUrl) {
  // 构建请求数据（C2SUserEdit: editType=1表示修改头像）
  const requestData = {
    editType: 1,
    StringValue: avatarUrl
  };

  // 将请求数据转换为JSON字符串
  const dataString = JSON.stringify(requestData);
  const cmd = '103';

  // 打印请求信息（调试用）
  console.log('更新玩家头像:', {
    url: API_BASE_URL,
    method: 'PUT',
    contentType: 'application/x-www-form-urlencoded',
    debugMode: IS_DEBUG_MODE,
    formData: {
      cmd: cmd,
      data: dataString
    },
    avatarUrl: avatarUrl
  });

  return sendRequest(cmd, dataString);
}

module.exports = {
  GetPlayerInfo,
  UpdatePlayerAvatar
};