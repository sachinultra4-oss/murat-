import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GALLERY_SLOTS } from '@/src/config/media';
import { EditorialMediaFrame } from '@/src/components/EditorialMediaFrame';

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
    requestAnimationFrame(() => {
      lastTriggerRef.current?.focus();
    });
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev - 1 + GALLERY_SLOTS.length) % GALLERY_SLOTS.length,
    );
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev + 1) % GALLERY_SLOTS.length,
    );
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNext();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, closeLightbox, showPrev, showNext]);

  const activeSlot = activeIndex !== null ? GALLERY_SLOTS[activeIndex] : null;

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="bg-[#FAF6EE] text-[#1F1D1B] py-20 md:py-28 lg:py-32"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
          <div>
            <div className="w-12 h-px bg-[#B89B6A] mb-6" aria-hidden="true" />
            <h2
              id="gallery-heading"
              className="font-display text-[36px] sm:text-[44px] md:text-[52px] font-medium leading-[1.06] tracking-[-0.02em] text-[#1F1D1B]"
            >
              Real Weddings
            </h2>
          </div>
          <p className="text-[17px] text-[#1F1D1B]/78 max-w-md">
            Portraits, sacred rituals, haldi laughter, family embraces, and destination celebrations.
          </p>
        </div>

        {/* Asymmetric Masonry Grid — zero captions under photos */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {GALLERY_SLOTS.map((slot, index) => (
            <button
              key={slot.id}
              type="button"
              onClick={(e) => {
                lastTriggerRef.current = e.currentTarget;
                setActiveIndex(index);
              }}
              aria-label={`Open ${slot.categoryLabel} photograph: ${slot.alt}`}
              className="group block w-full break-inside-avoid rounded-[4px] overflow-hidden text-left cursor-pointer transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A6F3F]"
            >
              <EditorialMediaFrame
                slot={slot}
                className={slot.aspectClass ?? 'aspect-[4/5]'}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                showSlotHint
              />
            </button>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox */}
      {activeSlot && activeIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Wedding photograph ${activeIndex + 1} of ${GALLERY_SLOTS.length}`}
          className="fixed inset-0 z-50 bg-[#1F1D1B]/95 text-[#FAF6EE] flex flex-col justify-between p-4 md:p-8"
          onTouchStart={(e) => {
            touchStartX.current = e.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
            touchStartX.current = null;
            if (delta > 45) showPrev();
            if (delta < -45) showNext();
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <span className="text-[14px] tabular-nums tracking-[0.04em] text-[#E4CFA8]">
              {String(activeIndex + 1).padStart(2, '0')} / {String(GALLERY_SLOTS.length).padStart(2, '0')}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeLightbox}
              aria-label="Close gallery lightbox"
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-[4px] border border-[#FAF6EE]/30 text-[#FAF6EE] hover:border-[#B89B6A] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4 min-h-0">
            <button
              type="button"
              onClick={showPrev}
              aria-label="Previous photograph"
              className="hidden sm:inline-flex min-w-[44px] min-h-[44px] items-center justify-center rounded-[4px] border border-[#FAF6EE]/25 text-[#FAF6EE] hover:border-[#B89B6A] cursor-pointer mr-4 shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="max-h-full max-w-4xl w-full h-full flex items-center justify-center">
              <EditorialMediaFrame
                slot={activeSlot}
                className="max-h-[75vh] w-auto max-w-full aspect-auto border-[#B89B6A]/40"
                imageClassName="max-h-[75vh] w-auto object-contain scale-100 group-hover:scale-100"
                priority
                showSlotHint
              />
            </div>

            <button
              type="button"
              onClick={showNext}
              aria-label="Next photograph"
              className="hidden sm:inline-flex min-w-[44px] min-h-[44px] items-center justify-center rounded-[4px] border border-[#FAF6EE]/25 text-[#FAF6EE] hover:border-[#B89B6A] cursor-pointer ml-4 shrink-0"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex sm:hidden items-center justify-center gap-4">
            <button
              type="button"
              onClick={showPrev}
              aria-label="Previous photograph"
              className="min-w-[44px] min-h-[44px] px-4 inline-flex items-center justify-center rounded-[4px] border border-[#FAF6EE]/30 text-[#FAF6EE]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Next photograph"
              className="min-w-[44px] min-h-[44px] px-4 inline-flex items-center justify-center rounded-[4px] border border-[#FAF6EE]/30 text-[#FAF6EE]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
