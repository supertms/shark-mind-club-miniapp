import { X } from 'lucide-react';

interface CompetitionRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Competition {
  id: string;
  name: string;
  icon: string;
  tagColor: string;
  tagBg: string;
  tagBorder: string;
  buyIn: string;
  reward: string;
  schedule: string;
  rules: string[];
}

const competitions: Competition[] = [
  {
    id: 'regular',
    name: '常规赛',
    icon: '🎲',
    tagColor: 'text-blue-400',
    tagBg: 'bg-blue-500/20',
    tagBorder: 'border-blue-500/30',
    buyIn: '酒水券一张',
    reward: '酒水券 + 积分',
    schedule: '每日 15:30',
    rules: [
      '时间：每日 15:30开始',
      '盲注结构：第一级别为 100/200 筹码，每 12分钟升一级',
      '前注：大盲位置玩家需要额外支付一个 BB 作为 ante',
      '起始筹码：30,000',
      '最少参赛人数：7人（第六级别之前可以随时加入）',
      '最多参赛人数：9人',
      '参赛门槛：酒水券一张',
      '奖励分配：前三名选手分别获得酒水券一张，积分 5 分、3 分、1 分',
      'Rebuy规则：第一二级别筹码为 0 后，可以购买 38 元酒水套餐赠送 20,000筹码；三四五级别筹码为 0 后，可以购买 58 元酒水套餐赠送30,000筹码；最多只可以 rebuy 两次（一至五级别相加）；第六级别开始，不可以 rebuy',
    ],
  },
  {
    id: 'weekly',
    name: '周赛',
    icon: '🏆',
    tagColor: 'text-[#FFED00]',
    tagBg: 'bg-[#FFED00]/20',
    tagBorder: 'border-[#FFED00]/30',
    buyIn: '酒水券一张',
    reward: '酒水券 + 积分 + 奖品',
    schedule: '每周六 15:30',
    rules: [
      '时间：每周六下午 15:30 开始',
      '参赛资格：每周积分排名前 18 名',
      '报名费：酒水券一张',
      'Rebuy 规则：前五级别筹码为0 后，可以购买 128 元酒水套餐赠送 30,000 筹码，最多可以 rebuy 一次',
      '特殊规定：仅限 9 人参加，按报名顺序排序',
      '奖励：前三名选手分别获得酒水券一张，积分 5 分、3 分、1 分，另有精彩奖励，每周不同',
    ],
  },
  {
    id: 'monthly',
    name: '月赛',
    icon: '👑',
    tagColor: 'text-purple-400',
    tagBg: 'bg-purple-500/20',
    tagBorder: 'border-purple-500/30',
    buyIn: '免费',
    reward: '精彩奖励',
    schedule: '每月初周日',
    rules: [
      '时间：每月初的周日',
      '参赛资格：每月积分排名前 27 名',
      '报名费：免费',
      'Rebuy 规则：与常规赛一致',
      '奖励：前三名选手分别获得精彩奖励，每月不同',
      '特殊规定：27 人分三张比赛桌同时开赛，每张比赛桌只前三名共计九名选手进入决赛桌。进入决赛桌后，比赛级别设置为第十级别开始。',
    ],
  },
  {
    id: 'doubles',
    name: '双人赛',
    icon: '👥',
    tagColor: 'text-pink-400',
    tagBg: 'bg-pink-500/20',
    tagBorder: 'border-pink-500/30',
    buyIn: '酒水券一张',
    reward: '酒水券 + 积分',
    schedule: '每周六 19:30',
    rules: [
      '时间：每周六19:30',
      '报名费：酒水券一张',
      '组队规则：两人提前组队，共四队，另有单人一名',
      'Rebuy 规则：与常规赛相同',
      '奖励分配：第一名队伍每位玩家获得酒水券一张加积分 3 分，另有精彩奖励，每场不同，敬请期待；若单人猎手夺冠，获得双倍奖励',
      '特殊规定：第五级别结束时，停表，两位玩家互相之间可以自由分配筹码；单人玩家起始筹码多 5,000',
    ],
  },
];

export function CompetitionRulesModal({ isOpen, onClose }: CompetitionRulesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-[680px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-800">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">比赛规则</h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Competition Rules</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Competitions List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Drink Voucher Pricing */}
          <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-gray-800 rounded-xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🍺</span>
              <h4 className="text-white font-bold text-sm sm:text-base">酒水券售价</h4>
            </div>
            <div className="bg-black/40 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#FFED00] rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <span className="text-[#FFED00] font-bold">66元</span> 和 <span className="text-[#FFED00] font-bold">88元</span> 酒水套餐包含：
                  </p>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                    指定啤酒 1 瓶或饮料畅饮（二选一）并含小吃一份
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 mt-6">
            {competitions.map((competition) => (
              <div
                key={competition.id}
                className="bg-[#2a2a2a] rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors"
              >
                {/* Competition Header */}
                <div className="bg-gradient-to-r from-[#2a2a2a] to-[#333] p-4 sm:p-5 border-b border-gray-800">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-2xl sm:text-3xl">{competition.icon}</span>
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {competition.name}
                      </h3>
                    </div>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${competition.tagBg} ${competition.tagColor} ${competition.tagBorder}`}>
                      {competition.schedule.includes('每日') ? '每日' : competition.schedule.includes('每周六') ? '每周' : competition.schedule.includes('每月') ? '每月' : '每周'}
                    </span>
                  </div>

                  {/* Key Info Grid */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div className="bg-black/30 rounded-lg p-2 sm:p-3">
                      <div className="text-gray-500 text-xs mb-1">报名费</div>
                      <div className="text-white text-xs sm:text-sm font-medium">{competition.buyIn}</div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-2 sm:p-3">
                      <div className="text-gray-500 text-xs mb-1">奖励</div>
                      <div className="text-[#FFED00] text-xs sm:text-sm font-medium leading-tight">{competition.reward}</div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-2 sm:p-3">
                      <div className="text-gray-500 text-xs mb-1">时间</div>
                      <div className="text-white text-xs sm:text-sm font-medium leading-tight break-words">
                        {competition.schedule}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Competition Rules */}
                <div className="p-4 sm:p-5">
                  <h4 className="text-white font-bold text-sm mb-3">📋 比赛规则</h4>
                  <div className="space-y-2">
                    {competition.rules.map((rule, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <p className="text-gray-400 text-sm leading-relaxed">{rule}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-4 bg-gradient-to-br from-[#FFED00]/10 to-[#FFED00]/5 border border-[#FFED00]/20 rounded-xl p-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              <span className="text-[#FFED00] font-bold">温馨提示：</span>
              所有比赛均需提前报名，报名截止时间为比赛开始前1小时。详细规则请咨询现场工作人员。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}