import React, { useState, useEffect } from "react";
import {
  Search,
  Loader2,
  Command,
  Terminal,
  Download,
  Code,
} from "lucide-react";

interface RepoSearchProps {
  onSearch: (repoPath: string) => void;
  onGenerate: () => void;
  onDownload: () => void;
  step: string;
  loading: boolean;
}

const RepoSearch: React.FC<RepoSearchProps> = ({
  onSearch,
  onGenerate,
  onDownload,
  step,
  loading,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [placeholderText, setPlaceholderText] = useState("");
  const fullText = "owner/repository-name";

  // Typing effect for placeholder
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholderText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        // Pause then reset
        setTimeout(() => {
          index = 0;
        }, 2000);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto space-y-12 text-center animate-fade-in relative z-20 pt-10">
      {/* Title Section */}
      <div className="space-y-6 relative group cursor-default">
        {/* Subtle glow behind title - Different for Light/Dark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-indigo-500/10 dark:bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm shadow-sm dark:shadow-none transition-colors duration-300">
            <Terminal className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 font-mono">
              System v2.0 Ready
            </span>
          </div>

          <h1 className="relative text-6xl md:text-8xl font-bold tracking-tight text-gray-900 dark:text-white flex items-baseline justify-center gap-1 transition-colors duration-300">
            CORTIX
            <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-indigo-500 animate-pulse mb-2"></span>
          </h1>

          <p className="text-gray-600 dark:text-gray-500 max-w-lg mx-auto text-sm md:text-base font-light tracking-wide transition-colors duration-300 leading-relaxed">
            Your code is the blueprint. Cortix is the builder. <br/>
            Paste a link to see your infrastructure visualize in real-time.
          </p>
        </div>
      </div>

      {/* Search Interface */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl relative group mx-auto"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-cyan-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>

        <div className="relative flex items-center bg-white dark:bg-[#0a0a0a] rounded-xl p-2 shadow-xl dark:shadow-2xl border border-gray-200 dark:border-white/10 transition-colors duration-300">
          <div className="pl-4 pr-3 text-gray-400 dark:text-gray-500">
            <Command className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholderText}
            disabled={loading}
            className="flex-1 bg-transparent border-none outline-none text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 font-mono h-12 transition-colors duration-300"
          />
          {step === "Start" && (
            <button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className={`
                h-10 px-6 rounded-lg font-medium flex items-center gap-2 transition-all duration-300
                ${
                  loading || !inputValue.trim()
                    ? "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95"
                }
              `}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">ANALYZE</span>
            </button>
          )}
          {step === "Analyze" && (
            <button
              type="button"
              disabled={loading}
              onClick={onGenerate}
              className={`
                h-10 px-6 rounded-lg font-medium flex items-center gap-2 transition-all duration-300
                ${
                  loading || !inputValue.trim()
                    ? "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95"
                }
              `}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Code className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">GENERATE</span>
            </button>
          )}
          {step === "Generate" && (
            <button
              type="button"
              disabled={loading}
              onClick={onDownload}
              className={`
                h-10 px-6 rounded-lg font-medium flex items-center gap-2 transition-all duration-300
                ${
                  loading || !inputValue.trim()
                    ? "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95"
                }
              `}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">DOWNLOAD</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RepoSearch;
