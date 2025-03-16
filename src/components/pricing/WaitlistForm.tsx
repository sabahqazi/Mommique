
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

interface WaitlistFormProps {
  email: string;
  setEmail: (email: string) => void;
  selectedOption: string | null;
  setSelectedOption: (option: string | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({
  email,
  setEmail,
  selectedOption,
  setSelectedOption,
  onSubmit,
  isSubmitting,
}) => {
  return (
    <div id="waitlist" className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg">
      <form onSubmit={onSubmit}>
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
        >
          {isSubmitting ? "Submitting..." : "Join Waitlist"}
        </button>
        
        <p className="text-xs text-gray-500 mt-4 text-center">
          We'll notify you when we launch. No spam, we promise.
        </p>
      </form>
    </div>
  );
};

export default WaitlistForm;
