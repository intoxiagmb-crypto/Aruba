import React from 'react';
import { Language, translations } from '../utils/translations';
import { Clock, Calendar, ArrowRight, Eye } from 'lucide-react';

interface BlogProps {
  lang: Language;
}

export default function Blog({ lang }: BlogProps) {
  const t = translations[lang];

  const blogPosts = [
    {
      id: 1,
      title: 'How to Protect Your Exterior Paint from Saline Sea Air',
      desc: 'Discover why standard paint peels off in coastal areas like Palm Beach and how specialized elastomeric sealers prevent salinity degradation.',
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80',
      category: 'Painting',
      date: 'June 28, 2026',
      readTime: '5 Min Read'
    },
    {
      id: 2,
      title: 'Coastal Electrical Safety: Preventing Oxidation in Panels',
      desc: 'Breaker panels in tropical climates are prone to rapid green copper oxidation. Learn how zinc coatings and sealed enclosures shield your circuits.',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
      category: 'Electrical',
      date: 'June 20, 2026',
      readTime: '6 Min Read'
    },
    {
      id: 3,
      title: 'Pouring Concrete in Hot Climates: Curing Tips',
      desc: 'Aruba\'s trade winds and high solar temperatures cause wet concrete to lose water rapidly. We list curing sealers and expansion spacing tricks.',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80',
      category: 'Concrete',
      date: 'June 10, 2026',
      readTime: '7 Min Read'
    },
    {
      id: 4,
      title: 'Irrigation Secrets: Saving 40% on Water Bills',
      desc: 'Web Aruba water is valuable. Using automated drip lines, smart soil hygrometers, and organic mulch keeps your gardens lush without wasting money.',
      image: '/aruba_photos/optimized/dsc09778.jpg',
      category: 'Landscaping',
      date: 'May 25, 2026',
      readTime: '4 Min Read'
    }
  ];

  return (
    <div className="pt-24 pb-12 bg-slate-50 dark:bg-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-xs uppercase tracking-widest text-gold-500 font-bold mb-3">Resource Hub</h1>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight font-grotesk">
            Construction & Maintenance Guide
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-4 leading-relaxed max-w-xl mx-auto">
            Read professional insights, engineering tips, and property maintenance advice curated by our supervisors.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {blogPosts.map((post) => (
            <div 
              key={post.id} 
              className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image */}
              <div className="h-56 overflow-hidden relative bg-slate-800">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-navy-950/85 backdrop-blur-sm text-gold-500 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                  {post.category}
                </span>
              </div>

              {/* Text */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center space-x-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <span className="flex items-center"><Calendar size={12} className="mr-1" /> {post.date}</span>
                    <span className="flex items-center"><Clock size={12} className="mr-1" /> {post.readTime}</span>
                  </div>
                  
                  <h3 className="text-navy-900 dark:text-white font-extrabold text-base sm:text-lg line-clamp-2 group-hover:text-gold-500 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {post.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-850/80 mt-6 flex justify-between items-center text-xs">
                  <button
                    onClick={() => alert(`Opening Article "${post.title}" (Mock Article)`)}
                    className="text-gold-500 hover:text-orange-500 font-bold uppercase tracking-widest flex items-center"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <span className="text-slate-400 flex items-center"><Eye size={12} className="mr-1" /> {Math.floor(100 + Math.random() * 900)} Views</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
