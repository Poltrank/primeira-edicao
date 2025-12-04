import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_ROUTES, AGENCY_NAME } from '../constants';
import { ChatMessage } from '../types';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `Olá! Bem-vindo à ${AGENCY_NAME}. Posso ajudar com valores ou informações sobre nossa frota?` }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg = inputText;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputText('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemInstruction = `Você é o assistente virtual da ${AGENCY_NAME}, uma agência de transporte de passageiros em Jaraguá do Sul.
      
      Sua missão é explicar como funciona a agência e informar sobre descontos.
      
      Funcionamento da Frota:
      - O cliente NÃO escolhe o carro específico no momento da reserva.
      - A agência seleciona e envia o veículo disponível mais adequado.
      - Todos os nossos veículos (Elétrico, Sedan ou Hatch) são de ótima qualidade, rápidos e com bom preço.
      - Se o cliente precisa de espaço para malas, ele deve marcar "Sim" na opção de Porta-Malas no formulário.
      
      Nossa Frota (apenas informativo):
      1. Carro Elétrico (BYD Dolphin Mini): Tecnológico e sustentável.
      2. Carro Sedan: Ideal se precisar de mais porta-malas.
      3. Carro Hatch: Prático e versátil.
      
      Política de Cliente Especial:
      - Enfatize que aqui "O cliente é especial".
      - Mencione que temos descontos exclusivos e promoções para viagens agendadas.
      
      Valores de Referência (Base):
      ${INITIAL_ROUTES.map(r => `- ${r.destination}: ${typeof r.price === 'number' ? 'R$ ' + r.price : r.price}`).join('\n')}
      
      Instruções:
      - Responda de forma curta e vendedora.
      - Não faça comparações de preço entre os carros (todos têm ótimo preço).
      - Sempre redirecione para o formulário ou botão de WhatsApp para fechar negócio.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
            { role: 'user', parts: [{ text: userMsg }] }
        ],
        config: {
          systemInstruction: systemInstruction,
        }
      });

      const text = response.text || "Desculpe, não consegui processar sua pergunta. Tente novamente.";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Ocorreu um erro ao conectar com o assistente." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-teal-600 hover:bg-teal-500 text-white rounded-full p-4 shadow-lg transition-transform hover:scale-110 border-2 border-white"
        aria-label="Abrir chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[500px]">
          <div className="bg-slate-900 p-4 text-white">
            <h3 className="font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
              {AGENCY_NAME} Chat
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 min-h-[300px]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-lg px-4 py-2 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-teal-600 text-white rounded-br-none' 
                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-lg px-4 py-2 rounded-bl-none shadow-sm flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-slate-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Dúvida sobre frota ou preços?"
                className="flex-1 bg-slate-100 border-transparent focus:bg-white border focus:border-teal-500 rounded-lg px-3 py-2 text-sm outline-none transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-500 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;