import { Link } from 'react-router-dom';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1F1D1B] flex flex-col">
      <Header variant="solid" />
      <main id="main-content" className="flex-1 py-16 md:py-24">
        <div className="max-w-[820px] mx-auto px-5 md:px-10">
          <Link
            to="/"
            className="editorial-underline text-[15px] text-[#8A6F3F] mb-8 inline-flex"
          >
            Back to Muhurat Wedding
          </Link>

          <h1 className="font-display text-[40px] md:text-[52px] font-medium leading-[1.08] tracking-[-0.02em] mb-6">
            Terms of Service
          </h1>
          <p className="text-[15px] text-[#8A6F3F] mb-10 pb-6 border-b border-[#B89B6A]/40">
            Muhurat Wedding · Wedding Photography &amp; Cinematography
          </p>

          <div className="space-y-7 text-[17px] leading-[1.7] text-[#1F1D1B]/85">
            <section>
              <h2 className="font-display text-[26px] font-medium text-[#1F1D1B] mb-2">
                1. Availability Enquiries
              </h2>
              <p>
                Submitting a wedding enquiry through this website initiates an availability check
                and consultation. Wedding dates are reserved only upon mutual confirmation and
                execution of a formal booking agreement.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[26px] font-medium text-[#1F1D1B] mb-2">
                2. Creative Copyright
              </h2>
              <p>
                All photographs, wedding films, and visual stories presented on this site remain the
                intellectual property of Muhurat Wedding and the respective couples. Reproduction or
                commercial redistribution without written consent is prohibited.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[26px] font-medium text-[#1F1D1B] mb-2">
                3. Travel &amp; Destination Coverage
              </h2>
              <p>
                Muhurat Wedding accepts commissions across Pune, Mumbai, Delhi, Jamshedpur,
                Maharashtra, and destinations worldwide. Specific travel, crew, and delivery
                timelines are detailed individually in each couple&apos;s booking proposal.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
