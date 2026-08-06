import React, { useState, useEffect, useRef } from 'react';
import { translations, Language } from '../utils/translations';
import { ArrowRight, Star, Shield, HardHat, Award, CheckCircle, Calendar, Phone, ArrowUpRight, ChevronRight, AlertCircle, Quote, Clock } from 'lucide-react';

interface HomeProps {
  setCurrentPage: (page: string) => void;
  setSelectedService: (service: string | null) => void;
  lang: Language;
}

export default function Home({ setCurrentPage, setSelectedService, lang }: HomeProps) {
  const t = translations[lang];
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeTab, setActiveTab] = useState<'safety' | 'quality' | 'trust'>('safety');
  
  // Stats animation
  const [stats, setStats] = useState({ clients: 0, projects: 0, years: 0, hours: 0 });

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setStats({
        clients: Math.min(Math.round((98 / steps) * step), 98),
        projects: Math.min(Math.round((180 / steps) * step), 180),
        years: Math.min(Math.round((5 / steps) * step), 5),
        hours: Math.min(Math.round((50000 / steps) * step), 50000),
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToService = (serviceId: string) => {
    setSelectedService(serviceId);
    setCurrentPage('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dragging Before/After Slider
  const sliderRef = useRef<HTMLDivElement>(null);
  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  const servicesPreview = [
    {
      id: 'painting',
      title: lang === 'pap' ? 'Pintura Profesional' : lang === 'nl' ? 'Professioneel Schilderwerk' : 'Professional Painting',
      desc: lang === 'pap' ? 'Trabou di pinta di interior y exterior cu materialnan resistente.' : lang === 'nl' ? 'Hoogwaardig binnen- en buitenschilderwerk bestand tegen het tropisch klimaat.' : 'Premium interior and exterior painting tailored to withstand Aruba\'s tropical climate.',
      icon: '🎨',
      bg: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'electrical',
      title: lang === 'pap' ? 'Instalacion de Electricidad' : lang === 'nl' ? 'Elektrische Installaties' : 'Electrical Installations',
      desc: lang === 'pap' ? 'Servicio di coriente residencial y comercial y reparacion inmediato.' : lang === 'nl' ? 'Gecertificeerde installaties, inspecties en noodhulp voor woningen en kantoren.' : 'Safe, certified electrical installations, panels, and emergency troubleshooting.',
      icon: '⚡',
      bg: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'plumbing',
      title: lang === 'pap' ? 'Loodgieterswerk & Lek' : lang === 'nl' ? 'Loodgieterswerk & Lekdetectie' : 'Plumbing & Leak Detection',
      desc: lang === 'pap' ? 'Instalacion di tuberia, drecha leaks y leak detection profesional.' : lang === 'nl' ? 'Geavanceerde akoestische lekdetectie, leidingwerk en sanitair onderhoud.' : 'Advanced acoustic leak detection, pipe replacement, and emergency maintenance.',
      icon: '🚰',
      bg: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'concrete',
      title: lang === 'pap' ? 'Funderings & Concreto' : lang === 'nl' ? 'Fundering & Betonwerk' : 'Foundations & Concrete',
      desc: lang === 'pap' ? 'Trahamento di fundeshi solido, caminda y betòn decorativo.' : lang === 'nl' ? 'Constructief betonwerk, vloeren, opritten en decoratieve afwerkingen.' : 'Solid structural foundations, driveways, retaining walls, and decorative finishes.',
      icon: '🧱',
      bg: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'landscaping',
      title: lang === 'pap' ? 'Landscaping & Piscina' : lang === 'nl' ? 'Tuinarchitectuur & Zwembaden' : 'Landscaping & Pool Areas',
      desc: lang === 'pap' ? 'Diseño di hardin, sistema di muha y area di pool.' : lang === 'nl' ? 'Modern tuinontwerp, automatische irrigatie en luxe zwembadomgevingen.' : 'Complete garden architecture, automated irrigation, and resort-style pool decks.',
      icon: '🌴',
      bg: '/aruba_photos/optimized/dsc09778.jpg'
    },
    {
      id: 'celltower',
      title: lang === 'pap' ? 'Mantencion di Cell Tower' : lang === 'nl' ? 'Zendmast Onderhoud' : 'Cell Tower Maintenance',
      desc: lang === 'pap' ? 'Inspeccion y mantencion structural na haltura cu siguridad estricto.' : lang === 'nl' ? 'Gespecialiseerd structureel onderhoud, inspectie en schilderen van zendmasten.' : 'High-altitude structural inspection, specialized painting, and hardware upgrades.',
      icon: '📡',
      bg: '/cell-tower-repainting.jpg'
    }
  ];

  return (
    <div className="relative overflow-hidden w-full">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-navy-950">
        {/* Visual Background with subtle overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=85" 
            alt="Construction background" 
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/40" />
          <div className="absolute inset-0 grid-bg-dark opacity-40" />
        </div>

        {/* Floating Abstract Shapes */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl animate-pulse-subtle pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse-subtle pointer-events-none" style={{ animationDelay: '1000ms' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-gold-500/10 border border-gold-500/20 px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-ping" />
            <span className="text-gold-500 text-xs font-bold uppercase tracking-wider">
              {lang === 'pap' ? 'Bo Soció di Confiansa' : lang === 'nl' ? 'Uw Betrouwbare Partner' : 'Your Trusted General Contractor'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-grotesk font-extrabold text-white tracking-tight leading-none mb-6">
            ARUBA HIGH <br />
            <span className="text-gold-500 bg-gradient-to-r from-gold-500 to-orange-500 bg-clip-text text-transparent">
              MAINTENANCE
            </span> <br />
            CONTRACTOR
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-base sm:text-xl font-normal leading-relaxed mb-10">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => navigateTo('appointment')}
              className="w-full sm:w-auto bg-gradient-to-r from-gold-500 to-orange-500 hover:from-gold-600 hover:to-orange-600 text-navy-950 font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-gold-500/25 flex items-center justify-center space-x-2 text-sm uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>{t.btnBook}</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigateTo('projects')}
              className="w-full sm:w-auto bg-slate-900/80 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-xl border border-slate-700/80 hover:border-gold-500/50 flex items-center justify-center space-x-2 text-sm uppercase tracking-wider transition-all duration-300"
            >
              <span>{t.btnViewProjects}</span>
              <ArrowUpRight size={16} className="text-gold-500" />
            </button>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
            {[
              { label: lang === 'pap' ? 'Kalkula Kosto' : lang === 'nl' ? 'Bereken Kosten' : 'Cost Calculator', target: 'estimator', icon: '💰' },
              { label: lang === 'pap' ? 'Sigui Proyecto' : lang === 'nl' ? 'Volg Project' : 'Project Tracker', target: 'tracker', icon: '⏱️' },
              { label: lang === 'pap' ? 'Client Hub' : lang === 'nl' ? 'Klant Portaal' : 'Client Dashboard', target: 'dashboard', icon: '💼' },
              { label: lang === 'pap' ? 'FAQ' : lang === 'nl' ? 'Vragen' : 'FAQ & Support', target: 'faq', icon: '💬' },
            ].map((shortcut, i) => (
              <div
                key={i}
                onClick={() => navigateTo(shortcut.target)}
                className="glass-panel-dark hover:border-gold-500/30 p-4 rounded-xl cursor-pointer hover:scale-102 transition-all duration-300 flex items-center space-x-3 text-left group"
              >
                <span className="text-2xl">{shortcut.icon}</span>
                <div>
                  <p className="text-white font-semibold text-xs uppercase tracking-wider group-hover:text-gold-500 transition-colors">
                    {shortcut.label}
                  </p>
                  <span className="text-[10px] text-slate-400 font-bold tracking-widest flex items-center mt-0.5">
                    {lang === 'pap' ? 'KOPPEL' : lang === 'nl' ? 'OPENEN' : 'ACCESS'} <ChevronRight size={10} className="ml-0.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="relative z-10 -mt-8 bg-gradient-to-r from-gold-500 via-amber-500 to-orange-500 py-10 px-4 shadow-2xl rounded-t-2xl sm:rounded-t-3xl max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-navy-950 font-grotesk">
          <div>
            <p className="text-3xl sm:text-5xl font-black">{stats.projects}+</p>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-navy-900 mt-1">
              {lang === 'pap' ? 'Proyectonan Cla' : lang === 'nl' ? 'Projecten Afgerond' : 'Completed Projects'}
            </p>
          </div>
          <div>
            <p className="text-3xl sm:text-5xl font-black">{stats.clients}%</p>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-navy-900 mt-1">
              {lang === 'pap' ? 'Kliente Satisfecho' : lang === 'nl' ? 'Tevreden Klanten' : 'Client Satisfaction'}
            </p>
          </div>
          <div>
            <p className="text-3xl sm:text-5xl font-black">{stats.years}+</p>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-navy-900 mt-1">
              {lang === 'pap' ? 'Aña di Experiencia' : lang === 'nl' ? 'Jaren Ervaring' : 'Years Experience'}
            </p>
          </div>
          <div>
            <p className="text-3xl sm:text-5xl font-black">{stats.hours.toLocaleString()}+</p>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-navy-900 mt-1">
              {lang === 'pap' ? 'Ora di Safe-Work' : lang === 'nl' ? 'Veilige Werkuren' : 'Safe Work Hours'}
            </p>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES */}
      <section className="py-24 bg-slate-50 dark:bg-navy-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-gold-500 font-bold mb-3">
              {lang === 'pap' ? 'Kico Nos Ta Ofrece' : lang === 'nl' ? 'Onze Specialismen' : 'Premium Capabilities'}
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
              {lang === 'pap' ? 'Servisionan Profesional pa Mantencion y Construccion' : lang === 'nl' ? 'Gespecialiseerd Onderhoud & Kwaliteitsbouw' : 'Expert Building & Property Maintenance Services'}
            </h3>
            <div className="w-16 h-1 bg-gold-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesPreview.map((service, index) => (
              <div
                key={service.id}
                onClick={() => navigateToService(service.id)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col h-full"
              >
                {/* Image top with overlay */}
                <div className="h-48 w-full relative overflow-hidden bg-slate-800">
                  <img 
                    src={service.bg} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                  <div className="absolute top-4 left-4 bg-navy-950/85 backdrop-blur-sm text-lg w-10 h-10 rounded-xl flex items-center justify-center shadow-md">
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-navy-900 dark:text-white font-bold text-lg mb-2 group-hover:text-gold-500 transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                      {service.desc}
                    </p>
                  </div>

                  <span className="text-gold-500 font-bold text-xs uppercase tracking-wider flex items-center group-hover:translate-x-1.5 transition-transform">
                    {lang === 'pap' ? 'Mira Detaye' : lang === 'nl' ? 'Dienst Details' : 'View Service'} <ChevronRight size={14} className="ml-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => { setSelectedService(null); navigateTo('services'); }}
              className="bg-navy-900 dark:bg-slate-900 hover:bg-gold-500 hover:text-navy-950 text-gold-500 font-bold px-8 py-3.5 rounded-xl border border-gold-500/30 hover:border-gold-500 transition-all duration-300 text-xs uppercase tracking-wider"
            >
              {lang === 'pap' ? 'Mira Tur Servisio' : lang === 'nl' ? 'Alle Diensten Weergeven' : 'Explore All Services'}
            </button>
          </div>

        </div>
      </section>

      {/* 4. BEFORE/AFTER SLIDER */}
      <section className="py-24 bg-navy-900 text-white relative">
        <div className="absolute inset-0 grid-bg-dark opacity-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Texts */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-xs uppercase tracking-widest text-gold-500 font-bold">
                {lang === 'pap' ? 'Calidad Den Accion' : lang === 'nl' ? 'Kwaliteit In Beeld' : 'Transformation Showcase'}
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold font-grotesk leading-tight tracking-tight">
                {lang === 'pap' ? 'Mira E Diferencia Profesional' : lang === 'nl' ? 'Zie Het Professionele Verschil' : 'Witness the Professional Transformation'}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {lang === 'pap'
                  ? "Nos ta transforma y renoba structuranan bieu of mantene nan na nivel superior. Slide e divider pa asina mira e renobacion y finishment cu nos team a haci."
                  : lang === 'nl'
                  ? "Of het nu gaat om monumentale panden of verwaarloosde muren, ons team restaureert en onderhoudt alles op topniveau. Schuif de balk om het resultaat te bekijken."
                  : "We revive degraded structures, paint weathered exterior walls, and restore architectural integrity. Drag the slider handle to inspect our workmanship before and after renovation."}
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3 text-sm">
                  <CheckCircle className="text-gold-500" size={18} />
                  <span>{lang === 'pap' ? 'Pintura y Reparacion di Structural' : lang === 'nl' ? 'Gevelrestauratie & Schilderwerk' : 'Weatherproofing & Structural Painting'}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <CheckCircle className="text-gold-500" size={18} />
                  <span>{lang === 'pap' ? 'Material anti-salitre di exterior' : lang === 'nl' ? 'Kwalitatieve zout- en vochtbescherming' : 'Salinity & Moisture-Resistant Undercoats'}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigateTo('projects')}
                  className="bg-gradient-to-r from-gold-500 to-orange-500 text-navy-950 font-bold px-6 py-3 rounded-lg shadow-lg text-xs uppercase tracking-wider transition-transform hover:-translate-y-0.5"
                >
                  {lang === 'pap' ? 'Mira Portfolio' : lang === 'nl' ? 'Bekijk Portfolio' : 'View Project Gallery'}
                </button>
              </div>
            </div>

            {/* Right Slider UI */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div 
                ref={sliderRef}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                className="relative w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl cursor-ew-resize select-none"
              >
                {/* AFTER image (Full background) */}
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80" 
                  alt="After Maintenance" 
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable="false"
                />
                <div className="absolute top-4 right-4 bg-emerald-500 text-navy-950 font-black px-3 py-1 rounded text-xs tracking-wider z-20">
                  {lang === 'pap' ? 'DESPUES' : lang === 'nl' ? 'NA' : 'AFTER'}
                </div>

                {/* BEFORE image (Left portion clipping) */}
                <div 
                  className="absolute inset-0 overflow-hidden" 
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80" 
                    alt="Before Maintenance" 
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: sliderRef.current?.getBoundingClientRect().width }}
                    draggable="false"
                  />
                  <div className="absolute top-4 left-4 bg-orange-500 text-white font-black px-3 py-1 rounded text-xs tracking-wider z-20">
                    {lang === 'pap' ? 'ANTES' : lang === 'nl' ? 'VOOR' : 'BEFORE'}
                  </div>
                </div>

                {/* Slider bar & dragging handle */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-gold-500 z-30 cursor-ew-resize"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center text-navy-950 shadow-xl border-4 border-navy-900 font-bold text-lg">
                    ↔
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-4 italic flex items-center">
                <AlertCircle size={12} className="mr-1 text-gold-500 animate-pulse" />
                {lang === 'pap' ? 'Koba e boton memey pa mira diferensia' : lang === 'nl' ? 'Sleep de slider naar links en rechts' : 'Drag the handle to slide between Before and After state'}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Timely Work Standards & Values */}
      <section className="py-24 bg-white dark:bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image section */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-gold-500 rounded-tl-xl pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-gold-500 rounded-br-xl pointer-events-none" />
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" 
                alt="Contractor Team Work" 
                className="w-full h-[450px] object-cover rounded-xl shadow-xl"
              />
            </div>

            {/* Content section */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-xs uppercase tracking-widest text-gold-500 font-bold">
                {lang === 'pap' ? 'Pakico Escoge Nos' : lang === 'nl' ? 'Waarom Aruba High' : 'Why Choose Aruba High'}
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white leading-tight tracking-tight">
                {lang === 'pap' ? 'Seguridad, Kwalidad y Transparencia Garantisa' : lang === 'nl' ? 'Gegarandeerde Veiligheid, Kwaliteit & Transparantie' : 'We Set the Island Standard in Quality Construction'}
              </h3>
              
              {/* Tab Navigation */}
              <div className="flex border-b border-slate-200 dark:border-slate-800 pb-2">
                {[
                  { id: 'safety', label: lang === 'pap' ? 'Seguridad First' : lang === 'nl' ? 'Veiligheid' : 'Strict Safety' },
                  { id: 'quality', label: lang === 'pap' ? 'Excelencia' : lang === 'nl' ? 'Kwaliteit' : 'Work Excellence' },
                  { id: 'trust', label: lang === 'pap' ? 'Transparencia' : lang === 'nl' ? 'Vertrouwen' : 'Transparency' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`mr-6 pb-2 text-sm font-bold uppercase tracking-wider relative transition-colors ${
                      activeTab === tab.id ? 'text-gold-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold-500 rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[140px] animate-fade-in">
                {activeTab === 'safety' && (
                  <div className="space-y-3">
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {lang === 'pap'
                        ? "Seguridad ta nos prome prioridad. Tur nos trahadonan ta sigui training di OSHA y nos ta implementa protocol estricto na tur site, specialmente den mantencion di cell towers y trabou na haltura."
                        : lang === 'nl'
                        ? "Veiligheid staat bij ons voorop. Ons personeel is getraind volgens strikte veiligheidsnormen (OSHA) en we gebruiken gecertificeerd materieel. Dit minimaliseert risico's op elke bouwplaats."
                        : "Safety is woven into our culture. Every technician, plumber, and painter operates under rigorous OSHA protocols. We use certified high-altitude rigging and scaffolding to keep both our workers and your property 100% safe."}
                    </p>
                    <div className="flex items-center space-x-2 text-gold-500 font-bold text-xs">
                      <HardHat size={16} />
                      <span>Zero Incidents Record Since 2021</span>
                    </div>
                  </div>
                )}

                {activeTab === 'quality' && (
                  <div className="space-y-3">
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {lang === 'pap'
                        ? "Nos ta uza materialnan superior resisti contra e salo y solo fuerte di Aruba. For di fundamentonan solido te na pintura fini, nos finishmentnan ta di prome clase."
                        : lang === 'nl'
                        ? "Wij geloven niet in shortcuts. Wij selecteren alleen premium materialen die bestand zijn tegen zoutinwerking en intensieve uv-straling. Uitmuntendheid in elke afwerking."
                        : "We do not compromise. We specify marine-grade paints, structural concrete aggregates, and premium fittings designed to resist Aruba's intense sun and salt-laden air. Our finishes stay fresh for years."}
                    </p>
                    <div className="flex items-center space-x-2 text-gold-500 font-bold text-xs">
                      <Award size={16} />
                      <span>Certified Master Craftsmen & Engineers</span>
                    </div>
                  </div>
                )}

                {activeTab === 'trust' && (
                  <div className="space-y-3">
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {lang === 'pap'
                        ? "Comunicacion cla y oportuno. Nos ta implementa un sistema digital caminda bo por check e progreso di bo proyecto online cualkier momento, cu fotonan y updates directo."
                        : lang === 'nl'
                        ? "Heldere communicatie en geen verborgen kosten. Klanten ontvangen wekelijkse updates. U kunt de status van uw project online volgen via ons klantportaal met foto's en voortgang."
                        : "No surprise costs. We provide comprehensive line-item quotes and structured agreements. Clients can follow project milestones via our interactive online Project Tracker, complete with photo updates."}
                    </p>
                    <div className="flex items-center space-x-2 text-gold-500 font-bold text-xs">
                      <Shield size={16} />
                      <span>100% Transparent Milestone Progress Tracking</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigateTo('about')}
                  className="text-gold-500 hover:text-orange-500 font-bold text-xs uppercase tracking-wider flex items-center space-x-1"
                >
                  <span>{lang === 'pap' ? 'Conose Nos Company mas profundo' : lang === 'nl' ? 'Ontdek Onze Missie & Visie' : 'Discover Our Company Values'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-24 bg-slate-50 dark:bg-navy-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-gold-500 font-bold mb-3">
              {lang === 'pap' ? 'Testimonio' : lang === 'nl' ? 'Klantbeoordelingen' : 'Client Success Stories'}
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
              {lang === 'pap' ? 'Loke Nos Clientenan ta Bisa' : lang === 'nl' ? 'Wat Onze Klanten Vertellen' : 'Highly Recommended Across Aruba'}
            </h3>
            <div className="w-16 h-1 bg-gold-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Eward Richardson',
                role: 'Palm Beach Villa Owner',
                rating: 5,
                text: lang === 'pap'
                  ? "Aruba High Maintenance a haci e pintura exterior y remodelacion di pool di nos villa. E team tawata sumamente profesional, a respeta e schedule y e resultado ta super luhoso!"
                  : lang === 'nl'
                  ? "Aruba High Maintenance deed het buitenschilderwerk en zwembadonderhoud van onze villa. Het team was uiterst professioneel, hield zich aan het schema en het resultaat is prachtig!"
                  : "Aruba High Maintenance handled the exterior painting and pool area remodeling for our villa. The crew was extremely professional, kept the site clean, and delivered luxury finishings."
              },
              {
                name: 'Mariana Tromp',
                role: 'Commercial Facility Manager, Oranjestad',
                rating: 5,
                text: lang === 'pap'
                  ? "Nos tawatin un leak grandi den un edifisio comercial. Loodgieters di Aruba High a uza detectores acustico, a haya e lek den 1 ora y a drecha e mesun dia sin kibra vloer."
                  : lang === 'nl'
                  ? "We hadden een flinke lekkage in ons bedrijfspand. Hun loodgieters vonden het lek binnen een uur met akoestische apparatuur en repareerden het direct. Top service!"
                  : "We had a major water leak in our commercial offices. Their plumbing specialists used acoustic leak detection, pinpointed the issue within an hour, and fixed it the same afternoon."
              },
              {
                name: 'Devin de Veer',
                role: 'Property Manager, Eagle Beach Condo Association',
                rating: 5,
                text: lang === 'pap'
                  ? "Nos ta uza Aruba High pa mantencion mensual y reparacion di emergencia (electricidad y pintura). Nan portal online pa track progreso y download invoices ta haci nos bida hopi facil."
                  : lang === 'nl'
                  ? "We maken gebruik van hun onderhoudsabonnement voor onze appartementen. Het project tracker portaal en de online facturatie besparen ons ontzettend veel tijd."
                  : "We rely on them for monthly maintenance contracts. The ability to track active requests via their online tracker and download structured invoices makes property management stress-free."
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-navy-950 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1 mb-4 text-gold-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <Quote className="text-gold-500/20 absolute right-6 top-6" size={40} />
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed italic relative z-10 mb-6">
                    "{item.text}"
                  </p>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-navy-900 dark:text-white text-sm">{item.name}</h5>
                    <p className="text-[11px] text-slate-400 font-semibold mt-0.5">{item.role}</p>
                  </div>
                  <span className="text-gold-500 bg-gold-500/10 px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider">
                    {lang === 'pap' ? 'Verifica' : lang === 'nl' ? 'Geverifieerd' : 'Verified'}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. CONTACT & MAP WIDGET */}
      <section className="py-24 bg-white dark:bg-navy-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Contact Panel */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-gradient-to-br from-navy-950 to-navy-900 p-8 sm:p-10 rounded-2xl border border-slate-800 relative shadow-2xl">
              <div className="absolute inset-0 grid-bg-dark opacity-10 pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                <h3 className="text-xs font-bold text-gold-500 uppercase tracking-widest">{lang === 'pap' ? 'Hasi Contact' : lang === 'nl' ? 'Neem Contact Op' : 'Get In Touch'}</h3>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {lang === 'pap' ? 'Cuminsa Bo Proyecto Awe' : lang === 'nl' ? 'Start Uw Project Vandaag' : 'Ready to Start Your Construction?'}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {lang === 'pap'
                    ? "Tene contacto cu nos administratornan of Director Coe M. Petronilia pa asina programa bo prome consultacion y estimacion gratis."
                    : lang === 'nl'
                    ? "Neem direct contact met ons op of met directeur Coe M. Petronilia voor een vrijblijvend adviesgesprek en een inspectie op locatie."
                    : "Reach out to our coordinators or CEO & Director Coe M. Petronilia to schedule a site inspection and secure a firm project estimate."}
                </p>
              </div>

              <div className="space-y-4 pt-4 relative z-10">
                <div className="flex items-center space-x-3 text-slate-300">
                  <Phone size={18} className="text-gold-500" />
                  <div className="text-sm flex flex-wrap items-center gap-1.5">
                    <a href="tel:+2977308583" className="font-bold hover:text-gold-500 transition-colors">+297 730 8583</a>
                    <span className="text-slate-600">/</span>
                    <a href="tel:+2976629817" className="font-bold hover:text-gold-500 transition-colors">+297-662-9817</a>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <Phone className="text-emerald-400" size={18} />
                  <a href="https://wa.me/2977308583" target="_blank" rel="noreferrer" className="text-sm font-bold text-emerald-400 hover:underline">
                    WhatsApp Chat Support
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <Clock size={18} className="text-gold-500" />
                  <span className="text-xs font-semibold">Monday - Friday: 7:00 AM – 5:00 PM</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800/80 relative z-10">
                <button
                  onClick={() => navigateTo('appointment')}
                  className="w-full bg-gradient-to-r from-gold-500 to-orange-500 hover:from-gold-600 hover:to-orange-600 text-navy-950 font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center space-x-2 text-xs uppercase tracking-wider transition-all"
                >
                  <Calendar size={14} />
                  <span>{t.btnBook}</span>
                </button>
              </div>
            </div>

            {/* Right Interactive Mock Map Widget */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/80 min-h-[350px] relative shadow-lg">
              {/* Map background style */}
              <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-6 text-center select-none">
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
                
                {/* Simulated Marker */}
                <div className="relative mb-4 group cursor-pointer">
                  <div className="absolute -inset-2 bg-gold-500/20 rounded-full blur-md animate-ping" />
                  <div className="w-14 h-14 bg-navy-950 rounded-2xl flex items-center justify-center border-2 border-gold-500 shadow-xl relative z-10 transition-transform group-hover:scale-110">
                    <span className="text-2xl">📍</span>
                  </div>
                </div>

                <div className="max-w-md relative z-10">
                  <h5 className="text-white font-bold text-lg">ARUBA HIGH MAINTENANCE CONTRACTOR</h5>
                  <p className="text-gold-500 font-semibold text-xs tracking-wider uppercase mt-1">Italiestraat 38 unit 5B, Aruba</p>
                  <p className="text-slate-400 text-xs leading-relaxed mt-3">
                    Our administrative office and equipment depot is centrally situated at Italiestraat 38 unit 5B, serving projects all across Aruba, from Noord and Eagle Beach to Baby Beach.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
                    <a
                      href="https://maps.google.com/?q=Italiestraat+38+unit+5B,+Aruba"
                      target="_blank"
                      rel="noreferrer"
                      className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-colors border border-slate-700"
                    >
                      <span>Open Google Maps</span>
                      <ArrowUpRight size={14} className="text-gold-500" />
                    </a>
                    <button
                      onClick={() => navigateTo('contact')}
                      className="bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors"
                    >
                      {lang === 'pap' ? 'Detaye di Ofisina' : lang === 'nl' ? 'Kantoor Details' : 'Office Details'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
