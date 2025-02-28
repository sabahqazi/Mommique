
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        <a href="#" className="flex items-center">
          <span className="text-xl font-semibold bg-clip-text text-transparent bg-soft-gradient-static">
            CaringMommy
          </span>
        </a>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-mama-text hover:text-mama-soft transition-colors">
            Features
          </a>
          <a href="#testimonials" className="text-mama-text hover:text-mama-soft transition-colors">
            Testimonials
          </a>
          <a href="#pricing" className="text-mama-text hover:text-mama-soft transition-colors">
            Pricing
          </a>
        </div>
        <a 
          href="#pricing" 
          className="btn-hover-slide bg-mama-soft text-mama-text px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
        >
          Join Waitlist
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
