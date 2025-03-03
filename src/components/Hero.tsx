
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
        className="absolute inset-0 bg-[radial-gradient(circle_at_calc(50%+var(--mouse-x,0.5)*30%)_calc(50%+var(--mouse-y,0.5)*30%),var(--tw-gradient-stops))] from-white via-gray-50 to-gray-100 opacity-30 -z-10"
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
              {/* Realistic avatar without round constraints */}
              <div className="relative w-44 h-56 overflow-hidden shadow-lg">
                {/* Natural-looking female support figure */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full relative">
                    {/* Body shape */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#F8E4D8] to-[#F5D7C6]">
                      {/* Clothing */}
                      <div className="absolute bottom-0 left-0 right-0 h-20 bg-[#D3E4FD]"></div>
                    </div>
                    
                    {/* Head */}
                    <div className="absolute w-28 h-30 top-2 left-1/2 transform -translate-x-1/2 bg-[#F8E4D8] rounded-t-[70%] overflow-hidden">
                      {/* Hair */}
                      <div className="absolute -top-2 -left-2 -right-2 h-14 bg-[#6B4F3F] rounded-t-full"></div>
                      <div className="absolute top-6 -left-1 w-6 h-14 bg-[#6B4F3F] rounded-l-full"></div>
                      <div className="absolute top-6 -right-1 w-6 h-14 bg-[#6B4F3F] rounded-r-full"></div>
                      
                      {/* Face */}
                      <div className="absolute top-9 left-0 right-0 h-16">
                        {/* Eyes */}
                        <div className="absolute top-1 left-0 right-0 flex justify-center space-x-8">
                          {/* Left eye */}
                          <div className="relative eye w-6 h-3 bg-white rounded-full flex items-center justify-center overflow-hidden">
                            <div className="pupil w-2.5 h-2.5 rounded-full bg-[#4B3621] absolute">
                              <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white"></div>
                            </div>
                            {/* Eyelashes */}
                            <div className="absolute -top-1.5 left-1 w-0.5 h-1.5 bg-[#6B4F3F] transform rotate-15"></div>
                            <div className="absolute -top-1.5 right-1 w-0.5 h-1.5 bg-[#6B4F3F] transform -rotate-15"></div>
                          </div>
                          
                          {/* Right eye */}
                          <div className="relative eye w-6 h-3 bg-white rounded-full flex items-center justify-center overflow-hidden">
                            <div className="pupil w-2.5 h-2.5 rounded-full bg-[#4B3621] absolute">
                              <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white"></div>
                            </div>
                            {/* Eyelashes */}
                            <div className="absolute -top-1.5 left-1 w-0.5 h-1.5 bg-[#6B4F3F] transform rotate-15"></div>
                            <div className="absolute -top-1.5 right-1 w-0.5 h-1.5 bg-[#6B4F3F] transform -rotate-15"></div>
                          </div>
                        </div>
                        
                        {/* Eyebrows */}
                        <div className="absolute top-0 left-0 right-0 flex justify-center space-x-10">
                          <div className="w-5 h-1 bg-[#6B4F3F] rounded-full transform -rotate-6"></div>
                          <div className="w-5 h-1 bg-[#6B4F3F] rounded-full transform rotate-6"></div>
                        </div>
                        
                        {/* Nose */}
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                          <div className="w-3 h-3 bg-[#F8E4D8] border-r border-b border-[#F5D7C6] rounded-br-full"></div>
                        </div>
                        
                        {/* Mouth */}
                        <div className="absolute top-9 left-1/2 transform -translate-x-1/2 w-8 h-2">
                          <div className="w-full h-full border-b-2 border-[#DB7093] rounded-b-full"></div>
                        </div>
                        
                        {/* Cheeks */}
                        <div className="absolute top-7 w-full flex justify-between px-3">
                          <div className="w-4 h-2 rounded-full bg-[#FFDEE2] opacity-50"></div>
                          <div className="w-4 h-2 rounded-full bg-[#FFDEE2] opacity-50"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Arms */}
                    <div className="absolute bottom-8 left-2 w-6 h-16 bg-[#F8E4D8] rounded-full transform rotate-12"></div>
                    <div className="absolute bottom-8 right-2 w-6 h-16 bg-[#F8E4D8] rounded-full transform -rotate-12"></div>
                    
                    {/* Hands */}
                    <div className="absolute bottom-3 left-0 w-7 h-7 bg-[#F8E4D8] rounded-full"></div>
                    <div className="absolute bottom-3 right-0 w-7 h-7 bg-[#F8E4D8] rounded-full"></div>
                  </div>
                </div>
                
                {/* Baby icon badge */}
                <div className="absolute -bottom-1 -right-2 flex justify-center">
                  <div className="bg-white rounded-full p-1.5 shadow-md">
                    <Baby className="text-[#FF9CAA]" size={20} />
                  </div>
                </div>
              </div>
              
              {/* Heart icon */}
              <div className="absolute -left-2 top-2 bg-white p-1.5 rounded-full shadow-md">
                <Heart className="text-[#FF9CAA]" fill="#FFDEE2" size={18} />
              </div>
              
              {/* Speech bubble with supportive message */}
              <div className="speech-bubble absolute left-full top-1/4 bg-white px-4 py-2.5 rounded-lg shadow-md text-sm max-w-[200px] ml-3">
                <p className="text-mama-text font-medium leading-snug">I understand your postpartum challenges and I'm here for you 24/7. You don't have to face this journey alone.</p>
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
              <div className="relative w-full h-full bg-gray-100/30 flex items-center justify-center">
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
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
