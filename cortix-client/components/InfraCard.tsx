import React, { useState } from "react";
import {
  Container,
  FileJson,
  Terminal,
  Copy,
  Check,
  Server,
  FileCode,
  Shield,
  Box,
  Cpu
} from "lucide-react";

// --- Types ---

export interface InfraFile {
  name: string;
  content: string;
  language: "dockerfile" | "yaml" | "bash" | "json" | "sh";
}

interface InfraCardProps {
  files: InfraFile[];
  title?: string;
}

// --- Helper Components ---

const FileIcon = ({ fileName, language }: { fileName: string; language: string }) => {
  const lowerName = fileName.toLowerCase();
  
  if (lowerName.includes("docker")) {
    return <Container className="w-4 h-4 text-blue-500 dark:text-blue-400" />;
  }
  if (lowerName.includes("compose") || language === "yaml") {
    return <Box className="w-4 h-4 text-purple-500 dark:text-purple-400" />;
  }
  if (language === "bash" || language === "sh" || lowerName.endsWith(".sh")) {
    return <Terminal className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />;
  }
  return <FileCode className="w-4 h-4 text-gray-500" />;
};

const SyntaxHighlighter = ({ content, language }: { content: string; language: string }) => {
  // A very lightweight syntax highlighter for visual flair without heavy libraries
  const lines = content.split("\n");

  return (
    <div className="font-mono text-sm leading-6">
      {lines.map((line, i) => (
        <div key={i} className="table-row">
          <span className="table-cell text-right select-none w-8 pr-4 text-gray-300 dark:text-gray-700 text-xs">
            {i + 1}
          </span>
          <span className="table-cell whitespace-pre-wrap break-all text-gray-800 dark:text-gray-300">
            {/* Simple Keyword Highlighting logic */}
            {line.split(" ").map((token, j) => {
              const isCommand = /^(FROM|RUN|CMD|COPY|WORKDIR|EXPOSE|ENV|ENTRYPOINT|version:|services:|image:|ports:)/.test(token);
              const isComment = token.startsWith("#");
              
              if (isComment || line.trim().startsWith("#")) {
                return <span key={j} className="text-gray-400 dark:text-gray-600 italic">{token} </span>;
              }
              if (isCommand) {
                return <span key={j} className="text-indigo-600 dark:text-indigo-400 font-semibold">{token} </span>;
              }
              return <span key={j}>{token} </span>;
            })}
          </span>
        </div>
      ))}
    </div>
  );
};

// --- Main Component ---

const InfraCard: React.FC<InfraCardProps> = ({ 
  files, 
  title = "Infrastructure Configuration" 
}) => {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeFile = files[activeFileIndex];

  const handleCopy = () => {
    if (!activeFile) return;
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!files || files.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto animate-fade-in-up">
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-[#0a0a0a]/80 backdrop-blur-xl shadow-xl dark:shadow-2xl transition-colors duration-300">
        
        {/* Decorative Background Icon */}
        <div className="absolute -top-10 -right-10 p-4 opacity-5 pointer-events-none">
          <Server className="w-64 h-64 rotate-12 text-indigo-500" />
        </div>

        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-white/5 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-xl border border-orange-100 dark:border-orange-500/30 shadow-sm">
              <Shield className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                {title}
              </h2>
              <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-1">
                Found {files.length} configuration files
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          
          {/* Sidebar: File List */}
          <div className="lg:col-span-3 border-r border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-black/20">
            <div className="p-4 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-4 px-2">
                Explorer
              </h3>
              {files.map((file, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFileIndex(idx)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group
                    ${activeFileIndex === idx 
                      ? "bg-white dark:bg-white/10 shadow-sm text-indigo-600 dark:text-indigo-400 border border-gray-200 dark:border-white/5" 
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-white/5 hover:text-black dark:hover:text-white"
                    }
                  `}
                >
                  <FileIcon fileName={file.name} language={file.language} />
                  <span className="font-mono truncate">{file.name}</span>
                  {activeFileIndex === idx && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel: Code Viewer */}
          <div className="lg:col-span-9 flex flex-col bg-[#ffffff] dark:bg-[#0a0a0a] relative">
            
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/5 bg-white dark:bg-[#0a0a0a]">
              <div className="flex items-center gap-2">
                <span className="flex gap-1.5 mr-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
                </span>
                <span className="text-xs font-mono text-gray-500 dark:text-gray-500">
                  {activeFile.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-gray-400 border border-gray-200 dark:border-white/10 px-2 py-0.5 rounded">
                  {activeFile.language}
                </span>
                <button
                  onClick={handleCopy}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-md transition-colors text-gray-500 dark:text-gray-400"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Editor Body */}
            <div className="flex-1 overflow-auto p-4 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800 scrollbar-track-transparent">
              <SyntaxHighlighter 
                content={activeFile.content} 
                language={activeFile.language} 
              />
            </div>

            {/* Status Footer */}
            <div className="px-4 py-1.5 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#050505] flex justify-between text-[10px] font-mono text-gray-400">
               <span>Lines: {activeFile.content.split('\n').length}</span>
               <span>UTF-8</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InfraCard;