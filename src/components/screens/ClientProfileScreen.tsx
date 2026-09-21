import React, { useState } from 'react';
import { ACTIVE_CLIENT_MARIA } from '../../data/mockData';

interface ClientProfileScreenProps {
  onBackToPos?: () => void;
}

export const ClientProfileScreen: React.FC<ClientProfileScreenProps> = ({ onBackToPos }) => {
  const [client, setClient] = useState(ACTIVE_CLIENT_MARIA);
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [whatsappSent, setWhatsappSent] = useState(false);

  const whatsappMessage = `Hola María Altagracia 🌿 Te extrañamos en Vida Sana Botánica. Como cliente de nuestro Club Oro, tienes un bono especial de RD$ 200 en tu próxima visita o compra de Aceite de Orégano y Té de Tilo. Además, tienes 2,450 puntos acumulados listos para canjear. ¿Deseas que te apartemos tu pedido?`;

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText) return;
    setClient({
      ...client,
      therapistNotes: {
        note: `“${newNoteText}”`,
        specialist: 'Dra. Carmen Peña (Herbolaria)',
        updatedAt: 'Hoy'
      }
    });
    setNewNoteText('');
    setShowNoteModal(false);
  };

  const handleSendWhatsapp = () => {
    setWhatsappSent(true);
    setTimeout(() => {
      setShowWhatsappModal(false);
      setWhatsappSent(false);
    }, 1200);
  };

  return (
    <div className="space-y-4 pb-24 max-w-4xl mx-auto">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-4 border border-[#dae2fd] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={client.avatar}
            alt={client.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-[#006948] shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold text-[#131b2e] leading-tight">
                {client.name}
              </h2>
              <span className="bg-[#ffddb8] text-[#653e00] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#855300]/30">
                CLUB ORO VIP
              </span>
            </div>
            <p className="text-xs text-[#6d7a72] mt-0.5 flex flex-wrap items-center gap-1.5 font-mono">
              <span>Cédula: {client.idCard}</span>
              <span>•</span>
              <span>Tel: {client.phone}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowWhatsappModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all"
          >
            <span className="material-symbols-outlined text-sm">chat</span>
            <span>WhatsApp Directo</span>
          </button>
          {onBackToPos && (
            <button
              onClick={onBackToPos}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#f2f3ff] text-[#006948] border border-[#dae2fd] text-xs font-bold hover:bg-[#eaedff] transition-colors"
            >
              <span className="material-symbols-outlined text-sm">shopping_cart</span>
              <span>Crear Venta</span>
            </button>
          )}
        </div>
      </div>

      {/* Alerta Inteligente IA de Retención */}
      <div className="bg-linear-to-r from-[#ffdad6]/50 via-white to-[#ffdad6]/20 p-4 rounded-2xl border border-[#ffdad6] shadow-xs">
        <div className="flex items-start gap-3">
          <span className="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">notification_important</span>
          </span>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#ba1a1a] uppercase tracking-wide flex items-center gap-1.5">
                Alerta de Retención de Cliente IA
              </h3>
              <span className="text-[10px] font-bold text-[#93000a] bg-[#ffdad6] px-2 py-0.5 rounded-full">
                48 días inactiva
              </span>
            </div>
            <p className="text-xs text-[#3d4a42] mt-1 leading-relaxed">
              María suele reabastecer sus infusiones y suplementos digestivos cada <strong>18 días</strong> y no visita el local desde el <strong>26 de Septiembre</strong> (hace 48 días).
            </p>
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => setShowWhatsappModal(true)}
                className="px-3.5 py-1.5 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
              >
                <span className="material-symbols-outlined text-sm">send</span>
                <span>Enviar Mensaje de Fidelización con Bono RD$ 200</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjeta Digital Club Vida Sana */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#855300] via-[#fea619] to-[#653e00] text-white p-5 shadow-xl">
        {/* Card Background Pattern */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl text-white">spa</span>
              <span className="font-extrabold text-sm tracking-wider uppercase">
                Club Vida Sana VIP
              </span>
            </div>

            <div>
              <p className="text-xs text-white/80 font-medium">Puntos Acumulados</p>
              <div className="text-3xl font-extrabold text-white tracking-tight flex items-baseline gap-2">
                <span>{client.points.toLocaleString()} pts</span>
                <span className="text-xs font-bold text-[#f5fff7] bg-black/20 px-2 py-0.5 rounded-md backdrop-blur-xs">
                  = RD$ {client.pointsEquivalentRD.toLocaleString()} en compras
                </span>
              </div>
            </div>

            <div className="pt-1">
              <div className="flex justify-between text-[11px] font-semibold text-white/90 mb-1">
                <span>Nivel Oro</span>
                <span>{client.nextLevelProgress}% hacia Nivel Platino</span>
              </div>
              <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-white h-2 rounded-full transition-all"
                  style={{ width: `${client.nextLevelProgress}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-white/80 mt-1">
                Faltan {client.pointsToNextLevel} puntos para desbloquear envíos gratis a domicilio.
              </p>
            </div>
          </div>

          {/* QR Code for in-store scanning */}
          <div className="bg-white p-3 rounded-2xl flex flex-col items-center shrink-0 self-center sm:self-auto shadow-md">
            {/* SVG QR Code Simulation */}
            <svg viewBox="0 0 100 100" className="w-24 h-24">
              <rect width="100" height="100" fill="white" />
              {/* Top-left corner */}
              <rect x="10" y="10" width="28" height="28" fill="#131b2e" />
              <rect x="14" y="14" width="20" height="20" fill="white" />
              <rect x="18" y="18" width="12" height="12" fill="#131b2e" />
              {/* Top-right corner */}
              <rect x="62" y="10" width="28" height="28" fill="#131b2e" />
              <rect x="66" y="14" width="20" height="20" fill="white" />
              <rect x="70" y="18" width="12" height="12" fill="#131b2e" />
              {/* Bottom-left corner */}
              <rect x="10" y="62" width="28" height="28" fill="#131b2e" />
              <rect x="14" y="66" width="20" height="20" fill="white" />
              <rect x="18" y="70" width="12" height="12" fill="#131b2e" />
              {/* Random QR pixels */}
              <rect x="42" y="15" width="6" height="6" fill="#131b2e" />
              <rect x="50" y="25" width="6" height="6" fill="#131b2e" />
              <rect x="45" y="45" width="10" height="10" fill="#131b2e" />
              <rect x="62" y="55" width="8" height="8" fill="#131b2e" />
              <rect x="75" y="75" width="10" height="10" fill="#131b2e" />
              <rect x="45" y="70" width="6" height="6" fill="#131b2e" />
            </svg>
            <span className="text-[10px] font-mono font-bold text-slate-800 mt-1">
              {client.idCard}
            </span>
          </div>
        </div>
      </div>

      {/* Botanical Lifestyle Tags */}
      <div className="bg-white rounded-2xl p-4 border border-[#dae2fd] shadow-xs space-y-2">
        <h4 className="font-bold text-xs text-[#131b2e] uppercase tracking-wider">
          Perfil de Salud & Preferencias Botánicas
        </h4>
        <div className="flex flex-wrap gap-2">
          {client.lifestyleTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-xl bg-[#f5fff7] text-[#006948] border border-[#85f8c4] text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Historial de Compras Recientes */}
      <div className="bg-white rounded-2xl p-4 border border-[#dae2fd] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-xs text-[#131b2e] uppercase tracking-wider">
            Historial de Compras Recientes
          </h4>
          <span className="text-xs text-slate-500">2 tickets registrados</span>
        </div>

        <div className="space-y-2.5">
          {client.recentPurchases.map((purchase) => (
            <div
              key={purchase.ticketId}
              className="bg-[#f2f3ff] p-3 rounded-xl border border-[#dae2fd] flex items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-[#131b2e]">
                    {purchase.ticketId}
                  </span>
                  <span className="text-[11px] text-slate-500">• {purchase.date}</span>
                  <span className="text-[10px] bg-white px-2 py-0.2 rounded border border-slate-200 text-slate-600 font-medium">
                    {purchase.paymentType}
                  </span>
                </div>
                <p className="text-xs text-slate-700 mt-1 font-medium">
                  {purchase.itemsSummary}
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className="font-extrabold text-sm text-[#006948]">
                  RD$ {purchase.total.toFixed(2)}
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold block">
                  +{purchase.pointsEarned} pts
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bitácora Terapeuta / Herbolaria */}
      <div className="bg-white rounded-2xl p-4 border border-[#dae2fd] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006948] text-xl">clinical_notes</span>
            <h4 className="font-bold text-xs text-[#131b2e] uppercase tracking-wider">
              Bitácora Terapéutica & Herbolaria
            </h4>
          </div>
          <button
            onClick={() => setShowNoteModal(true)}
            className="text-xs font-bold text-[#006948] hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span>Nueva Nota</span>
          </button>
        </div>

        <div className="bg-[#f5fff7] p-3 rounded-xl border border-[#85f8c4] space-y-1.5">
          <p className="text-xs text-[#3d4a42] italic leading-relaxed">
            {client.therapistNotes.note}
          </p>
          <div className="flex items-center justify-between text-[11px] text-[#6d7a72] pt-1 border-t border-[#85f8c4]/40 font-medium">
            <span>{client.therapistNotes.specialist}</span>
            <span>Actualizado: {client.therapistNotes.updatedAt}</span>
          </div>
        </div>
      </div>

      {/* Modal WhatsApp Preview */}
      {showWhatsappModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl w-full max-w-md p-4 space-y-3 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-[#131b2e] flex items-center gap-2">
                <span className="material-symbols-outlined text-green-600">chat</span>
                Mensaje de Reactivación WhatsApp
              </h3>
              <button
                onClick={() => setShowWhatsappModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-slate-600">
                Destinatario: <strong className="text-slate-900">{client.name}</strong> ({client.phone})
              </p>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-slate-800 leading-relaxed font-sans">
                {whatsappMessage}
              </div>

              <p className="text-[11px] text-slate-500 italic">
                * El bono de RD$ 200 se aplicará automáticamente en su ficha al escanear su código en POS.
              </p>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setShowWhatsappModal(false)}
                className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSendWhatsapp}
                disabled={whatsappSent}
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span className="material-symbols-outlined text-sm">
                  {whatsappSent ? 'check_circle' : 'send'}
                </span>
                <span>{whatsappSent ? '¡Mensaje Enviado!' : 'Enviar por WhatsApp'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Nueva Nota Terapéutica */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl w-full max-w-md p-4 space-y-3 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-[#131b2e]">
                Agregar Nota Herbolaria / Consulta
              </h3>
              <button
                onClick={() => setShowNoteModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddNote} className="space-y-3">
              <textarea
                rows={4}
                required
                placeholder="Escribe la observación sobre suplementación, posología o requerimientos botánicos de María..."
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#006948]"
              ></textarea>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white font-bold text-xs shadow-xs"
                >
                  Guardar en Ficha
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
