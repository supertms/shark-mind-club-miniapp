import { X } from 'lucide-react';

interface ParkingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ParkingGuideModal({ isOpen, onClose }: ParkingGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-[680px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-xl font-bold text-white">鲨曼桌游【停车指引】</h2>
            <p className="text-sm text-gray-400 mt-1">SHARK MIND PARKING</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Parking Info */}
            <div className="bg-[#2a2a2a] rounded-xl p-5 border border-gray-800">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🅿️</span>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">停车场位置</div>
                    <div className="text-white font-medium">珠江新城保利中达广场地下停车场</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">💰</span>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">停车费用</div>
                    <div className="text-white font-medium">具体收费标准请咨询物业管理处</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-gradient-to-br from-[#FFED00]/10 to-[#FFED00]/5 border border-[#FFED00]/20 rounded-xl p-5">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#FFED00] rounded-full"></div>
                  <p className="text-white text-sm">建议提前到达，预留找车位时间</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#FFED00] rounded-full"></div>
                  <p className="text-white text-sm">停车场入口位于保利中达广场北侧</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#FFED00] rounded-full"></div>
                  <p className="text-white text-sm">博物馆停车相对更便宜，但需提前预约看展方可进入</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#FFED00] rounded-full"></div>
                  <p className="text-white text-sm">如有疑问请联系客服咨询停车事宜</p>
                </div>
              </div>
            </div>

            {/* Guide Images */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg">🅿️ 停车指引</h3>
              
              {/* Step 1 */}
              <div className="bg-[#2a2a2a] rounded-xl overflow-hidden">
                <div className="w-full bg-black flex items-center justify-center p-4">
                  <img
                    src="https://images.unsplash.com/photo-1668911128137-2f40fb6bde1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJraW5nJTIwZ2FyYWdlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzY4ODgyMjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="停车场入口"
                    className="w-full object-contain rounded-lg"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-[#FFED00] text-black text-xs font-bold px-2 py-1 rounded">
                      步骤 1
                    </div>
                  </div>
                  <p className="text-white text-sm font-medium">定位到保利中达广场停车场入口</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-[#2a2a2a] rounded-xl overflow-hidden">
                <div className="w-full bg-black flex items-center justify-center p-4">
                  <img
                    src="https://images.unsplash.com/photo-1612917231506-a0825d1bc76d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJraW5nJTIwbG90JTIwY2FyfGVufDF8fHx8MTc2ODg4MjIxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="停车场内部"
                    className="w-full object-contain rounded-lg"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-[#FFED00] text-black text-xs font-bold px-2 py-1 rounded">
                      步骤 2
                    </div>
                  </div>
                  <p className="text-white text-sm font-medium">进入地下停车场，寻找空余车位</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-[#2a2a2a] rounded-xl overflow-hidden">
                <div className="w-full bg-black flex items-center justify-center p-4">
                  <img
                    src="https://images.unsplash.com/photo-1726802147453-a3c55327e1ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJraW5nJTIwZW50cmFuY2UlMjBzaWdufGVufDF8fHx8MTc2ODg4MjIxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="电梯指引"
                    className="w-full object-contain rounded-lg"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-[#FFED00] text-black text-xs font-bold px-2 py-1 rounded">
                      步骤 3
                    </div>
                  </div>
                  <p className="text-white text-sm font-medium">停好车后前往电梯，上18楼到1812</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}