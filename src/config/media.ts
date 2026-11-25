export interface MediaSlot {
  id: string;
  src: string;
  webpSrc?: string;
  srcSet?: string;
  alt: string;
  width: number;
  height: number;
  /** File path where client can place/replace image in public/wedding/ */
  clientSlotPath: string;
  cropBorder?: boolean;
  aspectClass?: string;
  categoryLabel: string;
}

export const HERO_MEDIA = {
  posterSrc: '/assets/aistudio/WhatsApp_Image_2026-11-23_at_11.55.12_PM__1__f43f5c03.jpeg',
  posterAlt: 'Bride and groom standing hand in hand beneath a floral stone temple mandap',
  videoSrc: '/assets/aistudio/WhatsApp_Video_2026-11-23_at_11.55.11_PM_0b0517e7.mp4',
  secondaryVideoSrc: '/assets/aistudio/WhatsApp_Video_2026-11-23_at_11.55.09_PM__1__e593707e.mp4',
  width: 1440,
  height: 1440,
  clientSlotPath: '/wedding/hero.jpg',
};

export const INTRO_PHOTOS: MediaSlot[] = [
  {
    id: 'intro-01',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-23_at_11.55.13_PM_1e06535b.jpeg',
    alt: 'Maharashtrian bride smiling gently as pink bougainvillea petals fall around her',
    width: 1440,
    height: 1440,
    clientSlotPath: '/wedding/story-01.jpg',
    cropBorder: true,
    categoryLabel: 'Bridal Portrait',
  },
  {
    id: 'intro-02',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-23_at_11.55.12_PM_73dbd16a.jpeg',
    alt: 'Bride resting her head on the groom shoulder in ivory sherwani and magenta nauvari saree',
    width: 1440,
    height: 1440,
    clientSlotPath: '/wedding/story-02.jpg',
    cropBorder: true,
    categoryLabel: 'Couple Portrait',
  },
  {
    id: 'intro-03',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-23_at_11.55.09_PM_90f1e3ce.jpeg',
    alt: 'Couple sitting together on a grassy coastal cliff overlooking the ocean at dusk',
    width: 1200,
    height: 1599,
    clientSlotPath: '/wedding/story-03.jpg',
    categoryLabel: 'Pre-Wedding Portrait',
  },
];

export const SERVICE_MEDIA_SLOTS: Record<string, MediaSlot> = {
  'service-01': {
    id: 'service-01',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-23_at_11.55.12_PM_73dbd16a.jpeg',
    alt: 'Editorial wedding portrait of bride and groom in traditional attire',
    width: 1440,
    height: 1440,
    clientSlotPath: '/wedding/service-wedding-photography.jpg',
    cropBorder: true,
    categoryLabel: 'Wedding Photography',
  },
  'service-02': {
    id: 'service-02',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-23_at_11.55.12_PM__1__f43f5c03.jpeg',
    alt: 'Bride and groom raising clasped hands beneath floral garlands at their mandap',
    width: 1440,
    height: 1440,
    clientSlotPath: '/wedding/service-cinematography.jpg',
    categoryLabel: 'Wedding Cinematography',
  },
  'service-03': {
    id: 'service-03',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-23_at_11.55.09_PM_90f1e3ce.jpeg',
    alt: 'Couple pre-wedding portrait on a coastal hillside',
    width: 1200,
    height: 1599,
    clientSlotPath: '/wedding/service-prewedding-photography.jpg',
    categoryLabel: 'Pre-Wedding Photography',
  },
  'service-04': {
    id: 'service-04',
    src: '/wedding/service-prewedding-films.jpg',
    webpSrc: '/wedding/service-prewedding-films.webp',
    alt: 'Pre-wedding narrative film still captured in natural light',
    width: 1200,
    height: 900,
    clientSlotPath: '/wedding/service-prewedding-films.jpg',
    categoryLabel: 'Pre-Wedding Films',
  },
  'service-05': {
    id: 'service-05',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-23_at_11.55.12_PM__2__ec299b96.jpeg',
    alt: 'Sacred wedding ceremony pheras under a floral destination mandap',
    width: 1440,
    height: 1440,
    clientSlotPath: '/wedding/service-destination-weddings.jpg',
    cropBorder: true,
    categoryLabel: 'Destination Weddings',
  },
  'service-06': {
    id: 'service-06',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-23_at_11.55.13_PM_1e06535b.jpeg',
    alt: 'Candid bridal smile framed by falling bougainvillea petals',
    width: 1440,
    height: 1440,
    clientSlotPath: '/wedding/service-candid-photography.jpg',
    cropBorder: true,
    categoryLabel: 'Candid Photography',
  },
};

