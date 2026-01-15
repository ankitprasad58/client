import { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";

const HeroSection = () => {
  const [timer, setTimer] = useState(86400); // 24 hours in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const psychologicalTriggers = [
    {
      icon: "🔥",
      text: "🔥 TODAY ONLY: 500+ Creators Bought",
      highlight: true,
    },
    { icon: "🎁", text: "First 100 buyers gets exciting free presets" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 animate-float">
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl rotate-12">
          <span className="text-2xl">💎</span>
        </div>
      </div>
      <div className="absolute bottom-20 right-10 animate-float delay-1000">
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl -rotate-12">
          <span className="text-2xl">🎯</span>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
        <div className="text-center">
          {/* Scarcity Trigger */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-full mb-6 animate-pulse">
            <FaClock className="animate-spin" />
            <span className="font-bold">LIMITED OFFER ENDS IN:</span>
            <span className="font-mono font-bold bg-black/30 px-3 py-1 rounded">
              {formatTime(timer)}
            </span>
          </div>

          {/* FOMO Elements */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {psychologicalTriggers.map((trigger, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  trigger.highlight
                    ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                    : "bg-white/5"
                }`}
              >
                <span>{trigger.icon}</span>
                <span className="text-sm font-medium">{trigger.text}</span>
              </div>
            ))}
          </div>

          {/* Main Headline with Emotional Triggers */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              STOP WASTING TIME
            </span>
            <span className="block text-3xl md:text-5xl font-bold text-gray-300 mt-4">
              Get The Exact Tools Top Creators Use
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent font-bold">
              10,467 creators
            </span>{" "}
            transformed their workflow this month.{" "}
            <span className="text-yellow-300">Will you be next?</span>
          </p>

          {/* Social Proof Bar */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="text-lg font-bold">✨ 4.9/5 Rating</div>
                <div className="text-sm text-gray-400">
                  Based on 2,847 reviews
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">🚀 Lifetime Access</div>
                <div className="text-sm text-gray-400">Instant download</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
