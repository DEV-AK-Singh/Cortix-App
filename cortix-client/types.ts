export interface FileStructure {
  root: string;
  folders: string[];
  files: string[];
}

export interface TechStack {
  frontend: Record<string, boolean>;
  backend: Record<string, boolean>;
  infrastructure: Record<string, boolean>;
  packageManagers: Record<string, boolean>;
  cicd: Record<string, boolean>;
  tests: Record<string, boolean>;
  languageSummary: {
    extensions: Record<string, number>;
    percentages: Record<string, string>;
  };
}

export interface RepoAnalysis {
  repoName: string;
  timestamp: string;
  structure: FileStructure;
  metadata: TechStack;
}

export interface AnalysisState {
  loading: boolean;
  data: RepoAnalysis | null;
  error: string | null;
}
