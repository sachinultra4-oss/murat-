import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '@/src/lib/firebase';
import { SITE_CONFIG } from '@/src/config/site';
import { Button } from '@/src/components/ui/button';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/admin', { replace: true });
      } else {
        setChecking(false);
      }
    });
    return () => unsub();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    setError(null);
    setSigningIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/admin', { replace: true });
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Unable to sign in with Google right now.';
      if (!msg.includes('popup-closed-by-user')) {
        setError('Google sign-in could not be completed. Please try again.');
      }
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1F1D1B] flex flex-col justify-between px-5 py-10">
      <div className="max-w-[1200px] w-full mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="font-display text-[22px] font-semibold tracking-[0.06em] uppercase text-[#1F1D1B]"
        >
          {SITE_CONFIG.brandName}
        </Link>
        <Link to="/" className="editorial-underline text-[15px] text-[#8A6F3F]">
          Back to Site
        </Link>
      </div>

      <main id="main-content" className="max-w-md w-full mx-auto my-12">
        <div className="rounded-[4px] border border-[#B89B6A]/45 bg-[#F2EBDD] p-8 md:p-10">
          <div className="w-10 h-px bg-[#B89B6A] mb-5" aria-hidden="true" />
          <h1 className="font-display text-[36px] font-medium leading-[1.1] tracking-[-0.02em] mb-3">
            Studio Portal
          </h1>
          <p className="text-[16px] text-[#1F1D1B]/80 mb-7">
            Sign in with your authorised Google account to view and manage wedding enquiries.
          </p>

          {error ? (
            <div
              role="alert"
              className="mb-5 rounded-[4px] border border-[#8A2E2E]/40 bg-[#F9EFEF] px-4 py-3 text-[15px] text-[#7A1F1F]"
            >
              {error}
            </div>
          ) : null}

          {checking ? (
            <p className="text-[15px] text-[#8A6F3F]">Checking session...</p>
          ) : (
            <div className="space-y-3">
              <Button
                type="button"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={signingIn}
                onClick={handleGoogleSignIn}
              >
                {signingIn ? 'Signing In...' : 'Sign in with Google'}
              </Button>
              {auth.currentUser ? (
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full"
                  onClick={() => signOut(auth)}
                >
                  Switch Account
                </Button>
              ) : null}
            </div>
          )}
        </div>
      </main>

      <div className="max-w-[1200px] w-full mx-auto text-[14px] text-[#1F1D1B]/60">
        Muhurat Wedding Studio Administration
      </div>
    </div>
  );
}
