
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "As a first-time mom, I had so many questions at 3AM when everyone was asleep. CaringMommy was there for me with reassuring answers based on real medical information.",
    name: "Samantha K.",
    role: "First-time mom, 3-month-old",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "The personalized answers saved me from panicking several times. It's like having a knowledgeable friend who never gets tired of your questions.",
    name: "Michelle T.",
    role: "Mom of twins, 6 months old",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "Worth every penny. As a single mom with no family nearby, this app has been my support system during those uncertain moments.",
    name: "Jessica M.",
    role: "Single mom, 4-month-old",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "The app guided me through postpartum depression symptoms and encouraged me to seek help. I credit it for getting me the support I needed.",
    name: "Andrea L.",
    role: "Mom of 2, youngest 2 months old",
    avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "It helped us identify a potential allergy our pediatrician later confirmed. The peace of mind between doctor visits is invaluable.",
    name: "Rachel B.",
    role: "Mom of a 5-month-old",
    avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const visibleCount = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : 
                        typeof window !== 'undefined' && window.innerWidth >= 768 ? 2 : 1;
  
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prevIndex => 
      prevIndex + visibleCount >= testimonials.length ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? testimonials.length - visibleCount : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="section">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="bg-mama-pink/30 text-mama-text px-4 py-1.5 rounded-full text-sm font-medium">
            Trusted by Moms
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            Hear From Our Early Users
          </h2>
          <p className="text-lg text-mama-text/80">
            Real moms share how CaringMommy has supported them during their postpartum journey.
          </p>
        </div>
        
        <div className="relative">
          <div 
            ref={containerRef}
            className="overflow-hidden px-4"
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                width: `${(testimonials.length / visibleCount) * 100}%`
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="px-4"
                  style={{ width: `${100 / testimonials.length * visibleCount}%` }}
                >
                  <div className="bg-white h-full rounded-xl p-6 shadow-sm border border-mama-soft/30 flex flex-col">
                    <div className="mb-5">
                      <svg width="100" height="32" viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 16.8L15.2 32H8L12.8 16.8H8V0H24V16.8H20Z" fill="#FFDEE2" fillOpacity="0.7"/>
                        <path d="M44 16.8L39.2 32H32L36.8 16.8H32V0H48V16.8H44Z" fill="#FFDEE2" fillOpacity="0.7"/>
                      </svg>
                    </div>
                    <p className="text-mama-text/80 flex-grow mb-6 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center mt-auto">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-mama-text/60">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md border border-mama-soft/30 z-10 hover:bg-mama-soft/10 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md border border-mama-soft/30 z-10 hover:bg-mama-soft/10 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex justify-center mt-8">
          {Array.from({ length: testimonials.length - visibleCount + 1 }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-mama-pink w-6' : 'bg-mama-soft/50'
              }`}
              onClick={() => {
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), 500);
              }}
              aria-label={`Go to testimonial slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
