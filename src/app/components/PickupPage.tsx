import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface PickupPageProps {
  onBack: () => void;
}

export function PickupPage({ onBack }: PickupPageProps) {
  const [selectedTab, setSelectedTab] = useState<'pending' | 'completed'>('pending');

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <div className="bg-[#1a1a1a] px-6 py-4 flex items-center gap-4 border-b border-gray-800">
        <button 
          onClick={onBack} 
          className="text-white hover:text-[#FFED00] transition-colors flex-shrink-0"
          aria-label="返回"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-medium flex-1 text-center">取酒</h1>
        <div className="w-6" /> {/* Spacer for centering */}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-6 py-4 bg-[#1a1a1a] border-b border-gray-800">
        <button
          onClick={() => setSelectedTab('pending')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedTab === 'pending'
              ? 'bg-[#FFED00] text-black'
              : 'bg-[#2a2a2a] text-gray-400'
          }`}
        >
          待取
        </button>
        <button
          onClick={() => setSelectedTab('completed')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedTab === 'completed'
              ? 'bg-[#FFED00] text-black'
              : 'bg-[#2a2a2a] text-gray-400'
          }`}
        >
          已取
        </button>
      </div>

      {/* Empty State */}
      <div className="text-center py-12">
        <div className="text-gray-400 text-sm">没有更多了~</div>
      </div>
    </div>
  );
}