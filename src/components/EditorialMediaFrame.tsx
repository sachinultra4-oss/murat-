import { useState } from 'react';
import type { MediaSlot } from '@/src/config/media';
import { cn } from '@/src/lib/utils';

interface EditorialMediaFrameProps {
  slot: MediaSlot;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  showSlotHint?: boolean;
}

export function EditorialMediaFrame({
  slot,
  className,
  imageClassName,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  showSlotHint = false,
}: EditorialMediaFrameProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[4px] bg-[#F2EBDD] border border-[#B89B6A]/25',
        className,
      )}
    >
      {!failed ? (
        <picture className="block w-full h-full">
          {slot.webpSrc ? <source srcSet={slot.webpSrc} type="image/webp" sizes={sizes} /> : null}
          <img
            src={slot.src}
            srcSet={slot.srcSet}
            sizes={sizes}
            alt={slot.alt}
            width={slot.width}
            height={slot.height}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className={cn(
              'block w-full h-full object-cover transition-transform duration-500 ease-out',
              slot.cropBorder ? 'scale-[1.06] group-hover:scale-[1.09]' : 'group-hover:scale-[1.03]',
              imageClassName,
            )}
          />
        </picture>
      ) : (
        <div
          role="img"
          aria-label={slot.alt}
          className="w-full h-full min-h-[240px] flex flex-col items-center justify-center p-6 text-center bg-[#EAE1CF] text-[#1F1D1B]"
        >
          <span className="w-8 h-px bg-[#B89B6A] mb-3" aria-hidden="true" />
          <span className="font-display text-2xl font-medium text-[#1F1D1B]">
            {slot.categoryLabel}
          </span>
          {showSlotHint ? (
            <span className="mt-1.5 text-[12px] tracking-[0.04em] text-[#785E32]">
              Client Photo Slot · {slot.clientSlotPath}
            </span>
          ) : null}
          <span className="w-8 h-px bg-[#B89B6A] mt-3" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
