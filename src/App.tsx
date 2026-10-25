/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, GalleryItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { GalleryPage } from './pages/GalleryPage';
import { PricingPage } from './pages/PricingPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProject, setSelectedProject] = useState<GalleryItem | null>(null);
  const [contactPlanInterest, setContactPlanInterest] = useState<string | undefined>(undefined);
  const [contactEstimatedPrice, setContactEstimatedPrice] = useState<number | undefined>(undefined);

  // Sync with URL query parameter or hash on mount
  useEffect(() => {
    const handleUrlState = () => {
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get('page') as PageId | null;
      const hashParam = window.location.hash.replace('#', '') as PageId;

      const validPages: PageId[] = ['home', 'profile', 'gallery', 'pricing', 'contact'];
      if (pageParam && validPages.includes(pageParam)) {
        setCurrentPage(pageParam);
      } else if (hashParam && validPages.includes(hashParam)) {
        setCurrentPage(hashParam);
      }
    };

    handleUrlState();
    window.addEventListener('popstate', handleUrlState);
    return () => window.removeEventListener('popstate', handleUrlState);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.history.pushState(null, '', `?page=${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPlan = (planName: string, price: number) => {
    setContactPlanInterest(planName);
    setContactEstimatedPrice(price);
    handleNavigate('contact');
  };

  const handleSelectProjectForInquiry = (projectTitle: string) => {
    setContactPlanInterest(`Project Inquiry: ${projectTitle}`);
    handleNavigate('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-stone-900 selection:text-white">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProject={(project) => setSelectedProject(project)}
          />
        )}
        {currentPage === 'profile' && (
          <ProfilePage onNavigate={handleNavigate} />
        )}
        {currentPage === 'gallery' && (
          <GalleryPage
            onSelectProject={(project) => setSelectedProject(project)}
          />
        )}
        {currentPage === 'pricing' && (
          <PricingPage onSelectPlan={handleSelectPlan} />
        )}
        {currentPage === 'contact' && (
          <ContactPage
            initialPlanInterest={contactPlanInterest}
            initialEstimatedPrice={contactEstimatedPrice}
          />
        )}
      </main>

      {/* Lightbox Project Modal */}
      <ProjectModal
        item={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProjectForInquiry={handleSelectProjectForInquiry}
      />

      {/* Editorial Studio Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
