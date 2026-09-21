import React, { useState } from 'react';
import { SheetsTransaction, SheetsSyncStats } from '../../types';

interface SheetsSyncScreenProps {
  transactions: SheetsTransaction[];
  syncStats: SheetsSyncStats;
  onManualSync: () => void;
  isSyncing: boolean;
}

export const SheetsSyncScreen: React.FC<SheetsSyncScreenProps> = ({
  transactions,
  syncStats,
  onManualSync,
  isSyncing
}) => {
  const [activeTable, setActiveTable] = useState<'ventas' | 'lotes' | 'clientes' | 'caja'>('ventas');
  const [selectedRow, setSelectedRow] = useState<number | null>(2);

  const tables = [
    { id: 'ventas', name: 'tbl_Ventas', rowsCount: 8932, icon: 'receipt_long' },
    { id: 'lotes', name: 'tbl_Inventario_Lotes', rowsCount: 248, icon: 'inventory' },
    { id: 'clientes', name: 'tbl_Clientes_Club', rowsCount: 1420, icon: 'group' },
    { id: 'caja', name: 'tbl_Caja_Arqueos', rowsCount: 312, icon: 'point_of_sale' }
  ];

  const handleDownloadCsv = () => {
    const csvHeader = 'id_ticket,fecha_hora,id_cliente,metodo_pago,subtotal_rd,itbis_rd,total_rd,cajero,estado_cloud\n';
    const csvRows = transactions
      .map(
        (t) =>
          `${t.ticketId},${t.dateTime},${t.clientId},${t.paymentMethod},${t.subtotal},${t.itbis},${t.total},${t.cashier},${t.cloudStatus}`
      )
      .join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Vida_Sana_Sync_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-4 pb-24 max-w-7xl mx-auto">
      {/* Top Banner: Google Sheets Live Sync Hub */}
      <div className="bg-white rounded-2xl p-4 border border-[#85f8c4] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#006948] text-white flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-2xl">table_chart</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold text-[#131b2e] leading-tight">
                Google Sheets Sync Hub
              </h2>
              <span className="flex items-center gap-1 text-[11px] font-bold text-[#006948] bg-[#f5fff7] px-2.5 py-0.5 rounded-full border border-[#85f8c4]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>ONLINE 100%</span>
              </span>
            </div>
            <p className="text-xs text-[#6d7a72] mt-0.5 flex flex-wrap items-center gap-2">
              <span>Hoja: <strong className="text-slate-900 font-mono">{syncStats.connectedSheet}</strong></span>
              <span>•</span>
              <span className="font-mono text-[11px] text-slate-500">ID: {syncStats.sheetId.substring(0, 20)}...</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadCsv}
            className="px-3 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            <span>Descargar CSV</span>
          </button>
          <button
            onClick={onManualSync}
            disabled={isSyncing}
            className="px-3.5 py-2 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-sm ${isSyncing ? 'animate-spin' : ''}`}>
              sync
            </span>
            <span>{isSyncing ? 'Guardando en Drive...' : 'Sincronizar (F9)'}</span>
          </button>
        </div>
      </div>

      {/* 4 Health Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-3.5 border border-[#dae2fd] shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Filas Totales Sincronizadas</span>
          <div className="text-xl font-extrabold text-[#006948] mt-1">
            {syncStats.totalRows.toLocaleString()} filas
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">
            +{syncStats.todayAddedRows} registradas hoy
          </span>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-[#dae2fd] shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Latencia Promedio</span>
          <div className="text-xl font-extrabold text-[#131b2e] mt-1 flex items-center gap-1.5">
            <span>{syncStats.latencyMs} ms</span>
            <span className="text-xs text-emerald-600 font-bold">Ultra Rápido</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            Tiempo de commit: ~{syncStats.syncTimeAverageSeconds}s
          </span>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-[#dae2fd] shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Consumo de Cuota Google</span>
          <div className="text-xl font-extrabold text-[#855300] mt-1">
            4.2% utilizado
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            {syncStats.apiCallsUsed.toLocaleString()} / {syncStats.apiCallsLimit.toLocaleString()} calls
          </span>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-[#dae2fd] shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Contingencia Offline</span>
          <div className="text-xl font-extrabold text-emerald-700 mt-1 flex items-center gap-1">
            <span>0 pendientes</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            Local IndexedDB sincronizado
          </span>
        </div>
      </div>

      {/* Spreadsheet Tables Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        {tables.map((tbl) => (
          <button
            key={tbl.id}
            onClick={() => setActiveTable(tbl.id as any)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTable === tbl.id
                ? 'bg-[#006948] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span className="material-symbols-outlined text-sm">{tbl.icon}</span>
            <span>{tbl.name}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTable === tbl.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {tbl.rowsCount}
            </span>
          </button>
        ))}
      </div>

      {/* Spreadsheet Formula Bar Simulation */}
      <div className="bg-white rounded-xl border border-slate-200 p-2 flex items-center gap-2 text-xs font-mono text-slate-800 shadow-2xs">
        <span className="font-bold text-slate-400 select-none px-2 border-r border-slate-200">
          fx
        </span>
        <span className="text-emerald-700 select-none">
          =ARRAYFORMULA(IF(ROW(tbl_Ventas!A:A)=1, &quot;ITBIS_18&quot;, ROUND(tbl_Ventas!F:F*0.18, 2)))
        </span>
      </div>

      {/* Live Spreadsheet Table Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-slate-600 font-mono text-[11px]">
                <th className="py-2 px-3 w-10 text-center border-r border-slate-300 select-none bg-slate-200 font-bold">
                  #
                </th>
                <th className="py-2 px-3 border-r border-slate-200">id_ticket</th>
                <th className="py-2 px-3 border-r border-slate-200">fecha_hora</th>
                <th className="py-2 px-3 border-r border-slate-200">id_cliente</th>
                <th className="py-2 px-3 border-r border-slate-200">metodo_pago</th>
                <th className="py-2 px-3 border-r border-slate-200 text-right">subtotal_rd</th>
                <th className="py-2 px-3 border-r border-slate-200 text-right">itbis_rd</th>
                <th className="py-2 px-3 border-r border-slate-200 text-right font-bold text-[#006948]">
                  total_rd
                </th>
                <th className="py-2 px-3 border-r border-slate-200">cajero</th>
                <th className="py-2 px-3 text-center">estado_cloud</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-xs">
              {transactions.map((tx) => {
                const isSelected = selectedRow === tx.rowId;
                return (
                  <tr
                    key={tx.rowId}
                    onClick={() => setSelectedRow(tx.rowId)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-emerald-50/70 font-semibold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-2.5 px-3 text-center border-r border-slate-200 bg-slate-100/50 text-slate-500 font-mono text-[10px] select-none">
                      {tx.rowId}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-100 text-[#006948] font-bold">
                      {tx.ticketId}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-100 text-slate-600 text-[11px]">
                      {tx.dateTime}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-100 text-slate-800">
                      <div className="flex items-center gap-1">
                        <span>{tx.clientId}</span>
                        {tx.clientTier && (
                          <span className="text-[9px] bg-amber-100 text-amber-800 px-1 rounded font-sans">
                            {tx.clientTier}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-100 text-slate-700 font-sans">
                      {tx.paymentMethod}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-100 text-right text-slate-700">
                      RD$ {tx.subtotal.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-100 text-right text-slate-500">
                      RD$ {tx.itbis.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-100 text-right text-[#006948] font-bold">
                      RD$ {tx.total.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-100 text-slate-700 font-sans">
                      {tx.cashier}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#f5fff7] text-[#006948] border border-[#85f8c4] px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {tx.cloudStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Spreadsheet Footer status */}
        <div className="bg-slate-50 p-2.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span>Mostrando {transactions.length} filas más recientes</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <span className="material-symbols-outlined text-sm">lock</span>
              Cifrado SSL 256-bit
            </span>
          </div>
          <div className="font-mono text-[11px] text-slate-600">
            Último Commit: {syncStats.lastSyncTime}
          </div>
        </div>
      </div>
    </div>
  );
};
