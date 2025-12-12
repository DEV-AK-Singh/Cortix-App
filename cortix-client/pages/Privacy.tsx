import React from 'react';
import { Shield, Lock, EyeOff, Server } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="w-full animate-fade-in py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Your Code is <span className="text-emerald-500">Your Business.</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We built Cortix with a "Privacy First" architecture. We process your code to deploy it, never to train our models.
          </p>
        </div>

        <div className="grid gap-8 mb-16">
           {/* Key Highlights Cards */}
           <div className="grid md:grid-cols-2 gap-6">
             <div className="p-6 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 shadow-sm">
               <div className="flex items-center gap-3 mb-4">
                 <EyeOff className="w-5 h-5 text-indigo-500" />
                 <h3 className="font-bold text-gray-900 dark:text-white">No Model Training</h3>
               </div>
               <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                 We strictly do not use your private repositories, code snippets, or environment variables to train our public or private foundation models.
               </p>
             </div>
             
             <div className="p-6 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 shadow-sm">
               <div className="flex items-center gap-3 mb-4">
                 <Lock className="w-5 h-5 text-indigo-500" />
                 <h3 className="font-bold text-gray-900 dark:text-white">Ephemeral Processing</h3>
               </div>
               <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                 Code analysis happens in isolated, ephemeral sandboxes. Once the infrastructure config is generated, the raw code context is discarded from memory.
               </p>
             </div>
           </div>
        </div>
        
        {/* Legal Text */}
        <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-sm space-y-12">
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-indigo-500">1.</span> Data Collection
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              We collect the minimum amount of data necessary to operate the service:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li><strong>Authentication:</strong> GitHub/GitLab User IDs and OAuth tokens (encrypted at rest).</li>
              <li><strong>Repository Metadata:</strong> File trees, language statistics, and dependency manifests (package.json, requirements.txt).</li>
              <li><strong>Billing:</strong> Stripe Customer IDs (we do not store card numbers).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-indigo-500">2.</span> How We Use Data
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Your data is used solely to:
              <br/>
              a) Analyze your application architecture.<br/>
              b) Provision cloud resources (AWS, GCP, etc.) on your behalf.<br/>
              c) Monitor deployment health and alert you to failures.<br/>
              d) Comply with legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-indigo-500">3.</span> Infrastructure Providers
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Cortix acts as an orchestration layer. To deploy your app, we must transmit necessary configuration data to underlying cloud providers (AWS, Vercel, Google Cloud). We hold Data Processing Agreements (DPAs) with all sub-processors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-indigo-500">4.</span> Security Standards
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              We implement defense-in-depth security measures:
            </p>
            <ul className="grid sm:grid-cols-2 gap-4">
               <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> SOC2 Type II Compliant (In Progress)
               </li>
               <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> AES-256 Encryption at Rest
               </li>
               <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> TLS 1.3 for all Data in Transit
               </li>
               <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Regular Penetration Testing
               </li>
            </ul>
          </section>

          <section className="pt-8 border-t border-gray-100 dark:border-white/5">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Last updated: October 2025. For privacy inquiries, contact <a href="#" className="text-indigo-500 underline">security@cortix.space</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Privacy;