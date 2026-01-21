import { useState } from 'react';
import { Share2 } from 'lucide-react';

interface PointsModalProps {
  type: 'deposit' | 'withdraw';
  userName?: string;
  userPhone?: string;
  onClose: () => void;
  onConfirm: (amount: number) => void;
}

export function PointsModal({ type, userName, userPhone, onClose, onConfirm }: PointsModalProps) {
  const [amount, setAmount] = useState('');

  const handleConfirm = () => {
    const value = parseInt(amount);
    if (value > 0) {
      onConfirm(value);
      onClose();
    }
  };

  const isDeposit = type === 'deposit';
  const minAmount = isDeposit ? 500 : 0;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-gradient-to-br from-purple-100 to-white rounded-3xl overflow-hidden">
        {/* User Info Header */}
        {userName && userPhone && (
          <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-200">
            <div>
              <div className="text-gray-800 font-medium">{userName}</div>
              <div className="text-gray-500 text-sm">{userPhone}</div>
            </div>
            <button className="text-gray-400">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        )}
        
        <div className="p-6">
          {/* Welcome Message */}
          {userName && (
            <div className="mb-4 text-gray-600 text-sm">
              嘿，玩家{userName}！欢迎加入<span className="font-bold">Play+德扑爱好者Club</span>
            </div>
          )}
          
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {isDeposit ? '存积分 ↓' : '提积分 ↑'}
          </h2>

          <div className="mb-6">
            <p className="text-gray-600 text-sm mb-4">
              {isDeposit
                ? '记分牌10:1获得积分，同时可获得以500:1获得金币'
                : '积分1:1获取记分牌'}
            </p>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={
                isDeposit
                  ? '请输入记分牌数量（不小于500）'
                  : '请输入积分数量'
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleConfirm}
              disabled={!amount || (isDeposit && parseInt(amount) < minAmount)}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl font-medium hover:from-purple-600 hover:to-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}