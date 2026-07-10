import React, { useState } from 'react';
import { Language, translations } from '../utils/translations';
import { Search, ChevronDown, MessageSquare, Wrench, CreditCard, ShieldCheck } from 'lucide-react';

interface FAQProps {
  lang: Language;
}

interface FAQItem {
  q: string;
  a: string;
  category: 'services' | 'billing' | 'safety';
}

export default function FAQ({ lang }: FAQProps) {
  const t = translations[lang];
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      q: 'Do you offer emergency plumbing and electrical services?',
      a: 'Yes, we provide 24/7 emergency response for active maintenance contract holders. For one-off clients, emergency dispatches are subject to technician availability, typically within 2-4 hours.',
      category: 'services'
    },
    {
      q: 'How does the online Project Tracker work?',
      a: 'Once your contract is signed, our administration generates a unique tracking code (e.g., ARUBA-2026-001). Enter this code on our Project Tracker page to view live percentage completions, task status, and photos taken directly on-site by our supervisors.',
      category: 'services'
    },
    {
      q: 'Are your painters, plumbers, and electricians certified?',
      a: 'Absolutely. Every technician under our employ is licensed and holds active safety and technical credentials. Our electrical engineers are fully certified to inspect systems and sign DOW compliance paperwork.',
      category: 'services'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept bank transfers (Aruba Bank, CMB, RBC), online credit card payments via our client portal, and local checks. Payment structures are typically milestone-based (e.g., 40% deposit, 30% mid-project, 30% final sign-off).',
      category: 'billing'
    },
    {
      q: 'Do you offer free cost estimations?',
      a: 'We provide an online Cost Estimator tool to give you a rapid estimate. For binding contracts, we charge a small site survey diagnostic fee which is fully credited back to your invoice upon signing the contract.',
      category: 'billing'
    },
    {
      q: 'What safety standards do you enforce on cell tower maintenance?',
      a: 'Our cell tower riggers are OSHA-certified high-altitude climbers equipped with certified harnesses, positioning lanyards, and fall-arrest grids. We carry out electromagnetic guy-wire inspections and enforce strict RF radiation clearance protocol.',
      category: 'safety'
    },
    {
      q: 'How does salinity and coastal wind affect painting in Aruba?',
      a: 'Aruba\'s heavy trade winds carry micro-saline ocean droplets which accelerate metal rust and concrete carbonation. We sandblast surfaces, apply zinc-rich/alkaline primers, and double-coat with specialized elastic paints to seal masonry.',
      category: 'safety'
    }
  ];

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredFAQs = faqData.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-12 bg-slate-50 dark:bg-navy-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Title */}
        <div className="text-center max-w-xl mx-auto mb-12 animate-fade-in-up">
          <h1 className="text-xs uppercase tracking-widest text-gold-500 font-bold mb-3">FAQ</h1>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight font-grotesk">
            Frequently Asked Questions
          </h2>
          <div className="w-12 h-0.5 bg-gold-500 mx-auto mt-3" />
        </div>

        {/* Live Search Bar */}
        <div className="relative mb-8 max-w-xl mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search questions or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800/80 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-gold-500 placeholder-slate-500"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All FAQs', icon: <MessageSquare size={14} /> },
            { id: 'services', label: 'Services', icon: <Wrench size={14} /> },
            { id: 'billing', label: 'Billing & Rates', icon: <CreditCard size={14} /> },
            { id: 'safety', label: 'Safety & Climate', icon: <ShieldCheck size={14} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveCategory(tab.id); setExpandedIndex(null); }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border flex items-center space-x-1.5 ${
                activeCategory === tab.id
                  ? 'bg-gold-500 text-navy-950 border-gold-500 shadow-md'
                  : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-gold-500/30'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => {
              const isOpen = expandedIndex === index;
              return (
                <div 
                  key={index} 
                  className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full text-left p-5 flex items-center justify-between text-navy-900 dark:text-white hover:text-gold-500 transition-colors focus:outline-none"
                  >
                    <span className="font-bold text-xs sm:text-sm md:text-base leading-tight pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown 
                      size={18} 
                      className={`text-gold-500 transform transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-50 dark:border-slate-850/60 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-sm font-semibold">
              No matching questions found. Try search keywords like "leak", "panel", "painting", or "paid".
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
