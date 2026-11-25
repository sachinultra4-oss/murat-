export interface FilmItem {
  id: string;
  youtubeId: string;
  title: string;
  couple: string;
  published: boolean;
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  numeral: string;
  title: string;
  description: string;
  mediaSlotId: string;
}

export interface WhyPoint {
  numeral: string;
  title: string;
  description: string;
}

export interface ExperienceStep {
  numeral: string;
  title: string;
  description: string;
}

export const SITE_CONFIG = {
  brandName: 'MUHURAT WEDDING',
  tagline: 'Wedding Photography & Cinematography | Available Across India & Worldwide',
  regionsLine: 'Pune · Mumbai · Delhi · Jamshedpur · Maharashtra & Worldwide',
  instagramUrl: 'https://www.instagram.com/muhuratwedding/',
  /**
   * Client configuration:
   * Enter WhatsApp number in international format without '+' or spaces (e.g. "9198XXXXXXXX").
   * Leave empty until confirmed; WhatsApp buttons stay hidden in production when empty.
   */
  WHATSAPP_NUMBER: '',
  /**
   * Client configuration:
   * Enter Meta Pixel ID (e.g. "123456789012345") to enable PageView and Lead event tracking.
   */
  META_PIXEL_ID: '',
  /**
   * Editable qualification ranges for the enquiry form.
   * Replace or customize with exact package ranges when ready.
   */
  budgetRanges: [
    'Intimate Celebration (1 Day)',
    'Complete Wedding Coverage (2–3 Days)',
    'Multi-Day Destination Wedding',
    'Pre-Wedding Photography & Film',
    'Prefer to Discuss on a Call',
  ],
  videos: [
    {
      id: 'niket-sayali',
      youtubeId: '2umrE_gwoT4',
      title: 'Larger Than Life Pre-Wedding',
      couple: 'Niket & Sayali',
      published: true,
      featured: true,
    },
    {
      id: 'shubham-aditi',
      youtubeId: '0P4rgEol908',
      title: 'JW Marriott Wedding Film',
      couple: 'Shubham & Aditi',
      published: true,
    },
    {
      id: 'aditya-amruta',
      youtubeId: 'SQUC1unaKLo',
      title: 'Wedding Story',
      couple: 'Aditya & Amruta',
      published: true,
    },
    {
      id: 'mayur-kajal',
      youtubeId: '9Wx1jjsoUmI',
      title: 'Where Love Feels Effortless',
      couple: 'Mayur & Kajal',
      published: true,
    },
    {
      id: 'sanket-sushmita',
      youtubeId: 'vYTpNiW1gRo',
      title: 'Kashmir Pre-Wedding',
      couple: 'Sanket & Sushmita',
      published: true,
    },
    {
      id: 'kashmir-film',
      youtubeId: 'isxfSJy6iMI',
      title: 'Kashmir Pre-Wedding Film',
      couple: 'Kashmir Film',
      published: true,
    },
    {
      id: 'unconfirmed-film',
      youtubeId: 'cCGDGvaLstQ',
      title: 'Featured Wedding Film',
      couple: 'Pending Confirmation',
      published: false,
    },
  ] satisfies FilmItem[],
  services: [
    {
      id: 'wedding-photography',
      numeral: '01',
      title: 'Wedding Photography',
      description:
        'Timeless portraits, sacred rituals, and honest family moments preserved in warm, editorial frames.',
      mediaSlotId: 'service-01',
    },
    {
      id: 'wedding-cinematography',
      numeral: '02',
      title: 'Wedding Cinematography',
      description:
        'Story-driven wedding films edited with natural sound, emotion, and a timeless visual cadence.',
      mediaSlotId: 'service-02',
    },
    {
      id: 'pre-wedding-photography',
      numeral: '03',
      title: 'Pre-Wedding Photography',
      description:
        'Relaxed couple sessions in scenic locations that honour your natural chemistry before the wedding.',
      mediaSlotId: 'service-03',
    },
    {
      id: 'pre-wedding-films',
      numeral: '04',
      title: 'Pre-Wedding Films',
      description:
        'Short narrative films crafted around your journey together, filmed across India and worldwide.',
      mediaSlotId: 'service-04',
    },
    {
      id: 'destination-weddings',
      numeral: '05',
      title: 'Destination Weddings',
      description:
        'Complete multi-day visual storytelling for intimate and grand destination celebrations anywhere.',
      mediaSlotId: 'service-05',
    },
    {
      id: 'candid-photography',
      numeral: '06',
      title: 'Candid Photography',
      description:
        'Unposed glances, laughter, and quiet in-between moments captured gently without interrupting.',
      mediaSlotId: 'service-06',
    },
  ] satisfies ServiceItem[],
  whyPoints: [
    {
      numeral: '01',
      title: 'Emotion-Led Storytelling',
      description:
        'Every photograph and film begins with genuine human connection rather than rigid, staged direction.',
    },
    {
      numeral: '02',
      title: 'Creative Photography',
      description:
        'Thoughtful framing and natural light that preserve the architecture, colours, and quiet atmosphere of your celebration.',
    },
    {
      numeral: '03',
      title: 'Cinematic Films',
      description:
        'Handcrafted wedding films paced around real vows, family voices, music, and unscripted emotion.',
    },
    {
      numeral: '04',
      title: 'Attention to Details',
      description:
        'From heirloom textiles and floral mandaps to the smallest trembling glance during the pheras.',
    },
    {
      numeral: '05',
      title: 'Personalised Coverage',
      description:
        'Every schedule, ritual, and crew plan is tailored around your family traditions and comfort.',
    },
    {
      numeral: '06',
      title: 'Available Across India & Worldwide',
      description:
        'Serving celebrations across Pune, Mumbai, Delhi, Jamshedpur, Maharashtra, and destinations worldwide.',
    },
  ] satisfies WhyPoint[],
  experienceSteps: [
    {
      numeral: '01',
      title: 'Share Your Wedding Details',
      description:
        'Tell us your wedding dates, city or destination, and the celebrations you are envisioning.',
    },
    {
      numeral: '02',
      title: "Let's Understand Your Vision",
      description:
        'We connect personally to learn about your story, family traditions, and what matters most to you.',
    },
    {
      numeral: '03',
      title: 'Plan Your Photography Experience',
      description:
        'Together we shape ceremony timelines, coverage plans, and deliverables with complete clarity.',
    },
    {
      numeral: '04',
      title: "Let's Capture Your Story",
      description:
        'Stay completely present with the people you love while we preserve every fleeting moment.',
    },
  ] satisfies ExperienceStep[],
} as const;

export function buildWhatsAppUrl(message?: string): string | null {
  const cleaned = SITE_CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
  if (!cleaned) return null;
  const text = message
    ? `?text=${encodeURIComponent(message)}`
    : `?text=${encodeURIComponent('Hello Muhurat Wedding, we would love to check availability for our wedding dates.')}`;
  return `https://wa.me/${cleaned}${text}`;
}
