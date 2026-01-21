import { useState } from 'react';
import { HomePage } from '@/app/components/HomePage';
import { OrderModal } from '@/app/components/OrderModal';
import { RankingPage } from '@/app/components/RankingPage';
import { ProfilePage } from '@/app/components/ProfilePage';
import { BottomNavigation } from '@/app/components/BottomNavigation';
import { InfoModal } from '@/app/components/InfoModal';
import { InviteRewardModal } from '@/app/components/InviteRewardModal';
import { mockUser, monthRankingData, weekRankingData, quarterRankingData, yearRankingData, winRateRankingData, mockTable, Product, Order } from '@/app/data/mockData';
import { toast, Toaster } from 'sonner';

type Page = 'home' | 'ranking' | 'profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState(mockUser);
  const [cart, setCart] = useState<{ product: Product; quantity: number; variant?: string }[]>([]);
  const [showInfoModal, setShowInfoModal] = useState<'game-rules' | 'coin-info' | 'ranking-rules' | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // 登录状态 - 已登录状态用于查看完整评价
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 进行中订单状态
  const [ongoingOrders, setOngoingOrders] = useState<Order[]>([]);

  const handleUpdateEvaluationSetting = (allowEvaluation: boolean) => {
    setUser({
      ...user,
      allowEvaluation,
      lastEvaluationSettingTime: new Date().toISOString(),
    });
    toast.success(allowEvaluation ? '已开启评价功能' : '已关闭评价功能');
  };

  const handleAddToCart = (product: Product, quantity: number = 1, variant?: string) => {
    const existingItem = cart.find(
      (item) => item.product.id === product.id && item.variant === variant
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id && item.variant === variant
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity, variant }]);
    }

    toast.success(`已添加${product.name}到购物车`);
  };

  const handleRemoveFromCart = (product: Product, variant?: string) => {
    const existingItem = cart.find(
      (item) => item.product.id === product.id && item.variant === variant
    );

    if (existingItem) {
      if (existingItem.quantity > 1) {
        setCart(
          cart.map((item) =>
            item.product.id === product.id && item.variant === variant
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      } else {
        setCart(cart.filter((item) => !(item.product.id === product.id && item.variant === variant)));
      }
      toast.success(`已移除${product.name}`);
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // 处理订单确认
  const handleConfirmOrder = () => {
    if (cart.length === 0) return;

    // 生成订单号
    const now = new Date();
    const orderNumber = `SM${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    
    // 格式化时间
    const orderTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    // 计算总金额
    const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    // 创建新订单
    const newOrder: Order = {
      id: `order${Date.now()}`,
      orderNumber,
      items: cart.map(item => ({
        product: item.product,
        quantity: item.quantity,
        variant: item.variant,
      })),
      totalAmount,
      orderTime,
      isCompleted: false,
    };

    // 添加到进行中订单列表
    setOngoingOrders([newOrder, ...ongoingOrders]);

    // 清空购物车
    handleClearCart();

    // 显示成功提示
    toast.success('订单已确认！工作人员会尽快为您送达！');
  };

  const getBottomNavPage = (): 'home' | 'ranking' | 'profile' => {
    if (currentPage === 'ranking') return 'ranking';
    if (['profile'].includes(currentPage)) {
      return 'profile';
    }
    return 'home';
  };

  const handleBottomNavigation = (page: 'home' | 'ranking' | 'profile') => {
    setCurrentPage(page);
  };

  return (
    <div className="h-screen overflow-hidden bg-black">
      <Toaster 
        position="top-center"
        expand={true}
        richColors
        visibleToasts={1}
        duration={1000}
        toastOptions={{
          style: {
            width: '100%',
            maxWidth: '100%',
          },
        }}
      />
      <div className="h-full max-w-[750px] mx-auto relative bg-black overflow-hidden">
        {/* Main Content */}
        {currentPage === 'home' && (
          <HomePage
            onNavigateToOrder={() => setShowOrderModal(true)}
            onInviteFriends={() => setShowInviteModal(true)}
            isLoggedIn={isLoggedIn}
          />
        )}

        {currentPage === 'ranking' && (
          <RankingPage
            monthRankings={monthRankingData}
            weekRankings={weekRankingData}
            quarterRankings={quarterRankingData}
            yearRankings={yearRankingData}
            winRateRankings={winRateRankingData}
            userRanking={{ name: user.name, points: user.points }}
            onShowRules={() => setShowInfoModal('ranking-rules')}
            currentUser={user}
            isLoggedIn={isLoggedIn}
          />
        )}

        {currentPage === 'profile' && (
          <ProfilePage
            user={user}
            isLoggedIn={isLoggedIn}
            onNavigateToOrders={() => toast.info('订单功能开发中')}
            onLogin={() => setIsLoggedIn(true)}
            onUpdateEvaluationSetting={handleUpdateEvaluationSetting}
          />
        )}

        {/* Bottom Navigation */}
        <BottomNavigation
          active={getBottomNavPage()}
          onNavigate={handleBottomNavigation}
        />

        {/* Modals */}
        {showInfoModal && (
          <InfoModal
            type={showInfoModal}
            onClose={() => setShowInfoModal(null)}
          />
        )}

        {showInviteModal && (
          <InviteRewardModal
            isOpen={showInviteModal}
            onClose={() => setShowInviteModal(false)}
          />
        )}

        {showOrderModal && (
          <OrderModal
            isOpen={showOrderModal}
            onClose={() => setShowOrderModal(false)}
            cart={cart}
            onAddToCart={(product, variant) => handleAddToCart(product, 1, variant)}
            onRemoveFromCart={(product, variant) => handleRemoveFromCart(product, variant)}
            onClearCart={handleClearCart}
            onConfirmOrder={handleConfirmOrder}
            ongoingOrders={ongoingOrders}
            isLoggedIn={isLoggedIn}
          />
        )}
      </div>
    </div>
  );
}