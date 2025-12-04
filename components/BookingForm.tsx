
import React, { useState, useEffect } from 'react';
import { BookingFormData, User } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface BookingFormProps {
  currentUser: User | null;
  onAddBooking: (bookingData: BookingFormData) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ currentUser, onAddBooking }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    needsTrunk: 'Não', // Default
    pickupTime: '',
    pickupStreet: '',
    pickupNumber: '',
    pickupDistrict: '',
    destStreet: '',
    destNumber: '',
    destDistrict: '',
  });

  // Auto-fill name if user is logged in
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({ ...prev, name: currentUser.name }));
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to App History
    onAddBooking(formData);

    // Construct the WhatsApp message
    const message = `*Solicitação de Viagem - EcoDrive Agency*\n\n` +
      `👤 *Cliente:* ${formData.name} ${currentUser ? '(VIP 👑)' : ''}\n` +
      `🕒 *Horário:* ${formData.pickupTime}\n` +
      `🧳 *Precisa de Porta-Malas:* ${formData.needsTrunk}\n\n` +
      `📍 *Embarque:*\n${formData.pickupStreet}, ${formData.pickupNumber} - ${formData.pickupDistrict}\n\n` +
      `🏁 *Destino:*\n${formData.destStreet}, ${formData.destNumber} - ${formData.destDistrict}\n\n` +
      `Gostaria de consultar o valor com desconto especial.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div id="booking" className="bg-slate-900 text-white rounded-xl shadow-xl overflow-hidden border border-teal-500/30">
      <div className="p-6 md:p-8 bg-gradient-to-r from-teal-700 to-teal-600">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Solicitar Viagem
        </h2>
        <p className="text-teal-100 text-sm">
          {currentUser ? `Bem-vindo, ${currentUser.name}! Seu desconto VIP está ativo.` : 'Preencha para garantir seu desconto de cliente especial.'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-amber-400 mb-2">Precisa de Porta-Malas?</label>
            <div className="flex gap-4">
              <label className={`flex items-center justify-center gap-2 cursor-pointer border rounded-lg px-4 py-3 flex-1 transition-all ${formData.needsTrunk === 'Sim' ? 'bg-amber-900/30 border-amber-500 text-amber-400' : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500'}`}>
                <input
                  type="radio"
                  name="needsTrunk"
                  value="Sim"
                  checked={formData.needsTrunk === 'Sim'}
                  onChange={handleChange}
                  className="hidden"
                />
                <span className="font-bold">Sim</span>
              </label>
              <label className={`flex items-center justify-center gap-2 cursor-pointer border rounded-lg px-4 py-3 flex-1 transition-all ${formData.needsTrunk === 'Não' ? 'bg-amber-900/30 border-amber-500 text-amber-400' : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500'}`}>
                <input
                  type="radio"
                  name="needsTrunk"
                  value="Não"
                  checked={formData.needsTrunk === 'Não'}
                  onChange={handleChange}
                  className="hidden"
                />
                <span className="font-bold">Não</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Seu Nome</label>
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              readOnly={!!currentUser}
              className={`w-full border border-slate-700 rounded-lg px-4 py-2 text-white outline-none transition-all ${currentUser ? 'bg-slate-700 cursor-not-allowed text-slate-400' : 'bg-slate-800 focus:ring-2 focus:ring-teal-500'}`}
              placeholder="Nome do passageiro"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Horário da Viagem</label>
            <input
              required
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleChange}
              type="time"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Pickup Section */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold border-b border-slate-700 pb-2">Local de Embarque</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs text-slate-500 mb-1">Rua</label>
              <input
                required
                name="pickupStreet"
                value={formData.pickupStreet}
                onChange={handleChange}
                type="text"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Número</label>
              <input
                required
                name="pickupNumber"
                value={formData.pickupNumber}
                onChange={handleChange}
                type="text"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Bairro</label>
              <input
                required
                name="pickupDistrict"
                value={formData.pickupDistrict}
                onChange={handleChange}
                type="text"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Destination Section */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold border-b border-slate-700 pb-2">Destino</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs text-slate-500 mb-1">Rua</label>
              <input
                required
                name="destStreet"
                value={formData.destStreet}
                onChange={handleChange}
                type="text"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Número</label>
              <input
                required
                name="destNumber"
                value={formData.destNumber}
                onChange={handleChange}
                type="text"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Bairro</label>
              <input
                required
                name="destDistrict"
                value={formData.destDistrict}
                onChange={handleChange}
                type="text"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 rounded-lg transition-all transform hover:scale-[1.01] shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 text-lg"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          Solicitar Motorista
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
