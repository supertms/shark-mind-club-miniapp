import { useState } from 'react';
import { RankingUser, User } from '@/app/data/mockData';
import { PlayerEvaluationModal } from './PlayerEvaluationModal';
import { playerEvaluationsData } from '@/app/data/mockData';

interface RankingPageProps {
  monthRankings: RankingUser[];
  weekRankings: RankingUser[];
  quarterRankings: RankingUser[];
  yearRankings: RankingUser[];
  winRateRankings: RankingUser[];
  userRanking: { name: string; points: number };
  onShowRules: () => void;
  currentUser: User;
  playersEvaluationSettings?: Record<string, boolean>; // 玩家评价设置映射
  isLoggedIn: boolean; // 用户登录状态
}

export function RankingPage({ 
  monthRankings, 
  weekRankings, 
  quarterRankings,
  yearRankings,
  winRateRankings, 
  userRanking, 
  onShowRules,
  currentUser,
  playersEvaluationSettings = {},
  isLoggedIn,
}: RankingPageProps) {
  const [selectedTab, setSelectedTab] = useState<'week' | 'month' | 'quarter' | 'year' | 'winRate'>('week');
  const [selectedPlayer, setSelectedPlayer] = useState<RankingUser | null>(null);

  // 根据选中的tab获取对应的榜单数据
  const getCurrentRankings = () => {
    if (selectedTab === 'week') return weekRankings;
    if (selectedTab === 'month') return monthRankings;
    if (selectedTab === 'quarter') return quarterRankings;
    if (selectedTab === 'year') return yearRankings;
    return winRateRankings;
  };

  // 检查玩家是否允许被评价
  const isEvaluationAllowed = (playerId: string) => {
    // 如果是当前用户，使用当前用户的设置
    if (playerId === currentUser.id) {
      return currentUser.allowEvaluation ?? true;
    }
    // 否则使用 playersEvaluationSettings 中的设置
    return playersEvaluationSettings[playerId] ?? true;
  };

  const rankings = getCurrentRankings();

  // 查找当前用户的排名
  const myRank = rankings.find(user => user.id === currentUser.id)?.rank;
  const isInTop50 = myRank && myRank <= 50;
  
  // 获取当前用户在当前榜单的数据
  const myRankingData = rankings.find(user => user.id === currentUser.id);

  return (
    <div className="h-full bg-black text-white flex flex-col overflow-hidden pb-16">
      {/* Fixed Header Banner */}
      <div className="px-6 py-12 relative overflow-hidden flex-shrink-0">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1762345127396-ac4a970436c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waHklMjBhY2hpZXZlbWVudCUyMHN1Y2Nlc3N8ZW58MXx8fHwxNzY4ODExNjA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Ranking Background"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B9D]/90 via-[#FFD93D]/80 to-[#FFED00]/90"></div>
        </div>
        
        <div className="relative z-10">
          <div className="text-center">
            <div className="text-6xl mb-2">🏆</div>
            <div className="text-4xl font-bold text-white mb-2 drop-shadow-lg">RANKING</div>
          </div>
        </div>
        {/* 榜单说明按钮 - 移到右下角 */}
        <button
          onClick={onShowRules}
          className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-xs font-medium z-20 shadow-lg border border-white/20 hover:bg-black/80 transition-all"
        >
          📋 榜单说明
        </button>
      </div>

      {/* Fixed Tabs */}
      <div className="flex gap-2 px-6 py-4 bg-[#1a1a1a] flex-shrink-0">
        <button
          onClick={() => setSelectedTab('week')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedTab === 'week'
              ? 'bg-[#FFED00] text-black'
              : 'bg-[#2a2a2a] text-gray-400'
          }`}
        >
          周榜
        </button>
        <button
          onClick={() => setSelectedTab('month')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedTab === 'month'
              ? 'bg-[#FFED00] text-black'
              : 'bg-[#2a2a2a] text-gray-400'
          }`}
        >
          月榜
        </button>
        <button
          onClick={() => setSelectedTab('quarter')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedTab === 'quarter'
              ? 'bg-[#FFED00] text-black'
              : 'bg-[#2a2a2a] text-gray-400'
          }`}
        >
          季榜
        </button>
        <button
          onClick={() => setSelectedTab('year')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedTab === 'year'
              ? 'bg-[#FFED00] text-black'
              : 'bg-[#2a2a2a] text-gray-400'
          }`}
        >
          年榜
        </button>
        <button
          onClick={() => setSelectedTab('winRate')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedTab === 'winRate'
              ? 'bg-[#FFED00] text-black'
              : 'bg-[#2a2a2a] text-gray-400'
          }`}
        >
          进圈率
        </button>
      </div>

      {/* Scrollable Rankings List */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-3 mb-6">
          {rankings.map((user) => {
            // 获取该玩家的评价数据并排序，取前3个
            const userEvaluations = playerEvaluationsData[user.id] || [];
            const topEvaluations = userEvaluations
              .sort((a, b) => b.voters.length - a.voters.length)
              .slice(0, 3);

            return (
              <div
                key={user.rank}
                className="bg-[#1a1a1a] rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar with Rank Badge */}
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    {/* Avatar */}
                    <div className="text-white text-sm font-bold">
                      {user.name[0]}
                    </div>
                    {/* Rank Badge - positioned at top-left corner */}
                    <div className="absolute -top-1 -left-1 flex items-center justify-center">
                      {user.rank <= 3 ? (
                        <div className="text-base leading-none scale-150">
                          {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                        </div>
                      ) : (
                        <div className="bg-[#FFED00] rounded-full w-5 h-5 flex items-center justify-center border-2 border-black">
                          <span className="text-black text-[10px] font-bold">{user.rank}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name, Stats and Tags */}
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium mb-1 truncate">
                      {user.name}
                    </div>
                    {selectedTab === 'winRate' ? (
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-[#FFED00] text-xs font-bold">
                          进圈率 {user.winRate}%
                        </div>
                        <div className="text-gray-400 text-xs">
                          {user.games}局
                        </div>
                      </div>
                    ) : (
                      <div className="text-[#FFED00] text-xs font-bold mb-2">
                        {user.points.toLocaleString()}分
                      </div>
                    )}
                    
                    {/* Evaluation Tags */}
                    {topEvaluations.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {topEvaluations.map((evaluation) => (
                          <div
                            key={evaluation.type}
                            className="bg-[#2a2a2a] border border-[#FFED00]/30 rounded px-2 py-0.5 flex items-center gap-1"
                          >
                            <span className="text-gray-300 text-[10px]">
                              {evaluation.type}
                            </span>
                            <span className="text-[#FFED00] text-[10px] font-bold">
                              {evaluation.voters.length}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Evaluation Button */}
                  {isEvaluationAllowed(user.id) && isLoggedIn && (
                    <button
                      onClick={() => setSelectedPlayer(user)}
                      className="bg-[#FFED00] text-black px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#FFE500] transition-colors flex-shrink-0"
                    >
                      评价
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* User's Own Ranking - Fixed at bottom of scroll area */}
        {isLoggedIn && myRankingData && (
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800 sticky bottom-0">
            <div className="text-gray-400 text-xs mb-2">我的排名</div>
            <div className="flex items-center justify-between">
              <div className="text-white text-sm font-medium">{myRankingData.name}</div>
              <div className="flex items-center gap-3">
                {selectedTab === 'winRate' ? (
                  <div className="text-[#FFED00] text-sm font-bold">
                    进圈率 {myRankingData.winRate}%
                  </div>
                ) : (
                  <div className="text-[#FFED00] text-sm font-bold">
                    {myRankingData.points.toLocaleString()}分
                  </div>
                )}
                <div className="text-gray-400 text-xs">
                  {isInTop50 ? `第${myRank}名` : '尚未上榜'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Player Evaluation Modal */}
      {selectedPlayer && (
        <PlayerEvaluationModal
          isOpen={!!selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
          playerName={selectedPlayer.name}
          evaluations={playerEvaluationsData[selectedPlayer.id] || []}
          isLoggedIn={isLoggedIn}
        />
      )}
    </div>
  );
}