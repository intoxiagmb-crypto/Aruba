import React from 'react';
import { Language, translations } from '../utils/translations';
import { ArrowLeft, CheckCircle, ChevronRight, Info, AlertTriangle, ShieldCheck, Heart, Wrench } from 'lucide-react';

interface ServiceDetailProps {
  serviceId: string;
  setSelectedService: (service: string | null) => void;
  setCurrentPage: (page: string) => void;
  lang: Language;
}

export default function ServiceDetail({ serviceId, setSelectedService, setCurrentPage, lang }: ServiceDetailProps) {
  const t = translations[lang];

  // Mock database of specific sub-service details
  const servicesContent: Record<string, {
    title: string;
    tagline: string;
    bgImage: string;
    description: string;
    details: string[];
    benefits: string[];
    materials: string[];
    pricing: string;
    faqs: { q: string; a: string }[];
  }> = {
    painting: {
      title: lang === 'pap' ? 'Pintura Profesional' : lang === 'nl' ? 'Professioneel Schilderwerk' : 'Professional Painting',
      tagline: 'High-end aesthetic finishing engineered to resist salinity and blistering.',
      bgImage: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1200&q=80',
      description: 'Aruba\'s marine environment, high humidity, and intense UV index cause normal paint to blister, fade, and peel within months. We provide comprehensive preparation (scraping, high-pressure washing, crack sealing) and apply marine-grade, salt-resistant undercoats and premium weatherproofing paint to guarantee long-term aesthetic beauty.',
      details: [
        'Complete exterior coating & color consultation',
        'Interior painting with zero-VOC, washable paints',
        'High-pressure chemical washing and algae removal',
        'Elastomeric crack filling and stucco repairs',
        'Metal work priming with anti-rust treatment'
      ],
      benefits: [
        '5-Year Anti-Peeling Warranty on exterior finishes',
        'Salt-air blocking protective coat formulas',
        'Uniform thickness spraying and brush techniques'
      ],
      materials: [
        'Sherwin-Williams Loxon Primer & SuperPaint',
        'Benjamin Moore Aura Waterborne Exterior',
        'Premium elastomeric masonry patches'
      ],
      pricing: 'Estimated: $38 – $67 per m² depending on surface prep and paint brand selection.',
      faqs: [
        { q: 'How often should a house in Aruba be repainted?', a: 'Due to the high salt concentration in coastal areas like Palm Beach or Noord, exterior walls should be repainted every 5 to 7 years with premium elastomeric coatings to prevent concrete carbonation.' },
        { q: 'Do you offer color consultations?', a: 'Yes! We supply detailed color books and apply test patches to your walls under local solar light to help you choose the best hues.' }
      ]
    },
    electrical: {
      title: lang === 'pap' ? 'Instalacion di Electricidad' : lang === 'nl' ? 'Elektrische Installaties' : 'Electrical Installations',
      tagline: 'Safe, certified circuitry and emergency maintenance for homes & commercial facilities.',
      bgImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
      description: 'Faulty wiring in tropical salt-air zones is a leading cause of electrical fires and device damage due to corrosion. Our certified electricians handle new property rough-ins, breaker panel upgrades, grounding rod testing, LED installations, and supply 24/7 emergency response for power failures or short circuits.',
      details: [
        'Complete property rewiring and breaker setups',
        'Smart home integration and LED recessed lighting',
        'Grounding tests and surge protection devices',
        'Commercial electrical panel upgrades and maintenance',
        'Elmar Aruba compliance inspections'
      ],
      benefits: [
        '100% compliance with local Elmar regulations',
        'Copper-clad insulated wire protecting against salt oxidation',
        '24/7 emergency support lines for active clients'
      ],
      materials: [
        'THHN/THWN copper conductor wiring',
        'Schneider Electric breaker assemblies',
        'Marine-grade plastic conduit piping'
      ],
      pricing: 'Consultation & Diagnostics: $75 basic dispatch fee. Wiring quoted per linear foot / project size.',
      faqs: [
        { q: 'Do you issue safety certificates for Elmar connection?', a: 'Yes, our head engineer is fully certified to audit, test, and sign off compliance paperwork for Elmar utilities.' },
        { q: 'How do I protect my appliances from voltage fluctuations?', a: 'We install whole-house surge protection blocks directly into your main breaker panel to absorb transient spikes.' }
      ]
    },
    plumbing: {
      title: lang === 'pap' ? 'Loodgieterswerk & Lek' : lang === 'nl' ? 'Loodgieterswerk & Lekdetectie' : 'Plumbing & Leak Detection',
      tagline: 'Advanced acoustic leak detection and corrosion-resistant piping.',
      bgImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80',
      description: 'Hidden pipe leaks cost thousands in Web Aruba water bills. We use advanced electro-acoustic microphones and thermal imaging cameras to find leaks inside walls, concrete slabs, or underground gardens without breaking your beautiful tiles. We also execute pipe replacement, drain cleaning, and hot water heater installs.',
      details: [
        'Acoustic and thermal non-invasive leak detection',
        'PEX and CPVC hot/cold piping system installs',
        'High-pressure hydro-jetting for blocked sewage lines',
        'Sanitary fixtures, toilets, and faucet installs',
        'Solar and tankless water heater maintenance'
      ],
      benefits: [
        'Acoustic technology pinpoints leaks within 6 inches',
        'Corrosion-proof plastic joints preventing tropical oxidation',
        'Quick dispatch and clean-up guarantee'
      ],
      materials: [
        'Uponor PEX-a plumbing tubes',
        'Schedule 80 CPVC piping for high temperature',
        'Acoustic sensor instruments'
      ],
      pricing: 'Acoustic Leak Detection: Starting from $150. Pipeline repairs quoted on inspection.',
      faqs: [
        { q: 'Why is my Web Aruba water bill suddenly high?', a: 'This is usually caused by a silent leak in the main line between the meter and the house, or a running toilet valve. We can find the leak in under an hour.' },
        { q: 'What piping material do you recommend for Aruba?', a: 'We strongly recommend PEX or CPVC. Traditional copper piping corrodes rapidly in Aruba\'s salty atmosphere.' }
      ]
    },
    construction: {
      title: lang === 'pap' ? 'Construccion General' : lang === 'nl' ? 'Algemene Bouwwerken' : 'General Construction',
      tagline: 'Residential and commercial structural builds, extensions, and engineering.',
      bgImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
      description: 'We handle general contracting projects with complete dedication. From pouring reinforced concrete structures to building additions, garages, and commercial offices, our structural engineers and masonry teams ensure top-grade execution. We coordinate permits, sub-trades, and provide online progress updates.',
      details: [
        'New residential homes and commercial builds',
        'Villas extensions, roof additions, and guest houses',
        'Retaining walls, perimeter fencing, and concrete boundary lines',
        'Permit acquisition support with DOW Aruba',
        'Structural steel frame erection and brick masonry'
      ],
      benefits: [
        'DOW-approved licensed engineers',
        'Comprehensive public liability insurance',
        'Weekly digital progress tracking photos'
      ],
      materials: [
        'Reinforced high-strength concrete mixtures',
        'Anti-seismic structural steel rebar',
        'Tropical-grade insulated bricks'
      ],
      pricing: 'Detailed custom quote provided upon reviewing architectural blueprints. Scheduling is typically booked 1-2 months in advance.',
      faqs: [
        { q: 'Do you help with DOW permit applications?', a: 'Yes. We compile engineering blueprints, zoning clearances, and handle filings directly with the Dienst Openbare Werken (DOW).' },
        { q: 'Can I track my construction project remotely?', a: 'Absolutely. We send weekly photos and updates which you can view inside our online Customer Tracker.' }
      ]
    },
    concrete: {
      title: lang === 'pap' ? 'Fundeshi & Concreto' : lang === 'nl' ? 'Beton & Funderingen' : 'Concrete & Foundations',
      tagline: 'High-strength structural pouring and elegant decorative finishes.',
      bgImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
      description: 'Concrete is the backbone of Aruban architecture. We mix and pour premium load-bearing foundations, structural columns, beams, driveways, and parking slabs. We also offer decorative stamped concrete with custom textures (wood-plank, slate, ashlar stone) to create premium pool decks and patios.',
      details: [
        'Load-bearing foundations and structural pillar casting',
        'Premium driveways, pathways, and parking lot pads',
        'Decorative stamped concrete with UV stable coloring',
        'Concrete restoration, crack sealing, and leveling',
        'Erosion-barrier retaining walls'
      ],
      benefits: [
        'Strict PSI compression standards compliance',
        'Rust-inhibited rebar framing layouts',
        'Premium UV color hardeners that do not bleach in sunlight'
      ],
      materials: [
        'Reinforced Portland cement mixes',
        'Glass-fiber reinforcing additives',
        'Sealer resins protecting against water ingress'
      ],
      pricing: 'Standard Driveways: $91 – $151 per m². Stamped concrete: $135 – $237 per m².',
      faqs: [
        { q: 'How long does concrete take to cure?', a: 'While concrete dries to the touch in 24-48 hours, it takes 28 days to reach full structural design strength. Vehicles should not drive on driveways for at least 7 days.' },
        { q: 'Why does concrete crack in Aruba, and how do you prevent it?', a: 'Rapid moisture loss due to trade winds causes cracking. We prevent this by cutting expansion joints at precise intervals and applying curing compounds.' }
      ]
    },
    carpentry: {
      title: lang === 'pap' ? 'Carpinteria y Muebles' : lang === 'nl' ? 'Timmerwerk & Keukens' : 'Carpentry & Custom Woodwork',
      tagline: 'Master carpentry from roof rafters to premium custom kitchen cabinets.',
      bgImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      description: 'We construct beautiful, durable woodwork. Our services cover heavy timber framing for roofs, pergolas, and outdoor gazebos, as well as fine carpentry including custom kitchen cabinets, mahogany doors, built-in wardrobes, and crown moldings.',
      details: [
        'Heavy timber roof trusses and rafter installations',
        'Outdoor pergolas, decks, and poolside gazebos',
        'Custom built-in kitchens, islands, and pantries',
        'Hardwood door hanging and lock integrations',
        'Baseboard trims, casings, and architectural moldings'
      ],
      benefits: [
        'Termite-treated cedar and mahogany wood stock',
        'Stainless-steel fasteners preventing salt rust',
        'Handcrafted precision by senior woodworkers'
      ],
      materials: [
        'Imported kiln-dried pine & cedar wood',
        'Genuine local mahogany and teak',
        'Marine-grade wood glues and varnishes'
      ],
      pricing: 'Quoted on detailed architectural drawings / kitchen design templates.',
      faqs: [
        { q: 'How do you protect wood from termites in Aruba?', a: 'We pre-treat all framing lumber with specialized insecticides and recommend natural termite-resistant hardwoods like Cedar and Teak for outdoor structures.' },
        { q: 'Do you design and install custom kitchens?', a: 'Yes. We draft 3D renders of your kitchen layout, build the cabinets in our workshop, and handle full on-site installation.' }
      ]
    },
    landscaping: {
      title: lang === 'pap' ? 'Diseño di Hardin' : lang === 'nl' ? 'Tuinaanleg & Irrigatie' : 'Landscaping & Pool Decks',
      tagline: 'Lush tropical oasis design, smart water lines, and poolside spaces.',
      bgImage: 'https://images.unsplash.com/photo-1558904541-efa8c1a68f6f?auto=format&fit=crop&w=1200&q=80',
      description: 'Create a paradise in your backyard. We design water-efficient tropical landscapes using native palms, bougainvillea, and cacti that thrive in Aruba. We lay out automated drip irrigation lines, build stamped concrete pool decks, install artificial or natural turf, and install modern outdoor LED lighting.',
      details: [
        'Tropical landscape design and planting arrangements',
        'Smart automated drip irrigation systems',
        'Sod laying and high-grade artificial grass installations',
        'Pool deck tiling, paving, and decorative aggregate slabs',
        'Low-voltage atmospheric outdoor lighting networks'
      ],
      benefits: [
        'Drought-tolerant tropical plant selections',
        'Smart timers saving up to 40% on Web water costs',
        'Resort-grade aesthetics for vacation rentals'
      ],
      materials: [
        'Rain Bird smart irrigation valves',
        'Organic topsoils and volcanic gravel',
        'Waterproof low-voltage brass LED lamps'
      ],
      pricing: 'Irrigation & Landscaping packages start from $1,200 for basic layouts.',
      faqs: [
        { q: 'Which plants grow best in Aruba\'s climate?', a: 'Native plants like Fox Tail Palms, Bougainvillea, Plumeria, Aloe, and Agave are highly recommended because they survive in salt breeze and require minimal watering.' },
        { q: 'Can you automate my watering system?', a: 'Yes, we connect smart WiFi controllers that adjust watering schedules based on temperature and wind speeds.' }
      ]
    },
    celltower: {
      title: lang === 'pap' ? 'Mantencion di Telecommunication' : lang === 'nl' ? 'Zendmasten & Telecommunicatie' : 'Cell Tower Maintenance',
      tagline: 'Certified high-altitude structural maintenance and telecommunication rigging.',
      bgImage: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
      description: 'Telecommunication cell towers in Aruba are highly prone to corrosion due to the salty trade winds. We provide certified high-altitude rigging services including structural inspections, guy-wire testing, bolt replacements, specialized anti-corrosion painting, and microwave antenna alignment. All climbing operations strictly follow OSHA safety regulations.',
      details: [
        'Rigging inspection and guy-wire tension checks',
        'High-altitude specialized painting and rust treatments',
        'Antenna mounts, microwave, and cable swaps',
        'Tower grounding grid testing and lighting checks',
        'Structural safety compliance reports'
      ],
      benefits: [
        'OSHA-certified high-altitude climbers',
        'Specialized marine epoxy coatings preventing iron rust',
        'Strict telecom protocols and safety gear'
      ],
      materials: [
        'Zinc-rich cold galvanizing primers',
        'High-tensile hot-dip galvanized nuts and bolts',
        'Epoxy-polyester hybrid topcoats'
      ],
      pricing: 'Quoted per SLA contracts or cell tower specifications. Contact office for tenders.',
      faqs: [
        { q: 'What safety certifications do your climbers hold?', a: 'All riggers hold active certifications in Tower Climbing Safety & Rescue, OSHA 10/30, and RF Radiation awareness.' },
        { q: 'How do you prevent guy-wire failure?', a: 'We carry out electromagnetic wire rope inspections to find internal wire breakage and perform tension tests at specified intervals.' }
      ]
    }
  };

  const content = servicesContent[serviceId] || servicesContent.painting;

  const navigateToBooking = () => {
    setCurrentPage('appointment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-24 pb-12 bg-slate-50 dark:bg-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={() => setSelectedService(null)}
          className="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400 hover:text-gold-500 transition-colors font-bold text-xs uppercase tracking-wider mb-8"
        >
          <ArrowLeft size={16} />
          <span>{lang === 'pap' ? 'Bala bek na Servisionan' : lang === 'nl' ? 'Terug naar Diensten' : 'Back to Services'}</span>
        </button>

        {/* Hero Area */}
        <div className="relative h-[250px] sm:h-[350px] rounded-3xl overflow-hidden shadow-xl mb-12">
          <img 
            src={content.bgImage} 
            alt={content.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
          
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-2xl text-left">
            <span className="inline-block bg-gold-500 text-navy-950 font-black px-3.5 py-1 rounded-lg text-[10px] uppercase tracking-widest mb-3">
              {lang === 'pap' ? 'Servisio Profesional' : lang === 'nl' ? 'Professionele Dienst' : 'Premium Service'}
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight font-grotesk">
              {content.title}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
              {content.tagline}
            </p>
          </div>
        </div>

        {/* Description & List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3">
                {lang === 'pap' ? 'Descripcion di Servisio' : lang === 'nl' ? 'Dienst Omschrijving' : 'Service Overview'}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {content.description}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">
                {lang === 'pap' ? 'Loke Nos Ta Realisa' : lang === 'nl' ? 'Wat Wij Doen' : 'Key Capabilities'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.details.map((detail, i) => (
                  <div key={i} className="flex items-start space-x-3 text-sm text-slate-600 dark:text-slate-400">
                    <CheckCircle className="text-gold-500 mt-0.5 flex-shrink-0" size={16} />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-6">
                {lang === 'pap' ? 'Preguntanan mas Frecuente' : lang === 'nl' ? 'Veelgestelde Vragen' : 'Service FAQs'}
              </h3>
              <div className="space-y-4">
                {content.faqs.map((faq, i) => (
                  <div key={i} className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl shadow-sm">
                    <h5 className="font-bold text-navy-900 dark:text-white text-sm flex items-start space-x-2">
                      <span className="text-gold-500 font-extrabold">Q:</span>
                      <span>{faq.q}</span>
                    </h5>
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2 pl-5 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Specifications */}
          <div className="lg:col-span-4 space-y-8">
            {/* Call to action booking */}
            <div className="bg-gradient-to-br from-navy-950 to-navy-900 border border-slate-800 p-6 rounded-2xl shadow-xl text-white space-y-6">
              <h4 className="text-gold-500 font-bold uppercase tracking-widest text-xs flex items-center space-x-1">
                <Wrench size={16} />
                <span>Ready to Begin?</span>
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Book a consultation or schedule a technician visit. We will analyze your site and provide a transparent project breakdown.
              </p>
              <button
                onClick={navigateToBooking}
                className="w-full bg-gradient-to-r from-gold-500 to-orange-500 hover:from-gold-600 hover:to-orange-600 text-navy-950 font-bold py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 text-xs uppercase tracking-wider"
              >
                {t.btnBook}
              </button>
            </div>

            {/* Materials Used */}
            <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-md">
              <h4 className="font-bold text-navy-900 dark:text-white text-sm mb-4 flex items-center space-x-2">
                <ShieldCheck className="text-gold-500" size={18} />
                <span>Materials & Standards</span>
              </h4>
              <ul className="space-y-3 text-xs text-slate-500 dark:text-slate-400">
                {content.materials.map((mat, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why choose specifications */}
            <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-md">
              <h4 className="font-bold text-navy-900 dark:text-white text-sm mb-4 flex items-center space-x-2">
                <Heart className="text-gold-500" size={18} />
                <span>Island Benefits</span>
              </h4>
              <ul className="space-y-3 text-xs text-slate-500 dark:text-slate-400">
                {content.benefits.map((ben, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <CheckCircle size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{ben}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Estimated Pricing Card */}
            <div className="bg-gold-500/10 border border-gold-500/20 p-6 rounded-2xl">
              <h4 className="font-bold text-gold-500 text-sm mb-2 flex items-center space-x-1.5">
                <Info size={16} />
                <span>Cost Indicator</span>
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                {content.pricing}
              </p>
              <button
                onClick={() => setCurrentPage('estimator')}
                className="text-gold-500 hover:text-orange-500 font-bold text-[10px] uppercase tracking-wider flex items-center space-x-1 mt-3"
              >
                <span>Run full calculator</span>
                <ChevronRight size={10} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
