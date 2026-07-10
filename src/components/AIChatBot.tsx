import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, CornerDownLeft, Sparkles } from 'lucide-react';
import { Language } from '../utils/translations';

interface AIChatBotProps {
  lang: Language;
  setCurrentPage: (page: string) => void;
  setSelectedService?: (service: string | null) => void;
}

interface Message {
  id: number;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

export default function AIChatBot({ lang, setCurrentPage, setSelectedService }: AIChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial welcome message
    const welcomeText = lang === 'pap'
      ? "Bon dia! Mi ta e Asistente Virtual di Aruba High Maintenance. Con mi por yuda bo awe cu bo cas of proyecto?"
      : lang === 'nl'
      ? "Goedendag! Ik ben de Virtuele Assistent van Aruba High Maintenance. Hoe kan ik u vandaag helpen met uw project?"
      : "Hello! I am the Aruba High Maintenance AI Assistant. How can I help you with your property maintenance or construction needs today?";
    
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: welcomeText,
        timestamp: new Date()
      }
    ]);
  }, [lang]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    const prompt = inputValue.toLowerCase();
    setInputValue('');
    setIsTyping(true);

    // Simulate thinking state
    setTimeout(() => {
      let reply = '';
      if (lang === 'pap') {
        if (prompt.includes('pinta') || prompt.includes('coló') || prompt.includes('painter')) {
          reply = "Nos tin un team di pintornan profesional cu ta uza material di primera calidad na Aruba. Bo por bishita nos pagina di Pintura den e menu di Servisio pa mira e catalog.";
        } else if (prompt.includes('coriente') || prompt.includes('electric') || prompt.includes('dawm')) {
          reply = "Nos ta duna servicio di electricidad residencial y comercial certifica. Tambe nos tin asistencia di emergencia 24/7.";
        } else if (prompt.includes('tuberia') || prompt.includes('plumbing') || prompt.includes('leak')) {
          reply = "Loodgieterswerk y leak detection ta un di nos especialidadnan. Nos por detecta leak di awa rapidamente sin kibra dimas.";
        } else if (prompt.includes('traha sita') || prompt.includes('afspraak') || prompt.includes('book') || prompt.includes('sita')) {
          reply = "Bo por click riba 'Haci un Sita' den e menu ariba pa escoge bo fecha y ora, of click riba nos boton di WhatsApp pa papia directo.";
        } else if (prompt.includes('preise') || prompt.includes('prijs') || prompt.includes('kosto') || prompt.includes('quote') || prompt.includes('cost')) {
          reply = "Pa kosto exacto, bishita nos Kalkuladó di Kosto (Cost Estimator) den e menu general. Eynan bo por kalkula un estimacion.";
        } else {
          reply = "Masha danki pa bo pregunta. Aruba High Maintenance Contractor ta localisa na Caya Velp 6, San Nicolaas. Bo por yama nos na +297-660-2356.";
        }
      } else if (lang === 'nl') {
        if (prompt.includes('schilder') || prompt.includes('verf') || prompt.includes('verven')) {
          reply = "Wij bieden professionele schilderdiensten van topkwaliteit voor woningen en bedrijven op Aruba. Bezoek de schilderpagina onder Diensten voor voorbeelden.";
        } else if (prompt.includes('elektra') || prompt.includes('stroom') || prompt.includes('elektrisch')) {
          reply = "Onze gecertificeerde elektriciens voeren alle residentiële en commerciële installaties en reparaties veilig uit. Noodhulp is ook beschikbaar.";
        } else if (prompt.includes('loodgieter') || prompt.includes('lekkage') || prompt.includes('lek')) {
          reply = "Wij zijn gespecialiseerd in lekdetectie en loodgieterswerk. Lekkages worden snel opgespoord en vakkundig gerepareerd.";
        } else if (prompt.includes('afspraak') || prompt.includes('boeken') || prompt.includes('plannen')) {
          reply = "U kunt eenvoudig een afspraak inplannen via de knop 'Afspraak Maken' rechtsboven, of direct chatten via de WhatsApp-knop linksonder.";
        } else if (prompt.includes('kosten') || prompt.includes('prijs') || prompt.includes('offerte')) {
          reply = "Voor een snelle prijsindicatie kunt u onze ingebouwde Kosten Calculator gebruiken in het menu. Voor een gedetailleerde offerte kunt u een afspraak boeken.";
        } else {
          reply = "Bedankt voor uw bericht. Aruba High Maintenance Contractor is gevestigd aan de Caya Velp 6, San Nicolaas. Bel ons direct op +297-660-2356 voor meer info.";
        }
      } else {
        // English defaults
        if (prompt.includes('paint') || prompt.includes('painter') || prompt.includes('painting')) {
          reply = "We offer premium painting services for residential, commercial, and industrial properties in Aruba. We use top-tier weather-resistant paints.";
        } else if (prompt.includes('electric') || prompt.includes('power') || prompt.includes('electrical') || prompt.includes('wiring')) {
          reply = "Our certified electricians handle safety inspections, rewiring, panel upgrades, and 24/7 emergency calls.";
        } else if (prompt.includes('plumb') || prompt.includes('plumbing') || prompt.includes('leak') || prompt.includes('pipe')) {
          reply = "We provide comprehensive plumbing services, including acoustic leak detection, pipe replacement, and drain cleaning.";
        } else if (prompt.includes('appointment') || prompt.includes('book') || prompt.includes('schedule')) {
          reply = "You can schedule a consultation using our 'Book Appointment' page, where you can pick a date/time and upload photos of your site.";
        } else if (prompt.includes('cost') || prompt.includes('price') || prompt.includes('quote') || prompt.includes('estimator') || prompt.includes('calculate')) {
          reply = "Try our interactive 'Cost Estimator' tool in the navigation portal. It provides real-time estimates for painting, concrete, and masonry.";
        } else if (prompt.includes('tracker') || prompt.includes('status') || prompt.includes('progress')) {
          reply = "If you are an active client, you can enter your project code in our 'Project Tracker' page to see active completion updates and photos.";
        } else {
          reply = "Thank you for contacting Aruba High Maintenance! We operate Monday to Friday, 7am - 5pm. You can reach us directly at +297-660-2356 or visit us at Caya Velp 6, San Nicolaas.";
        }
      }

      const botMsg: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        text: reply,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Activation Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-tr from-gold-500 to-orange-500 hover:from-gold-600 hover:to-orange-600 text-navy-950 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 border-2 border-white/20"
          title="Open AI Assistant"
        >
          <Sparkles size={24} className="animate-pulse-subtle" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] rounded-2xl glass-panel-dark shadow-2xl border border-slate-700/50 flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-navy-950 to-navy-900 px-4 py-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gold-500 to-orange-500 flex items-center justify-center text-navy-950">
                <Bot size={18} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm leading-tight">Aruba Maintenance Bot</h4>
                <p className="text-emerald-400 text-[10px] font-semibold flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                  Online - AI Assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-lg"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-navy-950/60 custom-scroll">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-2.5 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.sender === 'bot' 
                      ? 'bg-gold-500/10 border border-gold-500/30 text-gold-500' 
                      : 'bg-slate-800 text-white'
                  }`}
                >
                  {msg.sender === 'bot' ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.sender === 'bot'
                      ? 'bg-slate-900 border border-slate-800 text-slate-200'
                      : 'bg-gradient-to-r from-gold-500 to-orange-500 text-navy-950 font-medium shadow-md'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="block text-[9px] mt-1 opacity-60 text-right">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start space-x-2.5">
                <div className="w-7 h-7 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 flex items-center justify-center">
                  <Bot size={14} />
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-navy-950 border-t border-slate-800/50 flex flex-wrap gap-1.5 justify-center">
            <button
              onClick={() => { setInputValue("What painting services do you provide?"); }}
              className="text-[10px] font-bold text-slate-400 bg-slate-900 hover:bg-slate-800 hover:text-gold-500 border border-slate-800 hover:border-gold-500/30 rounded-full px-2.5 py-1 transition-all"
            >
              Painting
            </button>
            <button
              onClick={() => { setInputValue("Do you offer electrical repairs?"); }}
              className="text-[10px] font-bold text-slate-400 bg-slate-900 hover:bg-slate-800 hover:text-gold-500 border border-slate-800 hover:border-gold-500/30 rounded-full px-2.5 py-1 transition-all"
            >
              Electrical
            </button>
            <button
              onClick={() => { setInputValue("How do I book an appointment?"); }}
              className="text-[10px] font-bold text-slate-400 bg-slate-900 hover:bg-slate-800 hover:text-gold-500 border border-slate-800 hover:border-gold-500/30 rounded-full px-2.5 py-1 transition-all"
            >
              Book Service
            </button>
            <button
              onClick={() => { setInputValue("How can I estimate project costs?"); }}
              className="text-[10px] font-bold text-slate-400 bg-slate-900 hover:bg-slate-800 hover:text-gold-500 border border-slate-800 hover:border-gold-500/30 rounded-full px-2.5 py-1 transition-all"
            >
              Cost Calculator
            </button>
          </div>

          {/* Input Panel */}
          <div className="p-3 bg-navy-950 border-t border-slate-800/80 flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask anything about our services..."
              className="flex-1 bg-slate-900 border border-slate-850 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 placeholder-slate-500"
            />
            <button
              onClick={handleSendMessage}
              className="w-10 h-10 bg-gradient-to-tr from-gold-500 to-orange-500 rounded-xl flex items-center justify-center text-navy-950 font-bold hover:scale-105 transition-transform"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
