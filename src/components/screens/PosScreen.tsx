import React, { useState } from 'react';
import { Product, CartItem } from '../../types';
import { ACTIVE_CLIENT_JUAN, ACTIVE_CLIENT_MARIA } from '../../data/mockData';

interface PosScreenProps {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onOpenCheckout: () => void;
  isMobileOnly?: boolean;
}

export const PosScreen: React.FC<PosScreenProps> = ({
  products,
  cart,
  onAddToCart,
  onUpdateQuantity,
  onRemoveFromCart,
  onOpenCheckout
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeClient, setActiveClient] = useState<'juan' | 'maria' | 'final'>('juan');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [scannedAlert, setScannedAlert] = useState<string | null>(null);

  const categories = ['Todos', 'Suplementos', 'Tés & Infusiones', 'Mieles & Jarabes', 'Cosmética Bio', 'Aceites & Grasas'];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.lotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.barcode.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const rawSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalDiscount = cart.reduce((sum, item) => {
    if (item.product.discountPercent) {
      return sum + (item.product.price * (item.product.discountPercent / 100)) * item.quantity;
    }
    return sum;
  }, 0);
  const subtotalAfterDiscount = Math.max(0, rawSubtotal - totalDiscount);
  const itbis = Math.round(subtotalAfterDiscount * 0.18 * 100) / 100;
  const grandTotal = Math.round((subtotalAfterDiscount + itbis) * 100) / 100;
  const pointsEarned = Math.floor(grandTotal / 10);

  // Simulated barcode scanner
  const handleSimulateScan = () => {
    // Pick a random product
    const randomProd = products[Math.floor(Math.random() * products.length)];
    onAddToCart(randomProd);
    setScannedAlert(`Escaneado: ${randomProd.name} (Lote: ${randomProd.lotNumber})`);
    setTimeout(() => setScannedAlert(null), 2500);
  };

  const clientInfo =
    activeClient === 'juan'
      ? { name: ACTIVE_CLIENT_JUAN.name, tier: ACTIVE_CLIENT_JUAN.clubLevel, points: ACTIVE_CLIENT_JUAN.points, avatar: ACTIVE_CLIENT_JUAN.avatar }
      : activeClient === 'maria'
      ? { name: ACTIVE_CLIENT_MARIA.name, tier: 'Club Oro VIP', points: ACTIVE_CLIENT_MARIA.points, avatar: ACTIVE_CLIENT_MARIA.avatar }
      : { name: 'Consumidor Final (Sin Club)', tier: 'Estándar', points: 0, avatar: '' };

  return (
    <div className="flex flex-col lg:flex-row gap-4 pb-24 lg:pb-6 max-w-7xl mx-auto">
      {/* Left / Catalog Column */}
      <div className="flex-1 space-y-3">
        {/* Scanned Feedback Notification */}
        {scannedAlert && (
          <div className="p-2.5 rounded-xl bg-[#85f8c4] text-[#002114] font-bold text-xs flex items-center justify-between border border-[#006948] animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">barcode_scanner</span>
              <span>{scannedAlert}</span>
            </div>
            <span className="text-[10px] bg-[#006948] text-white px-2 py-0.5 rounded-full">
              +1 añadido
            </span>
          </div>
        )}

        {/* Search Bar & Barcode Scanner Simulator */}
        <div className="bg-white rounded-2xl p-2.5 border border-[#dae2fd] shadow-xs flex items-center gap-2">
          <span className="material-symbols-outlined text-[#6d7a72] text-xl ml-1">search</span>
          <input
            type="text"
            placeholder="Buscar por hierba, suplemento, lote (#M-889)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 text-xs text-[#131b2e] bg-transparent focus:outline-none placeholder:text-slate-400 font-medium"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="p-1 text-slate-400 hover:text-slate-600">
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          )}
          <button
            onClick={handleSimulateScan}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#f5fff7] border border-[#85f8c4] text-[#006948] text-xs font-bold hover:bg-[#85f8c4]/30 transition-all shrink-0"
            title="Escanear Código de Barras (Lector Láser)"
          >
            <span className="material-symbols-outlined text-base">barcode_scanner</span>
            <span className="hidden sm:inline">Escanear</span>
          </button>
        </div>

        {/* Cliente Activo en POS Banner */}
        <div className="bg-[#eaedff] rounded-2xl p-2.5 border border-[#dae2fd] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            {clientInfo.avatar ? (
              <img
                src={clientInfo.avatar}
                alt={clientInfo.name}
                className="w-8 h-8 rounded-full object-cover border border-[#006948]"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-slate-700">
                <span className="material-symbols-outlined text-sm">person</span>
              </div>
            )}
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#131b2e]">{clientInfo.name}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#002114] text-[#85f8c4]">
                  {clientInfo.tier}
                </span>
              </div>
              <p className="text-[10px] text-[#6d7a72]">
                {clientInfo.points > 0
                  ? `${clientInfo.points.toLocaleString()} pts acumulados (Canjeables por RD$ ${clientInfo.points})`
                  : 'Sin acumulación de puntos'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveClient(activeClient === 'juan' ? 'maria' : activeClient === 'maria' ? 'final' : 'juan')}
              className="px-2 py-1 rounded-lg bg-white text-[#006948] border border-[#00855d]/30 text-[11px] font-bold hover:bg-slate-50 transition-colors"
            >
              Cambiar
            </button>
          </div>
        </div>

        {/* Category Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#006948] text-white shadow-xs'
                  : 'bg-white text-[#3d4a42] border border-[#dae2fd] hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2-Column Touch Grid Catalog */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5">
          {filteredProducts.map((prod) => {
            const inCart = cart.find((i) => i.product.id === prod.id);
            return (
              <div
                key={prod.id}
                className="bg-white rounded-2xl p-2.5 border border-[#dae2fd] shadow-xs hover:border-[#006948]/50 transition-all flex flex-col justify-between group relative"
              >
                {/* Urgent Expiration Badge */}
                {prod.isUrgent && (
                  <span className="absolute top-2 left-2 z-10 bg-[#ba1a1a] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shadow-xs flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[10px]">timer</span>
                    Vence en {prod.expirationDate}
                  </span>
                )}

                <div>
                  {/* Image Container */}
                  <div className="w-full h-32 rounded-xl overflow-hidden bg-slate-50 relative mb-2 flex items-center justify-center">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black/60 text-white px-1.5 py-0.5 rounded backdrop-blur-xs">
                      {prod.lotNumber}
                    </span>
                  </div>

                  {/* Product Details */}
                  <span className="text-[10px] text-[#6d7a72] font-semibold uppercase tracking-wider block">
                    {prod.category}
                  </span>
                  <h4 className="font-bold text-xs text-[#131b2e] leading-snug line-clamp-2 mt-0.5">
                    {prod.name}
                  </h4>
                </div>

                {/* Pricing & Add Button */}
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-extrabold text-[#006948]">
                      RD$ {prod.price}
                    </div>
                    {prod.originalPrice && (
                      <span className="text-[10px] text-slate-400 line-through">
                        RD$ {prod.originalPrice}
                      </span>
                    )}
                    <span className="text-[9px] text-slate-500 block">Stock: {prod.stock}</span>
                  </div>

                  {inCart ? (
                    <div className="flex items-center gap-1 bg-[#eaedff] p-0.5 rounded-lg border border-[#dae2fd]">
                      <button
                        onClick={() => onUpdateQuantity(prod.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#006948] hover:bg-white rounded"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold px-1 text-[#131b2e]">{inCart.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(prod.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#006948] hover:bg-white rounded"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => onAddToCart(prod)}
                      className="w-8 h-8 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white flex items-center justify-center shadow-xs transition-transform active:scale-95"
                      title="Añadir a la canasta"
                    >
                      <span className="material-symbols-outlined text-base">add</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right / Cart Panel (Desktop Split View or Mobile Drawer) */}
      <div className="hidden lg:block w-88 shrink-0">
        <div className="sticky top-14 bg-white rounded-2xl border border-[#dae2fd] shadow-md p-4 space-y-3">
          {/* Cart Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006948] text-xl">shopping_bag</span>
              <h3 className="font-extrabold text-sm text-[#131b2e]">Canasta Activa</h3>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#f5fff7] text-[#006948] border border-[#85f8c4]">
              {cartItemCount} {cartItemCount === 1 ? 'artículo' : 'artículos'}
            </span>
          </div>

          {/* Cart Items List */}
          <div className="space-y-2 max-h-72 overflow-y-auto no-scrollbar divide-y divide-slate-100">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <span className="material-symbols-outlined text-4xl mb-1 text-slate-300">
                  remove_shopping_cart
                </span>
                <p className="text-xs">Canasta vacía</p>
                <p className="text-[11px] text-slate-400">Toca un producto o escanea código</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="pt-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-9 h-9 rounded-lg object-contain bg-slate-50 border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#131b2e] truncate">{item.product.name}</p>
                      <p className="text-[10px] text-slate-500">
                        RD$ {item.product.price} c/u • {item.product.lotNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="w-5 h-5 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-white rounded"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="w-5 h-5 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-white rounded"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => onRemoveFromCart(item.product.id)}
                      className="text-slate-400 hover:text-red-600 p-1"
                      title="Eliminar"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Loyalty Points Banner */}
          {cart.length > 0 && (
            <div className="p-2 rounded-xl bg-[#f5fff7] border border-[#85f8c4] flex items-center justify-between text-xs">
              <span className="text-[#006948] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">loyalty</span>
                Puntos a acumular:
              </span>
              <span className="font-extrabold text-[#006948]">+{pointsEarned} pts Club</span>
            </div>
          )}

          {/* Financial Breakdown */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span>RD$ {subtotalAfterDiscount.toFixed(2)}</span>
            </div>
            {totalDiscount > 0 && (
              <div className="flex justify-between text-[#ba1a1a] font-semibold">
                <span>Descuento Lotes:</span>
                <span>-RD$ {totalDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>ITBIS (18%):</span>
              <span>RD$ {itbis.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-[#006948] pt-1 border-t border-slate-200">
              <span>Total a Cobrar:</span>
              <span>RD$ {grandTotal.toLocaleString('es-DO', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={onOpenCheckout}
            disabled={cart.length === 0}
            className="w-full py-3 px-4 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white font-extrabold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">point_of_sale</span>
            <span>Cobrar Venta (RD$ {grandTotal.toLocaleString('es-DO')})</span>
          </button>
        </div>
      </div>

      {/* Mobile Floating Cart Bar */}
      {cart.length > 0 && (
        <div className="lg:hidden fixed bottom-14 left-0 right-0 z-30 px-3 py-2 max-w-md mx-auto">
          <div className="bg-[#131b2e] text-white rounded-2xl p-3 shadow-xl border border-slate-700 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#006948] text-[#85f8c4] font-bold text-[10px] px-2 py-0.5 rounded-full">
                  {cartItemCount} items
                </span>
                <span className="text-xs text-slate-300">Total</span>
              </div>
              <p className="text-base font-extrabold text-[#85f8c4] mt-0.5">
                RD$ {grandTotal.toLocaleString('es-DO', { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="px-2.5 py-2 rounded-xl bg-[#283044] text-slate-200 text-xs font-semibold hover:bg-slate-700"
              >
                Ver Lista
              </button>
              <button
                onClick={onOpenCheckout}
                className="px-4 py-2 rounded-xl bg-[#00855d] text-white text-xs font-bold shadow-sm hover:bg-[#006948] flex items-center gap-1.5"
              >
                <span>Cobrar</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Cart Drawer Overlay */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center lg:hidden">
          <div className="bg-white rounded-t-3xl w-full max-w-md p-4 space-y-3 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-[#131b2e] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006948]">shopping_bag</span>
                Canasta de Compra
              </h3>
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto no-scrollbar">
              {cart.map((item) => (
                <div key={item.product.id} className="py-2.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-10 rounded-lg object-contain bg-slate-50 border border-slate-200"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#131b2e]">{item.product.name}</p>
                      <p className="text-[10px] text-slate-500">RD$ {item.product.price} c/u</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="w-6 h-6 flex items-center justify-center font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="w-6 h-6 flex items-center justify-center font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => onRemoveFromCart(item.product.id)}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span>RD$ {subtotalAfterDiscount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>ITBIS (18%):</span>
                <span>RD$ {itbis.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#006948] pt-1">
                <span>Total:</span>
                <span>RD$ {grandTotal.toLocaleString('es-DO', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartDrawerOpen(false);
                onOpenCheckout();
              }}
              className="w-full py-3 rounded-xl bg-[#006948] text-white font-bold text-xs shadow-md"
            >
              Proceder al Cobro (RD$ {grandTotal.toLocaleString('es-DO')})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
