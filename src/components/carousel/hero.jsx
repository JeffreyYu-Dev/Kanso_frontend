"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import Image from "next/image";
import { Play, BookOpen, Star, Tv, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

const Slides = (carouselData) => {
  return carouselData.map((show, index) => {
    const {
      id,
      title,
      coverImage,
      bannerImage,
      averageScore,
      duration,
      episodes,
      format,
      description,
      seasonYear,
      nextAiringEpisode,
      genres,
    } = show;

    // check if it has a banner55
    if (bannerImage == null) return;

    // titles and colour
    const { romaji, english, native } = title;
    const showColor = coverImage.colour;

    return (
      <div
        className={`shrink-0 grow-0 basis-full min-w-0 relative select-none inset-0`}
        key={index}
      >
        {/* banner image */}
        <Image
          src={bannerImage}
          alt={english || romaji}
          width={1920}
          height={1080}
          className="object-cover h-full absolute"
          priority
        />

        {/* details */}
        {/* FIXME: fix corners of first slide on load ig */}
        <div className="flex flex-col gap-y-4 justify-end inset-0 absolute p-6 bg-carousel-radial select-none">
          <div className="">
            <div className="flex flex-col mb-2">
              {/* GENRES */}
              <div className="flex gap-x-1.5 items-center">
                {genres != null &&
                  genres.map((genre, index) => {
                    return (
                      <React.Fragment key={index}>
                        <h3 className=" text-white font-medium text-xs">
                          {genre}
                        </h3>
                        {index != genres.length - 1 && (
                          <span className="size-1 rounded-full bg-white"></span>
                        )}
                      </React.Fragment>
                    );
                  })}
              </div>

              {/* title */}
              <div>
                <h1 className="font-bold text-lg md:text-2xl line-clamp-1 md:line  text-white w-8/12">
                  {title.english || title.romaji}
                </h1>
              </div>

              {/* show details */}
              <div className="inline-flex items-center gap-1.5">
                {/* year */}
                <h3 className="text-muted-foreground text-xs font-medium">
                  {seasonYear}
                </h3>

                {/* format */}
                <span className="size-1 rounded-full bg-muted-foreground"></span>
                <h3 className=" text-muted-foreground text-xs font-medium">
                  {format}
                </h3>

                {/* seperator */}
                <Separator
                  orientation="vertical"
                  className="h-3 bg-muted-foreground"
                />

                {/* average score */}

                {averageScore && (
                  <h3 className="flex items-center justify-center gap-0.5  text-muted-foreground text-xs font-medium">
                    <Star size={12} strokeWidth={3} />
                    {averageScore}
                  </h3>
                )}

                {/* episodes */}
                {nextAiringEpisode.episode != null ? (
                  <>
                    <span className="size-1 rounded-full bg-muted-foreground"></span>
                    <h3 className="flex items-center justify-center gap-1  text-muted-foreground text-xs font-medium">
                      <Tv size={12} strokeWidth={3} />
                      {nextAiringEpisode.episode - 1}/{episodes}
                    </h3>
                  </>
                ) : (
                  <>
                    <span className="size-1 rounded-full bg-muted-foreground"></span>
                    <h3 className="flex items-center justify-center gap-1  text-muted-foreground text-xs font-medium">
                      <Tv size={12} strokeWidth={3} />
                      {episodes}
                    </h3>
                  </>
                )}

                {/* duration */}
                {duration && (
                  <>
                    <span className="size-1 rounded-full bg-muted-foreground"></span>
                    <h3 className="flex items-center justify-center gap-1  text-muted-foreground text-xs font-medium">
                      <Clock size={12} strokeWidth={3} />
                      {duration} mins
                    </h3>
                  </>
                )}
              </div>
            </div>

            {/* desciption */}
            <div className="w-5/12 line-clamp-1 sm:line-clamp-3">
              <p className="gap-0.5 text-xs text-white  ">{description}</p>
            </div>
          </div>

          {/* buttons */}
          <div className="flex gap-x-2">
            <Link
              href={{
                pathname: "/watch/",
                query: { id: id, episode: 1 },
              }}
            >
              <div
                className={`px-4 py-2 bg-primary rounded-3xl  text-base text-background font-medium tracking-wide flex justify-center gap-x-2 items-center hover:invert duration-300 ease-in-out`}
                style={{
                  boxShadow: `0 10px 15px -3px ${
                    showColor || "#fff"
                  }, 0 4px 6px -4px ${showColor || "#fff"}`,
                }}
              >
                <Play className="fill-background" size={18} />
                Watch Now
              </div>
            </Link>
            <button className="px-4 py-2 bg-background text-primary rounded-3xl  text-base  font-medium tracking-wide flex justify-center gap-x-2 items-center hover:invert duration-300 ease-in-out`">
              <BookOpen size={18} />
              Info
            </button>
          </div>
        </div>
      </div>
    );
  });
};

const Hero = ({ carouselData }) => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
    },
    [Fade()]
  );

  // slides
  const slides = Slides(carouselData);

  return (
    <>
      <section className="overflow-hidden rounded-3xl font-generalSans shadow-2xl ">
        <div className="w-full aspect-video max-h-[500px] " ref={emblaRef}>
          <div className="flex h-full">{slides}</div>
        </div>
      </section>
    </>
  );
};

export default Hero;
