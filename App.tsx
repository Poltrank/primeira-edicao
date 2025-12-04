
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import PriceTable from './components/PriceTable';
import BookingForm from './components/BookingForm';
import ChatAssistant from './components/ChatAssistant';
import AdminPanel from './components/AdminPanel';
import Header from './components/Header';
import UserAuthModal from './components/UserAuthModal';
import UserDashboard from './components/UserDashboard';
import { AGENCY_NAME } from './constants';
import { User, Booking, BookingFormData } from './types';

const DEFAULT_FLEET = {
  electric: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1744&auto=format&fit=crop',
  sedan: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1936&auto=format&fit=crop',
  hatch: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1740&auto=format&fit=crop'
};

function App() {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [fleetImages, setFleetImages] = useState(DEFAULT_FLEET);
  
  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  
  // Data State (Simulating DB)
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Load Settings
    const savedHero = localStorage.getItem('ecoDriveHeroImage');
    if (savedHero) setHeroImage(savedHero);

    const savedFleet = localStorage.getItem('ecoDriveFleetImages');
    if (savedFleet) {
      try {
        setFleetImages(JSON.parse(savedFleet));
      } catch (e) { console.error(e); }
    }

    // Load Bookings
    const savedBookings = localStorage.getItem('ecoDriveBookings');
    if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
    }
    
    // Check Session (User persistence)
    // Note: In a real app we would use tokens. Here we just persist user object in session storage or assume simple persistence.
  }, []);

  const handleUpdateSettings = (settings: { heroImage: string, fleetImages: typeof DEFAULT_FLEET }) => {
    setHeroImage(settings.heroImage);
    localStorage.setItem('ecoDriveHeroImage', settings.heroImage);
    setFleetImages(settings.fleetImages);
    localStorage.setItem('ecoDriveFleetImages', JSON.stringify(settings.fleetImages));
  };

  const handleLogin = (user: User) => {
      setCurrentUser(user);
      setIsAuthOpen(false);
  };

  const handleLogout = () => {
      setCurrentUser(null);
      setIsDashboardOpen(false);
  };

  const handleAddBooking = (data: BookingFormData) => {
    const newBooking: Booking = {
        id: Date.now().toString(),
        userId: currentUser ? currentUser.id : 'guest',
        userName: data.name,
        userWhatsapp: currentUser ? currentUser.whatsapp : 'Não informado',
        date: new Date().toISOString(),
        details: data,
        status: 'Pendente'
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('ecoDriveBookings', JSON.stringify(updatedBookings));
  };

  const handleUpdateBookingStatus = (id: string, status: Booking['status']) => {
      const updatedBookings = bookings.map(b => 
          b.id === id ? { ...b, status } : b
      );
      setBookings(updatedBookings);
      localStorage.setItem('ecoDriveBookings', JSON.stringify(updatedBookings));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header 
        currentUser={currentUser} 
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onLogout={handleLogout}
      />

      <Hero customImage={heroImage || undefined} />
      
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-20">
        
        {/* Benefits & Booking */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <BookingForm currentUser={currentUser} onAddBooking={handleAddBooking} />
          </div>
          <div className="order-1 md:order-2 space-y-8">
            <div className={`bg-amber-50 border border-amber-200 rounded-xl p-6 ${currentUser ? 'ring-2 ring-amber-400' : ''}`}>
              <h3 className="text-xl font-bold text-amber-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">👑</span> Clube de Vantagens
              </h3>
              <p className="text-amber-900/80">
                {currentUser 
                  ? `Olá, ${currentUser.name}! Você já está acumulando benefícios em suas viagens.`
                  : "Aqui você não é apenas um passageiro. Cadastre-se em nossa base através da sua primeira viagem e ganhe descontos progressivos."
                }
              </p>
              {!currentUser && (
                  <button 
                    onClick={() => setIsAuthOpen(true)}
                    className="mt-4 text-amber-700 font-bold underline hover:text-amber-900"
                  >
                      Cadastre-se Agora
                  </button>
              )}
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Por que escolher a {AGENCY_NAME}?
              </h2>
              <p className="text-slate-600 text-lg mb-6">
                Somos uma agência focada em trazer o motorista até você com pontualidade e segurança. 
                Seja de Elétrico, Sedan ou Hatch, sua satisfação é nossa prioridade.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Pontualidade Britânica</h4>
                    <p className="text-slate-500 text-sm">Respeitamos seu tempo acima de tudo.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Segurança Total</h4>
                    <p className="text-slate-500 text-sm">Motoristas verificados e carros monitorados.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Fleet Selection Section */}
        <section id="fleet" className="text-center">
           <h2 className="text-3xl font-bold text-slate-900 mb-2">Nossa Frota</h2>
           <p className="text-slate-600 mb-10">Conheça os veículos da nossa frota à sua disposição.</p>
           
           <div className="grid md:grid-cols-3 gap-6">
              {/* Electric */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
                <div className="h-48 bg-slate-100 relative overflow-hidden">
                   <img src={fleetImages.electric} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Carro Elétrico" />
                </div>
                <div className="p-6">
                   <h3 className="text-xl font-bold text-slate-800 mb-2">Carro Elétrico</h3>
                   <p className="text-slate-500 text-sm">BYD Dolphin Mini. Tecnologia e sustentabilidade.</p>
                </div>
              </div>

              {/* Sedan */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
                <div className="h-48 bg-slate-100 relative overflow-hidden">
                   <img src={fleetImages.sedan} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Sedan" />
                </div>
                <div className="p-6">
                   <h3 className="text-xl font-bold text-slate-800 mb-2">Sedan</h3>
                   <p className="text-slate-500 text-sm">Para quem necessita de maior espaço para bagagens.</p>
                </div>
              </div>

              {/* Hatch */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
                <div className="h-48 bg-slate-100 relative overflow-hidden">
                   <img src={fleetImages.hatch} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Hatch" />
                </div>
                <div className="p-6">
                   <h3 className="text-xl font-bold text-slate-800 mb-2">Hatch</h3>
                   <p className="text-slate-500 text-sm">Praticidade e versatilidade para o dia a dia.</p>
                </div>
              </div>
           </div>
        </section>

        {/* Price Table Section */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Valores de Referência</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Confira os valores estimados. Lembre-se: Clientes VIP e rotinas frequentes têm <strong>descontos especiais</strong>.
            </p>
          </div>
          <PriceTable />
        </section>

      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="inline-block">© {new Date().getFullYear()} {AGENCY_NAME}. Jaraguá do Sul, SC.</p>
          <AdminPanel 
            onUpdateSettings={handleUpdateSettings} 
            currentHero={heroImage} 
            currentFleet={fleetImages}
            bookings={bookings}
            onUpdateBookingStatus={handleUpdateBookingStatus}
          />
        </div>
      </footer>

      <ChatAssistant />
      
      {isAuthOpen && (
          <UserAuthModal 
            onClose={() => setIsAuthOpen(false)} 
            onLogin={handleLogin} 
          />
      )}

      {isDashboardOpen && currentUser && (
          <UserDashboard 
            user={currentUser} 
            bookings={bookings}
            onClose={() => setIsDashboardOpen(false)} 
          />
      )}
    </div>
  );
}

export default App;
