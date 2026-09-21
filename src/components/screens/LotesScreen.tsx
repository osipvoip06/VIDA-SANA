import React, { useState } from 'react';
import { BatchItem, BatchStatus } from '../../types';

interface LotesScreenProps {
  batches: BatchItem[];
  onApplyPromo: (batchId: string) => void;
  onAddBatch: (batch: BatchItem) => void;
}

export const LotesScreen: React.FC<LotesScreenProps> = ({
  batches,
  onApplyPromo,
  onAddBatch
}) => {
  const [filterStatus, setFilterStatus] = useState<'todos' | BatchStatus>('todos');
  const [searchLote, setSearchLote] = useState('');
  const [showNewBatchModal, setShowNewBatchModal] = useState(false);
  const [newBatchForm, setNewBatchForm] = useState({
    name: '',
    category: 'Suplementos & Algas',
    lotNumber: '',
    expirationDate: '',
    daysRemaining: 180,
    stock: 20,
    cost: 250,
    price: 450,
    provider: 'Laboratorios Verdor',
    location: 'Estante A-1'
  });

  const filteredBatches = batches.filter((b) => {
    const matchesFilter = filterStatus === 'todos' || b.status === filterStatus;
    const matchesSearch =
      b.name.toLowerCase().includes(searchLote.toLowerCase()) ||
      b.lotNumber.toLowerCase().includes(searchLote.toLowerCase()) ||
      b.sku.toLowerCase().includes(searchLote.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const countByStatus = {
    todos: batches.length,
    caducado: batches.filter((b) => b.status === 'caducado').length,
    urgente: batches.filter((b) => b.status === 'urgente').length,
    atencion: batches.filter((b) => b.status === 'atencion').length,
    optimo: batches.filter((b) => b.status === 'optimo').length
  };

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatchForm.name || !newBatchForm.lotNumber) return;

    const newBatch: BatchItem = {
      id: `batch-${Date.now()}`,
      sku: `#${newBatchForm.lotNumber.substring(0, 5)}`,
      barcode: `746${Math.floor(1000000 + Math.random() * 9000000)}`,
      name: newBatchForm.name,
      category: newBatchForm.category,
      lotNumber: newBatchForm.lotNumber,
      expirationDate: newBatchForm.expirationDate || '30 Jun 2025',
      daysRemaining: Number(newBatchForm.daysRemaining),
      status:
        newBatchForm.daysRemaining <= 0
          ? 'caducado'
          : newBatchForm.daysRemaining <= 30
          ? 'urgente'
          : newBatchForm.daysRemaining <= 60
          ? 'atencion'
          : 'optimo',
      stock: Number(newBatchForm.stock),
      minStock: 8,
      cost: Number(newBatchForm.cost),
      price: Number(newBatchForm.price),
      margin: Math.round(((newBatchForm.price - newBatchForm.cost) / newBatchForm.price) * 100 * 10) / 10,
      provider: newBatchForm.provider,
      location: newBatchForm.location,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=60'
    };

    onAddBatch(newBatch);
    setShowNewBatchModal(false);
    setNewBatchForm({
      name: '',
      category: 'Suplementos & Algas',
      lotNumber: '',
      expirationDate: '',
      daysRemaining: 180,
      stock: 20,
      cost: 250,
      price: 450,
      provider: 'Laboratorios Verdor',
      location: 'Estante A-1'
    });
  };

  return (
    <div className="space-y-4 pb-24 max-w-6xl mx-auto">
      {/* Screen Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#dae2fd] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ba1a1a] text-2xl">
              traffic
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-[#131b2e] leading-tight">
              Salud de Lotes & Caducidades
            </h2>
          </div>
          <p className="text-xs text-[#6d7a72] mt-0.5">
            Semáforo botánico en tiempo real sincronizado con Google Sheets (tbl_Inventario_Lotes)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewBatchModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white text-xs font-bold shadow-xs transition-all"
          >
            <span className="material-symbols-outlined text-sm">add_box</span>
            <span>Nuevo Lote</span>
          </button>
        </div>
      </div>

      {/* AI Copilot Suggestion Box */}
      <div className="bg-linear-to-r from-[#f5fff7] via-white to-[#eaedff] p-4 rounded-2xl border border-[#85f8c4] shadow-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-[#006948] text-[#85f8c4] shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-xl">smart_toy</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-[#002114] uppercase tracking-wide">
                Recomendación Inteligente del Copiloto
              </h3>
              <span className="text-[10px] bg-[#85f8c4] text-[#002114] font-bold px-1.5 py-0.2 rounded">
                ALTA PRIORIDAD
              </span>
            </div>
            <p className="text-xs text-[#3d4a42] mt-1 leading-relaxed">
              Detectamos <strong className="text-[#ba1a1a]">16 unidades de Miel Silvestre 350g (Lote L-MIEL-24B)</strong> con caducidad en 14 días. Sugerimos activar <strong className="text-[#006948]">25% de descuento</strong> en el catálogo POS y generar mensaje de difusión para clientes frecuentes.
            </p>
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <button
                onClick={() => onApplyPromo('batch-2')}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white flex items-center gap-1.5 shadow-xs transition-all"
              >
                <span className="material-symbols-outlined text-sm">bolt</span>
                <span>Aplicar 25% Descuento & Sync a Sheets</span>
              </button>
              <button
                onClick={() => alert('Generando plantilla de difusión WhatsApp para clientes del Club...')}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white border border-[#006948]/30 text-[#006948] hover:bg-slate-50 flex items-center gap-1 transition-all"
              >
                <span className="material-symbols-outlined text-sm text-green-600">chat</span>
                <span>Difusión WhatsApp Clientes</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Semáforo Filters & Search Bar */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Semaphore Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => setFilterStatus('todos')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filterStatus === 'todos'
                  ? 'bg-[#131b2e] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Todos ({countByStatus.todos})
            </button>
            <button
              onClick={() => setFilterStatus('caducado')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
                filterStatus === 'caducado'
                  ? 'bg-[#ba1a1a] text-white shadow-xs'
                  : 'bg-white text-[#ba1a1a] border border-[#ffdad6] hover:bg-red-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
              Caducados ({countByStatus.caducado})
            </button>
            <button
              onClick={() => setFilterStatus('urgente')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
                filterStatus === 'urgente'
                  ? 'bg-[#855300] text-white shadow-xs'
                  : 'bg-white text-[#855300] border border-[#ffddb8] hover:bg-orange-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#fea619]"></span>
              &lt;30d Urgentes ({countByStatus.urgente})
            </button>
            <button
              onClick={() => setFilterStatus('atencion')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
                filterStatus === 'atencion'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-amber-800 border border-amber-200 hover:bg-amber-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              30-60d Atención ({countByStatus.atencion})
            </button>
            <button
              onClick={() => setFilterStatus('optimo')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
                filterStatus === 'optimo'
                  ? 'bg-[#006948] text-white shadow-xs'
                  : 'bg-white text-[#006948] border border-[#85f8c4] hover:bg-emerald-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#68dba9]"></span>
              &gt;60d Óptimos ({countByStatus.optimo})
            </button>
          </div>

          {/* Quick Search */}
          <div className="w-full sm:w-64 bg-white rounded-xl p-1.5 border border-slate-200 flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-400 text-sm ml-1">search</span>
            <input
              type="text"
              placeholder="Filtrar por lote o hierba..."
              value={searchLote}
              onChange={(e) => setSearchLote(e.target.value)}
              className="w-full text-xs text-slate-800 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Botanical Batches List / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredBatches.map((batch) => {
          const statusBadge =
            batch.status === 'caducado'
              ? { bg: 'bg-[#ffdad6] text-[#93000a] border-[#ba1a1a]', label: 'CADUCADO' }
              : batch.status === 'urgente'
              ? { bg: 'bg-[#ffddb8] text-[#653e00] border-[#fea619]', label: `${batch.daysRemaining} DÍAS RESTANTES` }
              : batch.status === 'atencion'
              ? { bg: 'bg-amber-50 text-amber-800 border-amber-300', label: `${batch.daysRemaining} DÍAS (ATENCIÓN)` }
              : { bg: 'bg-[#f5fff7] text-[#006948] border-[#85f8c4]', label: `${batch.daysRemaining} DÍAS (ÓPTIMO)` };

          return (
            <div
              key={batch.id}
              className="bg-white rounded-2xl p-4 border border-[#dae2fd] shadow-xs hover:border-[#006948]/50 transition-all space-y-3"
            >
              {/* Top Row: Thumbnail + Title + Status Pill */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={batch.image}
                    alt={batch.name}
                    className="w-12 h-12 rounded-xl object-contain bg-slate-50 border border-slate-200 p-1"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold text-slate-500">
                        {batch.sku}
                      </span>
                      <span className="text-[10px] text-slate-400">•</span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wide">
                        {batch.category}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-[#131b2e] leading-snug">
                      {batch.name}
                    </h4>
                    <p className="text-[11px] text-[#6d7a72] font-mono mt-0.5">
                      Lote: <strong className="text-[#131b2e]">{batch.lotNumber}</strong> • Vence: {batch.expirationDate}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${statusBadge.bg}`}
                >
                  {statusBadge.label}
                </span>
              </div>

              {/* Middle Row: Stock Progress & Financials */}
              <div className="grid grid-cols-3 gap-2 bg-[#f2f3ff] p-2.5 rounded-xl border border-[#dae2fd] text-center">
                <div>
                  <span className="text-[10px] text-slate-500 block">Stock Actual</span>
                  <span className="text-xs font-bold text-[#131b2e]">
                    {batch.stock} uds
                  </span>
                  <span className="text-[9px] text-slate-400 block">Mín: {batch.minStock}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Costo / Venta</span>
                  <span className="text-xs font-bold text-[#131b2e]">
                    RD$ {batch.cost} / ${batch.price}
                  </span>
                  <span className="text-[9px] text-[#006948] font-bold block">
                    Margen {batch.margin}%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Ubicación</span>
                  <span className="text-xs font-bold text-[#131b2e]">
                    {batch.location}
                  </span>
                  <span className="text-[9px] text-slate-400 block truncate">
                    {batch.provider}
                  </span>
                </div>
              </div>

              {/* Active Promo Notice if applied */}
              {batch.isDiscountActive && (
                <div className="p-2 rounded-lg bg-[#f5fff7] border border-[#85f8c4] flex items-center justify-between text-xs text-[#006948]">
                  <span className="font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">local_offer</span>
                    Promo 25% Activa (RD$ {batch.saleOfferPrice || Math.round(batch.price * 0.75)})
                  </span>
                  <span className="text-[10px] bg-[#006948] text-white px-2 py-0.5 rounded-md">
                    En Sheets
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                <button
                  onClick={() => onApplyPromo(batch.id)}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-[11px] font-bold text-slate-700 flex items-center justify-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm text-[#fea619]">
                    percent
                  </span>
                  <span>{batch.isDiscountActive ? 'Quitar Descuento' : 'Descuento Lote'}</span>
                </button>
                <button
                  onClick={() => alert(`Imprimiendo etiqueta térmica con código de barra para lote ${batch.lotNumber}...`)}
                  className="py-1.5 px-2.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-[11px] font-semibold text-slate-700 flex items-center justify-center gap-1 transition-colors"
                  title="Imprimir Etiqueta"
                >
                  <span className="material-symbols-outlined text-sm">print</span>
                  <span className="hidden sm:inline">Etiqueta</span>
                </button>
                <button
                  onClick={() => alert(`Sincronizado lote ${batch.lotNumber} con Google Sheets`)}
                  className="py-1.5 px-2.5 rounded-lg bg-[#f5fff7] border border-[#85f8c4] text-[#006948] hover:bg-[#85f8c4]/30 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                  title="Sincronizar a Sheets"
                >
                  <span className="material-symbols-outlined text-sm">cloud_sync</span>
                  <span className="hidden sm:inline">Sync</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Nuevo Lote */}
      {showNewBatchModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl w-full max-w-md p-4 space-y-3 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-[#131b2e] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006948]">add_box</span>
                Registrar Nuevo Lote Botánico
              </h3>
              <button
                onClick={() => setShowNewBatchModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateBatch} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nombre del Producto</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Maca Negra Andina 100 Cápsulas"
                  value={newBatchForm.name}
                  onChange={(e) => setNewBatchForm({ ...newBatchForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-[#006948]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Número de Lote</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. L-MAC-2025"
                    value={newBatchForm.lotNumber}
                    onChange={(e) => setNewBatchForm({ ...newBatchForm, lotNumber: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-[#006948]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Días para Vencer</label>
                  <input
                    type="number"
                    required
                    value={newBatchForm.daysRemaining}
                    onChange={(e) => setNewBatchForm({ ...newBatchForm, daysRemaining: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-[#006948]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Stock</label>
                  <input
                    type="number"
                    required
                    value={newBatchForm.stock}
                    onChange={(e) => setNewBatchForm({ ...newBatchForm, stock: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-[#006948]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Costo RD$</label>
                  <input
                    type="number"
                    required
                    value={newBatchForm.cost}
                    onChange={(e) => setNewBatchForm({ ...newBatchForm, cost: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-[#006948]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Precio RD$</label>
                  <input
                    type="number"
                    required
                    value={newBatchForm.price}
                    onChange={(e) => setNewBatchForm({ ...newBatchForm, price: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-[#006948]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Proveedor</label>
                  <input
                    type="text"
                    value={newBatchForm.provider}
                    onChange={(e) => setNewBatchForm({ ...newBatchForm, provider: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-[#006948]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Ubicación</label>
                  <input
                    type="text"
                    value={newBatchForm.location}
                    onChange={(e) => setNewBatchForm({ ...newBatchForm, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-[#006948]"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewBatchModal(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white font-bold shadow-xs"
                >
                  Guardar en Sheets
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
