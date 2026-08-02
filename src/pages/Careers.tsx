import React, { useState } from 'react';
import { Language, translations } from '../utils/translations';
import { Briefcase, Send, ShieldCheck, Heart, Users, FileText, ArrowRight } from 'lucide-react';

interface CareersProps {
  lang: Language;
}

export default function Careers({ lang }: CareersProps) {
  const t = translations[lang];
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('electrician');
  const [coverLetter, setCoverLetter] = useState('');
  const [cvName, setCvName] = useState('');

  const openPositions = [
    { id: 'electrician', title: 'Licensed Electrician', type: 'Full-time', location: 'San Nicolaas Depot', salary: 'Competitive based on experience' },
    { id: 'painter', title: 'Industrial Spray Painter', type: 'Full-time', location: 'On-site Island-wide', salary: 'Competitive hourly rate' },
    { id: 'carpenter', title: 'Fine Finishing Carpenter', type: 'Full-time', location: 'Workshop & Site', salary: 'Paid hourly' },
    { id: 'rigger', title: 'Tower Climbing Rigger (High-Altitude)', type: 'Full-time / Part-time', location: 'Mobile Dispatch', salary: 'Specialist Hazard Premium' }
  ];

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCvName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setCoverLetter('');
      setCvName('');
    }, 1500);
  };

  return (
    <div className="pt-24 pb-12 bg-slate-50 dark:bg-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-xs uppercase tracking-widest text-gold-500 font-bold mb-3">Careers</h1>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight font-grotesk">
            Join the Aruba High Team
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-4 leading-relaxed max-w-xl mx-auto">
            We are always seeking skilled, safety-conscious professionals who take pride in structural excellence and property maintenance.
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl text-center shadow-sm">
            <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center text-gold-500 mb-4 mx-auto border border-gold-500/20">
              <ShieldCheck size={22} />
            </div>
            <h4 className="font-bold text-navy-900 dark:text-white text-sm mb-2">Safety Training</h4>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
              We pay for active OSHA certifications, rigging licenses, and tower rescue qualifications. Your safety is our mandate.
            </p>
          </div>

          <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl text-center shadow-sm">
            <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center text-gold-500 mb-4 mx-auto border border-gold-500/20">
              <Heart size={22} />
            </div>
            <h4 className="font-bold text-navy-900 dark:text-white text-sm mb-2">Premium Salaries</h4>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
              Highly competitive hourly wages, vacation premiums, and hazard bonuses for rigging team members.
            </p>
          </div>

          <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl text-center shadow-sm">
            <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center text-gold-500 mb-4 mx-auto border border-gold-500/20">
              <Users size={22} />
            </div>
            <h4 className="font-bold text-navy-900 dark:text-white text-sm mb-2">Family Culture</h4>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
              We are a local Aruban team. We support work-life balance and provide stable, year-round maintenance hours.
            </p>
          </div>
        </div>

        {/* Layout: Open positions vs Apply form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          
          {/* Active Jobs */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-lg font-bold text-navy-900 dark:text-white flex items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <Briefcase className="text-gold-500 mr-2" size={20} />
              Open Positions
            </h3>

            <div className="space-y-4">
              {openPositions.map((job) => (
                <div 
                  key={job.id} 
                  onClick={() => setPosition(job.id)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    position === job.id
                      ? 'border-gold-500 bg-gold-500/5 shadow-md'
                      : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800 hover:border-gold-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-navy-900 dark:text-white text-sm sm:text-base">{job.title}</h4>
                    <span className="bg-slate-100 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      {job.type}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">📍 {job.location}</p>
                  <p className="text-gold-500 text-xs font-semibold mt-2">{job.salary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-6 bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-850 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-base font-bold text-navy-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-850">
                Apply for Position
              </h3>

              {success && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-4 rounded-xl text-center text-xs sm:text-sm font-semibold">
                  Masha danki! Your application has been logged. Our supervisor will contact you shortly.
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
                    placeholder="e.g. John Kelly"
                    className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Email</label>
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
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Brief Cover Statement</label>
                <textarea
                  rows={3}
                  required
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Describe your background and why you want to join Aruba High Maintenance..."
                  className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Upload CV (PDF / DOC)</label>
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg p-3 text-center cursor-pointer relative hover:border-gold-500">
                  <input type="file" onChange={handleCvChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <span className="text-xs text-slate-400 block font-semibold">
                    {cvName ? `Selected: ${cvName}` : 'Click to select CV document'}
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading || !name || !email || !phone}
                  className="w-full bg-navy-950 hover:bg-gold-500 text-gold-500 hover:text-navy-950 border border-gold-500/30 hover:border-gold-500 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
