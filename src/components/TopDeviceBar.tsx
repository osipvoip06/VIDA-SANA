import React from 'react';
import { ViewDeviceMode, NavigationScreen } from '../types';

interface TopDeviceBarProps {
  deviceMode: ViewDeviceMode;
  setDeviceMode: (mode: ViewDeviceMode) => void;
  currentScreen: NavigationScreen;
  setCurrentScreen: (screen: NavigationScreen) => void;
  isSyncing: boolean;
  onManualSync: () => void;
  cartCount: number;
}

export const TopDeviceBar: React.FC<TopDeviceBarProps> = ({
  deviceMode,
  setDeviceMode,
  currentScreen,
  setCurrentScreen,
  isSyncing,
  onManualSync,
  cartCount
}) => {
  return (
    <header className="bg-[#131b2e] text-white border-b border-[#283044] px-3 py-2 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: App Brand & Google Sheets Live Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#68dba9] animate-pulse"></span>
            <span className="font-bold text-sm tracking-tight text-[#f5fff7] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#85f8c4] text-lg">spa</span>
              VIDA SANA
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#002114] text-[#85f8c4] border border-[#006948] text-xs font-medium">
            <span className="material-symbols-outlined text-xs">cloud_done</span>
            <span>Google Sheets Live: 118ms</span>
          </div>
        </div>

        {/* Center: Device Simulator Mode Toggles */}
        <div className="flex items-center bg-[#1e273c] p-0.5 rounded-lg border border-[#334155] text-xs">
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
              deviceMode === 'mobile'
                ? 'bg-[#00855d] text-white font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Vista Móvil POS (390px)"
          >
            <span className="material-symbols-outlined text-sm">phone_iphone</span>
            <span className="hidden md:inline">Móvil POS</span>
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
              deviceMode === 'tablet'
                ? 'bg-[#00855d] text-white font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Vista Mostrador / Tablet (768px)"
          >
            <span className="material-symbols-outlined text-sm">tablet_mac</span>
            <span className="hidden md:inline">Mostrador</span>
          </button>
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
              deviceMode === 'desktop'
                ? 'bg-[#00855d] text-white font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Vista Escritorio / ERP Completo (1440px)"
          >
            <span className="material-symbols-outlined text-sm">desktop_windows</span>
            <span className="hidden md:inline">Escritorio ERP</span>
          </button>
        </div>

        {/* Right: Quick Screen Jump & Manual Sync */}
        <div className="flex items-center gap-2">
          {/* Quick Hub Jump */}
          <button
            onClick={() => setCurrentScreen('sheets')}
            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-md border transition-all ${
              currentScreen === 'sheets'
                ? 'bg-[#00855d] text-white border-[#00855d]'
                : 'bg-[#1e273c] text-emerald-400 border-emerald-900/60 hover:bg-[#25324c]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">table_view</span>
            <span className="hidden sm:inline font-medium">Sheets Hub</span>
          </button>

          {/* Manual Sync Trigger */}
          <button
            onClick={onManualSync}
            disabled={isSyncing}
            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-[#006948] hover:bg-[#00855d] text-white font-medium transition-all disabled:opacity-50"
            title="Forzar Sincronización Manual con Google Drive"
          >
            <span className={`material-symbols-outlined text-sm ${isSyncing ? 'animate-spin' : ''}`}>
              sync
            </span>
            <span className="hidden lg:inline">{isSyncing ? 'Sincronizando...' : 'Sync (F9)'}</span>
          </button>

          {/* Quick Cart Shortcut */}
          <button
            onClick={() => setCurrentScreen('pos')}
            className="relative p-1.5 rounded-md text-slate-200 hover:text-white hover:bg-[#1e273c] transition-colors"
            title="Ir al Carrito"
          >
            <span className="material-symbols-outlined text-lg">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ba1a1a] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
