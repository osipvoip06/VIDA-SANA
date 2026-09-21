import { useState, useEffect } from 'react';
import {
  NavigationScreen,
  ViewDeviceMode,
  Product,
  BatchItem,
  CartItem,
  SheetsTransaction,
  SheetsSyncStats
} from './types';
import {
  INITIAL_PRODUCTS,
  INITIAL_BATCHES,
  INITIAL_TRANSACTIONS,
  INITIAL_SYNC_STATS
} from './data/mockData';
import { TopDeviceBar } from './components/TopDeviceBar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { DesktopSidebar } from './components/DesktopSidebar';
import { CheckoutModal } from './components/CheckoutModal';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { PosScreen } from './components/screens/PosScreen';
import { LotesScreen } from './components/screens/LotesScreen';
import { ClientProfileScreen } from './components/screens/ClientProfileScreen';
import { IaBotScreen } from './components/screens/IaBotScreen';
import { SheetsSyncScreen } from './components/screens/SheetsSyncScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<NavigationScreen>('inicio');
  const [deviceMode, setDeviceMode] = useState<ViewDeviceMode>('desktop');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [batches, setBatches] = useState<BatchItem[]>(INITIAL_BATCHES);
  const [cart, setCart] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 2, discount: 0 },
    { product: INITIAL_PRODUCTS[1], quantity: 1, discount: 0 }
  ]);
  const [transactions, setTransactions] = useState<SheetsTransaction[]>(INITIAL_TRANSACTIONS);
  const [syncStats, setSyncStats] = useState<SheetsSyncStats>(INITIAL_SYNC_STATS);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isPromoApplied, setIsPromoApplied] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Global Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Keyboard shortcut handler for cashier POS speed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F1') {
        e.preventDefault();
        setCurrentScreen('inicio');
      } else if (e.key === 'F2') {
        e.preventDefault();
        setCurrentScreen('pos');
      } else if (e.key === 'F3') {
        e.preventDefault();
        setCurrentScreen('lotes');
      } else if (e.key === 'F4') {
        e.preventDefault();
        setCurrentScreen('clientes');
      } else if (e.key === 'F8') {
        e.preventDefault();
        setCurrentScreen('iabot');
      } else if (e.key === 'F9') {
        e.preventDefault();
        handleManualSync();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1, discount: 0 }];
    });
    showToast(`+1 ${product.name} añadido a la canasta`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // 1-Click promo application
  const handleApplyPromo = (batchId: string) => {
    setBatches((prev) =>
      prev.map((b) => {
        if (b.id === batchId) {
          const newStatus = !b.isDiscountActive;
          return {
            ...b,
            isDiscountActive: newStatus,
            saleOfferPrice: newStatus ? Math.round(b.price * 0.75) : undefined
          };
        }
        return b;
      })
    );

    // Also update product discount in POS
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === 'prod-5') {
          return {
            ...p,
            discountPercent: 25,
            price: 285,
            originalPrice: 380,
            isUrgent: true
          };
        }
        return p;
      })
    );

    setIsPromoApplied(true);
    showToast('Promo de 25% activada en POS y sincronizada con Google Sheets');
  };

  // Manual Google Sheets sync simulation
  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStats((prev) => ({
        ...prev,
        lastSyncTime: 'Hace un momento',
        latencyMs: Math.floor(95 + Math.random() * 35)
      }));
      showToast('Sincronización bidireccional con Google Drive completada (0.6s)');
    }, 1100);
  };

  // Complete Sale and write row to Google Sheets
  const handleCompleteSale = (saleData: {
    paymentMethod: string;
    total: number;
    subtotal: number;
    itbis: number;
    discount: number;
    cashReceived: number;
    changeDue: number;
    ncfType: string;
    sendWhatsapp: boolean;
  }) => {
    const nextRow = transactions.length + 2;
    const newTx: SheetsTransaction = {
      rowId: nextRow,
      ticketId: `VS-${Math.floor(8933 + Math.random() * 100)}`,
      dateTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
      clientId: 'Juan Bautista Pérez',
      clientTier: 'Gold',
      paymentMethod: saleData.paymentMethod,
      subtotal: saleData.subtotal,
      itbis: saleData.itbis,
      total: saleData.total,
      cashier: 'María Altagracia',
      cloudStatus: 'DRIVE SYNCED'
    };

    setTransactions([newTx, ...transactions]);
    setCart([]);
    setSyncStats((prev) => ({
      ...prev,
      totalRows: prev.totalRows + 1,
      todayAddedRows: prev.todayAddedRows + 1,
      lastSyncTime: 'Hace 1 segundo'
    }));

    showToast(
      `¡Venta ${newTx.ticketId} por RD$ ${saleData.total.toFixed(2)} guardada y sincronizada en Google Sheets!`
    );
  };

  const handleAddBatch = (newBatch: BatchItem) => {
    setBatches([newBatch, ...batches]);
    showToast(`Lote ${newBatch.lotNumber} registrado en tbl_Inventario_Lotes`);
  };

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const urgentBatchesCount = batches.filter(
    (b) => b.status === 'urgente' || b.status === 'caducado'
  ).length;

  return (
    <div className="min-h-screen bg-[#faf8ff] flex flex-col font-sans text-[#131b2e] selection:bg-[#85f8c4] selection:text-[#002114]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-60 bg-[#002114] text-[#85f8c4] border border-[#006948] px-4 py-2 rounded-xl shadow-xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="material-symbols-outlined text-sm text-[#68dba9]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Device & Sync Simulator Bar */}
      <TopDeviceBar
        deviceMode={deviceMode}
        setDeviceMode={setDeviceMode}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        isSyncing={isSyncing}
        onManualSync={handleManualSync}
        cartCount={cartTotalItems}
      />

      {/* Main Layout container */}
      <div className="flex-1 flex w-full">
        {/* Desktop Sidebar (Only visible in Desktop / Tablet mode) */}
        {deviceMode === 'desktop' && (
          <div className="hidden lg:block">
            <DesktopSidebar
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
              cartCount={cartTotalItems}
              urgentBatchesCount={urgentBatchesCount}
              isSyncing={isSyncing}
              onManualSync={handleManualSync}
            />
          </div>
        )}

        {/* Content View Container */}
        <main
          className={`flex-1 overflow-x-hidden p-3 sm:p-5 ${
            deviceMode === 'mobile'
              ? 'max-w-md mx-auto min-h-screen bg-white sm:rounded-3xl sm:my-4 sm:border sm:border-slate-300 sm:shadow-2xl'
              : deviceMode === 'tablet'
              ? 'max-w-4xl mx-auto'
              : 'w-full'
          }`}
        >
          {/* Mobile phone bezel top bar when simulator is set to mobile */}
          {deviceMode === 'mobile' && (
            <div className="hidden sm:flex items-center justify-between pb-3 pt-1 border-b border-slate-100 text-[11px] font-mono text-slate-400">
              <span className="font-bold text-slate-700">9:41</span>
              <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto"></div>
              <div className="flex items-center gap-1 text-slate-700">
                <span className="material-symbols-outlined text-xs">signal_cellular_4_bar</span>
                <span className="material-symbols-outlined text-xs">wifi</span>
                <span className="material-symbols-outlined text-xs">battery_full</span>
              </div>
            </div>
          )}

          {/* Screen Routing */}
          {currentScreen === 'inicio' && (
            <DashboardScreen
              onNavigate={setCurrentScreen}
              products={products}
              batches={batches}
              onApplyQuickPromo={handleApplyPromo}
              isPromoApplied={isPromoApplied}
            />
          )}

          {currentScreen === 'pos' && (
            <PosScreen
              products={products}
              cart={cart}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveFromCart={handleRemoveFromCart}
              onOpenCheckout={() => setIsCheckoutOpen(true)}
              isMobileOnly={deviceMode === 'mobile'}
            />
          )}

          {currentScreen === 'lotes' && (
            <LotesScreen
              batches={batches}
              onApplyPromo={handleApplyPromo}
              onAddBatch={handleAddBatch}
            />
          )}

          {currentScreen === 'clientes' && (
            <ClientProfileScreen onBackToPos={() => setCurrentScreen('pos')} />
          )}

          {currentScreen === 'iabot' && <IaBotScreen />}

          {currentScreen === 'sheets' && (
            <SheetsSyncScreen
              transactions={transactions}
              syncStats={syncStats}
              onManualSync={handleManualSync}
              isSyncing={isSyncing}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      {deviceMode === 'mobile' ? (
        <MobileBottomNav
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          cartCount={cartTotalItems}
          urgentBatchesCount={urgentBatchesCount}
        />
      ) : (
        <div className="lg:hidden">
          <MobileBottomNav
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
            cartCount={cartTotalItems}
            urgentBatchesCount={urgentBatchesCount}
          />
        </div>
      )}

      {/* Interactive Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onCompleteSale={handleCompleteSale}
      />
    </div>
  );
}
