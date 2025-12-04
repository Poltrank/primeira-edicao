
import React from 'react';
import { AGENCY_NAME } from '../constants';
import { User } from '../types';

interface HeaderProps {
  currentUser: User | null;
  onOpenAuth: () => void;
  onOpenDashboard: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onOpenAuth, onOpenDashboard, onLogout }) => {
  return (
    <header className="bg-slate-900 text-white shadow-md border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-slate-900" fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/></svg>
            </div>
            <span className="font-bold text-lg tracking-tight">{AGENCY_NAME}</span>
        </div>

        <div>
          {currentUser ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={onOpenDashboard}
                className="flex items-center gap-2 text-sm font-medium hover:text-teal-400 transition-colors"
              >
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                Olá, {currentUser.name.split(' ')[0]}
              </button>
              <button 
                onClick={onLogout}
                className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-full text-slate-400 transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Entrar / Cadastrar
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
