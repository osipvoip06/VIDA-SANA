import React, { useState } from 'react';
import { CartItem } from '../types';
import { ACTIVE_CLIENT_JUAN } from '../data/mockData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onCompleteSale: (saleData: {
    paymentMethod: string;
    total: number;
    subtotal: number;
    itbis: number;
    discount: number;
    cashReceived: number;
    changeDue: number;
    ncfType: string;
    sendWhatsapp: boolean;
  }) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onCompleteSale
}) => {
  if (!isOpen) return null;

  const rawSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalDiscount = cart.reduce((sum, item) => {
    if (item.product.discountPercent) {
      return (
        sum +
        (item.product.price * (item.product.discountPercent / 100)) *
          item.quantity
      );
    }
    return sum;
  }, 0);

  const subtotalAfterDiscount = Math.max(0, rawSubtotal - totalDiscount);
  // ITBIS (18% inclusive or calculated)
  const itbis = Math.round(subtotalAfterDiscount * 0.18 * 100) / 100;
  const grandTotal = Math.round((subtotalAfterDiscount + itbis) * 100) / 100;

  const [paymentType, setPaymentType] = useState<'efectivo' | 'tarjeta' | 'dividido'>('efectivo');
  const [cashAmount, setCashAmount] = useState<number>(grandTotal >= 1000 ? 2000 : 1000);
  const [cardAmount, setCardAmount] = useState<number>(0);
  const [usePoints, setUsePoints] = useState<boolean>(false);
  const [ncfType, setNcfType] = useState<string>('B02');
  const [rncNumber, setRncNumber] = useState<string>('');
  const [sendWhatsapp, setSendWhatsapp] = useState<boolean>(true);
  const [printTicket, setPrintTicket] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [ticketNumber] = useState<string>(() => `VS-${Math.floor(1000 + Math.random() * 9000)}`);

  const pointsDiscount = usePoints ? Math.min(200, ACTIVE_CLIENT_JUAN.points) : 0;
  const payableAfterPoints = Math.max(0, grandTotal - pointsDiscount);

  // Calculate change
  const totalPaid = (paymentType === 'efectivo' ? cashAmount : paymentType === 'tarjeta' ? payableAfterPoints : cashAmount + cardAmount);
  const changeDue = Math.max(0, totalPaid - payableAfterPoints);

  const handleQuickCash = (amount: number) => {
    setCashAmount(amount);
  };

  const handleFinalize = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onCompleteSale({
        paymentMethod:
          paymentType === 'efectivo'
            ? 'Efectivo'
            : paymentType === 'tarjeta'
            ? 'Tarjeta Verifone'
            : 'Pago Dividido',
        total: payableAfterPoints,
        subtotal: subtotalAfterDiscount,
        itbis,
        discount: totalDiscount + pointsDiscount,
        cashReceived: totalPaid,
        changeDue,
        ncfType,
        sendWhatsapp
      });
      setIsProcessing(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-[#006948] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl">point_of_sale</span>
            <div>
              <h3 className="font-bold text-lg leading-tight">Finalizar Venta & Cobro</h3>
              <p className="text-xs text-[#85f8c4] flex items-center gap-1">
                <span>Ticket #{ticketNumber}</span>
                <span>•</span>
                <span>Caja 01 - Mostrador Principal</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-4 space-y-4 max-h-[82vh] overflow-y-auto no-scrollbar">
          {/* Cliente Activo Banner */}
          <div className="flex items-center justify-between bg-[#f2f3ff] p-2.5 rounded-xl border border-[#dae2fd]">
            <div className="flex items-center gap-2.5">
              <img
                src={ACTIVE_CLIENT_JUAN.avatar}
                alt={ACTIVE_CLIENT_JUAN.name}
                className="w-10 h-10 rounded-full object-cover border border-[#006948]/30"
              />
              <div>
                <p className="font-bold text-xs text-[#131b2e]">{ACTIVE_CLIENT_JUAN.name}</p>
                <p className="text-[11px] text-[#6d7a72] flex items-center gap-1">
                  <span className="text-[#855300] font-semibold">{ACTIVE_CLIENT_JUAN.clubLevel}</span>
                  <span>•</span>
                  <span>{ACTIVE_CLIENT_JUAN.points.toLocaleString()} pts disponibles</span>
                </p>
              </div>
            </div>
            <label className="flex items-center gap-1.5 text-xs text-[#006948] font-semibold cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-[#00855d]/40 shadow-xs">
              <input
                type="checkbox"
                checked={usePoints}
                onChange={(e) => setUsePoints(e.target.checked)}
                className="accent-[#006948] rounded"
              />
              Canjear 200 pts (-RD$200)
            </label>
          </div>

          {/* Breakdown Card */}
          <div className="bg-[#f5fff7] rounded-xl p-3.5 border border-[#85f8c4] text-center">
            <span className="text-xs font-semibold text-[#006948] uppercase tracking-wider">
              Total a Cobrar
            </span>
            <div className="text-3xl font-extrabold text-[#006948] tracking-tight mt-0.5">
              RD$ {payableAfterPoints.toLocaleString('es-DO', { minimumFractionDigits: 2 })}
            </div>
            <div className="flex justify-center items-center gap-4 text-xs text-[#3d4a42] mt-2 pt-2 border-t border-[#85f8c4]/40">
              <div>
                <span className="text-slate-500">Subtotal:</span> RD$ {subtotalAfterDiscount.toFixed(2)}
              </div>
              <div>
                <span className="text-slate-500">ITBIS (18%):</span> RD$ {itbis.toFixed(2)}
              </div>
              {totalDiscount + pointsDiscount > 0 && (
                <div className="text-[#00855d] font-semibold">
                  Ahorro: RD$ -{(totalDiscount + pointsDiscount).toFixed(2)}
                </div>
              )}
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold text-[#131b2e] mb-1.5 uppercase tracking-wide">
              Método de Pago
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setPaymentType('efectivo');
                  setCashAmount(grandTotal >= 1000 ? 2000 : 1000);
                }}
                className={`flex flex-col items-center py-2.5 px-2 rounded-xl border text-xs font-semibold transition-all ${
                  paymentType === 'efectivo'
                    ? 'bg-[#006948] text-white border-[#006948] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="material-symbols-outlined text-lg mb-0.5">payments</span>
                Efectivo
              </button>
              <button
                type="button"
                onClick={() => {
                  setPaymentType('tarjeta');
                  setCashAmount(0);
                  setCardAmount(payableAfterPoints);
                }}
                className={`flex flex-col items-center py-2.5 px-2 rounded-xl border text-xs font-semibold transition-all ${
                  paymentType === 'tarjeta'
                    ? 'bg-[#006948] text-white border-[#006948] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="material-symbols-outlined text-lg mb-0.5">credit_card</span>
                Verifone / Tarjeta
              </button>
              <button
                type="button"
                onClick={() => {
                  setPaymentType('dividido');
                  setCashAmount(Math.floor(payableAfterPoints / 2));
                  setCardAmount(Math.ceil(payableAfterPoints / 2));
                }}
                className={`flex flex-col items-center py-2.5 px-2 rounded-xl border text-xs font-semibold transition-all ${
                  paymentType === 'dividido'
                    ? 'bg-[#006948] text-white border-[#006948] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="material-symbols-outlined text-lg mb-0.5">call_split</span>
                Dividido
              </button>
            </div>
          </div>

          {/* Cash Input & Quick Denominations */}
          {(paymentType === 'efectivo' || paymentType === 'dividido') && (
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">
                  Efectivo Recibido (RD$):
                </label>
                <input
                  type="number"
                  value={cashAmount || ''}
                  onChange={(e) => setCashAmount(Number(e.target.value))}
                  className="w-32 bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-right font-bold text-sm text-[#006948] focus:outline-none focus:border-[#006948]"
                />
              </div>

              {/* Fast Dominican Denominations */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] text-slate-500 font-medium mr-1">Rápido:</span>
                <button
                  type="button"
                  onClick={() => handleQuickCash(payableAfterPoints)}
                  className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-100"
                >
                  Exacto
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickCash(500)}
                  className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-100"
                >
                  $500
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickCash(1000)}
                  className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-100"
                >
                  $1,000
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickCash(2000)}
                  className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-100"
                >
                  $2,000
                </button>
              </div>
            </div>
          )}

          {/* Card Input for Split */}
          {paymentType === 'dividido' && (
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">
                Monto Tarjeta (RD$):
              </label>
              <input
                type="number"
                value={cardAmount || ''}
                onChange={(e) => setCardAmount(Number(e.target.value))}
                className="w-32 bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-right font-bold text-sm text-[#006948] focus:outline-none focus:border-[#006948]"
              />
            </div>
          )}

          {/* Change to Return Display */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#eaedff] border border-[#dae2fd]">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006948] text-xl">change_circle</span>
              <span className="font-bold text-xs text-[#131b2e]">Cambio a Devolver:</span>
            </div>
            <span className={`text-lg font-extrabold ${changeDue > 0 ? 'text-[#00855d]' : 'text-slate-600'}`}>
              RD$ {changeDue.toLocaleString('es-DO', { minimumFractionDigits: 2 })}
            </span>
          </div>

          {/* Comprobante Fiscal DGII */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#131b2e] uppercase tracking-wide">
              Comprobante Fiscal (DGII)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={ncfType}
                onChange={(e) => setNcfType(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#006948]"
              >
                <option value="B02">B02 - Factura Consumidor Final</option>
                <option value="B01">B01 - Crédito Fiscal (RNC)</option>
                <option value="B15">B15 - Gubernamental</option>
                <option value="B14">B14 - Régimen Especial</option>
              </select>

              {ncfType === 'B01' ? (
                <input
                  type="text"
                  placeholder="RNC o Cédula Empresa..."
                  value={rncNumber}
                  onChange={(e) => setRncNumber(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#006948]"
                />
              ) : (
                <div className="flex items-center px-2.5 text-[11px] text-slate-500 bg-slate-100 rounded-lg">
                  NCF Auto: E4100000{Math.floor(100 + Math.random() * 900)}
                </div>
              )}
            </div>
          </div>

          {/* Delivery & WhatsApp Posology Options */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={sendWhatsapp}
                onChange={(e) => setSendWhatsapp(e.target.checked)}
                className="accent-[#006948] rounded w-4 h-4"
              />
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-green-600 text-sm">chat</span>
                <span>Enviar factura y posología botánica por WhatsApp al cliente</span>
              </span>
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={printTicket}
                onChange={(e) => setPrintTicket(e.target.checked)}
                className="accent-[#006948] rounded w-4 h-4"
              />
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-slate-600 text-sm">print</span>
                <span>Imprimir comprobante en impresora térmica 80mm</span>
              </span>
            </label>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors"
          >
            Volver a Editar
          </button>
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleFinalize}
            className="flex-[2] py-2.5 px-4 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isProcessing ? (
              <>
                <span className="material-symbols-outlined text-base animate-spin">sync</span>
                <span>Sincronizando con Sheets...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">cloud_upload</span>
                <span>Cobrar y Guardar en Google Sheets</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
