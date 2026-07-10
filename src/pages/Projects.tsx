import React, { useState } from 'react';
import { Language, translations } from '../utils/translations';
import { Filter, Eye, MapPin, DollarSign, Calendar, Star, X, Info } from 'lucide-react';

interface ProjectsProps {
  lang: Language;
}

interface Project {
  id: number;
  title: string;
  category: 'painting' | 'concrete' | 'construction' | 'landscaping' | 'electrical' | 'celltower';
  location: string;
  budget: string;
  duration: string;
  rating: number;
  image: string;
  beforeImage?: string;
  description: string;
}

export default function Projects({ lang }: ProjectsProps) {
  const t = translations[lang];
  const [filter, setFilter] = useState<string>('all');
  const [activeLightbox, setActiveLightbox] = useState<Project | null>(null);

  const projectsData: Project[] = [
    {
      id: 1,
      title: 'Luxury Villa Exterior Refinishing',
      category: 'painting',
      location: 'Noord, Aruba',
      budget: '$18,500',
      duration: '14 Days',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      description: 'Full stripping, sanding, and elastomeric weatherproofing application on a multi-level luxury estate. Included anti-salinity protective topcoats to resist sea spray.'
    },
    {
      id: 2,
      title: 'Stamped Concrete Pool Deck & Patio',
      category: 'concrete',
      location: 'Eagle Beach, Aruba',
      budget: '$34,000',
      duration: '18 Days',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1558904541-efa8c1a68f6f?auto=format&fit=crop&w=800&q=80',
      description: 'Structural concrete pouring followed by custom slate-pattern stamp texturing, UV stable color hardener application, and chemical sealing for pool-side grip.'
    },
    {
      id: 3,
      title: 'Resort Walkway Tropical Landscaping',
      category: 'landscaping',
      location: 'Palm Beach, Aruba',
      budget: '$45,000',
      duration: '25 Days',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1558904541-efa8c1a68f6f?auto=format&fit=crop&w=800&q=80',
      description: 'Total design and planting of drought-resistant palm layouts, volcanic rocks, automated smart drip irrigation, and low-voltage landscape lighting.'
    },
    {
      id: 4,
      title: 'Commercial Plaza Panel Upgrade',
      category: 'electrical',
      location: 'Oranjestad, Aruba',
      budget: '$12,800',
      duration: '5 Days',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      description: 'Removal of corroded switchboards, upgrading the main distribution frame, implementing automatic generator bypass, and certifying safety grounds.'
    },
    {
      id: 5,
      title: 'DOW Telecom Cell Tower Repainting',
      category: 'celltower',
      location: 'San Nicolaas, Aruba',
      budget: '$55,000',
      duration: '30 Days',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=800&q=80',
      description: 'High-altitude inspection, rust treatment with industrial steel primers, microwave alignment, and application of marine-grade safety aviation paint.'
    },
    {
      id: 6,
      title: 'Modern Residential Villa Addition',
      category: 'construction',
      location: 'Savaneta, Aruba',
      budget: '$120,000',
      duration: '60 Days',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
      description: 'Constructing a 1,200 sq. ft. guest house extension with load-bearing columns, concrete block masonry, roof framing, and full plumbing/electrical wiring.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'painting', label: 'Painting' },
    { id: 'concrete', label: 'Beton & Concrete' },
    { id: 'landscaping', label: 'Landscaping' },
    { id: 'electrical', label: 'Electrical' },
    { id: 'celltower', label: 'Telecom Towers' },
    { id: 'construction', label: 'Construction' }
  ];

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <div className="pt-24 pb-12 bg-slate-50 dark:bg-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
          <h1 className="text-xs uppercase tracking-widest text-gold-500 font-bold mb-3">
            {lang === 'pap' ? 'Nos Portfolio' : lang === 'nl' ? 'Ons Portfolio' : 'Project Portfolio'}
          </h1>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            {lang === 'pap' ? 'Mira Nos Trabounan mas Reciente' : lang === 'nl' ? 'Ontdek Onze Recente Projecten' : 'Exceptional Workmanship in Aruba'}
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                filter === cat.id
                  ? 'bg-gold-500 text-navy-950 border-gold-500 shadow-md'
                  : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-gold-500/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveLightbox(project)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-800">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-navy-950/40 group-hover:bg-navy-950/20 transition-colors duration-300" />
                
                {/* Float tag */}
                <span className="absolute top-4 left-4 bg-navy-950/85 backdrop-blur-sm text-gold-500 text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg border border-white/5">
                  {project.category}
                </span>

                {/* Overlay hover icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-gold-500/90 text-navy-950 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <Eye size={20} />
                  </div>
                </div>
              </div>

              {/* Text Specs */}
              <div className="p-6">
                <h3 className="text-navy-900 dark:text-white font-extrabold text-base sm:text-lg mb-4 line-clamp-1 group-hover:text-gold-500 transition-colors">
                  {project.title}
                </h3>
                
                <div className="grid grid-cols-2 gap-4 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-850/80 pt-4">
                  <div className="flex items-center space-x-1.5">
                    <MapPin size={14} className="text-gold-500 flex-shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 justify-end">
                    <DollarSign size={14} className="text-gold-500 flex-shrink-0" />
                    <span>{project.budget}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Calendar size={14} className="text-gold-500 flex-shrink-0" />
                    <span>{project.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1 justify-end text-gold-500 font-bold">
                    {[...Array(project.rating)].map((_, i) => (
                      <Star key={i} size={11} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeLightbox && (
          <div className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in overflow-y-auto">
            <div className="relative bg-navy-900 border border-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden">
              
              {/* Close button */}
              <button
                onClick={() => setActiveLightbox(null)}
                className="absolute top-4 right-4 z-40 bg-navy-950/80 hover:bg-slate-800 text-slate-400 hover:text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-colors border border-slate-800"
              >
                <X size={18} />
              </button>

              {/* Left Column: Image(s) */}
              <div className="md:w-3/5 bg-slate-950 flex flex-col justify-center relative min-h-[250px] sm:min-h-[350px]">
                <img 
                  src={activeLightbox.image} 
                  alt={activeLightbox.title} 
                  className="w-full h-full object-cover max-h-[60vh]"
                />
                
                {activeLightbox.beforeImage && (
                  <div className="absolute bottom-4 left-4 bg-navy-950/80 border border-slate-800 p-2 rounded-xl flex items-center space-x-2 shadow-lg">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Before & After Available</span>
                  </div>
                )}
              </div>

              {/* Right Column: Description details */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-navy-900 max-h-[60vh] md:max-h-none overflow-y-auto">
                <div className="space-y-4">
                  <span className="inline-block bg-gold-500/10 border border-gold-500/20 text-gold-500 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                    {activeLightbox.category}
                  </span>
                  
                  <h4 className="text-white font-extrabold text-lg sm:text-xl font-grotesk leading-tight">
                    {activeLightbox.title}
                  </h4>
                  
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {activeLightbox.description}
                  </p>
                </div>

                <div className="space-y-3.5 pt-6 border-t border-slate-800/80 mt-6 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center"><MapPin size={14} className="mr-1.5 text-gold-500" /> Location</span>
                    <span className="font-bold text-white">{activeLightbox.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center"><DollarSign size={14} className="mr-1.5 text-gold-500" /> Budget</span>
                    <span className="font-bold text-white">{activeLightbox.budget}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center"><Calendar size={14} className="mr-1.5 text-gold-500" /> Duration</span>
                    <span className="font-bold text-white">{activeLightbox.duration}</span>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <div className="flex items-center space-x-1 text-gold-500">
                      {[...Array(activeLightbox.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
