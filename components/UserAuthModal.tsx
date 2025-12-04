
import React, { useState } from 'react';
import { User } from '../types';

interface UserAuthModalProps {
  onClose: () => void;
  onLogin: (user: User) => void;
}

const UserAuthModal: React.FC<UserAuthModalProps> = ({ onClose, onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [error, setError] = useState('');

  const handleCleanWhatsapp = (phone: string) => {
    return phone.replace(/\D/g, '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isRegistering && !name.trim()) {
      setError('Por favor, informe seu nome.');
      return;
    }
    if (whatsapp.length < 8) {
        setError('Número de WhatsApp inválido.');
        return;
    }

    const cleanPhone = handleCleanWhatsapp(whatsapp);
    
    // Simulate API/DB Logic
    const storedUsers = JSON.parse(localStorage.getItem('ecoDriveUsers') || '[]');
    
    if (isRegistering) {
        // Check if exists
        const exists = storedUsers.find((u: User) => u.whatsapp === cleanPhone);
        if (exists) {
            setError('Este número já possui cadastro. Faça login.');
            return;
        }

        const newUser: User = {
            id: Date.now().toString(),
            name,
            whatsapp: cleanPhone,
            createdAt: new Date().toISOString()
        };

        const updatedUsers = [...storedUsers, newUser];
        localStorage.setItem('ecoDriveUsers', JSON.stringify(updatedUsers));
        onLogin(newUser);
        onClose();

    } else {
        // Login Logic
        const user = storedUsers.find((u: User) => u.whatsapp === cleanPhone);
        if (user) {
            onLogin(user);
            onClose();
        } else {
            setError('Usuário não encontrado. Faça seu cadastro.');
        }
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-fade-in">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              {isRegistering ? 'Criar Conta VIP' : 'Acesse sua Conta'}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {isRegistering ? 'Participe do Clube de Vantagens EcoDrive' : 'Bem-vindo de volta!'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nome Completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Seu nome"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">WhatsApp (com DDD)</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="47999999999"
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-teal-500/30 transition-all transform hover:scale-[1.02]"
            >
              {isRegistering ? 'Cadastrar e Ganhar Descontos' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <button 
              onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
              className="text-teal-600 font-bold hover:underline"
            >
              {isRegistering ? 'Já tenho conta' : 'Não tenho cadastro'}
            </button>
          </div>
        </div>
        
        {/* Footer Banner */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 text-center">
             <p className="text-xs text-slate-500 flex items-center justify-center gap-2">
                <span className="text-amber-500">👑</span> Clube de Vantagens incluso no cadastro
             </p>
        </div>
      </div>
    </div>
  );
};

export default UserAuthModal;
