import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1762857362511-86142780dc43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJyYXJpJTIwZjElMjByYWNpbmd8ZW58MXx8fHwxNzY1NTQ2Nzk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'PASSION',
    subtitle: 'FOR VICTORY',
    description: 'Experience the thrill of Formula 1 racing with unprecedented speed and precision',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1635414764966-682bd029bb01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtdWxhJTIwb25lJTIwY2FyJTIwdHJhY2t8ZW58MXx8fHwxNzY1NTQ2Nzk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'INNOVATION',
    subtitle: 'IN MOTION',
    description: 'Pushing the boundaries of engineering excellence on every corner',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1593427934550-4742b652ac84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXIlMjByYWNpbmd8ZW58MXx8fHwxNzY1NTA1OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'PERFORMANCE',
    subtitle: 'REDEFINED',
    description: 'Where cutting-edge technology meets legendary racing heritage',
  },
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 800);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: index === currentIndex ? 1 : 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full flex items-center z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <div
              key={`badge-${currentIndex}`}
              className="inline-block mb-2 px-4 py-1.5 border tracking-widest animate-fadeIn"
              style={{ 
                borderColor: 'var(--ferrari-red)',
                color: 'var(--ferrari-red)'
              }}
            >
              2025 SEASON
            </div>
            <h1
              key={`title-${currentIndex}`}
              className="mb-4 text-white animate-fadeInUp"
            >
              {currentSlide.title}
              <br />
              <span style={{ color: 'var(--ferrari-red)' }}>{currentSlide.subtitle}</span>
            </h1>
            <p
              key={`desc-${currentIndex}`}
              className="text-xl text-white/80 mb-8 max-w-2xl animate-fadeInUp"
              style={{ animationDelay: '0.1s' }}
            >
              {currentSlide.description}
            </p>
            <div
              key={`buttons-${currentIndex}`}
              className="flex gap-4 animate-fadeInUp"
              style={{ animationDelay: '0.2s' }}
            >
              <button
                className="px-8 py-4 text-white transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: 'var(--ferrari-red)' }}
              >
                EXPLORE MORE
              </button>
              <button className="px-8 py-4 bg-transparent border border-white text-white transition-all duration-300 hover:bg-white hover:text-black">
                WATCH VIDEO
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Navigation */}
      <div className="absolute bottom-20 right-8 lg:right-16 flex gap-4 z-20">
        <button
          onClick={handlePrev}
          disabled={isAnimating}
          className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          disabled={isAnimating}
          className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), 800);
              }
            }}
            className={`h-1 transition-all duration-300 ${
              index === currentIndex
                ? 'w-12 bg-[var(--ferrari-red)]'
                : 'w-8 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2 animate-bounce z-20">
        <span className="text-xs tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent" />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
}
