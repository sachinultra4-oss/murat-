import { useEffect, useState } from 'react';
import { HERO_MEDIA } from '@/src/config/media';
import { SITE_CONFIG } from '@/src/config/site';
import { Button } from '@/src/components/ui/button';

interface HeroSectionProps {
  onEnquireClick: () => void;
  onFilmsClick: () => void;
}

export function HeroSection({ onEnquireClick, onFilmsClick }: HeroSectionProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Muhurat Wedding Introduction"
      className="relative min-h-[100svh] w-full flex items-end md:items-center overflow-hidden bg-[#1F1D1B] text-[#FAF6EE]"
    >
      {/* Background poster with slow Ken Burns + optional supplied video */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src={HERO_MEDIA.posterSrc}
          alt=""
          width={HERO_MEDIA.width}
          height={HERO_MEDIA.height}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center ${
            !prefersReducedMotion ? 'hero-ken-burns' : ''
          }`}
        />

        {!prefersReducedMotion && HERO_MEDIA.videoSrc ? (
          <video
            key={HERO_MEDIA.videoSrc}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={HERO_MEDIA.posterSrc}
            onCanPlay={() => setVideoReady(true)}
            aria-hidden="true"
          >
            <source src={HERO_MEDIA.videoSrc} type="video/mp4" />
          </video>
        ) : null}

        {/* Measured contrast scrim for 4.5:1+ legibility across mobile and desktop */}
        <div className="absolute inset-0 bg-[#1F1D1B]/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 md:px-10 pt-28 pb-24 md:py-32">
        <div className="max-w-2xl hero-enter">
          <p className="text-[13px] md:text-[14px] tracking-[0.06em] uppercase text-[#E4CFA8] mb-5">
            {SITE_CONFIG.tagline}
          </p>

          <h1 className="font-display text-[44px] sm:text-[56px] md:text-[68px] lg:text-[76px] font-medium leading-[1.03] tracking-[-0.02em] text-[#FAF6EE] mb-6">
            Your Story. Your Moments. Forever.
          </h1>

          <p className="text-[17px] md:text-[19px] leading-[1.6] text-[#FAF6EE]/90 max-w-xl mb-9">
            Every wedding holds a thousand beautiful moments. We capture the emotions, traditions
            and little details that make your story uniquely yours.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-7">
            <Button
              type="button"
              variant="primaryOnDark"
              size="lg"
              onClick={onEnquireClick}
              className="w-full sm:w-auto"
            >
              Check Your Wedding Date
            </Button>

            <button
              type="button"
              onClick={onFilmsClick}
              className="editorial-underline min-h-[44px] px-1 py-2 text-[16px] font-medium text-[#FAF6EE] hover:text-[#E4CFA8] transition-colors cursor-pointer self-start sm:self-auto"
            >
              Explore Our Films
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
