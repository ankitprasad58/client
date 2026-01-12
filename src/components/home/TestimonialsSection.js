import React, { useState, useEffect } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import aditya from "../../assets/Aditya.jpg";

const testimonials = [
  {
    name: "Aditya Shrivas",
    role: "YouTuber, 500K Subs",
    image: aditya,
    text: "These presets saved me 10+ hours every week. My videos look cinematic now!",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Wedding Photographer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Best investment for my photography business. Clients love the results!",
    rating: 5,
  },
  {
    name: "Arjun Verma",
    role: "Music Producer",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    text: "The audio presets are incredible. Professional quality at affordable price.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gray-900 text-white -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Loved by <span className="text-purple-400">10,000+</span> Creators
        </h2>

        <div className="relative">
          <FaQuoteLeft className="text-4xl text-purple-500/30 absolute -top-4 left-0" />
          <div className="bg-gray-800 rounded-2xl p-8 md:p-12">
            <p className="text-xl md:text-2xl text-gray-300 mb-8 italic">
              "{testimonials[currentTestimonial].text}"
            </p>
            <div className="flex items-center justify-center gap-4">
              <img
                src={testimonials[currentTestimonial].image}
                alt={testimonials[currentTestimonial].name}
                className="w-14 h-14 rounded-full border-2 border-purple-500 object-cover"
              />
              <div className="text-left">
                <div className="font-bold">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-gray-400 text-sm">
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
              <div className="flex text-yellow-400 ml-4">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i) => (
                    <FaStar key={i} />
                  )
                )}
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? "bg-purple-500" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
