// import React, { useState } from 'react';
// import RepoSearch from '../components/RepoSearch';
// import SummaryCard from '../components/SummaryCard';
// import { fetchRepoData } from '../services/mockGithubService';
// import { AnalysisState } from '../types';
// import { AlertCircle } from 'lucide-react';

// const Analyzer: React.FC = () => {
//   const [state, setState] = useState<AnalysisState>({
//     loading: false,
//     data: null,
//     error: null,
//   });

//   const handleSearch = async (repoPath: string) => {
//     setState((prev) => ({ ...prev, loading: true, error: null, data: null }));
    
//     try {
//       const data = await fetchRepoData(repoPath);
//       setState({
//         loading: false,
//         data,
//         error: null,
//       });
//     } catch (err: unknown) {
//       let errorMessage = 'An unexpected error occurred';
//       if (err instanceof Error) {
//         errorMessage = err.message;
//       }
//       setState({
//         loading: false,
//         data: null,
//         error: errorMessage,
//       });
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 flex flex-col items-center w-full min-h-[80vh] animate-fade-in">
      
//       <RepoSearch onSearch={handleSearch} loading={state.loading} />

//       <div className="w-full mt-8 flex-1">
//         {state.error && (
//           <div className="max-w-md mx-auto p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 flex items-center gap-3 animate-fade-in backdrop-blur-sm">
//             <AlertCircle className="w-5 h-5 flex-shrink-0" />
//             <p className="font-mono text-sm">{state.error}</p>
//           </div>
//         )}

//         {!state.loading && !state.data && !state.error && (
//           <div className="flex flex-col items-center justify-center mt-20 opacity-40 pointer-events-none select-none relative scale-75 md:scale-100">
//             {/* Decorative Central HUD */}
//             <div className="relative">
//               <div className="w-96 h-96 rounded-full border-2 border-dashed border-indigo-500/70 dark:border-indigo-500/70 flex items-center justify-center animate-[spin_30s_linear_infinite]"></div>
              
//               <div className="absolute inset-0 m-auto w-72 h-72 rounded-full border-2 border-dotted border-indigo-500/80 dark:border-indigo-500/80 animate-[spin_20s_linear_infinite_reverse]"></div>
              
//               <div className="absolute inset-0 m-auto w-48 h-48 rounded-full border border-indigo-500/90 dark:border-indigo-500/90 flex items-center justify-center">
//                  <div className="w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_10px_currentColor] animate-ping"></div>
//               </div>
//             </div>
            
//             <div className="absolute bottom-[-60px] flex flex-col items-center gap-3">
//               <p className="font-mono text-[10px] tracking-[0.3em] text-gray-500 dark:text-gray-600">AWAITING INPUT STREAM</p>
//             </div>
//           </div>
//         )}

//         {state.data && !state.loading && (
//           <SummaryCard data={state.data} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Analyzer;


import React from "react";
import RepoSearch from "../components/RepoSearch";
import SummaryCard from "../components/SummaryCard";
import { useApi } from "../hooks/useApi";
import { AlertCircle } from "lucide-react";

const Analyzer: React.FC = () => {
  const { data, loading, error, execute } = useApi();

  const handleSearch = async (repoPath: string) => { 
    execute("http://localhost:5000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { repoUrl: repoPath },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center w-full min-h-[80vh] animate-fade-in">
      
      <RepoSearch onSearch={handleSearch} loading={loading} />

      <div className="w-full mt-8 flex-1">
        {error && (
          <div className="max-w-md mx-auto p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 flex items-center gap-3 animate-fade-in backdrop-blur-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="font-mono text-sm">{error}</p>
          </div>
        )}

        {!loading && !data && !error && (
          <div className="flex flex-col items-center justify-center mt-20 opacity-40 pointer-events-none select-none relative scale-75 md:scale-100">
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

        {data && !loading && (
          <SummaryCard data={data} />
        )}
      </div>
    </div>
  );
};

export default Analyzer;

