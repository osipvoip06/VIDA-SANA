import React from 'react';
import { NavigationScreen, Product, BatchItem } from '../../types';
import { ASSETS } from '../../data/mockData';

interface DashboardScreenProps {
  onNavigate: (screen: NavigationScreen) => void;
  products: Product[];
  batches: BatchItem[];
  onApplyQuickPromo: (batchId: string) => void;
  isPromoApplied: boolean;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
  batches,
  onApplyQuickPromo,
  isPromoApplied
}) => {
  const urgentBatches = batches.filter((b) => b.status === 'urgente' || b.status === 'caducado');

  return (
    <div className="space-y-4 pb-20 max-w-5xl mx-auto">
      {/* Mobile / Screen Top Header */}
      <div className="bg-white rounded-2xl p-4 border border-[#dae2fd] shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={ASSETS.logo}
            alt="Vida Sana"
            className="w-12 h-12 rounded-2xl object-contain bg-[#f5fff7] p-1 border border-[#85f8c4]"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-base sm:text-lg text-[#131b2e] leading-tight">
                Vida Sana Botánica
              </h2>
              <span className="bg-[#85f8c4] text-[#002114] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#006948]/20">
                TURNO ACTIVO
              </span>
            </div>
            <p className="text-xs text-[#6d7a72] mt-0.5 flex items-center gap-1.5">
              <span>Cajera: María Altagracia</span>
              <span>•</span>
              <span className="text-[#006948] font-medium flex items-center gap-0.5">
                <span className="material-symbols-outlined text-xs">cloud_done</span>
                Sheets Conectado
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('iabot')}
            className="p-2 rounded-xl bg-[#eaedff] hover:bg-[#dae2fd] text-[#006948] transition-colors relative"
            title="Copiloto IA"
          >
            <span className="material-symbols-outlined text-xl">smart_toy</span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#fea619] rounded-full"></span>
          </button>
          <button
            onClick={() => onNavigate('pos')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white text-xs font-bold shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-sm">point_of_sale</span>
            <span>Nueva Venta</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1: Ventas Hoy */}
        <div className="bg-white rounded-2xl p-3.5 border border-[#dae2fd] shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6d7a72]">Ventas del Día</span>
            <span className="p-1.5 rounded-lg bg-[#f5fff7] text-[#006948]">
              <span className="material-symbols-outlined text-base">payments</span>
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#006948] mt-1 tracking-tight">
            RD$ 42,850
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span>+14.2% vs ayer</span>
          </div>
        </div>

        {/* Card 2: Lotes en Riesgo */}
        <div
          onClick={() => onNavigate('lotes')}
          className="bg-white rounded-2xl p-3.5 border border-[#ffdad6] shadow-xs cursor-pointer hover:border-red-300 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6d7a72]">Lotes &lt; 30d</span>
            <span className="p-1.5 rounded-lg bg-[#ffdad6] text-[#93000a]">
              <span className="material-symbols-outlined text-base">hourglass_bottom</span>
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#ba1a1a] mt-1 tracking-tight">
            {urgentBatches.length} Lotes
          </div>
          <div className="text-[11px] text-[#93000a] font-semibold mt-1 flex items-center gap-1">
            <span>Requieren acción IA</span>
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </div>
        </div>

        {/* Card 3: Clientes en Riesgo */}
        <div
          onClick={() => onNavigate('clientes')}
          className="bg-white rounded-2xl p-3.5 border border-[#dae2fd] shadow-xs cursor-pointer hover:border-[#00855d]/40 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6d7a72]">Fidelización Club</span>
            <span className="p-1.5 rounded-lg bg-[#ffddb8] text-[#653e00]">
              <span className="material-symbols-outlined text-base">loyalty</span>
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#855300] mt-1 tracking-tight">
            8 Clientes
          </div>
          <div className="text-[11px] text-[#855300] font-medium mt-1">
            45+ días sin visita
          </div>
        </div>

        {/* Card 4: Google Sheets Sync */}
        <div
          onClick={() => onNavigate('sheets')}
          className="bg-white rounded-2xl p-3.5 border border-[#85f8c4] shadow-xs cursor-pointer hover:border-[#006948] transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6d7a72]">Google Sheets</span>
            <span className="p-1.5 rounded-lg bg-[#f5fff7] text-[#006948]">
              <span className="material-symbols-outlined text-base">cloud_sync</span>
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#006948] mt-1 tracking-tight flex items-center gap-1.5">
            <span>100%</span>
            <span className="text-xs font-normal text-[#6d7a72]">Online</span>
          </div>
          <div className="text-[11px] text-[#006948] font-semibold mt-1">
            14,820 filas sincronizadas
          </div>
        </div>
      </div>

      {/* Accesos Rápidos Tácticos */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          onClick={() => onNavigate('pos')}
          className="flex items-center justify-between p-3 rounded-xl bg-[#006948] text-white hover:bg-[#00855d] transition-all shadow-xs text-left group"
        >
          <div>
            <span className="material-symbols-outlined text-xl mb-1 block">point_of_sale</span>
            <p className="font-bold text-xs">Abrir POS</p>
            <p className="text-[10px] text-[#85f8c4]">Mostrador & Táctil</p>
          </div>
          <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>

        <button
          onClick={() => onNavigate('lotes')}
          className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#dae2fd] hover:border-[#006948] transition-all shadow-xs text-left group"
        >
          <div>
            <span className="material-symbols-outlined text-xl mb-1 block text-[#ba1a1a]">
              traffic
            </span>
            <p className="font-bold text-xs text-[#131b2e]">Semáforo Lotes</p>
            <p className="text-[10px] text-slate-500">Control caducidad</p>
          </div>
          <span className="material-symbols-outlined text-base text-slate-400 group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>

        <button
          onClick={() => onNavigate('clientes')}
          className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#dae2fd] hover:border-[#006948] transition-all shadow-xs text-left group"
        >
          <div>
            <span className="material-symbols-outlined text-xl mb-1 block text-[#855300]">
              person_search
            </span>
            <p className="font-bold text-xs text-[#131b2e]">Club & CRM</p>
            <p className="text-[10px] text-slate-500">María Altagracia</p>
          </div>
          <span className="material-symbols-outlined text-base text-slate-400 group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>

        <button
          onClick={() => onNavigate('sheets')}
          className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#85f8c4] hover:border-[#006948] transition-all shadow-xs text-left group"
        >
          <div>
            <span className="material-symbols-outlined text-xl mb-1 block text-[#006948]">
              table_chart
            </span>
            <p className="font-bold text-xs text-[#131b2e]">Sheets Hub</p>
            <p className="text-[10px] text-[#006948]">Visor en vivo</p>
          </div>
          <span className="material-symbols-outlined text-base text-slate-400 group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
      </div>

      {/* Centro de Inteligencia & Sugerencias del Copiloto */}
      <div className="bg-linear-to-r from-[#f5fff7] to-[#eaedff] rounded-2xl p-4 border border-[#85f8c4] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#006948] text-white">
              <span className="material-symbols-outlined text-base">psychology</span>
            </span>
            <div>
              <h3 className="font-bold text-sm text-[#002114]">
                Centro de Inteligencia Copiloto IA
              </h3>
              <p className="text-[11px] text-[#005137]">
                2 recomendaciones automáticas para optimizar rentabilidad hoy
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('iabot')}
            className="text-xs font-bold text-[#006948] hover:underline flex items-center gap-0.5"
          >
            <span>Abrir Chat</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {/* Alerta 1: Promo Lote */}
          <div className="bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-[#dae2fd] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <div className="flex items-start gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-lg">warning</span>
              </span>
              <div>
                <p className="text-xs font-bold text-[#131b2e]">
                  Lote por vencer: Miel Silvestre 350g (16 unidades en 14 días)
                </p>
                <p className="text-[11px] text-[#3d4a42] mt-0.5">
                  Recomendamos activar 25% de descuento en POS y sincronizar oferta a Google Sheets para evitar merma de RD$ 4,560.
                </p>
              </div>
            </div>
            <button
              onClick={() => onApplyQuickPromo('batch-2')}
              className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                isPromoApplied
                  ? 'bg-[#002114] text-[#85f8c4] border border-[#006948]'
                  : 'bg-[#006948] hover:bg-[#00855d] text-white shadow-xs'
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {isPromoApplied ? 'check_circle' : 'bolt'}
              </span>
              <span>{isPromoApplied ? 'Promo Activa en Sheets' : 'Aplicar Promo 1-Clic'}</span>
            </button>
          </div>

          {/* Alerta 2: Reactivación Cliente */}
          <div className="bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-[#dae2fd] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <div className="flex items-start gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#ffddb8] text-[#855300] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-lg">ring_volume</span>
              </span>
              <div>
                <p className="text-xs font-bold text-[#131b2e]">
                  Riesgo de Deserción: María Altagracia (Club Oro - 2,450 pts)
                </p>
                <p className="text-[11px] text-[#3d4a42] mt-0.5">
                  Lleva 48 días inactiva. Su ciclo habitual es de 18 días para reposición de Aceite de Orégano.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('clientes')}
              className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg bg-[#00855d] hover:bg-[#006948] text-white transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              <span>Reactivar por WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Categorías y Top Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Distribución de Ventas */}
        <div className="bg-white rounded-2xl p-4 border border-[#dae2fd] shadow-xs">
          <h4 className="font-bold text-xs text-[#131b2e] uppercase tracking-wider mb-3">
            Ventas por Categoría (Hoy)
          </h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Suplementos & Vitaminas</span>
                <span className="text-[#006948]">RD$ 19,280 (45%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-[#006948] h-2 rounded-full w-[45%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Tés & Tinturas Herbolarias</span>
                <span className="text-[#00855d]">RD$ 11,990 (28%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-[#00855d] h-2 rounded-full w-[28%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Mieles & Cosmética Botánica</span>
                <span className="text-[#fea619]">RD$ 11,580 (27%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-[#fea619] h-2 rounded-full w-[27%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Productos Más Vendidos */}
        <div className="bg-white rounded-2xl p-4 border border-[#dae2fd] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-xs text-[#131b2e] uppercase tracking-wider">
              Más Vendidos en Turno
            </h4>
            <span className="text-[11px] text-slate-500">Actualizado hace 2m</span>
          </div>

          <div className="divide-y divide-slate-100">
            <div className="py-2 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={ASSETS.coconutOil}
                  alt="Aceite de Coco"
                  className="w-9 h-9 rounded-lg object-cover border border-slate-200"
                />
                <div>
                  <p className="font-bold text-xs text-[#131b2e]">Aceite de Coco Extra V. 500ml</p>
                  <p className="text-[10px] text-slate-500">18 unidades • Lote L-2024-A</p>
                </div>
              </div>
              <span className="font-extrabold text-xs text-[#006948]">RD$ 8,100</span>
            </div>

            <div className="py-2 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={ASSETS.spirulinaTablets}
                  alt="Spirulina"
                  className="w-9 h-9 rounded-lg object-cover border border-slate-200"
                />
                <div>
                  <p className="font-bold text-xs text-[#131b2e]">Spirulina 500mg en Tabletas</p>
                  <p className="text-[10px] text-slate-500">8 unidades • Lote S-118</p>
                </div>
              </div>
              <span className="font-extrabold text-xs text-[#006948]">RD$ 7,120</span>
            </div>

            <div className="py-2 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={ASSETS.wildHoney}
                  alt="Miel Silvestre"
                  className="w-9 h-9 rounded-lg object-cover border border-slate-200"
                />
                <div>
                  <p className="font-bold text-xs text-[#131b2e]">Miel Silvestre con Jengibre</p>
                  <p className="text-[10px] text-slate-500">14 unidades • Lote V-402</p>
                </div>
              </div>
              <span className="font-extrabold text-xs text-[#006948]">RD$ 5,320</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
