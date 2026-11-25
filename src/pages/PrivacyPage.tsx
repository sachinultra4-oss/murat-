import { Link } from 'react-router-dom';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';

export function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-[15px] text-[#8A6F3F] mb-10 pb-6 border-b border-[#B89B6A]/40">
            Muhurat Wedding · Wedding Photography &amp; Cinematography
          </p>

          <div className="space-y-7 text-[17px] leading-[1.7] text-[#1F1D1B]/85">
            <section>
              <h2 className="font-display text-[26px] font-medium text-[#1F1D1B] mb-2">
                1. Information You Share With Us
              </h2>
              <p>
                When you submit an enquiry on our website, we collect the details you provide—such
                as your names, WhatsApp or phone number, email address, wedding dates, venue or
                city, guest count, and celebration notes—solely to respond to your availability
                request and plan your wedding coverage.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[26px] font-medium text-[#1F1D1B] mb-2">
                2. How We Use &amp; Protect Your Details
              </h2>
              <p>
                We never sell, rent, or trade your personal contact details to third parties. Your
                enquiry information is accessed exclusively by authorised Muhurat Wedding studio
                team members for consultation, scheduling, and client communication.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[26px] font-medium text-[#1F1D1B] mb-2">
                3. Embedded Films &amp; Analytics
              </h2>
              <p>
                Our wedding film showcase uses privacy-enhanced YouTube embeds that only load
                external video frames when you choose to press play. If Meta Pixel is enabled for
                campaign measurement, it records standard page and enquiry conversion events.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[26px] font-medium text-[#1F1D1B] mb-2">
                4. Data Requests &amp; Removal
              </h2>
              <p>
                You may request an update or deletion of your enquiry information at any time by
                reaching out through our enquiry form or official Instagram channel.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
