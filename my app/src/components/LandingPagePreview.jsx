import React from "react";

const LandingPagePreview = ({ landingPageCode, iframeStatus }) => {
  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(landingPageCode);
    alert("HTML code copied to clipboard!");
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-4">2. Landing Page Design (Preview)</h2>
      <div className="flex justify-end mb-3">
        <button
          onClick={copyCodeToClipboard}
          disabled={!landingPageCode}
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-2xl disabled:bg-gray-400"
        >
          Copy HTML Code
        </button>
      </div>
      <div className="aspect-video w-full border-4 border-slate-600 rounded-2xl overflow-hidden shadow-xl bg-white">
        <iframe
          className="w-full h-full"
          sandbox="allow-scripts allow-same-origin"
          srcDoc={landingPageCode}
        />
      </div>
      <p className="mt-2 text-sm text-slate-400 text-center">{iframeStatus}</p>
    </div>
  );
};

export default LandingPagePreview;
