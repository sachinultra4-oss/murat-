import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG, buildWhatsAppUrl } from '@/src/config/site';
import { Button } from '@/src/components/ui/button';

interface FooterProps {
  onEnquireClick?: () => void;
  onServiceClick?: (title: string) => void;
}

export function Footer({ onEnquireClick, onServiceClick }: FooterProps) {
  const whatsappUrl = buildWhatsAppUrl();

  useEffect(() => {
    if (import.meta.env.DEV && !SITE_CONFIG.WHATSAPP_NUMBER.trim()) {
      console.warn(
        '[Muhurat Wedding] SITE_CONFIG.WHATSAPP_NUMBER is empty in src/config/site.ts. WhatsApp buttons are hidden until configured.',
      );
    }
  }, []);

  return (
    <footer
      id="site-footer"
      className="bg-[#FAF6EE] text-[#1F1D1B] border-t border-[#B89B6A]/45 pt-20 pb-12"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        {/* Closing Headline & CTA */}
        <div className="pb-16 border-b border-[#B89B6A]/35 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-[36px] sm:text-[46px] md:text-[56px] font-medium leading-[1.06] tracking-[-0.02em] text-[#1F1D1B]">
              Every Love Story Is Different. Let&apos;s Capture Yours.
            </h2>
          </div>
          <div className="shrink-0">
            {onEnquireClick ? (
              <Button type="button" variant="primary" size="lg" onClick={onEnquireClick}>
                Enquire Now
              </Button>
            ) : (
              <Link
                to="/#enquire"
                className="inline-flex items-center justify-center min-h-[48px] px-7 py-3.5 rounded-[4px] bg-[#1F1D1B] text-[#FAF6EE] text-[16px] font-medium hover:text-[#DFC698] transition-colors"
              >
                Enquire Now
              </Link>
            )}
          </div>
        </div>

        {/* Footer Columns */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-[#B89B6A]/30">
          <div className="md:col-span-5">
            <p className="font-display text-[24px] font-semibold tracking-[0.06em] uppercase text-[#1F1D1B] mb-3">
              {SITE_CONFIG.brandName}
            </p>
            <p className="text-[16px] leading-[1.6] text-[#1F1D1B]/80 max-w-sm mb-3">
              Wedding photography &amp; cinematography crafted around genuine emotions, sacred
              traditions, and timeless storytelling.
            </p>
            <p className="text-[14px] text-[#8A6F3F]">
              {SITE_CONFIG.regionsLine}
            </p>
          </div>

          <div className="md:col-span-4">
            <p className="text-[13px] tracking-[0.06em] uppercase text-[#8A6F3F] font-medium mb-4">
              Services
            </p>
            <ul className="space-y-2.5 text-[15px]">
              {SITE_CONFIG.services.map((service) => (
                <li key={service.id}>
                  {onServiceClick ? (
                    <button
                      type="button"
                      onClick={() => onServiceClick(service.title)}
                      className="text-[#1F1D1B]/85 hover:text-[#8A6F3F] transition-colors cursor-pointer text-left"
                    >
                      {service.title}
                    </button>
                  ) : (
                    <Link
                      to="/#services"
                      className="text-[#1F1D1B]/85 hover:text-[#8A6F3F] transition-colors"
                    >
                      {service.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[13px] tracking-[0.06em] uppercase text-[#8A6F3F] font-medium mb-4">
              Connect
            </p>
            <ul className="space-y-2.5 text-[15px]">
              <li>
                <a
                  href={SITE_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-underline min-h-[44px] inline-flex items-center text-[#1F1D1B] hover:text-[#8A6F3F]"
                >
                  Instagram (@muhuratwedding)
                </a>
              </li>
              {whatsappUrl ? (
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-underline min-h-[44px] inline-flex items-center text-[#1F1D1B] hover:text-[#8A6F3F]"
                  >
                    WhatsApp Consultation
                  </a>
                </li>
              ) : null}
              {import.meta.env.DEV && !whatsappUrl ? (
                <li className="text-[12px] text-[#8A6F3F] pt-1">
                  Dev note: Set WHATSAPP_NUMBER in src/config/site.ts to enable WhatsApp links.
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        {/* Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[14px] text-[#1F1D1B]/70">
          <p>© {new Date().getFullYear()} Muhurat Wedding. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/privacy" className="hover:text-[#1F1D1B] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#1F1D1B] transition-colors">
              Terms
            </Link>
            <Link to="/admin/login" className="hover:text-[#1F1D1B] transition-colors">
              Studio Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
