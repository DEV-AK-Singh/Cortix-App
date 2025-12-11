import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="w-full animate-fade-in py-16 px-6">
      <div className="container mx-auto max-w-4xl bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-2xl p-8 md:p-12 shadow-sm">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-gray-600 dark:text-gray-400 leading-relaxed">
          <p className="text-sm uppercase tracking-widest text-gray-400 dark:text-gray-500">Last updated: May 15, 2024</p>
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
            <p>
              Welcome to Cortix ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website cortix.ai
              including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the "Site").
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. Data Collection</h2>
            <p className="mb-4">
              We collect information that you voluntarily provide to us when you register on the Site, express an interest in obtaining information
              about us or our products and services, when you participate in activities on the Site, or otherwise when you contact us.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number.</li>
              <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. Use of Your Information</h2>
            <p>
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Create and manage your account.</li>
              <li>Compile anonymous statistical data and analysis for use internally or with third parties.</li>
              <li>Email you regarding your account or order.</li>
              <li>Generate a personal profile about you to make future visits to the Site more personalized.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">4. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;