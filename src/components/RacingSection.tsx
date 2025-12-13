import { useState } from 'react';
import { Calendar, Trophy, Flag, MapPin, Clock, Medal, ChevronLeft, ChevronRight } from 'lucide-react';

type Tab = 'calendar' | 'results' | 'standings';

interface RaceEvent {
  id: number;
  round: number;
  name: string;
  location: string;
  date: string;
  status: 'completed' | 'upcoming' | 'live';
  circuit: string;
}

interface RaceResult {
  id: number;
  race: string;
  date: string;
  position: number;
  driver: string;
  time: string;
  points: number;
  image: string;
  circuit: string;
  laps: number;
}

interface Standing {
  position: number;
  driver: string;
  team: string;
  points: number;
  wins: number;
}

const calendarEvents: RaceEvent[] = [
  { id: 1, round: 1, name: 'Bahrain Grand Prix', location: 'Bahrain', date: 'Mar 2, 2025', status: 'completed', circuit: 'Bahrain International Circuit' },
  { id: 2, round: 2, name: 'Saudi Arabian Grand Prix', location: 'Jeddah', date: 'Mar 9, 2025', status: 'completed', circuit: 'Jeddah Corniche Circuit' },
  { id: 3, round: 3, name: 'Australian Grand Prix', location: 'Melbourne', date: 'Mar 23, 2025', status: 'completed', circuit: 'Albert Park Circuit' },
  { id: 4, round: 4, name: 'Japanese Grand Prix', location: 'Suzuka', date: 'Apr 6, 2025', status: 'live', circuit: 'Suzuka International Racing Course' },
  { id: 5, round: 5, name: 'Chinese Grand Prix', location: 'Shanghai', date: 'Apr 20, 2025', status: 'upcoming', circuit: 'Shanghai International Circuit' },
  { id: 6, round: 6, name: 'Miami Grand Prix', location: 'Miami', date: 'May 4, 2025', status: 'upcoming', circuit: 'Miami International Autodrome' },
  { id: 7, round: 7, name: 'Emilia Romagna Grand Prix', location: 'Imola', date: 'May 18, 2025', status: 'upcoming', circuit: 'Autodromo Enzo e Dino Ferrari' },
  { id: 8, round: 8, name: 'Monaco Grand Prix', location: 'Monaco', date: 'May 25, 2025', status: 'upcoming', circuit: 'Circuit de Monaco' },
];

const results: RaceResult[] = [
  { 
    id: 1, 
    race: 'Bahrain Grand Prix', 
    date: 'Mar 2, 2025', 
    position: 1, 
    driver: 'Driver #16', 
    time: '1:32:14.123', 
    points: 26,
    image: 'https://images.unsplash.com/photo-1749843990603-cfd2d217dd87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmMSUyMHJhY2UlMjBwb2RpdW0lMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NjU1NDgzMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    circuit: 'Bahrain International Circuit',
    laps: 57
  },
  { 
    id: 2, 
    race: 'Saudi Arabian Grand Prix', 
    date: 'Mar 9, 2025', 
    position: 2, 
    driver: 'Driver #55', 
    time: '1:28:47.891', 
    points: 18,
    image: 'https://images.unsplash.com/photo-1761751237628-b760f64fc2b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtdWxhJTIwb25lJTIwdmljdG9yeXxlbnwxfHx8fDE3NjU1NDgzMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    circuit: 'Jeddah Corniche Circuit',
    laps: 50
  },
  { 
    id: 3, 
    race: 'Australian Grand Prix', 
    date: 'Mar 23, 2025', 
    position: 1, 
    driver: 'Driver #16', 
    time: '1:35:22.456', 
    points: 25,
    image: 'https://images.unsplash.com/photo-1735636134481-1c6ef7f8df49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBjaXJjdWl0JTIwYWVyaWFsfGVufDF8fHx8MTc2NTU0ODMyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    circuit: 'Albert Park Circuit',
    laps: 58
  },
  { 
    id: 4, 
    race: 'Japanese Grand Prix', 
    date: 'Apr 6, 2025', 
    position: 3, 
    driver: 'Driver #55', 
    time: '1:30:15.789', 
    points: 15,
    image: 'https://images.unsplash.com/photo-1752959851015-740b25ca6ba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmMSUyMGNhciUyMHJhY2luZyUyMHRyYWNrfGVufDF8fHx8MTc2NTU0ODMyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    circuit: 'Suzuka International Racing Course',
    laps: 53
  },
  { 
    id: 5, 
    race: 'Chinese Grand Prix', 
    date: 'Apr 20, 2025', 
    position: 1, 
    driver: 'Driver #16', 
    time: '1:38:45.234', 
    points: 25,
    image: 'https://images.unsplash.com/photo-1760456014926-7da3809ed9ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RvcnNwb3J0JTIwcmFjZSUyMGZpbmlzaHxlbnwxfHx8fDE3NjU1NDgzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    circuit: 'Shanghai International Circuit',
    laps: 56
  },
];

