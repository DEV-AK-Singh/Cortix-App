import { RepoAnalysis } from '../types';

export const fetchRepoData = async (repoPath: string): Promise<RepoAnalysis> => {
  return new Promise((resolve, reject) => {
    // Simulate API network delay
    setTimeout(() => {
      // Basic validation
      if (!repoPath.trim()) {
        reject(new Error('Please enter a repository path.'));
        return;
      }

      // Large Monorepo Dummy Data
      const mockData: RepoAnalysis = {
        repoName: repoPath, // Echo back the input
        timestamp: new Date().toISOString(),
        structure: {
          root: "/usr/src/app/cortix-monorepo",
          folders: [
            ".github",
            ".github/workflows",
            ".vscode",
            "apps",
            "apps/admin",
            "apps/admin/src",
            "apps/backend",
            "apps/backend/src",
            "apps/backend/src/users",
            "apps/backend/test",
            "apps/web",
            "apps/web/public",
            "apps/web/src",
            "apps/web/src/components",
            "apps/web/src/pages",
            "apps/web/src/styles",
            "docs",
            "infra",
            "infra/k8s",
            "infra/terraform",
            "packages",
            "packages/ui",
            "packages/ui/src",
            "packages/utils",
            "packages/utils/src",
            "packages/utils/test"
          ],
          files: [
            ".github/workflows/ci.yml",
            ".github/workflows/deploy.yml",
            ".npmrc",
            ".prettierrc",
            ".vscode/settings.json",
            "apps/admin/package.json",
            "apps/admin/src/App.vue",
            "apps/admin/src/main.ts",
            "apps/admin/vite.config.ts",
            "apps/backend/Dockerfile",
            "apps/backend/nest-cli.json",
            "apps/backend/package.json",
            "apps/backend/src/app.module.ts",
            "apps/backend/src/main.ts",
            "apps/backend/src/users/users.controller.ts",
            "apps/backend/src/users/users.service.ts",
            "apps/backend/test/app.e2e-spec.ts",
            "apps/backend/tsconfig.json",
            "apps/web/next.config.js",
            "apps/web/package.json",
            "apps/web/public/favicon.ico",
            "apps/web/public/robots.txt",
            "apps/web/src/components/Button.tsx",
            "apps/web/src/components/Header.tsx",
            "apps/web/src/components/Layout.tsx",
            "apps/web/src/pages/_app.tsx",
            "apps/web/src/pages/api/health.ts",
            "apps/web/src/pages/index.tsx",
            "apps/web/src/styles/globals.css",
            "apps/web/tailwind.config.js",
            "apps/web/tsconfig.json",
            "docker-compose.yml",
            "docs/api-spec.json",
            "docs/architecture.md",
            "docs/setup.md",
            "infra/k8s/deployment.yaml",
            "infra/k8s/ingress.yaml",
            "infra/k8s/service.yaml",
            "infra/terraform/main.tf",
            "infra/terraform/providers.tf",
            "infra/terraform/variables.tf",
            "jest.config.js",
            "package.json",
            "packages/ui/package.json",
            "packages/ui/src/Card.tsx",
            "packages/ui/src/index.ts",
            "packages/ui/tsconfig.json",
            "packages/utils/package.json",
            "packages/utils/src/formatters.ts",
            "packages/utils/src/logger.ts",
            "packages/utils/test/formatters.test.ts",
            "packages/utils/tsconfig.json",
            "pnpm-lock.yaml",
            "pnpm-workspace.yaml",
            "README.md",
            "tsconfig.base.json",
            "turbo.json"
          ]
        },
        metadata: {
          frontend: {
            react: true,
            nextjs: true,
            angular: false,
            vue: true // Simulating a monorepo with multiple frameworks
          },
          backend: {
            express: false,
            nestjs: true,
            django: false,
            flask: false,
            fastapi: false
          },
          infrastructure: {
            docker: true,
            dockerCompose: true,
            terraform: true,
            ansible: false,
            kubernetes: true
          },
          packageManagers: {
            npm: false,
            pnpm: true,
            yarn: false
          },
          cicd: {
            githubActions: true,
            gitlabCI: false,
            circleCI: false
          },
          tests: {
            jest: true,
            cypress: true,
            playwright: false
          },
          languageSummary: {
            extensions: {
              ".ts": 18,
              ".tsx": 8,
              ".json": 12,
              ".yml": 4,
              ".md": 3,
              ".css": 1,
              ".tf": 3,
              "config": 5
            },
            percentages: {
              "TypeScript": "48.5%",
              "JSON": "22.1%",
              "React/TSX": "14.2%",
              "YAML": "7.3%",
              "Terraform": "5.1%",
              "Markdown": "2.8%"
            }
          }
        }
      };

      resolve(mockData);
    }, 1500);
  });
};