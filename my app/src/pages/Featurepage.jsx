import React from "react";

const FeaturePage = () => {
  const features = [
    {
      title: "Easy Collaboration",
      description:
        "Work with your team seamlessly and get real-time feedback on every pitch.",
      icon: "🤝",
    },
    {
      title: "Templates & Guidance",
      description:
        "Access professionally designed templates and tips to craft compelling pitches.",
      icon: "📄",
    },
    {
      title: "Secure & Reliable",
      description:
        "Your ideas are safe with us — secure cloud storage and encrypted collaboration.",
      icon: "🔒",
    },
    {
      title: "AI-Powered Assistance",
      description:
        "Get intelligent suggestions to enhance your pitch and make it more compelling.",
      icon: "🤖",
    },
    {
      title: "Analytics & Insights",
      description:
        "Track engagement and performance of your pitches with actionable analytics.",
      icon: "📊",
    },
    {
      title: "Cross-Platform Access",
      description:
        "Access PitchCraft from any device — web, tablet, or mobile.",
      icon: "🌐",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden py-24 px-6">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-white mb-4">Features 🚀</h1>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Discover the tools that make PitchCraft your ultimate pitch creation
          platform.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 hover:scale-105 transform transition-all duration-300"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h2 className="text-xl font-semibold text-white mb-2">
              {feature.title}
            </h2>
            <p className="text-slate-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturePage;
