import React, { useState } from 'react';
import { Language, translations } from '../utils/translations';
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, ExternalLink } from 'lucide-react';

interface ContactProps {
  lang: Language;
}

export default function Contact({ lang }: ContactProps) {
  const t = translations[lang];
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="pt-24 pb-12 bg-slate-50 dark:bg-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-xs uppercase tracking-widest text-gold-600 dark:text-gold-400 font-extrabold mb-3">Contact Us</h1>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight font-grotesk">
            Let's Discuss Your Project
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-gold-500 to-orange-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Layout coordinates cards & form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto mb-20">
          
          {/* Coordinates column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address */}
            <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 bg-gold-500/10 text-gold-600 dark:text-gold-400 rounded-xl flex items-center justify-center border border-gold-500/20 flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div className="space-y-1 text-xs sm:text-sm">
                <h4 className="font-bold text-navy-900 dark:text-white uppercase tracking-wider text-xs">Office Address</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Italiestraat 38 unit 5B<br />
                  Aruba
                </p>
              </div>
            </div>

            {/* Phones */}
            <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 bg-gold-500/10 text-gold-600 dark:text-gold-400 rounded-xl flex items-center justify-center border border-gold-500/20 flex-shrink-0">
                <Phone size={20} />
              </div>
              <div className="space-y-1 text-xs sm:text-sm">
                <h4 className="font-bold text-navy-900 dark:text-white uppercase tracking-wider text-xs">Phone Call Coordinates</h4>
                <div className="flex flex-col space-y-1">
                  <a href="tel:+2977308583" className="text-slate-600 dark:text-slate-400 hover:text-gold-600 dark:hover:text-gold-400 font-semibold font-mono">
                    +297 730 8583
                  </a>
                  <a href="tel:+2976629817" className="text-slate-600 dark:text-slate-400 hover:text-gold-600 dark:hover:text-gold-400 font-semibold font-mono">
                    +297-662-9817
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 bg-gold-500/10 text-gold-600 dark:text-gold-400 rounded-xl flex items-center justify-center border border-gold-500/20 flex-shrink-0">
                <Mail size={20} />
              </div>
              <div className="space-y-1 text-xs sm:text-sm break-all">
                <h4 className="font-bold text-navy-900 dark:text-white uppercase tracking-wider text-xs">Email Correspondence</h4>
                <div className="flex flex-col space-y-1.5">
                  <a href="mailto:m.petronilia@arubahighmaintenance.com" className="text-amber-600 dark:text-gold-400 hover:underline font-bold">
                    m.petronilia@arubahighmaintenance.com
                  </a>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 bg-gold-500/10 rounded-xl flex items-center justify-center text-gold-500 border border-gold-500/20 flex-shrink-0">
                <Clock size={20} />
              </div>
              <div className="space-y-1 text-xs sm:text-sm">
                <h4 className="font-bold text-navy-900 dark:text-white uppercase tracking-wider text-xs">Working Hours</h4>
                <p className="text-slate-500 dark:text-slate-400">
                  Monday to Friday: 7:00 AM – 5:00 PM<br />
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mt-1">24/7 emergency dispatch</span>
                </p>
              </div>
            </div>

          </div>

          {/* Form column */}
          <div className="lg:col-span-7 bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-855 p-6 sm:p-10 rounded-3xl shadow-xl flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-bold text-navy-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-850">
                Send a Message
              </h3>

              {success && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-4 rounded-xl text-center text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2">
                  <ShieldCheck size={18} />
                  <span>Your message has been sent successfully. We will reply within 24 hours.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Henricus"
                    className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. john@aruba.com"
                    className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Phone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +297 730 8583"
                    className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-gold-500 text-slate-400"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="billing">Invoicing / Billing</option>
                    <option value="quote">Request Custom Quote</option>
                    <option value="emergency">Emergency Dispatch</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Message / Request Details</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detail your request..."
                  className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading || !name || !email || !phone || !message}
                  className="w-full bg-navy-950 hover:bg-gold-500 text-gold-500 hover:text-navy-950 border border-gold-500/30 hover:border-gold-500 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Map view callout */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center select-none relative max-w-4xl mx-auto overflow-hidden">
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          <h4 className="text-white font-bold text-lg relative z-10 font-grotesk">Our Physical Location</h4>
          <p className="text-gold-500 font-semibold text-xs tracking-wider uppercase mt-1 relative z-10">Italiestraat 38 unit 5B, Aruba</p>
          <p className="text-slate-400 text-xs mt-3 relative z-10 leading-relaxed max-w-lg mx-auto">
            You can drop by our administrative depot. Located at Italiestraat 38 unit 5B, we coordinate fast dispatch trucks to any neighborhood in Aruba.
          </p>
          <div className="pt-6 relative z-10 flex justify-center">
            <a
              href="https://maps.google.com/?q=Italiestraat+38+unit+5B,+Aruba"
              target="_blank"
              rel="noreferrer"
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-colors border border-slate-700"
            >
              <span>View Google Map</span>
              <ExternalLink size={14} className="text-gold-500" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
