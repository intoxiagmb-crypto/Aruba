import React from 'react';
import { translations, Language } from '../utils/translations';
import { Phone, Mail, MapPin, Clock, ArrowUp, MessageCircle } from 'lucide-react';

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
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="w-10 h-10 bg-gradient-to-tr from-gold-500 to-orange-500 rounded-lg flex items-center justify-center text-navy-950 font-bold text-lg shadow-md">
                AH
              </div>
              <div className="flex flex-col">
                <span className="text-white font-grotesk font-bold text-lg tracking-wider">
                  ARUBA HIGH
                </span>
                <span className="text-gold-500 font-sans text-xs font-semibold tracking-widest -mt-1 uppercase">
                  Maintenance Contractor
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed pt-2">
              {t.footerAbout}
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-gold-500 hover:border-gold-500/50 transition-all duration-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-gold-500 hover:border-gold-500/50 transition-all duration-300"
              >
                <svg className="w-4 h-4" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-gold-500 hover:border-gold-500/50 transition-all duration-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
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
                  Caya Velp 6<br />
                  San Nicolaas, Aruba
                </span>
              </div>
              <div className="flex flex-col space-y-2 pt-1">
                <div className="flex items-center space-x-3">
                  <Phone className="text-gold-500 flex-shrink-0" size={16} />
                  <a href="tel:+2976602356" className="text-slate-400 hover:text-white transition-colors">
                    +297-660-2356
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
                  <a href="mailto:administrator@arubahighmaintenance.com" className="text-xs text-slate-400 hover:text-white transition-colors">
                    administrator@arubahighmaintenance.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-gold-500 flex-shrink-0" size={16} />
                  <a href="mailto:R.petronilia@arubahighmaintenance.com" className="text-xs text-slate-400 hover:text-white transition-colors">
                    R.petronilia@arubahighmaintenance.com
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

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/2976602356"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 animate-pulse-subtle"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={28} fill="currentColor" className="text-white" />
      </a>
    </footer>
  );
}
