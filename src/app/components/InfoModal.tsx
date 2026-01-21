interface InfoModalProps {
  type: 'game-rules' | 'coin-info' | 'ranking-rules';
  onClose: () => void;
}

export function InfoModal({ type, onClose }: InfoModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl border border-gray-800 max-h-[85vh] overflow-hidden flex flex-col">
        {type === 'ranking-rules' ? (
          <>
            {/* Header */}
            <div className="relative p-6 border-b border-gray-800 flex-shrink-0">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-3xl">📋</span>
                <h2 className="text-2xl font-bold text-white">榜单说明</h2>
              </div>
              <p className="text-gray-400 text-sm text-center">
                榜单更新规则与排名机制
              </p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-5">
                {/* 积分规则 - 月榜/周榜 */}
                <div className="bg-[#2a2a2a] rounded-xl p-4 border border-[#FFED00]/20">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">📊</span>
                    <h3 className="text-white font-bold">积分规则</h3>
                    <span className="text-xs text-gray-400 ml-auto">月榜 · 周榜</span>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-300">
                      积分来源：<span className="text-white font-medium">常规赛、周赛、双人赛</span>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-2">每场比赛奖励</div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-lg py-2 px-2 mb-1">
                            <div className="text-lg font-bold">5</div>
                            <div className="text-[10px]">分</div>
                          </div>
                          <div className="text-xs text-gray-400">🥇 第一名</div>
                        </div>
                        <div className="text-center">
                          <div className="bg-gradient-to-br from-gray-400 to-gray-500 text-white rounded-lg py-2 px-2 mb-1">
                            <div className="text-lg font-bold">3</div>
                            <div className="text-[10px]">分</div>
                          </div>
                          <div className="text-xs text-gray-400">🥈 第二名</div>
                        </div>
                        <div className="text-center">
                          <div className="bg-gradient-to-br from-amber-700 to-amber-800 text-white rounded-lg py-2 px-2 mb-1">
                            <div className="text-lg font-bold">1</div>
                            <div className="text-[10px]">分</div>
                          </div>
                          <div className="text-xs text-gray-400">🥉 第三名</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 进圈率统计 */}
                <div className="bg-[#2a2a2a] rounded-xl p-4 border border-[#FF6B9D]/20">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">📈</span>
                    <h3 className="text-white font-bold">进圈率统计</h3>
                    <span className="text-xs text-gray-400 ml-auto">进圈率榜</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <span className="text-[#FF6B9D] flex-shrink-0">•</span>
                      <div className="text-gray-300">
                        <span className="text-white font-medium">上榜条件</span>：总计参加 <span className="text-[#FFED00] font-bold">10场以上</span> 比赛
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[#FF6B9D] flex-shrink-0">•</span>
                      <div className="text-gray-300">
                        <span className="text-white font-medium">进圈定义</span>：每场比赛获得 <span className="text-[#FFED00] font-bold">前三名</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[#FF6B9D] flex-shrink-0">•</span>
                      <div className="text-gray-300">
                        <span className="text-white font-medium">数据保留</span>：历史数据永久保留，实时更新
                      </div>
                    </div>
                  </div>
                </div>

                {/* 更新规则 */}
                <div className="bg-[#2a2a2a] rounded-xl p-4 border border-[#FFED00]/20">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">🔄</span>
                    <h3 className="text-white font-bold">榜单刷新</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <span className="text-[#FFED00] flex-shrink-0">•</span>
                      <div className="text-gray-300">
                        <span className="text-white font-medium">周榜</span>：每周日 23:59 截止
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[#FFED00] flex-shrink-0">•</span>
                      <div className="text-gray-300">
                        <span className="text-white font-medium">月榜</span>：每月最后一天 23:59 截止
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[#FFED00] flex-shrink-0">•</span>
                      <div className="text-gray-300">
                        <span className="text-white font-medium">季榜</span>：每季度最后一天 23:59 截止
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[#FFED00] flex-shrink-0">•</span>
                      <div className="text-gray-300">
                        <span className="text-white font-medium">年榜</span>：每年最后一天 23:59 截止
                      </div>
                    </div>
                  </div>
                </div>

                {/* 排名机制 */}
                <div className="bg-[#2a2a2a] rounded-xl p-4 border border-[#FF6B9D]/20">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">🎯</span>
                    <h3 className="text-white font-bold">并列排名</h3>
                  </div>
                  <div className="text-sm text-gray-300 mb-3">
                    当榜单中出现并列情况时，排名规则如下：
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="bg-[#FFED00] text-black rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                        1
                      </div>
                      <div className="text-sm text-gray-300">
                        优先比较<span className="text-white font-medium">比赛场数</span>，场数越多排名越靠前
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="bg-[#FFED00] text-black rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                        2
                      </div>
                      <div className="text-sm text-gray-300">
                        场数相同时，<span className="text-white font-medium">注册时间</span>越早排名越靠前
                      </div>
                    </div>
                  </div>
                </div>

                {/* 提示信息 */}
                <div className="bg-gradient-to-r from-[#FFED00]/10 to-[#FF6B9D]/10 rounded-xl p-4 border border-[#FFED00]/30">
                  <div className="flex items-start gap-2">
                    <span className="text-lg flex-shrink-0">💡</span>
                    <div className="text-xs text-gray-300 leading-relaxed">
                      <span className="text-[#FFED00] font-medium">温馨提示</span>：多参与比赛不仅能提升技术，还能在并列时获得更高排名哦！
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Button */}
            <div className="p-6 border-t border-gray-800 flex-shrink-0">
              <button
                onClick={onClose}
                className="w-full bg-[#FFED00] text-black py-3.5 rounded-xl font-bold hover:bg-[#FFE500] transition-colors"
              >
                知道了
              </button>
            </div>
          </>
        ) : type === 'game-rules' ? (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-4">游戏规则</h2>
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <div className="font-bold mb-2">一、积分通则</div>
                <ul className="space-y-1 pl-4">
                  <li>• 消费赠分：¥1 = 20分，每次最少2,000分</li>
                  <li>• 积分不可转让、交易、拆现，仅可场内使用</li>
                  <li>• 新人首聘邀请空一免费赠送1次（补1手计分牌）</li>
                </ul>
              </div>

              <div>
                <div className="font-bold mb-2">二、彩蛋奖励</div>
                <ul className="space-y-1 pl-4">
                  <li>• FLOP 27 杂色秀同收池+1,000分，同属打击+200分</li>
                  <li>• 手牌组合奖励：+2,000/+3,000/+5,000分</li>
                  <li>• 单人桌：1v1单挑赢3次1张猎人牌，存分时1张=1,000分</li>
                  <li>• 23:00-01:00 MTT挑战模式（15'升盲）</li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-4">金币规则</h2>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex gap-2">
                <div className="font-bold">1.</div>
                <div>存记分牌同时获得金币，比例=500:1</div>
              </div>
              <div className="flex gap-2">
                <div className="font-bold">2.</div>
                <div>金币仅限兑换店内酒水、小吃等</div>
              </div>
              <div className="flex gap-2">
                <div className="font-bold">3.</div>
                <div>金币仅限店内使用，不转赠、不可交易、不可打现</div>
              </div>
            </div>
          </>
        )}

        {type !== 'ranking-rules' && (
          <button
            onClick={onClose}
            className="w-full bg-black text-white py-3 rounded-xl font-medium mt-6 hover:bg-gray-800 transition-colors"
          >
            {type === 'game-rules' ? '知道了~' : '关闭'}
          </button>
        )}
      </div>
    </div>
  );
}