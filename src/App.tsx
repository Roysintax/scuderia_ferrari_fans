import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { NewsCarousel } from './components/NewsCarousel';
import { StoreSection } from './components/StoreSection';
import { PartnerSection } from './components/PartnerSection';
import { RacingSection } from './components/RacingSection';
import { TeamSection } from './components/TeamSection';
import './styles/globals.css';

export default function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main>
        <HeroCarousel />
        <NewsCarousel />
        <RacingSection />
        <TeamSection />
        <StoreSection />
        <PartnerSection />
        
        {/* Additional Section */}
        <section className="py-20 bg-gradient-to-b from-black via-[var(--ferrari-gray)] to-black">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div
                  className="tracking-widest mb-4"
                  style={{ color: 'var(--ferrari-red)' }}
                >
                  HERITAGE & LEGACY
                </div>
                <h2 className="text-white mb-6">
                  Decades of<br />Racing Excellence
                </h2>
                <p className="text-white/70 text-lg mb-8 leading-relaxed">
                  From the legendary tracks of Monza to the streets of Monaco, our racing heritage 
                  spans generations of triumph, innovation, and an unwavering commitment to perfection. 
                  Every victory tells a story of passion, precision, and the relentless pursuit of excellence.
                </p>
                <button
                  className="px-8 py-4 text-white transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: 'var(--ferrari-red)' }}
                >
                  DISCOVER OUR HISTORY
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 transition-all duration-300">
                  <div className="text-5xl mb-4" style={{ color: 'var(--ferrari-red)' }}>16</div>
                  <div className="text-white/60 tracking-wide">CONSTRUCTORS' CHAMPIONSHIPS</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 transition-all duration-300 mt-8">
                  <div className="text-5xl mb-4" style={{ color: 'var(--ferrari-red)' }}>15</div>
                  <div className="text-white/60 tracking-wide">DRIVERS' CHAMPIONSHIPS</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 transition-all duration-300">
                  <div className="text-5xl mb-4" style={{ color: 'var(--ferrari-red)' }}>242</div>
                  <div className="text-white/60 tracking-wide">GRAND PRIX VICTORIES</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 transition-all duration-300 mt-8">
                  <div className="text-5xl mb-4" style={{ color: 'var(--ferrari-red)' }}>75+</div>
                  <div className="text-white/60 tracking-wide">YEARS OF RACING</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-12">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="text-2xl tracking-wider mb-4" style={{ color: 'var(--ferrari-red)' }}>
                  SCUDERIA
                </div>
                <p className="text-white/50 text-sm">
                  The Prancing Horse legacy continues on every track.
                </p>
              </div>
              <div>
                <h4 className="text-white mb-4">Racing</h4>
                <ul className="space-y-2 text-white/50 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Calendar</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Results</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Standings</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white mb-4">Team</h4>
                <ul className="space-y-2 text-white/50 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Drivers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">History</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white mb-4">Follow Us</h4>
                <ul className="space-y-2 text-white/50 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm">
              <p>&copy; 2025 Scuderia. All rights reserved.</p>
              <p className="mt-2">
                Created by{' '}
                <a
                  href="https://www.instagram.com/roysihan.official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  style={{ color: 'var(--ferrari-red)' }}
                >
                  @roysihan.official
                </a>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}