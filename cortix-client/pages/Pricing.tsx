import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';

const Pricing: React.FC = () => {
  const tiers = [
    {
      name: "Hacker",
      price: "$0",
      period: "/month",
      desc: "Perfect for hobbyists and open source projects.",
      features: ["Unlimited Public Repos", "Basic Tech Stack Analysis", "File Tree Visualization", "Community Support"],
      notIncluded: ["Private Repos", "Deep Dependency Graph", "Team Collaboration"],
      cta: "Start Free",
      primary: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      desc: "For professional developers and small teams.",
      features: ["Unlimited Public & Private Repos", "Advanced Security Scan", "Export to PDF/JSON", "Priority Email Support", "API Access (Rate Limited)"],
      notIncluded: ["SSO Enforcement", "On-Premise Deployment"],
      cta: "Get Pro",
      primary: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      desc: "For large organizations requiring security and control.",
      features: ["Everything in Pro", "Single Sign-On (SSO)", "Audit Logs", "Dedicated Account Manager", "SLA Guarantee", "On-Premise Option"],
      notIncluded: [],
      cta: "Contact Sales",
      primary: false
    }
  ];

  return (
    <div className="flex flex-col items-center w-full animate-fade-in pt-12 pb-24">
      
      <div className="text-center px-6 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Simple, Transparent Pricing</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Choose the plan that fits your development needs. No hidden fees.
        </p>
      </div>

      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 max-w-6xl">
        {tiers.map((tier) => (
          <div key={tier.name} className={`relative rounded-2xl p-8 flex flex-col ${
            tier.primary 
              ? 'bg-white dark:bg-[#0a0a0a] border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20' 
              : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-indigo-300 dark:hover:border-white/20 transition-colors'
          }`}>
            {tier.primary && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">{tier.price}</span>
                <span className="text-gray-500">{tier.period}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">{tier.desc}</p>
            </div>

            <div className="flex-1 space-y-4 mb-8">
              {tier.features.map(feat => (
                <div key={feat} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
              {tier.notIncluded.map(feat => (
                <div key={feat} className="flex items-start gap-3 text-sm text-gray-400 dark:text-gray-600 decoration-gray-400">
                  <X className="w-5 h-5 shrink-0" />
                  <span className="line-through decoration-1">{feat}</span>
                </div>
              ))}
            </div>

            <button className={`w-full py-3 rounded-lg font-medium transition-all ${
              tier.primary 
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25' 
                : 'bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white'
            }`}>
              {tier.cta}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Pricing;