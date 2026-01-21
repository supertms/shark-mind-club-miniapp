import { X, ThumbsUp } from 'lucide-react';
import { playerEvaluationsData } from '@/app/data/mockData';
import { useState } from 'react';

export interface PlayerEvaluation {
  type: string;
  voters: { id: string; name: string; avatar?: string }[];
}

interface PlayerEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
  playerId?: string; // 可选的playerId，如果提供则自动获取评价数据
  evaluations?: PlayerEvaluation[]; // 可选的evaluations，如果不提供则从playerId获取
  isLoggedIn: boolean; // 用户登录状态，控制点赞按钮显示（改为必传）
}

const evaluationTypes = [
  '疯狗型',
  '诈唬型',
  '买牌型',
  '狗运型',
  '沉默型',
  '秀牌型',
  '复制型',
  '多面型',
  '娱乐型',
  '算牌型',
  '社交型',
  '紧弱型',
  '紧凶型',
  '紧被动型',
  '紧诈型',
  '冷血狙击',
  '松弱型',
  '松凶型',
  '松被动型',
];

export function PlayerEvaluationModal({
  isOpen,
  onClose,
  playerName,
  playerId,
  evaluations,
  isLoggedIn,
}: PlayerEvaluationModalProps) {
  // 点赞状态管理 - 每个玩家只能点赞一次，所以只记录点赞的类型
  const [likedType, setLikedType] = useState<string | null>(null);
  // 确认对话框状态
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showAlreadyLikedDialog, setShowAlreadyLikedDialog] = useState(false);
  const [pendingLikeType, setPendingLikeType] = useState<string | null>(null);

  if (!isOpen) return null;

  // 如果提供了playerId则从mockData中获取评价数据
  let playerEvaluations = evaluations;
  if (playerId && !evaluations) {
    playerEvaluations = playerEvaluationsData[playerId] || [];
  }
  
  // 如果还是没有评价数据，使用空数组
  if (!playerEvaluations) {
    playerEvaluations = [];
  }

  // 创建一个map，方便查找每个类型的点赞者
  const evaluationMap = new Map(playerEvaluations.map((e) => [e.type, e.voters]));

  // 动态排序：有评价的放前面，暂无评价的放后面
  const sortedTypes = [...evaluationTypes].sort((a, b) => {
    const aVoters = evaluationMap.get(a)?.length || 0;
    const bVoters = evaluationMap.get(b)?.length || 0;
    return bVoters - aVoters; // 降序排列
  });

  // 处理点赞
  const handleLike = (type: string) => {
    // 如果已经为这个玩家点赞过，显示提示对话框
    if (likedType) {
      setShowAlreadyLikedDialog(true);
      return;
    }
    
    // 否则显示确认对话框
    setPendingLikeType(type);
    setShowConfirmDialog(true);
  };

  // 确认点赞
  const confirmLike = () => {
    if (pendingLikeType) {
      setLikedType(pendingLikeType);
    }
    setShowConfirmDialog(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-[680px] max-h-[85vh] flex flex-col">
        {/* Header with prominent player info */}
        <div className="relative p-6 sm:p-8 border-b border-gray-800 flex-shrink-0">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Player Info */}
          <div className="flex flex-col items-center text-center">
            {/* Large Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-4 ring-4 ring-[#FFED00]/30">
              <div className="text-white text-3xl sm:text-4xl font-bold">
                {playerName[0]}
              </div>
            </div>
            
            {/* Player Name */}
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {playerName}
            </h2>
            
            {/* Subtitle - Only show when logged in */}
            {isLoggedIn && (
              <p className="text-sm sm:text-base text-gray-400">
                点击 👍 为TA的风格点赞
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="space-y-4">
            {sortedTypes.map((type) => {
              const voters = evaluationMap.get(type) || [];
              const hasVotes = voters.length > 0;
              const isLiked = likedType === type;

              // 如果未登录且没有点赞信息，不显示该风格
              if (!isLoggedIn && !hasVotes) {
                return null;
              }

              return (
                <div
                  key={type}
                  className={`bg-[#2a2a2a] rounded-xl p-4 border transition-all ${
                    hasVotes ? 'border-[#FFED00]/30' : 'border-gray-800'
                  } ${isLiked ? 'ring-2 ring-[#FFED00]/50' : ''}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-sm">{type}</span>
                      {hasVotes && (
                        <span className="bg-[#FFED00] text-black text-xs px-2 py-0.5 rounded-full font-bold">
                          {voters.length + (isLiked ? 1 : 0)}
                        </span>
                      )}
                      {!hasVotes && isLiked && (
                        <span className="bg-[#FFED00] text-black text-xs px-2 py-0.5 rounded-full font-bold">
                          1
                        </span>
                      )}
                    </div>
                    {/* 只在用户登录时显示点赞按钮 */}
                    {isLoggedIn && (
                      <button
                        onClick={() => handleLike(type)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                          isLiked 
                            ? 'bg-[#FFED00] text-black' 
                            : 'bg-black/30 text-gray-400 hover:text-white hover:bg-black/50'
                        }`}
                      >
                        <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                        <span className="text-xs font-medium">{isLiked ? '已点赞' : '点赞'}</span>
                      </button>
                    )}
                  </div>

                  {hasVotes && (
                    <div className="flex flex-wrap gap-2">
                      {voters.map((voter) => (
                        <div
                          key={voter.id}
                          className="bg-black/30 rounded-lg px-2.5 py-1.5"
                        >
                          {/* Name only - no avatar */}
                          <span className="text-gray-300 text-[11px]">{voter.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {!hasVotes && !isLiked && (
                    <p className="text-gray-500 text-xs">暂无评价，快来第一个点赞吧！</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 确认点赞对话框 */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] rounded-2xl p-6 sm:p-8 w-full max-w-[480px] border border-gray-800">
            {/* 标题 */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ThumbsUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">确认点赞</h3>
              <p className="text-sm text-gray-400">
                为 <span className="text-white font-medium">{playerName}</span> 的 
                <span className="text-[#FFED00] font-bold mx-1">{pendingLikeType}</span> 
                风格点赞
              </p>
            </div>

            {/* 重要提示 */}
            <div className="bg-[#2a2a2a] rounded-xl p-4 mb-6 border border-[#FFED00]/20">
              <div className="flex items-start gap-2 mb-3">
                <div className="text-[#FFED00] text-lg flex-shrink-0 mt-0.5">⚠️</div>
                <div className="text-sm text-gray-300">
                  <span className="text-white font-medium">重要提示</span>
                </div>
              </div>
              
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-2">
                  <div className="text-[#FFED00] flex-shrink-0 mt-0.5">1.</div>
                  <p className="text-gray-300">
                    每个人只能为<span className="text-white font-medium">同一个玩家点赞一次</span>，
                    <span className="text-[#FF6B9D] font-medium">点赞后不可撤销</span>
                  </p>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="text-[#FFED00] flex-shrink-0 mt-0.5">2.</div>
                  <p className="text-gray-300">
                    必须<span className="text-white font-medium">与该玩家有过同场比赛经历</span>才可为对方点赞
                  </p>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="text-[#FFED00] flex-shrink-0 mt-0.5">3.</div>
                  <p className="text-gray-300">
                    您的点赞评价会<span className="text-white font-medium">展示给所有玩家观看</span>，请您慎重决定
                  </p>
                </div>
              </div>
            </div>

            {/* 按钮 */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 bg-[#2a2a2a] text-gray-300 py-3 sm:py-3.5 rounded-xl font-medium hover:bg-[#333] transition-colors border border-gray-700"
              >
                取消
              </button>
              <button
                onClick={confirmLike}
                className="flex-1 bg-[#FFED00] text-black py-3 sm:py-3.5 rounded-xl font-bold hover:bg-[#FFE500] transition-colors"
              >
                确认点赞
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 已经点赞提示对话框 */}
      {showAlreadyLikedDialog && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] rounded-2xl p-6 sm:p-8 w-full max-w-[480px] border border-gray-800">
            {/* 标题 */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-white text-3xl">🚫</div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">无法点赞</h3>
              <p className="text-sm text-gray-400">
                您已经为 <span className="text-white font-medium">{playerName}</span> 点赞过了
              </p>
            </div>

            {/* 已点赞信息 */}
            <div className="bg-[#2a2a2a] rounded-xl p-4 mb-6 border border-[#FFED00]/30 text-center">
              <p className="text-gray-400 text-sm mb-2">您已经为TA的这个风格点赞：</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-[#FFED00] text-lg font-bold">{likedType}</span>
                <ThumbsUp className="w-5 h-5 text-[#FFED00] fill-current" />
              </div>
            </div>

            {/* 提示信息 */}
            <div className="bg-[#2a2a2a] rounded-xl p-4 mb-6 border border-gray-700">
              <div className="flex items-start gap-2 mb-2">
                <div className="text-[#FF6B9D] text-lg flex-shrink-0 mt-0.5">ℹ️</div>
                <div className="text-sm text-gray-300">
                  <span className="text-white font-medium">温馨提示</span>
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                每个人只能为<span className="text-white font-medium">同一个玩家点赞一次</span>，
                且<span className="text-[#FF6B9D] font-medium">点赞后不可撤销</span>。
                请勿重复点赞。
              </p>
            </div>

            {/* 按钮 */}
            <button
              onClick={() => setShowAlreadyLikedDialog(false)}
              className="w-full bg-[#FFED00] text-black py-3 sm:py-3.5 rounded-xl font-bold hover:bg-[#FFE500] transition-colors"
            >
              我知道了
            </button>
          </div>
        </div>
      )}
    </div>
  );
}