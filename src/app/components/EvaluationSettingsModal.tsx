import { X, Clock, Shield } from 'lucide-react';

interface EvaluationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  allowEvaluation: boolean;
  lastSettingTime: string;
  onToggle: (value: boolean) => void;
  canToggle: boolean;
}

export function EvaluationSettingsModal({
  isOpen,
  onClose,
  allowEvaluation,
  lastSettingTime,
  onToggle,
  canToggle,
}: EvaluationSettingsModalProps) {
  if (!isOpen) return null;

  // 格式化时间显示
  const formatTime = (timeStr: string) => {
    const date = new Date(timeStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `今天${date.getHours()}点`;
    } else if (diffHours < 48) {
      return `昨天${date.getHours()}点`;
    } else {
      return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}点`;
    }
  };

  const handleToggle = () => {
    if (canToggle) {
      onToggle(!allowEvaluation);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] rounded-3xl max-w-md w-full border border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] p-6 pb-8 border-b border-gray-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/50 transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FFED00] to-[#E6D600] flex items-center justify-center">
              <Shield className="w-9 h-9 text-black" />
            </div>
            <h3 className="text-white text-xl font-bold mb-2">评价隐私设置</h3>
            <p className="text-gray-400 text-sm">管理您的玩家风格评价权限</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Description */}
          <div className="bg-[#2a2a2a] rounded-2xl p-5 mb-5 border border-gray-800">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-6 h-6 rounded-full bg-[#FFED00]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-[#FFED00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-white text-sm leading-relaxed">
                  您可以设置是否允许别人对您的风格进行评价，每次开关至少间隔24小时。
                </div>
              </div>
            </div>

            {/* Last Setting Time */}
            <div className="flex items-center gap-2 pt-3 border-t border-gray-700/50">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-400 text-xs">
                上次设置时间：<span className="text-gray-300">{formatTime(lastSettingTime)}</span>
              </span>
            </div>
          </div>

          {/* Toggle Switch */}
          <div className="bg-[#2a2a2a] rounded-2xl p-5 mb-5 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white text-base font-medium mb-1">允许评价</div>
                <div className="text-gray-400 text-xs">
                  {allowEvaluation ? '其他玩家可以评价您的风格' : '已关闭他人评价功能'}
                </div>
              </div>
              
              {/* Toggle Button */}
              <button
                onClick={handleToggle}
                disabled={!canToggle}
                className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                  allowEvaluation ? 'bg-[#FFED00]' : 'bg-gray-700'
                } ${!canToggle ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-lg transition-transform duration-300 ${
                    allowEvaluation ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {!canToggle && (
              <div className="mt-3 pt-3 border-t border-gray-700/50">
                <div className="text-orange-400 text-xs flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>距离上次设置不足24小时，暂时无法修改</span>
                </div>
              </div>
            )}
          </div>

          {/* Privacy Notice */}
          <div className="bg-[#2a2a2a] rounded-xl p-4 mb-5 border border-gray-700">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white text-xs font-medium mb-1">隐私保护</div>
                <div className="text-gray-400 text-xs leading-relaxed">
                  关闭后，排行榜中您的评价按钮将被隐藏，其他玩家无法对您进行风格评价。已有的评价数据将会保留。
                </div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-[#FFED00] to-[#E6D600] text-black py-3.5 rounded-xl font-medium hover:from-[#E6D600] hover:to-[#CCC000] transition-all shadow-lg shadow-[#FFED00]/30"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  );
}
