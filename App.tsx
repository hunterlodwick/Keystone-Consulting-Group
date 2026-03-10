import React, { useEffect, useState, useRef } from 'react';
import { 
  CreditCard, 
  MonitorSmartphone, 
  Smartphone, 
  Globe, 
  BarChart3, 
  Percent,
  ArrowUp,
  Menu,
  X,
  ShoppingBag,
  ShoppingCart,
  Stethoscope,
  Scissors,
  Wrench,
  Fuel,
  Gamepad2,
  HeartHandshake,
  CheckCircle,
  Briefcase,
  Bluetooth,
  Gift,
  Banknote,
  DollarSign,
  BarChart,
  Scale,
  Users,
  FileText,
  Shield,
  Mail,
  Star,
  Play
} from 'lucide-react';
import IndustryPageTemplate from './pages/IndustryPageTemplate';
import DashboardPage from './pages/DashboardPage';

// Custom Hooks for Animations
function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

function CountUp({ end, duration = 2000, prefix = "", suffix = "", decimals = 0 }: { end: number, duration?: number, prefix?: string, suffix?: string, decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            setCount(easeProgress * end);
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
}

function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return scrollY;
}

// Keystone Logo
const KeystoneLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,5 15,70 50,95" fill="#008080" opacity="0.9" />
    <polygon points="50,5 85,70 50,95" fill="#4A4A4A" opacity="0.9" />
    <polygon points="50,5 30,65 50,80" fill="#66B2B2" opacity="0.6" />
    <polygon points="50,5 70,65 50,80" fill="#2D2D2D" opacity="0.4" />
    <polygon points="15,70 30,65 50,80 50,95" fill="#008080" />
    <polygon points="85,70 70,65 50,80 50,95" fill="#3A3A3A" />
  </svg>
);

// Modal Component
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div
        className="relative w-full max-w-lg bg-charcoal-dark/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-10"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h3 className="text-xl font-serif text-white">{title}</h3>
          <button id="modal-close-btn" onClick={onClose} className="text-offwhite/50 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Industry Data & Splash Screen
const INDUSTRY_DATA = [
  { 
    id: "ecommerce",
    name: "E-commerce", 
    icon: Globe,
    title: "E-Commerce Payment Processing",
    description: "Seamless online checkout experiences. Integrate with Shopify, WooCommerce, and more. Accept payments globally with advanced fraud protection and recurring billing options."
  },
  { 
    id: "retail",
    name: "Retail", 
    icon: ShoppingBag,
    title: "Retail Payment Processing",
    description: "Tailored solutions for your unique storefront. Handle payments in multiple stores, manage inventory, and boost profits with our smart POS systems and zero-fee programs."
  },
  { 
    id: "food-restaurant",
    name: "Food & Restaurant", 
    icon: ShoppingCart,
    title: "Restaurant Payment Processing",
    description: "Speed up your lines and turn tables faster. From quick-service to fine dining, our POS solutions handle tips, tabs, tableside ordering, and kitchen routing."
  },
  { 
    id: "repair-services",
    name: "Repair Services", 
    icon: Wrench,
    title: "Repair Services Payment Processing",
    description: "Fast, secure payments for your shop or in the field. Send digital invoices, accept mobile payments, and keep your cash flow moving without the hassle."
  },
  { 
    id: "health",
    name: "Health", 
    icon: Stethoscope,
    title: "Healthcare & Medical Payments",
    description: "Secure, HIPAA-compliant billing and collections. Streamline patient payments with easy-to-use terminals, online portals, and flexible payment plans."
  },
  { 
    id: "beauty",
    name: "Beauty", 
    icon: Scissors,
    title: "Salon & Spa Payment Processing",
    description: "Manage appointments and payments seamlessly. Our tailored POS systems help you track inventory, manage staff commissions, and offer effortless checkout experiences."
  }
];

const SOLUTIONS_DATA = [
  { 
    id: "smart-terminals",
    title: "Smart Terminals", 
    icon: CreditCard, 
    desc: "Fast, secure, and reliable processing for all major cards.",
    longDesc: "Our credit card processing solutions are designed to be fast, secure, and incredibly reliable. We support all major credit cards and offer next-day funding to keep your cash flow healthy.",
    features: ["Next-day funding available", "PCI compliant security", "Transparent interchange-plus pricing", "24/7 dedicated support"]
  },
  { 
    id: "pos-systems",
    title: "POS Systems", 
    icon: MonitorSmartphone, 
    desc: "State-of-the-art point of sale hardware tailored to your business.",
    longDesc: "Upgrade your checkout experience with our modern POS systems. Whether you run a restaurant, retail store, or service business, we have hardware that fits your specific needs.",
    features: ["Inventory management", "Employee tracking", "Customer loyalty programs", "Sleek, modern hardware"]
  },
  { 
    id: "mobile-payments",
    title: "Mobile Payments", 
    icon: Smartphone, 
    desc: "Take your business anywhere with our mobile solutions.",
    longDesc: "Never miss a sale. Our mobile payment solutions allow you to accept payments securely from your smartphone or tablet, perfect for food trucks, pop-up shops, and home services.",
    features: ["iOS and Android compatible", "Bluetooth card readers", "Digital receipts", "Offline mode support"]
  },
  { 
    id: "ecommerce",
    title: "E-Commerce", 
    icon: Globe, 
    desc: "Seamless e-commerce integration for your digital storefront.",
    longDesc: "Expand your business online with our secure e-commerce gateways. We integrate seamlessly with popular platforms like Shopify, WooCommerce, and Magento.",
    features: ["Fraud protection suite", "Recurring billing options", "Developer-friendly APIs", "Hosted payment pages"]
  },
  { 
    id: "cash-discount",
    title: "The Edge Program", 
    icon: Percent, 
    desc: "Offset your processing fees and keep more of your revenue.",
    large: true,
    longDesc: "Keep 100% of your hard-earned revenue. Our fully compliant The Edge Program programs pass the cost of processing to customers who choose to pay with credit cards.",
    features: ["Fully compliant with card brand rules", "Automated terminal programming", "Free signage provided", "Save up to 100% on fees"]
  },
  { 
    id: "gift-loyalty",
    title: "Gift & Loyalty", 
    icon: Gift, 
    desc: "Keep customers coming back with custom gift cards and rewards.",
    longDesc: "Boost customer retention and increase average ticket sizes with our integrated gift card and loyalty programs. Easy to set up and manage directly from your POS.",
    features: ["Custom branded physical cards", "Digital e-gift cards", "Points-based loyalty", "Automated reward tracking"]
  },
];

const FINANCE_DATA = [
  {
    id: "pricing",
    title: "Pricing",
    icon: DollarSign,
    longDesc: "We offer transparent, competitive pricing tailored to your business volume and needs. No hidden fees, no surprises.",
    features: ["Transparent fee structure", "No long-term contracts", "Free cost comparison", "Dedicated account manager"],
    buttonText: "Request Pricing"
  },
  {
    id: "custom-pricing",
    title: "Custom Pricing",
    icon: Briefcase,
    longDesc: "High-volume businesses require specialized rates. Our custom pricing plans are designed to maximize your savings based on your specific processing history.",
    features: ["Volume discounts", "B2B Level 2 & 3 processing", "Custom interchange optimization", "Dedicated rate reviews"],
    buttonText: "Get a Custom Quote"
  },
  {
    id: "interchange-plus",
    title: "Interchange Plus",
    icon: BarChart,
    longDesc: "The most transparent pricing model available. You pay exactly what the card networks charge, plus a small, fixed markup.",
    features: ["True cost transparency", "Lower overall costs", "Detailed monthly statements", "Pass-through savings"],
    buttonText: "Learn More"
  },
  {
    id: "dual-pricing",
    title: "The Edge Program",
    icon: Scale,
    longDesc: "Offer your customers a choice. Display both a cash price and a card price, allowing you to offset processing fees automatically.",
    features: ["Fully compliant with card brands", "Automated terminal calculation", "Clear customer receipts", "Keep 100% of your revenue"],
    buttonText: "Start Saving"
  },
  {
    id: "simplified-pricing",
    title: "Simplified Pricing",
    icon: CheckCircle,
    longDesc: "A flat, predictable rate for every transaction. Perfect for businesses that want easy-to-understand statements and consistent costs.",
    features: ["One flat rate for all cards", "No statement fees", "No PCI compliance fees", "Easy reconciliation"],
    buttonText: "Get Simplified Pricing"
  }
];

