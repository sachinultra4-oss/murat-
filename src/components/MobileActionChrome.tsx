import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/src/config/site';
import { Button } from '@/src/components/ui/button';

interface MobileActionChromeProps {
  onCheckAvailability: () => void;
}

export function MobileActionChrome({ onCheckAvailability }: MobileActionChromeProps) {
  const [hideBottomBar, setHideBottomBar] = useState(false);
  const whatsappUrl = buildWhatsAppUrl();

  useEffect(() => {
    const targetIds = ['hero', 'enquire', 'site-footer'];
    const visibleMap = new Map<string, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleMap.set(entry.target.id, entry.isIntersecting);
        }
        const anyHiddenZoneVisible =
          Boolean(visibleMap.get('enquire')) ||
          Boolean(visibleMap.get('site-footer')) ||
          Boolean(visibleMap.get('hero'));
        setHideBottomBar(anyHiddenZoneVisible);
      },
      { threshold: 0.12 },
    );

    for (const id of targetIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Floating WhatsApp button (only rendered when WHATSAPP_NUMBER is configured) */}
      {whatsappUrl ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Muhurat Wedding on WhatsApp"
          className={`fixed right-4 md:right-6 z-40 min-w-[48px] min-h-[48px] px-4 py-3 rounded-[4px] bg-[#1F1D1B] text-[#FAF6EE] border border-[#B89B6A] inline-flex items-center gap-2 text-[14px] font-medium hover:text-[#DFC698] transition-all duration-200 ${
            hideBottomBar ? 'bottom-5' : 'bottom-20 md:bottom-6'
          }`}
        >
          <MessageCircle className="w-4 h-4 text-[#DFC698]" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      ) : null}

      {/* Mobile sticky bottom bar (< 15% viewport height, hides when hero, #enquire, or footer is visible) */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FAF6EE]/95 backdrop-blur-xs border-t border-[#B89B6A]/45 px-5 py-2.5 transition-transform duration-200 ${
          hideBottomBar ? 'translate-y-full pointer-events-none' : 'translate-y-0'
        }`}
        aria-hidden={hideBottomBar}
      >
        <Button
          type="button"
          variant="primary"
          className="w-full min-h-[44px]"
          onClick={onCheckAvailability}
          tabIndex={hideBottomBar ? -1 : 0}
        >
          Check Availability
        </Button>
      </div>
    </>
  );
}
