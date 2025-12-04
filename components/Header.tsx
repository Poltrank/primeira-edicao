
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
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20 transform hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
            </div>
            <span className="font-bold text-lg tracking-tight hover:text-teal-400 transition-colors cursor-default">{AGENCY_NAME}</span>
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
              className="bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-teal-500/20"
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
