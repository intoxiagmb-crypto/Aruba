import React from 'react';
import { Language, translations } from '../utils/translations';
import { Target, Eye, Shield, Users, CheckCircle, FileText, ChevronRight, HardHat, Award } from 'lucide-react';

interface AboutProps {
  lang: Language;
  setCurrentPage: (page: string) => void;
}

export default function About({ lang, setCurrentPage }: AboutProps) {
  const t = translations[lang];

  const milestones = [
    {
      year: '2021',
      title: lang === 'pap' ? 'Fundacion di Company' : lang === 'nl' ? 'Oprichting Bedrijf' : 'Company Foundation',
      desc: lang === 'pap' ? 'Aruba High Maintenance Contractor a wordo fundando pa ofrece servisionan profesional superior.' : lang === 'nl' ? 'Aruba High Maintenance Contractor is opgericht om hoogwaardig onderhoud aan te bieden op het eiland.' : 'Established to address the growing demand for specialized, premium maintenance and certified general contracting across Aruba.'
    },
    {
      year: '2022',
      title: lang === 'pap' ? 'Prome Contrato Comercial' : lang === 'nl' ? 'Eerste Grote Projecten' : 'First Major Commercial Contracts',
      desc: lang === 'pap' ? 'A firma contracts pa mantencion di condominio y hotelnan den area di Palm Beach.' : lang === 'nl' ? 'Beveiliging van langetermijncontracten met grote resorts en appartementencomplexen in Palm Beach.' : 'Secured long-term maintenance contracts for luxury residential associations and resort complexes near Palm Beach.'
    },
    {
      year: '2023',
      title: lang === 'pap' ? 'Division di Cell Tower' : lang === 'nl' ? 'Cell Tower Afdeling' : 'Cell Tower Division Launch',
      desc: lang === 'pap' ? 'A cuminsa haci inspeccion, pintura y mantencion specialisa pa telecom cell towers.' : lang === 'nl' ? 'Uitbreiding met gecertificeerd hoogspannings- en zendmastonderhoud voor telecomaanbieders.' : 'Initiated high-altitude structural maintenance, corrosion treatment, and safety audits for telecommunication providers.'
    },
    {
      year: '2024',
      title: lang === 'pap' ? 'Expansion di Workforce' : lang === 'nl' ? 'Team Uitbreiding' : 'Workforce & Fleet Expansion',
      desc: lang === 'pap' ? 'A adkiri trucknan nobo y ekipo avansa pa concrete, leak detection y pintura.' : lang === 'nl' ? 'Aankoop van zwaar materieel en uitbreiding van het team met gecertificeerde civil engineers en elektriciens.' : 'Doubled our skilled workforce and added modern heavy machinery, acoustic leak detectors, and high-altitude lift equipment.'
    },
    {
      year: '2025',
      title: lang === 'pap' ? 'Digital Client Hub' : lang === 'nl' ? 'Online Klant Portaal' : 'Client Digital Portal Launch',
      desc: lang === 'pap' ? 'A introduci nos portal digital pa asina clientenan por track progreso y download invoices.' : lang === 'nl' ? 'Ontwikkeling van onze online project tracker, waarmee klanten de voortgang live kunnen volgen.' : 'Launched our integrated customer dashboard, giving property owners online project tracking, live photo streams, and invoice downloads.'
    }
  ];

  const handleDownloadProfile = () => {
    // Generate dummy profile download action
    alert(lang === 'pap' 
      ? "Bo Company Profile ta bajando exitosamente! (Mock PDF)" 
      : lang === 'nl' 
      ? "Bedrijfsprofiel download gestart! (Mock PDF)" 
      : "Downloading Aruba High Maintenance Contractor Company Profile... (Mock PDF)"
    );
  };

  return (
    <div className="pt-24 pb-12 bg-slate-50 dark:bg-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-xs uppercase tracking-widest text-gold-500 font-bold mb-3">
            {lang === 'pap' ? 'Conose Nos Company' : lang === 'nl' ? 'Over Ons Bedrijf' : 'Our Identity'}
          </h1>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            {lang === 'pap' ? 'Kwalidad, Confiansa y Excelencia structural' : lang === 'nl' ? 'Bouwen op Kwaliteit en Uiterste Vertrouwen' : 'Building Aruba with Quality, Trust & Excellence'}
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Company Presentation & Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl font-bold text-navy-900 dark:text-white">
              {lang === 'pap' ? 'Contratista y Mantencion di Excelencia' : lang === 'nl' ? 'Uw Toonaangevende Aannemer' : 'Premium Island-Wide Contracting'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              We are a local construction and maintenance company committed to delivering premium quality work across Aruba. Our mission is to provide reliable, transparent, and personalized services through a highly skilled team of professionals. Every project is handled with dedication, precision, and customer satisfaction as our highest priority.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Since our inception in 2021, we have built a reputation for excellence in everything we do, ranging from residential painting to complex concrete work, electrical systems, landscaping, and dangerous high-altitude cell tower maintenance. We treat every structure as if it were our own.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={handleDownloadProfile}
                className="bg-navy-900 dark:bg-slate-900 hover:bg-gold-500 hover:text-navy-950 text-gold-500 font-bold px-6 py-3.5 rounded-xl border border-gold-500/30 hover:border-gold-500 flex items-center space-x-2 text-xs uppercase tracking-wider transition-all duration-300"
              >
                <FileText size={16} />
                <span>{lang === 'pap' ? 'Download Company Profile' : lang === 'nl' ? 'Bedrijfsprofiel Downloaden' : 'Download Company Profile'}</span>
              </button>
              
              <button
                onClick={() => setCurrentPage('contact')}
                className="bg-gradient-to-r from-gold-500 to-orange-500 hover:from-gold-600 hover:to-orange-600 text-navy-950 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 text-xs uppercase tracking-wider"
              >
                {lang === 'pap' ? 'Tene Kontakt' : lang === 'nl' ? 'Contact Opnemen' : 'Contact Our Office'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&h=300&q=80" 
              alt="Concrete foundation work" 
              className="rounded-xl shadow-md object-cover w-full h-48 sm:h-60"
            />
            <img 
              src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=400&h=300&q=80" 
              alt="House Painting" 
              className="rounded-xl shadow-md object-cover w-full h-48 sm:h-60 mt-6"
            />
            <img 
              src="/aruba_photos/optimized/dsc09778.jpg" 
              alt="Luxury garden landscaping" 
              className="rounded-xl shadow-md object-cover w-full h-48 sm:h-60 -mt-6"
            />
            <img 
              src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=400&h=300&q=80" 
              alt="Antenna Tower Inspection" 
              className="rounded-xl shadow-md object-cover w-full h-48 sm:h-60"
            />
          </div>
        </div>

        {/* CEO Message / Letter */}
        <div className="bg-gradient-to-br from-navy-950 to-navy-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl mb-24 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg-dark opacity-10 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="w-40 h-40 rounded-full border-4 border-gold-500 overflow-hidden shadow-2xl bg-slate-800">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80" 
                  alt="CEO R. Petronilia" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-white font-bold text-lg mt-4">R. Petronilia</h4>
              <p className="text-gold-500 text-xs font-semibold uppercase tracking-widest mt-1">CEO & Director</p>
            </div>
            
            <div className="lg:col-span-8 space-y-4 text-slate-300">
              <span className="text-gold-500 font-bold uppercase tracking-widest text-xs">{lang === 'pap' ? 'Mensahe di CEO' : lang === 'nl' ? 'Boodschap van de Directeur' : 'Letter From Our CEO'}</span>
              <h3 className="text-2xl font-bold text-white font-grotesk">{lang === 'pap' ? 'Nos Compromiso na Aruba' : lang === 'nl' ? 'Onze Toewijding op Aruba' : 'Our Commitment to Aruba\'s Integrity'}</h3>
              <p className="text-sm leading-relaxed text-slate-400 italic">
                "Aruba is our home. The island climate—salty ocean breezes, intense tropical UV index, and seasonal trade winds—requires specialized expertise to ensure structures survive and remain aesthetic. We founded Aruba High Maintenance Contractor with a clear vision: to establish a local contracting entity that doesn't believe in cutting corners.
              </p>
              <p className="text-sm leading-relaxed text-slate-400 italic">
                Whether we are painting a beach residence, wiring a shopping mall, pouring structural concrete, or climbing cell towers to protect telecom channels, our team operates with absolute precision. We are honored to serve our community and build long-term relationships based on real transparency, safety, and beautiful craftsmanship."
              </p>
              <div className="pt-2 text-right">
                <span className="font-grotesk text-gold-500 font-bold text-sm tracking-wider">— R. Petronilia, General Manager</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission, Vision, and Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center text-gold-500 mb-6 border border-gold-500/20">
              <Target size={24} />
            </div>
            <h4 className="text-navy-900 dark:text-white font-bold text-lg mb-3">Our Mission</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Deliver the highest quality workmanship while building long-term relationships based on trust, transparency, professionalism, and excellence across Aruba.
            </p>
          </div>

          <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center text-gold-500 mb-6 border border-gold-500/20">
              <Eye size={24} />
            </div>
            <h4 className="text-navy-900 dark:text-white font-bold text-lg mb-3">Our Vision</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Become Aruba's most trusted construction and maintenance company, widely recognized for our innovation, environmental sustainability, and exceptional customer service.
            </p>
          </div>

          <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center text-gold-500 mb-6 border border-gold-500/20">
              <Shield size={24} />
            </div>
            <h4 className="text-navy-900 dark:text-white font-bold text-lg mb-3">Core Values</h4>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400 text-sm">
              <li className="flex items-center space-x-2">
                <CheckCircle size={14} className="text-gold-500" />
                <span>Absolute Workmanship Quality</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle size={14} className="text-gold-500" />
                <span>OSHA-Aligned Safety Standards</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle size={14} className="text-gold-500" />
                <span>Honest Pricing & Live Tracking</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle size={14} className="text-gold-500" />
                <span>Certified Skillsets & Staffing</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Milestones Timeline */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="text-xs uppercase tracking-widest text-gold-500 font-bold mb-3">{lang === 'pap' ? 'Historia di Exito' : lang === 'nl' ? 'Bedrijfsgeschiedenis' : 'Our Milestones'}</h3>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">{lang === 'pap' ? 'Nos Crecemento Transcurso di Añanan' : lang === 'nl' ? 'Onze Ontwikkeling Door de Jaren Heen' : 'Our Journey and Progression'}</h4>
            <div className="w-12 h-0.5 bg-gold-500 mx-auto mt-3" />
          </div>

          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 max-w-3xl mx-auto pl-6 sm:pl-8 space-y-12">
            {milestones.map((milestone, i) => (
              <div key={i} className="relative group">
                {/* Bullet node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 bg-navy-950 rounded-full border-4 border-gold-500 z-10 transition-transform group-hover:scale-125" />
                
                {/* Content Box */}
                <div className="glass-panel dark:bg-navy-900/40 p-6 rounded-2xl hover:border-gold-500/20 transition-all duration-300">
                  <span className="inline-block bg-gold-500/10 border border-gold-500/20 text-gold-500 font-grotesk font-black px-3 py-1 rounded text-sm mb-3">
                    {milestone.year}
                  </span>
                  <h5 className="text-navy-900 dark:text-white font-bold text-base mb-1">
                    {milestone.title}
                  </h5>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {milestone.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
