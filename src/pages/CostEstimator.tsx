import React, { useState, useEffect } from 'react';
import { Language } from '../utils/translations';
import { 
  Calculator, 
  Info, 
  Shield, 
  HelpCircle, 
  ChevronRight, 
  Check, 
  Building2, 
  Maximize2, 
  Award, 
  Briefcase, 
  Calendar, 
  Download, 
  Phone, 
  Clock, 
  Sparkles,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CostEstimatorProps {
  lang: Language;
  setCurrentPage: (page: string) => void;
}

const localTranslations = {
  en: {
    title: "Cost Estimator",
    subtitle: "Instant Quote Calculator",
    description: "Get an instant, transparent pricing guideline tailored to your project area and materials. No sign-up required.",
    projectType: "Project Type",
    constructionArea: "Construction Area (m²)",
    qualityLevel: "Quality Level",
    additionalServices: "Additional Services (Optional)",
    estCompletionTime: "Estimated Completion Time",
    estTotalCost: "Total Estimated Cost",
    constructionRate: "Construction Rate: AWG 2,600 / m²",
    calculating: "Calculating...",
    validationErrorArea: "Area must be greater than 0.",
    validationErrorNumeric: "Only numeric values are allowed.",
    validationErrorRequired: "Area is required.",
    resultOverview: "Pricing Overview",
    resultArea: "Project Area",
    resultRate: "Price per m²",
    resultTotal: "Estimated Total",
    resultDuration: "Estimated Duration",
    rateUnit: "per m²",
    btnBook: "Book Appointment",
    btnPDF: "Download Estimate PDF",
    btnContact: "Contact Our Team",
    btnQuote: "Request a Quote",
    disclaimer: "This estimate is a guideline based on normal island material rates and does not constitute a legal binding contract. A physical site survey is required to finalize structural dimensions.",
    // Project types
    typeRes: "Residential Home Construction",
    typeVilla: "Villa & Luxury Home",
    typeComm: "Commercial Building",
    typeGuest: "Guest House / Apartment",
    typeReno: "Renovation & Remodeling",
    // Quality descriptions
    qualStd: "Standard",
    qualStdDesc: "Standard quality island-grade materials.",
    qualPrem: "Premium",
    qualPremDesc: "Higher longevity, UV-stable finishes.",
    qualLux: "Luxury",
    qualLuxDesc: "Top-tier custom imports & salt-air resistance.",
    // Additional services
    serviceArch: "Architectural & Structural Drafting",
    serviceInt: "Interior Architecture & Fitting",
    serviceLand: "Resort-style Landscaping & Paving",
    servicePermit: "Permit Management & Utility Setup",
    // Booking alert
    bookingAlert: "Your estimate of {total} has been saved! Redirecting to appointment booking.",
    quoteAlert: "Quote request initiated for a {area} m² {type} project.",
  },
  pap: {
    title: "Kalkuladó di Kosto",
    subtitle: "Kalkulador di Kotisashon Instantáneo",
    description: "Obtené un guia di preis transparente i instantáneo adaptá na e área i materialnan di bo proyekto. No tin mester di registra.",
    projectType: "Tipo di Proyekto",
    constructionArea: "Área di Konstrukshon (m²)",
    qualityLevel: "Nivel di Kwalidad",
    additionalServices: "Servisionan Adishonal (Opsional)",
    estCompletionTime: "Tiempo di Kompletashon Estimá",
    estTotalCost: "Kosto Total Estimá",
    constructionRate: "Tarifa di Konstrukshon: AWG 2,600 / m²",
    calculating: "Kalkulando...",
    validationErrorArea: "Área mester ta mas grandi ku 0.",
    validationErrorNumeric: "Kwantidat numeriko so ta permití.",
    validationErrorRequired: "Área ta nesesario.",
    resultOverview: "Resúmen di Preis",
    resultArea: "Área di Proyekto",
    resultRate: "Preis pa m²",
    resultTotal: "Kosto Total Estimá",
    resultDuration: "Durashon Estimá",
    rateUnit: "pa m²",
    btnBook: "Toma un Sita di Buki",
    btnPDF: "Download Estimacion PDF",
    btnContact: "Tene Kontakt cu Nos",
    btnQuote: "Pidi Kotisashon",
    disclaimer: "E estimacion aki ta un guia basá riba tarifanan normal di material di isla i no ta constitui un contrato legal vinculante. Un inspeccion fisico na e sitio ta necesario pa finalisa e dimensionnan structural.",
    typeRes: "Konstrukshon di Kas Residencial",
    typeVilla: "Villa i Kas di Lukso",
    typeComm: "Edifisio Komersial",
    typeGuest: "Kas di Huespet / Apartamento",
    typeReno: "Renovashon i Remodela",
    qualStd: "Standard",
    qualStdDesc: "Materialnan di konstrukshon standard pa isla.",
    qualPrem: "Premium",
    qualPremDesc: "Kwalidad haltu, resistente na solo y UV.",
    qualLux: "Lukso",
    qualLuxDesc: "Materialnan superior importa y resistente na salo.",
    serviceArch: "Planifikashon i Diseño Arquitectónico",
    serviceInt: "Diseño di Interior i Finish",
    serviceLand: "Hardin i Pavimentashon di Lukso",
    servicePermit: "Gestion di Permiso i Inspeccion",
    bookingAlert: "Bo estimacion di {total} a wordo karga! Nos ta hibabo na e portal di sita.",
    quoteAlert: "Kotisashon a wordo inicia pa un proyecto di {area} m² di tipo {type}.",
  },
  nl: {
    title: "Kosten Calculator",
    subtitle: "Directe Offerte Calculator",
    description: "Ontvang een directe, transparante prijsindicatie op basis van uw projectoppervlakte en materialen. Geen registratie vereist.",
    projectType: "Projecttype",
    constructionArea: "Bouwoppervlakte (m²)",
    qualityLevel: "Kwaliteitsniveau",
    additionalServices: "Aanvullende Diensten (Optioneel)",
    estCompletionTime: "Geschatte Bouwtijd",
    estTotalCost: "Totale Geschatte Kosten",
    constructionRate: "Bouwtarief: AWG 2,600 / m²",
    calculating: "Berekenen...",
    validationErrorArea: "Oppervlakte moet groter zijn dan 0.",
    validationErrorNumeric: "Alleen numerieke waarden zijn toegestaan.",
    validationErrorRequired: "Oppervlakte is verplicht.",
    resultOverview: "Prijs Overzicht",
    resultArea: "Project Oppervlakte",
    resultRate: "Prijs per m²",
    resultTotal: "Geschatte Totaal",
    resultDuration: "Geschatte Duur",
    rateUnit: "per m²",
    btnBook: "Afspraak Inplannen",
    btnPDF: "Download Offerte PDF",
    btnContact: "Neem Contact Op",
    btnQuote: "Offerte Aanvragen",
    disclaimer: "Deze berekening is een indicatie op basis van reguliere materiaaltarieven op het eiland en is geen juridisch bindend contract. Een fysieke inspectie op locatie is vereist om de definitieve structurele afmetingen vast te leggen.",
    typeRes: "Woningbouw",
    typeVilla: "Villa & Luxe Woning",
    typeComm: "Bedrijfspand",
    typeGuest: "Gastenverblijf / Appartement",
    typeReno: "Renovatie & Verbouw",
    qualStd: "Standaard",
    qualStdDesc: "Standaard eiland-kwaliteit bouwmaterialen.",
    qualPrem: "Premium",
    qualPremDesc: "Hogere levensduur, UV-bestendige afwerking.",
    qualLux: "Luxe",
    qualLuxDesc: "Exclusieve importmaterialen & maximale zoutbestendigheid.",
    serviceArch: "Architectonisch Ontwerp & Tekening",
    serviceInt: "Interieurarchitectuur & Afwerking",
    serviceLand: "Tuinaanleg & Bestrating",
    servicePermit: "Vergunningsaanvraag & Keuringen",
    bookingAlert: "Uw berekening van {total} is opgeslagen! We sturen u door naar het afsprakenportaal.",
    quoteAlert: "Offerteaanvraag gestart voor een {area} m² {type} project.",
  }
};

export default function CostEstimator({ lang, setCurrentPage }: CostEstimatorProps) {
  const t = localTranslations[lang] || localTranslations.en;

  // Option States
  const [projectType, setProjectType] = useState<'residential' | 'villa' | 'commercial' | 'guesthouse' | 'renovation'>('residential');
  const [areaText, setAreaText] = useState<string>('150');
  const [quality, setQuality] = useState<'standard' | 'premium' | 'luxury'>('standard');
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);

  // Calculation Results
  const [ratePerM2, setRatePerM2] = useState<number>(2600);
  const [totalCost, setTotalCost] = useState<number>(390000);
  const [durationText, setDurationText] = useState<string>('4 - 6 Months');
  
  // UX / State indicators
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Live calculation triggered on option changes
  useEffect(() => {
    // 1. Validation check
    if (!areaText.trim()) {
      setValidationError(t.validationErrorRequired);
      setTotalCost(0);
      return;
    }

    if (!/^\d+(\.\d+)?$/.test(areaText)) {
      setValidationError(t.validationErrorNumeric);
      setTotalCost(0);
      return;
    }

    const areaNum = parseFloat(areaText);
    if (areaNum <= 0) {
      setValidationError(t.validationErrorArea);
      setTotalCost(0);
      return;
    }

    setValidationError(null);
    setIsCalculating(true);

    // Simulate premium calculations delay
    const calcTimer = setTimeout(() => {
      // Rates and Multipliers
      const BASE_RATE = 2600; // AWG per m2 (default)

      // Project Type Factors
      let typeMultiplier = 1.0;
      if (projectType === 'villa') typeMultiplier = 1.35;
      else if (projectType === 'commercial') typeMultiplier = 1.20;
      else if (projectType === 'guesthouse') typeMultiplier = 0.90;
      else if (projectType === 'renovation') typeMultiplier = 0.60;

      // Quality Multipliers
      let qualityMultiplier = 1.0;
      if (quality === 'premium') qualityMultiplier = 1.25;
      else if (quality === 'luxury') qualityMultiplier = 1.55;

      // Rate per m2 calculation
      const calculatedRate = Math.round(BASE_RATE * typeMultiplier * qualityMultiplier);
      setRatePerM2(calculatedRate);

      // Additional services rates per m2 or flat rates
      let servicesPerM2Cost = 0;
      let flatServicesCost = 0;

      additionalServices.forEach(service => {
        if (service === 'design') servicesPerM2Cost += 120; // Arch design rate per m2
        else if (service === 'interior') servicesPerM2Cost += 80; // Interior design rate per m2
        else if (service === 'landscape') servicesPerM2Cost += 50; // Landscape design rate per m2
        else if (service === 'permits') flatServicesCost += 3500; // Permits flat fee
      });

      // Total Cost calculation
      const baseCost = areaNum * calculatedRate;
      const servicesCost = (areaNum * servicesPerM2Cost) + flatServicesCost;
      const computedTotal = Math.round(baseCost + servicesCost);
      setTotalCost(computedTotal);

      // Duration estimation based on area size
      let duration = '';
      if (lang === 'pap') {
        if (areaNum < 50) duration = '2 - 4 Luna';
        else if (areaNum <= 150) duration = '4 - 6 Luna';
        else if (areaNum <= 300) duration = '6 - 9 Luna';
        else if (areaNum <= 600) duration = '9 - 12 Luna';
        else duration = '12 - 18 Luna';
      } else if (lang === 'nl') {
        if (areaNum < 50) duration = '2 - 4 Maanden';
        else if (areaNum <= 150) duration = '4 - 6 Maanden';
        else if (areaNum <= 300) duration = '6 - 9 Maanden';
        else if (areaNum <= 600) duration = '9 - 12 Maanden';
        else duration = '12 - 18 Maanden';
      } else {
        if (areaNum < 50) duration = '2 - 4 Months';
        else if (areaNum <= 150) duration = '4 - 6 Months';
        else if (areaNum <= 300) duration = '6 - 9 Months';
        else if (areaNum <= 600) duration = '9 - 12 Months';
        else duration = '12 - 18 Months';
      }
      setDurationText(duration);

      setIsCalculating(false);
    }, 350);

    return () => clearTimeout(calcTimer);
  }, [projectType, areaText, quality, additionalServices, lang, t]);

  const formatCurrency = (val: number) => {
    return `AWG ${val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const handleBookWithEstimate = () => {
    const formatted = formatCurrency(totalCost);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
    alert(t.bookingAlert.replace('{total}', formatted));
    setCurrentPage('appointment');
  };

  const handleRequestQuote = () => {
    const typeLabel = t[`type${projectType.charAt(0).toUpperCase() + projectType.slice(1)}` as keyof typeof t] || projectType;
    alert(t.quoteAlert.replace('{area}', areaText).replace('{type}', typeLabel));
  };

  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const areaNum = parseFloat(areaText) || 0;
    const totalCostFormatted = formatCurrency(totalCost);
    const rateFormatted = formatCurrency(ratePerM2);
    
    const typeLabel = t[`type${projectType.charAt(0).toUpperCase() + projectType.slice(1)}` as keyof typeof t] || projectType;
    const qualityLabel = t[`qual${quality.charAt(0).toUpperCase() + quality.slice(1)}` as keyof typeof t] || quality;

    printWindow.document.write(`
      <html>
        <head>
          <title>Aruba High Maintenance - Cost Estimate</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; color: #0f172a; margin: 40px; line-height: 1.6; }
            .header { border-bottom: 3px solid #d97706; padding-bottom: 20px; margin-bottom: 35px; display: flex; justify-content: space-between; align-items: center; }
            .title { font-size: 26px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; }
            .logo { font-size: 20px; font-weight: 900; color: #d97706; }
            .meta-info { margin-bottom: 30px; font-size: 14px; color: #475569; display: flex; justify-content: space-between; }
            .meta-left { flex: 1; }
            .meta-right { text-align: right; }
            .grid { display: grid; grid-template-cols: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
            .card { border: 1px solid #e2e8f0; padding: 15px; border-radius: 12px; background-color: #f8fafc; }
            .card-title { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: bold; margin-bottom: 6px; letter-spacing: 0.5px; }
            .card-value { font-size: 18px; font-weight: bold; color: #0f172a; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 35px; }
            th { background-color: #0f172a; color: white; text-align: left; padding: 14px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
            td { border-bottom: 1px solid #e2e8f0; padding: 14px; font-size: 14px; color: #334155; }
            .total-row td { font-weight: bold; font-size: 18px; border-top: 2px solid #0f172a; color: #0f172a; }
            .disclaimer { font-size: 11px; color: #64748b; line-height: 1.6; border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 40px; }
            .print-btn { background-color: #d97706; color: white; border: none; padding: 12px 24px; font-size: 14px; font-weight: bold; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
            .print-btn:hover { background-color: #b45309; }
            @media print {
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <img src="${window.location.origin}/logo.png" alt="Aruba High Maintenance" style="height: 52px; width: auto; object-fit: contain; margin-bottom: 6px; display: block;" />
              <div style="font-size: 12px; color: #64748b; font-weight: 600;">General Contractor Services &bull; Italiestraat 38 unit 5B, Aruba</div>
            </div>
            <div class="title">Cost Estimate</div>
          </div>
          
          <div class="meta-info">
            <div class="meta-left">
              <div><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
              <div><strong>Project Category:</strong> ${typeLabel}</div>
              <div><strong>Quality Standard:</strong> ${qualityLabel} Standard</div>
            </div>
            <div class="meta-right">
              <div><strong>Estimate Reference:</strong> AHM-${Math.floor(100000 + Math.random() * 900000)}</div>
              <div><strong>Currency:</strong> Aruban Florin (AWG)</div>
            </div>
          </div>
          
          <div class="grid">
            <div class="card">
              <div class="card-title">Construction Area</div>
              <div class="card-value">${areaNum} m²</div>
            </div>
            <div class="card">
              <div class="card-title">Estimated Duration</div>
              <div class="card-value">${durationText}</div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Pricing Structure</th>
                <th style="text-align: right;">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Base Construction Structure Work (${qualityLabel} Grade)</td>
                <td>${rateFormatted} / m²</td>
                <td style="text-align: right;">AWG ${(ratePerM2 * areaNum).toLocaleString()}</td>
              </tr>
              ${additionalServices.map(s => {
                const name = t[`service${s.charAt(0).toUpperCase() + s.slice(1)}` as keyof typeof t] || s;
                if (s === 'permits') {
                  return `<tr>
                    <td>${name}</td>
                    <td>Flat Administration Rate</td>
                    <td style="text-align: right;">AWG 3,500</td>
                  </tr>`;
                }
                const serviceRate = s === 'design' ? 120 : s === 'interior' ? 80 : 50;
                return `<tr>
                  <td>${name}</td>
                  <td>AWG ${serviceRate} / m²</td>
                  <td style="text-align: right;">AWG ${(serviceRate * areaNum).toLocaleString()}</td>
                </tr>`;
              }).join('')}
              <tr class="total-row">
                <td>Estimated Total Project Cost</td>
                <td>-</td>
                <td style="text-align: right; color: #d97706;">${totalCostFormatted}</td>
              </tr>
            </tbody>
          </table>
          
          <div class="disclaimer">
            <strong>Disclaimer:</strong> ${t.disclaimer}
          </div>
          
          <div class="no-print" style="margin-top: 40px; text-align: center;">
            <button class="print-btn" onclick="window.print()">Print / Save Estimate PDF</button>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const toggleService = (id: string) => {
    if (additionalServices.includes(id)) {
      setAdditionalServices(additionalServices.filter(s => s !== id));
    } else {
      setAdditionalServices([...additionalServices, id]);
    }
  };

  return (
    <div className="pt-24 pb-12 bg-slate-50 dark:bg-navy-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-xs uppercase tracking-widest text-gold-500 font-black mb-3 flex items-center justify-center gap-1.5">
            <Calculator size={14} className="animate-pulse" />
            <span>{t.title}</span>
          </h1>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            {t.subtitle}
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto mt-4 rounded-full shadow-lg shadow-gold-500/30" />
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Calculator layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          
          {/* Controls Column (Glassmorphism card) */}
          <div className="lg:col-span-7 bg-white/70 dark:bg-navy-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            
            {/* 1. Project Type Dropdown */}
            <div className="space-y-2 relative">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Building2 size={13} className="text-gold-500" />
                <span>{t.projectType}</span>
              </label>
              <div className="relative">
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-navy-950/70 border border-slate-200 dark:border-slate-800 text-navy-900 dark:text-white py-3.5 px-4 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold-500/50 appearance-none cursor-pointer"
                >
                  <option value="residential">{t.typeRes}</option>
                  <option value="villa">{t.typeVilla}</option>
                  <option value="commercial">{t.typeComm}</option>
                  <option value="guesthouse">{t.typeGuest}</option>
                  <option value="renovation">{t.typeReno}</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                  ▼
                </div>
              </div>
            </div>

            {/* 2. Construction Area Numeric Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Maximize2 size={13} className="text-gold-500" />
                  <span>{t.constructionArea}</span>
                </span>
                <span className="text-gold-500 font-mono font-black text-sm">
                  {areaText ? parseFloat(areaText).toLocaleString() : 0} m²
                </span>
              </label>
              
              <div className="relative rounded-xl overflow-hidden shadow-inner bg-slate-50 dark:bg-navy-950/70 border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-gold-500/50 transition-all">
                <input
                  type="text"
                  value={areaText}
                  onChange={(e) => setAreaText(e.target.value)}
                  placeholder="e.g. 150"
                  className="w-full bg-transparent text-navy-900 dark:text-white py-4 pl-4 pr-12 text-lg font-bold font-mono focus:outline-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 font-bold text-sm">
                  m²
                </span>
              </div>
              
              {/* Validation Warning Alert */}
              {validationError && (
                <div className="flex items-center gap-1.5 text-xs text-red-500 bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg">
                  <AlertCircle size={14} />
                  <span>{validationError}</span>
                </div>
              )}
            </div>

            {/* 3. Quality Level */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Award size={13} className="text-gold-500" />
                <span>{t.qualityLevel}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'standard', title: t.qualStd, desc: t.qualStdDesc },
                  { id: 'premium', title: t.qualPrem, desc: t.qualPremDesc },
                  { id: 'luxury', title: t.qualLux, desc: t.qualLuxDesc }
                ].map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setQuality(opt.id as any)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between select-none ${
                      quality === opt.id
                        ? 'border-gold-500 bg-gold-500/5 dark:bg-gold-500/10 text-navy-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-950/30 text-slate-500 dark:text-slate-400 hover:border-gold-500/30'
                    }`}
                  >
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-wider ${quality === opt.id ? 'text-gold-500' : 'text-slate-700 dark:text-slate-300'}`}>
                        {opt.title}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1 leading-normal">{opt.desc}</p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        quality === opt.id ? 'border-gold-500 bg-gold-500 text-navy-950' : 'border-slate-300 dark:border-slate-700'
                      }`}>
                        {quality === opt.id && <Check size={10} strokeWidth={4} className="text-navy-950" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Additional Services */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Briefcase size={13} className="text-gold-500" />
                <span>{t.additionalServices}</span>
              </label>
              <div className="space-y-2.5">
                {[
                  { id: 'design', label: t.serviceArch, cost: "+AWG 120 / m²" },
                  { id: 'interior', label: t.serviceInt, cost: "+AWG 80 / m²" },
                  { id: 'landscape', label: t.serviceLand, cost: "+AWG 50 / m²" },
                  { id: 'permits', label: t.servicePermit, cost: "Flat AWG 3,500" }
                ].map((serv) => {
                  const isChecked = additionalServices.includes(serv.id);
                  return (
                    <div
                      key={serv.id}
                      onClick={() => toggleService(serv.id)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer select-none transition-all ${
                        isChecked 
                          ? 'border-gold-500 bg-gold-500/5 dark:bg-gold-500/10' 
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-950/30 hover:border-gold-500/20'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-all ${
                          isChecked ? 'border-gold-500 bg-gold-500 text-navy-950' : 'border-slate-300 dark:border-slate-755'
                        }`}>
                          {isChecked && <Check size={11} strokeWidth={4} />}
                        </div>
                        <span className={`text-xs font-semibold ${isChecked ? 'text-navy-950 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                          {serv.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-gold-500 uppercase tracking-wider">
                        {serv.cost}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Results Summary Column (Glassmorphism Result Card) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-navy-950 to-navy-900 border border-slate-800 p-8 rounded-3xl shadow-2xl text-white flex flex-col justify-between relative overflow-hidden min-h-[500px]">
            {/* Background glass shine design */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl" />
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center space-x-2 text-gold-500">
                  <Calculator size={18} />
                  <span className="text-xs font-black uppercase tracking-widest">{t.resultOverview}</span>
                </div>
                {/* Construction Rate Banner */}
                <span className="text-[10px] bg-gold-500/10 text-gold-500 px-2 py-1 rounded font-bold">
                  AWG 2,600 / m² Base
                </span>
              </div>
              
              {/* Large Instant Pricing Value */}
              <div className="py-4 text-center relative">
                {isCalculating && (
                  <div className="absolute inset-0 flex items-center justify-center bg-navy-950/60 backdrop-blur-sm rounded-xl z-20">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
                      <span className="text-[10px] text-gold-500 uppercase font-black tracking-widest">{t.calculating}</span>
                    </div>
                  </div>
                )}
                
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">
                  {t.estTotalCost}
                </span>
                
                <span className="text-4xl sm:text-5xl font-black font-grotesk text-gold-500 block mt-2 tracking-tight drop-shadow-md">
                  {validationError ? 'AWG --' : formatCurrency(totalCost).replace('AWG ', '')}
                </span>
                <span className="text-[10px] text-slate-500 font-bold block mt-1.5">
                  Aruban Florin (AWG) • Instant Estimate
                </span>
              </div>

              {/* Estimate Details Table */}
              <div className="space-y-3.5 border-t border-b border-slate-800/80 py-5 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{t.resultArea}</span>
                  <span className="font-bold text-white flex items-center gap-1">
                    <span>{validationError ? '--' : areaText}</span>
                    <span className="text-[10px] text-slate-500 font-normal">m²</span>
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{t.resultRate}</span>
                  <span className="font-bold text-white font-mono text-xs">
                    {validationError ? '--' : `${formatCurrency(ratePerM2)} / m²`}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{t.resultDuration}</span>
                  <span className="font-bold text-gold-500 flex items-center gap-1.5">
                    <Clock size={13} />
                    <span>{validationError ? '--' : durationText}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons Panel */}
            <div className="pt-6 relative z-10 space-y-3">
              {/* Primary Call To Action */}
              <button
                disabled={!!validationError}
                onClick={handleBookWithEstimate}
                className="w-full bg-gradient-to-r from-gold-500 to-orange-500 hover:from-gold-600 hover:to-orange-600 text-navy-950 font-bold py-3.5 rounded-xl shadow-lg hover:shadow-gold-500/20 flex items-center justify-center space-x-1.5 text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{t.btnBook}</span>
                <ChevronRight size={14} />
              </button>

              {/* Request a Quote Option */}
              <button
                disabled={!!validationError}
                onClick={handleRequestQuote}
                className="w-full bg-slate-900 border border-slate-800 hover:border-gold-500 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-1.5 text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles size={13} className="text-gold-500" />
                <span>{t.btnQuote}</span>
              </button>

              {/* Secondary Utility Actions */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  disabled={!!validationError}
                  onClick={handleDownloadPDF}
                  className="bg-navy-950 hover:bg-slate-900 border border-slate-800 text-slate-300 font-bold py-2.5 rounded-lg flex items-center justify-center space-x-1.5 text-[10px] uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download size={11} />
                  <span>PDF Estimate</span>
                </button>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="bg-navy-950 hover:bg-slate-900 border border-slate-800 text-slate-300 font-bold py-2.5 rounded-lg flex items-center justify-center space-x-1.5 text-[10px] uppercase tracking-wider transition-colors"
                >
                  <Phone size={11} />
                  <span>{lang === 'pap' ? 'Tene Kontakt' : lang === 'nl' ? 'Contact' : 'Contact Us'}</span>
                </button>
              </div>
              
              {/* Disclaimer Info */}
              <div className="flex items-start space-x-2 text-[9px] text-slate-500 leading-normal bg-white/5 p-2.5 border border-white/5 rounded-xl">
                <Info size={13} className="text-gold-500/80 flex-shrink-0 mt-0.5" />
                <span>{t.disclaimer}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
