// utils/api.js
// API 请求工具

const { API_BASE_URL, sendRequest } = require('./request');

// 开发模式配置
// 注意：微信开发者工具对本地 IP 的 HTTP 请求可能返回 502 错误
// 解决方案：
// 1. 使用真机调试（真机可以访问内网）
// 2. 使用本地代理服务器
// 3. 暂时使用模拟数据（设置 USE_MOCK_DATA = true）
const USE_MOCK_DATA = false; // 设置为 true 时使用模拟数据，false 时使用服务器数据

// 排行榜类型枚举映射
const RANK_TYPE_ENUM = {
  WEEK: 'WEEK',      // 周榜
  MONTH: 'MONTH',    // 月榜
  DAY: 'DAY',        // 日榜
  WIN: 'WIN'         // 胜率榜
};

// 将数字 rankType 转换为枚举名称
function getRankTypeEnum(rankType) {
  const mapping = {
    1: RANK_TYPE_ENUM.WEEK,
    2: RANK_TYPE_ENUM.MONTH,
    3: RANK_TYPE_ENUM.DAY,
    4: RANK_TYPE_ENUM.WIN
  };
  return mapping[rankType] || RANK_TYPE_ENUM.WEEK;
}

// 将枚举名称转换为数字（用于判断类型）
function getRankTypeNumber(rankTypeEnum) {
  const mapping = {
    'WEEK': 1,
    'MONTH': 2,
    'DAY': 3,
    'WIN': 4
  };
  return mapping[rankTypeEnum] || 1;
}


/**
 * 发送排行榜请求
 * @param {Object} params - 请求参数
 * @param {number} params.rankType - 排行榜类型 (1=周榜, 2=月榜, 3=日榜, 4=胜率榜)
 * @param {number} params.page - 页码 (>= 1)
 * @param {number} params.pageNum - 每页数量
 * @param {number} params.season - 赛季号 (0=当前赛季)
 * @returns {Promise} 返回 Promise，resolve 时返回解析后的数据
 */
function requestRankList(params) {
  // 如果使用模拟数据，直接返回 Promise.reject，让调用方使用降级方案
  if (USE_MOCK_DATA) {
    console.log('使用模拟数据模式，跳过服务器请求');
    return Promise.reject({
      code: -1,
      message: 'USE_MOCK_DATA=true，使用模拟数据'
    });
  }

  const { rankType, page = 1, pageNum = 100, season = 0 } = params;
  
  // 将数字 rankType 转换为枚举名称字符串
  const rankTypeEnum = getRankTypeEnum(rankType);
  
  // 构建请求数据
  const requestData = {
    rankType: rankTypeEnum,  // 使用枚举名称字符串
    page: page,
    pageNum: pageNum,
    season: season
  };
  
  // 将请求数据转换为JSON字符串
  const dataString = JSON.stringify(requestData);
  const cmd = 105;

  // 打印请求信息（调试用）
  console.log('请求排行榜数据:', {
    url: API_BASE_URL,
    method: 'PUT',
    contentType: 'application/x-www-form-urlencoded',
    formData: {
      cmd: cmd,
      data: dataString
    },
    rankTypeEnum: rankTypeEnum
  });

  // 发送 PUT 请求（form格式）
  return sendRequest(cmd, dataString);
}

/**
 * 将服务器返回的 RankInfo 转换为小程序使用的格式
 * @param {Object} rankInfo - 服务器返回的 RankInfo
 * @param {string|number} rankType - 排行榜类型（枚举名称字符串或数字），用于判断 rankValue 的含义
 * @returns {Object} 转换后的排行榜项
 */
function convertRankInfo(rankInfo, rankType) {
  // 如果 rankType 是字符串枚举名称，转换为数字进行判断
  const rankTypeNum = typeof rankType === 'string' ? getRankTypeNumber(rankType) : rankType;
  const isWinRateRank = rankTypeNum === 4; // WIN = 4
  
  // 确保 rankValue 转换为数字类型
  const rankValue = rankInfo.rankValue != null ? Number(rankInfo.rankValue) : 0;
  const playerCount = rankInfo.playerCount != null ? Number(rankInfo.playerCount) : 0;
  
  return {
    rank: rankInfo.rankIndex || 0,
    id: rankInfo.uid ? rankInfo.uid.toString() : '',
    name: rankInfo.fansName || '未知用户',
    points: isWinRateRank ? 0 : rankValue, // 胜率榜不使用 points
    games: playerCount,
    winRate: isWinRateRank ? rankValue : 0, // 胜率榜使用 rankValue 作为胜率，确保是数字类型
    lastRank: rankInfo.lastRankIndex || null,
    avatar: rankInfo.fansIcon || '', // 头像
    commentsSwitch: rankInfo.commentsSwitch !== undefined ? rankInfo.commentsSwitch : true, // 是否可以点评
    comments: rankInfo.comments || {} // 点评信息，key=评论定义Id，value=次数
  };
}

/**
 * 将服务器返回的排行榜数据转换为小程序使用的格式
 * @param {Object} serverData - 服务器返回的 S2CRankGetList 数据
 * @returns {Object} 转换后的排行榜数据
 */
function convertRankListData(serverData) {
  // 服务器返回的 rankType 可能是枚举名称字符串（如 "WEEK"）或数字
  const rankType = serverData.rankType || 'WEEK';
  const rankList = (serverData.rankList || []).map(item => convertRankInfo(item, rankType));
  
  return {
    rankType: rankType,  // 保留原始格式（可能是字符串或数字）
    rankList: rankList,
    totalNum: serverData.totalNum || 0,
    newSeason: serverData.newSeason || 0,
    myRankIndex: serverData.myRankIndex || -1
  };
}

module.exports = {
  requestRankList,
  convertRankInfo,
  convertRankListData
};
