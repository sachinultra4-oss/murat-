import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '@/src/components/Header';
import { HeroSection } from '@/src/components/sections/HeroSection';
import { EmotionalIntroSection } from '@/src/components/sections/EmotionalIntroSection';
import { FilmsSection } from '@/src/components/sections/FilmsSection';
import { ServicesSection } from '@/src/components/sections/ServicesSection';
import { GallerySection } from '@/src/components/sections/GallerySection';
import { WhySection } from '@/src/components/sections/WhySection';
import { ExperienceSection } from '@/src/components/sections/ExperienceSection';
import { EnquirySection } from '@/src/components/sections/EnquirySection';
import { Footer } from '@/src/components/Footer';
import { MobileActionChrome } from '@/src/components/MobileActionChrome';

export function LandingPage() {
  const [preselectedService, setPreselectedService] = useState<string | null>(null);
  const location = useLocation();

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const timer = setTimeout(() => scrollToSection(targetId), 80);
      return () => clearTimeout(timer);
    }
  }, [location.hash, scrollToSection]);

  const handleSelectService = useCallback(
    (serviceTitle: string) => {
      setPreselectedService(serviceTitle);
      scrollToSection('enquire');
    },
    [scrollToSection],
  );

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1F1D1B]">
      <Header variant="overlay" onEnquireClick={() => scrollToSection('enquire')} />

      <main id="main-content">
        <HeroSection
          onEnquireClick={() => scrollToSection('enquire')}
          onFilmsClick={() => scrollToSection('films')}
        />
        <EmotionalIntroSection />
        <FilmsSection onEnquireClick={() => scrollToSection('enquire')} />
        <ServicesSection
          onSelectService={handleSelectService}
          onEnquireClick={() => scrollToSection('enquire')}
        />
        <GallerySection />
        <WhySection />
        <ExperienceSection onEnquireClick={() => scrollToSection('enquire')} />
        <EnquirySection preselectedService={preselectedService} />
      </main>

      <Footer
        onEnquireClick={() => scrollToSection('enquire')}
        onServiceClick={handleSelectService}
      />

      <MobileActionChrome onCheckAvailability={() => scrollToSection('enquire')} />
    </div>
  );
}
