import { inspectRepo } from "aks-repo-inspector";

export async function inspectRepositoryService(repoUrl: string, flags: any = {}) {
    const defaultFlags = {
        structure: true,
        languages: true,
        metadata: true,
        ext: true,
        summary: true
    };

    const finalFlags = { ...defaultFlags, ...flags };

    const result = await inspectRepo(repoUrl, finalFlags);
    return result;
}
