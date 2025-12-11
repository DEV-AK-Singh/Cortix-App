import React from 'react';

const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full animate-fade-in pt-16 pb-24">
      
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            Democratizing <br/>
            <span className="text-indigo-500">Codebase Intelligence</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            We are building the tools that help developers understand, visualize, and optimize complex software systems instantly.
          </p>
        </div>

        {/* Content Blocks */}
        <div className="grid gap-12">
          
          <div className="bg-white dark:bg-white/5 p-8 md:p-12 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">The Problem</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Modern software development has become incredibly complex. Monorepos, microservices, and multi-cloud architectures make it nearly impossible for a single developer to keep a mental model of the entire system. Onboarding takes months, and architectural drift is inevitable.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Existing tools are either too expensive, too slow, or too hard to configure. We wanted a "magic lens" that you could point at any repository and instantly get the lay of the land.
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
             
             <h2 className="text-2xl font-bold mb-6 relative z-10">Our Solution: Cortix</h2>
             <p className="leading-relaxed opacity-90 relative z-10 mb-6">
               Cortix is an AI-powered static analysis engine that runs entirely in the browser (or edge). It parses file structures, dependency trees, and configuration files to build a semantic graph of your project.
             </p>
             <ul className="space-y-3 relative z-10">
               <li className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                 <span>Zero configuration required</span>
               </li>
               <li className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                 <span>Privacy-first (code never leaves your machine in local mode)</span>
               </li>
               <li className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                 <span>Language agnostic analysis</span>
               </li>
             </ul>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center justify-between border-t border-gray-200 dark:border-white/10 pt-12">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Join the mission</h3>
              <p className="text-gray-600 dark:text-gray-400">We're hiring engineers who love tools.</p>
            </div>
            <button className="px-6 py-3 rounded-lg border border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-900 dark:text-white font-medium">
              View Open Roles
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default About;