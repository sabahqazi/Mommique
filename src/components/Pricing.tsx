
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Check } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { initializeSchema, WaitlistEntry } from '@/lib/supabase-schema';

const Pricing = () => {
  const [email, setEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [supabaseAvailable, setSupabaseAvailable] = useState(false);
  const [tableInitialized, setTableInitialized] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if Supabase is configured on component mount
    const isConfigured = isSupabaseConfigured();
    setSupabaseAvailable(isConfigured);
    console.log('Supabase configuration status in Pricing component:', isConfigured);
    
    // If Supabase is configured, initialize the schema
    if (isConfigured) {
      console.log('Initializing Supabase schema from Pricing component...');
      initializeSchema()
        .then(() => {
          console.log('Schema initialization completed in Pricing component');
          setTableInitialized(true);
        })
        .catch(err => {
          console.error('Failed to initialize schema from Pricing component:', err);
          toast({
            title: "Database Setup Issue",
            description: "There was an issue setting up the database. Data will be stored locally for now.",
            variant: "destructive"
          });
        });
    }
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Form submission started with values:', { email, selectedOption });
    
    try {
      // Create a waitlist entry object with field names matching the waitlist_interest table
      const waitlistEntry: WaitlistEntry = {
        email_address: email,          // Using email_address to match the table
        pricing: selectedOption,       // Using pricing to match the table
        created_at: new Date().toISOString()
      };
      
      console.log('Created waitlist entry object:', waitlistEntry);
      
      // Save to localStorage as a backup
      const existingEntries = JSON.parse(localStorage.getItem('waitlistEntries') || '[]');
      existingEntries.push(waitlistEntry);
      localStorage.setItem('waitlistEntries', JSON.stringify(existingEntries));
      console.log('Entry saved to localStorage:', waitlistEntry);
      
      // Send to Google Form if configured
      try {
        const formUrl = "https://docs.google.com/forms/d/1OUXnGQgO_w9-WdtJKSzPT1ZCj1AdtHzdwlUhLU5bQpU/formResponse";
        
        // Map your form fields to Google Form fields with the correct entry IDs
        const formData = new FormData();
        formData.append('entry.1776647972', email); // Email field entry ID
        formData.append('entry.1442464782', selectedOption || 'No option selected'); // Pricing option field entry ID
        
        // Send the data to Google Form
        // Note: Using no-cors mode since Google Forms doesn't support CORS
        await fetch(formUrl, {
          method: 'POST',
          mode: 'no-cors',
          body: formData
        });
        console.log('Data sent to Google Form');
      } catch (error) {
        console.warn('Failed to submit to Google Form:', error);
        // Continue processing as Google Form is just a backup
      }
      
      // Only attempt to save to Supabase if it's properly configured
      if (supabaseAvailable) {
        console.log('Attempting to save to Supabase waitlist_interest table:', waitlistEntry);
        
        // Double check Supabase configuration
        if (!isSupabaseConfigured()) {
          console.error('Supabase was marked as available but configuration check failed');
          throw new Error('Supabase configuration is incomplete');
        }
        
        console.log('Supabase configuration valid, proceeding with insert');
        
        // Let's log the Supabase instance to verify it's properly initialized
        console.log('Supabase client initialized:', !!supabase);
        
        // Insert into waitlist_interest table with matching field names
        console.log('About to insert record with data:', {
          email_address: email,
          pricing: selectedOption,
          created_at: new Date().toISOString()
        });
        
        const { data, error, status } = await supabase
          .from('waitlist_interest')
          .insert([{  // Note: Wrapping in array as required by Supabase
            email_address: email,
            pricing: selectedOption,
            created_at: new Date().toISOString()
          }])
          .select();
          
        console.log('Supabase insert response - Status:', status);
        
        if (error) {
          console.error('Error saving to Supabase:', error);
          console.error('Error details:', {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint
          });
          throw new Error(`Database error: ${error.message}`);
        } else {
          console.log('Waitlist entry saved successfully to Supabase!', data);
          
          // Verify the record was added by querying it back
          console.log('Verifying record was added by querying it back...');
          const { data: verifyData, error: verifyError } = await supabase
            .from('waitlist_interest')
            .select('*')
            .eq('email_address', email)
            .order('created_at', { ascending: false })
            .limit(1);
            
          if (verifyError) {
            console.warn('Could not verify record was added:', verifyError);
          } else {
            console.log('Verify query result:', verifyData);
            console.log('Verified record exists in database:', verifyData && verifyData.length > 0);
          }
          
          toast({
            title: "Success!",
            description: "Your information has been successfully saved to our database.",
          });
        }
      } else {
        console.log('Supabase not configured. Entry saved to localStorage and Google Form only.');
      }
      
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
        description: error instanceof Error ? error.message : "There was a problem submitting your information. Please try again.",
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
                onClick={() => setSelectedOption("monthly")}
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
                Best value for your entire postpartum journey.
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
                onClick={() => setSelectedOption("annual")}
              >
                Would Pay This Price
              </button>
            </div>
          </div>
          
          <div id="waitlist" className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg">
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
        </div>
      </div>
    </section>
  );
};

export default Pricing;
