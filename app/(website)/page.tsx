import AboutSection from "@/components/home/about-section";
import HeroSection from "../../components/home/hero-section";
import LightProblemSolutions from "@/components/home/problem-solution";
import BlogsSection from "@/components/home/blogs-section";
import ServiceSection from "@/components/home/services-section";
import WhyChooseUs from "@/components/home/why-choose-us";  
import MagneticEnergySection from "@/components/home/magnetic-energy"
import PartnersSection from "@/components/home/partner-section";
import TestimonialSection from "@/components/home/testimonial-section";
import ContactSection from "@/components/home/contact-section";
import WorldWideMagEnergy from "@/components/home/worldwide-magEnergy";


export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection/>
      <WhyChooseUs/>
      <WorldWideMagEnergy/>
      <MagneticEnergySection/>
      <BlogsSection/>
      <LightProblemSolutions />
      <PartnersSection/>
      <ServiceSection/>
      <TestimonialSection/>
      <ContactSection/>
      
    </div>
  );  
}
