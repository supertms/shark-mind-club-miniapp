import { Home, Trophy, BarChart3, User } from 'lucide-react';

interface BottomNavigationProps {
  active: 'home' | 'ranking' | 'profile';
  onNavigate: (page: 'home' | 'ranking' | 'profile') => void;
}

export function BottomNavigation({ active, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { id: 'home' as const, icon: Home, label: '首页' },
    { id: 'ranking' as const, icon: BarChart3, label: '排行榜' },
    { id: 'profile' as const, icon: User, label: '我的' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-[750px] mx-auto bg-[#1a1a1a] border-t border-gray-800 flex justify-around items-center h-16 z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="flex flex-col items-center justify-center flex-1 h-full"
          >
            <Icon 
              className={`w-6 h-6 ${isActive ? 'text-[#FFED00]' : 'text-gray-400'}`}
            />
            <span className={`text-xs mt-1 ${isActive ? 'text-[#FFED00]' : 'text-gray-400'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}