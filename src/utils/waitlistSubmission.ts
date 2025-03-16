
interface WaitlistEntry {
  email: string;
  pricingOption: string | null;
  timestamp: string;
}

export const submitWaitlistForm = async (email: string, selectedOption: string | null): Promise<void> => {
  // Create an object with form data
  const waitlistEntry: WaitlistEntry = {
    email,
    pricingOption: selectedOption,
    timestamp: new Date().toISOString()
  };
  
  // Save to localStorage as a backup
  const existingEntries: WaitlistEntry[] = JSON.parse(localStorage.getItem('waitlistEntries') || '[]');
  existingEntries.push(waitlistEntry);
  localStorage.setItem('waitlistEntries', JSON.stringify(existingEntries));
  
  // Get Google Form data
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfbK1J8223gzS7RfLSu9ZNX-YXUjqXt46puFjMJI3vZV39C3g/formResponse";
  
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
  
  // Log to console for debugging
  console.log('Waitlist entries:', existingEntries);
};
