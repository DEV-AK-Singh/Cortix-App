export function formatToRepoAnalysis(repoUrl: string, data: any) {
    return {
        repoName: repoUrl,
        timestamp: new Date().toISOString(),
        structure: {
            root: data.structure.root,
            folders: data.structure.folders,
            files: data.structure.files,
        },
        metadata: {
            ...data.metadata,
            languageSummary: data.languages
        },
        response: data
    };
}
