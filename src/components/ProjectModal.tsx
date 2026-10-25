import React, { useEffect } from 'react';
import { GalleryItem } from '../types';
import { ArtCanvas } from './ArtCanvas';
import { X, ArrowRight, Calendar, User, Tag } from 'lucide-react';

interface ProjectModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  onSelectProjectForInquiry?: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  item,
  onClose,
  onSelectProjectForInquiry,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-4xl bg-stone-50 rounded-xl shadow-2xl overflow-hidden border border-stone-300 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-100/70 shrink-0">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="font-medium text-stone-900">{item.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{item.year}</span>
            <span aria-hidden="true">·</span>
            <span>{item.client}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md hover:bg-stone-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Main Visual Representation */}
          <div className="rounded-lg overflow-hidden border border-stone-200 shadow-sm">
            <ArtCanvas
              pattern={item.accentPattern}
              aspectRatio="16:9"
              title={item.title}
              subtitle={`${item.client} (${item.year})`}
            />
          </div>

          {/* Details header */}
          <div className="space-y-3">
            <h2
              id="modal-title"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-serif"
            >
              {item.title}
            </h2>
            <p className="text-base text-stone-600 leading-relaxed font-medium">
              {item.summary}
            </p>
          </div>

          {/* Grid specs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-lg bg-stone-100/80 border border-stone-200 text-xs">
            <div className="space-y-1">
              <span className="text-stone-500 block">Commissioning Client</span>
              <span className="font-semibold text-stone-900">{item.client}</span>
            </div>
            <div className="space-y-1">
              <span className="text-stone-500 block">Completion Timeline</span>
              <span className="font-semibold text-stone-900">{item.year}</span>
            </div>
            <div className="space-y-1">
              <span className="text-stone-500 block">Discipline</span>
              <span className="font-semibold text-stone-900">{item.categoryLabel}</span>
            </div>
          </div>

          {/* Extended Project Story */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
              Project Case Overview
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Tags list (rendered as clean unboxed text with bullets per zero-pill discipline) */}
          <div className="space-y-2 pt-2 border-t border-stone-200">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
              Architectural & Material Specifications
            </span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-600">
              {item.tags.map((tag, idx) => (
                <React.Fragment key={tag}>
                  <span>{tag}</span>
                  {idx < item.tags.length - 1 && <span className="text-stone-300">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-stone-200 bg-stone-50 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 rounded-md hover:bg-stone-100 transition-colors"
          >
            Back to Gallery
          </button>
          {onSelectProjectForInquiry && (
            <button
              onClick={() => {
                onSelectProjectForInquiry(item.title);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 rounded-md hover:bg-stone-800 transition-colors shadow-xs"
            >
              <span>Inquire About Similar Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