export const GALLERY_SLOTS: MediaSlot[] = [
  {
    id: 'gallery-01',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-23_at_11.55.12_PM__1__f43f5c03.jpeg',
    alt: 'Sacred temple mandap ceremony with bride and groom raising joined hands',
    width: 1440,
    height: 1440,
    clientSlotPath: '/wedding/gallery-01.jpg',
    aspectClass: 'aspect-[4/5]',
    categoryLabel: 'Ceremonies',
  },
  {
    id: 'gallery-02',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-23_at_11.55.09_PM_90f1e3ce.jpeg',
    alt: 'Intimate pre-wedding couple portrait overlooking coastal cliffs',
    width: 1200,
    height: 1599,
    clientSlotPath: '/wedding/gallery-02.jpg',
    aspectClass: 'aspect-[3/4]',
    categoryLabel: 'Portraits',
  },
  {
    id: 'gallery-03',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-23_at_11.55.13_PM_1e06535b.jpeg',
    alt: 'Candid bridal portrait adorned with traditional nath and green bangles',
    width: 1440,
    height: 1440,
    clientSlotPath: '/wedding/gallery-03.jpg',
    cropBorder: true,
    aspectClass: 'aspect-square',
    categoryLabel: 'Candid',
  },
  {
    id: 'gallery-04',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-23_at_11.55.12_PM_73dbd16a.jpeg',
    alt: 'Quiet couple moment in traditional wedding attire amidst garden blooms',
    width: 1440,
    height: 1440,
    clientSlotPath: '/wedding/gallery-04.jpg',
    cropBorder: true,
    aspectClass: 'aspect-[4/5]',
    categoryLabel: 'Portraits',
  },
  {
    id: 'gallery-05',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-23_at_11.55.12_PM__2__ec299b96.jpeg',
    alt: 'Four moments from the sacred saat phera ritual around the wedding fire',
    width: 1440,
    height: 1440,
    clientSlotPath: '/wedding/gallery-05.jpg',
    cropBorder: true,
    aspectClass: 'aspect-square',
    categoryLabel: 'Rituals',
  },
  {
    id: 'gallery-06',
    src: '/wedding/gallery-06.jpg',
    webpSrc: '/wedding/gallery-06.webp',
    alt: 'Haldi and mehendi celebration moments with family',
    width: 1200,
    height: 1500,
    clientSlotPath: '/wedding/gallery-06.jpg',
    aspectClass: 'aspect-[4/5]',
    categoryLabel: 'Haldi & Mehendi',
  },
  {
    id: 'gallery-07',
    src: '/wedding/gallery-07.jpg',
    webpSrc: '/wedding/gallery-07.webp',
    alt: 'Warm family embrace during wedding celebrations',
    width: 1600,
    height: 1200,
    clientSlotPath: '/wedding/gallery-07.jpg',
    aspectClass: 'aspect-[4/3]',
    categoryLabel: 'Family',
  },
  {
    id: 'gallery-08',
    src: '/wedding/gallery-08.jpg',
    webpSrc: '/wedding/gallery-08.webp',
    alt: 'Destination wedding twilight celebration frame',
    width: 1200,
    height: 1500,
    clientSlotPath: '/wedding/gallery-08.jpg',
    aspectClass: 'aspect-[3/4]',
    categoryLabel: 'Destination',
  },
];
