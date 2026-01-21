import { useState } from 'react';
import { Plus, Minus, ArrowLeft, Gift, Cookie, Beer, Wine, CupSoda, X, Clock } from 'lucide-react';
import { categories, products, Product, Order } from '@/app/data/mockData';
import { toast } from 'sonner';

interface OrderPageProps {
  cart: { product: Product; quantity: number; variant?: string }[];
  onAddToCart: (product: Product, variant?: string) => void;
  onRemoveFromCart: (product: Product, variant?: string) => void;
  onProductClick: (product: Product) => void;
  onBack: () => void;
  onClearCart: () => void;
  onConfirmOrder: () => void;
  ongoingOrders: Order[];
  isLoggedIn: boolean;
}

export function OrderPage({ cart, onAddToCart, onRemoveFromCart, onProductClick, onBack, onClearCart, onConfirmOrder, ongoingOrders, isLoggedIn }: OrderPageProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // 根据是否有进行中订单来过滤分类
  const availableCategories = categories.filter(category => {
    if (category.id === 'ongoing-orders') {
      return ongoingOrders.length > 0;
    }
    return true;
  });

  const filteredProducts = products.filter(p => p.category === selectedCategory);
  
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Get quantity for a specific product (without variant)
  const getProductQuantity = (productId: string) => {
    const item = cart.find(item => item.product.id === productId && !item.variant);
    return item ? item.quantity : 0;
  };

  // Get icon component for category
  const getCategoryIcon = (iconName: string) => {
    const iconMap: Record<string, any> = {
      'gift': Gift,
      'cookie': Cookie,
      'beer': Beer,
      'wine': Wine,
      'cup-soda': CupSoda,
      'clock': Clock,
    };
    const IconComponent = iconMap[iconName] || Gift;
    return <IconComponent className="w-5 h-5 mb-1" />;
  };

  // Handle checkout confirmation
  const handleConfirmOrder = () => {
    setShowCheckoutModal(false);
    onConfirmOrder();
  };

  // Handle checkout button click
  const handleCheckoutClick = () => {
    if (!isLoggedIn) {
      toast.error('请先登录后再进行结算');
      return;
    }
    setShowCheckoutModal(true);
  };

  return (
    <div className="h-full bg-black text-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-[#1a1a1a] px-6 py-4 border-b border-gray-800 flex items-center gap-4 flex-shrink-0">
        {/* 返回按钮 - 移到左侧 */}
        <button 
          onClick={onBack}
          className="text-white hover:text-[#FFED00] transition-colors flex-shrink-0"
          aria-label="返回"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        {/* 标题 */}
        <h1 className="text-lg font-medium flex-1">Shark Mind Club</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Category Sidebar */}
        <div className="w-24 bg-[#1a1a1a] overflow-y-auto border-r border-gray-800">
          {availableCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full px-2 py-4 text-xs flex flex-col items-center justify-center border-b border-gray-800 transition-colors ${
                selectedCategory === category.id
                  ? 'bg-[#FFED00] text-black font-medium'
                  : 'text-gray-400 hover:bg-[#2a2a2a]'
              }`}
            >
              {getCategoryIcon(category.icon)}
              <span className="mt-1">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 pb-32">
          {/* 进行中订单 */}
          {selectedCategory === 'ongoing-orders' ? (
            <div className="space-y-4">
              {ongoingOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Clock className="w-16 h-16 text-gray-600 mb-4" />
                  <p className="text-gray-400 text-lg">暂无进行中的订单</p>
                </div>
              ) : (
                ongoingOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-[#1a1a1a] rounded-xl p-5 border-2 border-[#FFED00]/30"
                  >
                    {/* Order Header */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
                      <div>
                        <p className="text-gray-400 text-sm">{order.orderTime}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block bg-[#FFED00]/20 text-[#FFED00] px-3 py-1 rounded-full text-xs font-medium">
                          配送中
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3 mb-4">
                      {order.items.map((item, index) => (
                        <div
                          key={`${order.id}-${item.product.id}-${index}`}
                          className="flex items-center gap-3 bg-[#2a2a2a] rounded-lg p-3"
                        >
                          {item.product.image && (
                            <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white text-sm font-medium mb-1 truncate">
                              {item.product.name}
                            </h4>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-[#FFED00]">¥{item.product.price.toFixed(2)}</span>
                              <span className="text-gray-500">×{item.quantity}</span>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-white font-bold text-sm">
                              ¥{(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Total */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                      <span className="text-gray-400 text-sm">订单总额</span>
                      <span className="text-[#FFED00] text-xl font-bold">
                        ¥{order.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : selectedCategory === 'general-package' ? (
            /* 通用套餐特殊布局 */
            <div className="space-y-4">
              {filteredProducts.map((product) => {
                const quantity = getProductQuantity(product.id);
                
                return (
                  <div
                    key={product.id}
                    className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-2xl overflow-hidden border-2 border-[#FFED00]/20 hover:border-[#FFED00]/40 transition-all shadow-lg"
                  >
                    {/* 精美图片 */}
                    {product.image && (
                      <div className="relative w-full h-40 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        {/* 渐变遮罩 */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    )}
                    
                    <div className="p-5">
                      {/* 标题和价格 */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-white text-lg font-bold mb-1">
                            {product.name}
                          </h3>
                          <p className="text-[#FFED00] text-2xl font-bold">
                            ¥{product.price}
                          </p>
                        </div>
                        
                        {/* 数量控制 */}
                        <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                          {quantity > 0 && (
                            <>
                              <button
                                onClick={() => onRemoveFromCart(product)}
                                className="w-9 h-9 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
                              >
                                <Minus className="w-5 h-5 text-white" />
                              </button>
                              <span className="text-white font-bold text-lg min-w-[24px] text-center">
                                {quantity}
                              </span>
                            </>
                          )}
                          <button
                            onClick={() => product.variants ? onProductClick(product) : onAddToCart(product)}
                            className="w-9 h-9 bg-[#FFED00] rounded-full flex items-center justify-center hover:bg-[#FFE500] transition-colors shadow-lg"
                          >
                            <Plus className="w-5 h-5 text-black font-bold" />
                          </button>
                        </div>
                      </div>
                      
                      {/* 描述文字 */}
                      {product.description && (
                        <div className="bg-black/30 rounded-lg px-3 py-2.5 mt-3">
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {product.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* 其他分类保持原有布局 */
            <div className="space-y-3">
              {filteredProducts.map((product) => {
                const quantity = getProductQuantity(product.id);
                
                return (
                  <div
                    key={product.id}
                    className="bg-[#1a1a1a] rounded-xl p-4 flex items-center gap-4"
                  >
                    {/* Product Image */}
                    {product.image && (
                      <div 
                        onClick={() => product.variants ? onProductClick(product) : null}
                        className={`w-20 h-20 rounded-lg flex-shrink-0 overflow-hidden ${product.variants ? 'cursor-pointer' : ''}`}
                      >
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white text-sm font-medium mb-1 truncate">
                        {product.name}
                      </h3>
                      <p className="text-[#FFED00] text-base font-bold">
                        ¥{product.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {quantity > 0 && (
                        <>
                          <button
                            onClick={() => onRemoveFromCart(product)}
                            className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
                          >
                            <Minus className="w-5 h-5 text-white" />
                          </button>
                          <span className="text-white font-medium min-w-[20px] text-center">
                            {quantity}
                          </span>
                        </>
                      )}
                      <button
                        onClick={() => product.variants ? onProductClick(product) : onAddToCart(product)}
                        className="w-8 h-8 bg-[#FFED00] rounded-full flex items-center justify-center hover:bg-[#FFE500] transition-colors"
                      >
                        <Plus className="w-5 h-5 text-black" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Cart Footer */}
      {cartCount > 0 && (
        <div className="fixed bottom-16 left-0 right-0 max-w-[750px] mx-auto bg-[#1a1a1a] border-t border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              总计 <span className="text-[#FFED00] font-bold">¥{cartTotal.toFixed(2)}</span>，共计{cartCount}样商品
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  onClearCart();
                  toast.success('购物车已清空');
                }}
                className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-600 transition-colors border border-gray-600"
              >
                清空
              </button>
              <button 
                onClick={handleCheckoutClick}
                className="bg-[#FFED00] text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-[#FFE500] transition-colors"
              >
                去结算
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Confirmation Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-[500px] max-h-[90vh] flex flex-col border border-gray-800">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">确认订单</h2>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Order Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-3">
                {cart.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.variant || 'default'}-${index}`}
                    className="bg-[#2a2a2a] rounded-lg p-4 flex items-center gap-4"
                  >
                    {/* Product Image */}
                    {item.product.image && (
                      <div className="w-16 h-16 rounded-lg flex-shrink-0 overflow-hidden">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium mb-1">
                        {item.product.name}
                        {item.variant && (
                          <span className="text-gray-400 text-sm ml-2">({item.variant})</span>
                        )}
                      </h3>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-[#FFED00]">¥{item.product.price.toFixed(2)}</span>
                        <span className="text-gray-400">×{item.quantity}</span>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-white font-bold">
                        ¥{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Notice */}
              <div className="mt-6 bg-[#FFED00]/10 border border-[#FFED00]/30 rounded-lg p-4">
                <p className="text-[#FFED00] text-sm leading-relaxed">
                  💡 <span className="font-medium">温馨提示：</span>确认订单后，工作人员会将商品送您的座位上，请稍候。
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-800 px-6 py-4">
              {/* Total */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-base">订单总额</span>
                <span className="text-[#FFED00] text-2xl font-bold">¥{cartTotal.toFixed(2)}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="flex-1 bg-gray-700 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-600 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleConfirmOrder}
                  className="flex-1 bg-[#FFED00] text-black px-6 py-3 rounded-full font-medium hover:bg-[#FFE500] transition-colors"
                >
                  确认下单
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}