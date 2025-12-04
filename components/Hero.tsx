import React from 'react';
import { AGENCY_NAME, LOCATION } from '../constants';

interface HeroProps {
  customImage?: string;
}

const Hero: React.FC<HeroProps> = ({ customImage }) => {
  const bgImage = customImage || 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop';

  return (
    <div className="relative bg-slate-900 text-white overflow-hidden min-h-[600px] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10"></div>
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url('${bgImage}')` }}
      ></div>

      <div className="relative z-20 max-w-6xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-3/4">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-bold tracking-wider text-amber-300 uppercase bg-amber-900/40 rounded-full border border-amber-500/50">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            Cliente VIP: Descontos Exclusivos
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Você define o destino, <br/>
            <span className="text-teal-400">nós levamos o motorista.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl border-l-4 border-teal-500 pl-4">
            A {AGENCY_NAME} conecta você aos melhores motoristas de {LOCATION}. 
            Nós selecionamos o veículo ideal para sua viagem com a exclusividade que você merece.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#booking" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-900 bg-teal-400 rounded-lg hover:bg-teal-300 transition-colors shadow-lg shadow-teal-400/20 transform hover:-translate-y-1">
              Solicitar Motorista
            </a>
            <a href="#fleet" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors">
              Conhecer a Frota
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;