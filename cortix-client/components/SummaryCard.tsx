import React, { useState, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  FileCode,
  Folder,
  Box,
  Terminal,
  Cpu,
  FileJson,
  FileType,
  Code2,
  Globe,
  Layers,
  Zap,
  FolderOpen,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { RepoAnalysis } from "../types";

interface SummaryCardProps {
  data: RepoAnalysis;
}

const COLORS = [
  "#6366f1",
  "#06b6d4",
  "#8b5cf6",
  "#ec4899",
  "#10b981",
  "#f59e0b",
];

// --- Helper Components ---

const TechNode: React.FC<{
  label: string;
  active: boolean;
  type: "front" | "back" | "infra" | "tool";
}> = ({ label, active, type }) => {
  if (!active) return null;

  const typeColors = {
    front:
      "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/30",
    back: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30",
    infra:
      "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/30",
    tool: "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/30",
  };

  return (
    <div
      className={`
      flex items-center gap-2 px-3 py-1.5 rounded-md border backdrop-blur-md
      transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/10
      ${typeColors[type]}
    `}
    >
      <div
        className={`w-1.5 h-1.5 rounded-full ${
          type === "infra"
            ? "bg-orange-500 dark:bg-orange-400"
            : type === "back"
            ? "bg-emerald-500 dark:bg-emerald-400"
            : type === "front"
            ? "bg-blue-500 dark:bg-blue-400"
            : "bg-purple-500 dark:bg-purple-400"
        } shadow-[0_0_8px_currentColor] animate-pulse`}
      ></div>
      <span className="text-xs font-mono tracking-wide uppercase">{label}</span>
    </div>
  );
};

// --- Tree View Logic ---

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  path: string;
}

const buildFileTree = (files: string[]) => {
  const root: FileNode[] = [];

  files.forEach((path) => {
    // Normalize path separators to standard slashes
    const parts = path.replace(/\\/g, "/").split("/");
    let currentLevel = root;

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1;
      let existingNode = currentLevel.find((node) => node.name === part);

      if (!existingNode) {
        const newNode: FileNode = {
          name: part,
          type: isFile ? "file" : "folder",
          children: isFile ? undefined : [],
          path: parts.slice(0, index + 1).join("/"),
        };
        currentLevel.push(newNode);
        existingNode = newNode;
      }

      if (!isFile && existingNode.children) {
        currentLevel = existingNode.children;
      }
    });
  });

  // Sort: Folders first, then files, alphabetically
  const sortNodes = (nodes: FileNode[]) => {
    nodes.sort((a, b) => {
      if (a.type === b.type) return a.name.localeCompare(b.name);
      return a.type === "folder" ? -1 : 1;
    });
    nodes.forEach((node) => {
      if (node.children) sortNodes(node.children);
    });
  };

  sortNodes(root);
  return root;
};

const FileIcon = ({ fileName }: { fileName: string }) => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (fileName === "package.json")
    return <FileCode className="w-4 h-4 text-red-500 dark:text-red-400" />;
  if (fileName === "tsconfig.json")
    return <FileCode className="w-4 h-4 text-blue-500 dark:text-blue-400" />;
  if (ext === "ts" || ext === "tsx")
    return <Code2 className="w-4 h-4 text-blue-500 dark:text-blue-400" />;
  if (ext === "js" || ext === "jsx")
    return <Code2 className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />;
  if (ext === "json")
    return (
      <FileJson className="w-4 h-4 text-yellow-600 dark:text-yellow-200" />
    );
  if (ext === "md")
    return <FileType className="w-4 h-4 text-gray-500 dark:text-gray-400" />;
  if (ext === "css" || ext === "scss")
    return <FileType className="w-4 h-4 text-pink-500 dark:text-pink-400" />;
  if (fileName.startsWith("."))
    return <Layers className="w-4 h-4 text-gray-400 dark:text-gray-500" />;
  return <FileCode className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />;
};

