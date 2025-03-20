
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    quote: "The app guided me through postpartum depression symptoms and encouraged me to seek help. I credit it for getting me the support I needed.",
    name: "Andrea L.",
    role: "Mom of 2, youngest 2 months old",
    avatar: "/lovable-uploads/bed06b2d-0cd1-44e6-a694-25809c9fcf9c.png"
  },
  {
    quote: "Having instant answers to my postpartum questions gave me so much peace of mind. It's like having a nurse on call 24/7.",
    name: "Sarah M.",
    role: "First-time mom",
    avatar: ""
  },
  {
    quote: "The personalized advice based on my C-section recovery was incredibly helpful. Worth every penny for the support it provides.",
    name: "Jessica R.",
    role: "C-section recovery",
    avatar: ""
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 bg-[#f8fafc]">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What New Moms Are Saying
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              {/* Quotation mark */}
              <div className="mb-6">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25 12.5C25 5.59644 30.5964 0 37.5 0V0C44.4036 0 50 5.59644 50 12.5V25C50 38.8071 38.8071 50 25 50V50C11.1929 50 0 38.8071 0 25V12.5C0 5.59644 5.59644 0 12.5 0V0C19.4036 0 25 5.59644 25 12.5V12.5Z" fill="#FFDEE2" fillOpacity="0.4"/>
                </svg>
              </div>
              
              {/* Testimonial quote */}
              <p className="text-gray-700 mb-8 text-lg italic">"{testimonial.quote}"</p>
              
              {/* User info with avatar */}
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4 border-2 border-[#FFDEE2]">
                  {testimonial.avatar ? (
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  ) : (
                    <AvatarFallback className="bg-mama-soft text-mama-text">
                      {testimonial.name.substring(0, 2)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
