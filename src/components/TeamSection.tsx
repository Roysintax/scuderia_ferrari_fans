import { useState } from 'react';
import { User, History, Briefcase, Award, Target, Users, Instagram, Twitter, Facebook } from 'lucide-react';

type Tab = 'drivers' | 'history' | 'careers';

interface Driver {
  id: number;
  name: string;
  number: number;
  nationality: string;
  image: string;
  championships: number;
  podiums: number;
  races: number;
  socials: {
    instagram: string;
    twitter: string;
    facebook: string;
  };
}

interface HistoryEvent {
  id: number;
  year: number;
  title: string;
  description: string;
  achievement: string;
  icon: any;
}

interface Career {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

const drivers: Driver[] = [
  {
    id: 1,
    name: 'Charles Leclerc',
    number: 16,
    nationality: 'Monaco',
    image: 'https://images.unsplash.com/photo-1603143705338-72cf1ed5b39c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmMSUyMGRyaXZlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NTU0NzY0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    championships: 0,
    podiums: 28,
    races: 115,
    socials: {
      instagram: '@charles_leclerc',
      twitter: '@Charles_Leclerc',
      facebook: 'CharlesLeclerc',
    },
  },
  {
    id: 2,
    name: 'Carlos Sainz',
    number: 55,
    nationality: 'Spain',
    image: 'https://images.unsplash.com/photo-1765202661304-72d1dd085c1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBkcml2ZXIlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY1NTQ3NjQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    championships: 0,
    podiums: 19,
    races: 185,
    socials: {
      instagram: '@carlossainz55',
      twitter: '@Carlossainz55',
      facebook: 'CarlosSainz',
    },
  },
];

const historyEvents: HistoryEvent[] = [
  {
    id: 1,
    year: 1950,
    title: 'The Beginning',
    description: 'First Formula 1 race at Silverstone, marking the start of an incredible journey',
    achievement: 'First F1 Season',
    icon: Flag,
  },
  {
    id: 2,
    year: 1961,
    title: 'First Championship',
    description: 'Phil Hill becomes the first American World Champion',
    achievement: 'World Championship',
    icon: Trophy,
  },
  {
    id: 3,
    year: 1975,
    title: 'Lauda Era Begins',
    description: 'Niki Lauda wins his first championship, starting a dominant period',
    achievement: "Driver's Championship",
    icon: Award,
  },
  {
    id: 4,
    year: 2000,
    title: 'New Millennium Dominance',
    description: 'Michael Schumacher begins unprecedented winning streak',
    achievement: '5 Consecutive Titles',
    icon: Target,
  },
  {
    id: 5,
    year: 2007,
    title: 'Kimi Räikkönen Triumph',
    description: 'The Iceman secures the championship in dramatic fashion',
    achievement: "Driver's Championship",
    icon: Award,
  },
  {
    id: 6,
    year: 2025,
    title: 'Future Glory',
    description: 'Building towards championship success with new talent and technology',
    achievement: 'Ongoing Season',
    icon: Users,
  },
];

const careers: Career[] = [
  {
    id: 1,
    title: 'Aerodynamics Engineer',
    department: 'Engineering',
    location: 'Maranello, Italy',
    type: 'Full-time',
    description: 'Lead the development of cutting-edge aerodynamic solutions for our championship-winning cars',
  },
  {
    id: 2,
    title: 'Race Strategy Analyst',
    department: 'Racing Operations',
    location: 'Maranello, Italy',
    type: 'Full-time',
    description: 'Analyze race data and develop winning strategies for race weekends',
  },
  {
    id: 3,
    title: 'Performance Engineer',
    department: 'Vehicle Performance',
    location: 'Maranello, Italy',
    type: 'Full-time',
    description: 'Optimize car performance through data analysis and simulation',
  },
  {
    id: 4,
    title: 'Social Media Manager',
    department: 'Marketing & Communications',
    location: 'Remote / Maranello',
    type: 'Full-time',
    description: 'Manage global social media presence and engage with millions of fans worldwide',
  },
];

// Import Flag and Trophy icons
import { Flag, Trophy } from 'lucide-react';

export function TeamSection() {
  const [activeTab, setActiveTab] = useState<Tab>('drivers');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-black to-[var(--ferrari-gray)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="tracking-widest mb-3" style={{ color: 'var(--ferrari-red)' }}>
            TEAM
          </div>
          <h2 className="text-white mb-4">Scuderia Excellence</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Meet the people and legacy behind the Prancing Horse
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12 gap-4 flex-wrap">
          {[
            { id: 'drivers' as Tab, label: 'Drivers', icon: User },
            { id: 'history' as Tab, label: 'History', icon: History },
            { id: 'careers' as Tab, label: 'Careers', icon: Briefcase },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-8 py-4 flex items-center gap-3 transition-all duration-300 relative overflow-hidden"
                style={{
                  background: activeTab === tab.id
                    ? 'linear-gradient(135deg, rgba(220, 0, 0, 0.3), rgba(220, 0, 0, 0.1))'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: `2px solid ${activeTab === tab.id ? 'var(--ferrari-red)' : 'rgba(255, 255, 255, 0.1)'}`,
                  boxShadow: activeTab === tab.id
                    ? '0 0 30px rgba(220, 0, 0, 0.5), inset 0 0 20px rgba(220, 0, 0, 0.2)'
                    : 'none',
                  color: activeTab === tab.id ? 'var(--ferrari-red)' : 'white',
                }}
              >
                <Icon size={20} />
                <span className="tracking-wide">{tab.label}</span>
                {activeTab === tab.id && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{
                      background: 'var(--ferrari-red)',
                      boxShadow: '0 0 10px rgba(220, 0, 0, 0.8)',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Drivers Tab */}
        {activeTab === 'drivers' && (
          <div className="grid md:grid-cols-2 gap-8">
            {drivers.map((driver, index) => (
              <div
                key={driver.id}
                onMouseEnter={() => setHoveredId(driver.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${hoveredId === driver.id ? 'var(--ferrari-red)' : 'rgba(255, 255, 255, 0.2)'}`,
                  boxShadow: hoveredId === driver.id
                    ? '0 0 50px rgba(220, 0, 0, 0.6), inset 0 0 30px rgba(220, 0, 0, 0.1)'
                    : '0 4px 20px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.5s ease',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
                }}
              >
                {/* Driver Image */}
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={driver.image}
                    alt={driver.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  {/* Driver Number */}
                  <div
                    className="absolute top-6 right-6 w-20 h-20 rounded-full flex items-center justify-center text-5xl transition-all duration-500"
                    style={{
                      background: 'linear-gradient(135deg, rgba(220, 0, 0, 0.4), rgba(220, 0, 0, 0.2))',
                      border: '2px solid var(--ferrari-red)',
                      color: 'var(--ferrari-red)',
                      boxShadow: hoveredId === driver.id
                        ? '0 0 40px rgba(220, 0, 0, 0.8)'
                        : '0 0 20px rgba(220, 0, 0, 0.4)',
                      textShadow: '0 0 20px rgba(220, 0, 0, 0.8)',
                    }}
                  >
                    {driver.number}
                  </div>
                </div>

                {/* Driver Info */}
                <div className="p-6">
                  <h3 className="text-white mb-2">{driver.name}</h3>
                  <div className="text-white/60 mb-4">{driver.nationality}</div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3" style={{ background: 'rgba(220, 0, 0, 0.1)', border: '1px solid rgba(220, 0, 0, 0.3)' }}>
                      <div className="text-2xl mb-1" style={{ color: 'var(--ferrari-red)' }}>
                        {driver.championships}
                      </div>
                      <div className="text-xs text-white/60">TITLES</div>
                    </div>
                    <div className="text-center p-3" style={{ background: 'rgba(220, 0, 0, 0.1)', border: '1px solid rgba(220, 0, 0, 0.3)' }}>
                      <div className="text-2xl mb-1" style={{ color: 'var(--ferrari-red)' }}>
                        {driver.podiums}
                      </div>
                      <div className="text-xs text-white/60">PODIUMS</div>
                    </div>
                    <div className="text-center p-3" style={{ background: 'rgba(220, 0, 0, 0.1)', border: '1px solid rgba(220, 0, 0, 0.3)' }}>
                      <div className="text-2xl mb-1" style={{ color: 'var(--ferrari-red)' }}>
                        {driver.races}
                      </div>
                      <div className="text-xs text-white/60">RACES</div>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <div className="text-white/60 text-xs tracking-wide mb-3">FOLLOW</div>
                    <div className="flex items-center justify-center gap-3">
                      <a 
                        href={`https://www.instagram.com/${driver.socials.instagram.replace('@', '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group/social"
                        style={{
                          background: 'linear-gradient(135deg, rgba(220, 0, 0, 0.2), rgba(220, 0, 0, 0.1))',
                          border: '1px solid rgba(220, 0, 0, 0.3)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(220, 0, 0, 0.5), rgba(220, 0, 0, 0.3))';
                          e.currentTarget.style.boxShadow = '0 0 20px rgba(220, 0, 0, 0.6)';
                          e.currentTarget.style.transform = 'translateY(-3px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(220, 0, 0, 0.2), rgba(220, 0, 0, 0.1))';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <Instagram size={20} style={{ color: 'var(--ferrari-red)' }} />
                      </a>
                      <a 
                        href={`https://www.twitter.com/${driver.socials.twitter.replace('@', '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group/social"
                        style={{
                          background: 'linear-gradient(135deg, rgba(220, 0, 0, 0.2), rgba(220, 0, 0, 0.1))',
                          border: '1px solid rgba(220, 0, 0, 0.3)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(220, 0, 0, 0.5), rgba(220, 0, 0, 0.3))';
                          e.currentTarget.style.boxShadow = '0 0 20px rgba(220, 0, 0, 0.6)';
                          e.currentTarget.style.transform = 'translateY(-3px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(220, 0, 0, 0.2), rgba(220, 0, 0, 0.1))';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <Twitter size={20} style={{ color: 'var(--ferrari-red)' }} />
                      </a>
                      <a 
                        href={`https://www.facebook.com/${driver.socials.facebook}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group/social"
                        style={{
                          background: 'linear-gradient(135deg, rgba(220, 0, 0, 0.2), rgba(220, 0, 0, 0.1))',
                          border: '1px solid rgba(220, 0, 0, 0.3)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(220, 0, 0, 0.5), rgba(220, 0, 0, 0.3))';
                          e.currentTarget.style.boxShadow = '0 0 20px rgba(220, 0, 0, 0.6)';
                          e.currentTarget.style.transform = 'translateY(-3px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(220, 0, 0, 0.2), rgba(220, 0, 0, 0.1))';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <Facebook size={20} style={{ color: 'var(--ferrari-red)' }} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Neon Border Effect */}
                {hoveredId === driver.id && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(220, 0, 0, 0.4), transparent)',
                      animation: 'slideGlow 2s infinite',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="relative">
            {/* Vertical Timeline */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-1 hidden lg:block"
              style={{
                background: 'linear-gradient(to bottom, transparent, var(--ferrari-red), var(--ferrari-red), transparent)',
                boxShadow: '0 0 20px rgba(220, 0, 0, 0.6)',
              }}
            />

            <div className="space-y-12">
              {historyEvents.map((event, index) => {
                const Icon = event.icon;
                const isLeft = index % 2 === 0;
                
                return (
                  <div
                    key={event.id}
                    className={`relative flex ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col items-center gap-8`}
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
                    }}
                  >
                    {/* Timeline Dot */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full hidden lg:block z-10"
                      style={{
                        background: 'var(--ferrari-red)',
                        boxShadow: '0 0 30px rgba(220, 0, 0, 1), 0 0 60px rgba(220, 0, 0, 0.5)',
                        border: '3px solid black',
                      }}
                    />

                    {/* Card */}
                    <div
                      onMouseEnter={() => setHoveredId(event.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="lg:w-5/12 w-full relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${hoveredId === event.id ? 'var(--ferrari-red)' : 'rgba(255, 255, 255, 0.2)'}`,
                        boxShadow: hoveredId === event.id
                          ? '0 0 50px rgba(220, 0, 0, 0.5)'
                          : '0 4px 20px rgba(0, 0, 0, 0.3)',
                        transition: 'all 0.5s ease',
                      }}
                    >
                      <div className="p-8">
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className="w-16 h-16 rounded-full flex items-center justify-center"
                            style={{
                              background: 'linear-gradient(135deg, rgba(220, 0, 0, 0.3), rgba(220, 0, 0, 0.1))',
                              border: '2px solid var(--ferrari-red)',
                              boxShadow: '0 0 20px rgba(220, 0, 0, 0.4)',
                            }}
                          >
                            <Icon size={28} style={{ color: 'var(--ferrari-red)' }} />
                          </div>
                          <div
                            className="text-5xl tracking-tight"
                            style={{
                              color: 'var(--ferrari-red)',
                              textShadow: hoveredId === event.id ? '0 0 20px rgba(220, 0, 0, 0.8)' : 'none',
                            }}
                          >
                            {event.year}
                          </div>
                        </div>
                        
                        <h3 className="text-white mb-3">{event.title}</h3>
                        <p className="text-white/70 mb-4 leading-relaxed">{event.description}</p>
                        
                        <div
                          className="inline-block px-4 py-2 text-sm tracking-wide"
                          style={{
                            background: 'rgba(220, 0, 0, 0.2)',
                            border: '1px solid var(--ferrari-red)',
                            color: 'var(--ferrari-red)',
                          }}
                        >
                          {event.achievement}
                        </div>
                      </div>

                      {/* Corner Accents */}
                      <div
                        className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 transition-all duration-500"
                        style={{
                          borderColor: hoveredId === event.id ? 'var(--ferrari-red)' : 'rgba(255, 255, 255, 0.2)',
                          boxShadow: hoveredId === event.id ? '0 0 15px rgba(220, 0, 0, 0.6)' : 'none',
                        }}
                      />
                    </div>

                    {/* Empty space for alternating layout */}
                    <div className="hidden lg:block lg:w-5/12" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Careers Tab */}
        {activeTab === 'careers' && (
          <div className="space-y-6">
            {careers.map((career, index) => (
              <div
                key={career.id}
                onMouseEnter={() => setHoveredId(career.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${hoveredId === career.id ? 'var(--ferrari-red)' : 'rgba(255, 255, 255, 0.2)'}`,
                  boxShadow: hoveredId === career.id
                    ? '0 0 40px rgba(220, 0, 0, 0.5), inset 0 0 20px rgba(220, 0, 0, 0.1)'
                    : '0 4px 20px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.4s ease',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(220, 0, 0, 0.3), rgba(220, 0, 0, 0.1))',
                          border: '1px solid rgba(220, 0, 0, 0.5)',
                        }}
                      >
                        <Briefcase size={24} style={{ color: 'var(--ferrari-red)' }} />
                      </div>
                      <div>
                        <h3 className="text-white">{career.title}</h3>
                        <div className="text-white/60 text-sm">{career.department}</div>
                      </div>
                    </div>
                    
                    <p className="text-white/70 mb-4 leading-relaxed">{career.description}</p>
                    
                    <div className="flex flex-wrap gap-3">
                      <div
                        className="px-3 py-1 text-sm"
                        style={{
                          background: 'rgba(220, 0, 0, 0.15)',
                          border: '1px solid rgba(220, 0, 0, 0.3)',
                          color: 'var(--ferrari-red)',
                        }}
                      >
                        {career.location}
                      </div>
                      <div
                        className="px-3 py-1 text-sm"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          color: 'white',
                        }}
                      >
                        {career.type}
                      </div>
                    </div>
                  </div>

                  <button
                    className="px-8 py-4 text-white transition-all duration-300 hover:scale-105 whitespace-nowrap"
                    style={{
                      background: 'linear-gradient(135deg, var(--ferrari-red), #a00000)',
                      boxShadow: '0 0 20px rgba(220, 0, 0, 0.4)',
                    }}
                  >
                    APPLY NOW
                  </button>
                </div>

                {/* Animated Border */}
                {hoveredId === career.id && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(220, 0, 0, 0.3), transparent)',
                      animation: 'slideGlow 2s infinite',
                    }}
                  />
                )}
              </div>
            ))}

            {/* CTA Section */}
            <div
              className="mt-12 p-12 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(220, 0, 0, 0.2), rgba(220, 0, 0, 0.05))',
                border: '2px solid var(--ferrari-red)',
                boxShadow: '0 0 50px rgba(220, 0, 0, 0.3)',
              }}
            >
              <h3 className="text-white mb-4">Join the Prancing Horse</h3>
              <p className="text-white/70 text-lg mb-6 max-w-2xl mx-auto">
                Be part of motorsport's most iconic team. Explore opportunities to shape the future of racing.
              </p>
              <button
                className="px-12 py-4 text-white transition-all duration-300 hover:scale-105"
                style={{
                  background: 'var(--ferrari-red)',
                  boxShadow: '0 0 30px rgba(220, 0, 0, 0.6)',
                }}
              >
                VIEW ALL POSITIONS
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideGlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}