// miniprogram/utils/login.js
// 登录相关工具函数

const { API_BASE_URL, sendRequest, IS_DEBUG_MODE } = require('./request');

// 登录类型枚举
const LOGIN_TYPE = {
  USER_LOGIN_TYPE_TEST: 0,           // 测试模式
  USER_LOGIN_TYPE_WX_MINI_GAME: 1    // 微信小游戏
};

/**
 * 获取客户端信息（BaseClientInfo）
 * @returns {Object} 客户端信息对象
 */
function GetClientInfo() {
  const systemInfo = wx.getSystemInfoSync();
  return {
    channel: 0,
    language: 0,
    deviceName: systemInfo.model || "iphone",
    deviceId: systemInfo.system || "0001",
    terminalType: 1,
    terminalInfo: systemInfo.brand || "iphone13",
    operatingSystem: systemInfo.platform || "ios",
    clientVersion: 1
  };
}

/**
 * 获取测试登录参数
 * @returns {Object} 测试登录参数
 */
function GetUserLoginTypeTest() {
  return {
    userName: "test111",
    password: "123456"
  };
}

/**
 * 获取微信小游戏登录参数
 * @param {string} wxcode - 微信登录返回的 code
 * @returns {Object} 微信小游戏登录参数
 */
function GetUserLoginTypeWxMiniGame(wxcode) {
  return {
    js_code: wxcode
  };
}


/**
 * 登录到服务器
 * @param {string} wxcode - 微信登录返回的 code（调试模式下可为空）
 * @returns {Promise} 返回登录结果，包含 sessionId
 */
function LoginToServer(wxcode) {
  // 根据调试模式选择登录类型
  const loginType = IS_DEBUG_MODE 
    ? LOGIN_TYPE.USER_LOGIN_TYPE_TEST 
    : LOGIN_TYPE.USER_LOGIN_TYPE_WX_MINI_GAME;

  // 构建请求数据
  const requestData = {
    clientInfo: GetClientInfo(),
    loginType: loginType,
    userLoginTypeTest: GetUserLoginTypeTest(),
    wxMiniGame: GetUserLoginTypeWxMiniGame(wxcode)
  };

  // 将请求数据转换为JSON字符串
  const dataString = JSON.stringify(requestData);
  const cmd = '101';

  // 打印请求信息（调试用）
  console.log('请求登录:', {
    url: API_BASE_URL,
    method: 'PUT',
    contentType: 'application/x-www-form-urlencoded',
    debugMode: IS_DEBUG_MODE,
    loginType: loginType,
    formData: {
      cmd: cmd,
      data: dataString
    }
  });

  return sendRequest(cmd, dataString);
}

module.exports = {
  LoginToServer
};