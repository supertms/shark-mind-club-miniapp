import { X } from 'lucide-react';
import { eventsData, Event } from '@/app/data/mockData';

interface EventsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EventsModal({ isOpen, onClose }: EventsModalProps) {
  if (!isOpen) return null;

  // 状态标签优先级排序
  const statusOrder = {
    '今日特色': 1,
    '明日预告': 2,
    '持续进行中': 3
  };

  // 按照状态标签排序活动
  const sortedEvents = [...eventsData].sort((a, b) => {
    return statusOrder[a.statusTag] - statusOrder[b.statusTag];
  });

  // 状态标签颜色映射
  const getTagColor = (tag: Event['statusTag']) => {
    switch (tag) {
      case '持续进行中':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case '今日特色':
        return 'bg-[#FFED00]/20 text-[#FFED00] border-[#FFED00]/30';
      case '明日预告':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-[680px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">店内活动</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Events List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {sortedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-[#2a2a2a] rounded-xl overflow-hidden hover:bg-[#333] transition-colors"
              >
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Event Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-white">
                      {event.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTagColor(event.statusTag)}`}>
                      {event.statusTag}
                    </span>
                  </div>
                  
                  <div className="text-gray-500 text-xs mb-3 flex items-center gap-1">
                    <span>📅</span>
                    <span>{event.validityPeriod}</span>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed min-h-0 whitespace-pre-line" style={{ 
                    display: '-webkit-box',
                    WebkitLineClamp: 10,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}