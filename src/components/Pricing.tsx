
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Pricing = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Thank you for your interest!",
        description: "We've added you to our waitlist and will notify you when we launch.",
      });
      setEmail("");
      setSelectedOption(null);
    }, 1500);
  };

  return (
    <section id="pricing" className="section bg-mama-soft/20 relative">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="bg-mama-pink/30 text-mama-text px-4 py-1.5 rounded-full text-sm font-medium">
            Join Our Waitlist
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            Be Among the First to Experience CaringMommy
          </h2>
          <p className="text-lg text-mama-text/80">
            We're launching soon! Sign up now to get early access and help us understand what pricing would work for you.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-md border border-mama-light/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-1 -mr-1">
                <div className="bg-mama-pink/80 text-white text-xs font-bold py-1 px-3 rotate-12 transform translate-x-2 -translate-y-1">
                  MOST POPULAR
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Monthly Subscription</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">$9.99</span>
                <span className="text-mama-text/60">/month</span>
              </div>
              <p className="text-mama-text/70 mb-6">
                Unlimited access to AI support at a price less than a coffee a week.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <div className="text-green-500 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Unlimited AI answers and conversations</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-green-500 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Access to knowledge library</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-green-500 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Personalized recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-green-500 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Cancel anytime</span>
                </li>
              </ul>
              <button 
                className="w-full bg-mama-pink/80 hover:bg-mama-pink text-white font-medium py-3 rounded-lg transition-colors"
                onClick={() => setSelectedOption("monthly")}
              >
                Would Pay This Price
              </button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-mama-light/50">
              <h3 className="text-xl font-bold mb-3">Annual Subscription</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">$79.99</span>
                <span className="text-mama-text/60">/year</span>
                <span className="ml-2 text-green-600 text-sm font-medium">Save 33%</span>
              </div>
              <p className="text-mama-text/70 mb-6">
                Best value for your entire postpartum journey.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <div className="text-green-500 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Everything in monthly plan</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-green-500 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-sm">2 months free compared to monthly</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-green-500 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-green-500 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Early access to new features</span>
                </li>
              </ul>
              <button 
                className="w-full bg-mama-soft hover:bg-mama-soft/80 text-mama-text font-medium py-3 rounded-lg transition-colors"
                onClick={() => setSelectedOption("annual")}
              >
                Would Pay This Price
              </button>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg border border-mama-light/50">
            <form onSubmit={handleSubmit}>
              <h3 className="text-xl font-bold mb-2 text-center">Join Our Waitlist</h3>
              <p className="text-mama-text/70 mb-6 text-center">
                Be the first to know when we launch and get exclusive early access.
              </p>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 border border-mama-soft/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-mama-soft"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Would you pay for this service?</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="pricing" 
                      value="monthly"
                      checked={selectedOption === "monthly"}
                      onChange={() => setSelectedOption("monthly")}
                      className="h-4 w-4 text-mama-soft focus:ring-mama-soft border-mama-soft/50"
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
                      className="h-4 w-4 text-mama-soft focus:ring-mama-soft border-mama-soft/50"
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
                      className="h-4 w-4 text-mama-soft focus:ring-mama-soft border-mama-soft/50"
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
                      className="h-4 w-4 text-mama-soft focus:ring-mama-soft border-mama-soft/50"
                    />
                    <span>I would not pay for this service</span>
                  </label>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-mama-pink text-white font-medium py-3 rounded-lg transition-colors hover:bg-mama-pink/90 disabled:opacity-70"
                disabled={isSubmitting || !email || !selectedOption}
              >
                {isSubmitting ? "Submitting..." : "Join Waitlist"}
              </button>
              
              <p className="text-xs text-mama-text/50 mt-4 text-center">
                We'll notify you when we launch. No spam, we promise.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
