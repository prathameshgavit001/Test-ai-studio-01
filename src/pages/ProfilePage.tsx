import React, { useState } from 'react';
import { PageId } from '../types';
import { PROFILE_INFO } from '../data/mockData';
import { ArtCanvas } from '../components/ArtCanvas';
import { Download, CheckCircle, ArrowRight, Award, MapPin, Globe, Sparkles } from 'lucide-react';

interface ProfilePageProps {
  onNavigate: (page: PageId) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadDeck = () => {
    // Generate simulated capability summary file download
    const deckContent = `VANGUARD STUDIO — CAPABILITIES & PROFILE DECK (2026)
=====================================================
Founder & Principal: Marcus Sterling
Locations: San Francisco, CA · Zurich, Switzerland
Practice: Spatial Architecture, Brand Systems & Tactile Digital Craft

CORE DISCIPLINES:
1. Spatial & Architectural Design (Pavilions, Cultural Spaces, Mass Timber)
2. Brand Systems & Custom Typography (Variable Fonts, Editorial Guidelines)
3. Tactile Digital Craft (TypeScript, WebGL, Design Tokens, Spatial Web)
4. Strategic Creative Direction (Investor Narratives, Curatorial Direction)

HONORS & AWARDS:
- 2025: Wallpaper* Design Award — Best Architectural Spatial Concept
- 2024: TDC New York Certificate of Typographic Excellence
- 2023: AIA San Francisco Honor Award — Adaptive Heritage Architecture
- 2022: D&AD Yellow Pencil — Digital Product Experience

CONTACT:
inquiry@vanguardstudio.design | 480 Jackson St, San Francisco CA 94111
`;

    const blob = new Blob([deckContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Vanguard_Studio_Capabilities_2026.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      {/* 1. Header & Lead Portrait Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Bio & Identity */}
        <div className="lg:col-span-7 space-y-6">
          <div className="text-xs font-semibold uppercase tracking-widest text-stone-500">
            About the Practice & Leadership
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Marcus Sterling
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-sm text-stone-600 font-medium">
            <span>Founder & Principal Design Director</span>
            <span aria-hidden="true">·</span>
            <span>AA London & ETH Zurich</span>
            <span aria-hidden="true">·</span>
            <span>San Francisco & Zurich</span>
          </div>

          <p className="text-base sm:text-lg text-stone-700 leading-relaxed pt-2">
            {PROFILE_INFO.bio}
          </p>

          {/* Philosophy Block */}
          <div className="p-6 rounded-xl bg-stone-100/90 border border-stone-200 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Guiding Principle
            </div>
            <blockquote className="text-base font-serif italic text-stone-900 leading-relaxed">
              &ldquo;{PROFILE_INFO.philosophy}&rdquo;
            </blockquote>
          </div>

          {/* Action triggers */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={handleDownloadDeck}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 rounded-md hover:bg-stone-800 transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            >
              <Download className="w-4 h-4" />
              <span>Download Studio Dossier</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-800 bg-stone-200/80 hover:bg-stone-300 rounded-md transition-colors"
            >
              <span>Schedule Initial Briefing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {downloadSuccess && (
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 p-3 rounded-md animate-in fade-in">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Studio dossier & credentials downloaded successfully.</span>
            </div>
          )}
        </div>

        {/* Right Column: Founder Portrait Visual */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl overflow-hidden border border-stone-200 shadow-md">
            <ArtCanvas
              pattern="minimal-arch"
              aspectRatio="1:1"
              title="Marcus Sterling — Principal"
              subtitle="Jackson Square Studio, San Francisco"
            />
          </div>
          <div className="flex items-center justify-between text-xs text-stone-500 px-1">
            <span>Studio Headquarters: 480 Jackson St, SF</span>
            <span>European Annex: Zurich CH</span>
          </div>
        </div>
      </section>

      {/* 2. Core Disciplines Grid */}
      <section className="space-y-8 pt-8 border-t border-stone-200">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
            Core Competencies
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Disciplines practiced with uncompromising depth.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROFILE_INFO.disciplines.map((item, idx) => (
            <div
              key={item.title}
              className="p-6 rounded-xl bg-white border border-stone-200 shadow-xs space-y-2 hover:border-stone-300 transition-colors"
            >
              <div className="text-xs font-mono text-stone-400">
                0{idx + 1}
              </div>
              <h3 className="text-base font-semibold text-stone-900">
                {item.title}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Honors, Citations & Studio Milestones */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 border-t border-stone-200">
        {/* Honors */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-stone-700" />
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Honors & Citations
            </h3>
          </div>
          <div className="divide-y divide-stone-200">
            {PROFILE_INFO.awards.map((award) => (
              <div key={award.title} className="py-3.5 flex items-baseline justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-stone-900">{award.title}</div>
                  <div className="text-xs text-stone-500">{award.category}</div>
                </div>
                <div className="text-xs font-mono text-stone-400 tabular-nums shrink-0">
                  {award.year}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Studio Milestones */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-stone-700" />
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Practice Milestones
            </h3>
          </div>
          <div className="divide-y divide-stone-200">
            {PROFILE_INFO.milestones.map((m) => (
              <div key={m.event} className="py-3.5 flex items-baseline justify-between gap-4">
                <div className="text-sm text-stone-700">{m.event}</div>
                <div className="text-xs font-mono text-stone-400 tabular-nums shrink-0">
                  {m.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bottom Consultation Banner */}
      <section className="p-8 sm:p-10 rounded-2xl bg-stone-900 text-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Have a project or architectural commission in mind?
          </h3>
          <p className="text-xs sm:text-sm text-stone-400">
            We are currently scheduling exploratory partner briefings for upcoming quarters.
          </p>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-white rounded-md hover:bg-stone-100 transition-colors shrink-0 shadow-xs"
        >
          <span>Initiate Contact</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </section>
    </div>
  );
};
