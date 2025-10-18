import React from "react";

const PromptForm = ({ prompt, setPrompt, loading, handleGenerate }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-8">
      <h1 className="text-3xl font-bold text-white mb-2 text-center">
        Generate Your Startup 🚀
      </h1>
      <p className="text-slate-400 mb-6 text-center">
        Enter your core concept and get a brand identity, logo, and landing page.
      </p>

      <div className="space-y-4">
        <textarea
          rows={3}
          placeholder="E.g., An app that uses AI to summarize meetings..."
          className="w-full p-4 bg-slate-800/50 border border-slate-600/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02]"
        >
          {loading ? "Generating..." : "Generate Startup"}
        </button>
      </div>
    </div>
  );
};

export default PromptForm;
