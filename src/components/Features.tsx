
import React from 'react';
import { MessageSquare, Clock, ShieldCheck, BookOpen, Heart, Zap } from 'lucide-react';

const Features = () => {
  return (
    <section id="features" className="py-16 bg-[#f8fafc]">
      <div className="container">
        <div className="mb-12 text-center">
          <span className="bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-sm font-medium">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            Your Postpartum Questions, Answered Instantly
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Thrive mama combines medical expertise with advanced AI to provide 
            personalized support exactly when you need it, helping you navigate the 
            challenges of early motherhood with confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <div className="mb-5 p-3 bg-pink-50 rounded-full inline-block w-fit">
              <MessageSquare className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Personalized Answers</h3>
            <p className="text-gray-600">
              Get responses tailored to your specific situation, medical history, and recovery journey.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <div className="mb-5 p-3 bg-pink-50 rounded-full inline-block w-fit">
              <Clock className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">24/7 Availability through text or voice</h3>
            <p className="text-gray-600">
              Get instant support, day or night especially during those late nights worries — through text or voice, whenever you need it.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <div className="mb-5 p-3 bg-pink-50 rounded-full inline-block w-fit">
              <ShieldCheck className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Research-backed Answers</h3>
            <p className="text-gray-600">
              All information is verified by postpartum research docs posted by professional and updated regularly.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <div className="mb-5 p-3 bg-pink-50 rounded-full inline-block w-fit">
              <BookOpen className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Knowledge Library</h3>
            <p className="text-gray-600">
              Access comprehensive resources on postpartum care, breastfeeding, and baby development.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <div className="mb-5 p-3 bg-pink-50 rounded-full inline-block w-fit">
              <Heart className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Mom & Baby Care</h3>
            <p className="text-gray-600">
              Complete guidance for both maternal recovery and infant care in one trusted place.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <div className="mb-5 p-3 bg-pink-50 rounded-full inline-block w-fit">
              <Zap className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Relief</h3>
            <p className="text-gray-600">
              Save precious time with immediate answers and support when you need it most.
            </p>
          </div>
        </div>
        
        <div className="mt-24 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="mb-4 text-pink-600 font-medium">Fast. Simple. Always There for You!</div>
              <h3 className="text-3xl font-bold mb-6">As Easy as Texting a Friend</h3>
              <p className="text-gray-700 mb-6">
                Just type your question in natural language, and get thoughtful, 
                personalized answers within seconds. No complicated menus or 
                learning curve.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-3 text-red-500 mt-1">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>Ask anything about breastfeeding, sleep, recovery, or baby care</div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 text-red-500 mt-1">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>Receive personalized recommendations based on your unique situation</div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 text-red-500 mt-1">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>Get urgent vs. non-urgent guidance on when to call your doctor</div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="bg-pink-50 p-4 rounded-lg mb-4">
                <p className="text-gray-800 font-medium">My baby is 2 weeks old and has a really red diaper rash. Is this normal?</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-gray-800 mb-4">Diaper rash is common in newborns. For a 2-week-old, try these steps:</p>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  <li>Change diapers frequently</li>
                  <li>Allow air-dry time</li>
                  <li>Use zinc oxide cream</li>
                </ul>
                <p className="text-gray-800">Call your pediatrician if it doesn't improve in 2-3 days or if you notice blisters, pus, or severe discomfort.</p>
              </div>
              
              <div className="bg-pink-50 p-4 rounded-lg mb-4">
                <p className="text-gray-800">Thanks, that's helpful! How often should I change diapers?</p>
              </div>
              
              <div className="flex items-center text-gray-500 text-sm">
                <div className="mr-2 h-2 w-2 bg-pink-300 rounded-full animate-pulse"></div>
                <span>CaringMommy is typing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
