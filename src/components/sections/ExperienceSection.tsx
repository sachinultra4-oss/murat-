import { SITE_CONFIG } from '@/src/config/site';
import { Button } from '@/src/components/ui/button';

interface ExperienceSectionProps {
  onEnquireClick: () => void;
}

export function ExperienceSection({ onEnquireClick }: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="bg-[#FAF6EE] text-[#1F1D1B] py-20 md:py-28 lg:py-32"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="max-w-2xl mb-12 md:mb-16">
          <div className="w-12 h-px bg-[#B89B6A] mb-6" aria-hidden="true" />
          <h2
            id="experience-heading"
            className="font-display text-[36px] sm:text-[44px] md:text-[52px] font-medium leading-[1.06] tracking-[-0.02em] text-[#1F1D1B] mb-4"
          >
            The Experience
          </h2>
          <p className="text-[17px] text-[#1F1D1B]/80">
            From your very first message to the day you relive your wedding film together, our
            process stays calm, personal, and unhurried.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-7">
          {SITE_CONFIG.experienceSteps.map((step) => (
            <li
              key={step.numeral}
              className="pt-6 border-t border-[#B89B6A]"
            >
              <span className="block text-[14px] tabular-nums font-medium text-[#8A6F3F] mb-3">
                {step.numeral}
              </span>
              <h3 className="font-display text-[25px] md:text-[27px] font-medium leading-tight text-[#1F1D1B] mb-2.5">
                {step.title}
              </h3>
              <p className="text-[16px] leading-[1.6] text-[#1F1D1B]/80">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 md:mt-14">
          <Button type="button" variant="primary" size="lg" onClick={onEnquireClick}>
            Start Your Wedding Journey
          </Button>
        </div>
      </div>
    </section>
  );
}
