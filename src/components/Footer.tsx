import React from 'react';
import { translations, Language } from '../utils/translations';
import { Phone, Mail, MapPin, Clock, ArrowUp, MessageCircle } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { BUSINESS_EMAIL, BUSINESS_WHATSAPP } from '../utils/appointments';

interface FooterProps {
  setCurrentPage: (page: string) => void;
  setSelectedService?: (service: string | null) => void;
  lang: Language;
}

export default function Footer({ setCurrentPage, setSelectedService, lang }: FooterProps) {
  const t = translations[lang];
  const currentYear = new Date().getFullYear();

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    if (page !== 'services' && setSelectedService) {
      setSelectedService(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-slate-800/80 relative overflow-hidden pt-16 pb-8">
      {/* Decorative top grid effect */}
      <div className="absolute inset-0 grid-bg-dark opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand & About */}
          <div className="flex flex-col space-y-4">
            <div 
              className="flex items-center cursor-pointer group inline-block" 
              onClick={() => navigateTo('home')}
              aria-label="Aruba High Maintenance Home"
            >
              <img 
                src="/logo.png" 
                alt="Aruba High Maintenance Contractor" 
                className="h-16 sm:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] drop-shadow-[0_0_24px_rgba(234,179,8,0.18)]" 
              />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed pt-2">
              {t.footerAbout}
            </p>
            <div className="flex items-center space-x-3 pt-4">
              <a
                href="https://www.facebook.com/arubahighmaintenancecontractor/#"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center hover:scale-110 hover:border-[#1877F2]/60 hover:shadow-[0_0_14px_rgba(24,119,242,0.35)] transition-all duration-300 group"
              >
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" fill="#FFFFFF" />
                  <path
                    fill="#1877F2"
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/arubahighmaintenancecontractor/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center hover:scale-110 hover:border-[#E1306C]/60 hover:shadow-[0_0_14px_rgba(225,48,108,0.35)] transition-all duration-300 group"
              >
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <radialGradient id="footer-ig-gradient" cx="30%" cy="107%" r="150%">
                      <stop offset="0%" stopColor="#fdf497" />
                      <stop offset="5%" stopColor="#fdf497" />
                      <stop offset="45%" stopColor="#fd5949" />
                      <stop offset="60%" stopColor="#d6249f" />
                      <stop offset="90%" stopColor="#285AEB" />
                    </radialGradient>
                  </defs>
                  <rect width="24" height="24" rx="6" fill="url(#footer-ig-gradient)" />
                  <path
                    fill="#ffffff"
                    d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8.2c-1.77 0-3.2-1.43-3.2-3.2s1.43-3.2 3.2-3.2 3.2 1.43 3.2 3.2-1.43 3.2-3.2 3.2zm6.2-8.3c-.64 0-1.16.52-1.16 1.16s.52 1.16 1.16 1.16 1.16-.52 1.16-1.16-.52-1.16-1.16-1.16zm2.8 1.9c-.06-1.3-.36-2.45-1.31-3.4-.95-.95-2.1-1.25-3.4-1.31-1.34-.08-5.36-.08-6.7 0-1.3.06-2.45.36-3.4 1.31-.95.95-1.25 2.1-1.31 3.4-.08 1.34-.08 5.36 0 6.7.06 1.3.36 2.45 1.31 3.4.95.95 2.1 1.25 3.4 1.31 1.34.08 5.36.08 6.7 0 1.3-.06 2.45-.36 3.4-1.31.95-.95 1.25-2.1 1.31-3.4.08-1.34.08-5.36 0-6.7zm-2.16 8.52c-.28.71-.83 1.26-1.54 1.54-.9.36-3.04.28-5.3.28s-4.4.08-5.3-.28c-.71-.28-1.26-.83-1.54-1.54-.36-.9-.28-3.04-.28-5.3s-.08-4.4.28-5.3c.28-.71.83-1.26 1.54-1.54.9-.36 3.04-.28 5.3-.28s4.4-.08 5.3.28c.71.28 1.26.83 1.54 1.54.36.9.28 3.04.28 5.3s.08 4.4-.28 5.3z"
                  />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center hover:scale-110 hover:border-[#0A66C2]/60 hover:shadow-[0_0_14px_rgba(10,102,194,0.35)] transition-all duration-300 group"
              >
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="4" fill="#0A66C2" />
                  <path
                    fill="#ffffff"
                    d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM3.14 8.28h3.6V19.7h-3.6V8.28zm5.82 0h3.45v1.56h.05c.48-.91 1.66-1.87 3.42-1.87 3.65 0 4.33 2.4 4.33 5.53V19.7h-3.6v-5.46c0-1.3-.03-2.98-1.82-2.98-1.82 0-2.1 1.42-2.1 2.88V19.7H8.96V8.28z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest relative pb-2 mb-6">
              {t.quickLinks}
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gold-500 rounded" />
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-gold-500 transition-colors">
                  {t.navHome}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-gold-500 transition-colors">
                  {t.navAbout}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-gold-500 transition-colors">
                  {t.navServices}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('projects')} className="hover:text-gold-500 transition-colors">
                  {t.navProjects}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('estimator')} className="hover:text-gold-500 transition-colors">
                  {t.navEstimator}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('tracker')} className="hover:text-gold-500 transition-colors">
                  {t.navTracker}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('careers')} className="hover:text-gold-500 transition-colors">
                  {t.navCareers}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Working Hours */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest relative pb-2 mb-6">
              {t.workingHours}
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gold-500 rounded" />
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <Clock className="text-gold-500 mt-0.5 flex-shrink-0" size={16} />
                <div>
                  <p className="font-semibold text-slate-300">Monday - Friday</p>
                  <p className="text-xs text-slate-400 mt-1">7:00 AM – 5:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 pt-2">
                <MessageCircle className="text-gold-500 mt-0.5 flex-shrink-0" size={16} />
                <div>
                  <p className="font-semibold text-slate-300">Emergency Response</p>
                  <p className="text-xs text-slate-400 mt-1">24/7 Support Available for active maintenance clients.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Contact Details */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest relative pb-2 mb-6">
              {t.contactUs}
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gold-500 rounded" />
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="text-gold-500 mt-0.5 flex-shrink-0" size={16} />
                <span className="text-slate-400 leading-relaxed">
                  Italiestraat 38 unit 5B<br />
                  Aruba
                </span>
              </div>
              <div className="flex flex-col space-y-2 pt-1">
                <div className="flex items-center space-x-3">
                  <Phone className="text-gold-500 flex-shrink-0" size={16} />
                  <a href="tel:+2977308583" className="text-slate-400 hover:text-white transition-colors">
                    +297 730 8583
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-gold-500 flex-shrink-0" size={16} />
                  <a href="tel:+2976629817" className="text-slate-400 hover:text-white transition-colors">
                    +297-662-9817
                  </a>
                </div>
              </div>
              <div className="flex flex-col space-y-2 pt-1 break-all">
                <div className="flex items-center space-x-3">
                  <Mail className="text-gold-500 flex-shrink-0" size={16} />
                  <a href="mailto:m.petronilia@arubahighmaintenance.com" className="text-xs text-gold-400 hover:text-gold-300 font-bold transition-colors">
                    m.petronilia@arubahighmaintenance.com
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-800/80 my-10" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>
            &copy; {currentYear} ARUBA HIGH MAINTENANCE CONTRACTOR. {t.rightsReserved}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button onClick={() => navigateTo('faq')} className="hover:text-slate-300">Privacy Policy</button>
            <button onClick={() => navigateTo('faq')} className="hover:text-slate-300">Terms of Service</button>
            <button onClick={() => navigateTo('faq')} className="hover:text-slate-300">Cookie Preferences</button>
          </div>
        </div>
      </div>

      {/* Back To Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-6 right-6 w-10 h-10 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center text-gold-500 hover:bg-gold-500 hover:text-navy-950 transition-all duration-300 shadow-md group"
        title="Scroll to Top"
      >
        <ArrowUp size={18} className="transform group-hover:-translate-y-0.5 transition-transform" />
      </button>

      {/* Floating contact actions */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      <a
        href={`mailto:${BUSINESS_EMAIL}`}
        className="bg-navy-900 hover:bg-navy-950 text-gold-500 border border-gold-500/40 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
        title="Email us"
        aria-label="Email Aruba High Maintenance"
      >
        <Mail size={26} aria-hidden="true" />
      </a>
      <a
        href={`https://wa.me/${BUSINESS_WHATSAPP}`}
        target="_blank"
        rel="noreferrer"
        className="bg-emerald-500 hover:bg-emerald-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
        title="Chat on WhatsApp"
        aria-label="Chat with Aruba High Maintenance on WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>
      </div>
    </footer>
  );
}
