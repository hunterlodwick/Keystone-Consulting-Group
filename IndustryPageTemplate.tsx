import React, { useState } from 'react';
import { 
  CheckCircle, Shield, Menu, X, ArrowUp, MonitorSmartphone, 
  CreditCard, BarChart3, Percent, DollarSign 
} from 'lucide-react';
import { ContactForm } from '../App';

export const INDUSTRY_LANDING_PAGES: Record<string, any> = {
  'restaurants': {
    title: 'Restaurants & Retail',
    headline: 'Payment Solutions Built for Restaurants & Retail',
    subheadline: 'From tableside payments to kitchen display integration — we eliminate processing headaches so you can focus on your guests.',
    painPoints: ['Overpaying on Processing Fees', 'Outdated POS Slowing You Down', 'No Visibility Into Your Numbers'],
    solutions: ['Our Edge Program Can Eliminate Up to 100% of Fees', 'Modern POS Systems With Kitchen Display & Online Ordering', 'Real-Time Dashboard With Daily Deposit Tracking'],
    calculatorDefault: 45000,
    testimonial: {
      quote: "Keystone saved us over $14,000 in our first year. The switch was painless.",
      name: "Maria R.",
      business: "Bella's Italian Kitchen"
    }
  },
  'grocery': {
    title: 'Grocery & Supermarkets',
    headline: 'Payment Processing Built for Grocery & Supermarkets',
    subheadline: 'High-volume, thin-margin businesses need every advantage. We cut your processing costs so you keep more per transaction.',
    painPoints: ['Razor-Thin Margins Eaten by Fees', 'Slow Checkout Killing Customer Flow', 'No Integration With Inventory Systems'],
    solutions: ['Interchange Plus Pricing at True Wholesale Rates', 'Fast EMV + Contactless Terminals With Under 2-Second Tap', 'POS Systems That Sync With Inventory & Vendor Management'],
    calculatorDefault: 120000,
    testimonial: {
      quote: "We process over $100K/mo and Keystone cut our fees by 40%. That's real money in grocery.",
      name: "Tom H.",
      business: "FreshMart Grocery"
    }
  },
  'healthcare': {
    title: 'Healthcare & Medical',
    headline: 'Secure Payment Solutions for Healthcare & Medical Practices',
    subheadline: 'Patient-friendly payment processing that integrates with your practice management software.',
    painPoints: ['Complex Billing With High Processing Costs', 'Patients Frustrated by Payment Experience', 'Security & Compliance Concerns'],
    solutions: ['Transparent Pricing With No Hidden Surcharges', 'Patient-Facing Terminals With Contactless & Mobile Pay', 'PCI-Compliant Hardware With End-to-End Encryption'],
    calculatorDefault: 35000,
    testimonial: {
      quote: "Our patients love the tap-to-pay option and we love paying zero in processing fees with The Edge Program.",
      name: "Dr. Lisa M.",
      business: "Summit Family Practice"
    }
  },
  'ecommerce': {
    title: 'E-Commerce',
    headline: 'E-Commerce Payment Processing That Scales With You',
    subheadline: 'Seamless online checkout, virtual terminal access, and gateway integrations that keep your cart conversion rates high.',
    painPoints: ['High Online Processing Rates Eating Margins', 'Cart Abandonment From Clunky Checkout', 'No Unified View of Online + In-Store Sales'],
    solutions: ['Competitive E-Commerce Rates With Interchange Plus', 'Hosted Payment Pages & Gateway Integrations (NMI, PayTrace)', 'Unified Reporting Dashboard Across All Channels'],
    calculatorDefault: 30000,
    testimonial: {
      quote: "Keystone integrated with our Shopify store in a day. Our checkout conversion went up 12%.",
      name: "Rachel W.",
      business: "ThreadLine Apparel"
    }
  },
  'salons': {
    title: 'Salons & Spas',
    headline: 'Payment Solutions Designed for Salons & Spas',
    subheadline: 'Beautiful, simple payment experiences that match the quality of your services.',
    painPoints: ['Processing Fees Eating Into Service Revenue', 'Outdated Terminal Doesn\'t Match Your Brand', 'No Easy Way to Sell Gift Cards or Memberships'],
    solutions: ['The Edge Program Means You Keep 100% of Every Service', 'Sleek Smart Terminals With Tap, Chip, & Swipe', 'Built-In Gift Card & Loyalty Program Integration'],
    calculatorDefault: 20000,
    testimonial: {
      quote: "We went from paying $800/mo in fees to zero with The Edge Program. Plus our clients love the new gift card program.",
      name: "Sarah K.",
      business: "Glow Wellness Spa"
    }
  },
  'auto-repair': {
    title: 'Auto Repair',
    headline: 'Payment Processing Built for Auto Repair Shops',
    subheadline: 'High-ticket transactions deserve low-cost processing. We help shops keep more of every repair ticket.',
    painPoints: ['High Fees on Big-Ticket Repairs', 'No Integration With Shop Management Software', 'Customers Asking for Financing Options'],
    solutions: ['The Edge Program Eliminates Fees on $500+ Tickets', 'POS Integration With Shop Management & Invoicing', 'Consumer Financing Options to Close More Big Jobs'],
    calculatorDefault: 40000,
    testimonial: {
      quote: "On a $2,000 transmission job, I used to lose $60+ in fees. Now I keep every dollar.",
      name: "James T.",
      business: "Peak Auto Repair"
    }
  },
  'gas-stations': {
    title: 'Gas Stations',
    headline: 'Fuel & C-Store Payment Solutions',
    subheadline: 'Outdoor EMV compliance, pump integration, and c-store POS — all from one provider with transparent pricing.',
    painPoints: ['Outdoor EMV Compliance Deadline Pressure', 'Separate Systems for Pumps and C-Store', 'Interchange Fees Destroying Fuel Margins'],
    solutions: ['Outdoor EMV-Ready Terminals With Pump Integration', 'Unified POS for Fuel + Convenience Store on One System', 'Interchange Plus Pricing to Maximize Per-Gallon Profit'],
    calculatorDefault: 150000,
    testimonial: {
      quote: "Keystone got us EMV compliant at the pump and cut our indoor processing fees in half.",
      name: "Mike D.",
      business: "QuickFuel Express"
    }
  },
  'high-risk': {
    title: 'High-Risk - CBD & Vape',
    headline: 'Payment Processing for High-Risk Merchants',
    subheadline: 'CBD, vape, smoke shops, and other high-risk verticals — we specialize in getting you approved and keeping you processing.',
    painPoints: ['Constant Account Freezes & Holds', 'Sky-High Processing Rates', 'Difficulty Finding a Reliable Processor'],
    solutions: ['Stable, Long-Term High-Risk Merchant Accounts', 'Competitive High-Risk Rates With Transparent Pricing', 'Dedicated Account Manager Who Understands Your Industry'],
    calculatorDefault: 25000,
    testimonial: {
      quote: "Three processors dropped us before Keystone. We've been stable for 8 months and counting.",
      name: "Alex P.",
      business: "Green Leaf CBD"
    }
  },
  'nonprofits': {
    title: 'Nonprofits & Churches',
    headline: 'Donation & Payment Processing for Nonprofits & Churches',
    subheadline: 'Lower your processing costs on every donation so more of every dollar goes to your mission.',
    painPoints: ['Processing Fees Reducing Donation Impact', 'No Easy Way to Accept Recurring Donations', 'Outdated Giving Kiosks'],
    solutions: ['Nonprofit-Friendly Rates With Interchange Plus Pricing', 'Recurring Donation Setup With Online Giving Pages', 'Modern Tap-to-Give Kiosks & Mobile Donation Terminals'],
    calculatorDefault: 15000,
    testimonial: {
      quote: "Every dollar matters for our church. Keystone cut our processing fees by 60%.",
      name: "Pastor David R.",
      business: "Grace Community Church"
    }
  },
  'b2b': {
    title: 'B2B & Professional Services',
    headline: 'Payment Solutions for B2B & Professional Services',
    subheadline: 'Invoice payments, ACH processing, and virtual terminals built for businesses that bill other businesses.',
    painPoints: ['High Fees on Large Invoice Payments', 'Clients Slow to Pay Without Easy Payment Options', 'No Integration With Accounting Software'],
    solutions: ['Level 2/3 Processing for Reduced B2B Interchange Rates', 'Email Invoicing With Pay-Now Links & ACH Options', 'QuickBooks, HubSpot & Accounting Software Integration'],
    calculatorDefault: 50000,
    testimonial: {
      quote: "Our average invoice is $5,000. Level 2/3 processing through Keystone saves us hundreds every month.",
      name: "David M.",
      business: "Boxed Logistics"
    }
  }
};

