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
          ? 'bg-white/90 dark:bg-navy-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 shadow-lg py-3'
          : 'bg-white/75 dark:bg-navy-900/60 backdrop-blur-md border-b border-slate-200/50 dark:border-white/5 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <div 
            onClick={() => navigateTo('home')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <img 
              src="/logo.svg" 
              alt="Aruba High Maintenance Logo" 
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-sm" 
            />
            <div className="flex flex-col">
              <span className="text-navy-950 dark:text-white font-grotesk font-extrabold text-base sm:text-lg tracking-wider group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                ARUBA HIGH
              </span>
              <span className="text-crimson-600 dark:text-gold-500 font-sans text-[9px] sm:text-xs font-extrabold tracking-wider sm:tracking-widest -mt-1 uppercase">
                Maintenance Contractor
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-4 xl:space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`font-bold text-sm tracking-wide transition-colors duration-200 uppercase relative py-2 ${
                  currentPage === item.id 
                    ? 'text-gold-600 dark:text-gold-400' 
                    : 'text-slate-800 dark:text-slate-200 hover:text-gold-600 dark:hover:text-gold-400'
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
                className={`flex items-center space-x-1 font-bold text-sm tracking-wide uppercase py-2 transition-colors duration-200 ${
                  ['estimator', 'tracker', 'dashboard', 'careers', 'faq'].includes(currentPage)
                    ? 'text-gold-600 dark:text-gold-400'
                    : 'text-slate-800 dark:text-slate-200 hover:text-gold-600 dark:hover:text-gold-400'
                }`}
              >
                <span>Portal & Tools</span>
                <ChevronDown size={14} className={`transform transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-2xl p-2 animate-fade-in z-50">
                  <button
                    onClick={() => navigateTo('estimator')}
                    className="w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 hover:bg-gold-500/10 hover:text-gold-600 dark:hover:text-gold-400 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <CheckSquare size={14} className="text-gold-500" />
                    <span>{t.navEstimator}</span>
                  </button>
                  <button
                    onClick={() => navigateTo('tracker')}
                    className="w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 hover:bg-gold-500/10 hover:text-gold-600 dark:hover:text-gold-400 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Clock size={14} className="text-gold-500" />
                    <span>{t.navTracker}</span>
                  </button>
                  <button
                    onClick={() => navigateTo('dashboard')}
                    className="w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 hover:bg-gold-500/10 hover:text-gold-600 dark:hover:text-gold-400 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Shield size={14} className="text-gold-500" />
                    <span>{t.navDashboard}</span>
                  </button>
                  <button
                    onClick={() => navigateTo('careers')}
                    className="w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 hover:bg-gold-500/10 hover:text-gold-600 dark:hover:text-gold-400 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Wrench size={14} className="text-gold-500" />
                    <span>{t.navCareers}</span>
                  </button>
                  <button
                    onClick={() => navigateTo('faq')}
                    className="w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 hover:bg-gold-500/10 hover:text-gold-600 dark:hover:text-gold-400 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <MessageSquare size={14} className="text-gold-500" />
                    <span>{t.navFAQ}</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo('contact')}
              className={`font-bold text-sm tracking-wide transition-colors duration-200 uppercase relative py-2 ${
                currentPage === 'contact' 
                  ? 'text-gold-600 dark:text-gold-400' 
                  : 'text-slate-800 dark:text-slate-200 hover:text-gold-600 dark:hover:text-gold-400'
              }`}
            >
              {t.navContact}
              {currentPage === 'contact' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold-500 to-orange-500 rounded-full animate-fade-in" />
              )}
            </button>
          </nav>

          {/* Action Buttons: Phone, Lang Switcher, Theme Toggle, Book Appointment */}
          <div className="hidden xl:flex items-center space-x-4">
            
            {/* Direct Call Icon */}
            <a
              href="tel:+2977308583"
              className="text-slate-700 dark:text-slate-300 hover:text-gold-500 transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5"
              title="Call Us"
            >
              <Phone size={18} />
            </a>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-slate-700 dark:text-slate-300 hover:text-gold-500 transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5"
              title={darkMode ? t.themeLight : t.themeDark}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                onBlur={() => setTimeout(() => setLangDropdownOpen(false), 200)}
                className="text-slate-700 dark:text-slate-300 hover:text-gold-500 transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 flex items-center space-x-1"
                title="Select Language"
              >
                <Globe size={18} />
                <span className="text-xs font-bold uppercase">{lang}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-2xl p-1 animate-fade-in z-50">
                  <button
                    onClick={() => toggleLang('en')}
                    className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg flex items-center justify-between ${
                      lang === 'en' ? 'bg-gold-500 text-navy-950 font-extrabold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>English</span>
                    {lang === 'en' && <span className="text-[10px] font-black">EN</span>}
                  </button>
                  <button
                    onClick={() => toggleLang('pap')}
                    className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg flex items-center justify-between ${
                      lang === 'pap' ? 'bg-gold-500 text-navy-950 font-extrabold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>Papiamento</span>
                    {lang === 'pap' && <span className="text-[10px] font-black">PAP</span>}
                  </button>
                  <button
                    onClick={() => toggleLang('nl')}
                    className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg flex items-center justify-between ${
                      lang === 'nl' ? 'bg-gold-500 text-navy-950 font-extrabold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>Nederlands</span>
                    {lang === 'nl' && <span className="text-[10px] font-black">NL</span>}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Premium CTA Button */}
          <button
            onClick={() => navigateTo('appointment')}
            className="hidden xl:inline-flex bg-gradient-to-r from-gold-500 via-amber-500 to-orange-500 hover:from-gold-600 hover:to-orange-600 text-navy-950 font-extrabold px-5 py-2.5 rounded-xl shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 text-xs uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5"
          >
            {t.btnBook}
          </button>

          {/* Mobile Right Controls: Mode Toggle & Menu Toggle */}
          <div className="flex xl:hidden items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-slate-700 dark:text-slate-300 hover:text-crimson-600 dark:hover:text-gold-500 p-2"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Language Selector (Mobile Cycle) */}
            <button
              onClick={() => {
                const nextLangMap: Record<Language, Language> = { en: 'pap', pap: 'nl', nl: 'en' };
                setLang(nextLangMap[lang]);
              }}
              className="text-slate-700 dark:text-slate-300 hover:text-crimson-600 dark:hover:text-gold-500 p-2 flex items-center space-x-0.5"
            >
              <Globe size={18} />
              <span className="text-xs font-bold uppercase">{lang}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-800 dark:text-slate-300 hover:text-crimson-600 dark:hover:text-white p-2"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Full Screen Menu Overlay */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-50 bg-slate-50 dark:bg-navy-950 backdrop-blur-2xl animate-fade-in p-6 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Overlay Header Branding */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800/40">
              <div className="flex items-center space-x-3">
                <img 
                  src="/logo.svg" 
                  alt="Aruba High Maintenance Logo" 
                  className="h-10 w-auto object-contain filter drop-shadow-md" 
                />
                <div className="flex flex-col">
                  <span className="text-navy-900 dark:text-white font-grotesk font-bold text-sm tracking-wider">
                    ARUBA HIGH
                  </span>
                  <span className="text-crimson-700 dark:text-gold-500 font-sans text-[9px] font-bold tracking-widest uppercase -mt-1">
                    Maintenance Contractor
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 dark:text-slate-300 hover:text-crimson-600 dark:hover:text-white p-2"
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
                href="tel:+2977308583"
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 rounded-lg flex items-center justify-center space-x-2 text-sm uppercase tracking-wider transition-colors"
              >
                <Phone size={16} className="text-gold-500" />
                <span>Call +297 730 8583</span>
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
