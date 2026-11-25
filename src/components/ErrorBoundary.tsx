import React from 'react';
import { Button } from '@/src/components/ui/button';

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message || 'An unexpected error occurred.' };
  }

  override componentDidCatch(error: Error): void {
    console.error('Application ErrorBoundary caught:', error);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF6EE] text-[#1F1D1B] flex items-center justify-center px-5">
          <div className="max-w-md w-full border border-[#B89B6A]/45 rounded-[4px] p-8 bg-[#F2EBDD]">
            <p className="text-[13px] tracking-[0.08em] uppercase text-[#785E32] mb-2">
              Muhurat Wedding
            </p>
            <h1 className="font-display text-3xl font-medium mb-3">
              Something needs a quick refresh.
            </h1>
            <p className="text-[16px] text-[#1F1D1B]/80 mb-6">
              Please reload the page to continue exploring our wedding stories or submitting your enquiry.
            </p>
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
