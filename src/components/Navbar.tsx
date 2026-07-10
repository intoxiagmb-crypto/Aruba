import React, { useState, useEffect } from 'react';
import { translations, Language } from '../utils/translations';
import { Menu, X, Sun, Moon, Globe, Phone, Clock, Calendar, CheckSquare, ChevronDown, Wrench, Shield, MessageSquare } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  setSelectedService?: (service: string | null) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export default function Navbar({
  currentPage,
  setCurrentPage,
  setSelectedService,
  lang,
  setLang,
  darkMode,
  setDarkMode,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
    if (page !== 'services' && setSelectedService) {
      setSelectedService(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLang = (selectedLang: Language) => {
    setLang(selectedLang);
    setLangDropdownOpen(false);
  };

  const navItems = [
    { id: 'home', label: t.navHome },
    { id: 'about', label: t.navAbout },
    { id: 'services', label: t.navServices },
    { id: 'projects', label: t.navProjects },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-panel-dark shadow-lg py-3'
          : 'bg-navy-900/60 backdrop-blur-md border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <div 
            onClick={() => navigateTo('home')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-gold-500 to-orange-500 rounded-lg flex items-center justify-center text-navy-950 font-bold text-lg shadow-md group-hover:scale-105 transition-transform duration-300">
              AH
            </div>
            <div className="flex flex-col">
              <span className="text-white font-grotesk font-bold text-lg tracking-wider group-hover:text-gold-500 transition-colors">
                ARUBA HIGH
              </span>
              <span className="text-gold-500 font-sans text-xs font-semibold tracking-widest -mt-1 uppercase">
                Maintenance Contractor
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`font-medium text-sm tracking-wide transition-colors duration-200 uppercase relative py-2 ${
                  currentPage === item.id 
                    ? 'text-gold-500' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold-500 to-orange-500 rounded-full animate-fade-in" />
                )}
              </button>
            ))}

            {/* Interactive Tools Dropdown (Estimator, Tracker, Dashboard) */}
            <div className="relative">
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                onBlur={() => setTimeout(() => setToolsDropdownOpen(false), 200)}
                className={`flex items-center space-x-1 font-medium text-sm tracking-wide uppercase py-2 transition-colors duration-200 ${
                  ['estimator', 'tracker', 'dashboard', 'careers', 'faq'].includes(currentPage)
                    ? 'text-gold-500'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>Portal & Tools</span>
                <ChevronDown size={14} className={`transform transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-navy-900 border border-slate-700/50 rounded-xl shadow-2xl p-2 animate-fade-in z-50">
                  <button
                    onClick={() => navigateTo('estimator')}
                    className="w-full text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:bg-slate-800 hover:text-gold-500 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <CheckSquare size={14} className="text-gold-500" />
                    <span>{t.navEstimator}</span>
                  </button>
                  <button
                    onClick={() => navigateTo('tracker')}
                    className="w-full text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:bg-slate-800 hover:text-gold-500 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Clock size={14} className="text-gold-500" />
                    <span>{t.navTracker}</span>
                  </button>
                  <button
                    onClick={() => navigateTo('dashboard')}
                    className="w-full text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:bg-slate-800 hover:text-gold-500 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Shield size={14} className="text-gold-500" />
                    <span>{t.navDashboard}</span>
                  </button>
                  <button
                    onClick={() => navigateTo('careers')}
                    className="w-full text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:bg-slate-800 hover:text-gold-500 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Wrench size={14} className="text-gold-500" />
                    <span>{t.navCareers}</span>
                  </button>
                  <button
                    onClick={() => navigateTo('faq')}
                    className="w-full text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:bg-slate-800 hover:text-gold-500 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <MessageSquare size={14} className="text-gold-500" />
                    <span>{t.navFAQ}</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo('contact')}
              className={`font-medium text-sm tracking-wide transition-colors duration-200 uppercase relative py-2 ${
                currentPage === 'contact' 
                  ? 'text-gold-500' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {t.navContact}
              {currentPage === 'contact' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold-500 to-orange-500 rounded-full animate-fade-in" />
              )}
            </button>
          </nav>

          {/* Action Buttons: Phone, Lang Switcher, Theme Toggle, Book Appointment */}
          <div className="hidden lg:flex items-center space-x-4">
            
            {/* Direct Call Icon */}
            <a
              href="tel:+2976602356"
              className="text-slate-300 hover:text-gold-500 transition-colors p-2 rounded-full hover:bg-white/5"
              title="Call Us"
            >
              <Phone size={18} />
            </a>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-slate-300 hover:text-gold-500 transition-colors p-2 rounded-full hover:bg-white/5"
              title={darkMode ? t.themeLight : t.themeDark}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                onBlur={() => setTimeout(() => setLangDropdownOpen(false), 200)}
                className="text-slate-300 hover:text-gold-500 transition-colors p-2 rounded-full hover:bg-white/5 flex items-center space-x-1"
                title="Select Language"
              >
                <Globe size={18} />
                <span className="text-xs font-bold uppercase">{lang}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-navy-900 border border-slate-700/50 rounded-xl shadow-2xl p-1 animate-fade-in">
                  <button
                    onClick={() => toggleLang('en')}
                    className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg flex items-center justify-between ${
                      lang === 'en' ? 'bg-gold-500 text-navy-950' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>English</span>
                    {lang === 'en' && <span className="text-[10px] font-extrabold">EN</span>}
                  </button>
                  <button
                    onClick={() => toggleLang('pap')}
                    className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg flex items-center justify-between ${
                      lang === 'pap' ? 'bg-gold-500 text-navy-950' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>Papiamento</span>
                    {lang === 'pap' && <span className="text-[10px] font-extrabold">PAP</span>}
                  </button>
                  <button
                    onClick={() => toggleLang('nl')}
                    className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg flex items-center justify-between ${
                      lang === 'nl' ? 'bg-gold-500 text-navy-950' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>Nederlands</span>
                    {lang === 'nl' && <span className="text-[10px] font-extrabold">NL</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Premium CTA Button */}
            <button
              onClick={() => navigateTo('appointment')}
              className="bg-gradient-to-r from-gold-500 to-orange-500 hover:from-gold-600 hover:to-orange-600 text-navy-950 font-semibold px-5 py-2.5 rounded-lg shadow-lg hover:shadow-orange-500/20 text-xs uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {t.btnBook}
            </button>
          </div>

          {/* Mobile Right Controls: Mode Toggle & Menu Toggle */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-slate-300 hover:text-gold-500 p-2"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Language Selector (Mobile Cycle) */}
            <button
              onClick={() => {
                const nextLangMap: Record<Language, Language> = { en: 'pap', pap: 'nl', nl: 'en' };
                setLang(nextLangMap[lang]);
              }}
              className="text-slate-300 hover:text-gold-500 p-2 flex items-center space-x-0.5"
            >
              <Globe size={18} />
              <span className="text-xs font-bold uppercase">{lang}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Full Screen Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-navy-950 backdrop-blur-2xl animate-fade-in p-6 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Overlay Header Branding */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-800/40">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-gradient-to-tr from-gold-500 to-orange-500 rounded-lg flex items-center justify-center text-navy-950 font-bold text-base">
                  AH
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-grotesk font-bold text-sm tracking-wider">
                    ARUBA HIGH
                  </span>
                  <span className="text-gold-500 font-sans text-[9px] font-semibold tracking-widest uppercase -mt-1">
                    Maintenance Contractor
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-white p-2"
              >
                <X size={26} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col space-y-3.5 pt-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`text-left text-lg font-bold tracking-wide uppercase py-2 border-b border-slate-800/40 ${
                    currentPage === item.id ? 'text-gold-500' : 'text-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => navigateTo('estimator')}
                className={`text-left text-lg font-bold tracking-wide uppercase py-2 border-b border-slate-800/40 ${
                  currentPage === 'estimator' ? 'text-gold-500' : 'text-slate-300'
                }`}
              >
                {t.navEstimator}
              </button>
              
              <button
                onClick={() => navigateTo('tracker')}
                className={`text-left text-lg font-bold tracking-wide uppercase py-2 border-b border-slate-800/40 ${
                  currentPage === 'tracker' ? 'text-gold-500' : 'text-slate-300'
                }`}
              >
                {t.navTracker}
              </button>

              <button
                onClick={() => navigateTo('dashboard')}
                className={`text-left text-lg font-bold tracking-wide uppercase py-2 border-b border-slate-800/40 ${
                  currentPage === 'dashboard' ? 'text-gold-500' : 'text-slate-300'
                }`}
              >
                {t.navDashboard}
              </button>

              <button
                onClick={() => navigateTo('careers')}
                className={`text-left text-lg font-bold tracking-wide uppercase py-2 border-b border-slate-800/40 ${
                  currentPage === 'careers' ? 'text-gold-500' : 'text-slate-300'
                }`}
              >
                {t.navCareers}
              </button>

              <button
                onClick={() => navigateTo('faq')}
                className={`text-left text-lg font-bold tracking-wide uppercase py-2 border-b border-slate-800/40 ${
                  currentPage === 'faq' ? 'text-gold-500' : 'text-slate-300'
                }`}
              >
                {t.navFAQ}
              </button>

              <button
                onClick={() => navigateTo('contact')}
                className={`text-left text-lg font-bold tracking-wide uppercase py-2 border-b border-slate-800/40 ${
                  currentPage === 'contact' ? 'text-gold-500' : 'text-slate-300'
                }`}
              >
                {t.navContact}
              </button>
            </nav>
          </div>

          <div className="pt-8">
            <div className="flex flex-col space-y-4">
              <a
                href="tel:+2976602356"
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 rounded-lg flex items-center justify-center space-x-2 text-sm uppercase tracking-wider transition-colors"
              >
                <Phone size={16} className="text-gold-500" />
                <span>Call +297-660-2356</span>
              </a>

              <button
                onClick={() => navigateTo('appointment')}
                className="bg-gradient-to-r from-gold-500 to-orange-500 hover:from-gold-600 hover:to-orange-600 text-navy-950 font-bold py-3.5 rounded-lg flex items-center justify-center space-x-2 text-sm uppercase tracking-wider transition-all"
              >
                <Calendar size={16} />
                <span>{t.btnBook}</span>
              </button>
            </div>

            <div className="pt-6 text-center">
              <p className="text-slate-500 text-[10px] uppercase tracking-widest">{t.workingHours}</p>
              <p className="text-slate-400 text-xs font-semibold mt-1">Monday - Friday: 7:00 AM – 5:00 PM</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
