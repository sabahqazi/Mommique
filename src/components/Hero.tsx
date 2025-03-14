
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    // Show overlay after 3 seconds
    const timer = setTimeout(() => {
      setShowOverlay(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen pt-28 pb-16 relative overflow-hidden bg-[#f8fafc]">
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <div className="mb-4 inline-block">
            <span className="bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-sm font-medium">
              Early Access Coming Soon
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Your Unique Motherhood Journey Deserves Personalized Support
          </h1>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            An AI partner that adapts to <span className="text-pink-600">your specific</span> postpartum experience
          </h2>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Get instant, reliable answers to <span className="font-medium">your unique</span> postpartum questions, 
            tailored specifically to <span className="font-medium">your journey</span>, <span className="font-medium">your baby</span>, and <span className="font-medium">your needs</span>. 
            Like having a caring nurse who knows exactly what <span className="italic">you're</span> going through.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-10">
          <div className="text-center mb-6">
            <h3 className="text-xl font-medium text-gray-800">
              Ask me anything about <span className="text-pink-600">your</span> postpartum experience, 
              <span className="text-pink-600">your</span> self-care needs, or <span className="text-pink-600">your</span> baby's health —
              get answers as unique as your motherhood journey!
            </h3>
          </div>
          
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-12 py-4 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
              placeholder="Example: &quot;Why is my c-section scar still painful after 4 weeks OR what sleeping pattern is normal for my 6-week-old &quot;"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute inset-y-0 right-3 flex items-center">
              <div className="bg-pink-100 p-2 rounded-full">
                <Search className="h-4 w-4 text-pink-500" />
              </div>
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-gray-700 mb-4">Want personalized answers to <span className="italic">your</span> questions? Join our waitlist today</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="#waitlist" 
                className="bg-pink-100 hover:bg-pink-200 text-pink-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Join Waitlist
              </a>
              <a 
                href="#features" 
                className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                See Features
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay Dialog */}
      <Dialog open={showOverlay} onOpenChange={setShowOverlay}>
        <DialogContent className="bg-[#E8F4FF] border-none p-6 max-w-md mx-auto rounded-xl">
          <DialogClose className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
          
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 w-60 mx-auto">
              <img 
                src="/lovable-uploads/79afbdd8-32c1-4b06-bca9-c21961dc1e30.png" 
                alt="Mother and baby whale illustration" 
                className="w-full"
              />
            </div>
            
            <h2 className="text-3xl font-bold text-[#E04D60] mb-4">
              So glad to see you here!
            </h2>
            
            <p className="text-gray-700 text-lg mb-8">
              I understand <span className="font-medium">your</span> unique postpartum challenges and I'm here for <span className="font-medium">you</span> 24/7. <span className="font-medium">Your</span> journey is unique, and you don't have to face it alone! I've got <span className="font-medium">you</span> covered!
            </p>
            
            <a 
              href="#features"
              onClick={() => setShowOverlay(false)} 
              className="bg-[#E04D60] hover:bg-[#d03c50] text-white font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Try the AI Guide
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Hero;
