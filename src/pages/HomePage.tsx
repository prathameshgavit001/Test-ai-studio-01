import React from 'react';
import { PageId, GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/mockData';
import { ArtCanvas } from '../components/ArtCanvas';
import { ArrowRight, ArrowUpRight, Compass, Layers, ShieldCheck } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectProject: (item: GalleryItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProject }) => {
  const featuredProjects = GALLERY_ITEMS.slice(0, 3);

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. Hero Section: Split Column Presence */}
      <section className="pt-8 sm:pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
            {/* Left Column: Typographic Hierarchy */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                Spatial & Digital Architecture Practice
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.1] text-balance">
                Designing structures and digital systems of enduring clarity.
              </h1>
              <p className="text-lg text-stone-600 max-w-xl leading-relaxed">
                Vanguard Studio bridges physical architectural environments, bespoke variable typography, and tactile digital products for discerning cultural and enterprise institutions.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('gallery')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 rounded-md hover:bg-stone-800 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
                >
                  <span>Explore Selected Works</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-stone-800 bg-stone-200/80 hover:bg-stone-300 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
                >
                  <span>View Service Plans</span>
                </button>
              </div>
            </div>

            {/* Right Column: Visual Artwork Canvas */}
            <div className="lg:col-span-5 flex">
              <div className="w-full rounded-xl overflow-hidden border border-stone-200 shadow-lg min-h-[360px] lg:h-full flex items-stretch">
                <ArtCanvas
                  pattern="minimal-arch"
                  aspectRatio="4:3"
                  className="w-full h-full"
                  title="Pavilion Solstice — Observation Sanctuary"
                  subtitle="Tromsø, Norway · Vanguard Spatial Practice"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Full-Width Quantitative Rigor Strip (Adjacent to Hero) */}
      <section className="border-y border-stone-200 bg-stone-100/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tabular-nums">
                14+
              </div>
              <div className="text-xs text-stone-500 font-medium uppercase tracking-wider">
                Years Design Practice
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tabular-nums">
                88
              </div>
              <div className="text-xs text-stone-500 font-medium uppercase tracking-wider">
                Commissions Delivered
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tabular-nums">
                16
              </div>
              <div className="text-xs text-stone-500 font-medium uppercase tracking-wider">
                Global Design Honors
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tabular-nums">
                100%
              </div>
              <div className="text-xs text-stone-500 font-medium uppercase tracking-wider">
                On-Schedule Release
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Portfolio Highlights */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-stone-200">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                Selected Portfolio Preview
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Recent commissions and spatial studies.
              </h2>
            </div>
            <button
              onClick={() => onNavigate('gallery')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-900 hover:text-stone-700 transition-colors shrink-0"
            >
              <span>View All 6 Works</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer space-y-4"
              >
                <div className="rounded-lg overflow-hidden border border-stone-200 shadow-xs transition-transform duration-300 group-hover:-translate-y-1">
                  <ArtCanvas
                    pattern={project.accentPattern}
                    aspectRatio="4:3"
                    title={project.title}
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span>{project.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.client}</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-stone-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2">
                    {project.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Core Disciplines / Studio Capabilities */}
      <section className="bg-stone-900 text-stone-100 py-16 sm:py-20 rounded-2xl mx-4 sm:mx-6 lg:mx-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-stone-400">
              Practice Framework
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Integrated across spatial, brand, and digital domains.
            </h2>
            <p className="text-sm text-stone-400 max-w-2xl mx-auto">
              We operate without the artificial boundary separating physical architecture from digital experience. Every medium is governed by the same devotion to proportion and materiality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="p-6 rounded-xl bg-stone-800/80 border border-stone-700 space-y-3">
              <Compass className="w-6 h-6 text-stone-300" />
              <h3 className="text-base font-semibold text-white">Spatial Architecture</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Site-specific cultural pavilions, gallery adaptations, monolithic material specifications, and physical interior interventions.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-stone-800/80 border border-stone-700 space-y-3">
              <Layers className="w-6 h-6 text-stone-300" />
              <h3 className="text-base font-semibold text-white">Bespoke Typographic Systems</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Custom variable type design, comprehensive brand ecosystems, print monographs, and tactile packaging architectures.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-stone-800/80 border border-stone-700 space-y-3">
              <ShieldCheck className="w-6 h-6 text-stone-300" />
              <h3 className="text-base font-semibold text-white">Tactile Digital Software</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                High-performance web apps, spatial 3D visualization canvases, multi-platform design tokens, and developer-ready systems.
              </p>
            </div>
          </div>

          <div className="pt-6 text-center">
            <button
              onClick={() => onNavigate('profile')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white hover:text-stone-300 transition-colors"
            >
              <span>Learn More in Studio Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Attributable Testimonial */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <blockquote className="text-xl sm:text-2xl font-serif italic text-stone-800 leading-relaxed">
          &ldquo;Vanguard Studio brought a sculptural sensibility to our software ecosystem that elevated our product into an entirely different league. Their rigor is absolute.&rdquo;
        </blockquote>
        <div className="space-y-1">
          <div className="text-sm font-semibold text-stone-900">Dr. Henrik Lindqvist</div>
          <div className="text-xs text-stone-500">
            Director of Curatorial Architecture · Nordic Cultural Council
          </div>
        </div>
      </section>
    </div>
  );
};
