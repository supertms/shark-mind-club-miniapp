import { X } from 'lucide-react';

interface WeChatLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function WeChatLoginModal({ isOpen, onClose, onConfirm }: WeChatLoginModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] rounded-3xl max-w-sm w-full border border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] p-6 pb-8 border-b border-gray-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/50 transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.03-.406-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
              </svg>
            </div>
            <h3 className="text-white text-xl font-bold mb-2">微信授权登录</h3>
            <p className="text-gray-400 text-sm">使用微信账号快速登录</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-[#2a2a2a] rounded-2xl p-4 mb-6 border border-gray-800">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="text-white text-sm font-medium mb-1">安全可靠</div>
                <div className="text-gray-400 text-xs">微信官方认证，保护您的隐私安全</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <div className="text-white text-sm font-medium mb-1">快速便捷</div>
                <div className="text-gray-400 text-xs">一键授权，无需注册繁琐流程</div>
              </div>
            </div>
          </div>

          <div className="bg-[#2a2a2a] rounded-xl p-3 mb-6 border border-gray-700">
            <p className="text-gray-400 text-xs text-center leading-relaxed">
              登录即表示您同意《用户服务协议》和《隐私政策》，我们将获取您的微信昵称和头像信息
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-[#2a2a2a] text-white py-3.5 rounded-xl font-medium hover:bg-[#333] transition-colors border border-gray-700"
            >
              取消
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3.5 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/30"
            >
              授权登录
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
