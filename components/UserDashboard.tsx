
import React from 'react';
import { User, Booking } from '../types';

interface UserDashboardProps {
  user: User;
  bookings: Booking[];
  onClose: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, bookings, onClose }) => {
  const userBookings = bookings.filter(b => b.userId === user.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'Realizada': return <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Realizada</span>;
      case 'Cancelada': return <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">Cancelada</span>;
      default: return <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-bold">Pendente</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
        <div className="bg-slate-900 p-6 flex justify-between items-center text-white sticky top-0 z-10">
          <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-2xl">👑</span> Clube de Vantagens
              </h2>
              <p className="text-slate-400 text-sm">Bem-vindo, {user.name}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 bg-slate-50">
           
           {/* VIP Status Card */}
           <div className="bg-gradient-to-r from-amber-200 to-amber-100 border border-amber-300 rounded-xl p-6 mb-8 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white text-2xl shadow-md">
                        ★
                    </div>
                    <div>
                        <h3 className="font-bold text-amber-900 text-lg">Você é um Cliente VIP</h3>
                        <p className="text-amber-800 text-sm">
                            Como membro cadastrado, suas viagens acumulam pontos para descontos futuros. 
                            Continue viajando conosco para subir de nível!
                        </p>
                    </div>
                </div>
           </div>

           <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
             <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             Meus Orçamentos e Viagens
           </h3>

           {userBookings.length === 0 ? (
             <div className="text-center py-10 bg-white rounded-xl border border-dashed border-slate-300">
               <p className="text-slate-400">Você ainda não realizou nenhuma solicitação de viagem.</p>
               <button onClick={onClose} className="mt-4 text-teal-600 font-bold hover:underline">Solicitar agora</button>
             </div>
           ) : (
             <div className="space-y-4">
               {userBookings.map((booking) => (
                 <div key={booking.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-slate-400 font-medium">
                            {new Date(booking.date).toLocaleDateString()} às {new Date(booking.date).toLocaleTimeString()}
                        </span>
                        {getStatusBadge(booking.status)}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold">Origem</p>
                            <p className="text-slate-800 font-medium text-sm truncate">{booking.details.pickupStreet}, {booking.details.pickupNumber}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold">Destino</p>
                            <p className="text-slate-800 font-medium text-sm truncate">{booking.details.destStreet}, {booking.details.destNumber}</p>
                        </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
                         <span className="text-xs text-slate-500">Horário: <strong>{booking.details.pickupTime}</strong></span>
                         <span className="text-xs text-slate-500">Porta-Malas: <strong>{booking.details.needsTrunk}</strong></span>
                    </div>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;