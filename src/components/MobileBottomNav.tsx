import React from 'react';
import { NavigationScreen } from '../types';

interface MobileBottomNavProps {
  currentScreen: NavigationScreen;
  setCurrentScreen: (screen: NavigationScreen) => void;
  cartCount: number;
  urgentBatchesCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentScreen,
  setCurrentScreen,
  cartCount,
  urgentBatchesCount
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#dae2fd] shadow-lg max-w-md mx-auto">
      <div className="flex items-center justify-around py-2 px-1">
        {/* Tab 1: Inicio */}
        <button
          onClick={() => setCurrentScreen('inicio')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            currentScreen === 'inicio'
              ? 'text-[#006948] font-bold'
              : 'text-[#6d7a72] hover:text-[#131b2e]'
          }`}
        >
          <div className="relative">
            <span
              className={`material-symbols-outlined text-2xl transition-transform ${
                currentScreen === 'inicio' ? 'scale-110' : ''
              }`}
            >
              dashboard
            </span>
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Inicio</span>
        </button>

        {/* Tab 2: POS */}
        <button
          onClick={() => setCurrentScreen('pos')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            currentScreen === 'pos'
              ? 'text-[#006948] font-bold'
              : 'text-[#6d7a72] hover:text-[#131b2e]'
          }`}
        >
          <div className="relative">
            <span
              className={`material-symbols-outlined text-2xl transition-transform ${
                currentScreen === 'pos' ? 'scale-110' : ''
              }`}
            >
              point_of_sale
            </span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#ba1a1a] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">POS</span>
        </button>

        {/* Tab 3: Lotes */}
        <button
          onClick={() => setCurrentScreen('lotes')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            currentScreen === 'lotes'
              ? 'text-[#006948] font-bold'
              : 'text-[#6d7a72] hover:text-[#131b2e]'
          }`}
        >
          <div className="relative">
            <span
              className={`material-symbols-outlined text-2xl transition-transform ${
                currentScreen === 'lotes' ? 'scale-110' : ''
              }`}
            >
              inventory_2
            </span>
            {urgentBatchesCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 bg-[#fea619] border-2 border-white rounded-full"></span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Lotes</span>
        </button>

        {/* Tab 4: Clientes */}
        <button
          onClick={() => setCurrentScreen('clientes')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            currentScreen === 'clientes'
              ? 'text-[#006948] font-bold'
              : 'text-[#6d7a72] hover:text-[#131b2e]'
          }`}
        >
          <div className="relative">
            <span
              className={`material-symbols-outlined text-2xl transition-transform ${
                currentScreen === 'clientes' ? 'scale-110' : ''
              }`}
            >
              loyalty
            </span>
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Clientes</span>
        </button>

        {/* Tab 5: IA Bot */}
        <button
          onClick={() => setCurrentScreen('iabot')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            currentScreen === 'iabot'
              ? 'text-[#006948] font-bold'
              : 'text-[#6d7a72] hover:text-[#131b2e]'
          }`}
        >
          <div className="relative">
            <span
              className={`material-symbols-outlined text-2xl transition-transform ${
                currentScreen === 'iabot' ? 'scale-110 text-[#00855d]' : ''
              }`}
            >
              smart_toy
            </span>
            <span className="absolute -top-0.5 -right-1 text-[#fea619] text-xs">✨</span>
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">IA Bot</span>
        </button>
      </div>
    </nav>
  );
};
