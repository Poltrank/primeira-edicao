
import React, { useState, useEffect } from 'react';
import { Booking } from '../types';

interface FleetImages {
  electric: string;
  sedan: string;
  hatch: string;
}

interface AdminPanelProps {
  onUpdateSettings: (settings: { heroImage: string; fleetImages: FleetImages }) => void;
  currentHero: string | null;
  currentFleet: FleetImages;
  bookings: Booking[];
  onUpdateBookingStatus: (id: string, status: Booking['status']) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onUpdateSettings, currentHero, currentFleet, bookings, onUpdateBookingStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'settings' | 'bookings'>('bookings');
  
  // Settings State
  const [heroUrl, setHeroUrl] = useState('');
  const [electricUrl, setElectricUrl] = useState('');
  const [sedanUrl, setSedanUrl] = useState('');
  const [hatchUrl, setHatchUrl] = useState('');
  
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentHero) setHeroUrl(currentHero);
    if (currentFleet) {
      setElectricUrl(currentFleet.electric);
      setSedanUrl(currentFleet.sedan);
      setHatchUrl(currentFleet.hatch);
    }
  }, [currentHero, currentFleet]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'ADM' && password === 'Armandinho10#') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Credenciais inválidas');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      heroImage: heroUrl.trim(),
      fleetImages: {
        electric: electricUrl.trim(),
        sedan: sedanUrl.trim(),
        hatch: hatchUrl.trim()
      }
    });
    alert('Configurações salvas!');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setIsOpen(false);
  };

  const renderImageInput = (label: string, value: string, setValue: (val: string) => void) => (
    <div className="mb-4">
      <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
      <input 
        type="text" 
        value={value}
        onChange={e => setValue(e.target.value)}
        className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-teal-500 text-slate-900 text-sm mb-2"
        placeholder="https://..."
      />
      {value && (
        <div className="relative h-24 w-full rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );

  return (
    <div className="relative inline-block ml-4 align-middle">
      {/* Hidden Lock Trigger */}
      <button 
        onClick={() => setIsOpen(true)}
        className="opacity-[0.05] hover:opacity-50 transition-opacity text-slate-400 p-1"
        title="Área Restrita"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
            <div className="bg-slate-900 px-6 py-4 flex justify-between items-center shrink-0">
              <h3 className="text-white font-bold">Administração</h3>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              {!isAuthenticated ? (
                /* Login Form */
                <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto mt-10">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Usuário</label>
                    <input 
                      type="text" 
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-teal-500 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
                    <input 
                      type="password" 
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-teal-500 text-slate-900"
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button type="submit" className="w-full bg-slate-900 text-white font-bold py-2 rounded-lg hover:bg-slate-800">
                    Entrar
                  </button>
                </form>
              ) : (
                /* Admin Dashboard */
                <div>
                   <div className="flex gap-4 mb-6 border-b border-slate-200 pb-2">
                       <button 
                         onClick={() => setActiveTab('bookings')}
                         className={`pb-2 px-2 font-bold transition-colors ${activeTab === 'bookings' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-slate-500 hover:text-slate-800'}`}
                       >
                           Gestão de Viagens
                       </button>
                       <button 
                         onClick={() => setActiveTab('settings')}
                         className={`pb-2 px-2 font-bold transition-colors ${activeTab === 'settings' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-slate-500 hover:text-slate-800'}`}
                       >
                           Imagens do Site
                       </button>
                   </div>

                   {activeTab === 'settings' ? (
                        /* Settings Form */
                        <form onSubmit={handleSaveSettings} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900 mb-4 border-b pb-2">Banner Principal</h4>
                                    {renderImageInput("Imagem de Fundo (Hero)", heroUrl, setHeroUrl)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900 mb-4 border-b pb-2">Fotos da Frota</h4>
                                    {renderImageInput("Foto Carro Elétrico", electricUrl, setElectricUrl)}
                                    {renderImageInput("Foto Sedan", sedanUrl, setSedanUrl)}
                                    {renderImageInput("Foto Hatch", hatchUrl, setHatchUrl)}
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-teal-600 text-white font-bold py-3 rounded-lg hover:bg-teal-500">
                                Salvar Alterações
                            </button>
                        </form>
                   ) : (
                       /* Bookings List */
                       <div className="space-y-4">
                           <h4 className="font-bold text-lg text-slate-900 mb-4">Solicitações Recentes</h4>
                           {bookings.length === 0 ? (
                               <p className="text-slate-500">Nenhuma solicitação registrada.</p>
                           ) : (
                               <div className="overflow-x-auto">
                                   <table className="w-full text-sm text-left">
                                       <thead className="bg-slate-100 text-slate-700 uppercase text-xs">
                                           <tr>
                                               <th className="px-4 py-3">Data</th>
                                               <th className="px-4 py-3">Cliente</th>
                                               <th className="px-4 py-3">Origem / Destino</th>
                                               <th className="px-4 py-3">Status</th>
                                               <th className="px-4 py-3 text-right">Ações</th>
                                           </tr>
                                       </thead>
                                       <tbody className="divide-y divide-slate-100">
                                           {[...bookings].reverse().map(booking => (
                                               <tr key={booking.id} className="hover:bg-slate-50">
                                                   <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                                                       {new Date(booking.date).toLocaleDateString()} <br/>
                                                       {new Date(booking.date).toLocaleTimeString()}
                                                   </td>
                                                   <td className="px-4 py-3 font-medium text-slate-900">
                                                       {booking.userName} <br/>
                                                       <span className="text-xs text-slate-500">{booking.userWhatsapp}</span>
                                                   </td>
                                                   <td className="px-4 py-3 text-slate-600 max-w-xs truncate">
                                                       <span className="text-xs font-bold block">DE:</span> {booking.details.pickupStreet}, {booking.details.pickupNumber}
                                                       <span className="text-xs font-bold block mt-1">PARA:</span> {booking.details.destStreet}, {booking.details.destNumber}
                                                   </td>
                                                   <td className="px-4 py-3">
                                                       <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                           booking.status === 'Realizada' ? 'bg-green-100 text-green-700' :
                                                           booking.status === 'Cancelada' ? 'bg-red-100 text-red-700' :
                                                           'bg-amber-100 text-amber-700'
                                                       }`}>
                                                           {booking.status}
                                                       </span>
                                                   </td>
                                                   <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                                                       {booking.status === 'Pendente' && (
                                                           <>
                                                            <button 
                                                                onClick={() => onUpdateBookingStatus(booking.id, 'Realizada')}
                                                                className="text-green-600 hover:text-green-800 font-bold text-xs border border-green-200 hover:bg-green-50 px-2 py-1 rounded"
                                                            >
                                                                Confirmar
                                                            </button>
                                                            <button 
                                                                onClick={() => onUpdateBookingStatus(booking.id, 'Cancelada')}
                                                                className="text-red-600 hover:text-red-800 font-bold text-xs border border-red-200 hover:bg-red-50 px-2 py-1 rounded"
                                                            >
                                                                Cancelar
                                                            </button>
                                                           </>
                                                       )}
                                                   </td>
                                               </tr>
                                           ))}
                                       </tbody>
                                   </table>
                               </div>
                           )}
                       </div>
                   )}

                   <div className="flex gap-3 pt-6 mt-6 border-t border-slate-100">
                     <button type="button" onClick={handleLogout} className="px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 text-sm">
                       Sair
                     </button>
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
