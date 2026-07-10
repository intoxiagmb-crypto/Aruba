import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChatBot from './components/AIChatBot';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Projects from './pages/Projects';
import Appointment from './pages/Appointment';
import CostEstimator from './pages/CostEstimator';
import ProjectTracker from './pages/ProjectTracker';
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import { Language } from './utils/translations';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState<boolean>(true); // Default to dark for a premium, luxury feel
  const [loading, setLoading] = useState<boolean>(true);

  // Sync dark class on html tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Loading animation setup
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const renderPage = () => {
    // If a service sub-page is active, render ServiceDetail
    if (currentPage === 'services' && selectedService) {
      return (
        <ServiceDetail
          serviceId={selectedService}
          setSelectedService={setSelectedService}
          setCurrentPage={setCurrentPage}
          lang={lang}
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} setSelectedService={setSelectedService} lang={lang} />;
      case 'about':
        return <About lang={lang} setCurrentPage={setCurrentPage} />;
      case 'services':
        return <Services lang={lang} setSelectedService={setSelectedService} setCurrentPage={setCurrentPage} />;
      case 'projects':
        return <Projects lang={lang} />;
      case 'appointment':
        return <Appointment lang={lang} />;
      case 'estimator':
        return <CostEstimator lang={lang} setCurrentPage={setCurrentPage} />;
      case 'tracker':
        return <ProjectTracker lang={lang} />;
      case 'dashboard':
        return <Dashboard lang={lang} />;
      case 'blog':
        return <Blog lang={lang} />;
      case 'careers':
        return <Careers lang={lang} />;
      case 'faq':
        return <FAQ lang={lang} />;
      case 'contact':
        return <Contact lang={lang} />;
      default:
        return <Home setCurrentPage={setCurrentPage} setSelectedService={setSelectedService} lang={lang} />;
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-navy-950 flex flex-col items-center justify-center z-50">
        {/* Animated premium logo loader */}
        <div className="relative mb-6">
          <div className="w-16 h-16 bg-gradient-to-tr from-gold-500 to-orange-500 rounded-2xl flex items-center justify-center text-navy-950 font-black text-2xl shadow-xl animate-pulse-subtle">
            AH
          </div>
          <div className="absolute -inset-3 border border-gold-500/25 rounded-3xl animate-spin" style={{ animationDuration: '6s' }} />
        </div>
        <h4 className="text-white font-grotesk font-black text-lg tracking-wider">ARUBA HIGH MAINTENANCE</h4>
        <span className="text-gold-500 text-[10px] font-bold uppercase tracking-widest mt-1.5 animate-pulse">
          Loading Premium Experience...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-gold-500 selection:text-navy-950">
      
      {/* Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSelectedService={setSelectedService}
        lang={lang}
        setLang={setLang}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Page Content */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer
        setCurrentPage={setCurrentPage}
        setSelectedService={setSelectedService}
        lang={lang}
      />

      {/* Client-Side Floating AI Chat Bot */}
      <AIChatBot
        lang={lang}
        setCurrentPage={setCurrentPage}
        setSelectedService={setSelectedService}
      />

    </div>
  );
}

export default App;
