import React, { useState, useEffect } from 'react';
import { Language, translations } from '../utils/translations';
import { Calculator, Info, Shield, HelpCircle, ChevronRight, Check } from 'lucide-react';

interface CostEstimatorProps {
  lang: Language;
  setCurrentPage: (page: string) => void;
}

export default function CostEstimator({ lang, setCurrentPage }: CostEstimatorProps) {
  const t = translations[lang];

  // Options states
  const [service, setService] = useState<'painting' | 'concrete' | 'landscaping'>('painting');
  const [subType, setSubType] = useState<string>('exterior');
  const [sqft, setSqft] = useState<number>(1000);
  const [quality, setQuality] = useState<'standard' | 'premium' | 'marine'>('premium');
  const [prep, setPrep] = useState<'low' | 'medium' | 'high'>('medium');

  // Outputs
  const [calcResult, setCalcResult] = useState({
    materials: 0,
    labor: 0,
    totalMin: 0,
    totalMax: 0
  });

  // Re-run calculation whenever options change
  useEffect(() => {
    let baseRatePerSqft = 0;
    
    // Service base calculations
    if (service === 'painting') {
      baseRatePerSqft = subType === 'interior' ? 2.50 : 3.80;
    } else if (service === 'concrete') {
      if (subType === 'foundation') baseRatePerSqft = 12.00;
      else if (subType === 'stamped') baseRatePerSqft = 14.50;
      else baseRatePerSqft = 8.00; // driveway
    } else if (service === 'landscaping') {
      if (subType === 'full') baseRatePerSqft = 6.50;
      else if (subType === 'irrigation') baseRatePerSqft = 2.00;
      else baseRatePerSqft = 4.50; // pool deck pavers
    }

    // Adjust for Material Quality (multipliers)
    let qualityMultiplier = 1;
    if (quality === 'standard') qualityMultiplier = 0.85;
    else if (quality === 'marine') qualityMultiplier = 1.35; // Salt air premium grade

    // Adjust for Surface Preparation difficulty
    let prepOffset = 0;
    if (prep === 'low') prepOffset = -0.30;
    else if (prep === 'high') prepOffset = 0.65; // heavy stripping, re-leveling

    // Calculate
    const rate = (baseRatePerSqft * qualityMultiplier) + prepOffset;
    const computedBase = rate * sqft;

    // Split materials & labor roughly
    const materialsRatio = service === 'concrete' ? 0.55 : 0.40;
    const matCost = computedBase * materialsRatio;
    const labCost = computedBase * (1 - materialsRatio);
    
    // Create range (margin of variance)
    const variance = computedBase * 0.10; // +/- 10%
    const minVal = Math.round(computedBase - variance);
    const maxVal = Math.round(computedBase + variance);

    setCalcResult({
      materials: Math.round(matCost),
      labor: Math.round(labCost),
      totalMin: minVal,
      totalMax: maxVal
    });

  }, [service, subType, sqft, quality, prep]);

  const handleBookWithEstimate = () => {
    alert(lang === 'pap'
      ? `Bo estimacion di $${calcResult.totalMin.toLocaleString()} - $${calcResult.totalMax.toLocaleString()} a wordo karga! Nos ta hibabo na e portal di sita.`
      : lang === 'nl'
      ? `Uw berekening van $${calcResult.totalMin.toLocaleString()} - $${calcResult.totalMax.toLocaleString()} is opgeslagen! We sturen u door naar het afsprakenportaal.`
      : `Your estimate of $${calcResult.totalMin.toLocaleString()} - $${calcResult.totalMax.toLocaleString()} has been saved! Redirecting to appointment booking.`
    );
    setCurrentPage('appointment');
  };

  return (
    <div className="pt-24 pb-12 bg-slate-50 dark:bg-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-xs uppercase tracking-widest text-gold-500 font-bold mb-3">Cost Estimator</h1>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            Instant Quote Calculator
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
            Get an instant, transparent pricing guideline tailored to your square footage and materials requirements. No sign-up required.
          </p>
        </div>

        {/* Calculator layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-6xl mx-auto">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-850 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              {/* 1. Select Service Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">1. Core Service</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'painting', label: 'Painting' },
                    { id: 'concrete', label: 'Concrete' },
                    { id: 'landscaping', label: 'Landscaping' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setService(opt.id as any);
                        setSubType(opt.id === 'painting' ? 'exterior' : opt.id === 'concrete' ? 'driveway' : 'full');
                      }}
                      className={`py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
                        service === opt.id
                          ? 'bg-gold-500 border-gold-500 text-navy-950 shadow-md'
                          : 'bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-gold-500/30'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Sub-Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">2. Project Sub-Category</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {service === 'painting' && (
                    <>
                      <button
                        type="button"
                        onClick={() => setSubType('exterior')}
                        className={`py-2 px-3 rounded-lg border text-xs font-semibold ${subType === 'exterior' ? 'bg-navy-950 text-gold-500 border-gold-500' : 'bg-slate-550 dark:bg-navy-950 border-slate-200 dark:border-slate-800 text-slate-400'}`}
                      >
                        Exterior Painting
                      </button>
                      <button
                        type="button"
                        onClick={() => setSubType('interior')}
                        className={`py-2 px-3 rounded-lg border text-xs font-semibold ${subType === 'interior' ? 'bg-navy-950 text-gold-500 border-gold-500' : 'bg-slate-550 dark:bg-navy-950 border-slate-200 dark:border-slate-800 text-slate-400'}`}
                      >
                        Interior Painting
                      </button>
                    </>
                  )}
                  {service === 'concrete' && (
                    <>
                      <button
                        type="button"
                        onClick={() => setSubType('driveway')}
                        className={`py-2 px-3 rounded-lg border text-xs font-semibold ${subType === 'driveway' ? 'bg-navy-950 text-gold-500 border-gold-500' : 'bg-slate-550 dark:bg-navy-950 border-slate-200 dark:border-slate-800 text-slate-400'}`}
                      >
                        Driveway Slab
                      </button>
                      <button
                        type="button"
                        onClick={() => setSubType('foundation')}
                        className={`py-2 px-3 rounded-lg border text-xs font-semibold ${subType === 'foundation' ? 'bg-navy-950 text-gold-500 border-gold-500' : 'bg-slate-550 dark:bg-navy-950 border-slate-200 dark:border-slate-800 text-slate-400'}`}
                      >
                        Load Foundation
                      </button>
                      <button
                        type="button"
                        onClick={() => setSubType('stamped')}
                        className={`py-2 px-3 rounded-lg border text-xs font-semibold ${subType === 'stamped' ? 'bg-navy-950 text-gold-500 border-gold-500' : 'bg-slate-550 dark:bg-navy-950 border-slate-200 dark:border-slate-800 text-slate-400'}`}
                      >
                        Stamped Concrete
                      </button>
                    </>
                  )}
                  {service === 'landscaping' && (
                    <>
                      <button
                        type="button"
                        onClick={() => setSubType('full')}
                        className={`py-2 px-3 rounded-lg border text-xs font-semibold ${subType === 'full' ? 'bg-navy-950 text-gold-500 border-gold-500' : 'bg-slate-550 dark:bg-navy-950 border-slate-200 dark:border-slate-800 text-slate-400'}`}
                      >
                        Full Garden Design
                      </button>
                      <button
                        type="button"
                        onClick={() => setSubType('irrigation')}
                        className={`py-2 px-3 rounded-lg border text-xs font-semibold ${subType === 'irrigation' ? 'bg-navy-950 text-gold-500 border-gold-500' : 'bg-slate-550 dark:bg-navy-950 border-slate-200 dark:border-slate-800 text-slate-400'}`}
                      >
                        Irrigation Setup
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* 3. Square footage slider */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                  <span>3. Square Footage (Size)</span>
                  <span className="text-gold-500 font-mono font-black text-sm">{sqft.toLocaleString()} SQ. FT.</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="50"
                  value={sqft}
                  onChange={(e) => setSqft(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>100 SQ. FT.</span>
                  <span>5,000 SQ. FT.</span>
                  <span>10,000 SQ. FT.</span>
                </div>
              </div>

              {/* 4. Material Quality selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">4. Material Standard</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'standard', title: 'Standard Grade', desc: 'Standard building materials.' },
                    { id: 'premium', title: 'Premium Grade', desc: 'Higher longevity, uv-stable.' },
                    { id: 'marine', title: 'Marine-Grade (Salinity)', desc: 'Salt air resistant, maximum life.' }
                  ].map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setQuality(opt.id as any)}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        quality === opt.id
                          ? 'border-gold-500 bg-gold-500/5 text-navy-950 dark:text-white'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-950 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      <div>
                        <p className={`text-xs font-bold uppercase tracking-wider ${quality === opt.id ? 'text-gold-500' : 'text-slate-600 dark:text-slate-400'}`}>
                          {opt.title}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1 leading-normal">{opt.desc}</p>
                      </div>
                      <div className="flex justify-end mt-4">
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          quality === opt.id ? 'border-gold-500 bg-gold-500 text-navy-950' : 'border-slate-300 dark:border-slate-700'
                        }`}>
                          {quality === opt.id && <Check size={10} strokeWidth={3} />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Surface preparation */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">5. On-site Preparation Needs</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'low', label: 'Minimal' },
                    { id: 'medium', label: 'Moderate' },
                    { id: 'high', label: 'Heavy Prep' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPrep(opt.id as any)}
                      className={`py-2 px-3 rounded-lg border text-xs font-semibold ${
                        prep === opt.id
                          ? 'bg-navy-950 text-gold-500 border-gold-500'
                          : 'bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-navy-950 to-navy-900 border border-slate-800 p-8 rounded-3xl shadow-2xl text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 grid-bg-dark opacity-10 pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center space-x-2 text-gold-500">
                <Calculator size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">Pricing Overview</span>
              </div>
              
              <div className="border-b border-slate-800 pb-6 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Estimated Total Range</span>
                <span className="text-3xl sm:text-4xl font-extrabold font-grotesk text-gold-500 block mt-2">
                  ${calcResult.totalMin.toLocaleString()} – ${calcResult.totalMax.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">Calculated in USD (Aruban Florin equivalent available)</span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Materials</span>
                  <span className="font-bold text-white">${calcResult.materials.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Labor</span>
                  <span className="font-bold text-white">${calcResult.labor.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Area size</span>
                  <span className="font-bold text-white">{sqft} sq. ft.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Material Standard</span>
                  <span className="font-bold text-white capitalize">{quality}</span>
                </div>
              </div>
            </div>

            {/* Book & Terms */}
            <div className="pt-8 border-t border-slate-800 relative z-10 space-y-4">
              <button
                onClick={handleBookWithEstimate}
                className="w-full bg-gradient-to-r from-gold-500 to-orange-500 hover:from-gold-600 hover:to-orange-600 text-navy-950 font-bold py-4 rounded-xl shadow-lg hover:shadow-orange-500/10 flex items-center justify-center space-x-1.5 text-xs uppercase tracking-wider transition-all"
              >
                <span>Book consultation with this estimate</span>
                <ChevronRight size={14} />
              </button>
              
              <div className="flex items-start space-x-2 text-[10px] text-slate-500 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
                <Info size={14} className="text-gold-500 flex-shrink-0 mt-0.5" />
                <span>
                  This estimate is a guideline based on normal island material rates and does not constitute a legal binding contract. A physical site survey is required to finalize structural dimensions.
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
