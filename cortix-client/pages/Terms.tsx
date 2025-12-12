import React from 'react';
import { FileText, AlertTriangle, Scale } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="w-full animate-fade-in py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The legal framework for using the Cortix Autonomous DevOps platform.
          </p>
        </div>
        
        <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-sm space-y-12">
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. The Service</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Cortix provides an automated infrastructure generation service ("The Platform"). By connecting your code repositories, you grant Cortix permission to analyze, build, and deploy your applications to your specified cloud environments.
            </p>
          </section>

          <section>
            <div className="p-6 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 mb-6">
              <h3 className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-400 mb-2">
                <AlertTriangle className="w-5 h-5" />
                2. AI Disclaimer & Liability
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-500 leading-relaxed">
                The Platform utilizes probabilistic Artificial Intelligence to generate infrastructure configurations. While we strive for accuracy, AI models can produce errors ("hallucinations"). 
                <br/><br/>
                <strong>You are the final approver of all infrastructure code.</strong> Cortix accepts no liability for production outages, data loss, or security vulnerabilities resulting from unreviewed AI-generated configurations.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. Acceptable Use</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              You agree not to use Cortix to deploy:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Malware, ransomware, or any malicious code.</li>
              <li>Cryptocurrency miners or high-compute untargeted workloads.</li>
              <li>Content that violates copyright or intellectual property laws.</li>
              <li>Phishing sites or deceptive financial schemes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">4. Payment & Credits</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Subscriptions renew automatically. Unused "Compute Credits" do not roll over to the next billing cycle. 
              We reserve the right to change pricing with 30 days notice. Refunds are issued solely at our discretion for service downtime events.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">5. Intellectual Property</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              <strong>Your Code:</strong> You retain 100% ownership of your source code and the generated infrastructure configurations.<br/>
              <strong>Our Platform:</strong> Cortix retains ownership of the analysis engine, UI, and AI orchestration logic.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">6. Termination</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We may suspend or terminate your access immediately if you breach these Terms. Upon termination, we will provide a 7-day grace period for you to migrate your data, after which all associated resources will be permanently deleted.
            </p>
          </section>

          <section className="pt-8 border-t border-gray-100 dark:border-white/5">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              These terms are governed by the laws of Delaware, USA. <br/>
              Last Updated: October 2025
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Terms;