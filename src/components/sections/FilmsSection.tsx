import { useState } from 'react';
import { Play } from 'lucide-react';
import { SITE_CONFIG, type FilmItem } from '@/src/config/site';
import { Button } from '@/src/components/ui/button';

interface FilmsSectionProps {
  onEnquireClick: () => void;
}

function FilmCard({ film, featured = false }: { film: FilmItem; featured?: boolean }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [thumbFallback, setThumbFallback] = useState(false);

  const thumbnailUrl = `https://i.ytimg.com/vi/${film.youtubeId}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${film.youtubeId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <article className="group">
      <div className="relative aspect-video w-full overflow-hidden rounded-[4px] border border-[#B89B6A]/35 bg-[#151312]">
        {isLoaded ? (
          <iframe
            src={embedUrl}
            title={`${film.couple} — ${film.title}`}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsLoaded(true)}
            aria-label={`Play film: ${film.couple}, ${film.title}`}
            className="relative w-full h-full block cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B89B6A]"
          >
            {!thumbFallback ? (
              <img
                src={thumbnailUrl}
                alt={`${film.couple} — ${film.title}`}
                width={1280}
                height={720}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setThumbFallback(true)}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#282522] text-[#FAF6EE]/70">
                <span className="font-display text-2xl">{film.couple}</span>
              </div>
            )}

            <div className="absolute inset-0 bg-[#1F1D1B]/30 group-hover:bg-[#1F1D1B]/20 transition-colors" />

            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className={`inline-flex items-center justify-center rounded-[4px] border border-[#FAF6EE]/75 bg-[#1F1D1B]/80 text-[#FAF6EE] transition-transform duration-200 group-hover:scale-105 group-hover:border-[#B89B6A] ${
                  featured ? 'w-16 h-16' : 'w-12 h-12'
                }`}
              >
                <Play className={featured ? 'w-6 h-6 fill-current ml-0.5' : 'w-5 h-5 fill-current ml-0.5'} />
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Title + couple label only */}
      <div className="mt-3.5">
        <h3
          className={`font-display font-medium text-[#FAF6EE] leading-snug ${
            featured ? 'text-[26px] md:text-[32px]' : 'text-[22px] md:text-[24px]'
          }`}
        >
          {film.title}
        </h3>
        <p className="text-[14px] tracking-[0.03em] text-[#D9C091] mt-0.5">
          {film.couple}
        </p>
      </div>
    </article>
  );
}

export function FilmsSection({ onEnquireClick }: FilmsSectionProps) {
  const publishedFilms = SITE_CONFIG.videos.filter((v) => v.published);
  const featuredFilm = publishedFilms.find((v) => v.featured) ?? publishedFilms[0];
  const otherFilms = publishedFilms.filter((v) => v.id !== featuredFilm?.id);

  return (
    <section
      id="films"
      aria-labelledby="films-heading"
      className="bg-[#1F1D1B] text-[#FAF6EE] py-20 md:py-28 lg:py-32"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
          <div>
            <div className="w-12 h-px bg-[#B89B6A] mb-6" aria-hidden="true" />
            <h2
              id="films-heading"
              className="font-display text-[36px] sm:text-[44px] md:text-[52px] font-medium leading-[1.06] tracking-[-0.02em] text-[#FAF6EE]"
            >
              Wedding Films
            </h2>
          </div>
          <p className="text-[17px] text-[#FAF6EE]/78 max-w-md">
            Tap any story below to watch with sound. Crafted from real voices, music, and
            unscripted celebrations.
          </p>
        </div>

        {/* Featured Film */}
        {featuredFilm ? (
          <div className="mb-10 md:mb-12">
            <FilmCard film={featuredFilm} featured />
          </div>
        ) : null}

        {/* Remaining Films Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
          {otherFilms.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>

        <div className="mt-12 md:mt-14 pt-8 border-t border-[#FAF6EE]/15 flex justify-start">
          <Button
            type="button"
            variant="primaryOnDark"
            size="lg"
            onClick={onEnquireClick}
          >
            Check Your Wedding Date
          </Button>
        </div>
      </div>
    </section>
  );
}
