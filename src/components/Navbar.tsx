
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

  const handleWaitlistClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const waitlistElement = document.getElementById('waitlist');
    if (waitlistElement) {
      waitlistElement.scrollIntoView({ behavior: 'smooth' });
      
      // Add a highlight effect to the waitlist form
      waitlistElement.classList.add('highlight-pulse');
      
      // Center the waitlist element in the viewport
      const viewportHeight = window.innerHeight;
      const elementHeight = waitlistElement.offsetHeight;
      const offset = Math.max(0, (viewportHeight - elementHeight) / 2);
      
      window.scrollBy({
        top: -offset,
        behavior: 'smooth'
      });
      
      // Remove the highlight effect after animation completes
      setTimeout(() => {
        waitlistElement.classList.remove('highlight-pulse');
      }, 2000);
    }
  };

  return <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 bg-white shadow-sm")}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="flex items-center">
            <div className="flex flex-col items-center">
              <span style={{
              textShadow: '0 0 1px rgba(219, 39, 119, 0.5)'
            }} className="font-['Comfortaa'] text-pink-600 tracking-wider font-extrabold text-4xl">bloom</span>
              <span className="font-['Open_Sans'] text-blue-800 text-xs font-bold">moms deserve care too</span>
            </div>
          </a>
        </div>
        
        <div className="hidden md:flex items-center space-x-10 mx-auto">
          <a href="#features" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
            Features
          </a>
          <a href="#testimonials" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
            Testimonials
          </a>
          <a href="#pricing" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
            Pricing
          </a>
        </div>
        
        <a 
          href="#waitlist" 
          className="bg-blue-100 text-blue-800 px-5 py-2.5 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-300"
          onClick={handleWaitlistClick}
        >
          Join Waitlist
        </a>
      </div>
    </nav>;
};

export default Navbar;
