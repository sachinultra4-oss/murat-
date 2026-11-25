import * as React from 'react';
import { cn } from '@/src/lib/utils';

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      'flex min-h-[46px] w-full rounded-[4px] border border-[#B89B6A]/55 bg-[#FAF6EE] px-4 py-2.5 text-[17px] text-[#1F1D1B] placeholder:text-[#1F1D1B]/45 transition-colors duration-150 focus-visible:border-[#1F1D1B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A6F3F] disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
Input.displayName = 'Input';

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'flex min-h-[120px] w-full rounded-[4px] border border-[#B89B6A]/55 bg-[#FAF6EE] px-4 py-3 text-[17px] leading-relaxed text-[#1F1D1B] placeholder:text-[#1F1D1B]/45 transition-colors duration-150 focus-visible:border-[#1F1D1B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A6F3F] disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'block text-[14px] font-medium tracking-[0.02em] text-[#1F1D1B] mb-2',
      className,
    )}
    {...props}
  />
));
Label.displayName = 'Label';

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-[4px] border border-[#B89B6A]/35 bg-[#FAF6EE]',
        className,
      )}
      {...props}
    />
  );
}