const RESOURCES_DATA = [
  {
    id: "about-us",
    title: "About Us",
    icon: Users,
    longDesc: "Keystone Consulting Group is your local Utah partner for modern payment solutions. We believe in transparency, local support, and helping businesses thrive. Our team of experts is dedicated to finding the perfect fit for your unique business needs.",
    features: ["Local Utah support team", "Years of industry experience", "Client-first approach", "Innovative hardware solutions"],
    hideButton: true
  },
  {
    id: "terms-conditions",
    title: "Terms & Conditions",
    icon: FileText,
    longDesc: "Our terms and conditions outline the rules and regulations for the use of Keystone Consulting Group's services and website. By accessing this website we assume you accept these terms and conditions. Do not continue to use Keystone Consulting Group if you do not agree to take all of the terms and conditions stated on this page.",
    features: [],
    hideButton: true
  },
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    icon: Shield,
    longDesc: "We take your privacy seriously. Our privacy policy explains how we collect, use, and protect your personal and business information. We only retain collected information for as long as necessary to provide you with your requested service.",
    features: [],
    hideButton: true
  }
];

const IndustrySplash = ({ industry, onOpenModal, onClose }: { industry: any, onOpenModal: (title: string, content: React.ReactNode) => void, onClose: () => void }) => {
  if (!industry) return null;
  
  return (
    <div
      className="fixed inset-0 z-[100] bg-charcoal overflow-y-auto"
    >
      <div className="sticky top-0 z-50 bg-charcoal/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <KeystoneLogo className="w-8 h-8" />
          <span className="font-serif text-lg text-white">Keystone Consulting Group</span>
        </div>
        <button onClick={onClose} className="text-white/50 hover:text-white flex items-center gap-2 transition-colors">
          <span className="text-sm font-medium uppercase tracking-wider">Close</span>
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/10 border border-teal/20 text-teal text-xs font-medium uppercase tracking-wider mb-6">
              <industry.icon className="w-4 h-4" />
              {industry.name}
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-white mb-6 leading-tight">
              {industry.title}
            </h1>
            <p className="text-offwhite/70 text-lg font-light leading-relaxed mb-8">
              {industry.description}
            </p>
            <button 
              onClick={() => onOpenModal("Book a Call", <ContactForm />)}
              className="inline-flex items-center justify-center px-8 py-4 bg-teal text-white font-medium rounded-sm transition-all duration-300 ease-custom hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,128,128,0.4)]"
            >
              Book a Call
            </button>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 bg-slate-dark/40 backdrop-blur-md flex items-center justify-center group shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_0_50px_rgba(0,128,128,0.15)] transition-shadow duration-500">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,128,128,0.2)_0%,transparent_70%)] opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
             <industry.icon className="w-32 h-32 text-teal/20 group-hover:scale-110 group-hover:text-teal/30 transition-all duration-700" strokeWidth={1} />
          </div>
        </div>
      </div>

      <div className="bg-charcoal-dark py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Comprehensive Payment Solutions</h2>
            <p className="text-offwhite/70 font-light max-w-2xl mx-auto">Everything your {industry.name.toLowerCase()} business needs to thrive.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Payment Terminals", desc: "Countertop & wireless terminals accepting all major cards and Apple Pay.", icon: MonitorSmartphone },
              { title: "Online Payments", desc: "Virtual terminal setup and seamless e-commerce integrations.", icon: Globe },
              { title: "POS Systems", desc: "Full point-of-sale setups with cash drawers and printer connectivity.", icon: CreditCard },
              { title: "Mobile Payments", desc: "Bluetooth readers for simple, on-the-go transactions anywhere.", icon: Smartphone }
            ].map((feat, i) => (
              <div key={i} className="bg-charcoal/60 backdrop-blur-md p-8 rounded-2xl border border-white/5 hover:border-teal/30 hover:bg-charcoal/80 transition-all duration-300 shadow-inner hover:shadow-[0_0_20px_rgba(0,128,128,0.15)] group">
                <feat.icon className="w-8 h-8 text-teal mb-6 group-hover:scale-125 group-hover:-translate-y-1 transition-all duration-300" strokeWidth={1.5} />
                <h3 className="text-xl text-white font-medium mb-3 group-hover:text-teal transition-colors">{feat.title}</h3>
                <p className="text-offwhite/60 text-sm font-light leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="py-24 text-center px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">Ready to upgrade your {industry.name.toLowerCase()} payments?</h2>
        <button 
          onClick={() => onOpenModal("Get a Free Statement Analysis", <StatementAnalysisForm />)}
          className="inline-flex items-center justify-center px-8 py-4 bg-white text-charcoal font-medium rounded-sm transition-all duration-300 ease-custom hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          Get a Free Statement Analysis
        </button>
      </div>
    </div>
  );
};

// Forms
// ContactForm component to be exported
export const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      access_key: (import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_WEB3FORMS_KEY",
      subject: "New Contact Request - Keystone Consulting",
      name: `${formData.get('firstName')} ${formData.get('lastName')}`,
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company') || 'Not provided',
      message: formData.get('message') || 'No form message provided'
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      if (result.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-teal" />
        </div>
        <h3 className="text-xl font-serif text-white mb-2">Request Received</h3>
        <p className="text-offwhite/70">Thank you for reaching out. We'll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-offwhite/70 mb-1">First Name</label>
          <input name="firstName" type="text" className="w-full bg-charcoal border border-white/10 rounded-sm px-4 py-2 text-white focus:border-teal outline-none transition-colors" required />
        </div>
        <div>
          <label className="block text-sm text-offwhite/70 mb-1">Last Name</label>
          <input name="lastName" type="text" className="w-full bg-charcoal border border-white/10 rounded-sm px-4 py-2 text-white focus:border-teal outline-none transition-colors" required />
        </div>
      </div>
      <div>
        <label className="block text-sm text-offwhite/70 mb-1">Email</label>
        <input name="email" type="email" className="w-full bg-charcoal border border-white/10 rounded-sm px-4 py-2 text-white focus:border-teal outline-none transition-colors" required />
      </div>
      <div>
        <label className="block text-sm text-offwhite/70 mb-1">Phone</label>
        <input name="phone" type="tel" className="w-full bg-charcoal border border-white/10 rounded-sm px-4 py-2 text-white focus:border-teal outline-none transition-colors" required />
      </div>
      <button type="submit" disabled={status === 'loading'} className="w-full bg-teal text-white py-3 rounded-sm mt-4 hover:bg-teal-soft transition-colors font-medium tracking-wide disabled:opacity-50">
        {status === 'loading' ? 'Submitting...' : 'Submit Request'}
      </button>
      {status === 'error' && <p className="text-red-400 text-sm mt-2">There was an error submitting your request. Please try again.</p>}
    </form>
  );
};

const StatementAnalysisForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      access_key: (import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_WEB3FORMS_KEY",
      subject: "New Statement Analysis Request - Keystone Consulting",
      name: formData.get('businessName'),
      email: formData.get('email'),
      phone: formData.get('phone') || 'Not provided',
      volume: formData.get('volume') || 'Not provided',
      message: `Processing Volume: $${formData.get('volume') || 'Not provided'} | Phone: ${formData.get('phone') || 'Not provided'}`
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      if (result.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-teal" />
        </div>
        <h3 className="text-xl font-serif text-white mb-2">Analysis Requested</h3>
        <p className="text-offwhite/70">Thank you. Please check your email for instructions on how to securely upload your statement.</p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <p className="text-sm text-offwhite/70 mb-4 leading-relaxed">Request a free statement analysis and we'll show you exactly how much you can save with our rate saving guarantee.</p>
      <div>
        <label className="block text-sm text-offwhite/70 mb-1">Business Name</label>
        <input name="businessName" type="text" className="w-full bg-charcoal border border-white/10 rounded-sm px-4 py-2 text-white focus:border-teal outline-none transition-colors" required />
      </div>
      <div>
        <label className="block text-sm text-offwhite/70 mb-1">Email</label>
        <input name="email" type="email" className="w-full bg-charcoal border border-white/10 rounded-sm px-4 py-2 text-white focus:border-teal outline-none transition-colors" required />
      </div>
      <button type="submit" disabled={status === 'loading'} className="w-full bg-teal text-white py-3 rounded-sm mt-4 hover:bg-teal-soft transition-colors font-medium tracking-wide disabled:opacity-50">
        {status === 'loading' ? 'Submitting...' : 'Request Free Analysis'}
      </button>
      {status === 'error' && <p className="text-red-400 text-sm mt-2">There was an error submitting your request. Please try again.</p>}
    </form>
  );
};

