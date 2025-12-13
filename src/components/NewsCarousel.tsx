import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface NewsItem {
  id: number;
  image: string;
  category: string;
  title: string;
  date: string;
  excerpt: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1696581081893-6b2510101bef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBkcml2ZXIlMjBoZWxtZXR8ZW58MXx8fHwxNzY1NDUyNTU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'TEAM',
    title: 'Driver Lineup Ready for New Season',
    date: 'December 10, 2025',
    excerpt: 'Our championship-winning drivers are prepared to dominate the track with unwavering determination.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1579987323085-529f1a806810?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmMSUyMHBpdCUyMHN0b3B8ZW58MXx8fHwxNzY1NTQxNDUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'TECHNOLOGY',
    title: 'Revolutionary Pit Stop Strategy',
    date: 'December 8, 2025',
    excerpt: 'Introducing cutting-edge technology that reduces pit stop times to unprecedented levels.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1749843990603-cfd2d217dd87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBwb2RpdW0lMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NjU1NDY3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'RACING',
    title: 'Victory at the Last Grand Prix',
    date: 'December 5, 2025',
    excerpt: 'Celebrating another podium finish with exceptional performance on the world stage.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1635414764966-682bd029bb01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtdWxhJTIwb25lJTIwY2FyJTIwdHJhY2t8ZW58MXx8fHwxNzY1NTQ2Nzk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'INNOVATION',
    title: 'Next-Gen Aerodynamic Design',
    date: 'December 3, 2025',
    excerpt: 'Unveiling groundbreaking aerodynamic improvements for maximum speed and efficiency.',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1762857362511-86142780dc43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJyYXJpJTIwZjElMjByYWNpbmd8ZW58MXx8fHwxNzY1NTQ2Nzk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'HERITAGE',
    title: 'Celebrating Decades of Excellence',
    date: 'December 1, 2025',
    excerpt: 'Looking back at the legendary moments that defined our racing legacy.',
  },
];

export function NewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, slidesToShow]);

  const maxIndex = Math.max(0, newsItems.length - slidesToShow);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <section className="py-20 bg-black" style={{ backgroundColor: 'var(--ferrari-dark)' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div
              className="tracking-widest mb-3"
              style={{ color: 'var(--ferrari-red)' }}
            >
              LATEST UPDATES
            </div>
            <h2 className="text-white">News & Stories</h2>
          </div>
          <div className="hidden md:flex gap-3">
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={containerRef}>
          <div
            className="flex transition-transform duration-600 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
            }}
          >
            {newsItems.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / slidesToShow}%` }}
              >
                <div className="group cursor-pointer">
                  {/* Image Container */}
                  <div className="relative h-80 overflow-hidden mb-5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <div
                        className="px-3 py-1 text-xs tracking-widest"
                        style={{ 
                          backgroundColor: 'var(--ferrari-red)',
                          color: 'white'
                        }}
                      >
                        {item.category}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <Calendar size={14} />
                      <span>{item.date}</span>
                    </div>
                    <h3 className="text-white group-hover:text-[var(--ferrari-red)] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {item.excerpt}
                    </p>
                    <button className="text-white/90 hover:text-white flex items-center gap-2 mt-4 group/btn">
                      <span className="tracking-wide">READ MORE</span>
                      <span className="transform transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden justify-center gap-3 mt-8">
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 text-white disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 text-white disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
