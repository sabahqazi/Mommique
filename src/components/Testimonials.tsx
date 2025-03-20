
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Having instant answers to my postpartum questions gave me so much peace of mind. It's like having a nurse on call 24/7.",
    name: "Sarah M.",
    role: "First-time mom",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&h=400&auto=format&fit=crop&q=100"
  },
  {
    quote: "The personalized advice based on my C-section recovery was incredibly helpful. Worth every penny for the support it provides.",
    name: "Jessica R.",
    role: "C-section recovery",
    rating: 5,
    image: "https://images.unsplash.com/photo-1623850835824-62d36e741905?w=400&h=400&auto=format&fit=crop&q=100"
  },
  {
    quote: "I love how it remembers my history and gives consistent advice. Much better than googling symptoms at 3 AM!",
    name: "Michelle K.",
    role: "2 weeks postpartum",
    rating: 5,
    image: "https://images.unsplash.com/photo-1631110670563-21dbba06ae97?w=400&h=400&auto=format&fit=crop&q=100"
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
            <Card key={index} className="bg-white rounded-xl p-6 shadow-sm">
              <CardContent className="p-0">
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-24 w-24 mb-4 border-2 border-pink-200">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="bg-pink-100 text-pink-800">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 italic text-center">{testimonial.quote}</p>
                
                <div className="text-center">
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