export default function IndustryPageTemplate({ industryPath, onNavigate, onOpenModal }: { industryPath: string, onNavigate: (path: string) => void, onOpenModal: (title: string, content: React.ReactNode) => void }) {
  const data = INDUSTRY_LANDING_PAGES[industryPath];
  const [volume, setVolume] = useState(data?.calculatorDefault || 25000);

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center text-white">Industry not found.</div>;
  }

  const currentFees = volume * 0.029;
  const keystoneFees = volume * 0.00;
  const monthlySavings = currentFees - keystoneFees;

  return (
    <>
      <div className="bg-charcoal-dark border-b border-white/5 py-3 px-6 hidden md:flex justify-end text-sm text-offwhite/50">
        <button onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors bg-white/5 px-4 py-1 rounded-full">
          Specialized {data.title} Solutions
        </button>
      </div>

      {/* Hero */}
      <section className="pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal text-xs font-medium uppercase tracking-wider mb-6">
          {data.title} Integrations
        </div>
        <h1 className="font-serif text-4xl md:text-6xl text-white mb-6 max-w-4xl mx-auto leading-tight">
          {data.headline}
        </h1>
        <p className="text-offwhite/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10">
          {data.subheadline}
        </p>
        <button onClick={() => onOpenModal(`Free ${data.title} Analysis`, <ContactForm />)} className="analysis-cta-btn cta-button-pulse px-8 py-4 bg-teal text-white font-medium rounded-sm transition-all duration-300 ease-custom hover:scale-[1.02]">
          Get Your Free {data.title} Statement Analysis
        </button>
      </section>

      {/* Pain Points & Solutions */}
      <section className="py-20 relative overflow-hidden bg-charcoal-dark/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="font-serif text-2xl text-white mb-8">The Problems You're Facing</h3>
              <div className="space-y-6">
                {data.painPoints.map((point: string, i: number) => (
                  <div key={i} className="bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/30 p-6 rounded-xl flex items-start gap-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)] group">
                    <X className="w-6 h-6 text-red-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <p className="text-offwhite/80 font-light">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ animationDelay: '200ms' }}>
              <h3 className="font-serif text-2xl text-white mb-8">The Keystone Solution</h3>
              <div className="space-y-6">
                {data.solutions.map((point: string, i: number) => (
                  <div key={i} className="bg-teal/5 hover:bg-teal/10 border border-teal/20 hover:border-teal/40 p-6 rounded-xl flex items-start gap-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,128,128,0.15)] group">
                    <CheckCircle className="w-6 h-6 text-teal flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <p className="text-white font-light group-hover:text-white transition-colors">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Calculator */}
      <section className="py-24 max-w-4xl mx-auto px-6 md:px-12">
        <div className="bg-slate-dark/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 shadow-[0_0_40px_rgba(0,0,0,0.4)] hover:shadow-[0_0_50px_rgba(0,128,128,0.15)] transition-all duration-500 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,128,128,0.1)_0%,transparent_70%)] opacity-50 hover:opacity-100 transition-opacity duration-500"></div>
          <h2 className="font-serif text-3xl text-white mb-8 relative z-10">Calculate Your Savings</h2>
          
          <div className="relative z-10 max-w-lg mx-auto mb-10">
            <div className="flex justify-between items-end mb-4">
              <label className="text-offwhite/80 font-medium text-sm">Monthly Volume</label>
              <div className="text-2xl font-mono text-teal">${volume.toLocaleString()}</div>
            </div>
            <input 
              type="range" min="5000" max="500000" step="5000" 
              value={volume} onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-2 bg-charcoal rounded-lg appearance-none cursor-pointer accent-teal"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10 mb-8">
            <div className="p-6 bg-charcoal/50 rounded-xl border border-white/5">
              <div className="text-sm text-offwhite/50 mb-2">Current Fees</div>
              <div className="text-xl font-mono text-white/50 line-through">${currentFees.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
            </div>
            <div className="p-6 bg-teal/10 rounded-xl border border-teal/30">
              <div className="text-sm text-teal mb-2">Keystone Edge Program</div>
              <div className="text-2xl font-mono text-teal font-medium">$0</div>
            </div>
          </div>
          
          <div className="relative z-10">
            <p className="text-lg text-white mb-6">That's <span className="font-mono text-teal font-medium">${monthlySavings.toLocaleString(undefined, {maximumFractionDigits:0})}</span> per month back in your pocket.</p>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-charcoal-dark border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <div className="mb-8">
            <QuoteIcon className="w-12 h-12 text-teal/20 mx-auto transform hover:scale-110 hover:text-teal/40 transition-all duration-500" />
          </div>
          <p className="font-serif text-2xl md:text-3xl text-white leading-relaxed mb-8 hover:text-white/90 transition-colors">
            "{data.testimonial.quote}"
          </p>
          <div className="inline-flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-teal/20 border border-teal/40 flex items-center justify-center text-teal font-serif text-xl group-hover:bg-teal group-hover:text-white transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(0,128,128,0.5)]">
              {data.testimonial.name.charAt(0)}
            </div>
            <div className="text-left">
              <div className="text-white font-medium group-hover:text-teal transition-colors">{data.testimonial.name}</div>
              <div className="text-sm text-offwhite/50 uppercase tracking-widest">{data.testimonial.business}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 text-center px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">Ready to upgrade your payments?</h2>
        <button onClick={() => onOpenModal(`Free ${data.title} Analysis`, <ContactForm />)} className="analysis-cta-btn inline-flex items-center justify-center px-8 py-4 bg-white text-charcoal font-medium rounded-sm transition-all duration-300 ease-custom hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          Get Your Free {data.title} Statement Analysis
        </button>
      </section>
    </>
  );
}

const QuoteIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);
