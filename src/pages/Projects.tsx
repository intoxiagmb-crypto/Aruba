import React, { useState, useEffect } from 'react';
import { Language, translations } from '../utils/translations';
import { Filter, Eye, Star, X, Info, LayoutGrid, Image, Sparkles } from 'lucide-react';

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
  gallery: string[];
}

export default function Projects({ lang }: ProjectsProps) {
  const t = translations[lang];
  const [filter, setFilter] = useState<string>('all');
  const [activeLightbox, setActiveLightbox] = useState<Project | null>(null);
  
  // Track selected image in lightbox modal
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<string>('');
  
  // Track active photo in general gallery lightbox
  const [activePhotoLightbox, setActivePhotoLightbox] = useState<{ src: string; caption: string; category: string } | null>(null);

  // Sync selected lightbox image with current project main image
  useEffect(() => {
    if (activeLightbox) {
      setSelectedLightboxImage(activeLightbox.image);
    }
  }, [activeLightbox]);

  const projectsData: Project[] = [
    {
      id: 1,
      title: 'Luxury Villa Ceiling Surface Prep & Painting',
      category: 'painting',
      location: 'Noord, Aruba',
      budget: '$18,500',
      duration: '14 Days',
      rating: 5,
      image: '/painting-scaffold-ceiling-prep.jpg',
      beforeImage: '/painting-high-reach-pole-roller.jpg',
      description: 'Comprehensive high-ceiling surface preparation, orbital sanding, and premium anti-salinity elastomeric painting using certified mobile scaffolding systems.',
      gallery: [
        '/painting-scaffold-ceiling-prep.jpg',
        '/painting-ceiling-sander-closeup.jpg',
        '/painting-scaffold-work-platform.jpg',
        '/painting-high-reach-pole-roller.jpg'
      ]
    },
    {
      id: 2,
      title: 'Structural Concrete Foundation Pouring & Rebar Reinforcement',
      category: 'concrete',
      location: 'Eagle Beach, Aruba',
      budget: '$38,000',
      duration: '18 Days',
      rating: 5,
      image: '/concrete-pouring-chute-worker.jpg',
      beforeImage: '/concrete-foundation-pouring-angle.jpg',
      description: 'Site excavation, structural steel rebar framework installation, and direct concrete chute pouring with on-site leveling and curing compounds.',
      gallery: [
        '/concrete-pouring-chute-worker.jpg',
        '/concrete-foundation-pouring-angle.jpg',
        '/concrete-mixer-chute-crew.jpg',
        '/aruba_photos/optimized/dsc09751.jpg'
      ]
    },
    {
      id: 3,
      title: 'Luxury Villa Garden Bed & Tropical Landscaping',
      category: 'landscaping',
      location: 'Palm Beach, Aruba',
      budget: '$28,500',
      duration: '18 Days',
      rating: 5,
      image: '/landscaping-villa-pool-night.jpg',
      beforeImage: '/landscaping-tropical-plants-stones.jpg',
      description: 'Total design and planting of drought-resistant oleander flowers, ornamental shrubs, white river pebble gravel bedding, and synthetic turf lawn borders with smart drip irrigation.',
      gallery: [
        '/landscaping-villa-pool-night.jpg',
        '/landscaping-villa-pool-day.jpg',
        '/landscaping-garden-bed-pebbles.jpg',
        '/landscaping-tropical-plants-stones.jpg',
        '/landscaping-pool-patio-bbq.jpg',
        '/landscaping-pool-villa-turf.jpg'
      ]
    },
    {
      id: 4,
      title: 'Villa Electrical Rough-In & Ceiling Conduit Wiring',
      category: 'electrical',
      location: 'Noord / Oranjestad, Aruba',
      budget: '$18,500',
      duration: '12 Days',
      rating: 5,
      image: '/electrician-ceiling-conduit-wiring.jpg',
      beforeImage: '/electrical-ceiling-conduit-framing.jpg',
      description: 'Comprehensive electrical rough-in installation featuring overhead galvanized steel furring channels, ceiling conduit runs, junction boxes, and temporary site power distribution board.',
      gallery: [
        '/electrician-ceiling-conduit-wiring.jpg',
        '/electrician-scaffolding-conduit-install.jpg',
        '/electrical-ceiling-conduit-framing.jpg',
        '/electrical-rough-in-framing-room.jpg',
        '/electrical-site-power-distribution.jpg'
      ]
    },
    {
      id: 5,
      title: 'Cell towers maintenance/ installation',
      category: 'celltower',
      location: 'San Nicolaas, Aruba',
      budget: '$55,000',
      duration: '30 Days',
      rating: 5,
      image: '/cell-tower-repainting.jpg',
      beforeImage: '/cell-tower-boom-lift.jpg',
      description: 'High-altitude inspection, rust treatment with industrial steel primers, microwave alignment, and application of marine-grade safety aviation paint.',
      gallery: [
        '/cell-tower-repainting.jpg',
        '/cell-tower-antenna-crane.jpg',
        '/cell-tower-boom-lift.jpg',
        '/cell-tower-mast-crane.jpg'
      ]
    },
    {
      id: 6,
      title: 'Modern Residential Villa Addition',
      category: 'construction',
      location: 'Savaneta, Aruba',
      budget: '$120,000',
      duration: '60 Days',
      rating: 5,
      image: '/aruba_photos/optimized/img_1306.jpg',
      beforeImage: '/aruba_photos/optimized/2024-07-07_12-03-23_-_elegant_living_room__beautiful_white_walls___pale_colors__.jpeg',
      description: 'Constructing a 110 m² guest house extension with load-bearing columns, concrete block masonry, roof framing, and full plumbing/electrical wiring.',
      gallery: [
        '/aruba_photos/optimized/img_1306.jpg',
        '/aruba_photos/optimized/2024-07-07_12-03-23_-_elegant_living_room__beautiful_white_walls___pale_colors__.jpeg',
        '/aruba_photos/optimized/img_1232.jpg'
      ]
    },
    {
      id: 7,
      title: 'High-Reach Wall & Ceiling Finishing',
      category: 'painting',
      location: 'Palm Beach, Aruba',
      budget: '$24,000',
      duration: '18 Days',
      rating: 5,
      image: '/painting-high-reach-pole-roller.jpg',
      beforeImage: '/painting-ceiling-sander-closeup.jpg',
      description: 'Precision interior edging, telescopic extension pole application, and dust-controlled ceiling sanding across estate living spaces.',
      gallery: [
        '/painting-high-reach-pole-roller.jpg',
        '/painting-ceiling-sander-closeup.jpg',
        '/painting-scaffold-ceiling-prep.jpg',
        '/painting-scaffold-work-platform.jpg'
      ]
    },
    {
      id: 8,
      title: 'Stamped Concrete Pool Deck & Patio',
      category: 'concrete',
      location: 'Palm Beach, Aruba',
      budget: '$34,000',
      duration: '15 Days',
      rating: 5,
      image: '/aruba_photos/optimized/dsc09751.jpg',
      beforeImage: '/concrete-foundation-pouring-angle.jpg',
      description: 'Structural concrete pouring followed by custom slate-pattern stamp texturing, UV stable color hardener application, and chemical sealing for pool-side grip.',
      gallery: [
        '/aruba_photos/optimized/dsc09751.jpg',
        '/concrete-pouring-chute-worker.jpg',
        '/aruba_photos/optimized/dsc09778.jpg'
      ]
    },
    {
      id: 9,
      title: 'Resort Swimming Pool Surround, Palms & Outdoor Lounge',
      category: 'landscaping',
      location: 'Malmok / Noord, Aruba',
      budget: '$52,000',
      duration: '28 Days',
      rating: 5,
      image: '/landscaping-pool-patio-bbq.jpg',
      beforeImage: '/landscaping-pool-villa-turf.jpg',
      description: 'Complete outdoor living transformation: luxury swimming pool deck finishing, lush tropical palms, outdoor BBQ kitchen integration, and ultra-durable artificial grass turf suited for Aruba sunshine.',
      gallery: [
        '/landscaping-pool-patio-bbq.jpg',
        '/landscaping-pool-villa-turf.jpg',
        '/landscaping-garden-bed-pebbles.jpg',
        '/landscaping-tropical-plants-stones.jpg'
      ]
    }
  ];

  // List of all extracted photos for the General Gallery Grid view
  const allPhotos = [
    { src: '/landscaping-garden-bed-pebbles.jpg', caption: 'White River Pebble Garden Bed & Oleander Planting', category: 'Landscaping' },
    { src: '/landscaping-tropical-plants-stones.jpg', caption: 'Drought-Resistant Tropical Garden Accent Arrangement', category: 'Landscaping' },
    { src: '/landscaping-pool-patio-bbq.jpg', caption: 'Resort Swimming Pool, BBQ Kitchen & Palm Oasis', category: 'Landscaping' },
    { src: '/landscaping-pool-villa-turf.jpg', caption: 'Villa Swimming Pool & Synthetic Turf Installation', category: 'Landscaping' },
    { src: '/electrician-ceiling-conduit-wiring.jpg', caption: 'Ceiling Conduit Wiring & Junction Box Installation', category: 'Electrical' },
    { src: '/electrician-scaffolding-conduit-install.jpg', caption: 'Mobile Scaffold Overhead Electrical Conduit Fitting', category: 'Electrical' },
    { src: '/electrical-ceiling-conduit-framing.jpg', caption: 'Ceiling Metal Furring & Conduit Distribution Box', category: 'Electrical' },
    { src: '/electrical-rough-in-framing-room.jpg', caption: 'Electrical Rough-In & Metal Ceiling Grid Staging', category: 'Electrical' },
    { src: '/electrical-site-power-distribution.jpg', caption: 'On-Site Heavy Duty Power Distribution Board', category: 'Electrical' },
    { src: '/painting-scaffold-ceiling-prep.jpg', caption: 'Ceiling Sanding & Mobile Scaffolding Setup', category: 'Painting' },
    { src: '/painting-ceiling-sander-closeup.jpg', caption: 'Precision Surface Sanding with PPE Dust Mask', category: 'Painting' },
    { src: '/painting-scaffold-work-platform.jpg', caption: 'Mobile Scaffold Platform & Primer Prep Work', category: 'Painting' },
    { src: '/painting-high-reach-pole-roller.jpg', caption: 'Telescopic Extension Pole High-Reach Painting', category: 'Painting' },
    { src: '/concrete-pouring-chute-worker.jpg', caption: 'Concrete Chute Pouring & Rebar Setup', category: 'Beton & Concrete' },
    { src: '/concrete-foundation-pouring-angle.jpg', caption: 'Foundation Concrete Pouring & Leveling', category: 'Beton & Concrete' },
    { src: '/concrete-mixer-chute-crew.jpg', caption: 'Crew Directing Mixer Truck Chute', category: 'Beton & Concrete' },
    { src: '/aruba_photos/optimized/2024-07-11_20-10-42_-_create_an_image_of_a_modern__luxurious_house_with_a_minimalist_design__the_facade_should_feature_cle.jpeg', caption: 'Luxury Villa Exterior', category: 'Construction' },
    { src: '/aruba_photos/optimized/2024-07-07_12-03-23_-_elegant_living_room__beautiful_white_walls___pale_colors__.jpeg', caption: 'Modern Open Living Space', category: 'Cabinetry & Remodel' },
    { src: '/aruba_photos/optimized/dsc09751.jpg', caption: 'Concrete Deck Pouring', category: 'Beton & Concrete' },
    { src: '/aruba_photos/optimized/dsc09778.jpg', caption: 'Resort Surrounds Paving Installation', category: 'Beton & Concrete' },
    { src: '/aruba_photos/optimized/dsc09684.jpg', caption: 'Mast Inspection & Base Prep', category: 'Telecom Towers' },
    { src: '/cell-tower-repainting.jpg', caption: 'Cell Tower Antenna Rigging & Crane Service', category: 'Telecom Towers' },
    { src: '/cell-tower-boom-lift.jpg', caption: 'High-Reach Cherry Picker Maintenance (Snorkel 126 Ft)', category: 'Telecom Towers' },
    { src: '/cell-tower-mast-crane.jpg', caption: 'Cell Tower Lattice Mast Crane Installation', category: 'Telecom Towers' },
    { src: '/aruba_photos/optimized/img_1306.jpg', caption: 'Villa Patio Entrance & Finishing', category: 'Construction' },
    { src: '/aruba_photos/optimized/img_1310.jpg', caption: 'Resort Villa Courtyard & Pool', category: 'Landscaping' },
    { src: '/aruba_photos/optimized/img_1315.jpg', caption: 'Patio Slider Door & Poolside View', category: 'Construction' },
    { src: '/aruba_photos/optimized/img_1316.jpg', caption: 'Custom Built-In Walk-In Closet', category: 'Cabinetry & Remodel' },
    { src: '/aruba_photos/optimized/img_1335.jpg', caption: 'Luxury Stone Basin Bathroom Vanity', category: 'Construction' }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'painting', label: 'Painting' },
    { id: 'concrete', label: 'Beton & Concrete' },
    { id: 'landscaping', label: 'Landscaping' },
    { id: 'electrical', label: 'Electrical' },
    { id: 'celltower', label: 'Telecom Towers' },
    { id: 'construction', label: 'Construction' },
    { id: 'gallery', label: 'Photo Gallery' } // Added this line
  ];

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <div className="pt-24 pb-12 bg-slate-50 dark:bg-navy-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
          <h1 className="text-xs uppercase tracking-widest text-gold-500 font-bold mb-3 flex items-center justify-center gap-1.5">
            <LayoutGrid size={12} className="animate-pulse" />
            <span>{lang === 'pap' ? 'Nos Portfolio' : lang === 'nl' ? 'Ons Portfolio' : 'Project Portfolio'}</span>
          </h1>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            {filter === 'gallery' 
              ? (lang === 'pap' ? 'Galeria di Fotos di Proyecto' : lang === 'nl' ? 'Project Fotogalerij' : 'All Site Photos')
              : (lang === 'pap' ? 'Mira Nos Trabounan mas Reciente' : lang === 'nl' ? 'Ontdek Onze Recente Projecten' : 'Exceptional Workmanship in Aruba')
            }
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto mt-4 rounded-full shadow-md shadow-gold-500/20" />
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 border flex items-center gap-1.5 ${
                filter === cat.id
                  ? 'bg-gold-500 text-navy-950 border-gold-500 shadow-md'
                  : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-gold-500/30'
              }`}
            >
              {cat.id === 'gallery' && <Image size={13} />}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Display depending on filter selection */}
        {filter === 'gallery' ? (
          /* General Photo Gallery Grid view */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 animate-fade-in">
            {allPhotos.map((photo, index) => (
              <div
                key={index}
                onClick={() => setActivePhotoLightbox(photo)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative aspect-square"
              >
                <img 
                  src={photo.src} 
                  alt={photo.caption} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Floating category tag */}
                <span className="absolute top-3 left-3 bg-navy-950/80 backdrop-blur-sm text-gold-500 text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded border border-white/5 z-10">
                  {photo.category}
                </span>
                
                {/* Overlay hover specs */}
                <div className="absolute inset-0 bg-navy-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="flex items-center gap-1.5 text-gold-500 mb-1">
                    <Eye size={14} />
                    <span className="text-[10px] uppercase font-black tracking-widest">Enlarge Photo</span>
                  </div>
                  <p className="text-white text-xs font-bold leading-snug line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Standard Projects Grid view */
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
                  <div className="absolute inset-0 bg-navy-950/15 group-hover:bg-navy-950/0 transition-colors duration-300 pointer-events-none" />
                  
                  {/* Float tag */}
                  <span className="absolute top-4 left-4 bg-navy-950/85 backdrop-blur-sm text-gold-500 text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg border border-white/5">
                    {project.category}
                  </span>

                  {/* Gallery overlay indicator */}
                  <span className="absolute top-4 right-4 bg-navy-950/80 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded flex items-center gap-1 border border-white/5">
                    <Image size={10} className="text-gold-500" />
                    <span>{project.gallery.length} Photos</span>
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
                  <h3 className="text-navy-900 dark:text-white font-extrabold text-base sm:text-lg mb-2 line-clamp-2 min-h-[3rem] group-hover:text-gold-500 transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-850/80 pt-4 text-gold-500 font-bold">
                    <span className="text-xs text-slate-400 font-normal capitalize tracking-widest">{project.category}</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(project.rating)].map((_, i) => (
                        <Star key={i} size={11} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Project Details Lightbox Modal */}
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

              {/* Left Column: Main Image & Gallery Selector Grid */}
              <div className="w-full md:w-3/5 bg-slate-950 relative flex flex-col justify-between p-4 border-r border-slate-800">
                <div className="h-64 sm:h-80 md:h-[450px] w-full overflow-hidden rounded-2xl bg-navy-950 flex items-center justify-center">
                  <img 
                    src={selectedLightboxImage} 
                    alt={activeLightbox.title} 
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                </div>
                
                {/* Thumbnails grid gallery */}
                <div className="mt-4">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2 px-1">
                    <LayoutGrid size={11} className="text-gold-500" />
                    <span>Project Photos Grid</span>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {activeLightbox.gallery.map((imgSrc, i) => (
                      <div
                        key={i}
                        onClick={() => setSelectedLightboxImage(imgSrc)}
                        className={`h-12 sm:h-14 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                          selectedLightboxImage === imgSrc 
                            ? 'border-gold-500 scale-102 shadow-md shadow-gold-500/10' 
                            : 'border-slate-850 opacity-60 hover:opacity-100 hover:border-slate-700'
                        }`}
                      >
                        <img src={imgSrc} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {activeLightbox.beforeImage && (
                      <div
                        onClick={() => setSelectedLightboxImage(activeLightbox.beforeImage!)}
                        className={`h-12 sm:h-14 rounded-lg overflow-hidden border-2 cursor-pointer relative transition-all ${
                          selectedLightboxImage === activeLightbox.beforeImage 
                            ? 'border-gold-500 scale-102 shadow-md' 
                            : 'border-slate-850 opacity-60 hover:opacity-100 hover:border-slate-700'
                        }`}
                      >
                        <img src={activeLightbox.beforeImage} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-orange-500/25 flex items-center justify-center">
                          <span className="text-[7px] text-white font-bold uppercase tracking-wider bg-navy-950/80 px-1 rounded-sm">Before</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Description details */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-navy-900 max-h-[50vh] md:max-h-none overflow-y-auto">
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
                  
                  <div className="pt-4 space-y-2 text-xs">
                    <div className="flex justify-between border-b border-slate-850 pb-2">
                      <span className="text-slate-500">Location</span>
                      <span className="text-white font-semibold">{activeLightbox.location}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-850 pb-2">
                      <span className="text-slate-500">Project Budget</span>
                      <span className="text-gold-500 font-bold">{activeLightbox.budget}</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-slate-500">Duration</span>
                      <span className="text-white font-semibold">{activeLightbox.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800/80 mt-6 flex justify-between items-center text-xs sm:text-sm text-slate-350">
                  <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Client Rating</span>
                  <div className="flex items-center space-x-1 text-gold-500">
                    {[...Array(activeLightbox.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* General Gallery Lightbox Modal */}
        {activePhotoLightbox && (
          <div className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
            <div className="relative bg-navy-900 border border-slate-800 rounded-3xl w-full max-w-3xl shadow-2xl p-4 flex flex-col items-center">
              
              {/* Close button */}
              <button
                onClick={() => setActivePhotoLightbox(null)}
                className="absolute top-4 right-4 z-40 bg-navy-950/80 hover:bg-slate-800 text-slate-400 hover:text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-colors border border-slate-800"
              >
                <X size={18} />
              </button>

              <div className="w-full max-h-[70vh] rounded-2xl overflow-hidden bg-navy-950 flex items-center justify-center mt-6">
                <img 
                  src={activePhotoLightbox.src} 
                  alt={activePhotoLightbox.caption} 
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              </div>
              
              <div className="w-full pt-4 text-center">
                <span className="bg-gold-500/10 border border-gold-500/20 text-gold-500 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                  {activePhotoLightbox.category}
                </span>
                <p className="text-white font-bold text-sm mt-2">
                  {activePhotoLightbox.caption}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
