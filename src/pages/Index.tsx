
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for navbar
          behavior: 'smooth'
        });
      });
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function() {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
