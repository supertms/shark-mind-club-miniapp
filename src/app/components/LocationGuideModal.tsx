import { X, Phone } from 'lucide-react';
import guideImage1 from 'figma:asset/6bc876417bfba886df37b5fd5f2522c5b583e543.png';
import guideImage2 from 'figma:asset/b64fe3234ee41f6fec60c7eaed41796a817ddc3a.png';
import guideImage3 from 'figma:asset/9f83bfad5d9d68bc1878e274a352c2f7864bff0b.png';
import guideImage4 from 'figma:asset/49067b7c40323ff72fd8d7795bdcb2461cb0cfa5.png';

interface LocationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LocationGuideModal({ isOpen, onClose }: LocationGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-[680px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-xl font-bold text-white">鲨曼桌游【到店指引】</h2>
            <p className="text-sm text-gray-400 mt-1">SHARK MIND</p>
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
            {/* Contact & Address Info */}
            <div className="bg-[#2a2a2a] rounded-xl p-5 border border-gray-800">
              <div className="space-y-4">
                {/* Customer Service Phone */}
                <div className="flex items-start gap-3">
                  <span className="text-2xl">☎️</span>
                  <div className="flex-1">
                    <div className="text-gray-400 text-sm mb-2">客服电话</div>
                    <div className="space-y-2">
                      <a
                        href="tel:18520175662"
                        className="flex items-center justify-between bg-[#1a1a1a] hover:bg-black transition-colors rounded-lg p-3 border border-gray-700"
                      >
                        <span className="text-white text-lg font-medium tracking-wider">185 2017 5662</span>
                        <Phone className="w-4 h-4 text-[#FFED00]" />
                      </a>
                      <a
                        href="tel:18810352879"
                        className="flex items-center justify-between bg-[#1a1a1a] hover:bg-black transition-colors rounded-lg p-3 border border-gray-700"
                      >
                        <span className="text-white text-lg font-medium tracking-wider">188 1035 2879</span>
                        <Phone className="w-4 h-4 text-[#FFED00]" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">💬</span>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">客服微信</div>
                    <div className="text-white font-medium">v：Ppiswzhs</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">地址</div>
                    <div className="text-white font-medium">珠江新城保利中达-三号楼1812</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-gradient-to-br from-[#FFED00]/10 to-[#FFED00]/5 border border-[#FFED00]/20 rounded-xl p-5">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#FFED00] rounded-full"></div>
                  <p className="text-white text-sm">本店位于十八楼，按定位导航可到���本店楼下</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#FFED00] rounded-full"></div>
                  <p className="text-white text-sm">在【保利中达广场三号楼空中别墅】</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#FFED00] rounded-full mt-1.5"></div>
                  <div>
                    <span className="text-2xl mr-2">🚪</span>
                    <span className="text-white text-sm">门口有门禁 需要扫粤居码</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Guide Images */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg">📍 路线指引</h3>

              {/* Step 1 */}
              <div className="bg-[#2a2a2a] rounded-xl overflow-hidden">
                <div className="w-full bg-black flex items-center justify-center p-4">
                  <img
                    src={guideImage1}
                    alt="到达保利中达广场从三号楼天空别墅大堂"
                    className="w-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-[#FFED00] text-black text-xs font-bold px-2 py-1 rounded">
                      步骤 1
                    </div>
                  </div>
                  <p className="text-white text-sm font-medium">到达保利中达广场从三号楼天空别墅大堂</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-[#2a2a2a] rounded-xl overflow-hidden">
                <div className="w-full bg-black flex items-center justify-center p-4">
                  <img
                    src={guideImage2}
                    alt="从这里进入"
                    className="w-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-[#FFED00] text-black text-xs font-bold px-2 py-1 rounded">
                      步骤 2
                    </div>
                  </div>
                  <p className="text-white text-sm font-medium">从这里进入</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-[#2a2a2a] rounded-xl overflow-hidden">
                <div className="w-full bg-black flex items-center justify-center p-4">
                  <img
                    src={guideImage3}
                    alt="扫二维码，粤居码进入"
                    className="w-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-[#FFED00] text-black text-xs font-bold px-2 py-1 rounded">
                      步骤 3
                    </div>
                  </div>
                  <p className="text-white text-sm font-medium">扫二维码，粤居码进入</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-[#2a2a2a] rounded-xl overflow-hidden">
                <div className="w-full bg-black flex items-center justify-center p-4">
                  <img
                    src={guideImage4}
                    alt="上电梯18楼，到1812"
                    className="w-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-[#FFED00] text-black text-xs font-bold px-2 py-1 rounded">
                      步骤 4
                    </div>
                  </div>
                  <p className="text-white text-sm font-medium">上电梯18楼，到1812</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}