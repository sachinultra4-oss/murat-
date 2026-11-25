import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/src/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 rounded-[4px] font-sans text-[15px] font-medium tracking-[0.01em] min-h-[44px] px-6 py-3 transition-[transform,color,background-color,border-color] duration-150 ease-out cursor-pointer disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#8A6F3F] active:translate-y-[1px]',
  {
    variants: {
      variant: {
        primary:
          'bg-[#1F1D1B] text-[#FAF6EE] border border-[#1F1D1B] hover:text-[#DFC698] hover:-translate-y-[1px]',
        primaryOnDark:
          'bg-[#FAF6EE] text-[#1F1D1B] border border-[#FAF6EE] hover:text-[#785E32] hover:-translate-y-[1px]',
        secondary:
          'bg-transparent text-[#1F1D1B] border border-[#B89B6A] hover:border-[#1F1D1B] hover:-translate-y-[1px]',
        secondaryOnDark:
          'bg-transparent text-[#FAF6EE] border border-[#B89B6A] hover:text-[#DFC698] hover:border-[#FAF6EE] hover:-translate-y-[1px]',
        ghost:
          'bg-transparent text-[#1F1D1B] px-2 hover:text-[#8A6F3F]',
      },
      size: {
        default: 'min-h-[44px] px-6 py-3',
        sm: 'min-h-[44px] px-4 py-2 text-[14px]',
        lg: 'min-h-[48px] px-7 py-3.5 text-[16px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = 'Button';

export { buttonVariants };
