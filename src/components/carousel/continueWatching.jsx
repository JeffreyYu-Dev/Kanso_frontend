"use client";
import React, { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { ChevronRight, Play, X } from "lucide-react";
import Image from "next/image";
import waveGif from "@/assets/images/wave.gif";

const ContinueWatchingContainer = ({}) => {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
    align: "start",
  });

  // temporary
  const anime = [
    {
      title: "Sakamoto Days",
      episodeNumber: 3,
      timeWatched: "12:34",
      episodeLength: "56:78",
      thumbNail:
        "https://image.tmdb.org/t/p/original/nFYs66CAkWhA7AAtq7HUUyWwPDB.jpg",
    },
    {
      title: "Jujutsu Kaisen",
      episodeNumber: 1,
      timeWatched: "9:92",
      episodeLength: "56:28",
      thumbNail:
        "https://image.tmdb.org/t/p/original/3wymoL9HYpllpFrcD8VCvemktGg.jpg",
    },
    {
      title: "Fruits Basket",
      episodeNumber: 10,
      timeWatched: "15:23",
      episodeLength: "23:10",
      thumbNail:
        "https://image.tmdb.org/t/p/original/drSXhdvvmold6CY3FZgpcdTRHBm.jpg",
    },
    {
      title: "Sword Art Online",
      episodeNumber: 20,
      timeWatched: "17:10",
      episodeLength: "22:40",
      thumbNail:
        "https://image.tmdb.org/t/p/original/cOpNhZSFZv2ocUaGfZajDlHz7NK.jpg",
    },
    {
      title: "Dr.Stone Science Future",
      episodeNumber: 2,
      timeWatched: "5:43",
      episodeLength: "24:21",
      thumbNail:
        "https://image.tmdb.org/t/p/original/9g0A6XVGIkXNXz56w9xjCp3zVOq.jpg",
    },
  ];

  return (
    <section className="mt-8 font-generalSans">
      <Link href="/continue-watching">
        <h1 className="inline-flex items-center text-3xl font-satoshi font-bold duration-300 hover:translate-x-4 ease-in-out transform-gpu will-change-transform hover:text-textAccent">
          Continue Watching
          <ChevronRight size={40} strokeWidth={3} />
        </h1>
      </Link>

      <div className="mt-2 select-none">
        <div className="overflow-hidden rounded-md" ref={emblaRef}>
          <div className="flex gap-2">
            {anime.map((show, index) => (
              <Card key={index} data={show} />
            ))}

            <div className="relative aspect-video shrink-0 grow-0 min-w-0 basis-1/2 overflow-hidden sm:max-md:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 border-[1px] hover:scale-95 duration-300 will-change-transform rounded-md bg-primary ">
              <Link
                href="/continue-watching"
                className="text-2xl font-medium absolute text-secondary h-full w-full flex justify-center items-center hover:text-textAccent duration-150 ease-in-out
                "
              >
                Your Watchlist
              </Link>
              <Image
                src={waveGif}
                alt="wave gif"
                width={120}
                unoptimized={false}
                className="-bottom-2 right-4 fixed -z-10 w-24"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function Card({ data }) {
  const [hovering, setHovering] = useState(false);

  const { title, episodeLength, episodeNumber, timeWatched, thumbNail } = data;

  // TODO: progress bar
  const progressWatched = 1 / 2;

  return (
    <div
      href="/"
      onMouseOver={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
      className="
      shrink-0 grow-0 min-w-0 basis-1/2 sm:max-md:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 border-[1px] rounded-md "
    >
      <div className="relative rounded-t-md aspect-video overflow-hidden ">
        {/* thumbnail image */}
        <Link href="/asd">
          <Image
            src={thumbNail}
            width={1920}
            height={1080}
            alt={title}
            className={`h-full object-cover w-full rounded-t-md will-change-transform transform-gpu duration-300 ease-in-out ${
              hovering && "scale-105"
            }`}
          />
          {/* hover overlay */}
          <div className="absolute w-full h-full top-0 ">
            {/* play */}
            <div
              className={`${
                hovering ? "opacity-100" : "opacity-0"
              } bg-gray-950/50 absolute inset-0 will-change-transform transform-gpu duration-300 ease-in-out flex justify-center items-center `}
            >
              <span
                className={`${
                  hovering ? "scale-110 " : "scale-100"
                } rounded-full p-2 duration-300 ease-in-out`}
              >
                <Play size={36} className="text-white" fill="#fff" />
              </span>
            </div>

            {/* episode and completion*/}
            <div className="flex justify-between items-end absolute bottom-0 w-full">
              <h3 className="m-1 font-semibold tracking-wider text-[10px] bg-zinc-950/80 text-white inline p-1 rounded">
                EP {episodeNumber}
              </h3>
              <h3 className="font-semibold tracking-wider text-[10px] bg-zinc-950/80 inline p-1 rounded m-1 text-white">
                {timeWatched}
                <span className="text-muted-foreground">/{episodeLength}</span>
              </h3>
            </div>
          </div>

          {/* progress completion */}
          <div className="absolute bottom-0 h-0.5 w-full bg-muted-foreground ">
            <div
              className="h-full bg-rose-500 origin-left"
              // progress bar
              style={{
                scale: `${progressWatched} 1`,
              }}
            />
          </div>
        </Link>

        {/* delete button /remove*/}
        <div className="absolute top-1 left-1">
          <button
            onClick={() => {
              console.log({ title });
            }}
          >
            <div
              className={`bg-background  p-0.5 rounded hover:invert duration-300 ease-in-out ${
                hovering ? "opacity-100" : "opacity-30"
              }`}
            >
              <X size={16} />
            </div>
          </button>
        </div>
      </div>

      <div className="h-7 flex items-center justify-start bg-background overflow-x-hidden">
        <h2
          className={`${
            hovering && "text-textAccent "
          } w-[95%] text-xs mx-auto font-medium line-clamp-1 `}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}

export default ContinueWatchingContainer;
