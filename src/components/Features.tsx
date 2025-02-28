
import React from 'react';
import { Heart, MessageSquare, Clock, ShieldCheck, Baby, BookOpen } from 'lucide-react';

const features = [
  {
    icon: <MessageSquare className="w-10 h-10 text-mama-pink" />,
    title: "24/7 AI-Powered Answers",
    description: "Get immediate responses to your postpartum questions anytime, day or night, without waiting for appointments."
  },
  {
    icon: <Heart className="w-10 h-10 text-mama-pink" />,
    title: "Personalized Support",
    description: "Our AI learns about your unique journey and provides tailored advice based on your specific needs and concerns."
  },
  {
    icon: <Clock className="w-10 h-10 text-mama-pink" />,
    title: "Saves Precious Time",
    description: "No more endless Google searches or waiting for doctor callbacks when you're exhausted and need quick guidance."
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-mama-pink" />,
    title: "Medically Informed",
    description: "Our AI is trained on trusted medical resources to ensure you receive reliable, evidence-based information."
  },
  {
    icon: <Baby className="w-10 h-10 text-mama-pink" />,
    title: "Baby & Mom Care",
    description: "From breastfeeding and sleep issues to your own recovery questions, we cover all aspects of postpartum care."
  },
  {
    icon: <BookOpen className="w-10 h-10 text-mama-pink" />,
    title: "Knowledge Library",
    description: "Access our extensive collection of articles and resources to proactively learn about your postpartum journey."
  }
];

const Features = () => {
  return (
    <section id="features" className="section bg-mama-green/20 relative">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="bg-mama-green/50 text-mama-text px-4 py-1.5 rounded-full text-sm font-medium">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            Your Postpartum Questions, Answered Instantly
          </h2>
          <p className="text-lg text-mama-text/80">
            CaringMommy combines medical expertise with advanced AI to provide personalized support 
            exactly when you need it, helping you navigate the challenges of early motherhood with confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
            >
              <div className="mb-5 p-3 bg-mama-light/30 rounded-lg inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-mama-text/70 flex-grow">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
              <div className="bg-mama-soft/30 rounded-full px-4 py-1.5 inline-block mb-4">
                <span className="text-sm font-medium">Simple to Use</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                As Easy as Texting a Friend
              </h3>
              <p className="text-mama-text/80 mb-6">
                Just type your question in natural language, and get thoughtful, 
                personalized answers within seconds. No complicated menus or learning curve.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="bg-mama-green/30 p-1 rounded-full mt-1">
                    <svg className="w-3 h-3 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm">Ask anything about breastfeeding, sleep, recovery, or baby care</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-mama-green/30 p-1 rounded-full mt-1">
                    <svg className="w-3 h-3 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm">Receive personalized recommendations based on your unique situation</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-mama-green/30 p-1 rounded-full mt-1">
                    <svg className="w-3 h-3 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm">Get urgent vs. non-urgent guidance on when to call your doctor</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 bg-mama-light/20 p-6 md:p-8 flex items-center justify-center">
              <div className="bg-white rounded-xl shadow-sm p-5 max-w-sm w-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-mama-pink"></div>
                  <div className="w-2 h-2 rounded-full bg-mama-green"></div>
                  <div className="w-2 h-2 rounded-full bg-mama-soft"></div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-mama-soft/40 rounded-xl rounded-tr-sm p-3 max-w-[80%]">
                      <p className="text-sm">My baby is 2 weeks old and has a really red diaper rash. Is this normal?</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-mama-light/40 rounded-xl rounded-tl-sm p-3 max-w-[80%]">
                      <p className="text-sm">Diaper rash is common in newborns. For a 2-week-old, try these steps:</p>
                      <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                        <li>Change diapers frequently</li>
                        <li>Allow air-dry time</li>
                        <li>Use zinc oxide cream</li>
                      </ul>
                      <p className="text-sm mt-2">Call your pediatrician if it doesn't improve in 2-3 days or if you notice blisters, pus, or severe discomfort.</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-mama-soft/40 rounded-xl rounded-tr-sm p-3 max-w-[80%]">
                      <p className="text-sm">Thanks, that's helpful! How often should I change diapers?</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-mama-text/40">
                    <span>CaringMommy is typing</span>
                    <span className="flex gap-1">
                      <span className="animate-bounce delay-0 w-1 h-1 bg-mama-text/40 rounded-full"></span>
                      <span className="animate-bounce delay-150 w-1 h-1 bg-mama-text/40 rounded-full"></span>
                      <span className="animate-bounce delay-300 w-1 h-1 bg-mama-text/40 rounded-full"></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
