import React, { useState } from 'react';
import { PageId } from '../types';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'profile', label: 'Profile' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Single text element, no badges) */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-lg font-bold tracking-tight text-stone-900 uppercase hover:text-stone-700 transition-colors whitespace-nowrap shrink-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded"
            aria-label="Vanguard Studio Home"
          >
            Vanguard Studio
          </button>

          {/* Zone 2: Navigation Links (Single-line, unboxed, subtle indicator) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-2 text-sm transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded ${
                    isActive
                      ? 'text-stone-950 font-semibold'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide uppercase text-white bg-stone-900 rounded-md hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            >
              <span>Inquire Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-stone-700 hover:text-stone-950 hover:bg-stone-200/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-stone-50 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-stone-200/80 text-stone-950 font-semibold'
                    : 'text-stone-700 hover:bg-stone-100 hover:text-stone-950'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-3 border-t border-stone-200">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 rounded-md hover:bg-stone-800 transition-colors"
            >
              <span>Inquire Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