const ServiceDetails = ({ service, onOpenModal }: { service: any, onOpenModal?: (title: string, content: React.ReactNode) => void }) => (
  <div>
    <div className="flex items-center gap-4 mb-6">
      <div className="p-3 bg-teal/10 rounded-full">
        <service.icon className="w-8 h-8 text-teal" strokeWidth={1.5} />
      </div>
      <h3 className="text-2xl font-serif text-white">{service.title}</h3>
    </div>
    <p className="text-offwhite/80 leading-relaxed mb-6 font-light">{service.longDesc}</p>
    {service.features && service.features.length > 0 && (
      <ul className="space-y-3 mb-8">
        {service.features.map((feat: string, i: number) => (
          <li key={i} className="flex items-start gap-3 text-sm text-offwhite/70">
            <div className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 flex-shrink-0" />
            {feat}
          </li>
        ))}
      </ul>
    )}
    {!service.hideButton && (
      <button 
        onClick={() => {
          if (onOpenModal) {
            onOpenModal("Contact Us", <ContactForm />);
          } else {
            document.getElementById('modal-close-btn')?.click();
            setTimeout(() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        }}
        className="w-full bg-teal text-white py-3 rounded-sm hover:bg-teal-soft transition-colors font-medium tracking-wide"
      >
        {service.buttonText || `Get Started with ${service.title}`}
      </button>
    )}
  </div>
);


// Header
const Header = ({ onOpenModal }: { onOpenModal: (title: string, content: React.ReactNode) => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const scrollY = useScrollPosition();

  const isScrolled = scrollY > 80;
  
  const backgroundColor = isScrolled ? 'rgba(45, 45, 45, 0.8)' : 'rgba(45, 45, 45, 0)';
  const backdropFilter = isScrolled ? 'blur(12px)' : 'blur(0px)';
  const paddingY = isScrolled ? '1rem' : '1.5rem';
  const boxShadow = isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none';
  const borderColor = isScrolled ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0)';

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
      style={{ 
        backgroundColor, 
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
        paddingTop: paddingY, 
        paddingBottom: paddingY, 
        boxShadow,
        borderColor
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <KeystoneLogo className="w-8 h-8" />
          <span className="font-serif text-lg md:text-xl font-medium tracking-wide text-white">Keystone Consulting Group</span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8" onMouseLeave={() => setOpenDropdown(null)}>
          <div className="relative group">
            <button 
              onClick={() => setOpenDropdown(openDropdown === 'industries' ? null : 'industries')}
              className="text-offwhite/90 group-hover:text-white font-medium text-sm tracking-wide flex items-center gap-1 py-2"
            >
              Industries <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 w-[400px] ${openDropdown === 'industries' ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover:opacity-100 md:group-hover:visible'}`}>
              <div className="bg-charcoal-dark border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 grid grid-cols-2 gap-x-6 gap-y-4 relative overflow-hidden backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                {[
                  { name: "Restaurants", path: "/restaurants" },
                  { name: "Grocery", path: "/grocery" },
                  { name: "Healthcare", path: "/healthcare" },
                  { name: "E-Commerce", path: "/ecommerce" },
                  { name: "Salons & Spas", path: "/salons" },
                  { name: "Auto Repair", path: "/auto-repair" },
                  { name: "Gas Stations", path: "/gas-stations" },
                  { name: "High-Risk", path: "/high-risk" },
                  { name: "Nonprofits", path: "/nonprofits" },
                  { name: "B2B Services", path: "/b2b" }
                ].map((ind, i) => (
                  <a key={i} href={ind.path} className="text-sm text-offwhite/70 hover:text-white transition-colors flex items-center gap-2 group/link relative z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal/30 group-hover/link:bg-teal transition-colors"></div>
                    {ind.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="relative group">
            <button 
              onClick={() => setOpenDropdown(openDropdown === 'services' ? null : 'services')}
              className="text-offwhite/90 group-hover:text-white font-medium text-sm tracking-wide flex items-center gap-1 py-2"
            >
              Services <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 w-[500px] ${openDropdown === 'services' ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover:opacity-100 md:group-hover:visible'}`}>
              <div className="bg-charcoal-dark border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4 grid grid-cols-2 gap-2 relative overflow-hidden backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                {SOLUTIONS_DATA.map((sol, i) => (
                  <button 
                    key={i} 
                    onClick={() => onOpenModal(sol.title, <ServiceDetails service={sol} onOpenModal={onOpenModal} />)} 
                    className="text-left group/link relative z-10 p-3 rounded-lg hover:bg-white/5 transition-colors flex items-start gap-3"
                  >
                    <div className="p-2 bg-teal/10 rounded-lg text-teal flex-shrink-0"><sol.icon className="w-5 h-5" /></div>
                    <div>
                      <div className="text-sm font-medium text-white mb-0.5 group-hover/link:text-teal transition-colors">{sol.title}</div>
                      <div className="text-xs text-offwhite/50 line-clamp-2">{sol.longDesc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          {['About', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`/#${item.toLowerCase()}`}
              className="relative text-offwhite/90 hover:text-white font-medium text-sm tracking-wide group py-2"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-teal transition-all duration-300 ease-custom group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <a href="tel:801-360-9156" className="text-teal font-medium text-sm tracking-wide hover:text-teal-soft transition-colors flex items-center gap-2">
            (801) 360-9156
          </a>
          <button 
            onClick={() => onOpenModal("Book a Call", <ContactForm />)}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-teal text-white text-sm font-medium rounded-sm transition-all duration-300 ease-custom hover:scale-[1.02] hover:tracking-[0.5px] hover:shadow-[0_0_20px_rgba(0,128,128,0.4)]">
            Book a Call
          </button>
        </div>

        <button 
          className="md:hidden text-white relative z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <>
        {mobileMenuOpen && (
          <div
            className="absolute top-full left-0 right-0 bg-charcoal-dark/95 backdrop-blur-xl border-b border-white/10 shadow-2xl md:hidden flex flex-col p-6 gap-6"
          >
            {['Services', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`/#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-offwhite/90 hover:text-white font-medium text-lg tracking-wide"
              >
                {item}
              </a>
            ))}
            <div className="h-px bg-white/10 w-full my-2"></div>
            <a href="tel:801-360-9156" className="text-teal font-medium text-lg tracking-wide hover:text-teal-soft transition-colors flex items-center gap-2">
              (801) 360-9156
            </a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal("Book a Call", <ContactForm />);
              }}
              className="w-full inline-flex items-center justify-center px-6 py-3 bg-teal text-white text-base font-medium rounded-sm transition-all duration-300">
              Book a Call
            </button>
          </div>
        )}
      </>
    </header>
  );
};

// Hero
const Hero = ({ onOpenModal }: { onOpenModal: (title: string, content: React.ReactNode) => void }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [miniVolume, setMiniVolume] = useState(50000);
  const scrollY = useScrollPosition();
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  const lineWidth = Math.min((scrollY / 300) * 100, 100) + '%';
  const miniSavings = miniVolume * 0.029; // Simple calculation for preview

  return (
    <section 
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-charcoal/20 backdrop-blur-sm"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
        
        {/* Left Side */}
        <div className="z-10 animate-on-scroll mt-12 lg:mt-0">
          {/* Subtle badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-offwhite/80 text-xs font-medium mb-6">
            <Shield className="w-3.5 h-3.5 text-teal" />
            No contracts. If we don't earn your business, we don't keep you.
          </div>
          
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-white mb-6">
            One Partner.<br/>
            <span className="block mt-2">Every Payment Solution.</span>
          </h1>
          <p className="text-offwhite/80 text-lg md:text-xl font-light max-w-xl mb-10 leading-relaxed">
            From countertop terminals to full POS systems and business intelligence — Keystone has you covered.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full sm:w-auto">
            <button 
              onClick={() => onOpenModal("Book a Call", <ContactForm />)}
              className="w-full sm:w-auto cta-button-pulse group relative inline-flex items-center justify-center px-8 py-4 bg-teal text-white font-medium rounded-sm transition-all duration-300 ease-custom hover:scale-[1.02] hover:tracking-[0.5px]">
              Book a Call
            </button>
            <button 
              onClick={() => onOpenModal("Get a Free Statement Analysis", <StatementAnalysisForm />)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-sm transition-all duration-300 ease-custom hover:bg-white/5 hover:border-white/40 hover:scale-[1.02]">
              Get a Free Statement Analysis
            </button>
          </div>
          
          {/* Trust bar */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-offwhite/70 font-light">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal" /> No Contracts
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal" /> Free Equipment
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal" /> 24/7 Support
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal" /> 30-100% Savings Guaranteed
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative h-[500px] lg:h-[600px] w-full hidden lg:block animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Soft teal gradient orb */}
            <div className="absolute w-[400px] h-[400px] bg-teal/20 rounded-full blur-[80px] mix-blend-screen"></div>
            
            {/* POS Terminal Mockup */}
            <div 
              className="hero-pos-float absolute z-20 w-72 h-56 bg-slate-dark/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col p-4 overflow-hidden transition-transform duration-300 ease-out"
              style={{ 
                transform: `rotate(-5deg) translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)`,
                top: '5%',
                right: '10%'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MonitorSmartphone className="w-5 h-5 text-teal" />
                  <span className="text-xs font-medium text-white/80">Smart POS</span>
                </div>
                <div className="w-8 h-4 bg-teal/20 rounded-full flex items-center px-1">
                  <div className="w-2 h-2 rounded-full bg-teal"></div>
                </div>
              </div>
              
              <div className="flex-1 bg-charcoal-dark rounded-lg border border-white/5 p-3 flex flex-col">
                <div className="text-center mb-2">
                  <div className="text-[10px] text-white/50 uppercase">Total Due</div>
                  <div className="text-2xl font-mono text-white"><CountUp end={42.50} prefix="$" decimals={2} /></div>
                </div>
                <div className="mt-auto space-y-2">
                  <div className="h-8 bg-teal text-white text-xs font-medium rounded flex items-center justify-center gap-2">
                    <CreditCard className="w-4 h-4" /> Tap, Insert, or Swipe
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 flex-1 bg-white/5 rounded flex items-center justify-center text-[10px] text-white/60">Cash</div>
                    <div className="h-8 flex-1 bg-white/5 rounded flex items-center justify-center text-[10px] text-white/60">Other</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mini Savings Calculator */}
            <div 
              className="absolute z-30 w-80 bg-charcoal-dark/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] left-0 bottom-24 p-5 flex flex-col transition-transform duration-300 ease-out"
              style={{ 
                transform: `rotate(2deg) translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)`
              }}
            >
              <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-teal" />
                  <span className="text-xs text-white/80 font-medium">Potential Savings</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] text-white/50 uppercase">Monthly Volume</span>
                  <span className="text-sm font-mono text-white">${miniVolume.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="10000" 
                  max="200000" 
                  step="5000" 
                  value={miniVolume} 
                  onChange={(e) => setMiniVolume(Number(e.target.value))}
                  className="w-full h-1.5 bg-charcoal rounded-lg appearance-none cursor-pointer accent-teal"
                />
              </div>
              
              <div className="bg-teal/10 rounded-lg p-3 border border-teal/20 flex flex-col items-center justify-center">
                <span className="text-xs text-teal mb-1">Estimated Monthly Savings</span>
                <span className="text-2xl font-mono text-white font-medium savings-number">+${miniSavings.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div 
        className="absolute bottom-0 left-0 h-[1px] bg-teal/30"
        style={{ width: lineWidth }}
      />
    </section>
  );
};// ProductGrid
const ProductGrid = ({ onOpenModal }: { onOpenModal: (title: string, content: React.ReactNode) => void }) => {
  return (
    <section id="services" className="py-32 relative bg-charcoal/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className="mb-16 animate-on-scroll"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Custom Solutions.</h2>
          <p className="text-offwhite/70 text-lg font-light max-w-2xl">Everything you need to accept payments, run your business, and grow your bottom line.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[200px] stagger-children">
          {SOLUTIONS_DATA.map((sol, idx) => (
            <div
              key={idx}
              onClick={() => onOpenModal(sol.title, <ServiceDetails service={sol} />)}
              className={`animate-on-scroll card-hover-effect group relative bg-slate-dark/40 backdrop-blur-md p-8 rounded-xl border border-white/5 flex flex-col justify-between cursor-pointer overflow-hidden ${
                sol.large ? 'md:col-span-2 lg:col-span-2 row-span-2' : 'row-span-1'
              }`}
            >
              {/* Subtle inner glow for glass effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="flex justify-between items-start relative z-10">
                <sol.icon className="w-8 h-8 text-teal transition-transform duration-300 ease-custom group-hover:rotate-3" strokeWidth={1} />
                
                {sol.id === 'cash-discount' && (
                  <div className="absolute right-0 top-0 flex flex-col items-end opacity-40 md:opacity-80 group-hover:opacity-100 transition-all duration-500 transform group-hover:-translate-y-2 scale-75 md:scale-100 origin-top-right">
                    <div className="bg-charcoal-dark/90 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-2 w-56 relative overflow-hidden">
                      {/* Receipt jagged edge effect */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjQiPjxwb2x5Z29uIHBvaW50cz0iMCwwIDQsNCA4LDAiIGZpbGw9IiMxRTElRTEiLz48L3N2Zz4=')] opacity-50"></div>
                      
                      <div className="text-xs text-white/50 uppercase mb-4 text-center tracking-widest border-b border-white/5 pb-3">Customer Receipt</div>
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between gap-4 text-sm">
                          <span className="text-white/70">Subtotal</span>
                          <span className="font-mono text-white/90">$100.00</span>
                        </div>
                        <div className="flex justify-between gap-4 text-sm bg-teal/10 -mx-3 px-3 py-1.5 rounded border border-teal/20">
                          <span className="text-teal font-medium">The Edge Program</span>
                          <span className="font-mono text-teal font-medium">-$3.99</span>
                        </div>
                      </div>
                      <div className="h-[1px] bg-white/10 w-full mb-3 border-dashed border-b border-white/20"></div>
                      <div className="flex justify-between gap-4 text-base font-medium mt-3">
                        <span className="text-white">Total</span>
                        <span className="font-mono text-white">$96.01</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative z-10 mt-8">
                <h3 className={`font-medium text-white mb-2 ${sol.large ? 'text-2xl' : 'text-xl'}`}>{sol.title}</h3>
                <p className="text-offwhite/60 text-sm font-light leading-relaxed">{sol.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works
const HowItWorks = ({ onOpenModal }: { onOpenModal: (title: string, content: React.ReactNode) => void }) => {
  const steps = [
    { num: "01", title: "Upload Your Statement", desc: "Send us your current processing statement — takes 30 seconds." },
    { num: "02", title: "Free Analysis", desc: "We break down your rates line by line and find every hidden fee." },
    { num: "03", title: "Custom Proposal", desc: "Receive a side-by-side comparison showing your exact savings." },
    { num: "04", title: "Seamless Setup", desc: "We handle everything — equipment, integration, and training. Zero downtime." },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-charcoal/40 backdrop-blur-sm border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-24 animate-on-scroll">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">How It Works</h2>
          <p className="text-offwhite/70 text-lg font-light max-w-2xl mx-auto">
            Start saving on your payment processing in four simple steps. We've streamlined the switch to be completely painless.
          </p>
        </div>

        <div className="relative mb-20 animate-on-scroll">
          {/* Connector Line (Desktop only) */}
          <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-white/10">
            <div className="absolute top-0 left-0 h-full bg-teal opacity-50 w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative">
                <div className="w-14 h-14 rounded-full bg-charcoal-dark border border-teal text-teal flex items-center justify-center font-mono text-xl mb-6 shadow-[0_0_15px_rgba(0,128,128,0.2)]">
                  {step.num}
                </div>
                <h3 className="text-xl text-white font-medium mb-3">{step.title}</h3>
                <p className="text-offwhite/60 text-sm font-light leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center animate-on-scroll flex flex-col items-center">
          <button 
            onClick={() => onOpenModal("Get a Free Statement Analysis", <StatementAnalysisForm />)}
            className="inline-flex items-center justify-center px-10 py-5 bg-teal text-white text-lg font-medium rounded-sm transition-all duration-300 ease-custom hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,128,128,0.4)] mb-4"
          >
            Start Your Free Analysis — It Takes 30 Seconds →
          </button>
          <p className="text-xs text-offwhite/40 font-light">
            No contracts. No obligations. If we can't save you money, we'll tell you.
          </p>
        </div>
      </div>
    </section>
  );
};

// Why Choose Keystone
const WhyChooseUs = () => {
  const reasons = [
    { num: "01", title: "Zero Contracts", desc: "If we don't earn your business, we don't keep you. It's that simple." },
    { num: "02", title: "No Hidden Fees", desc: "Transparent pricing models so you always know what you're paying." },
    { num: "03", title: "Free Equipment Programs", desc: "Get the hardware you need without the upfront capital investment." },
    { num: "04", title: "Dedicated Support", desc: "Real humans, ready to help you 24/7. No endless phone trees." },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-charcoal-dark/50 backdrop-blur-sm">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,128,128,0.05)_0%,transparent_70%)]"></div>
      
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20 animate-on-scroll">
          <h2 className="font-serif text-4xl md:text-5xl text-white">Why Choose Keystone</h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[28px] md:left-[38px] top-0 bottom-0 w-[1px] bg-white/10 hidden sm:block">
            <div className="absolute top-0 left-0 w-full bg-teal h-full opacity-50" />
          </div>

          <div className="space-y-16 stagger-children">
            {reasons.map((reason, idx) => (
              <div
                key={idx}
                className="animate-on-scroll flex flex-col sm:flex-row items-start gap-6 sm:gap-12"
              >
                <div className="font-mono text-4xl md:text-5xl text-teal font-light bg-charcoal-dark/50 sm:bg-transparent py-2 sm:py-0 z-10">
                  {reason.num}
                </div>
                <div className="pt-2">
                  <h3 className="text-2xl text-white font-medium mb-3">{reason.title}</h3>
                  <p className="text-offwhite/70 text-lg font-light">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Pricing
const Pricing = ({ onOpenModal }: { onOpenModal: (title: string, content: React.ReactNode) => void }) => {
  return (
    <section className="py-32 relative bg-charcoal backdrop-blur-sm border-t border-white/5" id="pricing">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20 animate-on-scroll">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Fair, Transparent Pricing for Every Business</h2>
          <p className="text-offwhite/70 text-lg font-light max-w-2xl mx-auto">
            Choose the model that fits your business. No hidden fees, no long-term contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* The Edge Program Card */}
          <div className="relative bg-charcoal-dark border border-teal/40 rounded-2xl p-10 shadow-[0_0_30px_rgba(0,128,128,0.15)] flex flex-col transform transition-transform duration-300 hover:-translate-y-2">
            <div className="absolute top-0 right-10 translate-y-[-50%] bg-teal text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full">
              Most Popular
            </div>
            <div className="mb-8">
              <h3 className="text-3xl font-serif text-white mb-3">The Edge Program</h3>
              <p className="text-offwhite/60 font-light h-12">Eliminate your processing fees entirely.</p>
            </div>
            <div className="mb-8 flex items-end gap-3">
              <div className="text-5xl font-mono text-teal font-medium">$0<span className="text-2xl text-offwhite/40">/mo</span></div>
              <div className="text-sm font-medium text-teal px-3 py-1 bg-teal/10 rounded-full border border-teal/20 mb-1">+ 0% Processing</div>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              {[
                "Keep 100% of your revenue", 
                "Free Smart POS or Terminal", 
                "No contracts or hidden fees", 
                "Next-day funding included"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                  <span className="text-offwhite/80 font-light">{feature}</span>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => onOpenModal("See if you qualify", <ContactForm />)}
              className="w-full py-4 bg-teal text-white font-medium rounded transition-all duration-300 hover:bg-teal-soft hover:shadow-[0_0_20px_rgba(0,128,128,0.3)]"
            >
              See if you qualify
            </button>
          </div>

          {/* Interchange Plus Card */}
          <div className="bg-slate-dark/40 border border-white/10 rounded-2xl p-10 flex flex-col transform transition-transform duration-300 hover:-translate-y-2">
            <div className="mb-8">
              <h3 className="text-3xl font-serif text-white mb-3">Interchange Plus</h3>
              <p className="text-offwhite/60 font-light h-12">True wholesale rates for high-volume merchants.</p>
            </div>
            <div className="mb-8 flex flex-col gap-1">
              <div className="text-4xl font-mono text-white">Direct Cost</div>
              <div className="text-lg text-offwhite/50 font-light">+ Small markup</div>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              {[
                "Transparent line-item billing", 
                "Dedicated account manager", 
                "Custom hardware solutions", 
                "B2B Level 2/3 optimization"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-offwhite/40 flex-shrink-0 mt-0.5" />
                  <span className="text-offwhite/80 font-light">{feature}</span>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => onOpenModal("Get a Custom Quote", <ContactForm />)}
              className="w-full py-4 bg-transparent border border-white/20 text-white font-medium rounded transition-all duration-300 hover:bg-white/5 hover:border-white/40"
            >
              Get a Custom Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Mobile-Optimized ROI Calculator
const ROICalculator = () => {
  const [volume, setVolume] = useState(50000);
  const currentRate = 0.029; // 2.9%
  const keystoneRate = 0.00; // The Edge Program = 0%
  
  const currentFees = volume * currentRate;
  const keystoneFees = volume * keystoneRate;
  
  const monthlySavings = currentFees - keystoneFees;
  const annualSavings = monthlySavings * 12;

  // Touch tracking for better mobile slider
  const handleTouchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <section className="py-24 bg-charcoal-dark border-t border-white/5 relative overflow-hidden" id="calculator">
      {/* Background glow behind calculator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-on-scroll">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-4">Calculate Your Edge</h2>
          <p className="text-offwhite/70 text-base sm:text-lg font-light max-w-xl mx-auto">
            Drag the slider to your monthly processing volume and instantly see how much revenue The Edge Program returns to your bottom line.
          </p>
        </div>

        <div className="animate-on-scroll bg-charcoal/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal/10 to-transparent opacity-20 pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Slider Section */}
            <div className="mb-12 sm:mb-16 bg-slate-dark/30 rounded-2xl p-5 sm:p-8 border border-white/5">
              <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-8 gap-4 sm:gap-0">
                <label className="text-offwhite/80 font-medium text-sm sm:text-base uppercase tracking-wider">Monthly Processing Volume</label>
                <div className="text-4xl sm:text-5xl font-mono text-white savings-number">${volume.toLocaleString()}</div>
              </div>
              
              <div className="relative h-16 flex items-center mb-2">
                <input 
                  type="range" 
                  min="10000" 
                  max="500000" 
                  step="5000" 
                  value={volume} 
                  onChange={handleTouchChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                
                {/* Custom giant slider track */}
                <div className="w-full h-3 sm:h-4 bg-charcoal-dark rounded-full relative overflow-hidden border border-white/10 pointer-events-none">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-soft to-teal"
                    style={{ width: `${((volume - 10000) / 490000) * 100}%` }}
                  ></div>
                </div>
                
                {/* Custom Slider Thumb (Visual) */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-[0_0_15px_rgba(0,128,128,0.5)] border-4 border-teal pointer-events-none flex items-center justify-center transition-transform"
                  style={{ left: `calc(${((volume - 10000) / 490000) * 100}% - ${(((volume - 10000) / 490000) * 1) * 32}px)` }} // Approximate centering
                >
                  <div className="w-2 h-2 rounded-full bg-teal"></div>
                </div>
              </div>
              
              <div className="flex justify-between text-xs sm:text-sm text-offwhite/40 font-mono">
                <span>$10k</span>
                <span>$500k+</span>
              </div>
            </div>

            {/* Results Section */}
            <div className="flex flex-col gap-6 sm:gap-8 border-t border-white/10 pt-8 sm:pt-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                <div className="bg-charcoal-dark/50 p-6 rounded-2xl border border-white/5 flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="text-offwhite/50 text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-3">Current Est. Fees (2.9%)</div>
                  <div className="text-2xl sm:text-3xl font-mono text-white/50 line-through">${currentFees.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}<span className="text-sm">/mo</span></div>
                </div>
                <div className="bg-teal/5 p-6 rounded-2xl border border-teal/20 flex flex-col items-center sm:items-start text-center sm:text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-teal/20 blur-xl"></div>
                  <div className="relative z-10 w-full">
                    <div className="text-teal text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-3 font-medium">The Edge Program</div>
                    <div className="text-3xl sm:text-4xl font-mono text-teal font-medium">$0<span className="text-sm">/mo</span></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-charcoal-dark rounded-3xl p-8 sm:p-12 border border-teal/30 text-center relative shadow-[0_0_50px_rgba(0,128,128,0.15)] glow-container mt-4">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,128,128,0.1)_0%,transparent_60%)]"></div>
                <div className="relative z-10">
                  <div className="text-offwhite/80 text-sm sm:text-base font-medium uppercase tracking-[0.2em] mb-4 sm:mb-6">Estimated Annual Savings</div>
                  <div className="text-5xl sm:text-7xl md:text-8xl font-mono text-white font-bold leading-none tracking-tighter savings-number drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    ${annualSavings.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 sm:mt-10 text-center px-4">
              <p className="text-xs sm:text-sm text-offwhite/40 leading-relaxed max-w-2xl mx-auto">
                *Estimates based on industry average blended rate of 2.9%. Activating The Edge Program eliminates all processing volume fees, capping your cost at $0/mo for processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Industries
const Industries = ({ onOpenSplash }: { onOpenSplash: (industryId: string) => void }) => {
  const industries = [
    { name: "Retail & Restaurants", icon: ShoppingBag, id: "restaurants" },
    { name: "Grocery & Supermarkets", icon: ShoppingCart, id: "grocery" },
    { name: "Healthcare & Medical", icon: Stethoscope, id: "healthcare" },
    { name: "E-Commerce", icon: Globe, id: "ecommerce" },
    { name: "Salons & Spas", icon: Scissors, id: "salons" },
    { name: "Auto Repair", icon: Wrench, id: "auto-repair" },
    { name: "Gas Stations", icon: Fuel, id: "gas-stations" },
    { name: "High-Risk (CBD, Vape)", icon: Gamepad2, id: "high-risk" },
    { name: "Nonprofits & Churches", icon: HeartHandshake, id: "nonprofits" },
    { name: "B2B & Professional", icon: Briefcase, id: "b2b" },
  ];

  return (
    <section className="py-32 relative bg-charcoal/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Custom Solutions for Every Industry</h2>
          <p className="text-offwhite/70 text-lg font-light max-w-2xl mx-auto">No matter your business type, we have the hardware, software, and expertise to streamline your payments.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 stagger-children">
          {industries.map((ind, idx) => (
            <a
              key={idx}
              href={`/${ind.id}`}
              className="animate-on-scroll card-hover-effect flex items-center gap-3 bg-slate-dark/40 backdrop-blur-md border border-white/10 px-6 py-4 rounded-full hover:border-teal/50 hover:bg-slate-dark/60 hover:shadow-[0_0_20px_rgba(0,128,128,0.15)] transition-all duration-300"
            >
              <ind.icon className="w-5 h-5 text-teal" strokeWidth={1.5} />
              <span className="text-offwhite/90 text-sm font-medium">{ind.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// Free Placement
const FreePlacement = ({ onOpenModal }: { onOpenModal: (title: string, content: React.ReactNode) => void }) => {
  const offers = [
    {
      title: "Free Bluetooth Card Readers",
      icon: Bluetooth,
      desc: "Accept payments on the go with our free Bluetooth card readers. Perfect for mobile professionals, offering NFC contactless payments with zero upfront hardware costs."
    },
    {
      title: "Free POS Systems & Hardware Credits",
      icon: Gift,
      desc: "Upgrade your business with secure, intuitive POS systems and receive up to $7,500 in hardware credits. Ideal for retail shops, grocery stores, and restaurants."
    },
    {
      title: "Grow With an ATM Machine",
      icon: Banknote,
      desc: "Drive foot traffic and keep 100% of surcharge fees. We handle placement, installation, maintenance, and processing for a hassle-free revenue boost."
    }
  ];

  return (
    <section className="py-32 relative bg-charcoal-dark/80 backdrop-blur-sm border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 stagger-children">
          {offers.map((offer, idx) => (
            <div
              key={idx}
              className="animate-on-scroll card-hover-effect bg-slate-dark/30 backdrop-blur-md border border-white/5 p-10 rounded-2xl hover:bg-slate-dark/50 hover:border-teal/30 transition-all duration-300 flex flex-col relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-teal/10 flex items-center justify-center mb-6 border border-teal/20 group-hover:scale-110 transition-transform duration-500">
                  <offer.icon className="w-7 h-7 text-teal" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-serif text-white mb-4">{offer.title}</h3>
                <p className="text-offwhite/70 font-light leading-relaxed mb-8 flex-1">{offer.desc}</p>
                <button 
                  onClick={() => onOpenModal("Claim Offer", <ContactForm />)}
                  className="text-teal font-medium text-sm tracking-wide hover:text-teal-soft transition-colors flex items-center gap-2 self-start"
                >
                  Learn More <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials
const Testimonials = () => {
  const testimonials = [
    {
      quote: "We eliminated $1,200/mo in processing fees. The Edge Program is exactly as advertised. I wish I found Keystone three years ago.",
      name: "Marcus T.",
      title: "Owner",
      business: "Rudy's Bar & Grill",
      stars: 5,
    },
    {
      quote: "Our previous processor hit us with hidden rate hikes every 6 months. Keystone has been completely transparent from day one.",
      name: "Sarah Jenkins",
      title: "VP of Operations",
      business: "NextLevel E-Commerce",
      stars: 5,
    },
    {
      quote: "We process over $250k a month. The transition was seamless, no downtime, and the savings paid for our new kitchen equipment.",
      name: "David Chen",
      title: "Founder",
      business: "Chen Family Supermarkets",
      stars: 5,
    },
    {
      quote: "As a high-risk merchant, finding a reliable processor was a nightmare. Keystone got us approved in 48 hours and we've had zero holds.",
      name: "Elena M.",
      title: "CEO",
      business: "Apex Botanicals",
      stars: 5,
    }
  ];

  return (
    <section className="py-32 relative bg-charcoal-dark backdrop-blur-sm border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20 animate-on-scroll">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Don't Just Take Our Word For It</h2>
          <p className="text-offwhite/70 text-lg font-light max-w-2xl mx-auto">
            Hundreds of businesses trust Keystone Consulting Group to manage their payment processing. Here's what they have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-wrap justify-center stagger-children">
          {/* Video Placeholder */}
          <div className="animate-on-scroll col-span-1 md:col-span-2 lg:col-span-2 relative bg-slate-dark/40 border border-white/10 rounded-2xl overflow-hidden aspect-video md:aspect-auto md:h-[400px] flex items-center justify-center group cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/20 transition-colors z-10 duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1543165365-07232ed12fad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="UGC Customer Success Story" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"
            />
            <div className="relative z-20 flex flex-col items-center">
              <div className="w-20 h-20 bg-teal/90 rounded-full flex items-center justify-center text-white mb-6 shadow-[0_0_30px_rgba(0,128,128,0.5)] group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 ml-1" fill="currentColor" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-white font-medium text-center px-4 md:px-12 leading-tight">See how The Edge Program changed the game for Bella's Cafe</h3>
            </div>
          </div>

          {/* Testimonial Cards */}
          {testimonials.map((t, i) => (
            <div key={i} className="animate-on-scroll bg-slate-dark/30 border border-white/5 rounded-2xl p-8 flex flex-col hover:bg-slate-dark/50 transition-colors hover:border-teal/20 shadow-sm relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-teal/10 transition-colors"></div>
              <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(t.stars)].map((_, idx) => (
                  <Star key={idx} fill="currentColor" className="w-4 h-4" />
                ))}
              </div>
              <p className="text-offwhite/80 font-light leading-relaxed mb-8 flex-1 relative z-10">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-auto relative z-10">
                <div className="w-10 h-10 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center text-teal font-serif text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{t.name}</div>
                  <div className="text-offwhite/40 text-xs">{t.title}, {t.business}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Integration Ecosystem
const IntegrationEcosystem = () => {
  const integrations = [
    "HotSauce", "GiveHub", "Ingenico", "Paradise POS", "PayTrace", "mynt", "NMI", "payanywhere", "KwickPOS", "Korona POS",
    "Visa", "Mastercard", "Clover", "Heartland", "Pax", "Dejavoo"
  ];
  
  return (
    <section className="py-24 border-y border-teal/10 bg-charcoal-dark/30 backdrop-blur-sm overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal-dark/10 to-transparent pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 text-center relative z-10 animate-on-scroll">
        <h3 className="font-serif text-2xl text-white mb-2">Seamless Integrations</h3>
        <p className="text-offwhite/60 text-sm font-light">Working with the tools and platforms you already trust.</p>
      </div>
      <div className="marquee-container">
        <div className="marquee-content">
          {[...integrations, ...integrations].map((logo, idx) => (
            <div 
              key={idx} 
              className="text-white/40 hover:text-white/80 transition-colors duration-300 font-serif text-2xl tracking-wider uppercase whitespace-nowrap px-8"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Team Section
const Team = ({ onOpenModal }: { onOpenModal: (title: string, content: React.ReactNode) => void }) => {
  return (
    <section id="about" className="py-32 relative overflow-hidden bg-charcoal/40 backdrop-blur-sm">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 rotate-12 pointer-events-none">
        <KeystoneLogo className="w-full h-full text-teal" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-24 animate-on-scroll">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">The Team Behind the Tech.</h2>
          <p className="text-offwhite/70 text-lg font-light max-w-2xl mx-auto">A boutique approach means you deal directly with the owners.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 stagger-children">
          {/* Seth */}
          <div className="animate-on-scroll card-hover-effect w-full max-w-sm bg-slate-dark/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="w-24 h-24 rounded-full bg-charcoal-dark/80 border border-white/10 mb-6 flex items-center justify-center shadow-inner relative z-10">
              <span className="font-serif text-3xl text-teal">SR</span>
            </div>
            <h3 className="text-2xl text-white font-serif mb-1">Seth Redford</h3>
            <p className="text-teal-soft text-sm uppercase tracking-widest mb-6">Owner</p>
            
            <div className="space-y-2 mb-8 text-offwhite/80 font-light">
              <p>(801) 360-9156</p>
              <p className="text-sm">Seth@keystoneconsultingg.com</p>
            </div>
            
            <button 
              onClick={() => onOpenModal("Book a Call with Seth", <ContactForm />)}
              className="mt-auto px-6 py-2 border border-teal text-teal hover:bg-teal hover:text-white transition-colors duration-300 rounded-sm text-sm tracking-wide">
              Book a Call
            </button>
          </div>

          {/* Hunter */}
          <div className="animate-on-scroll card-hover-effect w-full max-w-sm bg-slate-dark/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="w-24 h-24 rounded-full bg-charcoal-dark/80 border border-white/10 mb-6 flex items-center justify-center shadow-inner relative z-10">
              <span className="font-serif text-3xl text-teal">HL</span>
            </div>
            <h3 className="text-2xl text-white font-serif mb-1">Hunter Lodwick</h3>
            <p className="text-teal-soft text-sm uppercase tracking-widest mb-6">Owner</p>
            
            <div className="space-y-2 mb-8 text-offwhite/80 font-light">
              <p>(505) 506-6563</p>
              <p className="text-sm">hunter@keystoneconsultingg.com</p>
            </div>
            
            <button 
              onClick={() => onOpenModal("Book a Call with Hunter", <ContactForm />)}
              className="mt-auto px-6 py-2 border border-teal text-teal hover:bg-teal hover:text-white transition-colors duration-300 rounded-sm text-sm tracking-wide">
              Book a Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Rate Guarantee
const RateGuarantee = ({ onOpenModal }: { onOpenModal: (title: string, content: React.ReactNode) => void }) => {
  return (
    <section className="py-24 bg-teal/10 backdrop-blur-md border-y border-teal/20 relative overflow-hidden shadow-[0_0_50px_rgba(0,128,128,0.1)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,128,128,0.15)_0%,transparent_70%)]"></div>
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
        <div className="animate-on-scroll">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Rate Savings Guarantee</h2>
          <p className="text-xl text-offwhite/90 font-light mb-4">
            We save businesses <span className="text-teal font-medium">30% to 100%</span> of their current processing fees.
          </p>
          <p className="text-offwhite/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop overpaying for credit card processing. Let us prove it to you with a side-by-side comparison of your current rates versus what you could be paying with Keystone.
          </p>
          <button 
            onClick={() => onOpenModal('Free Statement Analysis', <StatementAnalysisForm />)}
            className="cta-button-pulse inline-flex items-center justify-center px-8 py-4 bg-white text-charcoal font-medium rounded-sm transition-all duration-300 ease-custom hover:scale-[1.02]">
            Get a Free Statement Analysis
          </button>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = ({ onOpenSplash, onOpenModal }: { onOpenSplash: (industryId: string) => void, onOpenModal: (title: string, content: React.ReactNode) => void }) => {
  const scrollY = useScrollPosition();
  const showTopBtn = scrollY > 500;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-charcoal-dark/90 backdrop-blur-md pt-24 pb-8 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-20">
          
          <div className="lg:col-span-2 lg:pr-8 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <KeystoneLogo className="w-8 h-8 flex-shrink-0" />
              <span className="font-serif text-lg md:text-xl font-medium tracking-wide text-white">Keystone Consulting Group</span>
            </div>
            <p className="text-offwhite/60 text-sm font-light leading-relaxed mb-8">
              Your Utah local consulting partner for all things payment solutions and hardware for modern businesses.
            </p>
            <ul className="space-y-3 text-sm text-offwhite/60 font-light mt-auto">
              <li>Seth: <a href="tel:801-360-9156" className="hover:text-teal transition-colors">(801) 360-9156</a></li>
              <li>Hunter: <a href="tel:505-506-6563" className="hover:text-teal transition-colors">(505) 506-6563</a></li>
              <li><a href="mailto:info@keystoneconsultingg.com" className="text-teal hover:text-teal-soft transition-colors">info@keystoneconsultingg.com</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Solutions</h4>
            <ul className="space-y-3 text-sm text-offwhite/60 font-light">
              {SOLUTIONS_DATA.map(sol => (
                <li key={sol.id}>
                  <button onClick={() => onOpenModal(sol.title, <ServiceDetails service={sol} onOpenModal={onOpenModal} />)} className="hover:text-teal transition-colors text-left">
                    {sol.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Industry</h4>
            <ul className="space-y-3 text-sm text-offwhite/60 font-light">
              {INDUSTRY_DATA.map(ind => (
                <li key={ind.id}>
                  <button onClick={() => onOpenSplash(ind.id)} className="hover:text-teal transition-colors text-left">
                    {ind.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Resources</h4>
            <ul className="space-y-3 text-sm text-offwhite/60 font-light">
              {RESOURCES_DATA.map(res => (
                <li key={res.id}>
                  <button onClick={() => onOpenModal(res.title, <ServiceDetails service={res} onOpenModal={onOpenModal} />)} className="hover:text-teal transition-colors text-left">
                    {res.title}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => onOpenModal("Contact Us", <ContactForm />)} className="hover:text-teal transition-colors text-left">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Finance</h4>
            <ul className="space-y-3 text-sm text-offwhite/60 font-light">
              {FINANCE_DATA.map(fin => (
                <li key={fin.id}>
                  <button onClick={() => onOpenModal(fin.title, <ServiceDetails service={fin} onOpenModal={onOpenModal} />)} className="hover:text-teal transition-colors text-left">
                    {fin.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-teal/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-offwhite/40 text-xs">
            &copy; {new Date().getFullYear()} Keystone Consulting Group LLC. All rights reserved.
          </p>
          <div className="flex gap-4 text-offwhite/40 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <>
        {showTopBtn && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-teal rounded-full flex items-center justify-center text-white shadow-lg hover:bg-teal-soft transition-colors z-50"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </>
    </footer>
  );
};

function MainLandingPage({ onOpenModal, onOpenSplash }: { onOpenModal: (title: string, content: React.ReactNode) => void, onOpenSplash: (industryId: string) => void }) {
  useScrollAnimation();

  return (
    <>
      <Hero onOpenModal={onOpenModal} />
      <Pricing onOpenModal={onOpenModal} />
      <ROICalculator />
      <RateGuarantee onOpenModal={onOpenModal} />
      <FreePlacement onOpenModal={onOpenModal} />
      <ProductGrid onOpenModal={onOpenModal} />
      <Industries onOpenSplash={onOpenSplash} />
      <HowItWorks onOpenModal={onOpenModal} />
      <WhyChooseUs />
      <Testimonials />
      <IntegrationEcosystem />
      <Team onOpenModal={onOpenModal} />
    </>
  );
}

// (Pages imported at top)

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const [modalState, setModalState] = useState<{ isOpen: boolean, title: string, content: React.ReactNode | null }>({
    isOpen: false,
    title: "",
    content: null
  });

  const [splashState, setSplashState] = useState<{ isOpen: boolean, industry: any | null }>({
    isOpen: false,
    industry: null
  });

  const handleOpenModal = (title: string, content: React.ReactNode) => {
    setModalState({ isOpen: true, title, content });
  };

  const handleCloseModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const handleOpenSplash = (industryId: string) => {
    const industry = INDUSTRY_DATA.find(ind => ind.id === industryId);
    if (industry) {
      setSplashState({ isOpen: true, industry });
      document.body.style.overflow = 'hidden';
    }
  };

  const handleCloseSplash = () => {
    setSplashState({ isOpen: false, industry: null });
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    // Listen for custom navigation events if needed
    window.addEventListener('popstate', handleLocationChange);
    
    // Basic interception of anchor links handling client-side routing
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // If click originated from within a modal overlay (not just a link), don't intercept unless it's a link
      const anchor = target.closest('a');
      
      if (anchor && anchor.href && anchor.href.startsWith(window.location.origin)) {
        // Find if this should just scroll current page
        const url = new URL(anchor.href);
        const isHashOnlyOnCurrentPage = url.pathname === window.location.pathname && url.hash;
        
        if (!isHashOnlyOnCurrentPage) {
          e.preventDefault();
          window.history.pushState({}, '', url.pathname + url.search + url.hash);
          setCurrentPath(url.pathname);
          
          if (url.hash) {
            setTimeout(() => {
              const el = document.querySelector(url.hash);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          } else {
            window.scrollTo(0, 0);
          }
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  const industryRoutes = [
    '/restaurants', '/grocery', '/healthcare', '/ecommerce', 
    '/salons', '/auto-repair', '/gas-stations', '/high-risk', 
    '/nonprofits', '/b2b'
  ];

  if (currentPath === '/dashboard') {
    return <DashboardPage 
      onNavigate={(path) => {
        window.history.pushState({}, '', path);
        setCurrentPath(path);
        window.scrollTo(0, 0);
      }} 
      onOpenModal={handleOpenModal} 
    />;
  }

  return (
    <div className="min-h-screen bg-charcoal bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-charcoal-dark via-charcoal to-charcoal-dark text-offwhite font-sans selection:bg-teal selection:text-white">
      <Header onOpenModal={handleOpenModal} />
      
      <main>
        {industryRoutes.includes(currentPath) ? (
          <IndustryPageTemplate 
            industryPath={currentPath.substring(1)} 
            onNavigate={(path) => {
              window.history.pushState({}, '', path);
              setCurrentPath(path);
              window.scrollTo(0, 0);
            }} 
            onOpenModal={handleOpenModal} 
          />
        ) : (
          <MainLandingPage onOpenModal={handleOpenModal} onOpenSplash={handleOpenSplash} />
        )}
      </main>

      <Footer onOpenSplash={handleOpenSplash} onOpenModal={handleOpenModal} />
      
      {modalState.isOpen && (
        <Modal isOpen={modalState.isOpen} onClose={handleCloseModal} title={modalState.title}>
          {modalState.content}
        </Modal>
      )}

      {splashState.isOpen && splashState.industry && (
        <IndustrySplash 
          industry={splashState.industry} 
          onOpenModal={handleOpenModal} 
          onClose={handleCloseSplash} 
        />
      )}
    </div>
  );
}
