import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// 导入真实店内照片
import img1 from "figma:asset/e3b0a84a1634383c3b5e3c74d4479b68ca272c99.png";
import img2 from "figma:asset/2652b64666e93688bd2ff25ef4221ddaf4c0e40a.png";
import img3 from "figma:asset/359bdaa1fbbab2b86b6267414580f1f59ebb296e.png";
import img4 from "figma:asset/0ce364070d945755735cbdbb4b91096d1b7e1599.png";
import img5 from "figma:asset/ce6fee1f9335a53ee45cc5d72e5ab5511e607f0f.png";
import img6 from "figma:asset/445f6a24d9501f404dc646633852abb2233758fb.png";
import img7 from "figma:asset/0caa8b31d251e69821659a8d6923fa1924c11728.png";
import img8 from "figma:asset/d91863160bb750150077fd3abebfc726f8259ad8.png";
import img9 from "figma:asset/28ee8c73e3c25d267725b7faa556825fe93669ad.png";
import img10 from "figma:asset/50f427bb7c8b19b7f2b8cd7559c6fc6d84d0a77b.png";

interface StoreEnvironmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const storeImages = [
  {
    url: img1,
    title: '德州扑克专业牌桌'
  },
  {
    url: img2,
    title: 'Shark Mind Logo墙'
  },
  {
    url: img3,
    title: '店内欢乐氛围'
  },
  {
    url: img4,
    title: '金色水晶灯与鸡尾酒'
  },
  {
    url: img5,
    title: 'Shark Mind品牌周边'
  },
  {
    url: img6,
    title: '精选特调饮品'
  },
  {
    url: img7,
    title: '扑克牌桌氛围'
  },
  {
    url: img8,
    title: '品牌钥匙扣展示'
  },
  {
    url: img9,
    title: 'Shark Mind钥匙扣'
  },
  {
    url: img10,
    title: '店内灯光氛围'
  }
];

export function StoreEnvironmentModal({ isOpen, onClose }: StoreEnvironmentModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? storeImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === storeImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
      <div className="w-full max-w-[750px] h-screen bg-black relative overflow-hidden">
        {/* Title & Close Button */}
        <div className="absolute top-6 left-6 z-20">
          <h2 className="text-2xl font-bold text-white mb-1">店内环境</h2>
          <p className="text-sm text-gray-400 mb-3">Store Environment</p>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 bg-black/70 border border-[#FFED00] rounded-lg hover:bg-[#FFED00]/10 transition-all group"
          >
            <X className="w-4 h-4 text-[#FFED00]" />
            <span className="text-[#FFED00] text-sm font-medium">关闭</span>
          </button>
        </div>

        {/* Counter */}
        <div className="absolute top-6 right-6 z-20 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700">
          <span className="text-[#FFED00] font-bold">{currentIndex + 1}</span>
          <span className="text-gray-400 mx-1">/</span>
          <span className="text-gray-400">{storeImages.length}</span>
        </div>

        {/* Main Image Display */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Background Blur Effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-3xl opacity-30"
            style={{ backgroundImage: `url(${storeImages[currentIndex].url})` }}
          />

          {/* Main Image */}
          <div className="relative w-full h-full flex flex-col items-center justify-center px-6">
            <div className="relative w-full max-w-[650px] max-h-[calc(100vh-200px)] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-black/30">
              <img
                src={storeImages[currentIndex].url}
                alt={storeImages[currentIndex].title}
                className="w-full h-full object-contain"
              />
              
              {/* Left Arrow - on image */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all border border-white/20"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              {/* Right Arrow - on image */}
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all border border-white/20"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Dot Indicators */}
            <div className="flex gap-2 mt-6">
              {storeImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all rounded-full ${ 
                    index === currentIndex
                      ? 'w-8 h-2 bg-[#FFED00]'
                      : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}