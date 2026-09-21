import React from 'react';
import { NavigationScreen } from '../types';
import { ASSETS } from '../data/mockData';

interface DesktopSidebarProps {
  currentScreen: NavigationScreen;
  setCurrentScreen: (screen: NavigationScreen) => void;
  cartCount: number;
  urgentBatchesCount: number;
  isSyncing: boolean;
  onManualSync: () => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  currentScreen,
  setCurrentScreen,
  cartCount,
  urgentBatchesCount,
  isSyncing,
  onManualSync
}) => {
  const menuItems: {
    id: NavigationScreen;
    label: string;
    icon: string;
    shortcut: string;
    badge?: number | string;
    badgeColor?: string;
  }[] = [
    {
      id: 'inicio',
      label: 'Panel Principal',
      icon: 'dashboard',
      shortcut: 'F1'
    },
    {
      id: 'pos',
      label: 'Punto de Venta (POS)',
      icon: 'point_of_sale',
      shortcut: 'F2',
      badge: cartCount > 0 ? cartCount : undefined,
      badgeColor: 'bg-[#ba1a1a] text-white'
    },
    {
      id: 'lotes',
      label: 'Gestión de Lotes & ERP',
      icon: 'inventory_2',
      shortcut: 'F3',
      badge: urgentBatchesCount > 0 ? `${urgentBatchesCount} urgentes` : undefined,
      badgeColor: 'bg-[#ffdad6] text-[#93000a]'
    },
    {
      id: 'clientes',
      label: 'Clientes & Club Salud',
      icon: 'loyalty',
      shortcut: 'F4'
    },
    {
      id: 'iabot',
      label: 'Copiloto IA Botánico',
      icon: 'smart_toy',
      shortcut: 'F8',
      badge: 'IA Live',
      badgeColor: 'bg-[#85f8c4] text-[#002114]'
    },
    {
      id: 'sheets',
      label: 'Google Sheets Hub',
      icon: 'table_view',
      shortcut: 'F9',
      badge: 'Live',
      badgeColor: 'bg-[#f5fff7] text-[#006948] border border-[#85f8c4]'
    }
  ];

  return (
    <aside className="w-64 bg-[#0d1424] text-slate-300 border-r border-[#1e273c] flex flex-col justify-between shrink-0 select-none h-full min-h-[calc(100vh-45px)]">
      {/* Brand & Store Profile */}
      <div>
        <div className="p-4 border-b border-[#1e273c] flex items-center gap-3">
          <img
            src={ASSETS.logo}
            alt="Vida Sana Logo"
            className="w-9 h-9 rounded-xl object-contain bg-white/10 p-1 shadow-xs"
          />
          <div>
            <h1 className="font-bold text-white text-base tracking-tight leading-none">
              VIDA SANA
            </h1>
            <p className="text-[11px] text-[#85f8c4] font-medium mt-1 flex items-center gap-1">
              <span>Bio Botánica & ERP</span>
              <span>•</span>
              <span className="text-slate-400">Sucursal Central</span>
            </p>
          </div>
        </div>

        {/* User Card */}
        <div className="px-4 py-3 mx-3 my-3 rounded-xl bg-[#172033] border border-[#25324c] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={ASSETS.mariaCashier}
              alt="María Altagracia"
              className="w-9 h-9 rounded-full object-cover border border-[#006948]"
            />
            <div>
              <p className="text-xs font-bold text-white leading-tight">María Altagracia</p>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Caja 01 en turno</span>
              </p>
            </div>
          </div>
          <span className="text-[10px] bg-[#002114] text-[#85f8c4] font-semibold px-2 py-0.5 rounded-md border border-[#006948]/50">
            ADMIN
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="px-3 space-y-1 mt-2">
          {menuItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#006948] text-white font-semibold shadow-md shadow-[#006948]/20'
                    : 'text-slate-300 hover:text-white hover:bg-[#1a2337]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`material-symbols-outlined text-lg ${
                      isActive ? 'text-[#85f8c4]' : 'text-slate-400'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                  <kbd className="text-[9px] px-1 py-0.5 rounded bg-black/30 text-slate-400 border border-white/10 font-mono">
                    {item.shortcut}
                  </kbd>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Live Google Sheets Connection Widget */}
      <div className="p-3 border-t border-[#1e273c] bg-[#111a2d]">
        <div className="p-3 rounded-xl bg-[#172033] border border-[#25324c] space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-400 text-base">
                cloud_sync
              </span>
              <span className="text-xs font-bold text-white">Google Drive ERP</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>

          <p className="text-[11px] text-slate-400 leading-tight">
            Archivo: <span className="text-slate-200 font-mono text-[10px]">Vida_Sana_DB_2024</span>
          </p>

          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-[#25324c]">
            <span>14,820 filas sincronizadas</span>
            <span className="text-emerald-400 font-semibold">118ms</span>
          </div>

          <button
            onClick={onManualSync}
            disabled={isSyncing}
            className="w-full py-1.5 px-2.5 rounded-lg bg-[#006948] hover:bg-[#00855d] text-white font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-sm ${isSyncing ? 'animate-spin' : ''}`}>
              sync
            </span>
            <span>{isSyncing ? 'Guardando en Sheets...' : 'Sincronizar Ahora (F9)'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
