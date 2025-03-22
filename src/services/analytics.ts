
// Simple analytics service to track page views and events
// This is a basic implementation that could be expanded or connected to services like Google Analytics

type EventType = 'page_view' | 'cta_click' | 'form_submit' | 'pricing_option_select';

interface AnalyticsEvent {
  type: EventType;
  page: string;
  timestamp: number;
  properties?: Record<string, any>;
}

// In-memory storage for analytics events (in a real app, you'd send these to a backend)
const events: AnalyticsEvent[] = [];

// Track page views
export const trackPageView = (page: string) => {
  const event: AnalyticsEvent = {
    type: 'page_view',
    page,
    timestamp: Date.now(),
  };
  
  events.push(event);
  console.log('Analytics: Page View', event);
  
  // Return the total page views for this page
  return events.filter(e => e.type === 'page_view' && e.page === page).length;
};

// Track CTA clicks
export const trackCTAClick = (page: string, ctaName: string, ctaLocation: string) => {
  const event: AnalyticsEvent = {
    type: 'cta_click',
    page,
    timestamp: Date.now(),
    properties: {
      ctaName,
      ctaLocation,
    }
  };
  
  events.push(event);
  console.log('Analytics: CTA Click', event);
  
  // Return the total clicks for this CTA
  return events.filter(e => 
    e.type === 'cta_click' && 
    e.page === page && 
    e.properties?.ctaName === ctaName
  ).length;
};

// Track form submissions
export const trackFormSubmit = (page: string, formName: string, formData?: Record<string, any>) => {
  const event: AnalyticsEvent = {
    type: 'form_submit',
    page,
    timestamp: Date.now(),
    properties: {
      formName,
      ...formData && { formDataKeys: Object.keys(formData) }
    }
  };
  
  events.push(event);
  console.log('Analytics: Form Submit', event);
};

// Track pricing option selections
export const trackPricingSelect = (page: string, pricingOption: string) => {
  const event: AnalyticsEvent = {
    type: 'pricing_option_select',
    page,
    timestamp: Date.now(),
    properties: {
      pricingOption,
    }
  };
  
  events.push(event);
  console.log('Analytics: Pricing Option Selected', event);
};

// Get analytics data
export const getAnalyticsData = () => {
  const pageViews = events.filter(e => e.type === 'page_view');
  const ctaClicks = events.filter(e => e.type === 'cta_click');
  const formSubmits = events.filter(e => e.type === 'form_submit');
  
  return {
    totalPageViews: pageViews.length,
    uniquePages: [...new Set(pageViews.map(e => e.page))].length,
    totalCTAClicks: ctaClicks.length,
    totalFormSubmits: formSubmits.length,
    conversionRate: formSubmits.length > 0 && pageViews.length > 0 
      ? (formSubmits.length / pageViews.length * 100).toFixed(2) + '%' 
      : '0%',
    events
  };
};