const standings: Standing[] = [
  { position: 1, driver: 'M. Verstappen', team: 'Red Bull Racing', points: 195, wins: 7 },
  { position: 2, driver: 'S. Perez', team: 'Red Bull Racing', points: 148, wins: 2 },
  { position: 3, driver: 'F. Alonso', team: 'Aston Martin', points: 131, wins: 0 },
  { position: 4, driver: 'L. Hamilton', team: 'Mercedes', points: 121, wins: 1 },
  { position: 5, driver: 'C. Leclerc', team: 'Ferrari', points: 115, wins: 1 },
  { position: 6, driver: 'C. Sainz', team: 'Ferrari', points: 108, wins: 0 },
  { position: 7, driver: 'G. Russell', team: 'Mercedes', points: 99, wins: 0 },
  { position: 8, driver: 'L. Norris', team: 'McLaren', points: 87, wins: 0 },
];

export function RacingSection() {
  const [activeTab, setActiveTab] = useState<Tab>('calendar');
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [currentResultIndex, setCurrentResultIndex] = useState(0);

  const nextResult = () => {
    setCurrentResultIndex((prev) => (prev + 1) % results.length);
  };

  const prevResult = () => {
    setCurrentResultIndex((prev) => (prev - 1 + results.length) % results.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[var(--ferrari-gray)] to-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="tracking-widest mb-3" style={{ color: 'var(--ferrari-red)' }}>
            RACING
          </div>
          <h2 className="text-white mb-4">2025 Season</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Follow every moment of our championship journey
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12 gap-4 flex-wrap">
          {[
            { id: 'calendar' as Tab, label: 'Calendar', icon: Calendar },
            { id: 'results' as Tab, label: 'Results', icon: Trophy },
            { id: 'standings' as Tab, label: 'Standings', icon: Medal },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-8 py-4 flex items-center gap-3 transition-all duration-300 relative overflow-hidden group"
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

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="relative">
            {/* Timeline Line */}
            <div
              className="absolute left-8 top-0 bottom-0 w-0.5 hidden md:block"
              style={{
                background: 'linear-gradient(to bottom, transparent, var(--ferrari-red), transparent)',
                boxShadow: '0 0 10px rgba(220, 0, 0, 0.5)',
              }}
            />

            <div className="space-y-6">
              {calendarEvents.map((event, index) => (
                <div
                  key={event.id}
                  onMouseEnter={() => setHoveredId(event.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="relative"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {/* Timeline Dot */}
                  <div
                    className="absolute left-8 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full hidden md:block z-10"
                    style={{
                      background: event.status === 'completed'
                        ? 'var(--ferrari-red)'
                        : event.status === 'live'
                        ? '#00ff00'
                        : 'rgba(255, 255, 255, 0.3)',
                      boxShadow: event.status === 'completed'
                        ? '0 0 20px rgba(220, 0, 0, 0.8)'
                        : event.status === 'live'
                        ? '0 0 20px rgba(0, 255, 0, 0.8)'
                        : 'none',
                      animation: event.status === 'live' ? 'pulse 2s infinite' : 'none',
                    }}
                  />

                  {/* Card */}
                  <div
                    className="md:ml-20 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${hoveredId === event.id ? 'var(--ferrari-red)' : 'rgba(255, 255, 255, 0.2)'}`,
                      boxShadow: hoveredId === event.id
                        ? '0 0 40px rgba(220, 0, 0, 0.4), inset 0 0 20px rgba(220, 0, 0, 0.1)'
                        : '0 4px 20px rgba(0, 0, 0, 0.3)',
                      transition: 'all 0.4s ease',
                      transform: hoveredId === event.id ? 'translateX(10px)' : 'translateX(0)',
                    }}
                  >
                    <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-16 h-16 rounded-lg flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, rgba(220, 0, 0, 0.2), rgba(220, 0, 0, 0.05))',
                            border: '1px solid rgba(220, 0, 0, 0.3)',
                          }}
                        >
                          <div className="text-2xl" style={{ color: 'var(--ferrari-red)' }}>
                            {event.round}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-white mb-1">{event.name}</h3>
                          <div className="flex items-center gap-4 text-white/60 text-sm">
                            <div className="flex items-center gap-1">
                              <MapPin size={14} />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{event.date}</span>
                            </div>
                          </div>
                          <div className="text-white/40 text-xs mt-1">{event.circuit}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div
                          className="px-4 py-2 text-xs tracking-widest"
                          style={{
                            background: event.status === 'completed'
                              ? 'rgba(220, 0, 0, 0.2)'
                              : event.status === 'live'
                              ? 'rgba(0, 255, 0, 0.2)'
                              : 'rgba(255, 255, 255, 0.1)',
                            border: `1px solid ${
                              event.status === 'completed'
                                ? 'var(--ferrari-red)'
                                : event.status === 'live'
                                ? '#00ff00'
                                : 'rgba(255, 255, 255, 0.2)'
                            }`,
                            color: event.status === 'completed'
                              ? 'var(--ferrari-red)'
                              : event.status === 'live'
                              ? '#00ff00'
                              : 'white',
                          }}
                        >
                          {event.status.toUpperCase()}
                        </div>
                        <Flag size={20} className="text-white/40" />
                      </div>
                    </div>

                    {/* Animated Border Glow */}
                    {hoveredId === event.id && (
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(220, 0, 0, 0.3), transparent)',
                          animation: 'slideGlow 2s infinite',
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div className="relative">
            {/* Main Carousel */}
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${currentResultIndex * 100}%)`,
                }}
              >
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="min-w-full"
                  >
                    <div
                      className="relative overflow-hidden group"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 0 60px rgba(220, 0, 0, 0.4)',
                      }}
                    >
                      {/* Race Image */}
                      <div className="relative h-[500px] overflow-hidden">
                        <img
                          src={result.image}
                          alt={result.race}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                        
                        {/* Position Badge - Overlay on Image */}
                        <div
                          className="absolute top-8 left-8 w-32 h-32 rounded-full flex items-center justify-center"
                          style={{
                            background: result.position === 1
                              ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.5), rgba(255, 215, 0, 0.2))'
                              : result.position === 2
                              ? 'linear-gradient(135deg, rgba(192, 192, 192, 0.5), rgba(192, 192, 192, 0.2))'
                              : 'linear-gradient(135deg, rgba(205, 127, 50, 0.5), rgba(205, 127, 50, 0.2))',
                            border: `4px solid ${
                              result.position === 1 ? '#FFD700' : result.position === 2 ? '#C0C0C0' : '#CD7F32'
                            }`,
                            boxShadow: result.position === 1
                              ? '0 0 50px rgba(255, 215, 0, 0.8), inset 0 0 30px rgba(255, 215, 0, 0.3)'
                              : result.position === 2
                              ? '0 0 40px rgba(192, 192, 192, 0.6)'
                              : '0 0 40px rgba(205, 127, 50, 0.6)',
                            backdropFilter: 'blur(10px)',
                          }}
                        >
                          <div
                            className="text-6xl"
                            style={{
                              color: result.position === 1 ? '#FFD700' : result.position === 2 ? '#C0C0C0' : '#CD7F32',
                              textShadow: `0 0 30px ${
                                result.position === 1 ? 'rgba(255, 215, 0, 1)' : result.position === 2 ? 'rgba(192, 192, 192, 1)' : 'rgba(205, 127, 50, 1)'
                              }`,
                            }}
                          >
                            {result.position}
                          </div>
                        </div>

                        {/* Trophy Icon for Winners */}
                        {result.position === 1 && (
                          <div className="absolute top-8 right-8">
                            <Trophy
                              size={64}
                              style={{
                                color: '#FFD700',
                                filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 1))',
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Result Details */}
                      <div className="p-8 md:p-12">
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Left Column - Race Info */}
                          <div>
                            <div
                              className="tracking-widest mb-3 text-sm"
                              style={{ color: 'var(--ferrari-red)' }}
                            >
                              ROUND {results.indexOf(result) + 1}
                            </div>
                            <h2 className="text-white mb-4">{result.race}</h2>
                            <div className="space-y-3 mb-6">
                              <div className="flex items-center gap-3 text-white/70">
                                <MapPin size={20} style={{ color: 'var(--ferrari-red)' }} />
                                <span>{result.circuit}</span>
                              </div>
                              <div className="flex items-center gap-3 text-white/70">
                                <Calendar size={20} style={{ color: 'var(--ferrari-red)' }} />
                                <span>{result.date}</span>
                              </div>
                              <div className="flex items-center gap-3 text-white/70">
                                <Flag size={20} style={{ color: 'var(--ferrari-red)' }} />
                                <span>{result.laps} Laps</span>
                              </div>
                            </div>

                            {/* Driver Info */}
                            <div
                              className="p-6 mb-6"
                              style={{
                                background: 'linear-gradient(135deg, rgba(220, 0, 0, 0.2), rgba(220, 0, 0, 0.05))',
                                border: '1px solid rgba(220, 0, 0, 0.3)',
                              }}
                            >
                              <div className="text-white/60 text-sm mb-2">DRIVER</div>
                              <div className="text-2xl text-white">{result.driver}</div>
                            </div>
                          </div>

                          {/* Right Column - Stats */}
                          <div className="space-y-4">
                            {/* Race Time */}
                            <div
                              className="p-6 text-center relative overflow-hidden group/stat"
                              style={{
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                transition: 'all 0.3s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = '0 0 30px rgba(220, 0, 0, 0.5)';
                                e.currentTarget.style.borderColor = 'var(--ferrari-red)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                              }}
                            >
                              <div className="text-white/60 text-sm mb-2 tracking-wide">RACE TIME</div>
                              <div className="text-4xl text-white mb-1">{result.time}</div>
                              <Clock size={24} className="mx-auto text-white/40" />
                            </div>

                            {/* Points */}
                            <div
                              className="p-6 text-center relative overflow-hidden"
                              style={{
                                background: 'linear-gradient(135deg, rgba(220, 0, 0, 0.3), rgba(220, 0, 0, 0.1))',
                                border: '2px solid var(--ferrari-red)',
                                boxShadow: '0 0 40px rgba(220, 0, 0, 0.6), inset 0 0 30px rgba(220, 0, 0, 0.2)',
                              }}
                            >
                              <div className="text-white/80 text-sm mb-2 tracking-wide">CHAMPIONSHIP POINTS</div>
                              <div
                                className="text-6xl mb-2"
                                style={{
                                  color: 'var(--ferrari-red)',
                                  textShadow: '0 0 30px rgba(220, 0, 0, 1)',
                                }}
                              >
                                {result.points}
                              </div>
                              <div className="text-white/60 text-sm">EARNED</div>
                            </div>

                            {/* Position Tag */}
                            <div
                              className="p-6 text-center"
                              style={{
                                background: result.position === 1
                                  ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.05))'
                                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                                border: `2px solid ${result.position === 1 ? '#FFD700' : 'rgba(255, 255, 255, 0.3)'}`,
                              }}
                            >
                              <div
                                className="text-xl tracking-widest"
                                style={{
                                  color: result.position === 1 ? '#FFD700' : 'white',
                                }}
                              >
                                {result.position === 1 ? '🏆 WINNER' : result.position === 2 ? '🥈 P2' : '🥉 P3'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Neon Border Animation */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(220, 0, 0, 0.4), transparent)',
                          animation: 'slideGlow 3s infinite',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevResult}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center transition-all duration-300 z-10 group"
              style={{
                background: 'linear-gradient(135deg, rgba(220, 0, 0, 0.8), rgba(220, 0, 0, 0.6))',
                border: '2px solid var(--ferrari-red)',
                boxShadow: '0 0 30px rgba(220, 0, 0, 0.6)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <ChevronLeft size={32} className="text-white group-hover:scale-125 transition-transform" />
            </button>

            <button
              onClick={nextResult}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center transition-all duration-300 z-10 group"
              style={{
                background: 'linear-gradient(135deg, rgba(220, 0, 0, 0.8), rgba(220, 0, 0, 0.6))',
                border: '2px solid var(--ferrari-red)',
                boxShadow: '0 0 30px rgba(220, 0, 0, 0.6)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <ChevronRight size={32} className="text-white group-hover:scale-125 transition-transform" />
            </button>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-3 mt-8">
              {results.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentResultIndex(index)}
                  className="transition-all duration-300"
                  style={{
                    width: currentResultIndex === index ? '48px' : '12px',
                    height: '12px',
                    background: currentResultIndex === index
                      ? 'var(--ferrari-red)'
                      : 'rgba(255, 255, 255, 0.3)',
                    border: currentResultIndex === index
                      ? '2px solid var(--ferrari-red)'
                      : '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: currentResultIndex === index
                      ? '0 0 20px rgba(220, 0, 0, 0.8)'
                      : 'none',
                  }}
                />
              ))}
            </div>

            {/* Thumbnail Preview */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => setCurrentResultIndex(index)}
                  className="relative overflow-hidden group/thumb transition-all duration-300"
                  style={{
                    border: currentResultIndex === index
                      ? '3px solid var(--ferrari-red)'
                      : '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: currentResultIndex === index
                      ? '0 0 30px rgba(220, 0, 0, 0.6)'
                      : 'none',
                    opacity: currentResultIndex === index ? 1 : 0.5,
                  }}
                >
                  <div className="relative h-24 overflow-hidden">
                    <img
                      src={result.image}
                      alt={result.race}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                    <div className="absolute bottom-2 left-2 text-white text-xs">
                      Round {index + 1}
                    </div>
                    <div
                      className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs"
                      style={{
                        background: result.position === 1
                          ? 'rgba(255, 215, 0, 0.8)'
                          : result.position === 2
                          ? 'rgba(192, 192, 192, 0.8)'
                          : 'rgba(205, 127, 50, 0.8)',
                        color: 'black',
                      }}
                    >
                      P{result.position}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Standings Tab */}
        {activeTab === 'standings' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: 'rgba(220, 0, 0, 0.1)', borderBottom: '2px solid var(--ferrari-red)' }}>
                  <th className="text-left p-4 text-white/80">POS</th>
                  <th className="text-left p-4 text-white/80">DRIVER</th>
                  <th className="text-left p-4 text-white/80">TEAM</th>
                  <th className="text-center p-4 text-white/80">WINS</th>
                  <th className="text-center p-4 text-white/80">POINTS</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((standing, index) => (
                  <tr
                    key={index}
                    onMouseEnter={() => setHoveredId(index)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="border-b border-white/10 transition-all duration-300"
                    style={{
                      background: hoveredId === index
                        ? 'linear-gradient(90deg, rgba(220, 0, 0, 0.15), rgba(220, 0, 0, 0.05))'
                        : 'transparent',
                      boxShadow: hoveredId === index
                        ? '0 0 30px rgba(220, 0, 0, 0.2)'
                        : 'none',
                    }}
                  >
                    <td className="p-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                        style={{
                          background: standing.position <= 3
                            ? 'linear-gradient(135deg, rgba(220, 0, 0, 0.3), rgba(220, 0, 0, 0.1))'
                            : 'rgba(255, 255, 255, 0.05)',
                          border: standing.position <= 3 ? '2px solid var(--ferrari-red)' : '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        {standing.position}
                      </div>
                    </td>
                    <td className="p-4 text-white">{standing.driver}</td>
                    <td className="p-4 text-white/70">{standing.team}</td>
                    <td className="p-4 text-center text-white/70">{standing.wins}</td>
                    <td className="p-4 text-center text-2xl" style={{ color: 'var(--ferrari-red)' }}>
                      {standing.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }

        @keyframes slideGlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}