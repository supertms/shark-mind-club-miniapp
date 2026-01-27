// miniprogram/utils/battle.js
// 赛事相关工具函数

const { API_BASE_URL, sendRequest, IS_DEBUG_MODE } = require('./request');

/**
 * 获取房间列表
 * 协议：cmd=BATTLE_LIST (200)
 * @param {number} statusValue - 状态值，0=进行中(PLAYING)，1=已结束(END)
 * @returns {Promise} 返回房间列表（S2CRoomGetList）
 */
function GetRoomList(statusValue = 0) {
  // 构建请求数据（C2SRoomGetList）
  const requestData = {
    statusValue: statusValue
  };

  // 将请求数据转换为JSON字符串
  const dataString = JSON.stringify(requestData);
  const cmd = '200'; // BATTLE_LIST

  // 打印请求信息（调试用）
  console.log('请求房间列表:', {
    url: API_BASE_URL,
    method: 'PUT',
    contentType: 'application/x-www-form-urlencoded',
    debugMode: IS_DEBUG_MODE,
    formData: {
      cmd: cmd,
      data: dataString
    },
    statusValue: statusValue
  });

  return sendRequest(cmd, dataString);
}

/**
 * 加入房间
 * 协议：cmd=BATTLE_JOIN (201)
 * 需要登录
 * @param {number|string} roomId - 房间id
 * @returns {Promise} 返回加入结果（S2CRoomJoin）
 */
function JoinRoom(roomId) {
  // 构建请求数据（C2SRoomJoin）
  const requestData = {
    id: typeof roomId === 'string' ? parseInt(roomId) : roomId
  };

  // 将请求数据转换为JSON字符串
  const dataString = JSON.stringify(requestData);
  const cmd = '201'; // BATTLE_JOIN

  // 打印请求信息（调试用）
  console.log('请求加入房间:', {
    url: API_BASE_URL,
    method: 'PUT',
    contentType: 'application/x-www-form-urlencoded',
    debugMode: IS_DEBUG_MODE,
    formData: {
      cmd: cmd,
      data: dataString
    },
    roomId: roomId
  });

  return sendRequest(cmd, dataString);
}

/**
 * 离开房间
 * 协议：cmd=BATTLE_EXIT (202)
 * 需要登录
 * @param {number|string} roomId - 房间id
 * @returns {Promise} 返回离开结果（S2CRoomExit）
 */
function ExitRoom(roomId) {
  // 构建请求数据（C2SRoomExit）
  const requestData = {
    id: typeof roomId === 'string' ? parseInt(roomId) : roomId
  };

  // 将请求数据转换为JSON字符串
  const dataString = JSON.stringify(requestData);
  const cmd = '202'; // BATTLE_EXIT

  // 打印请求信息（调试用）
  console.log('请求离开房间:', {
    url: API_BASE_URL,
    method: 'PUT',
    contentType: 'application/x-www-form-urlencoded',
    debugMode: IS_DEBUG_MODE,
    formData: {
      cmd: cmd,
      data: dataString
    },
    roomId: roomId
  });

  return sendRequest(cmd, dataString);
}

module.exports = {
  GetRoomList,
  JoinRoom,
  ExitRoom
};
