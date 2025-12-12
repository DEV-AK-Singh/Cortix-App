import React from 'react';

const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full animate-fade-in pt-16 pb-24">
      
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            We built this because <br/>
            <span className="text-indigo-500">deploying apps sucks.</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            You want to build features, not manage servers. We created Cortix to make the cloud invisible, so you can focus on the code.
          </p>
        </div>

        {/* Content Blocks */}
        <div className="grid gap-12">
          
          <div className="bg-white dark:bg-white/5 p-8 md:p-12 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">The Problem</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Modern cloud platforms like AWS are incredibly powerful, but they are also incredibly complex. Setting up a simple app requires understanding VPCs, Load Balancers, IAM roles, Security Groups, and endless configuration files.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">It shouldn't be this hard.</span> Your code already contains the instructions for how it should run. Why do you need to explain it to the server manually?
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
             
             <h2 className="text-2xl font-bold mb-6 relative z-10">The Solution: Intelligent Infrastructure</h2>
             <p className="leading-relaxed opacity-90 relative z-10 mb-6">
               Cortix is an AI engine that acts as your personal DevOps engineer. It scans your repository, understands your tech stack, and provisions exactly what you need.
             </p>
             <ul className="space-y-4 relative z-10">
               <li className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                    <span className="text-cyan-400 text-sm font-bold">1</span>
                 </div>
                 <span>Analysis: We detect Node, Python, Docker, and databases automatically.</span>
               </li>
               <li className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                    <span className="text-cyan-400 text-sm font-bold">2</span>
                 </div>
                 <span>Provisioning: We talk to the cloud providers to set up the hardware.</span>
               </li>
               <li className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                    <span className="text-cyan-400 text-sm font-bold">3</span>
                 </div>
                 <span>Maintenance: We monitor health and scale resources up or down.</span>
               </li>
             </ul>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center justify-between border-t border-gray-200 dark:border-white/10 pt-12">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sound like magic?</h3>
              <p className="text-gray-600 dark:text-gray-400">It's just good engineering. Come see for yourself.</p>
            </div>
            <button className="px-6 py-3 rounded-lg border border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-900 dark:text-white font-medium">
              View Roadmap
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default About;