import React from "react";
import RepoSearch from "../components/RepoSearch";
import SummaryCard from "../components/SummaryCard";
import InfraCard from "../components/InfraCard";
import { useApi } from "../hooks/useApi";
import { AlertCircle } from "lucide-react";
import filesData from "../dummyData/files-data.json";
import infraData from "../dummyData/infra-data.json";

const Analyzer: React.FC = () => {
  let { data, loading, error, execute } = useApi(); 
  
  const [step, setStep] = React.useState("Start");

  const handleSearch = async (repoPath: string) => {
    execute("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { repoUrl: repoPath },
    }).then((res) => {
      console.log(res);
      setStep("Analyze");
    }).catch((err) => {
      console.error(err);
    });
  };

  const handleGenerate = async () => { 
    execute("/api/infra-gen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { repoMeta: data },
    }).then((res) => { 
      console.log(res);
      setStep("Generate");
    }).catch((err) => {
      console.error(err);
    });
  };

  const handleDownload = async () => {
    alert("Downloading...");
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center w-full min-h-[80vh] animate-fade-in">
      <RepoSearch
        onSearch={handleSearch}
        onGenerate={handleGenerate}
        onDownload={handleDownload}
        step={step}
        loading={loading}
      />
      <div className="w-full mt-8 mb-16 flex-1">
        {error && (
          <div className="max-w-md mx-auto p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 flex items-center gap-3 animate-fade-in backdrop-blur-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="font-mono text-sm">{error}</p>
          </div>
        )}

        {!loading && !data && !error && (
          <div className="flex flex-col items-center justify-center mt-12 opacity-40 pointer-events-none select-none relative scale-75 md:scale-100">
            <div className="relative">
              <div className="w-96 h-96 rounded-full border-2 border-dashed border-indigo-500/70 flex items-center justify-center animate-[spin_30s_linear_infinite]"></div>
              <div className="absolute inset-0 m-auto w-72 h-72 rounded-full border-2 border-dotted border-indigo-500/80 animate-[spin_20s_linear_infinite_reverse]"></div>
              <div className="absolute inset-0 m-auto w-48 h-48 rounded-full border border-indigo-500/90 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_10px_currentColor] animate-ping"></div>
              </div>
            </div>
            <div className="absolute bottom-[-60px] flex flex-col items-center gap-3">
              <p className="font-mono text-[10px] tracking-[0.3em] text-gray-500">
                AWAITING INPUT STREAM
              </p>
            </div>
          </div>
        )}

        {data && !loading && step === "Analyze" && <SummaryCard data={data} />}

        {data && !loading && step === "Generate" && (
          <InfraCard
            files={[
              {
                name: "docker-compose.yml",
                content: data.generated.docker_compose,
                language: "yaml",
              },
              {
                name: "Dockerfile",
                content: data.generated.dockerfile,
                language: "dockerfile",
              },
              {
                name: "infra.bash",
                content: data.generated.infra_bash,
                language: "bash",
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default Analyzer;
