import React, { useState, useEffect } from 'react';
import { translations, Language } from '../utils/translations';
import { 
  Menu, X, Sun, Moon, Globe, Phone, Clock, Calendar, CheckSquare, 
  ChevronDown, Wrench, Shield, MessageSquare, Home, Info, Layers, 
  Briefcase, Calculator, HardHat, HelpCircle, Mail, ChevronRight, Sparkles
} from 'lucide-react';

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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

  const mainNavItems = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'about', label: t.navAbout, icon: Info },
    { id: 'services', label: t.navServices, icon: Layers },
    { id: 'projects', label: t.navProjects, icon: Briefcase },
  ];

  const portalItems = [
    { id: 'estimator', label: t.navEstimator, icon: Calculator, badge: 'Calculator' },
    { id: 'tracker', label: t.navTracker, icon: Clock, badge: 'Live Status' },
    { id: 'dashboard', label: t.navDashboard, icon: Shield, badge: 'Portal' },
    { id: 'careers', label: t.navCareers, icon: HardHat, badge: 'Hiring' },
    { id: 'faq', label: t.navFAQ, icon: HelpCircle, badge: 'Help' },
    { id: 'contact', label: t.navContact, icon: Mail, badge: 'Direct' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-navy-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 shadow-lg py-3'
          : 'bg-white/85 dark:bg-navy-900/70 backdrop-blur-md border-b border-slate-200/50 dark:border-white/5 py-3.5 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <div 
            onClick={() => navigateTo('home')} 
            className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group"
          >
            <img 
              src="/logo.svg" 
              alt="Aruba High Maintenance Logo" 
              className="h-9 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-sm" 
            />
            <div className="flex flex-col">
              <span className="text-navy-950 dark:text-white font-grotesk font-extrabold text-sm sm:text-lg tracking-wider group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                ARUBA HIGH
              </span>
              <span className="text-crimson-600 dark:text-gold-500 font-sans text-[8px] sm:text-xs font-extrabold tracking-wider sm:tracking-widest -mt-1 uppercase">
                Maintenance Contractor
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-4 xl:space-x-6">
            {mainNavItems.map((item) => (
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

          {/* Desktop Action Buttons */}
          <div className="hidden xl:flex items-center space-x-4">
            <a
              href="tel:+2977308583"
              className="text-slate-700 dark:text-slate-300 hover:text-gold-500 transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5"
              title="Call Us"
            >
              <Phone size={18} />
            </a>

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

          {/* Mobile Top Controls: Theme, Language & 3-Line Menu Icon */}
          <div className="flex xl:hidden items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-slate-700 dark:text-slate-200 hover:text-gold-500 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              title="Toggle theme"
            >
              {darkMode ? <Sun size={20} className="text-gold-400" /> : <Moon size={20} />}
            </button>

            {/* Language Selector (Mobile Cycle) */}
            <button
              onClick={() => {
                const nextLangMap: Record<Language, Language> = { en: 'pap', pap: 'nl', nl: 'en' };
                setLang(nextLangMap[lang]);
              }}
              className="text-slate-700 dark:text-slate-200 hover:text-gold-500 p-2 flex items-center space-x-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              title="Change Language"
            >
              <Globe size={18} />
              <span className="text-xs font-bold uppercase">{lang}</span>
            </button>

            {/* 3-Line Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-900 dark:text-white hover:text-gold-500 p-2 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 transition-all duration-200 active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} className="text-gold-500" /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Full Screen Interactive Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-[100] bg-white dark:bg-navy-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between overflow-y-auto animate-fade-in p-5 sm:p-6 min-h-screen">
          <div>
            {/* Header Branding & Close Button */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigateTo('home')}>
                <img 
                  src="/logo.svg" 
                  alt="Aruba High Maintenance Logo" 
                  className="h-10 w-auto object-contain filter drop-shadow-md" 
                />
                <div className="flex flex-col">
                  <span className="text-navy-950 dark:text-white font-grotesk font-black text-base tracking-wider">
                    ARUBA HIGH
                  </span>
                  <span className="text-crimson-600 dark:text-gold-500 font-sans text-[9px] font-bold tracking-widest uppercase -mt-1">
                    Maintenance Contractor
                  </span>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-full bg-slate-100 dark:bg-navy-900 text-slate-700 dark:text-slate-200 hover:text-gold-500 border border-slate-200 dark:border-slate-800 transition-colors"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Quick Controls: Language & Theme Bar */}
            <div className="mt-4 p-3 bg-slate-100/80 dark:bg-navy-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-1">
                {(['en', 'pap', 'nl'] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1.5 text-xs font-extrabold rounded-xl uppercase transition-all ${
                      lang === l
                        ? 'bg-gold-500 text-navy-950 shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                {darkMode ? <Sun size={15} className="text-gold-400" /> : <Moon size={15} className="text-navy-900" />}
                <span>{darkMode ? 'Light' : 'Dark'}</span>
              </button>
            </div>

            {/* Section 1: Main Navigation Links with Icons */}
            <div className="pt-6">
              <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 px-1">
                Main Pages
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigateTo(item.id)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left font-bold text-sm transition-all border ${
                        isActive
                          ? 'bg-gradient-to-r from-gold-500/15 to-orange-500/10 border-gold-500/40 text-gold-600 dark:text-gold-400 shadow-sm'
                          : 'bg-slate-50 dark:bg-navy-900/50 border-slate-200/80 dark:border-slate-800/80 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-900'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${isActive ? 'bg-gold-500 text-navy-950' : 'bg-slate-200/70 dark:bg-navy-800 text-slate-700 dark:text-slate-300'}`}>
                          <Icon size={18} />
                        </div>
                        <span className="uppercase tracking-wide">{item.label}</span>
                      </div>
                      <ChevronRight size={16} className={`transform transition-transform ${isActive ? 'text-gold-500 translate-x-1' : 'text-slate-400 opacity-60'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Interactive Portal & Service Tools with Icons */}
            <div className="pt-6">
              <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 px-1">
                Client Portal & Features
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {portalItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigateTo(item.id)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left font-bold text-sm transition-all border ${
                        isActive
                          ? 'bg-gradient-to-r from-gold-500/15 to-orange-500/10 border-gold-500/40 text-gold-600 dark:text-gold-400 shadow-sm'
                          : 'bg-slate-50 dark:bg-navy-900/50 border-slate-200/80 dark:border-slate-800/80 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-900'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${isActive ? 'bg-gold-500 text-navy-950' : 'bg-slate-200/70 dark:bg-navy-800 text-gold-500'}`}>
                          <Icon size={18} />
                        </div>
                        <span className="uppercase tracking-wide">{item.label}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20">
                          {item.badge}
                        </span>
                        <ChevronRight size={16} className={`transform transition-transform ${isActive ? 'text-gold-500 translate-x-1' : 'text-slate-400 opacity-60'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Drawer Bottom Actions: Phone Call & Appointment */}
          <div className="pt-6 pb-2 border-t border-slate-200 dark:border-slate-800 mt-6">
            <div className="flex flex-col space-y-3">
              <a
                href="tel:+2977308583"
                className="w-full bg-slate-900 dark:bg-navy-900 hover:bg-slate-800 text-white font-extrabold py-3.5 rounded-xl flex items-center justify-center space-x-2 text-xs uppercase tracking-wider border border-slate-800 shadow-md transition-colors"
              >
                <Phone size={16} className="text-gold-500 animate-pulse" />
                <span>Call +297 730 8583</span>
              </a>

              <button
                onClick={() => navigateTo('appointment')}
                className="w-full bg-gradient-to-r from-gold-500 via-amber-500 to-orange-500 hover:from-gold-600 hover:to-orange-600 text-navy-950 font-black py-3.5 rounded-xl flex items-center justify-center space-x-2 text-xs uppercase tracking-wider shadow-lg shadow-gold-500/20 transition-all active:scale-[0.99]"
              >
                <Calendar size={16} />
                <span>{t.btnBook}</span>
              </button>
            </div>

            <div className="pt-4 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">{t.workingHours}</p>
              <p className="text-slate-600 dark:text-slate-300 text-xs font-semibold mt-0.5">Mon - Fri: 7:00 AM – 5:00 PM</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

