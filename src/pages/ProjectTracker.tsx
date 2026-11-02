import React, { useState } from 'react';
import { Language, translations } from '../utils/translations';
import { Search, Clock, CheckCircle2, User, HardHat, Camera, AlertCircle, Calendar } from 'lucide-react';

interface ProjectTrackerProps {
  lang: Language;
}

interface TrackerLog {
  title: string;
  date: string;
  status: 'done' | 'active' | 'pending';
  notes: string;
  image?: string;
}

interface ProjectStatus {
  code: string;
  name: string;
  location: string;
  manager: string;
  completion: number;
  startDate: string;
  estFinishDate: string;
  logs: TrackerLog[];
}

export default function ProjectTracker({ lang }: ProjectTrackerProps) {
  const t = translations[lang];
  const [searchCode, setSearchCode] = useState('');
  const [activeProject, setActiveProject] = useState<ProjectStatus | null>(null);
  const [errorMsg, setErrorMsg] = useState(false);

  // Mock database of project trackers
  const trackerDB: Record<string, ProjectStatus> = {
    'ARUBA-2026-001': {
      code: 'ARUBA-2026-001',
      name: 'Luxury Villa Painting & Weatherproofing',
      location: 'Noord, Aruba (Palm Beach District)',
      manager: 'Coe M. Petronilia / Site Supervisor',
      completion: 85,
      startDate: 'June 10, 2026',
      estFinishDate: 'July 15, 2026',
      logs: [
        {
          title: 'High-Reach Wall & Ceiling Finishing',
          date: 'July 05, 2026',
          status: 'active',
          notes: 'Applying the final salinity-shield topcoats on the eastern windward balconies using telescopic extension poles.',
          image: '/painting-high-reach-pole-roller.jpg'
        },
        {
          title: 'Precision Ceiling Sanding & Surface Prep',
          date: 'June 25, 2026',
          status: 'done',
          notes: 'Completed orbital ceiling sanding with dust masks. Applied Loxon anti-alkali primer base layer island-wide.',
          image: '/painting-ceiling-sander-closeup.jpg'
        },
        {
          title: 'Mobile Scaffolding Surface Sanding',
          date: 'June 15, 2026',
          status: 'done',
          notes: 'Operating on yellow mobile scaffolding units for ceiling leveling, joint compound sanding, and edge prep.',
          image: '/painting-scaffold-ceiling-prep.jpg'
        },
        {
          title: 'Site Scaffolding Setup & Primer Staging',
          date: 'June 11, 2026',
          status: 'done',
          notes: 'Constructed mobile scaffolding systems. Staged commercial grade primers and safety platforms.',
          image: '/painting-scaffold-work-platform.jpg'
        }
      ]
    },
    'ARUBA-2026-002': {
      code: 'ARUBA-2026-002',
      name: 'Structural Concrete Foundation Pouring',
      location: 'Savaneta, Aruba',
      manager: 'Civil Engineer E. Croes',
      completion: 40,
      startDate: 'June 20, 2026',
      estFinishDate: 'August 05, 2026',
      logs: [
        {
          title: 'Direct Chute Concrete Pouring & Leveling',
          date: 'July 04, 2026',
          status: 'active',
          notes: 'Direct chute pouring from ready-mix truck over reinforcement rebar mesh. Vibrating and screeding to prevent air pockets.',
          image: '/concrete-pouring-chute-worker.jpg'
        },
        {
          title: 'Continuous Foundation Pouring & Edge Guidance',
          date: 'July 02, 2026',
          status: 'done',
          notes: 'Continuous volumetric pouring operations. Technicians guiding the discharge chute across formwork channels.',
          image: '/concrete-foundation-pouring-angle.jpg'
        },
        {
          title: 'Mixer Truck Staging & Steel Rebar Framework',
          date: 'June 28, 2026',
          status: 'done',
          notes: 'Constructed reinforced steel grids. Formwork inspection approved according to applicable structural codes.',
          image: '/concrete-mixer-chute-crew.jpg'
        },
        {
          title: 'Excavation & Trenching Operations',
          date: 'June 22, 2026',
          status: 'done',
          notes: 'Excavated structural foundation lines to 1.2m depth. Ground soil compacted successfully.'
        }
      ]
    },
    'ARUBA-2026-003': {
      code: 'ARUBA-2026-003',
      name: 'Smart Drip Irrigation & Tropical Landscaping',
      location: 'Palm Beach, Aruba',
      manager: 'Landscape Architect M. Kelly',
      completion: 100,
      startDate: 'May 10, 2026',
      estFinishDate: 'June 05, 2026',
      logs: [
        {
          title: 'Project Closed - Final Inspection & Delivery',
          date: 'June 05, 2026',
          status: 'done',
          notes: 'Irrigation timers programmed for early morning/late evening cycles. Custom turf grass curbed correctly. Client approved and handed over.',
          image: '/landscaping-garden-bed-pebbles.jpg'
        },
        {
          title: 'Palm Trees Planting & Topsoil Layout',
          date: 'May 25, 2026',
          status: 'done',
          notes: 'Imported Fox Tail Palms and volcanic rocks. Laid organic topsoils. Installed drip irrigation valves.'
        },
        {
          title: 'Main Irrigation Water Line Tapping',
          date: 'May 15, 2026',
          status: 'done',
          notes: 'Connected main pipe feeds. Calibrated water pressure valves.'
        }
      ]
    },
    'ARUBA-2026-004': {
      code: 'ARUBA-2026-004',
      name: 'Cell towers maintenance/ installation',
      location: 'San Nicolaas, Aruba',
      manager: 'Coe M. Petronilia / High-Altitude Rigging Lead',
      completion: 70,
      startDate: 'July 01, 2026',
      estFinishDate: 'August 15, 2026',
      logs: [
        {
          title: 'High-Altitude Structural Rigging & Anti-Corrosion Spraying',
          date: 'July 28, 2026',
          status: 'active',
          notes: 'OSHA-certified riggers applying marine-grade aviation safety red-and-white epoxy coatings to windward structural lattice columns. Microwave antenna mounts secured.',
          image: '/cell-tower-repainting.jpg'
        },
        {
          title: 'Guy-Wire Tensioning & Galvanized Hardware Swaps',
          date: 'July 18, 2026',
          status: 'done',
          notes: 'Replaced corroded bolts with hot-dip galvanized high-tensile hardware. Tested guy-wire rope tension across all 3 anchors.',
          image: '/cell-tower-boom-lift.jpg'
        },
        {
          title: 'Aviation Warning Beacon & Lightning Protection Inspection',
          date: 'July 10, 2026',
          status: 'done',
          notes: 'Inspected grounding grid and top red flashing beacon LEDs. Structural grounding wire resistance measured within standard ranges.'
        },
        {
          title: 'Site Safety Clearance & RF Shutdown Protocols',
          date: 'July 02, 2026',
          status: 'done',
          notes: 'Coordinates set with telecom operator for low-power RF windows. Safety harness and rescue system checks complete.'
        }
      ]
    },
    'ARUBA-2026-005': {
      code: 'ARUBA-2026-005',
      name: 'Villa Electrical Rough-In & Ceiling Conduit Network',
      location: 'Noord / Palm Beach, Aruba',
      manager: 'Lead Electrician J. Rasmijn',
      completion: 65,
      startDate: 'July 05, 2026',
      estFinishDate: 'August 12, 2026',
      logs: [
        {
          title: 'Overhead Ceiling Conduit Wiring & Pull Box Assembly',
          date: 'July 14, 2026',
          status: 'active',
          notes: 'Electrician operating on rolling scaffold installing overhead conduit lines through metal furring channels into primary junction box.',
          image: '/electrician-ceiling-conduit-wiring.jpg'
        },
        {
          title: 'Scaffold High-Reach Conduit Fitting & Securement',
          date: 'July 12, 2026',
          status: 'done',
          notes: 'Fitted multi-line conduit lines across ceiling channels with protective clips and pull boxes.',
          image: '/electrician-scaffolding-conduit-install.jpg'
        },
        {
          title: 'Ceiling Furring Channels & Junction Box Inspection',
          date: 'July 09, 2026',
          status: 'done',
          notes: 'Installed heavy-duty ceiling furring grid and blue junction boxes aligned for lighting fixtures.',
          image: '/electrical-ceiling-conduit-framing.jpg'
        },
        {
          title: 'Temporary Site Power Distribution Board Setup',
          date: 'July 06, 2026',
          status: 'done',
          notes: 'Constructed weather-safe heavy duty jobsite power distribution board with GFCI breakers for construction tools.',
          image: '/electrical-site-power-distribution.jpg'
        }
      ]
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const code = searchCode.trim().toUpperCase();
    
    if (trackerDB[code]) {
      setActiveProject(trackerDB[code]);
      setErrorMsg(false);
    } else {
      setActiveProject(null);
      setErrorMsg(true);
    }
  };

  return (
    <div className="pt-24 pb-12 bg-slate-50 dark:bg-navy-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Title */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h1 className="text-xs uppercase tracking-widest text-gold-500 font-bold mb-2">Project Progress Tracker</h1>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white font-grotesk">Live Construction Feed</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
            Enter your customized project reference code to track live progress updates, checklist status, and site photos.
          </p>
        </div>

        {/* Search Panel */}
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-850 p-6 rounded-2xl shadow-lg mb-10">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Enter Code (e.g. ARUBA-2026-001)"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                required
                className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-gold-500 placeholder-slate-500 text-white font-mono uppercase tracking-wider"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-gold-500 to-orange-500 hover:from-gold-600 hover:to-orange-600 text-navy-950 font-bold px-8 py-3 rounded-xl shadow-md text-xs uppercase tracking-wider transition-all"
            >
              Search Code
            </button>
          </form>

          {/* Help box for demo codes */}
          <div className="flex items-start space-x-2 text-[10px] sm:text-xs text-slate-400 mt-4 bg-slate-50 dark:bg-navy-950/40 p-3 rounded-lg border border-slate-200 dark:border-slate-850/80">
            <AlertCircle size={14} className="text-gold-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-300">Demo Reference Codes:</p>
              <p className="mt-1">
                Try out <span className="font-mono text-gold-500 font-bold">ARUBA-2026-001</span> (Painting),{' '}
                <span className="font-mono text-gold-500 font-bold">ARUBA-2026-002</span> (Concrete),{' '}
                <span className="font-mono text-gold-500 font-bold">ARUBA-2026-004</span> (Telecom Towers), or{' '}
                <span className="font-mono text-gold-500 font-bold">ARUBA-2026-005</span> (Electrical, 65%).
              </p>
            </div>
          </div>
        </div>

        {/* Not Found Error */}
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl p-6 text-center animate-fade-in mb-10 text-xs sm:text-sm font-semibold">
            Invalid Code entered. Please double check your contract folder or try one of the demo codes above.
          </div>
        )}

        {/* Tracker details screen */}
        {activeProject && (
          <div className="space-y-8 animate-fade-in">
            {/* Meta details header box */}
            <div className="bg-gradient-to-br from-navy-950 to-navy-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
              <div className="absolute inset-0 grid-bg-dark opacity-10 pointer-events-none" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="space-y-3">
                  <span className="bg-gold-500 text-navy-950 text-[10px] font-black px-2.5 py-1 rounded font-mono">
                    {activeProject.code}
                  </span>
                  <h3 className="text-xl font-bold font-grotesk">{activeProject.name}</h3>
                  <div className="text-xs text-slate-400 space-y-1">
                    <p>📍 Location: {activeProject.location}</p>
                    <p>👷 Manager: {activeProject.manager}</p>
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-2 md:items-end">
                  <div className="w-full max-w-xs bg-slate-800 rounded-full h-3 overflow-hidden relative border border-slate-700/80">
                    <div 
                      className="bg-gradient-to-r from-gold-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${activeProject.completion}%` }}
                    />
                  </div>
                  <div className="flex justify-between w-full max-w-xs text-xs font-bold text-slate-300">
                    <span>PROGRESS STATUS</span>
                    <span className="text-gold-500 font-mono font-black">{activeProject.completion}%</span>
                  </div>
                  <div className="text-[10px] text-slate-400 space-y-0.5 md:text-right pt-2 font-semibold">
                    <p>Started: {activeProject.startDate}</p>
                    <p>Est. Finish: {activeProject.estFinishDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline updates */}
            <div className="space-y-6">
              <h4 className="text-navy-900 dark:text-white font-bold text-lg border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center">
                <Clock className="text-gold-500 mr-2" size={20} />
                Progress Timeline Logs
              </h4>

              <div className="relative border-l-2 border-slate-200 dark:border-slate-800 pl-6 sm:pl-8 space-y-10 max-w-2xl mx-auto">
                {activeProject.logs.map((log, index) => (
                  <div key={index} className="relative group">
                    {/* Node status dot */}
                    <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-4 ${
                      log.status === 'active' 
                        ? 'bg-gold-500 border-gold-500 animate-pulse scale-110' 
                        : 'bg-navy-950 border-emerald-500'
                    }`} />

                    <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm hover:border-gold-500/20 transition-all duration-300">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-850/80 mb-3 text-xs">
                        <h5 className="font-bold text-navy-900 dark:text-white sm:text-sm">{log.title}</h5>
                        <span className="text-slate-400 font-bold flex items-center"><Calendar size={12} className="mr-1" /> {log.date}</span>
                      </div>
                      
                      <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                        {log.notes}
                      </p>

                      {/* Photo updates if available */}
                      {log.image && (
                        <div className="mt-4 rounded-xl overflow-hidden max-w-sm border border-slate-200 dark:border-slate-800 relative group/photo">
                          <img src={log.image} alt={log.title} className="w-full h-40 object-cover" />
                          <div className="absolute bottom-2 left-2 bg-navy-950/80 backdrop-blur-sm border border-slate-800 rounded px-2.5 py-1 text-[9px] font-bold text-gold-500 flex items-center space-x-1 uppercase">
                            <Camera size={10} />
                            <span>Site Photo Log</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
