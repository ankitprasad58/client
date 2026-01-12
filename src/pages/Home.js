import React from "react";
import {
  HeroSection,
  StatsSection,
  FeaturedPresets,
  BenefitsSection,
  CategoriesSection,
  TestimonialsSection,
  CTASection,
} from "../components/home";

const Home = () => {
  return (
    <div className="animate-fade-in">
      <HeroSection />
      <StatsSection />
      <FeaturedPresets />
      <BenefitsSection />
      <CategoriesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default Home;
