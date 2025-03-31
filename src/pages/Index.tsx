
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';
import { trackPageView, getAnalyticsData } from '../services/analytics';

// Add CSS for highlight effect
const highlightKeyframes = `
  @keyframes highlight-pulse {
    0% { box-shadow: 0 0 0 0 rgba(219, 39, 119, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(219, 39, 119, 0); }
    100% { box-shadow: 0 0 0 0 rgba(219, 39, 119, 0); }
  }

  .highlight-pulse {
    animation: highlight-pulse 1.5s ease-out;
  }
`;

const Index = () => {
  const [pageViewCount, setPageViewCount] = useState(0);

  useEffect(() => {
    // Track page view
    const viewCount = trackPageView('home');
    setPageViewCount(viewCount);
    
    // Scroll to top when page loads
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Add highlight effect CSS to document
    const styleElement = document.createElement('style');
    styleElement.textContent = highlightKeyframes;
    document.head.appendChild(styleElement);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        // Modified offset to ensure better positioning
        const offset = targetId === 'features' ? 100 : 80;
        
        window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: 'smooth'
        });
      });
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function() {});
      });
      if (styleElement && document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Analytics indicator (visible only in development) */}
      {import.meta.env.DEV && (
        <div className="fixed bottom-4 right-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-xs font-mono z-50 shadow-md">
          Views: {pageViewCount}
        </div>
      )}
      
      <Navbar />
      {/* Reduced vertical spacing by adjusting gap between components */}
      <div className="space-y-4 md:space-y-8">
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
