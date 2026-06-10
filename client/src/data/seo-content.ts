export type SEOPageData = {
  type: 'location' | 'industry';
  id: string; // e.g. 'mumbai' or 'hotels'
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    industry?: string;
    location?: string;
  };
  faq: {
    question: string;
    answer: string;
  }[];
};

export const seoPages: Record<string, SEOPageData> = {
  mumbai: {
    type: 'location',
    id: 'mumbai',
    meta: {
      title: 'Custom Branded Glass Water Bottles in Mumbai | PureHarvest',
      description: 'Elevate your brand in Mumbai with premium, sustainable custom glass water bottles. Perfect for luxury hotels, corporate events, and restaurants in Maharashtra.',
      keywords: ['custom glass water bottles mumbai', 'branded water bottles maharashtra', 'premium water packaging bkc', 'corporate event water bottles mumbai']
    },
    hero: {
      location: 'Mumbai'
    },
    faq: [
      {
        question: "Do you supply custom glass water bottles to hotels in South Mumbai?",
        answer: "Yes, we provide luxury custom branded glass water bottles with fast delivery across all of Mumbai, including South Mumbai, BKC, and Andheri."
      },
      {
        question: "What is the minimum order quantity for Mumbai deliveries?",
        answer: "Our minimum order quantity for customized glass bottles in Mumbai starts at just 500 units, making it ideal for both boutique cafes and large corporate parks."
      }
    ]
  },
  hotels: {
    type: 'location', // Reusing location logic for dynamic injection, though it's technically an industry
    id: 'hotels',
    meta: {
      title: 'Premium Custom Water Bottles for Hotels & Hospitality | PureHarvest',
      description: 'Replace single-use plastic in your hotel suites with premium borosilicate glass bottles. Customized with your hotel logo for an unforgettable guest experience.',
      keywords: ['custom water bottles for hotels', 'hotel room glass water bottles', 'hospitality branded water', 'sustainable hotel water solutions']
    },
    hero: {
      industry: 'Hotels'
    },
    faq: [
      {
        question: "Are your glass bottles safe for hotel room service and daily use?",
        answer: "Absolutely. We use high-grade, shatter-resistant borosilicate glass designed for the rigorous demands of hotel room service, banquets, and daily cleaning."
      },
      {
        question: "Can we get our hotel logo etched directly on the glass?",
        answer: "Yes! We offer premium logo etching, custom label printing, and bespoke cap designs to ensure the bottle perfectly matches your hotel's aesthetic."
      }
    ]
  }
};
