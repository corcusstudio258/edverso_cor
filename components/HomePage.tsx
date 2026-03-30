// components/pages/HomePage.tsx

import CollegesSection from "./sections/CollegesSection";
import ContactSection from "./sections/ContactSection";
import CTASection from "./sections/CTASection";
import FeaturesSection from "./sections/FeaturesSection";
import HeroSection from "./sections/HeroSection";
import StudentsSection from "./sections/StudentsSection";
import TestimonialsSection from "./sections/TestimonialsSection";

const HomePage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <HeroSection />
      <FeaturesSection/>
      <StudentsSection />
      <CollegesSection />
      <CTASection />
      <TestimonialsSection/>
      <ContactSection/>
    </div>
  );
};

export default HomePage;