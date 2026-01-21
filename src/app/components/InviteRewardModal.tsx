import { X } from 'lucide-react';

interface InviteRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InviteRewardModal({ isOpen, onClose }: InviteRewardModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-[680px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-xl font-bold text-white">邀请好礼</h2>
            <p className="text-sm text-gray-400 mt-1">Invite Friends & Get Rewards</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Main Reward Card */}
          <div className="bg-[#2a2a2a] rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors mb-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#2a2a2a] to-[#333] p-5 border-b border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🎁</span>
                  <h3 className="text-xl font-bold text-white">邀请好友奖励</h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium border bg-[#FFED00]/20 text-[#FFED00] border-[#FFED00]/30">
                  长期有效
                </span>
              </div>

              {/* Reward Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/30 rounded-lg p-3">
                  <div className="text-gray-500 text-xs mb-1">参与条件</div>
                  <div className="text-white text-sm font-medium">好友充值≥60元</div>
                </div>
                <div className="bg-black/30 rounded-lg p-3">
                  <div className="text-gray-500 text-xs mb-1">双方奖励</div>
                  <div className="text-[#FFED00] text-sm font-medium">1000积分+10金币</div>
                </div>
              </div>
            </div>

            {/* Visual Rewards Display */}
            <div className="p-6 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10">
              <div className="flex items-center justify-center gap-8 mb-4">
                <div className="text-center">
                  <div className="text-5xl mb-2">⭐</div>
                  <div className="text-white font-bold text-lg mb-1">1000积分</div>
                  <div className="text-gray-400 text-xs">用于兑换礼品</div>
                </div>
                <div className="w-px h-20 bg-gray-700"></div>
                <div className="text-center">
                  <div className="text-5xl mb-2">💰</div>
                  <div className="text-white font-bold text-lg mb-1">10枚金币</div>
                  <div className="text-gray-400 text-xs">用于参与比赛</div>
                </div>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  <span>👥</span>
                  <span>邀请越多，奖励越多</span>
                </div>
              </div>
            </div>

            {/* Participation Steps */}
            <div className="p-5">
              <h4 className="text-white font-bold text-sm mb-3">📋 参与步骤</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#FFED00] text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                  <p className="text-gray-400 text-sm leading-relaxed pt-0.5">点击下方"邀请微信好友"按钮，分享给好友</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#FFED00] text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                  <p className="text-gray-400 text-sm leading-relaxed pt-0.5">好友通过您的邀请链接注册并完成充值满60元</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#FFED00] text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                  <p className="text-gray-400 text-sm leading-relaxed pt-0.5">双方自动获得1000积分+10枚金币奖励</p>
                </div>
              </div>
            </div>
          </div>

          {/* Invite Button */}
          <button className="w-full bg-[#FFED00] text-black py-5 rounded-xl text-lg font-bold mb-4 hover:bg-[#FFE500] transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
            邀请微信好友
          </button>

          {/* Additional Info */}
          <div className="bg-gradient-to-br from-[#FFED00]/10 to-[#FFED00]/5 border border-[#FFED00]/20 rounded-xl p-4 mb-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              <span className="text-[#FFED00] font-bold">💡 温馨提示：</span>
              邀请奖励无上限，每成功邀请一位好友充值，您和好友都将获得丰厚奖励。更多奖励活动，请咨询现场工作人员。
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex justify-center gap-4 text-sm">
            <button className="text-gray-400 hover:text-white transition-colors">邀请规则</button>
            <span className="text-gray-600">|</span>
            <button className="text-gray-400 hover:text-white transition-colors">
              查看我的邀请记录
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}