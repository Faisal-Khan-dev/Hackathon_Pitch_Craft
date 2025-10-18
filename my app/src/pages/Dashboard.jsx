import React, { useState } from "react";

const GeneratePage = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [branding, setBranding] = useState({
    name: "",
    tagline: "",
    pitch: "",
  });
  const [logoUrl, setLogoUrl] = useState("");
  const [landingPageCode, setLandingPageCode] = useState("");
  const [iframeStatus, setIframeStatus] = useState(
    "Design generation is pending..."
  );

  const API_KEY = "YOUR_API_KEY"; // Gemini / Google Generative Language API key
  const TEXT_MODEL = "gemini-2.5-flash-preview-09-2025";
  const IMAGE_MODEL = "imagen-3.0-generate-002";

  // --- Utility: Exponential backoff fetch ---
  const fetchWithRetry = async (url, options, retries = 0) => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    } catch (err) {
      if (retries < 5) {
        await new Promise((r) => setTimeout(r, 1000 * 2 ** retries));
        return fetchWithRetry(url, options, retries + 1);
      } else throw err;
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return alert("Please enter your startup idea first.");
    setLoading(true);
    setIframeStatus("Starting generation...");
    setBranding({ name: "...", tagline: "...", pitch: "..." });
    setLogoUrl("");
    setLandingPageCode("");

    try {
      // --------------------
      // Phase 1: Branding
      // --------------------
      setIframeStatus("Phase 1/3: Generating Name, Tagline, and Pitch...");
      const brandingRes = await fetchWithRetry(
        `https://generativelanguage.googleapis.com/v1beta/models/${TEXT_MODEL}:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: {
              parts: [
                {
                  text: "Generate a creative startup name, tagline, and 2-3 line pitch. Return JSON {name, tagline, pitch}.",
                },
              ],
            },
            generationConfig: {
              responseMimeType: "application/json",
              responseSchema: {
                type: "OBJECT",
                properties: {
                  name: { type: "STRING" },
                  tagline: { type: "STRING" },
                  pitch: { type: "STRING" },
                },
                required: ["name", "tagline", "pitch"],
              },
            },
          }),
        }
      );
      const brandingJSON = JSON.parse(
        brandingRes.candidates?.[0]?.content?.parts?.[0]?.text
      );
      setBranding(brandingJSON);

      // --------------------
      // Phase 2: Logo
      // --------------------
      setIframeStatus("Phase 2/3: Generating Logo...");
      const logoRes = await fetchWithRetry(
        `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:predict?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            instances: [
              {
                prompt: `Modern, minimalistic logo for '${brandingJSON.name}', representing '${prompt}', vector style, professional colors`,
              },
            ],
            parameters: { sampleCount: 1, aspectRatio: "1:1" },
          }),
        }
      );
      const logoBase64 = logoRes.predictions?.[0]?.bytesBase64Encoded;
      setLogoUrl(`data:image/png;base64,${logoBase64}`);

      // --------------------
      // Phase 3: Landing Page HTML
      // --------------------
      setIframeStatus("Phase 3/3: Generating Landing Page...");
      const landingRes = await fetchWithRetry(
        `https://generativelanguage.googleapis.com/v1beta/models/${TEXT_MODEL}:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: "Generate a complete Tailwind CSS HTML landing page.",
                  },
                ],
              },
            ],
            systemInstruction: {
              parts: [
                {
                  text: `You are a front-end expert. Create a responsive landing page for a startup named '${brandingJSON.name}' with tagline '${brandingJSON.tagline}' and pitch '${brandingJSON.pitch}'.`,
                },
              ],
            },
          }),
        }
      );
      const htmlCode =
        landingRes.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const cleanHTML = htmlCode
        .replace(/```(html)?/g, "")
        .replace(/```$/g, "")
        .trim();
      setLandingPageCode(cleanHTML);
      setIframeStatus(`Design generated for ${brandingJSON.name}.`);
    } catch (err) {
      console.error(err);
      setIframeStatus("Error during generation. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(landingPageCode);
    alert("HTML code copied!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 pt-24 relative">
      {/* Card */}
      <div className="relative w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Generate Your Startup ✨
        </h1>
        <p className="text-slate-400 text-center mb-6">
          Enter your idea below to get a brand identity, logo, and landing page
          preview.
        </p>

        {/* Prompt Form */}
        <div className="space-y-4 mb-8">
          <textarea
            rows={3}
            placeholder="E.g., An AI app that summarizes meetings..."
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

        {/* Branding */}
        <div className="border-b border-white/20 pb-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            1. Brand Identity & Logo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4 text-white">
              <p>
                <span className="font-semibold text-blue-400">Name:</span>{" "}
                {branding.name}
              </p>
              <p>
                <span className="font-semibold text-blue-400">Tagline:</span>{" "}
                {branding.tagline}
              </p>
              <p>
                <span className="font-semibold text-blue-400">Pitch:</span>{" "}
                {branding.pitch}
              </p>
            </div>
            <div className="md:col-span-1 flex justify-center items-center">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Startup Logo"
                  className="w-32 h-32 rounded-2xl shadow-lg border-2 border-white/20"
                />
              ) : (
                <span className="text-slate-400 p-2">Logo generating...</span>
              )}
            </div>
          </div>
        </div>

        {/* Landing Page */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            2. Landing Page Preview
          </h2>
          <div className="flex justify-end mb-3">
            <button
              onClick={copyCodeToClipboard}
              disabled={!landingPageCode}
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-2xl disabled:bg-gray-400"
            >
              Copy HTML Code
            </button>
          </div>
          <div className="aspect-video w-full border-4 border-white/20 rounded-2xl overflow-hidden shadow-xl bg-white/10">
            <iframe
              className="w-full h-full"
              sandbox="allow-scripts allow-same-origin"
              srcDoc={landingPageCode}
            ></iframe>
          </div>
          <p className="mt-2 text-sm text-slate-400 text-center">
            {iframeStatus}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneratePage;
