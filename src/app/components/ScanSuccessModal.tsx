import { Check } from 'lucide-react';

interface ScanSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScanSuccessModal({ isOpen, onClose }: ScanSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
      <div className="bg-[#1a1a1a] rounded-3xl max-w-md w-full border border-gray-800 overflow-hidden">
        {/* Success Icon */}
        <div className="pt-12 pb-6 flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-green-500/50">
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </div>
          
          {/* Success Title */}
          <h2 className="text-white text-2xl font-bold mb-2">扫码成功</h2>
          <p className="text-green-400 text-lg font-medium">您已加入比赛</p>
        </div>

        {/* Message */}
        <div className="px-8 pb-8">
          <div className="bg-[#2a2a2a] rounded-2xl p-6 border border-gray-700">
            <p className="text-gray-300 text-center text-base leading-relaxed">
              技术领先，绿色竞技
            </p>
            <p className="text-[#FFED00] text-center text-lg font-bold mt-4">
              Shark Mind Club 预祝您夺冠！
            </p>
          </div>
        </div>

        {/* Close Button */}
        <div className="px-8 pb-8">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-[#FFED00] to-[#FFD700] text-black text-base font-bold py-3.5 rounded-xl hover:from-[#FFD700] hover:to-[#FFC700] transition-all"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  );
}
