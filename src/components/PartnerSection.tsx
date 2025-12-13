import { useState } from 'react';
import { Zap, Droplet, Award, Sun, Shield, Lock, Cog, Wrench } from 'lucide-react';

interface Partner {
  id: number;
  name: string;
  logo: string;
  category: string;
  icon: any;
}

const partners: Partner[] = [
  {
    id: 1,
    name: 'Shell',
    logo: 'SHELL',
    category: 'Premium Partner',
    icon: Droplet,
  },
  {
    id: 2,
    name: 'Santander',
    logo: 'SANTANDER',
    category: 'Premium Partner',
    icon: Award,
  },
  {
    id: 3,
    name: 'Puma',
    logo: 'PUMA',
    category: 'Technical Partner',
    icon: Zap,
  },
  {
    id: 4,
    name: 'Ray-Ban',
    logo: 'RAY-BAN',
    category: 'Official Partner',
    icon: Sun,
  },
  {
    id: 5,
    name: 'Pirelli',
    logo: 'PIRELLI',
    category: 'Tire Partner',
    icon: Shield,
  },
  {
    id: 6,
    name: 'Kaspersky',
    logo: 'KASPERSKY',
    category: 'Technology Partner',
    icon: Lock,
  },
  {
    id: 7,
    name: 'Weichai',
    logo: 'WEICHAI',
    category: 'Official Partner',
    icon: Cog,
  },
  {
    id: 8,
    name: 'Mahle',
    logo: 'MAHLE',
    category: 'Technical Partner',
    icon: Wrench,
  },
];

export function PartnerSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-20 bg-black border-y border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className="tracking-widest mb-3"
            style={{ color: 'var(--ferrari-red)' }}
          >
            PARTNERSHIPS
          </div>
          <h2 className="text-white mb-4">Our Global Partners</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Together with world-leading brands, we drive innovation and excellence in motorsport
          </p>
        </div>

        {/* Partners Grid with Neon Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {partners.map((partner) => {
            const Icon = partner.icon;
            return (
              <div
                key={partner.id}
                onMouseEnter={() => setHoveredId(partner.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="partner-card relative group cursor-pointer"
                style={{
                  boxShadow: hoveredId === partner.id 
                    ? '0 0 30px rgba(220, 0, 0, 0.6), 0 0 60px rgba(220, 0, 0, 0.4), 0 0 90px rgba(220, 0, 0, 0.2)' 
                    : '0 0 20px rgba(220, 0, 0, 0.1)',
                  transition: 'all 0.4s ease',
                }}
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 p-8 h-full flex flex-col items-center justify-center overflow-hidden">
                  {/* Animated Background Glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(220, 0, 0, 0.15) 0%, transparent 70%)',
                    }}
                  />

                  {/* Icon Logo */}
                  <div className="relative z-10 mb-4">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500"
                      style={{
                        background: hoveredId === partner.id
                          ? 'linear-gradient(135deg, rgba(220, 0, 0, 0.3), rgba(220, 0, 0, 0.1))'
                          : 'rgba(255, 255, 255, 0.05)',
                        boxShadow: hoveredId === partner.id
                          ? '0 0 20px rgba(220, 0, 0, 0.5), inset 0 0 20px rgba(220, 0, 0, 0.2)'
                          : 'none',
                      }}
                    >
                      <Icon
                        size={36}
                        className="transition-all duration-500"
                        style={{
                          color: hoveredId === partner.id ? 'var(--ferrari-red)' : 'white',
                          filter: hoveredId === partner.id ? 'drop-shadow(0 0 10px rgba(220, 0, 0, 0.8))' : 'none',
                        }}
                      />
                    </div>
                  </div>

                  {/* Partner Name */}
                  <div className="relative z-10 text-center">
                    <div
                      className="text-2xl tracking-widest mb-2 transition-all duration-500"
                      style={{
                        color: hoveredId === partner.id ? 'var(--ferrari-red)' : 'white',
                        textShadow: hoveredId === partner.id 
                          ? '0 0 20px rgba(220, 0, 0, 0.8), 0 0 40px rgba(220, 0, 0, 0.5)' 
                          : 'none',
                      }}
                    >
                      {partner.logo}
                    </div>
                    <div className="text-xs text-white/50 tracking-wide uppercase">
                      {partner.category}
                    </div>
                  </div>

                  {/* Corner Accent Lines */}
                  <div
                    className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 transition-all duration-500"
                    style={{
                      borderColor: hoveredId === partner.id ? 'var(--ferrari-red)' : 'rgba(255, 255, 255, 0.2)',
                      boxShadow: hoveredId === partner.id ? '0 0 10px rgba(220, 0, 0, 0.6)' : 'none',
                    }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 transition-all duration-500"
                    style={{
                      borderColor: hoveredId === partner.id ? 'var(--ferrari-red)' : 'rgba(255, 255, 255, 0.2)',
                      boxShadow: hoveredId === partner.id ? '0 0 10px rgba(220, 0, 0, 0.6)' : 'none',
                    }}
                  />

                  {/* Animated Border */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: hoveredId === partner.id
                        ? 'linear-gradient(90deg, transparent, rgba(220, 0, 0, 0.3), transparent)'
                        : 'none',
                      animation: hoveredId === partner.id ? 'slideGlow 2s infinite' : 'none',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Partnership CTA */}
        <div 
          className="relative p-12 text-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 0 40px rgba(220, 0, 0, 0.2)',
          }}
        >
          {/* Animated Background */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at 30% 50%, rgba(220, 0, 0, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(220, 0, 0, 0.2) 0%, transparent 50%)',
            }}
          />
          
          <div className="relative z-10">
            <h3 className="text-white mb-4">Become a Partner</h3>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Join our family of prestigious partners and be part of racing history. 
              Explore partnership opportunities with the most successful team in Formula 1.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-8 py-4 text-white transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                style={{ 
                  backgroundColor: 'var(--ferrari-red)',
                  boxShadow: '0 0 20px rgba(220, 0, 0, 0.4)',
                }}
              >
                <span className="relative z-10">PARTNERSHIP OPPORTUNITIES</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </button>
              <button 
                className="px-8 py-4 bg-transparent border-2 text-white transition-all duration-300 hover:bg-white hover:text-black relative overflow-hidden"
                style={{ borderColor: 'var(--ferrari-red)' }}
              >
                DOWNLOAD MEDIA KIT
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { value: '50+', label: 'Global Partners' },
            { value: '100M+', label: 'Fan Reach' },
            { value: '24', label: 'Race Weekends' },
            { value: '195', label: 'Countries Reached' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 relative group cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(220, 0, 0, 0.4)';
                e.currentTarget.style.borderColor = 'var(--ferrari-red)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <div 
                className="text-5xl mb-3 transition-all duration-300"
                style={{ 
                  color: 'var(--ferrari-red)',
                }}
              >
                {stat.value}
              </div>
              <div className="text-white/60 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideGlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .partner-card {
          transform-style: preserve-3d;
        }
        
        .partner-card:hover {
          transform: translateY(-8px) scale(1.02);
        }
      `}</style>
    </section>
  );
}
