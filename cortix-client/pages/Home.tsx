import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Lock,
  Layers,
  ChevronRight,
  Terminal,
  Cpu,
  Activity,
  Globe,
} from "lucide-react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full animate-fade-in">
      {/* Hero Section */}
      <section className="w-full pt-20 pb-32 px-6 flex flex-col items-center text-center relative max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-xs font-mono mb-8 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          CORTIX ENGINE V2.1 ONLINE
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-white dark:to-gray-500">
          Zero Configuration. <br className="hidden md:block" />
          <span className="text-indigo-500">Infinite Scale.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-12 leading-relaxed">
          Cortix turns your repository into a global deployment in seconds.
          <span className="block mt-2 opacity-80">
            No YAML. No servers to manage. Just code.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            to="/analyzer"
            className="group h-12 px-8 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95"
          >
            Deploy Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/about"
            className="h-12 px-8 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 font-medium flex items-center justify-center gap-2 transition-all"
          >
            How It Works
          </Link>
        </div>

        {/* Trust Signals */}
        <div className="mt-12 flex sm:flex-row flex-col items-center gap-6 text-sm text-gray-500 dark:text-gray-500">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span>SOC2 Compliant</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span>Global Edge Network</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <span>99.99% Uptime</span>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="w-full border-y border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
        <div className="container mx-auto px-6 py-12">
          <p className="text-center text-xs font-mono text-gray-500 mb-8 uppercase tracking-widest">
            Trusted by 10,000+ developers at
          </p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {["Nebula", "Vertex", "Hyperion", "Oasis", "Pulsar"].map(
              (brand) => (
                <div
                  key={brand}
                  className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2"
                >
                  <div className="w-6 h-6 bg-current rounded-full opacity-20"></div>
                  {brand}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Infrastructure that thinks.
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Cortix replaces your DevOps backlog with intelligent automation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Cpu,
              title: "Context-Aware Analysis",
              desc: "We don't just run build commands. We understand your code's intent, dependencies, and architectural needs before provisioning a single server.",
              color: "text-blue-500",
            },
            {
              icon: Layers,
              title: "Autonomous Scaling",
              desc: "From zero to millions of requests. Cortix monitors traffic patterns and pre-warms resources so your users never see a loading spinner.",
              color: "text-purple-500",
            },
            {
              icon: Lock,
              title: "Fortress Security",
              desc: "Enterprise-grade security by default. Automated SSL, DDoS protection, and VPC isolation for every single deployment.",
              color: "text-emerald-500",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-indigo-500/50 transition-all hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-indigo-500/10 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <feature.icon className={`w-10 h-10 ${feature.color} mb-6`} />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600 dark:bg-indigo-900/20"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

        <div className="container mx-auto relative z-10 bg-white dark:bg-[#0a0a0a] rounded-3xl p-12 md:p-20 shadow-2xl border border-gray-200 dark:border-white/10 text-center">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8 rotate-3">
            <Terminal className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Stop deploying manually.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-10">
            Join thousands of developers who have switched to autonomous
            infrastructure.
          </p>

          <Link
            to="/analyzer"
            className="inline-flex items-center gap-2 h-14 px-10 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg shadow-xl shadow-indigo-500/30 transition-all hover:scale-105"
          >
            Start Free Trial
            <ChevronRight className="w-5 h-5" />
          </Link>
          <p className="mt-6 text-xs text-gray-500 dark:text-gray-500">
            No credit card required · SOC2 Compliant · Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
