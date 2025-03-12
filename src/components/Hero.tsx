
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');

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
            Endless questions in Motherhood? We've got you!
          </h1>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            This is your personal AI partner through motherhood
          </h2>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Get instant, reliable answers to all your postpartum questions, personalized to
            your journey. Like having a caring nurse by your side, always!
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-10">
          <div className="text-center mb-6">
            <h3 className="text-xl font-medium text-gray-800">
              Ask me anything about postpartum, self-care, breastfeeding, or baby health —
              get personalized answers!
            </h3>
          </div>
          
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-12 py-4 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
              placeholder="Example: &quot;what is the cause of my breast swelling OR why is my baby crying every 2 hours - give me detailed answers&quot;"
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
            <p className="text-gray-700 mb-4">Want to use this experience? Join our waitlist today</p>
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
    </section>
  );
};

export default Hero;
