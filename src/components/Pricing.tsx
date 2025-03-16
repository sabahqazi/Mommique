
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import PricingOption from './pricing/PricingOption';
import WaitlistForm from './pricing/WaitlistForm';
import { pricingOptions } from '../data/pricingOptions';
import { submitWaitlistForm } from '../utils/waitlistSubmission';

const Pricing = () => {
  const [email, setEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitWaitlistForm(email, selectedOption);
      
      // Show success message
      toast({
        title: "Thank you for your interest!",
        description: "We've added you to our waitlist and will notify you when we launch.",
      });
      
      // Reset form
      setEmail("");
      setSelectedOption(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your information. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="pricing" className="py-16 bg-[#f8fafc]">
      <div className="container">
        <div className="text-center mb-8">
          <span className="bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-sm font-medium">
            Join Our Waitlist
          </span>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Be Among the First to Experience thrive mama
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12">
            We're launching soon! Sign up now to get early access and help us understand what pricing would work for you.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {pricingOptions.map((option) => (
              <PricingOption
                key={option.id}
                title={option.title}
                price={option.price}
                period={option.period}
                description={option.description}
                features={option.features}
                buttonText={option.buttonText}
                buttonColor={option.buttonColor}
                isMostPopular={option.isMostPopular}
                onClick={() => setSelectedOption(option.id)}
              />
            ))}
          </div>
          
          <WaitlistForm
            email={email}
            setEmail={setEmail}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;