const FileSystemItem: React.FC<{ node: FileNode; depth?: number }> = ({
  node,
  depth = 0,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const paddingLeft = `${depth * 1.2}rem`;

  if (node.type === "folder") {
    return (
      <div>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 py-1 pr-2 rounded cursor-pointer text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors select-none group"
          style={{ paddingLeft }}
        >
          {isOpen ? (
            <ChevronDown className="w-3 h-3 text-gray-400 dark:text-gray-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" />
          ) : (
            <ChevronRight className="w-3 h-3 text-gray-400 dark:text-gray-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" />
          )}
          {isOpen ? (
            <FolderOpen className="w-4 h-4 text-indigo-500 dark:text-indigo-400 fill-indigo-100 dark:fill-indigo-400/10" />
          ) : (
            <Folder className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
          )}
          <span className="text-sm font-medium">{node.name}</span>
        </div>
        {isOpen && node.children && (
          <div className="border-l border-gray-200 dark:border-gray-800 ml-[calc(1.2rem+7px)]">
            {node.children.map((child) => (
              <div key={child.path} className="-ml-[calc(1.2rem+7px)]">
                {/* ^ Offset wrapper to reset margin for recursion but keep border visual */}
                <FileSystemItem node={child} depth={depth + 1} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-2 py-1 pr-2 rounded cursor-pointer text-gray-700 dark:text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group"
      style={{ paddingLeft }}
    >
      <div className="w-3"></div> {/* Spacer for arrow alignment */}
      <FileIcon fileName={node.name} />
      <span className="text-sm font-mono group-hover:text-indigo-700 dark:group-hover:text-indigo-200 transition-colors">
        {node.name}
      </span>
    </div>
  );
};

// --- Main Component ---

const SummaryCard: React.FC<SummaryCardProps> = ({ data }) => {
  const { structure, metadata } = data;

  // Prepare Data
  const chartData = Object.entries(metadata.languageSummary.percentages).map(
    ([key, value]) => ({
      name: key === "no_ext" ? "Config" : key,
      value: parseFloat(String(value).replace("%", "")),
      count: metadata.languageSummary.extensions[key]
    })
  );

  console.log(chartData);

  const techStack = {
    frontend: Object.entries(metadata.frontend),
    backend: Object.entries(metadata.backend),
    infra: Object.entries(metadata.infrastructure),
    tools: [
      ...Object.entries(metadata.packageManagers),
      ...Object.entries(metadata.tests),
      ...Object.entries(metadata.cicd),
    ],
  };

  const fileTree = useMemo(
    () => buildFileTree(structure.files),
    [structure.files]
  );

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-fade-in-up pb-12">
      {/* HUD Header */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-[#0a0a0a]/80 backdrop-blur-xl p-6 shadow-xl dark:shadow-2xl transition-colors duration-300">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Cpu className="w-48 h-48 rotate-12 text-indigo-500" />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl border border-indigo-100 dark:border-indigo-500/30 shadow-sm dark:shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <Box className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors duration-300">
                  {data.repoName}
                </h2>
                <div className="flex items-center gap-3 text-xs font-mono text-gray-500 dark:text-indigo-300/50 mt-1">
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    ACTIVE
                  </span>
                  <span className="text-gray-300 dark:text-gray-700">|</span>
                  <span>
                    ID:{" "}
                    {structure.root.split("\\").pop()?.slice(0, 8) || "UNKNOWN"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            {[
              { label: "Files", value: structure.files.length, icon: FileCode },
              {
                label: "Folders",
                value: structure.folders.length,
                icon: Folder,
              },
              { label: "Types", value: chartData.length, icon: Globe },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-4 rounded-xl min-w-[110px] hover:border-indigo-200 dark:hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/5 transition-all group shadow-sm dark:shadow-none"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">
                    {stat.label}
                  </span>
                  <stat.icon className="w-3.5 h-3.5 text-gray-400 dark:text-gray-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
                </div>
                <div className="text-2xl font-mono font-bold text-gray-900 dark:text-white group-hover:scale-105 transition-transform origin-left">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel: Tech Matrix */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex-1 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col shadow-lg transition-colors duration-300">
            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>

            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-6">
              <Layers className="w-4 h-4 text-indigo-500" /> System Core
            </h3>

            <div className="flex-1 space-y-8">
              {/* Stack Sections */}
              {[
                {
                  title: "INTERFACE",
                  items: techStack.frontend,
                  type: "front" as const,
                  color: "text-blue-600 dark:text-blue-500",
                },
                {
                  title: "SERVER",
                  items: techStack.backend,
                  type: "back" as const,
                  color: "text-emerald-600 dark:text-emerald-500",
                },
                {
                  title: "INFRASTRUCTURE",
                  items: techStack.infra,
                  type: "infra" as const,
                  color: "text-orange-600 dark:text-orange-500",
                },
                {
                  title: "TOOLCHAIN",
                  items: techStack.tools,
                  type: "tool" as const,
                  color: "text-purple-600 dark:text-purple-500",
                },
              ].map((section) => (
                <div key={section.title} className="space-y-3">
                  <div
                    className={`text-[10px] font-mono ${section.color} opacity-70 border-b border-gray-100 dark:border-white/5 pb-1`}
                  >
                    {section.title}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {section.items.map(([k, v]) => (
                      <TechNode
                        key={k}
                        label={k}
                        active={v}
                        type={section.type}
                      />
                    ))}
                    {!section.items.some((x) => x[1]) && (
                      <span className="text-[10px] text-gray-400 dark:text-gray-700 italic px-2">
                        Not Detected
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Panel: Interactive Source Map */}
        <div className="lg:col-span-5 max-h-[500px] lg:h-auto">
          <div className="h-full bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-lg transition-colors duration-300">
            {/* Terminal Header */}
            <div className="bg-gray-50 dark:bg-[#111] border-b border-gray-200 dark:border-white/10 px-4 py-3 flex items-center justify-between shrink-0 transition-colors duration-300">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Terminal className="w-3.5 h-3.5 text-indigo-500" />
                <span className="font-mono tracking-wide">
                  root@cortix:~/project
                </span>
              </div>
              <div className="flex gap-1.5 opacity-50">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-white/20"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-white/20"></div>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto font-mono scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800 scrollbar-track-transparent">
              {/* Interactive Tree */}
              <div className="space-y-1">
                {fileTree.map((node) => (
                  <FileSystemItem key={node.path} node={node} />
                ))}
              </div>
            </div>

            {/* Footer Status */}
            <div className="bg-gray-50 dark:bg-[#0e0e0e] border-t border-gray-200 dark:border-white/5 px-4 py-1.5 flex justify-between items-center text-[10px] font-mono text-gray-500 dark:text-gray-600 transition-colors duration-300">
              <span>UTF-8</span>
              <span>{structure.files.length} objects</span>
            </div>
          </div>
        </div>

        {/* Right Panel: Analytics */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-2xl p-6 h-full flex flex-col items-center justify-center relative shadow-lg transition-colors duration-300">
            <h3 className="absolute top-6 left-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <Zap className="w-4 h-4 text-yellow-500" /> Composition
            </h3>

            <div className="w-full h-[220px] relative mt-8">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={5}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        className="stroke-transparent outline-none transition-all duration-300 hover:opacity-80"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937", // Always dark for contrast
                      borderColor: "#374151",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    itemStyle={{
                      color: "#fff",
                      fontSize: "12px",
                      fontFamily: "monospace",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Central Stat */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-4xl font-bold text-gray-900 dark:text-white tracking-tighter transition-colors duration-300">
                  {structure.files.length}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mt-1">
                  Files
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="w-full space-y-3 mt-4 px-2">
              {chartData.slice(0, 5).map((item, index) => (
                <div
                  key={item.name}
                  className="flex justify-between items-center text-xs group cursor-default"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-sm"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-mono text-gray-500 dark:text-gray-600 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
