import logoImage from 'figma:asset/a0b6c5636a61e33736440ebf69782ae68beca905.png';
import { EventsModal } from './EventsModal';
import { LocationGuideModal } from './LocationGuideModal';
import { ParkingGuideModal } from './ParkingGuideModal';
import { CompetitionRulesModal } from './CompetitionRulesModal';
import { StoreEnvironmentModal } from './StoreEnvironmentModal';
import { PlayerEvaluationModal } from './PlayerEvaluationModal';
import { RewardsGuideModal } from './RewardsGuideModal';
import { ScanSuccessModal } from './ScanSuccessModal';
import { useState } from 'react';
import { eventsData, playerEvaluationsData, weekRankingData } from '@/app/data/mockData';

interface HomePageProps {
  onNavigateToOrder: () => void;
  onInviteFriends: () => void;
  isLoggedIn: boolean;
}

export function HomePage({ 
  onNavigateToOrder,
  onInviteFriends,
  isLoggedIn
}: HomePageProps) {
  const [showEventsModal, setShowEventsModal] = useState(false);
  const [showLocationGuideModal, setShowLocationGuideModal] = useState(false);
  const [showParkingGuideModal, setShowParkingGuideModal] = useState(false);
  const [showCompetitionRulesModal, setShowCompetitionRulesModal] = useState(false);
  const [showStoreEnvironmentModal, setShowStoreEnvironmentModal] = useState(false);
  const [showRewardsGuideModal, setShowRewardsGuideModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<{ id: string; name: string } | null>(null);
  const [showScanSuccessModal, setShowScanSuccessModal] = useState(false);

  // 获取所有活动（按状态标签排序）
  const statusOrder = {
    '今日特色': 1,
    '明日预告': 2,
    '持续进行中': 3
  };
  
  const sortedEvents = [...eventsData].sort((a, b) => {
    return statusOrder[a.statusTag] - statusOrder[b.statusTag];
  });

  // 状态标签样式映射
  const getTagStyle = (tag: '持续进行中' | '今日特色' | '明日预告') => {
    switch (tag) {
      case '今日特色':
        return { bg: 'bg-[#FFED00]', text: 'text-black', label: '今日' };
      case '明日预告':
        return { bg: 'bg-blue-500', text: 'text-white', label: '明日' };
      case '持续进行中':
        return { bg: 'bg-green-500', text: 'text-white', label: '进行中' };
    }
  };

  // 计算本周最受关注选手（点赞最多的玩家）
  const getTopPlayer = () => {
    const playerStats: { [key: string]: { name: string; totalLikes: number; topTag: { type: string; count: number } } } = {};
    
    // 统计每个玩家的总点赞数
    Object.entries(playerEvaluationsData).forEach(([playerId, evaluations]) => {
      const totalLikes = evaluations.reduce((sum, e) => sum + e.voters.length, 0);
      if (totalLikes > 0) {
        // 找出该玩家点赞最多的标签
        const topEvaluation = [...evaluations].sort((a, b) => b.voters.length - a.voters.length)[0];
        
        // 从weekRankingData中找到玩家名字
        const playerInfo = weekRankingData.find(p => p.id === playerId);
        if (playerInfo) {
          playerStats[playerId] = {
            name: playerInfo.name,
            totalLikes,
            topTag: {
              type: topEvaluation.type,
              count: topEvaluation.voters.length
            }
          };
        }
      }
    });
    
    // 找出点赞最多的玩家
    const topPlayerId = Object.keys(playerStats).reduce((a, b) => 
      playerStats[a].totalLikes > playerStats[b].totalLikes ? a : b
    , Object.keys(playerStats)[0]);
    
    return topPlayerId ? {
      id: topPlayerId,
      ...playerStats[topPlayerId]
    } : null;
  };

  const topPlayer = getTopPlayer();

  return (
    <div className="h-full bg-black text-white pb-20 flex flex-col overflow-hidden">
      {/* Welcome Section */}
      <div className="flex-1 flex flex-col px-6 pt-6 sm:pt-10 overflow-hidden">
        {/* Logo and Welcome */}
        <div className="text-center flex-shrink-0 mb-4 sm:mb-6">
          <div className="mb-2 sm:mb-3 flex justify-center">
            <img 
              src={logoImage} 
              alt="Shark Mind Logo" 
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
              style={{
                filter: 'invert(1) sepia(1) saturate(5) hue-rotate(360deg) brightness(1.2)',
                mixBlendMode: 'screen'
              }}
            />
          </div>
          <p className="text-gray-400 text-sm sm:text-base mb-2">
            欢迎加入 鲨曼 Shark Mind Club
          </p>
          <div className="bg-gradient-to-r from-transparent via-gray-800 to-transparent h-px w-full mb-2"></div>
          <p className="text-gray-500 text-[11px] sm:text-xs leading-snug sm:leading-relaxed px-4">
            本俱乐部采取线下快速锦标赛模式，所有奖励均为无价值奖励，不可兑换不可销售，拒绝赌博，绿色竞技
          </p>
        </div>

        {/* Main Action Cards - with flex-1 to take remaining space */}
        <div className="flex-1 flex flex-col gap-3 sm:gap-4 overflow-y-auto min-h-0">
          {/* 扫码上桌按钮 - 仅登录后显示 */}
          {isLoggedIn && (
            <button
              onClick={() => {
                // 模拟微信扫码接口调用，直接显示成功弹窗
                setShowScanSuccessModal(true);
              }}
              className="w-full bg-gradient-to-r from-[#FFED00]/20 to-[#FFED00]/10 border-2 border-[#FFED00] rounded-xl p-5 sm:p-5 flex items-center justify-between hover:from-[#FFED00]/30 hover:to-[#FFED00]/20 transition-all shadow-lg shadow-[#FFED00]/20 flex-shrink-0"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">📷</div>
                <div className="text-left">
                  <div className="text-[#FFED00] text-sm font-bold">扫码参加比赛</div>
                  <div className="text-gray-400 text-xs">扫码前请咨询发牌员，确认已经开赛</div>
                </div>
              </div>
              <div className="text-[#FFED00]">→</div>
            </button>
          )}

          <button
            onClick={() => setShowEventsModal(true)}
            className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-2xl overflow-hidden text-left hover:from-[#333] hover:to-[#222] transition-all border border-gray-800 flex-shrink-0"
          >
            <div className="p-4 sm:p-5 pb-2 sm:pb-3">
              <div className="text-[#FF6B9D] text-xl sm:text-2xl font-bold mb-0.5 sm:mb-1">店内活动</div>
              <div className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3">Events & Promotions</div>
            </div>
            
            {/* Today's Events Preview */}
            {sortedEvents.length > 0 && (
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 -mx-4 sm:-mx-5">
                <div className="flex gap-2 sm:gap-3 overflow-x-auto px-4 sm:px-5 scrollbar-hide">
                  {sortedEvents.map((event) => {
                    const tagStyle = getTagStyle(event.statusTag);
                    return (
                      <div key={event.id} className="flex-shrink-0 w-32 sm:w-36">
                        <div className="relative h-20 sm:h-24 rounded-lg overflow-hidden mb-1.5 sm:mb-2">
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className={`absolute top-2 right-2 ${tagStyle.bg} ${tagStyle.text} text-[10px] px-2 py-0.5 rounded-full font-medium`}>
                            {tagStyle.label}
                          </div>
                        </div>
                        <div className="text-white text-xs font-medium line-clamp-2">
                          {event.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </button>

          {/* Quick Features */}
          <div className="space-y-3 sm:space-y-4 flex-shrink-0 pb-2 sm:pb-4">
            <button
              onClick={onNavigateToOrder}
              className="w-full bg-[#2a2a2a] rounded-xl p-5 sm:p-5 flex items-center justify-between hover:bg-[#333] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">🍽️</div>
                <div className="text-left">
                  <div className="text-white text-sm font-medium">点餐</div>
                  <div className="text-gray-500 text-xs">美食饮品</div>
                </div>
              </div>
              <div className="text-gray-600">→</div>
            </button>

            <button
              onClick={() => setShowLocationGuideModal(true)}
              className="w-full bg-[#2a2a2a] rounded-xl p-5 sm:p-5 flex items-center justify-between hover:bg-[#333] transition-colors relative"
            >
              {/* 新人必看标签 */}
              <div className="absolute -top-2 right-1 bg-gradient-to-r from-[#FF6B9D] to-[#FF4B7C] text-white text-[10px] px-3 py-1 rounded-full font-bold shadow-lg flex items-center gap-1 z-10 animate-pulse">
                <span>⭐</span>
                <span>新人必看</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-2xl">📍</div>
                <div className="text-left">
                  <div className="text-white text-sm font-medium">到店指引</div>
                  <div className="text-gray-500 text-xs">珠江新城保利中达</div>
                </div>
              </div>
              <div className="text-gray-600">→</div>
            </button>

            <button
              onClick={() => setShowParkingGuideModal(true)}
              className="w-full bg-[#2a2a2a] rounded-xl p-5 sm:p-5 flex items-center justify-between hover:bg-[#333] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">🚗</div>
                <div className="text-left">
                  <div className="text-white text-sm font-medium">停车指引</div>
                  <div className="text-gray-500 text-xs">珠江新城保利中达</div>
                </div>
              </div>
              <div className="text-gray-600">→</div>
            </button>

            <button
              onClick={() => setShowCompetitionRulesModal(true)}
              className="w-full bg-[#2a2a2a] rounded-xl p-5 sm:p-5 flex items-center justify-between hover:bg-[#333] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">📖</div>
                <div className="text-left">
                  <div className="text-white text-sm font-medium">比赛规则</div>
                  <div className="text-gray-500 text-xs">常规赛 · 周赛 · 月赛 · 双人赛</div>
                </div>
              </div>
              <div className="text-gray-600">→</div>
            </button>

            <button
              onClick={() => setShowRewardsGuideModal(true)}
              className="w-full bg-[#2a2a2a] rounded-xl p-5 sm:p-5 flex items-center justify-between hover:bg-[#333] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">🎁</div>
                <div className="text-left">
                  <div className="text-white text-sm font-medium">奖励说明</div>
                  <div className="text-gray-500 text-xs">荣耀奖励 · 礼品说明</div>
                </div>
              </div>
              <div className="text-gray-600">→</div>
            </button>

            <button
              onClick={() => setShowStoreEnvironmentModal(true)}
              className="w-full bg-[#2a2a2a] rounded-xl p-5 sm:p-5 flex items-center justify-between hover:bg-[#333] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">📸</div>
                <div className="text-left">
                  <div className="text-white text-sm font-medium">店铺环境</div>
                  <div className="text-gray-500 text-xs">了解更多店铺细节</div>
                </div>
              </div>
              <div className="text-gray-600">→</div>
            </button>

            <button
              onClick={() => {
                // 微信自带反馈功能
                alert('反馈功能将打开微信反馈界面');
              }}
              className="w-full bg-[#2a2a2a] rounded-xl p-5 sm:p-5 flex items-center justify-between hover:bg-[#333] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">💬</div>
                <div className="text-left">
                  <div className="text-white text-sm font-medium">反馈</div>
                  <div className="text-gray-500 text-xs">意见建议</div>
                </div>
              </div>
              <div className="text-gray-600">→</div>
            </button>

            {/* 本周最受关注选手 */}
            {topPlayer && (
              <button
                onClick={() => setSelectedPlayer({ id: topPlayer.id, name: topPlayer.name })}
                className="w-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-xl p-5 border border-[#FFED00]/30 hover:from-[#333] hover:to-[#222] transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#FFED00] text-sm font-bold">🏆 本周最受关注选手</div>
                  <div className="text-gray-600">→</div>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 ring-2 ring-[#FFED00]/50">
                    <div className="text-white text-lg font-bold">
                      {topPlayer.name[0]}
                    </div>
                  </div>
                  
                  {/* Player Info */}
                  <div className="flex-1 text-left">
                    <div className="text-white text-base font-medium mb-1">
                      {topPlayer.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-[#2a2a2a] border border-[#FFED00]/30 rounded px-2 py-0.5 flex items-center gap-1">
                        <span className="text-gray-300 text-xs">{topPlayer.topTag.type}</span>
                        <span className="text-[#FFED00] text-xs font-bold">{topPlayer.topTag.count}</span>
                      </div>
                      <div className="text-gray-400 text-xs">
                        共{topPlayer.totalLikes}个点赞
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Events Modal */}
      {showEventsModal && (
        <EventsModal isOpen={showEventsModal} onClose={() => setShowEventsModal(false)} />
      )}

      {/* Location Guide Modal */}
      {showLocationGuideModal && (
        <LocationGuideModal isOpen={showLocationGuideModal} onClose={() => setShowLocationGuideModal(false)} />
      )}

      {/* Parking Guide Modal */}
      {showParkingGuideModal && (
        <ParkingGuideModal isOpen={showParkingGuideModal} onClose={() => setShowParkingGuideModal(false)} />
      )}

      {/* Competition Rules Modal */}
      {showCompetitionRulesModal && (
        <CompetitionRulesModal isOpen={showCompetitionRulesModal} onClose={() => setShowCompetitionRulesModal(false)} />
      )}

      {/* Store Environment Modal */}
      {showStoreEnvironmentModal && (
        <StoreEnvironmentModal isOpen={showStoreEnvironmentModal} onClose={() => setShowStoreEnvironmentModal(false)} />
      )}

      {/* Rewards Guide Modal */}
      {showRewardsGuideModal && (
        <RewardsGuideModal isOpen={showRewardsGuideModal} onClose={() => setShowRewardsGuideModal(false)} />
      )}

      {/* Player Evaluation Modal */}
      {selectedPlayer && (
        <PlayerEvaluationModal 
          isOpen={true} 
          onClose={() => setSelectedPlayer(null)} 
          playerId={selectedPlayer.id} 
          playerName={selectedPlayer.name} 
          isLoggedIn={isLoggedIn}
        />
      )}

      {/* Scan Success Modal */}
      {showScanSuccessModal && (
        <ScanSuccessModal isOpen={showScanSuccessModal} onClose={() => setShowScanSuccessModal(false)} />
      )}
    </div>
  );
}