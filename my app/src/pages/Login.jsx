import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../components/TextField";
import ButtonCmp from "../components/ButtonCmp";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const LoginHandler = async () => {
    try {
      setLoading(true);
      const response = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("uid", response.user.uid);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden p-6">
      {/* 🌈 Background animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-[pulse_3s_ease-in-out_infinite]" />
        <div
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl animate-[float_6s_ease-in-out_infinite]"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* 🧭 Auth Card */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
        {/* 🔷 Logo / Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome Back 👋
          </h1>
          <p className="text-slate-400">Login to your PitchCraft account</p>
        </div>

        {/* 📝 Login Form */}
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            LoginHandler();
          }}
        >
          <TextField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full px-4 py-4 bg-slate-800/50 border border-slate-600/50 rounded-2xl text-white 
            placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <TextField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-full px-4 py-4 bg-slate-800/50 border border-slate-600/50 rounded-2xl text-white 
            placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <p className="text-sm text-slate-400 text-center">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              Sign up
            </Link>
          </p>

          <ButtonCmp
            type="submit"
            title={loading ? "Logging in..." : "Login"}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
            text-white font-semibold py-3 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
