import { useEffect, useState } from 'react';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Check } from 'lucide-react';
import { SITE_CONFIG, buildWhatsAppUrl } from '@/src/config/site';
import { db, handleFirestoreError, OperationType } from '@/src/lib/firebase';
import { trackMetaLead } from '@/src/lib/pixel';
import { Button } from '@/src/components/ui/button';
import { Input, Label, Textarea } from '@/src/components/ui/form-primitives';

interface EnquirySectionProps {
  preselectedService?: string | null;
}

const PHONE_REGEX = /^[+0-9\s\-()]{7,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function createDocId(): string {
  const randomPart =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID().replace(/-/g, '').slice(0, 16)
      : Math.random().toString(36).slice(2, 14);
  return `enq_${Date.now()}_${randomPart}`;
}

export function EnquirySection({ preselectedService }: EnquirySectionProps) {
  const [coupleName, setCoupleName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [city, setCity] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Wedding Photography',
    'Wedding Cinematography',
  ]);
  const [budgetRange, setBudgetRange] = useState<string>(SITE_CONFIG.budgetRanges[1]);
  const [guestCount, setGuestCount] = useState('');
  const [story, setStory] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedCouple, setSubmittedCouple] = useState<string | null>(null);

  useEffect(() => {
    if (!preselectedService) return;
    setSelectedServices((prev) =>
      prev.includes(preselectedService) ? prev : [...prev, preselectedService].slice(0, 8),
    );
  }, [preselectedService]);

  const toggleService = (title: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(title)) {
        return prev.length > 1 ? prev.filter((item) => item !== title) : prev;
      }
      return [...prev, title].slice(0, 8);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanName = coupleName.trim().slice(0, 120);
    const cleanPhone = phone.trim().slice(0, 24);
    const cleanEmail = email.trim().slice(0, 160);
    const cleanDate = weddingDate.trim().slice(0, 60);
    const cleanCity = city.trim().slice(0, 100);
    const cleanBudget = budgetRange.trim().slice(0, 80);
    const cleanGuests = guestCount.trim().slice(0, 40);
    const cleanStory = story.trim().slice(0, 2000);

    if (cleanName.length < 2) {
      setErrorMsg('Please enter your names (at least 2 characters).');
      return;
    }
    if (!PHONE_REGEX.test(cleanPhone)) {
      setErrorMsg('Please enter a valid WhatsApp or phone number.');
      return;
    }
    if (!EMAIL_REGEX.test(cleanEmail)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (cleanDate.length < 3) {
      setErrorMsg('Please share your tentative or confirmed wedding dates.');
      return;
    }
    if (cleanCity.length < 2) {
      setErrorMsg('Please enter your wedding city or destination.');
      return;
    }
    if (selectedServices.length === 0) {
      setErrorMsg('Please choose at least one service you are interested in.');
      return;
    }

    setSubmitting(true);
    const enquiryId = createDocId();
    const path = `enquiries/${enquiryId}`;

    try {
      const searchParams = new URLSearchParams(window.location.search);
      const utmSource = searchParams.get('utm_source') || 'landing_form';

      await setDoc(doc(db, 'enquiries', enquiryId), {
        coupleName: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        weddingDate: cleanDate,
        city: cleanCity,
        services: selectedServices.slice(0, 8),
        budgetRange: cleanBudget,
        guestCount: cleanGuests,
        story: cleanStory,
        status: 'new',
        adminNotes: '',
        source: utmSource.slice(0, 80),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      trackMetaLead({ city: cleanCity, budgetRange: cleanBudget });
      setSubmittedCouple(cleanName);
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.CREATE, path);
      } catch {
        setErrorMsg(
          'We could not submit your enquiry right now. Please check your connection and try again.',
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappConfirmUrl = buildWhatsAppUrl(
    submittedCouple
      ? `Hello Muhurat Wedding, we just submitted an enquiry for ${submittedCouple} (${weddingDate} in ${city}).`
      : undefined,
  );

  return (
    <section
      id="enquire"
      aria-labelledby="enquire-heading"
      className="bg-[#F2EBDD] text-[#1F1D1B] py-20 md:py-28 lg:py-32"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Editorial Pitch */}
          <div className="lg:col-span-5">
            <div className="w-12 h-px bg-[#B89B6A] mb-6" aria-hidden="true" />
            <h2
              id="enquire-heading"
              className="font-display text-[36px] sm:text-[44px] md:text-[52px] font-medium leading-[1.06] tracking-[-0.02em] text-[#1F1D1B] mb-5"
            >
              Check Your Wedding Date
            </h2>
            <p className="text-[17px] leading-[1.65] text-[#1F1D1B]/85 mb-6">
              We take on a select number of weddings each season so every couple receives our
              undivided creative attention. Share your celebration details below and we will get
              back to you personally with availability.
            </p>
            <div className="border-t border-[#B89B6A]/45 pt-5 space-y-2 text-[15px] text-[#785E32]">
              <p>{SITE_CONFIG.regionsLine}</p>
            </div>
          </div>

          {/* Right Conversion Form */}
          <div className="lg:col-span-7">
            <div className="rounded-[4px] border border-[#B89B6A]/45 bg-[#FAF6EE] p-6 sm:p-8 md:p-10">
              {submittedCouple ? (
                <div className="py-6" role="status" aria-live="polite">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-[4px] border border-[#B89B6A] text-[#8A6F3F] mb-5">
                    <Check className="w-5 h-5" />
                  </span>
                  <h3 className="font-display text-[32px] font-medium leading-tight text-[#1F1D1B] mb-3">
                    Thank you, {submittedCouple}.
                  </h3>
                  <p className="text-[17px] leading-[1.65] text-[#1F1D1B]/85 mb-7">
                    Your wedding enquiry has been received. We are checking our calendar for{' '}
                    <span className="font-medium text-[#1F1D1B]">{weddingDate}</span> in{' '}
                    <span className="font-medium text-[#1F1D1B]">{city}</span> and will reach out
                    shortly.
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    {whatsappConfirmUrl ? (
                      <a
                        href={whatsappConfirmUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-[4px] bg-[#1F1D1B] text-[#FAF6EE] text-[15px] font-medium hover:text-[#DFC698] transition-colors"
                      >
                        Message Us on WhatsApp
                      </a>
                    ) : null}
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setSubmittedCouple(null);
                        setCoupleName('');
                        setPhone('');
                        setEmail('');
                        setWeddingDate('');
                        setCity('');
                        setGuestCount('');
                        setStory('');
                      }}
                    >
                      Submit Another Enquiry
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {errorMsg ? (
                    <div
                      role="alert"
                      className="rounded-[4px] border border-[#8A2E2E]/40 bg-[#F9EFEF] px-4 py-3 text-[15px] text-[#7A1F1F]"
                    >
                      {errorMsg}
                    </div>
                  ) : null}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="enq-couple-name">Couple / Your Name *</Label>
                      <Input
                        id="enq-couple-name"
                        name="coupleName"
                        type="text"
                        required
                        maxLength={120}
                        placeholder="e.g. Aarav & Meera"
                        value={coupleName}
                        onChange={(e) => setCoupleName(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="enq-phone">WhatsApp / Phone Number *</Label>
                      <Input
                        id="enq-phone"
                        name="phone"
                        type="tel"
                        required
                        maxLength={24}
                        placeholder="e.g. +91 98XXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="enq-email">Email Address *</Label>
                      <Input
                        id="enq-email"
                        name="email"
                        type="email"
                        required
                        maxLength={160}
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="enq-date">Wedding Dates *</Label>
                      <Input
                        id="enq-date"
                        name="weddingDate"
                        type="text"
                        required
                        maxLength={60}
                        placeholder="e.g. 14–16 Dec 2026"
                        value={weddingDate}
                        onChange={(e) => setWeddingDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="enq-city">Wedding City / Venue *</Label>
                      <Input
                        id="enq-city"
                        name="city"
                        type="text"
                        required
                        maxLength={100}
                        placeholder="e.g. Pune, Mumbai, Udaipur"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="enq-guests">Approximate Guest Count</Label>
                      <Input
                        id="enq-guests"
                        name="guestCount"
                        type="text"
                        maxLength={40}
                        placeholder="e.g. 250 guests"
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label id="enq-services-label">Services Interested In *</Label>
                    <div
                      role="group"
                      aria-labelledby="enq-services-label"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                    >
                      {SITE_CONFIG.services.map((service) => {
                        const checked = selectedServices.includes(service.title);
                        return (
                          <button
                            key={service.id}
                            type="button"
                            aria-pressed={checked}
                            onClick={() => toggleService(service.title)}
                            className={`min-h-[44px] px-3.5 py-2.5 rounded-[4px] border text-left text-[15px] flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                              checked
                                ? 'bg-[#1F1D1B] text-[#FAF6EE] border-[#1F1D1B]'
                                : 'bg-[#FAF6EE] text-[#1F1D1B] border-[#B89B6A]/55 hover:border-[#1F1D1B]'
                            }`}
                          >
                            <span>{service.title}</span>
                            {checked ? <Check className="w-4 h-4 text-[#DFC698] shrink-0" /> : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="enq-budget">Celebration Scope / Budget Preference *</Label>
                    <select
                      id="enq-budget"
                      name="budgetRange"
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="flex min-h-[46px] w-full rounded-[4px] border border-[#B89B6A]/55 bg-[#FAF6EE] px-4 py-2.5 text-[17px] text-[#1F1D1B] focus-visible:border-[#1F1D1B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A6F3F]"
                    >
                      {SITE_CONFIG.budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="enq-story">Tell Us About Your Wedding Vision</Label>
                    <Textarea
                      id="enq-story"
                      name="story"
                      maxLength={2000}
                      placeholder="Share your ceremony schedule (Haldi, Mehendi, Sangeet, Wedding, Reception), venue, or anything close to your heart."
                      value={story}
                      onChange={(e) => setStory(e.target.value)}
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={submitting}
                      className="w-full sm:w-auto"
                    >
                      {submitting ? 'Sending Enquiry...' : 'Check Your Wedding Date'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
