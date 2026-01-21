interface WelcomeModalProps {
  userName: string;
  userPhone: string;
}

export function WelcomeModal({ userName, userPhone }: WelcomeModalProps) {
  return (
    <div className="bg-gradient-to-br from-purple-100 to-white rounded-2xl p-6 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-gray-700 text-sm">
          嘿，玩家{userName}！
        </span>
      </div>
      <div className="text-gray-600 text-sm">
        欢迎加入<span className="font-bold">Play+德扑爱好者Club</span>
      </div>
    </div>
  );
}
