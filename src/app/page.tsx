import React from "react";
import HeroSection from "@/components/home/HeroSection";
import CompanyIntro from "@/components/home/CompanyIntro";
import ServicesGrid from "@/components/home/ServicesGrid";
import ScopeEstimatorSection from "@/components/home/ScopeEstimatorSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import WhoWeServe from "@/components/home/WhoWeServe";
import WorkingProcess from "@/components/home/WorkingProcess";
import EngagementModels from "@/components/home/EngagementModels";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FaqSection from "@/components/home/FaqSection";
import FinalCta from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 2. Hero Section with Technology Ecosystem Hub */}
      <HeroSection />

      {/* 3. Company Introduction & Trust Strip */}
      <CompanyIntro />

      {/* 4. Our Core Capabilities (All 8 in exact required order) */}
      <ServicesGrid />

      {/* Interactive Scope Estimator */}
      <ScopeEstimatorSection />

      {/* 5. Why Choose Us / The NIYAN Standard */}
      <WhyChooseUs />

      {/* 6. Featured Projects & Demos */}
      <FeaturedProjects />

      {/* 7. Who We Serve */}
      <WhoWeServe />

      {/* 8. Our Working Process (From Idea to Production) */}
      <WorkingProcess />

      {/* 9. Engagement Models (No public prices) */}
      <EngagementModels />

      {/* 10. Testimonials */}
      <TestimonialsSection />

      {/* 11. Frequently Asked Questions */}
      <FaqSection />

      {/* 12. Final CTA & Direct Contact Transformation Desk */}
      <FinalCta />
    </div>
  );
}
