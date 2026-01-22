// miniprogram/utils/request.js
// 公共请求工具

// API 基础地址
const API_BASE_URL = 'http://127.0.0.1:6999/game';
//const API_BASE_URL = 'http://172.16.1.221:6999/game';

// 调试模式开关
// true: 使用测试模式登录 (USER_LOGIN_TYPE_TEST)
// false: 使用微信小游戏登录 (USER_LOGIN_TYPE_WX_MINI_GAME)
const IS_DEBUG_MODE = true;

/**
 * 发送 PUT 请求（form格式）
 * @param {string|number} cmd - 命令号
 * @param {string} dataString - 数据（JSON字符串）
 * @returns {Promise} 返回 Promise
 */
function sendRequest(cmd, dataString) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: API_BASE_URL,
      method: 'PUT',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      // 以form格式提交，cmd和data作为表单字段
      data: {
        cmd: cmd,
        data: dataString
      },
      timeout: 10000,
      enableHttp2: false,
      enableQuic: false,
      success: function (res) {
        console.log('[PUT] 服务器响应:', res);
        
        // 检查 HTTP 状态码
        if (res.statusCode !== 200) {
          reject({
            code: res.statusCode,
            message: `HTTP错误 ${res.statusCode}: 请求失败`,
            data: res.data
          });
          return;
        }

        // 检查返回的 code
        if (res.data && res.data.code === 0) {
          // 成功，解析 data 字段
          try {
            const responseData = typeof res.data.data === 'string' 
              ? JSON.parse(res.data.data) 
              : res.data.data;
            console.log('解析后的数据:', responseData);
            resolve(responseData);
          } catch (e) {
            console.error('解析数据失败:', e);
            reject({
              code: -1,
              message: '解析服务器返回数据失败: ' + e.message,
              error: e
            });
          }
        } else {
          // 错误，显示错误信息
          const errorCode = res.data ? res.data.code : '未知';
          console.error('服务器返回错误:', res.data);
          reject({
            code: errorCode,
            message: '服务器返回错误，错误码: ' + errorCode,
            data: res.data
          });
        }
      },
      fail: function (err) {
        console.error('[PUT] 请求失败:', err);
        reject({
          code: -1,
          message: '网络请求失败',
          errMsg: err.errMsg || '未知错误',
          error: err
        });
      }
    });
  });
}

module.exports = {
  API_BASE_URL,
  sendRequest,
  IS_DEBUG_MODE
};
