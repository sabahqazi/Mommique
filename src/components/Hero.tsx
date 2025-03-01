
import React, { useEffect, useRef } from 'react';
import { Heart, Baby } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = event;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      heroRef.current.style.setProperty('--mouse-x', `${x}`);
      heroRef.current.style.setProperty('--mouse-y', `${y}`);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="min-h-screen pt-20 flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        '--mouse-x': '0.5',
        '--mouse-y': '0.5',
      } as React.CSSProperties}
    >
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_calc(50%+var(--mouse-x,0.5)*30%)_calc(50%+var(--mouse-y,0.5)*30%),var(--tw-gradient-stops))] from-[#FFDEE2] via-[#FFE6EA] to-[#FFF0F2] opacity-30 -z-10"
        aria-hidden="true"
      />
      
      <div className="container relative z-10 pt-10 md:pt-0">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4 inline-block animate-fade-in">
            <span className="bg-[#FFDEE2]/50 text-mama-text px-4 py-1.5 rounded-full text-sm font-medium">
              Postpartum Support Reimagined
            </span>
          </div>
          
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="avatar-container relative animate-float hidden md:block">
              <div className="relative w-36 h-36 rounded-full overflow-hidden bg-gradient-to-r from-[#FFDEE2] to-[#FFE6EA] shadow-lg border-2 border-white">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="avatar-face flex flex-col items-center">
                    {/* Soft smile */}
                    <div className="w-24 h-8 rounded-full bg-white flex items-center justify-center mb-1">
                      <div className="w-20 h-6 bg-[#FFDEE2] rounded-full"></div>
                    </div>
                    
                    {/* Eyes with subtle animation */}
                    <div className="flex space-x-8 mb-2">
                      <div className="eye w-3 h-4 rounded-full bg-[#555] flex items-center justify-center relative">
                        <div className="w-1 h-1 rounded-full bg-white absolute top-0.5 left-0.5"></div>
                      </div>
                      <div className="eye w-3 h-4 rounded-full bg-[#555] flex items-center justify-center relative">
                        <div className="w-1 h-1 rounded-full bg-white absolute top-0.5 left-0.5"></div>
                      </div>
                    </div>
                    
                    {/* Rosy cheeks */}
                    <div className="flex w-full justify-between px-4 mb-1">
                      <div className="w-4 h-2 rounded-full bg-[#FF9CAA] opacity-60"></div>
                      <div className="w-4 h-2 rounded-full bg-[#FF9CAA] opacity-60"></div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-1 -right-2 flex justify-center">
                  <div className="bg-white rounded-full p-1.5 shadow-md">
                    <Baby className="text-[#FF9CAA]" size={20} />
                  </div>
                </div>
              </div>
              
              <div className="absolute -left-2 top-2 bg-white p-1.5 rounded-full shadow-md">
                <Heart className="text-[#FF9CAA]" fill="#FFDEE2" size={18} />
              </div>
              
              <div className="speech-bubble absolute left-full top-1/4 bg-white px-4 py-2.5 rounded-lg shadow-md text-sm max-w-[180px] ml-3">
                <p className="text-mama-text font-medium leading-snug">I'm here for you day and night. You're not alone in this journey.</p>
                <div className="absolute top-1/2 -left-2 w-3 h-3 bg-white transform rotate-45 -translate-y-1/2"></div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Your Personal AI Guide Through Early Motherhood
            </h1>
          </div>
          
          <p className="text-lg md:text-xl text-mama-text/80 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Get instant, reliable answers to all your postpartum questions, 
            day or night. CaringMommy provides personalized support when you 
            need it most.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <a 
              href="#pricing" 
              className="w-full sm:w-auto btn-hover-slide bg-[#FFDEE2] hover:bg-[#FFDEE2]/90 text-mama-text font-medium px-8 py-3.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              Join Waitlist
            </a>
            <a 
              href="#features" 
              className="w-full sm:w-auto border border-[#FFDEE2]/70 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-mama-text font-medium px-8 py-3.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              See Features
            </a>
          </div>
          
          <div className="relative animate-fade-in-up mt-8" style={{ animationDelay: '0.8s' }}>
            <div className="aspect-video max-w-3xl mx-auto overflow-hidden rounded-2xl shadow-2xl">
              <div className="relative w-full h-full bg-[#FFDEE2]/30 flex items-center justify-center">
                <div className="blur-card rounded-xl p-6 max-w-md">
                  <div className="bg-[#FFDEE2]/50 rounded-full px-4 py-2 w-fit mb-4">
                    <span className="text-sm font-medium">CaringMommy AI</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">How can I help you today?</h3>
                  <p className="text-mama-text/80 mb-4">Ask me anything about postpartum care, breastfeeding, baby health, or self-care.</p>
                  <div className="flex items-start gap-3">
                    <div className="flex-1 bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-mama-text/70">"Is it normal for my baby to wake up every 2 hours at night?"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FFDEE2] to-transparent"></div>
    </section>
  );
};

export default Hero;
