import { useState } from 'react';
import { Plus, Minus, X, Gift, Cookie, Beer, Wine, CupSoda, Clock } from 'lucide-react';
import { categories, products, Product, Order } from '@/app/data/mockData';
import { toast } from 'sonner';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: { product: Product; quantity: number; variant?: string }[];
  onAddToCart: (product: Product, variant?: string) => void;
  onRemoveFromCart: (product: Product, variant?: string) => void;
  onClearCart: () => void;
  onConfirmOrder: () => void;
  ongoingOrders: Order[];
  isLoggedIn: boolean;
}

export function OrderModal({ 
  isOpen, 
  onClose, 
  cart, 
  onAddToCart, 
  onRemoveFromCart, 
  onClearCart, 
  onConfirmOrder, 
  ongoingOrders, 
  isLoggedIn 
}: OrderModalProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  if (!isOpen) return null;

  // 根据是否有进行中订单来过滤分类
  const availableCategories = categories.filter(category => {
    if (category.id === 'ongoing-orders') {
      return ongoingOrders.length > 0;
    }
    return true;
  });

  const filteredProducts = products.filter(p => p.category === selectedCategory);
  
  const cartTotal = cart.reduce((sum, item) => {
    const price = item.product?.price ?? 0;
    return sum + price * item.quantity;
  }, 0);
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
    <>
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
        <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-[680px] h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800 flex-shrink-0">
            <h2 className="text-xl font-bold text-white">点餐</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex overflow-hidden min-h-0">
            {/* Category Sidebar */}
            <div className="w-16 bg-[#1a1a1a] overflow-y-auto border-r border-gray-800 flex-shrink-0">
              {availableCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full px-1 py-4 text-xs flex flex-col items-center justify-center border-b border-gray-800 transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-[#FFED00] text-black font-medium'
                      : 'text-gray-400 hover:bg-[#2a2a2a]'
                  }`}
                >
                  {getCategoryIcon(category.icon)}
                  <span className="text-center leading-tight mt-1">{category.name}</span>
                </button>
              ))}
            </div>

            {/* Products List */}
            <div className="flex-1 flex flex-col overflow-hidden min-h-0">
              {selectedCategory === 'ongoing-orders' ? (
                // Ongoing Orders View
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-4">
                    {ongoingOrders.map((order) => {
                      // 计算订单总计
                      const orderTotal = order.items.reduce((sum, item) => {
                        const itemPrice = item.product?.price ?? 0;
                        return sum + itemPrice * item.quantity;
                      }, 0);
                      
                      return (
                        <div key={order.id} className="bg-[#2a2a2a] rounded-xl p-5 border border-gray-800">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="text-white font-medium mb-1">订单时间</div>
                              <div className="text-gray-500 text-xs">{order.orderTime}</div>
                            </div>
                            <div className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                              进行中
                            </div>
                          </div>

                          <div className="space-y-2">
                            {order.items.map((item, index) => {
                              const itemPrice = item.product?.price ?? 0;
                              return (
                                <div key={index} className="flex items-center justify-between text-sm">
                                  <div className="text-gray-300">
                                    {item.product.name}
                                    {item.variant && <span className="text-gray-500 ml-1">({item.variant})</span>}
                                    <span className="text-gray-500 ml-2">x{item.quantity}</span>
                                  </div>
                                  <div className="text-[#FFED00]">¥{(itemPrice * item.quantity).toFixed(2)}</div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="border-t border-gray-700 mt-4 pt-4 flex items-center justify-between">
                            <div className="text-gray-400 text-sm">订单总计</div>
                            <div className="text-[#FFED00] text-lg font-bold">¥{orderTotal.toFixed(2)}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                // Products Grid
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-4">
                    {filteredProducts.map((product) => {
                      if (!product || typeof product.price !== 'number') return null;
                      
                      const quantity = getProductQuantity(product.id);
                      const inCart = quantity > 0;
                      // 通用套餐使用特殊的大图展示样式
                      const isGeneralPackage = selectedCategory === 'general-package';

                      return (
                        <div
                          key={product.id}
                          className={`bg-[#2a2a2a] rounded-xl overflow-hidden hover:bg-[#333] transition-all ${
                            isGeneralPackage ? 'flex-col' : 'flex'
                          }`}
                        >
                          {/* Product Image */}
                          <div className={`relative overflow-hidden flex-shrink-0 ${
                            isGeneralPackage ? 'w-full h-48' : 'w-24 h-24'
                          }`}>
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>

                          {/* Product Info */}
                          <div className={`flex-1 flex flex-col justify-between min-w-0 ${
                            isGeneralPackage ? 'p-4' : 'p-2.5'
                          }`}>
                            <div className="flex-1 min-h-0">
                              <h3 className={`text-white font-medium mb-0.5 ${
                                isGeneralPackage ? 'text-base' : 'text-sm truncate'
                              }`}>
                                {product.name}
                              </h3>
                              <p className={`text-gray-400 ${
                                isGeneralPackage ? 'text-sm leading-relaxed' : 'text-xs line-clamp-2'
                              }`}>
                                {product.description}
                              </p>
                            </div>

                            {/* Price and Controls */}
                            <div className={`flex items-center justify-between gap-1.5 ${
                              isGeneralPackage ? 'mt-4' : 'mt-1.5'
                            }`}>
                              <div className={`text-[#FFED00] font-bold flex-shrink-0 ${
                                isGeneralPackage ? 'text-lg' : 'text-xs'
                              }`}>
                                ¥{product.price.toFixed(2)}
                              </div>

                              {/* Add/Remove Buttons */}
                              {product.variants ? (
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // 默认使用第一个规格
                                    onAddToCart(product, product.variants[0]);
                                  }}
                                  className={`bg-[#FFED00] text-black rounded-full font-medium hover:bg-[#FFE500] transition-colors flex-shrink-0 whitespace-nowrap ${
                                    isGeneralPackage ? 'px-6 py-2 text-sm' : 'px-2.5 py-1 text-xs'
                                  }`}
                                >
                                  添加
                                </button>
                              ) : inCart ? (
                                <div className="flex items-center gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                                  <button
                                    onClick={() => onRemoveFromCart(product)}
                                    className={`rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600 transition-colors flex-shrink-0 ${
                                      isGeneralPackage ? 'w-8 h-8' : 'w-6 h-6'
                                    }`}
                                  >
                                    <Minus className={isGeneralPackage ? 'w-4 h-4' : 'w-3 h-3'} />
                                  </button>
                                  <span className={`text-white font-medium text-center flex-shrink-0 ${
                                    isGeneralPackage ? 'text-sm w-8' : 'text-xs w-5'
                                  }`}>{quantity}</span>
                                  <button
                                    onClick={() => onAddToCart(product)}
                                    className={`rounded-full bg-[#FFED00] text-black flex items-center justify-center hover:bg-[#FFE500] transition-colors flex-shrink-0 ${
                                      isGeneralPackage ? 'w-8 h-8' : 'w-6 h-6'
                                    }`}
                                  >
                                    <Plus className={isGeneralPackage ? 'w-4 h-4' : 'w-3 h-3'} />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onAddToCart(product);
                                  }}
                                  className={`rounded-full bg-[#FFED00] text-black flex items-center justify-center hover:bg-[#FFE500] transition-colors flex-shrink-0 ${
                                    isGeneralPackage ? 'w-8 h-8' : 'w-6 h-6'
                                  }`}
                                >
                                  <Plus className={isGeneralPackage ? 'w-4 h-4' : 'w-3 h-3'} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Cart Bar */}
          {selectedCategory !== 'ongoing-orders' && cartCount > 0 && (
            <div className="border-t border-gray-800 p-4 bg-[#2a2a2a] flex-shrink-0">
              <div className="flex items-center justify-between">
                {/* Cart Summary */}
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-gray-400 text-xs">合计</div>
                    <div className="text-[#FFED00] text-xl font-bold">¥{cartTotal.toFixed(2)}</div>
                  </div>
                  <div className="text-gray-500 text-sm">
                    共{cartCount}件商品
                  </div>
                </div>

                {/* Checkout Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={onClearCart}
                    className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    清空
                  </button>
                  <button
                    onClick={handleCheckoutClick}
                    className="px-6 py-2 bg-[#FFED00] text-black rounded-full font-medium text-sm hover:bg-[#FFE500] transition-colors"
                  >
                    去结算
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Confirmation Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-white mb-4">确认订单</h3>
            
            {/* Order Items */}
            <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
              {cart.map((item, index) => {
                const itemPrice = item.product?.price ?? 0;
                return (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="text-gray-300">
                      {item.product.name}
                      {item.variant && <span className="text-gray-500 ml-1">({item.variant})</span>}
                      <span className="text-gray-500 ml-2">x{item.quantity}</span>
                    </div>
                    <div className="text-[#FFED00]">¥{(itemPrice * item.quantity).toFixed(2)}</div>
                  </div>
                );
              })}
            </div>

            {/* Total */}
            <div className="border-t border-gray-800 pt-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">订单总计</span>
                <span className="text-[#FFED00] text-2xl font-bold">¥{cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="flex-1 px-4 py-3 bg-[#2a2a2a] text-white rounded-xl hover:bg-[#333] transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleConfirmOrder}
                className="flex-1 px-4 py-3 bg-[#FFED00] text-black rounded-xl font-medium hover:bg-[#FFE500] transition-colors"
              >
                确认下单
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}