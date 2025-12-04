import React, { useState } from 'react';
import { INITIAL_ROUTES } from '../constants';

const PriceTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRoutes = INITIAL_ROUTES.filter(route => 
    route.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Tabela de Valores</h2>
        <p className="text-slate-500 mb-4">Consulte os valores estimados para os principais destinos.</p>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Filtrar por cidade (ex: Joinville)"
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-xs">
            <tr>
              <th className="px-6 py-4">Destino</th>
              <th className="px-6 py-4 text-right">Valor Estimado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredRoutes.map((route) => (
              <tr key={route.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">
                  {route.destination}
                  {route.note && <span className="block text-xs text-slate-400 font-normal mt-1">{route.note}</span>}
                </td>
                <td className="px-6 py-4 text-right font-bold text-teal-600">
                  {typeof route.price === 'number' ? `R$ ${route.price.toFixed(2)}` : route.price}
                </td>
              </tr>
            ))}
            {filteredRoutes.length === 0 && (
              <tr>
                <td colSpan={2} className="px-6 py-8 text-center text-slate-500">
                  Nenhum destino encontrado. Entre em contato para um orçamento personalizado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceTable;