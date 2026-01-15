import React, { useState, useEffect } from "react";
import {
  FaStar,
  FaQuoteLeft,
  FaRupeeSign,
  FaCheckCircle,
} from "react-icons/fa";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Professional Video Editor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    text: "Bought Adobe Suite for just ₹1499! Saved ₹11,000. Working flawlessly for 6 months now. Support team helped me install everything.",
    rating: 5,
    purchase: "Adobe Master Collection",
    savings: "₹11,500",
    verified: true,
  },
  {
    name: "Priya Patel",
    role: "College Student",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    text: "Got all my semester notes here. PDFs were perfectly organized. Scored 9.2 GPA this semester! Best investment ever.",
    rating: 5,
    purchase: "Engineering Notes Bundle",
    savings: "₹8,000",
    verified: true,
  },
  {
    name: "Arjun Verma",
    role: "Game Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
    text: "Unity assets pack saved my indie game project. Professional quality at 1/10th the price. Customer support is amazing!",
    rating: 5,
    purchase: "Game Assets Pack",
    savings: "₹15,000",
    verified: true,
  },
  {
    name: "Sneha Reddy",
    role: "Content Creator",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
    text: "Video presets transformed my YouTube channel. Engagement doubled in 2 weeks. The LUTs are studio-quality!",
    rating: 5,
    purchase: "Video Preset Pack",
    savings: "₹6,000",
    verified: true,
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Real Stories,
            </span>{" "}
            Real Savings
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join thousands who saved lakhs while getting premium digital
            products
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-white/5 rounded-2xl">
            <div className="text-3xl font-black text-yellow-400">₹4.2Cr+</div>
            <div className="text-gray-400">Total Savings</div>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-2xl">
            <div className="text-3xl font-black text-green-400">10K+</div>
            <div className="text-gray-400">Happy Customers</div>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-2xl">
            <div className="text-3xl font-black text-blue-400">98.7%</div>
            <div className="text-gray-400">Satisfaction Rate</div>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-2xl">
            <div className="text-3xl font-black text-purple-400">24/7</div>
            <div className="text-gray-400">Support Available</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border ${
                index === activeIndex
                  ? "border-yellow-500 shadow-2xl shadow-yellow-500/20"
                  : "border-gray-700"
              } transition-all duration-500`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full border-2 border-yellow-500"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-xl">{testimonial.name}</h3>
                      {testimonial.verified && (
                        <FaCheckCircle className="text-green-400" />
                      )}
                    </div>
                    <p className="text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex items-center text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="relative mb-8">
                <FaQuoteLeft className="text-4xl text-yellow-500/30 mb-4" />
                <p className="text-gray-300 text-lg italic pl-10">
                  "{testimonial.text}"
                </p>
              </div>

              {/* Purchase Info */}
              <div className="bg-gray-900/50 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-400">Purchased</div>
                    <div className="font-bold">{testimonial.purchase}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Total Savings</div>
                    <div className="font-bold text-green-400 flex items-center">
                      <FaRupeeSign />
                      {testimonial.savings}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
