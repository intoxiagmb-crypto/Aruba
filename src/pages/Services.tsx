import React from 'react';
import { Language, translations } from '../utils/translations';
import { Paintbrush, Zap, Droplet, Hammer, Award, Trees, HardHat, Shield, Compass, ChevronRight, HelpCircle } from 'lucide-react';

interface ServicesProps {
  lang: Language;
  setSelectedService: (service: string | null) => void;
  setCurrentPage: (page: string) => void;
}

export default function Services({ lang, setSelectedService, setCurrentPage }: ServicesProps) {
  const t = translations[lang];

  const servicesData = [
    {
      id: 'painting',
      title: lang === 'pap' ? 'Pintura Profesional' : lang === 'nl' ? 'Professioneel Schilderwerk' : 'Professional Painting',
      icon: <Paintbrush size={28} />,
      shortDesc: 'Premium interior and exterior wall painting, protective basecoats, and UV resistant finishes.',
      categories: ['Residential', 'Commercial', 'Salty-Air Protection'],
      color: 'from-amber-500 to-orange-500',
    },
    {
      id: 'electrical',
      title: lang === 'pap' ? 'Instalacion di Electricidad' : lang === 'nl' ? 'Elektrische Installaties' : 'Electrical Installations',
      icon: <Zap size={28} />,
      shortDesc: 'Certified panel installations, cabling, electrical safety certificates, and emergency response.',
      categories: ['High Voltage', 'Safety Checks', '24/7 Support'],
      color: 'from-yellow-500 to-amber-600',
    },
    {
      id: 'plumbing',
      title: lang === 'pap' ? 'Loodgieterswerk & Lek' : lang === 'nl' ? 'Loodgieterswerk & Lekdetectie' : 'Plumbing & Leak Detection',
      icon: <Droplet size={28} />,
      shortDesc: 'Acoustic pipeline inspection, emergency repairs, new plumbing setups, and sewage clearing.',
      categories: ['Leak Detection', 'Piping Work', 'Drain Cleaning'],
      color: 'from-blue-500 to-cyan-600',
    },
    {
      id: 'construction',
      title: lang === 'pap' ? 'Construccion General' : lang === 'nl' ? 'Algemene Bouwwerken' : 'General Construction',
      icon: <Compass size={28} />,
      shortDesc: 'Structural planning, residential and commercial engineering, custom builds, and extensions.',
      categories: ['Planning', 'Architectural Coordination', 'Structural Work'],
      color: 'from-gold-600 to-amber-700',
    },
    {
      id: 'concrete',
      title: lang === 'pap' ? 'Fundeshi & Concreto' : lang === 'nl' ? 'Beton & Funderingen' : 'Concrete & Foundations',
      icon: <Award size={28} />,
      shortDesc: 'Marine-grade load bearing concrete pouring, custom stamp layouts, driveways, and walls.',
      categories: ['Foundations', 'Stamped Concrete', 'Structural Retaining'],
      color: 'from-slate-500 to-slate-700',
    },
    {
      id: 'carpentry',
      title: lang === 'pap' ? 'Carpinteria y Muebles' : lang === 'nl' ? 'Timmerwerk & Keukens' : 'Carpentry & Custom Woodwork',
      icon: <Hammer size={28} />,
      shortDesc: 'Custom cabinetry, hardwood roof framing, doors, furniture design, and interior finishing.',
      categories: ['Cabinetry', 'Roof Frameworks', 'Custom Trim'],
      color: 'from-orange-600 to-red-700',
    },
    {
      id: 'landscaping',
      title: lang === 'pap' ? 'Diseño di Hardin' : lang === 'nl' ? 'Tuinaanleg & Irrigatie' : 'Landscaping & Pool Decks',
      icon: <Trees size={28} />,
      shortDesc: 'Sleek garden designs, resort-style swimming pool surrounds, and automated watering lines.',
      categories: ['Garden Architect', 'Irrigation Lines', 'Decks & Paving'],
      color: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'celltower',
      title: lang === 'pap' ? 'Mantencion di Telecommunication' : lang === 'nl' ? 'Zendmasten & Telecommunicatie' : 'Cell towers maintenance/ installation',
      icon: <HardHat size={28} />,
      shortDesc: 'High altitude mast rigging, safety check audits, rust prevention, painting, and cabling swaps.',
      categories: ['Climbing Riggers', 'Rust Treatment', 'Safety Auditing'],
      color: 'from-red-500 to-navy-700',
    }
  ];

  const navigateToDetail = (serviceId: string) => {
    setSelectedService(serviceId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-24 pb-12 bg-slate-50 dark:bg-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-xs uppercase tracking-widest text-gold-500 font-bold mb-3">
            {lang === 'pap' ? 'Nos Servisionan Principal' : lang === 'nl' ? 'Onze Expertise' : 'Specialized Capabilities'}
          </h1>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            {lang === 'pap' ? 'Solucion Integral pa Bo Propiedad' : lang === 'nl' ? 'Totaaloplossing voor uw Vastgoed' : 'Comprehensive Solutions for Every Structure'}
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-4 leading-relaxed max-w-xl mx-auto">
            From residential touchups to high-risk industrial tower installations, our certified specialists execute each project with absolute safety, marine-grade materials, and live online tracking.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              onClick={() => navigateToDetail(service.id)}
              className="group cursor-pointer bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800/80 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                {/* Icon Circle */}
                <div className={`w-14 h-14 bg-gradient-to-tr ${service.color} rounded-xl flex items-center justify-center text-navy-950 mb-6 shadow-md transition-transform group-hover:rotate-6`}>
                  {service.icon}
                </div>
                
                <h3 className="text-navy-900 dark:text-white font-extrabold text-lg mb-3 group-hover:text-gold-500 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.categories.map((cat, i) => (
                    <span 
                      key={i} 
                      className="bg-slate-100 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action trigger */}
              <div className="border-t border-slate-100 dark:border-slate-850/80 pt-4 flex items-center justify-between">
                <span className="text-gold-500 font-bold text-xs uppercase tracking-widest flex items-center group-hover:translate-x-1 transition-transform">
                  {lang === 'pap' ? 'Lesa Mas' : lang === 'nl' ? 'Dienst Bekijken' : 'Explore Capabilities'} <ChevronRight size={14} className="ml-1" />
                </span>
                <span className="text-slate-300 dark:text-slate-700 text-xl font-bold group-hover:text-gold-500/20">
                  0{index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Cost Callout banner */}
        <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center max-w-4xl mx-auto">
          <div className="absolute inset-0 grid-bg-dark opacity-10 pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <h3 className="text-gold-500 font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-1">
              <Shield size={16} />
              <span>{lang === 'pap' ? 'Estimacion Instantaneo' : lang === 'nl' ? 'Directe Offerte Indicatie' : 'Cost Transparency'}</span>
            </h3>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white font-grotesk">
              {lang === 'pap' ? 'Kalkula e kosto aproksima di bo proyecto' : lang === 'nl' ? 'Bereken direct uw verwachte projectkosten' : 'Want a Fast Estimate Before Booking?'}
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xl mx-auto">
              Our automated cost calculator processes your construction area in square meters, quality levels, and optional services to give you a dynamic, transparent price estimate instantly.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => { setCurrentPage('estimator'); }}
                className="w-full sm:w-auto bg-gradient-to-r from-gold-500 to-orange-500 hover:from-gold-600 hover:to-orange-600 text-navy-950 font-bold px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 text-xs uppercase tracking-wider"
              >
                {lang === 'pap' ? 'Habri Kalkuladó' : lang === 'nl' ? 'Kosten Calculator Openen' : 'Try Cost Estimator'}
              </button>
              <button
                onClick={() => { setCurrentPage('appointment'); }}
                className="w-full sm:w-auto bg-slate-900 text-white font-bold px-8 py-4 rounded-xl border border-slate-800 hover:border-gold-500 transition-colors text-xs uppercase tracking-wider"
              >
                {lang === 'pap' ? 'Toma sita di buki' : lang === 'nl' ? 'Plan Inspectie Gesprek' : 'Book Site Visit Directly'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
