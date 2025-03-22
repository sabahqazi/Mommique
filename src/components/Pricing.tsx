
import React, { useState, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Check, Heart } from 'lucide-react';
import { trackCTAClick, trackFormSubmit, trackPricingSelect } from '../services/analytics';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Pricing = () => {
  const [email, setEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ctaClickCount, setCtaClickCount] = useState(0);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const { toast } = useToast();
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Your Google Apps Script URL
  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Track form submission
      trackFormSubmit('home', 'waitlist', { email, pricingOption: selectedOption || 'none' });
      
      // Prepare form data
      const formData = new FormData();
      formData.append('email', email);
      formData.append('pricingOption', selectedOption || '');

      // Send data to Google Apps Script as a no-cors request with form data
      // This uses the URL with parameters approach which works around CORS limitations
      const url = `${GOOGLE_SCRIPT_URL}?email=${encodeURIComponent(email)}&pricingOption=${encodeURIComponent(selectedOption || '')}`;
      
      const response = await fetch(url, {
        method: 'GET',
        mode: 'no-cors', // This prevents CORS errors but gives an "opaque" response
      });
      
      // Since we can't access the response body with no-cors,
      // we assume success if the request doesn't throw an error
      
      // Show the thank you modal instead of toast
      setShowThankYouModal(true);
      
      setEmail("");
      setSelectedOption(null);
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error saving your information. Please try again.",
        variant: "destructive",
      });
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePricingButtonClick = (option: string) => {
    // Track pricing option selection
    trackPricingSelect('home', option);
    
    // Scroll to the waitlist form
    const waitlistElement = document.getElementById('waitlist');
    if (waitlistElement) {
      waitlistElement.scrollIntoView({ behavior: 'smooth' });
      
      // Add a highlight effect to the waitlist form
      waitlistElement.classList.add('highlight-pulse');
      
      // Center the waitlist element in the viewport
      const viewportHeight = window.innerHeight;
      const elementHeight = waitlistElement.offsetHeight;
      const offset = Math.max(0, (viewportHeight - elementHeight) / 2);
      
      window.scrollBy({
        top: -offset,
        behavior: 'smooth'
      });
      
      // Remove the highlight effect after animation completes
      setTimeout(() => {
        waitlistElement.classList.remove('highlight-pulse');
      }, 2000);
      
      // Set the selected pricing option
      setSelectedOption(option);
      
      // Focus on the email input after a short delay to allow scrolling to complete
      setTimeout(() => {
        if (emailInputRef.current) {
          emailInputRef.current.focus();
        }
      }, 600);
    }
  };
  
  const handleWaitlistCTAClick = () => {
    // Track CTA click
    const clickCount = trackCTAClick('home', 'join-waitlist', 'pricing-section');
    setCtaClickCount(clickCount);
  };

  return (
    <section id="pricing" className="py-16 bg-[#f8fafc]">
      {/* Thank You Modal */}
      <Dialog open={showThankYouModal} onOpenChange={setShowThankYouModal}>
        <DialogContent className="bg-white p-6 rounded-lg max-w-md mx-auto">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-pink-100 p-3 rounded-full">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
            </div>
            <DialogTitle className="text-xl font-bold text-center">Thank you for your interest!</DialogTitle>
            <DialogDescription className="text-center mt-2">
              We've added you to our waitlist and will notify you when we launch. 
              We're excited to have you join the bloom mama community!
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex justify-center">
            <button 
              onClick={() => setShowThankYouModal(false)}
              className="font-['Comfortaa'] bg-pink-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-pink-600 transition-colors"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
      
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
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-bold mb-3">Monthly Subscription</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">$9.99</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 mb-6">
                Unlimited access to AI support at a price less than a coffee a week.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <div className="text-red-500 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-gray-700">Unlimited AI answers and conversations</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-red-500 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-gray-700">Access to knowledge library</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-red-500 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-gray-700">Personalized recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-red-500 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-gray-700">Cancel anytime</span>
                </li>
              </ul>
              <button 
                className="w-full bg-blue-100 text-blue-800 font-medium py-3 rounded-lg hover:bg-blue-200 transition-colors"
                onClick={() => handlePricingButtonClick("monthly")}
              >
                Would Pay This Price
              </button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 relative">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold py-1 px-3 rounded-tl-lg rounded-br-lg">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-3">Annual Subscription</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">$79.99</span>
                <span className="text-gray-600">/year</span>
                <span className="ml-2 text-green-600 text-sm font-medium">Save 33%</span>
              </div>
              <p className="text-gray-600 mb-6">
                Unlimited access and best value for your entire postpartum journey.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <div className="text-red-500 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-gray-700">Everything in monthly plan</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-red-500 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-gray-700">2 months free compared to monthly</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-red-500 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-gray-700">Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-red-500 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-gray-700">Early access to new features</span>
                </li>
              </ul>
              <button 
                className="w-full bg-pink-100 text-pink-700 font-medium py-3 rounded-lg hover:bg-pink-200 transition-colors"
                onClick={() => handlePricingButtonClick("annual")}
              >
                Would Pay This Price
              </button>
            </div>
          </div>
          
          <div id="waitlist" className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg transition-all duration-500">
            <form onSubmit={handleSubmit}>
              <h3 className="text-xl font-bold mb-2 text-center">Join Our Waitlist</h3>
              <p className="text-gray-600 mb-6 text-center">
                Be the first to know when we launch and get exclusive early access.
              </p>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  ref={emailInputRef}
                />
              </div>
              
              <div className="mb-6">
                <p className="block text-sm font-medium mb-2">Would you pay for this service?</p>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="pricing" 
                      value="monthly"
                      checked={selectedOption === "monthly"}
                      onChange={() => setSelectedOption("monthly")}
                      className="h-4 w-4 text-pink-500 focus:ring-pink-500 border-gray-300"
                    />
                    <span>Yes, I would pay $9.99/month</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="pricing" 
                      value="annual"
                      checked={selectedOption === "annual"}
                      onChange={() => setSelectedOption("annual")}
                      className="h-4 w-4 text-pink-500 focus:ring-pink-500 border-gray-300"
                    />
                    <span>Yes, I would pay $79.99/year</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="pricing" 
                      value="too_expensive"
                      checked={selectedOption === "too_expensive"}
                      onChange={() => setSelectedOption("too_expensive")}
                      className="h-4 w-4 text-pink-500 focus:ring-pink-500 border-gray-300"
                    />
                    <span>These prices are too high for me</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="pricing" 
                      value="not_pay"
                      checked={selectedOption === "not_pay"}
                      onChange={() => setSelectedOption("not_pay")}
                      className="h-4 w-4 text-pink-500 focus:ring-pink-500 border-gray-300"
                    />
                    <span>I would not pay for this service</span>
                  </label>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-pink-500 text-white font-medium py-3 rounded-lg transition-colors hover:bg-pink-600 disabled:opacity-70"
                disabled={isSubmitting || !email || !selectedOption}
                onClick={handleWaitlistCTAClick}
              >
                {isSubmitting ? "Submitting..." : "Join Waitlist"}
              </button>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                We'll notify you when we launch. No spam, we promise.
              </p>
              
              {/* Analytics indicator (visible only in development) */}
              {import.meta.env.DEV && ctaClickCount > 0 && (
                <div className="mt-2 text-xs text-center text-blue-500">
                  CTA Clicks: {ctaClickCount}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
