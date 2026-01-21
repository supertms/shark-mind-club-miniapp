import { X } from 'lucide-react';

interface RewardsGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RewardsGuideModal({ isOpen, onClose }: RewardsGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-[680px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">奖励说明</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* 周榜和月榜奖励 */}
            <div className="bg-[#2a2a2a] rounded-xl p-5 border border-[#FFED00]/30">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🏆</span>
                <h3 className="text-lg font-bold text-[#FFED00]">周榜 & 月榜荣耀奖励</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-black text-xs font-bold">1</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium mb-1">冠军奖励</div>
                    <div className="text-gray-400 text-sm">定制冠军奖杯 + 限量版卫衣</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-black text-xs font-bold">2</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium mb-1">亚军奖励</div>
                    <div className="text-gray-400 text-sm">定制亚军奖杯 + 纪念卫衣</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-black text-xs font-bold">3</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium mb-1">季军奖励</div>
                    <div className="text-gray-400 text-sm">定制季军奖杯 + 精美礼品</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-gray-400 text-xs leading-relaxed">
                  💡 前三名玩家将获得专属荣耀奖励，包括定制奖杯、卫衣等精美纪念品
                </div>
              </div>
            </div>

            {/* 月赛奖励 */}
            <div className="bg-[#2a2a2a] rounded-xl p-5 border border-blue-500/30">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🎁</span>
                <h3 className="text-lg font-bold text-blue-400">月赛精彩礼品</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-[#FFED00] text-lg">🏅</span>
                  <div className="flex-1">
                    <div className="text-white font-medium mb-1">定制奖杯</div>
                    <div className="text-gray-400 text-sm">专属刻名，永久纪念</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#FFED00] text-lg">🍷</span>
                  <div className="flex-1">
                    <div className="text-white font-medium mb-1">高品质酒水</div>
                    <div className="text-gray-400 text-sm">精选美酒，品味人生</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#FFED00] text-lg">🎀</span>
                  <div className="flex-1">
                    <div className="text-white font-medium mb-1">实用小礼品</div>
                    <div className="text-gray-400 text-sm">精心挑选，惊喜连连</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-gray-400 text-xs leading-relaxed">
                  💡 月赛奖励丰富多样，让每一次参赛都充满期待
                </div>
              </div>
            </div>

            {/* 重要提醒 */}
            <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl p-5 border border-red-500/30">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">⚠️</span>
                <h3 className="text-lg font-bold text-red-400">重要提醒</h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-red-400 text-sm mt-0.5">•</span>
                  <div className="text-white text-sm flex-1">
                    所有奖励均为<span className="text-[#FFED00] font-bold">无价值荣誉奖励</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-red-400 text-sm mt-0.5">•</span>
                  <div className="text-white text-sm flex-1">
                    <span className="text-red-400 font-bold">禁止转赠、转售、折现</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-red-400 text-sm mt-0.5">•</span>
                  <div className="text-white text-sm flex-1">
                    仅限获奖者<span className="text-[#FFED00] font-bold">本人领取</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-red-400 text-sm mt-0.5">•</span>
                  <div className="text-white text-sm flex-1">
                    需出示身份证明及获奖记录
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-red-500/30">
                <div className="text-gray-400 text-xs leading-relaxed">
                  🎯 我们坚持绿色竞技理念，所有奖励仅作为荣誉象征，不具备任何经济价值。违规转让者将被取消获奖资格并列入黑名单。
                </div>
              </div>
            </div>

            {/* 领奖流程 */}
            <div className="bg-[#2a2a2a] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📋</span>
                <h3 className="text-lg font-bold text-white">领奖流程</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FFED00]/20 text-[#FFED00] flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-300 text-sm">榜单结算后，工作人员将主动联系获奖者</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FFED00]/20 text-[#FFED00] flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-300 text-sm">获奖者需出示身份证明及app内获奖记录</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FFED00]/20 text-[#FFED00] flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-300 text-sm">核实无误后，现场领取奖励</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FFED00]/20 text-[#FFED00] flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    4
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-300 text-sm">签字确认，完成领奖</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
