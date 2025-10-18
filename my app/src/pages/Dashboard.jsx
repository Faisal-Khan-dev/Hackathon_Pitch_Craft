import React, { useState } from "react";

const Dashboard = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    setLoading(true);
    setResult("");

    try {
      // Simulate API call (replace this with real API call)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock result
      setResult(`Generated output for: "${prompt}"`);
    } catch (error) {
      setResult("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-start pt-24 px-6 relative">
      {/* Form Card */}
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          Generate Something ✨
        </h1>
        <p className="text-slate-400 text-center mb-6">
          Enter your prompt below and see what magic happens!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            placeholder="Type your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            className="w-full px-4 py-4 bg-slate-800/50 border border-slate-600/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02]"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>

        {/* Result */}
        {result && (
          <div className="mt-6 bg-slate-800/50 p-6 rounded-2xl text-white border border-white/20">
            <h2 className="font-semibold mb-2">Result:</h2>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
