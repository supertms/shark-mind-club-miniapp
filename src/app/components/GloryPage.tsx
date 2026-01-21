import { Table } from '@/app/data/mockData';

interface GloryPageProps {
  table: Table;
}

export function GloryPage({ table }: GloryPageProps) {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <div className="bg-[#1a1a1a] px-6 py-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium">{table.name}</h1>
          <div className="bg-[#FFED00] text-black px-3 py-1 rounded text-xs font-medium">
            {table.status}
          </div>
        </div>
        <div className="text-gray-400 text-xs mt-2">
          更新时间：{table.updateTime}
        </div>
      </div>

      {/* Table Info */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
            <div className="text-gray-400 text-xs mb-1">基础积分</div>
            <div className="text-white text-xl font-bold">{table.basePoints}</div>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
            <div className="text-gray-400 text-xs mb-1">座位</div>
            <div className="text-white text-xl font-bold">{table.seats}</div>
          </div>
        </div>

        {/* Poker Table Layout */}
        <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-[#1a4d2e] to-[#0f2818] rounded-[40%] border-8 border-[#8B4513] flex items-center justify-center">
          {/* Center Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-[#FFED00] text-4xl font-bold opacity-20">
              Play+
            </div>
          </div>

          {/* Seats */}
          {table.seatLayout.map((seat, index) => {
            const totalSeats = table.seatLayout.length;
            const angle = (index / totalSeats) * 2 * Math.PI - Math.PI / 2;
            const radius = 42; // percentage
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);

            return (
              <div
                key={seat.id}
                className="absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {seat.status === 'available' ? (
                  <div className="w-16 h-16 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center">
                    <div className="text-gray-500 text-xs font-medium">
                      {seat.position}
                    </div>
                  </div>
                ) : seat.status === 'reserved' ? (
                  <div className="w-16 h-16 rounded-full bg-[#FFED00] border-2 border-[#FFD700] flex items-center justify-center">
                    <div className="text-black text-[10px] font-bold text-center">
                      已预约
                    </div>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-600 border-2 border-gray-500 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <div className="text-white text-xs font-bold">
                        {seat.user?.name?.[0] || 'P'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
