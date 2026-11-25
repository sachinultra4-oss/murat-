import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '@/src/config/site';
import { Button } from '@/src/components/ui/button';

interface HeaderProps {
  onEnquireClick?: () => void;
  variant?: 'overlay' | 'solid';
}

export function Header({ onEnquireClick, variant = 'overlay' }: HeaderProps) {
  const isOverlay = variant === 'overlay';

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-[4px] focus:bg-[#1F1D1B] focus:text-[#FAF6EE] focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>
      <header
        className={
          isOverlay
            ? 'absolute top-0 left-0 right-0 z-30 border-b border-[#FAF6EE]/15'
            : 'sticky top-0 z-30 bg-[#FAF6EE]/95 backdrop-blur-xs border-b border-[#B89B6A]/30'
        }
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 h-16 md:h-20 flex items-center justify-between gap-4">
          <Link
            to="/"
            className={
              isOverlay
                ? 'font-display text-[20px] md:text-[24px] font-semibold tracking-[0.06em] uppercase text-[#FAF6EE] whitespace-nowrap shrink-0'
                : 'font-display text-[20px] md:text-[24px] font-semibold tracking-[0.06em] uppercase text-[#1F1D1B] whitespace-nowrap shrink-0'
            }
          >
            {SITE_CONFIG.brandName}
          </Link>

          {onEnquireClick ? (
            <Button
              type="button"
              variant={isOverlay ? 'primaryOnDark' : 'primary'}
              size="sm"
              onClick={onEnquireClick}
              className="text-[13px] md:text-[14px] px-4 md:px-5"
            >
              Check Your Wedding Date
            </Button>
          ) : (
            <Link
              to="/#enquire"
              className="inline-flex items-center justify-center min-h-[44px] px-4 md:px-5 py-2 rounded-[4px] bg-[#1F1D1B] text-[#FAF6EE] text-[14px] font-medium hover:text-[#DFC698] transition-colors whitespace-nowrap shrink-0"
            >
              Check Your Wedding Date
            </Link>
          )}
        </div>
      </header>
    </>
  );
}
