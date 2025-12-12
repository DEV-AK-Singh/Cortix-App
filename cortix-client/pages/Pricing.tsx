import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Zap, Shield, Crown } from 'lucide-react';

const Pricing: React.FC = () => {
  const tiers = [
    {
      name: "The Builder",
      price: "$0",
      period: "forever",
      icon: Zap,
      desc: "Perfect for weekend projects and prototypes.",
      features: [
        "Deploy from GitHub instantly",
        "Free automatic HTTPS (SSL)",
        "Unlimited public projects",
        "Community support access",
        "Basic performance metrics"
      ],
      notIncluded: [
        "Private repositories",
        "Custom domain names",
        "Team collaboration"
      ],
      cta: "Start Hacking",
      primary: false
    },
    {
      name: "The Startup",
      price: "$49",
      period: "/month",
      icon: Crown,
      desc: "Power and privacy for growing businesses.",
      features: [
        "Everything in Builder",
        "Unlimited private projects",
        "Connect your own domains",
        "Zero-downtime updates",
        "Instant rollbacks (Time Travel)",
        "Priority email support"
      ],
      notIncluded: [
        "Dedicated account manager",
        "Custom contract reviews"
      ],
      cta: "Scale Up",
      primary: true
    },
    {
      name: "The Enterprise",
      price: "Custom",
      period: "",
      icon: Shield,
      desc: "Control, compliance, and dedicated care.",
      features: [
        "Everything in Startup",
        "99.99% Uptime Guarantee",
        "Single Sign-On (SSO)",
        "Deploy to your own AWS/GCP",
        "24/7 Phone & Slack support",
        "Audit logs for compliance"
      ],
      notIncluded: [],
      cta: "Talk to Sales",
      primary: false
    }
  ];

  return (
    <div className="flex flex-col items-center w-full animate-fade-in pt-16 pb-32">
      
      <div className="text-center px-6 mb-20">
        <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-widest uppercase mb-6">
          Straightforward Pricing
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Pay for success, <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">not for servers.</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          We handle the DevOps so you can handle the business. <br className="hidden md:block"/>
          Upgrade, downgrade, or cancel at any time.
        </p>
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-8 max-w-7xl">
        {tiers.map((tier) => (
          <div key={tier.name} className={`relative rounded-3xl p-8 flex flex-col transition-all duration-300 ${
            tier.primary 
              ? 'bg-gray-900 text-white dark:bg-white dark:text-black shadow-2xl scale-105 z-10' 
              : 'bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white hover:border-indigo-300 dark:hover:border-white/20'
          }`}>
            
            {tier.primary && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                tier.primary 
                  ? 'bg-white/10 dark:bg-black/5' 
                  : 'bg-indigo-50 dark:bg-white/5'
              }`}>
                <tier.icon className={`w-6 h-6 ${tier.primary ? 'text-indigo-300 dark:text-indigo-600' : 'text-indigo-500'}`} />
              </div>
              
              <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
              <p className={`text-sm mb-6 ${tier.primary ? 'text-gray-300 dark:text-gray-600' : 'text-gray-500 dark:text-gray-400'}`}>
                {tier.desc}
              </p>
              
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight">{tier.price}</span>
                <span className={`text-sm font-medium ${tier.primary ? 'text-gray-400 dark:text-gray-500' : 'text-gray-400'}`}>
                  {tier.period}
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-4 mb-10">
              <div className={`h-px w-full ${tier.primary ? 'bg-white/10 dark:bg-black/5' : 'bg-gray-100 dark:bg-white/5'}`}></div>
              
              {tier.features.map(feat => (
                <div key={feat} className="flex items-start gap-3 text-sm">
                  <div className={`mt-0.5 p-0.5 rounded-full ${
                    tier.primary ? 'bg-emerald-500/30 text-emerald-300 dark:text-emerald-600' : 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                  }`}>
                    <Check className="w-3 h-3" />
                  </div>
                  <span className={tier.primary ? 'text-gray-200 dark:text-gray-700' : 'text-gray-600 dark:text-gray-300'}>{feat}</span>
                </div>
              ))}
              
              {tier.notIncluded.map(feat => (
                <div key={feat} className={`flex items-start gap-3 text-sm opacity-90 ${tier.primary ? 'text-gray-500 dark:text-gray-400' : 'text-gray-400 dark:text-gray-600'}`}>
                  <div className={`mt-0.5 p-0.5 rounded-full ${
                    tier.primary ? 'bg-red-500/30 text-red-300 dark:text-red-600' : 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400'
                  }`}>
                    <X className="w-3 h-3" />
                  </div>
                  <span className="line-through decoration-1">{feat}</span>
                </div>
              ))}
            </div>

            <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 transform hover:-translate-y-1 ${
              tier.primary 
                ? 'bg-white text-gray-900 hover:bg-gray-100 dark:bg-black dark:text-white dark:hover:bg-gray-900 shadow-lg' 
                : 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200'
            }`}>
              {tier.cta}
            </button>
          </div>
        ))}
      </div>
      
      {/* FAQ Link */}
      <div className="mt-20 mx-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          Have questions? <Link to="/about" className="text-indigo-500 hover:underline">Read our philosophy</Link> or contact support.
        </p>
      </div>

    </div>
  );
};

export default Pricing;