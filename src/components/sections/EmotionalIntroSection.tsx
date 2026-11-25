import { INTRO_PHOTOS } from '@/src/config/media';
import { EditorialMediaFrame } from '@/src/components/EditorialMediaFrame';

export function EmotionalIntroSection() {
  const [first, second, third] = INTRO_PHOTOS;

  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="bg-[#FAF6EE] text-[#1F1D1B] py-20 md:py-28 lg:py-32"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Editorial Lead Copy */}
          <div className="lg:col-span-5">
            <div className="w-12 h-px bg-[#B89B6A] mb-6" aria-hidden="true" />
            <h2
              id="story-heading"
              className="font-display text-[34px] sm:text-[42px] md:text-[48px] font-medium leading-[1.08] tracking-[-0.02em] text-[#1F1D1B] mb-6"
            >
              Not Just Wedding Photographs. Memories That Live Forever.
            </h2>

            <div className="space-y-4 text-[17px] leading-[1.7] text-[#1F1D1B]/85">
              <p>
                Long after the garlands fade and the music quiets, what remains are the unscripted
                glances, trembling hands during sacred rituals, and the warmth of two families
                becoming one.
              </p>
              <p>
                We move gently through every celebration—attentive to quiet family moments,
                treasured heirloom details, and the spontaneous joy that makes your love story
                unmistakably yours.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#B89B6A]/40">
              <p className="text-[14px] tracking-[0.04em] text-[#8A6F3F] font-medium">
                Genuine emotions · Sacred traditions · Unscripted celebrations
              </p>
            </div>
          </div>

          {/* Asymmetric Editorial Photography Trio (no captions under photos) */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4 md:gap-5 items-start">
            <div className="col-span-7 group">
              <EditorialMediaFrame
                slot={first}
                className="aspect-[4/5]"
                sizes="(max-width: 768px) 60vw, 35vw"
              />
            </div>
            <div className="col-span-5 flex flex-col gap-4 md:gap-5 pt-6 md:pt-12">
              <div className="group">
                <EditorialMediaFrame
                  slot={second}
                  className="aspect-square"
                  sizes="(max-width: 768px) 40vw, 25vw"
                />
              </div>
              <div className="group">
                <EditorialMediaFrame
                  slot={third}
                  className="aspect-[3/4]"
                  sizes="(max-width: 768px) 40vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
