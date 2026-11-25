import { SITE_CONFIG } from '@/src/config/site';
import { SERVICE_MEDIA_SLOTS } from '@/src/config/media';
import { EditorialMediaFrame } from '@/src/components/EditorialMediaFrame';
import { Button } from '@/src/components/ui/button';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
  onEnquireClick: () => void;
}

export function ServicesSection({ onSelectService, onEnquireClick }: ServicesSectionProps) {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-[#F2EBDD] text-[#1F1D1B] py-20 md:py-28 lg:py-32"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="max-w-2xl mb-12 md:mb-14">
          <div className="w-12 h-px bg-[#B89B6A] mb-6" aria-hidden="true" />
          <h2
            id="services-heading"
            className="font-display text-[36px] sm:text-[44px] md:text-[52px] font-medium leading-[1.06] tracking-[-0.02em] text-[#1F1D1B] mb-4"
          >
            Our Services
          </h2>
          <p className="text-[17px] text-[#1F1D1B]/80">
            Thoughtfully tailored photography and cinematography across intimate ceremonies,
            pre-wedding journeys, and multi-day destination weddings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SITE_CONFIG.services.map((service) => {
            const slot = SERVICE_MEDIA_SLOTS[service.mediaSlotId];
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => onSelectService(service.title)}
                className="group text-left rounded-[4px] border border-[#B89B6A]/35 bg-[#FAF6EE] p-4 transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A6F3F]"
              >
                <EditorialMediaFrame
                  slot={slot}
                  className="aspect-[4/3] w-full"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  showSlotHint
                />
                <div className="pt-4 pb-1">
                  <div className="flex items-baseline justify-between gap-3 mb-1.5">
                    <h3 className="font-display text-[24px] md:text-[26px] font-medium leading-tight text-[#1F1D1B]">
                      {service.title}
                    </h3>
                    <span className="text-[13px] tabular-nums text-[#785E32] font-medium shrink-0">
                      {service.numeral}
                    </span>
                  </div>
                  <p className="text-[16px] leading-[1.55] text-[#1F1D1B]/80">
                    {service.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-12 md:mt-14">
          <Button type="button" variant="primary" size="lg" onClick={onEnquireClick}>
            Enquire About Our Services
          </Button>
        </div>
      </div>
    </section>
  );
}
