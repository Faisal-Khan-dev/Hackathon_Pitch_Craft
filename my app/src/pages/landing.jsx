import React from "react";
import { Link } from "react-router-dom";

const LandingPage = ({show}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-[pulse_3s_ease-in-out_infinite]" />
        <div
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl animate-[float_6s_ease-in-out_infinite]"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Hero Section */}
      <div className="min-h-screen relative z-10 flex flex-col items-center justify-center text-center px-6 py-32">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Welcome to PitchCraft 🚀
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl">
          Craft the perfect pitch, share your ideas, and collaborate
          effortlessly. Start your journey with us today!
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <Link
            to="/signup"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02]"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 px-6 py-24 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-12">Why PitchCraft?</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">
              Easy Collaboration
            </h3>
            <p className="text-slate-300">
              Work with your team seamlessly and get real-time feedback on every
              pitch.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">
              Templates & Guidance
            </h3>
            <p className="text-slate-300">
              Access professionally designed templates and tips to craft
              compelling pitches.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">
              Secure & Reliable
            </h3>
            <p className="text-slate-300">
              Your ideas are safe with us — secure cloud storage and encrypted
              collaboration.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-slate-400 border-t border-white/20">
        &copy; {new Date().getFullYear()} PitchCraft. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
