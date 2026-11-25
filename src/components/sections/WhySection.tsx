import { SITE_CONFIG } from '@/src/config/site';

export function WhySection() {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="bg-[#F2EBDD] text-[#1F1D1B] py-20 md:py-28 lg:py-32"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <div className="w-12 h-px bg-[#B89B6A] mb-6" aria-hidden="true" />
            <h2
              id="why-heading"
              className="font-display text-[36px] sm:text-[44px] md:text-[50px] font-medium leading-[1.08] tracking-[-0.02em] text-[#1F1D1B]"
            >
              Because Your Wedding Deserves More Than Ordinary.
            </h2>
          </div>

          <div className="lg:col-span-7 divide-y divide-[#B89B6A]/45 border-t border-b border-[#B89B6A]/45">
            {SITE_CONFIG.whyPoints.map((point) => (
              <div
                key={point.numeral}
                className="py-6 md:py-7 grid grid-cols-12 gap-4 items-baseline"
              >
                <span className="col-span-2 sm:col-span-1 text-[14px] tabular-nums font-medium text-[#785E32]">
                  {point.numeral}
                </span>
                <div className="col-span-10 sm:col-span-11">
                  <h3 className="font-display text-[24px] md:text-[26px] font-medium leading-snug text-[#1F1D1B] mb-1">
                    {point.title}
                  </h3>
                  <p className="text-[16px] md:text-[17px] leading-[1.6] text-[#1F1D1B]/80">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
