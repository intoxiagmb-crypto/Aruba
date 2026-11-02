import React, { useState, useEffect } from 'react';
import { Language } from '../utils/translations';
import { Calendar, Clock, User, Phone, Mail, FileText, ChevronRight, ChevronLeft } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { APPOINTMENT_TIMES, appointmentLinks, earliestAppointmentDate, isValidAppointment } from '../utils/appointments';

interface AppointmentProps {
  lang: Language;
}

export default function Appointment({ lang }: AppointmentProps) {
  const [step, setStep] = useState(1);
  const [minimumDate, setMinimumDate] = useState(() => earliestAppointmentDate());
  const [scheduleError, setScheduleError] = useState('');

  // Form Fields
  const [service, setService] = useState('painting');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    const refreshDate = () => setMinimumDate(earliestAppointmentDate());
    const interval = window.setInterval(refreshDate, 30_000);
    window.addEventListener('focus', refreshDate);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('focus', refreshDate);
    };
  }, []);

  const servicesList = [
    { id: 'painting', label: 'Painting & Weatherproofing' },
    { id: 'electrical', label: 'Electrical Installations' },
    { id: 'plumbing', label: 'Plumbing & Leak Detection' },
    { id: 'concrete', label: 'Concrete & Foundations' },
    { id: 'carpentry', label: 'Carpentry & Woodwork' },
    { id: 'construction', label: 'General Construction' },
    { id: 'landscaping', label: 'Landscaping & Poolsurrounds' },
    { id: 'celltower', label: 'Cell towers maintenance/ installation' }
  ];

  const timeslots = APPOINTMENT_TIMES;
  const selectedService = servicesList.find(item => item.id === service)!.label;
  const links = appointmentLinks({ service: selectedService, date, time, name, phone, email, address, description });
  const validSchedule = date >= minimumDate && isValidAppointment(date, time);

  const validateSchedule = () => {
    setMinimumDate(earliestAppointmentDate());
    if (!isValidAppointment(date, time)) {
      setScheduleError('Please choose tomorrow or a later date and a preferred time. Same-day appointments are not available.');
      setStep(2);
      return false;
    }
    setScheduleError('');
    return true;
  };

  const handleNextStep = () => {
    if (step === 2 && !validateSchedule()) return;
    if (step < 4) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== 3 || !validateSchedule()) return;
    if (![name, phone, email, address, description].every(value => value.trim())) return;
    window.open(links.whatsapp, '_blank', 'noopener,noreferrer');
    setStep(4);
  };

  const handleSend = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!validateSchedule()) e.preventDefault();
  };

  return (
    <div className="pt-24 pb-12 bg-slate-50 dark:bg-navy-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Stepper Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h1 className="text-xs uppercase tracking-widest text-gold-500 font-bold mb-2">Book a Service</h1>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">Premium Consultation</h2>
          
          {/* Stepper Progress bar */}
          <div className="flex items-center justify-between mt-8 relative max-w-md mx-auto">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 dark:bg-slate-800 z-0" />
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-gold-500 z-0 transition-all duration-300"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />

            {[1, 2, 3, 4].map((num) => (
              <div 
                key={num}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs relative z-10 border transition-all duration-300 ${
                  step >= num 
                    ? 'bg-gold-500 border-gold-500 text-navy-950 shadow-md scale-110' 
                    : 'bg-slate-100 dark:bg-navy-900 border-slate-200 dark:border-slate-800 text-slate-400'
                }`}
              >
                {num}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-2 max-w-md mx-auto">
            <span>Service</span>
            <span>Schedule</span>
            <span>Details</span>
            <span>Send request</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-850 p-6 sm:p-10 rounded-3xl shadow-xl">
          <form onSubmit={handleSubmit}>
            
            {/* STEP 1: CHOOSE SERVICE */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-lg font-bold text-navy-900 dark:text-white flex items-center">
                  <span className="w-1.5 h-6 bg-gold-500 rounded mr-2" />
                  Select Core Requirement
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Select the primary category of contracting or maintenance you require. You can describe specifics in step 3.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {servicesList.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setService(item.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer hover:border-gold-500/50 transition-all flex items-center justify-between ${
                        service === item.id 
                          ? 'border-gold-500 bg-gold-500/5 text-gold-500 dark:text-gold-400' 
                          : 'border-slate-200 dark:border-slate-800 bg-slate-550 dark:bg-navy-950 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">{item.label}</span>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        service === item.id ? 'border-gold-500 bg-gold-500' : 'border-slate-300 dark:border-slate-700'
                      }`}>
                        {service === item.id && <div className="w-1.5 h-1.5 bg-navy-950 rounded-full" />}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-850 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-navy-900 dark:bg-slate-800 hover:bg-gold-500 hover:text-navy-950 text-gold-500 font-bold px-6 py-3 rounded-lg border border-gold-500/30 hover:border-gold-500 flex items-center space-x-1.5 text-xs uppercase tracking-wider transition-colors"
                  >
                    <span>Next: Schedule</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CHOOSE DATE & TIME */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-lg font-bold text-navy-900 dark:text-white flex items-center">
                  <span className="w-1.5 h-6 bg-gold-500 rounded mr-2" />
                  Choose Consultation Schedule
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Date Input */}
                  <div className="space-y-2">
                    <label htmlFor="appointment-date" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center">
                      <Calendar size={14} className="mr-1 text-gold-500" /> Select Date
                    </label>
                    <input
                      id="appointment-date"
                      type="date"
                      min={minimumDate}
                      aria-describedby="appointment-date-help"
                      value={date}
                      onChange={(e) => { setDate(e.target.value); setTime(''); setScheduleError(''); }}
                      required
                      className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500"
                    />
                    <p id="appointment-date-help" className="text-xs text-slate-500 dark:text-slate-400">
                      Choose tomorrow or later. No same-day bookings. All dates and times are in Aruba time.
                    </p>
                    {scheduleError && <p role="alert" className="text-xs text-red-600 dark:text-red-400">{scheduleError}</p>}
                  </div>

                  {/* Time Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center">
                      <Clock size={14} className="mr-1 text-gold-500" /> Select Preferred Time Slot
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeslots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTime(slot)}
                          disabled={!date || date < minimumDate}
                          aria-pressed={time === slot}
                          className={`p-2.5 rounded-lg border text-xs font-bold tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                            time === slot
                              ? 'bg-gold-500 border-gold-500 text-navy-950 shadow-sm'
                              : 'bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-gold-500/30'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-850 flex flex-col sm:flex-row gap-3 justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="bg-transparent text-slate-500 hover:text-navy-950 dark:hover:text-white font-bold px-4 py-2.5 rounded flex items-center space-x-1 text-xs uppercase tracking-wider transition-colors"
                  >
                    <ChevronLeft size={14} />
                    <span>Back</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!validSchedule}
                    className="bg-navy-900 dark:bg-slate-800 hover:bg-gold-500 hover:text-navy-950 text-gold-500 font-bold px-6 py-3 rounded-lg border border-gold-500/30 hover:border-gold-500 flex items-center space-x-1.5 text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
                  >
                    <span>Next: Project Details</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT DETAILS & PROJECT SUMMARY */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-lg font-bold text-navy-900 dark:text-white flex items-center">
                  <span className="w-1.5 h-6 bg-gold-500 rounded mr-2" />
                  Contact Credentials & Site Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center">
                      <User size={12} className="mr-1 text-gold-500" /> Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. John Henricus"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center">
                      <Phone size={12} className="mr-1 text-gold-500" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +297 730 8583"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center">
                      <Mail size={12} className="mr-1 text-gold-500" /> Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. john@aruba.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center">
                      <FileText size={12} className="mr-1 text-gold-500" /> Site Address in Aruba
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Italiestraat 38 unit 5B"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Project Description & Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Describe what you want to construct, repair, or paint..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Continue to WhatsApp with all your appointment details, then press Send. You can attach site photos or blueprints there.
                </p>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-850 flex flex-col sm:flex-row gap-3 justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="bg-transparent text-slate-500 hover:text-navy-950 dark:hover:text-white font-bold px-4 py-2.5 rounded flex items-center space-x-1 text-xs uppercase tracking-wider transition-colors"
                  >
                    <ChevronLeft size={14} />
                    <span>Back</span>
                  </button>
                  
                  <button
                    type="submit"
                    disabled={!name.trim() || !phone.trim() || !email.trim() || !address.trim() || !description.trim()}
                    className="bg-gradient-to-r from-gold-500 to-orange-500 hover:from-gold-600 hover:to-orange-600 text-navy-950 font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-orange-500/10 flex items-center space-x-1.5 text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                  >
                    <WhatsAppIcon className="w-5 h-5 shrink-0" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: COMPLETE REQUEST IN WHATSAPP */}
            {step === 4 && (
              <div className="text-center space-y-6 py-6 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-md">
                  <WhatsAppIcon className="w-9 h-9" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-navy-900 dark:text-white font-grotesk">Complete Your Request in WhatsApp</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
                    Your WhatsApp message includes your service, preferred date and time, name, phone, email, site address, and project description. Press Send in WhatsApp to deliver it to our team.
                  </p>
                </div>

                {/* Booking summary box */}
                <div className="bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl max-w-md mx-auto text-left text-xs sm:text-sm space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2 justify-between">
                    <span className="text-slate-500">Service Required</span>
                    <span className="font-bold text-navy-900 dark:text-white sm:text-right">{selectedService}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 justify-between">
                    <span className="text-slate-500">Schedule</span>
                    <span className="font-bold text-navy-900 dark:text-white">{date} at {time} (Aruba)</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 justify-between">
                    <span className="text-slate-500">Your Name</span>
                    <span className="font-bold text-navy-900 dark:text-white break-words min-w-0">{name}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 justify-between">
                    <span className="text-slate-500">Site Address</span>
                    <span className="font-bold text-navy-900 dark:text-white break-words min-w-0">{address}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-850">
                  <div className="flex justify-center">
                    <a href={links.whatsapp} onClick={handleSend} target="_blank" rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-2">
                      <WhatsAppIcon className="w-5 h-5 shrink-0" /> Open WhatsApp
                    </a>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 break-words">
                    WhatsApp: +297 730 8583
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    If WhatsApp did not open, use the button above. Your appointment is only confirmed when our team replies.
                  </p>
                  <button type="button" onClick={() => setStep(3)}
                    className="text-sm font-bold text-gold-600 dark:text-gold-400 underline px-4 py-2">
                    Edit Request
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>

      </div>
    </div>
  );
}
