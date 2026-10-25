import React from 'react';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Studio identity */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-base font-bold tracking-tight text-white uppercase">
              Vanguard Studio
            </h3>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              An architectural and digital creative practice based in San Francisco and Zurich. Shaping enduring spatial sanctuaries, brand systems, and tactile digital products.
            </p>
            <div className="pt-2 text-xs text-stone-400 space-x-2">
              <span>San Francisco</span>
              <span>·</span>
              <span>Zurich</span>
              <span>·</span>
              <span>Est. 2018</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Overview
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors text-left"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('profile')}
                  className="hover:text-white transition-colors text-left"
                >
                  Profile & Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white transition-colors text-left"
                >
                  Selected Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-white transition-colors text-left"
                >
                  Pricing & Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct contact */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Studio Presence
            </div>
            <address className="not-italic text-sm text-stone-400 space-y-1.5 leading-relaxed">
              <p className="text-stone-300">Jackson Square Studio</p>
              <p>480 Jackson Street</p>
              <p>San Francisco, CA 94111</p>
              <p className="pt-2">
                <a
                  href="mailto:inquiry@vanguardstudio.design"
                  className="text-stone-300 hover:text-white transition-colors underline underline-offset-4"
                >
                  inquiry@vanguardstudio.design
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Vanguard Studio LLC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Spatial & Digital Architecture</span>
            <span>·</span>
            <span>All inquiries reviewed in 24 hours</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
