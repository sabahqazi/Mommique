import React from 'react';

const Features = () => {
  return (
    <section className="section bg-white">
      <div className="container text-center">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Your Unique Postpartum Questions, Answered Instantly
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            <span className="font-['Comfortaa'] font-bold text-pink-600">Bloom</span> combines research-backed expertise with advanced AI to provide support tailored specifically to your needs and your baby, helping you navigate your unique motherhood journey with confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Personalized Q&A
            </h3>
            <p className="text-gray-600">
              Get immediate answers to your specific postpartum questions, tailored to your unique situation and stage.
            </p>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              24/7 Support
            </h3>
            <p className="text-gray-600">
              Access reliable information and support anytime, day or night, ensuring you're never alone in your journey.
            </p>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Expert-Backed Advice
            </h3>
            <p className="text-gray-600">
              Benefit from AI-driven insights grounded in the latest research and recommendations from postpartum experts.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Symptom Tracking
            </h3>
            <p className="text-gray-600">
              Log and monitor your symptoms to better understand your body's recovery process and identify potential concerns early.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Resource Library
            </h3>
            <p className="text-gray-600">
              Explore a curated collection of articles, tips, and tools to support your physical and emotional well-being.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Community Forum
            </h3>
            <p className="text-gray-600">
              Connect with other moms, share experiences, and find encouragement in a supportive community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
