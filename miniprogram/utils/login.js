const { sendRequest } = require('../../data/mockData');


function GetClientInfo()
{
  return BaseClientInfo = {
    channel = 0,
    language = 0,
    deviceName = "iphone",
    deviceId = "0001",
    terminalType = 1,
    terminalInfo = "iphone13",
    operatingSystem = "ios",
    clientVersion = 1
  };
}

function GetUserLoginTypeTest()
{
  return UserLoginTypeTest = {
    userName: "null",
    password: "123456",
  };
}


function GetUserLoginTypeWxMiniGame(wxcode)
{
  return LoginTypeWxMiniGame = {
    js_code: wxcode
  };
}

function LoginToServer(wxcode)
{
  // 构建请求数据
  const requestData = {
    clientInfo: GetClientInfo(),
    loginType: "USER_LOGIN_TYPE_WX_MINI_GAME",
    UserLoginTypeTest: GetUserLoginTypeTest(),
    UserLoginTypeWxMiniGame: GetUserLoginTypeWxMiniGame(wxcode),
  };

  // 将请求数据转换为JSON字符串
  const dataString = JSON.stringify(requestData);
  const cmd = 101;

  
  // 打印请求信息（调试用）
  console.log('请求登录:', {
    url: API_BASE_URL,
    method: 'PUT',
    contentType: 'application/x-www-form-urlencoded',
    formData: {
      cmd: cmd,
      data: dataString
    },
    rankTypeEnum: rankTypeEnum
  });

  return sendRequest(cmd, dataString);
}