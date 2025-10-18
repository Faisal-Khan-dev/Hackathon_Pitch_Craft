import React, { useState } from "react";

const GeneratePage = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [branding, setBranding] = useState({
    name: "",
    tagline: "",
    pitch: "",
  });
  const [landingPageCode, setLandingPageCode] = useState("");
  const [iframeStatus, setIframeStatus] = useState(
    "Design generation is pending..."
  );
  const [copyMessage, setCopyMessage] = useState("Copy HTML Code");

  const API_KEY = "AIzaSyDEN5jNT31ag6m3tlCpY4H6w8ZqGjegdrA"; // Replace with your API key or leave for env injection
  const TEXT_MODEL = "gemini-2.5-flash-preview-09-2025";

  const fetchWithRetry = async (url, options, retries = 0) => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        const errorJson = await res.json();
        throw new Error(
          `HTTP ${res.status} - ${errorJson.error?.message || "Unknown Error"}`
        );
      }
      return res.json();
    } catch (err) {
      if (retries < 5) {
        const delay = 1000 * Math.pow(2, retries) + Math.random() * 1000;
        await new Promise((r) => setTimeout(r, delay));
        return fetchWithRetry(url, options, retries + 1);
      } else throw err;
    }
  };

  const handleGenerate = async () => {
    const userIdea = prompt.trim();
    if (!userIdea) return console.error("Please enter your startup idea.");

    setLoading(true);
    setIframeStatus("Starting generation...");
    setBranding({ name: "...", tagline: "...", pitch: "..." });
    setLandingPageCode("");
    setCopyMessage("Copy HTML Code");

    try {
      // --------------------
      // Phase 1: Branding
      // --------------------
      setIframeStatus("Phase 1/2: Generating Name, Tagline, and Pitch...");
      const brandingRes = await fetchWithRetry(
        `https://generativelanguage.googleapis.com/v1beta/models/${TEXT_MODEL}:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userIdea }] }],
            systemInstruction: {
              parts: [
                {
                  text: "You are a creative business strategist. Based on the user's idea, generate a modern, catchy, and professional startup name, a compelling one-sentence tagline, and a concise 2-3 line pitch. The output MUST be a JSON object conforming to the schema.",
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
        brandingRes.candidates?.[0]?.content?.parts?.[0]?.text || "{}"
      );

      if (!brandingJSON.name) throw new Error("Branding generation failed.");

      setBranding(brandingJSON);

      // --------------------
      // Phase 2: Landing Page HTML
      // --------------------
      setIframeStatus("Phase 2/2: Generating Landing Page...");
      const landingSystemPrompt = `You are an expert front-end developer. Generate a complete, single-file HTML document for a landing page. Use Tailwind CSS via CDN. Focus on the startup named: ${brandingJSON.name}, tagline: '${brandingJSON.tagline}', and pitch: '${brandingJSON.pitch}'. Include a hero section, features (3 points), testimonial/social proof, and a CTA button.`;

      const landingRes = await fetchWithRetry(
        `https://generativelanguage.googleapis.com/v1beta/models/${TEXT_MODEL}:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: "Generate the complete, runnable HTML code now." },
                ],
              },
            ],
            systemInstruction: { parts: [{ text: landingSystemPrompt }] },
          }),
        }
      );

      const htmlCode =
        landingRes.candidates?.[0]?.content?.parts?.[0]?.text || "";

      const cleanHTML = htmlCode
        .replace(/```(html)?\n/g, "")
        .replace(/```$/g, "")
        .trim();

      setLandingPageCode(cleanHTML);
      setIframeStatus(`Design generated for ${brandingJSON.name}.`);
    } catch (err) {
      console.error("Generation Error:", err);
      let statusMessage = `Error: ${err.message}`;
      if (err.message.includes("HTTP 429")) {
        statusMessage =
          "Quota Limit Reached (429). Please wait or enable billing for continuous access.";
      }
      setIframeStatus(statusMessage);
      setBranding({ name: "Error", tagline: "Error", pitch: "Error" });
    } finally {
      setLoading(false);
    }
  };

  const copyCodeToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(landingPageCode);
      setCopyMessage("Code Copied!");
      setTimeout(() => setCopyMessage("Copy HTML Code"), 3000);
    } catch {
      setCopyMessage("Failed to Copy!");
      setTimeout(() => setCopyMessage("Copy HTML Code"), 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 pt-24 relative">
      <div className="relative w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Generate Your Startup ✨
        </h1>
        <p className="text-slate-400 text-center mb-6">
          Enter your idea to get a brand identity and landing page preview.
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
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Generate Startup"
            )}
          </button>
        </div>

        {/* Branding */}
        <div className="border-b border-white/20 pb-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Brand Identity</h2>
          <div className="space-y-4 text-white text-sm sm:text-base">
            <p>
              <span className="font-semibold text-blue-400">Name:</span>{" "}
              <span className="font-extrabold text-lg">{branding.name}</span>
            </p>
            <p>
              <span className="font-semibold text-blue-400">Tagline:</span>{" "}
              <span className="italic">{branding.tagline}</span>
            </p>
            <p>
              <span className="font-semibold text-blue-400">Pitch:</span>{" "}
              {branding.pitch}
            </p>
          </div>
        </div>

        {/* Landing Page */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Landing Page Preview
          </h2>
          <div className="flex justify-end mb-3">
            <button
              onClick={copyCodeToClipboard}
              disabled={!landingPageCode || copyMessage === "Code Copied!"}
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-2xl disabled:bg-gray-400 transition duration-150"
            >
              {copyMessage}
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
