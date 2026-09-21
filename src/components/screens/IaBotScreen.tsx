import React, { useState } from 'react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  cardType?: 'purchase_order' | 'retention_campaign' | 'inventory_alert';
  cardData?: any;
}

export const IaBotScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: '¡Hola María! Soy el Copiloto Inteligente de Vida Sana. Tengo acceso en tiempo real a tu base de datos de Google Sheets, historial de ventas del POS y semáforo de lotes botánicos. ¿En qué te ayudo hoy?',
      timestamp: '10:45 AM'
    },
    {
      id: 'msg-2',
      sender: 'user',
      text: '¿Cuáles son los productos con stock crítico que debemos pedir al proveedor hoy?',
      timestamp: '10:46 AM'
    },
    {
      id: 'msg-3',
      sender: 'bot',
      text: 'Analicé el inventario en Google Sheets y los mínimos de seguridad. Generé esta orden de compra optimizada para Laboratorios Verdor considerando el tiempo de entrega de 3 días:',
      timestamp: '10:46 AM',
      cardType: 'purchase_order',
      cardData: {
        orderNumber: 'OC-2024-88',
        provider: 'Laboratorios Verdor S.R.L.',
        items: [
          { name: 'Moringa Orgánica 250g', qty: 15, cost: 210, total: 3150 },
          { name: 'Spirulina en Tabletas 500mg', qty: 20, cost: 490, total: 9800 },
          { name: 'Aceite Árbol de Té 30ml', qty: 12, cost: 290, total: 3480 }
        ],
        totalCost: 16430
      }
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    '📦 Generar orden a proveedores',
    '💬 Reactivar clientes inactivos WhatsApp',
    '⏳ Resumen de lotes críticos < 30 días',
    '🌿 Posología recomendada Moringa'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const message = textToSend || inputMessage;
    if (!message.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response based on topic
    setTimeout(() => {
      let botResponse: ChatMessage;

      if (message.includes('Reactivar') || message.includes('WhatsApp')) {
        botResponse = {
          id: `msg-bot-${Date.now()}`,
          sender: 'bot',
          text: 'Identifiqué a 8 clientes VIP del Club con más de 40 días sin comprar. He redactado una propuesta de campaña por WhatsApp con un cupón de 10% y bono de RD$ 200:',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          cardType: 'retention_campaign',
          cardData: {
            title: 'Campaña Reactivación Club Oro',
            targetCount: 8,
            sampleMessage:
              '“Hola [Nombre] 🌿 Te extrañamos en Vida Sana. Queremos consentirte con un bono de RD$ 200 en tu compra de reposición habitual de suplementos. ¡Ven antes del sábado!”'
          }
        };
      } else if (message.includes('lotes') || message.includes('críticos')) {
        botResponse = {
          id: `msg-bot-${Date.now()}`,
          sender: 'bot',
          text: 'En el semáforo de lotes tienes 2 productos urgentes: Miel Silvestre 350g (14 días restantes, 16 uds) y Spirulina 500mg (28 días restantes, 9 uds). ¿Deseas activar una promoción del 20% en POS?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else if (message.includes('Moringa') || message.includes('Posología')) {
        botResponse = {
          id: `msg-bot-${Date.now()}`,
          sender: 'bot',
          text: '🌿 Posología recomendada de Moringa Orgánica en Polvo: 1 cucharadita (5g) al día mezclada en jugos naturales, batidos o agua tibia por las mañanas. No consumir en ayunas si hay sensibilidad gástrica. Rica en hierro, calcio y 27% de proteína vegetal pura.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else {
        botResponse = {
          id: `msg-bot-${Date.now()}`,
          sender: 'bot',
          text: `Entendido. Consulté la hoja Vida_Sana_Production_DB_2024 en Google Drive. El arqueo actual de caja suma RD$ 42,850.00 con un margen bruto promedio de 42.8%. ¿Deseas exportar el informe a PDF o enviarlo por correo?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="space-y-3 pb-24 max-w-4xl mx-auto flex flex-col h-[calc(100vh-140px)] min-h-[500px]">
      {/* Bot Header Card */}
      <div className="bg-white rounded-2xl p-3.5 border border-[#dae2fd] shadow-xs flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-[#006948] to-[#00855d] text-[#85f8c4] flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-2xl">smart_toy</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-sm sm:text-base text-[#131b2e] leading-tight">
                Copiloto Botánico IA
              </h2>
              <span className="w-2 h-2 rounded-full bg-[#68dba9] animate-pulse"></span>
              <span className="text-[10px] font-bold text-[#006948] bg-[#f5fff7] px-2 py-0.2 rounded-full border border-[#85f8c4]">
                Google Sheets Sincronizado
              </span>
            </div>
            <p className="text-[11px] text-[#6d7a72]">
              Asistente para compras, reposición botánica y fidelización del Club
            </p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 bg-white rounded-2xl border border-[#dae2fd] p-4 overflow-y-auto space-y-3 shadow-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 space-y-2 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#006948] text-white rounded-tr-xs'
                  : 'bg-[#f2f3ff] text-[#131b2e] border border-[#dae2fd] rounded-tl-xs'
              }`}
            >
              <p>{msg.text}</p>

              {/* Rich Card: Purchase Order */}
              {msg.cardType === 'purchase_order' && msg.cardData && (
                <div className="bg-white rounded-xl p-3 border border-slate-200 text-slate-800 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="font-mono font-bold text-xs text-[#006948]">
                      #{msg.cardData.orderNumber}
                    </span>
                    <span className="text-[10px] text-slate-500">{msg.cardData.provider}</span>
                  </div>

                  <div className="divide-y divide-slate-100 text-[11px]">
                    {msg.cardData.items.map((item: any, idx: number) => (
                      <div key={idx} className="py-1 flex justify-between">
                        <span>
                          {item.qty}x {item.name}
                        </span>
                        <span className="font-semibold font-mono">RD$ {item.total}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-1 border-t border-slate-200 flex justify-between font-bold text-xs text-[#006948]">
                    <span>Total Estimado:</span>
                    <span>RD$ {msg.cardData.totalCost.toLocaleString()}</span>
                  </div>

                  <div className="pt-1 flex gap-1.5">
                    <button
                      onClick={() => alert('Abriendo WhatsApp Web con el pedido para el proveedor...')}
                      className="flex-1 py-1 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-xs">chat</span>
                      <span>Enviar por WhatsApp</span>
                    </button>
                    <button
                      onClick={() => alert('Orden registrada con éxito en tbl_Compras de Google Sheets')}
                      className="flex-1 py-1 px-2 rounded-lg bg-[#f2f3ff] border border-[#dae2fd] hover:bg-[#eaedff] text-[#006948] font-bold text-[10px] flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-xs">cloud_upload</span>
                      <span>Registrar en Sheets</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Rich Card: Retention Campaign */}
              {msg.cardType === 'retention_campaign' && msg.cardData && (
                <div className="bg-white rounded-xl p-3 border border-emerald-200 text-slate-800 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#006948]">{msg.cardData.title}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      {msg.cardData.targetCount} Clientes
                    </span>
                  </div>
                  <p className="text-[11px] italic bg-slate-50 p-2 rounded-lg border border-slate-200">
                    {msg.cardData.sampleMessage}
                  </p>
                  <button
                    onClick={() => alert('Iniciando envío programado de campaña a los 8 clientes...')}
                    className="w-full py-1.5 rounded-lg bg-[#006948] text-white font-bold text-xs flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">send</span>
                    <span>Lanzar Campaña de Reactivación</span>
                  </button>
                </div>
              )}

              <span
                className={`text-[9px] block text-right font-mono ${
                  msg.sender === 'user' ? 'text-white/70' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic">
            <span className="material-symbols-outlined text-base text-[#006948] animate-spin">
              autorenew
            </span>
            <span>El Copiloto IA está consultando Google Sheets...</span>
          </div>
        )}
      </div>

      {/* Quick Prompt Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 shrink-0">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSendMessage(prompt)}
            className="px-2.5 py-1.5 rounded-xl bg-white border border-[#dae2fd] text-[11px] font-semibold text-slate-700 hover:border-[#006948] hover:text-[#006948] whitespace-nowrap shadow-2xs transition-all"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message Input Bar */}
      <div className="bg-white rounded-2xl p-2 border border-[#dae2fd] shadow-xs flex items-center gap-2 shrink-0">
        <input
          type="text"
          placeholder="Pregunta sobre lotes, reposición, clientes o escribe un comando..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1 text-xs text-slate-900 bg-transparent px-2 py-1.5 focus:outline-none"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputMessage.trim()}
          className="w-9 h-9 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white flex items-center justify-center transition-transform active:scale-95 disabled:opacity-40"
        >
          <span className="material-symbols-outlined text-lg">send</span>
        </button>
      </div>
    </div>
  );
};
