import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/mockData';
import { ArtCanvas } from '../components/ArtCanvas';
import { Eye, Filter } from 'lucide-react';

interface GalleryPageProps {
  onSelectProject: (item: GalleryItem) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'brand', label: 'Brand Identity' },
    { id: 'digital', label: 'Product & Digital' },
    { id: 'editorial', label: 'Editorial & Craft' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-semibold uppercase tracking-widest text-stone-500">
          Selected Portfolio Archives
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Monographs, spatial designs, and digital craft.
        </h1>
        <p className="text-base text-stone-600 leading-relaxed">
          A curated catalog of commissions spanning physical architecture, custom variable type design, spatial interfaces, and limited-edition editorial publications.
        </p>
      </div>

      {/* Filter Tabs (Interactive segmented buttons per constitution) */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-stone-200/70 rounded-lg w-fit">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count =
            cat.id === 'all'
              ? GALLERY_ITEMS.length
              : GALLERY_ITEMS.filter((item) => item.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 ${
                isActive
                  ? 'bg-stone-900 text-white shadow-xs font-semibold'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100/60'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] tabular-nums ${
                  isActive ? 'text-stone-400' : 'text-stone-500'
                }`}
              >
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            onClick={() => onSelectProject(item)}
            className="group cursor-pointer rounded-xl bg-white border border-stone-200 overflow-hidden shadow-xs hover:border-stone-400 hover:shadow-md transition-all duration-300 flex flex-col"
          >
            {/* Visual Canvas with Hover Reveal */}
            <div className="relative overflow-hidden">
              <ArtCanvas
                pattern={item.accentPattern}
                aspectRatio="4:3"
                title={item.title}
              />
              <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-900/90 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Project</span>
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                {/* Metadata as clean unboxed text with separators per Zero-Pill rule */}
                <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                  <span>{item.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.client}</span>
                </div>

                <h2 className="text-xl font-serif font-bold text-stone-900 group-hover:text-stone-700 transition-colors">
                  {item.title}
                </h2>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {/* Tags preview */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="truncate">{item.tags.slice(0, 2).join(' · ')}</span>
                <span className="text-stone-900 font-semibold text-[11px] group-hover:translate-x-1 transition-transform">
                  View Specs →
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20 bg-stone-100 rounded-xl space-y-2">
          <p className="text-base font-semibold text-stone-700">No projects found in this category.</p>
          <button
            onClick={() => setActiveCategory('all')}
            className="text-xs text-stone-900 underline underline-offset-4"
          >
            Reset filter to all works
          </button>
        </div>
      )}
    </div>
  );
};
