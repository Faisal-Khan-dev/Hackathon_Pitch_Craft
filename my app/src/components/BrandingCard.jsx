import React from "react";

const BrandingCard = ({ branding, logoUrl }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-8">
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
              className="w-32 h-32 rounded-2xl"
            />
          ) : (
            <span className="text-slate-400 p-2">Logo generating...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandingCard;
