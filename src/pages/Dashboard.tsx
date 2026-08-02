import React, { useState } from 'react';
import { Language, translations } from '../utils/translations';
import { FileText, Download, Printer, Shield, CheckCircle, Clock, ExternalLink, User, CreditCard, ChevronRight, X, Mail } from 'lucide-react';

interface DashboardProps {
  lang: Language;
}

interface Invoice {
  id: string;
  project: string;
  amount: string;
  date: string;
  status: 'paid' | 'partial' | 'unpaid';
  items: { desc: string; qty: number; rate: number }[];
}

export default function Dashboard({ lang }: DashboardProps) {
  const t = translations[lang];
  const [activeInvoice, setActiveInvoice] = useState<Invoice | null>(null);

  // Mock list of client invoices
  const invoicesData: Invoice[] = [
    {
      id: 'AHM-2026-104',
      project: 'Luxury Villa Exterior Refinishing',
      amount: '$18,500.00',
      date: 'June 24, 2026',
      status: 'paid',
      items: [
        { desc: 'Surface Prep & Algae Pressure Washing', qty: 1, rate: 2500 },
        { desc: 'Loxon Premium Alkaline Sealer primer application', qty: 1, rate: 4500 },
        { desc: 'Double Coating elastomeric paint application (Marine-grade)', qty: 1, rate: 11500 }
      ]
    },
    {
      id: 'AHM-2026-112',
      project: 'Structural Foundation Concrete Pouring',
      amount: '$34,000.00',
      date: 'June 29, 2026',
      status: 'partial',
      items: [
        { desc: 'Excavation & Trenching work', qty: 1, rate: 6000 },
        { desc: 'Steel reinforcement rebar setting & inspection', qty: 1, rate: 8000 },
        { desc: 'Structural Concrete mixture pouring (slabs/piers)', qty: 1, rate: 20000 }
      ]
    },
    {
      id: 'AHM-2026-115',
      project: 'Emergency Breaker Board Diagnostic & Replacement',
      amount: '$120.00',
      date: 'July 02, 2026',
      status: 'paid',
      items: [
        { desc: 'Emergency Dispatch & Fault Diagnostic', qty: 1, rate: 75 },
        { desc: 'Replacing 2x standard 20A circuit breaker blocks', qty: 2, rate: 22.50 }
      ]
    }
  ];

  const handleDownload = (id: string) => {
    alert(lang === 'pap'
      ? `Invoice ${id} (PDF) a cuminza baja exitosamente!`
      : lang === 'nl'
      ? `Download van factuur ${id} (PDF) is gestart!`
      : `Downloading Invoice ${id} (PDF) to your device...`
    );
  };

  const handleTriggerPrint = () => {
    window.print();
  };

  return (
    <div className="pt-24 pb-12 bg-slate-50 dark:bg-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-xs uppercase tracking-widest text-gold-500 font-bold mb-3">Client Portal</h1>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight font-grotesk">
            Client Hub Dashboard
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Dashboard layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left panel client details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-md space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 font-bold text-lg">
                  JH
                </div>
                <div>
                  <h4 className="font-bold text-navy-900 dark:text-white text-base">John Henricus</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Active Client</p>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-850/80 pt-4 space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Client ID</span>
                  <span className="font-mono font-bold text-navy-900 dark:text-white">AH-10492</span>
                </div>
                <div className="flex justify-between">
                  <span>Registered Email</span>
                  <span className="font-bold text-navy-900 dark:text-white">john@aruba.com</span>
                </div>
                <div className="flex justify-between">
                  <span>Registered Mobile</span>
                  <span className="font-bold text-navy-900 dark:text-white">+297 730 8583</span>
                </div>
              </div>
            </div>

            {/* Quick stats totals */}
            <div className="bg-gradient-to-br from-navy-950 to-navy-900 border border-slate-800 p-6 rounded-2xl shadow-lg text-white space-y-4">
              <div className="flex items-center space-x-1.5 text-gold-500">
                <CreditCard size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Financial Summary</span>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Billed</span>
                  <span className="text-xl font-bold font-grotesk mt-1 block">$52,620.00</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Paid Invoices</span>
                  <span className="text-xl font-bold font-grotesk text-emerald-400 mt-1 block">2 Paid</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel invoices grid */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-md">
              <h3 className="text-navy-900 dark:text-white font-bold text-base mb-6 flex items-center">
                <FileText className="text-gold-500 mr-2" size={18} />
                Billing Invoices & Quotes
              </h3>

              <div className="space-y-4">
                {invoicesData.map((inv) => (
                  <div 
                    key={inv.id} 
                    className="p-5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800/80 rounded-xl hover:border-gold-500/20 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-gold-500 bg-gold-500/5 px-2 py-0.5 rounded border border-gold-500/10">
                          {inv.id}
                        </span>
                        <span className="text-slate-400 text-[10px] font-bold">{inv.date}</span>
                      </div>
                      <h4 className="font-bold text-navy-900 dark:text-white text-xs sm:text-sm">{inv.project}</h4>
                    </div>

                    <div className="flex items-center space-x-6 justify-between w-full sm:w-auto">
                      <div className="text-right">
                        <span className="font-mono font-bold text-navy-900 dark:text-white text-sm sm:text-base block">{inv.amount}</span>
                        <span className={`inline-flex items-center text-[10px] font-black uppercase tracking-wider mt-0.5 ${
                          inv.status === 'paid' 
                            ? 'text-emerald-500' 
                            : inv.status === 'partial' 
                            ? 'text-amber-500' 
                            : 'text-red-500'
                        }`}>
                          {inv.status === 'paid' && <CheckCircle size={10} className="mr-1" />}
                          {inv.status === 'partial' && <Clock size={10} className="mr-1" />}
                          {inv.status}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setActiveInvoice(inv)}
                          className="w-9 h-9 bg-white dark:bg-navy-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                          title="View Invoice"
                        >
                          <ExternalLink size={14} />
                        </button>
                        <button
                          onClick={() => handleDownload(inv.id)}
                          className="w-9 h-9 bg-white dark:bg-navy-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-gold-500 transition-colors"
                          title="Download PDF"
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Invoice Lightbox Overlay Modal */}
        {activeInvoice && (
          <div className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in overflow-y-auto print:absolute print:inset-0 print:bg-white print:p-0">
            <div className="relative bg-white text-slate-900 rounded-3xl w-full max-w-2xl shadow-2xl p-6 sm:p-10 flex flex-col justify-between max-h-[90vh] overflow-y-auto border border-slate-200 print:max-h-none print:shadow-none print:border-none print:rounded-none">
              
              {/* Close & print controls */}
              <div className="absolute top-4 right-4 z-40 flex items-center space-x-2 print:hidden">
                <button
                  onClick={handleTriggerPrint}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 w-9 h-9 rounded-lg flex items-center justify-center border border-slate-200"
                  title="Print Invoice"
                >
                  <Printer size={16} />
                </button>
                <button
                  onClick={() => setActiveInvoice(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 w-9 h-9 rounded-lg flex items-center justify-center border border-slate-200"
                  title="Close Invoice"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Invoice Template Content */}
              <div className="space-y-8 font-sans">
                {/* Header branding */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                  <div className="flex items-center space-x-3">
                    <img 
                      src="/logo.svg" 
                      alt="Aruba High Maintenance Logo" 
                      className="h-12 w-auto object-contain" 
                    />
                    <div>
                      <h4 className="font-extrabold text-base text-navy-900 tracking-wider">ARUBA HIGH MAINTENANCE</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Contractor Services</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-navy-900 block font-grotesk">INVOICE</span>
                    <span className="font-mono text-xs font-bold text-gold-600 bg-gold-500/5 px-2 py-0.5 rounded border border-gold-500/10 inline-block mt-1">
                      {activeInvoice.id}
                    </span>
                  </div>
                </div>

                {/* Grid details (Billing metadata) */}
                <div className="grid grid-cols-2 gap-6 text-xs text-slate-600 border-b border-slate-100 pb-6">
                  <div className="space-y-1">
                    <p className="font-bold text-[10px] uppercase text-slate-400">Aruba High Maintenance Contractor</p>
                    <p className="font-bold text-navy-900">Italiestraat 38 unit 5B, Aruba</p>
                    <p>+297 730 8583</p>
                    <p>m.petronilia@arubahighmaintenance.com</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="font-bold text-[10px] uppercase text-slate-400">Billed To</p>
                    <p className="font-bold text-navy-900">John Henricus</p>
                    <p>Noord, Aruba</p>
                    <p className="pt-2">Date issued: {activeInvoice.date}</p>
                  </div>
                </div>

                {/* Line Items Table */}
                <div className="space-y-4">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                        <th className="py-2.5">Description</th>
                        <th className="py-2.5 text-center">Qty</th>
                        <th className="py-2.5 text-right">Rate</th>
                        <th className="py-2.5 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {activeInvoice.items.map((item, i) => (
                        <tr key={i}>
                          <td className="py-3 font-semibold">{item.desc}</td>
                          <td className="py-3 text-center">{item.qty}</td>
                          <td className="py-3 text-right">${item.rate.toLocaleString()}</td>
                          <td className="py-3 text-right font-semibold text-navy-900">${(item.qty * item.rate).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary footer */}
                <div className="border-t border-slate-200 pt-6 flex flex-col items-end space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between w-full max-w-xs text-slate-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-800">{activeInvoice.amount}</span>
                  </div>
                  <div className="flex justify-between w-full max-w-xs text-slate-500">
                    <span>Aruba BBO (Tax 1.5%)</span>
                    <span className="font-semibold text-slate-800">$0.00 (Zero Tax Rate)</span>
                  </div>
                  <div className="flex justify-between w-full max-w-xs text-slate-500 border-t border-slate-100 pt-2 text-base font-bold">
                    <span className="text-navy-950 font-black">Total Due</span>
                    <span className="text-gold-600 font-mono font-black">{activeInvoice.amount}</span>
                  </div>
                </div>

              </div>

              {/* Print Footer */}
              <div className="border-t border-slate-100 pt-6 text-[10px] text-center text-slate-400 print:block">
                Thank you for your business. Aruba High Maintenance Contractor, Italiestraat 38 unit 5B, Aruba.
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
