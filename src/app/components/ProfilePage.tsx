import { FileText, Users, Trophy, ChevronRight, Settings, LogIn } from 'lucide-react';
import { User, playerEvaluationsData } from '@/app/data/mockData';
import { useState } from 'react';
import { WeChatLoginModal } from './WeChatLoginModal';
import { EvaluationSettingsModal } from './EvaluationSettingsModal';
import logoImage from 'figma:asset/a0b6c5636a61e33736440ebf69782ae68beca905.png';
import { toast } from 'sonner';

interface ProfilePageProps {
  user: User;
  isLoggedIn: boolean;
  onNavigateToOrders: () => void;
  onLogin: () => void;
  onUpdateEvaluationSetting: (allowEvaluation: boolean) => void;
}

export function ProfilePage({
  user,
  isLoggedIn,
  onNavigateToOrders,
  onLogin,
  onUpdateEvaluationSetting,
}: ProfilePageProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // 获取当前用户的评价数据
  const myEvaluations = playerEvaluationsData[user.id] || [];
  // 只显示有点赞的评价
  const evaluationsWithVotes = myEvaluations.filter(e => e.voters.length > 0);
  // 按点赞数量降序排序
  const sortedEvaluations = evaluationsWithVotes.sort((a, b) => b.voters.length - a.voters.length);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleLoginConfirm = () => {
    setShowLoginModal(false);
    onLogin();
  };

  // 检查是可以切换开关（距离上次设置是否超过24小时）
  const canToggleEvaluation = () => {
    if (!user.lastEvaluationSettingTime) return true;
    const lastTime = new Date(user.lastEvaluationSettingTime);
    const now = new Date();
    const diffHours = (now.getTime() - lastTime.getTime()) / (1000 * 60 * 60);
    return diffHours >= 24;
  };

  const handleToggleEvaluation = (value: boolean) => {
    if (canToggleEvaluation()) {
      onUpdateEvaluationSetting(value);
      setShowSettingsModal(false);
    }
  };

  return (
    <div className="h-full bg-black text-white overflow-y-auto pb-20">
      {isLoggedIn ? (
        <>
          {/* Fixed User Info - Logged In */}
          <div className="fixed top-0 left-0 right-0 bg-black z-10 pt-12 pb-4 border-b border-gray-800 max-w-[750px] mx-auto">
            <div className="px-4 sm:px-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <div className="text-white text-xl font-bold">
                    {user.name[0]}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-white text-base font-medium mb-1">
                    {user.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-gray-400 text-base">ID: {user.id}</div>
                    <button
                      onClick={() => setShowSettingsModal(true)}
                      className="bg-[#2a2a2a] hover:bg-[#333] px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors border border-gray-700"
                    >
                      <Settings className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-gray-400 text-xs">设置</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Content - Logged In */}
          <div className="px-4 sm:px-6 pt-[140px] pb-6">
            {/* Menu List */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => toast.info('功能开发中，敬请期待！')}
                className="w-full bg-[#1a1a1a] rounded-xl p-4 flex items-center justify-between hover:bg-[#2a2a2a] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div className="text-left">
                    <div className="text-white text-sm font-medium">历史订单</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-xs">即将开放</span>
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </div>
              </button>

              <button
                onClick={() => toast.info('功能开发中，敬请期待！')}
                className="w-full bg-[#1a1a1a] rounded-xl p-4 flex items-center justify-between hover:bg-[#2a2a2a] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-gray-400" />
                  <div className="text-left">
                    <div className="text-white text-sm font-medium">玩家生涯</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-xs">即将开放</span>
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </div>
              </button>
            </div>

            {/* Player Evaluations Section */}
            {sortedEvaluations.length > 0 && (
              <div className="bg-[#1a1a1a] rounded-2xl p-5 mb-6 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white text-base font-medium">玩家对我的评价</div>
                  <div className="text-gray-400 text-xs">
                    共{sortedEvaluations.reduce((sum, e) => sum + e.voters.length, 0)}个评价
                  </div>
                </div>
                
                <div className="space-y-4">
                  {sortedEvaluations.map((evaluation) => (
                    <div key={evaluation.type} className="bg-[#2a2a2a] rounded-xl p-4">
                      {/* 评价类型和点赞数 */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-white text-sm font-medium">{evaluation.type}</span>
                          <div className="bg-[#FFED00]/20 border border-[#FFED00] rounded px-2 py-0.5">
                            <span className="text-[#FFED00] text-xs font-bold">
                              {evaluation.voters.length}人点赞
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* 点赞玩家列表 */}
                      <div className="flex flex-wrap gap-2">
                        {evaluation.voters.map((voter) => (
                          <div
                            key={voter.id}
                            className="bg-black/30 rounded-lg px-2.5 py-1.5"
                          >
                            {/* Name only - no avatar */}
                            <span className="text-gray-300 text-[11px]">{voter.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        // Not Logged In - Attractive Welcome Screen
        <div className="fixed inset-0 overflow-hidden flex items-center justify-center pb-20">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1620023652673-67fdb13dfe2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2tlciUyMHRhYmxlJTIwY2FyZHMlMjBkYXJrfGVufDF8fHx8MTc2ODgyNzQ4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Poker Background"
              className="w-full h-full object-cover"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-[750px] px-6 flex flex-col items-center">
            {/* Title */}
            <div className="mb-8 text-center">
              <h1 className="text-white text-3xl font-bold">鲨曼 Shark Mind Club</h1>
            </div>

            {/* Features Preview */}
            <div className="w-full max-w-sm mb-6 space-y-2.5">
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-3.5 border border-[#FFED00]/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#FFED00] rounded-full flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-4.5 h-4.5 text-black" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">实时排行榜</div>
                    <div className="text-gray-400 text-xs">展示你的实力与风格</div>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-3.5 border border-[#FFED00]/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#FFED00] rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-4.5 h-4.5 text-black" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">玩家风格评价</div>
                    <div className="text-gray-400 text-xs">了解牌桌上的对手</div>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-3.5 border border-[#FFED00]/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#FFED00] rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4.5 h-4.5 text-black" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">在线点餐</div>
                    <div className="text-gray-400 text-xs">专注游戏，美食送达</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Login Button - Prominent */}
            <button
              onClick={handleLoginClick}
              className="w-full max-w-sm bg-gradient-to-r from-[#FFED00] to-[#FFD700] text-black text-lg font-bold py-3.5 rounded-2xl hover:from-[#FFD700] hover:to-[#FFC700] transition-all transform hover:scale-105 shadow-2xl shadow-[#FFED00]/50"
            >
              <div className="flex items-center justify-center gap-2">
                <span>登录</span>
                <LogIn className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* WeChat Login Modal */}
      <WeChatLoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onConfirm={handleLoginConfirm}
      />

      {/* Evaluation Settings Modal */}
      {isLoggedIn && (
        <EvaluationSettingsModal
          isOpen={showSettingsModal}
          onClose={() => setShowSettingsModal(false)}
          currentSetting={user.allowEvaluation}
          onToggle={handleToggleEvaluation}
          canToggle={canToggleEvaluation()}
          lastSettingTime={user.lastEvaluationSettingTime}
        />
      )}
    </div>
  );
}