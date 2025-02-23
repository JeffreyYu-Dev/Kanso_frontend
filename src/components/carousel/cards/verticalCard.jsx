"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Play, Plus, Mic, Captions } from "lucide-react";
import { statusColours } from "@/utils/status";

const VerticalCard = ({ showDetails }) => {
  const [hovering, setHovering] = useState(false);

  const {
    id,
    title,
    format,
    seasonYear,
    averageScore,
    coverImage,
    episodes,
    nextAiringEpisode,
    status,
    characters,
  } = showDetails.media;

  // HOW THIS WORKS
  // we know it's dubbed if the length of the voiceActors array > 1
  // we know that 1 is the subbsed language(chinese/japanese)
  const languages = characters.edges[0]?.voiceActors;
  const isDubbed = languages?.length > 1;

  return (
    <div
      className="font-satoshi w-full"
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
    >
      {/* coverImage */}
      <div
        className={`${
          hovering && "-translate-y-1.5"
        } relative w-full pt-[140%] duration-300 ease-in-out transform-gpu will-change-contents`}
      >
        <Link
          href={{
            pathname: "/watch/",
            query: { id: id, episode: 1 },
          }}
          className="absolute inset-0  overflow-hidden rounded"
        >
          {/* FIXME: images aren't optimized */}
          <Image
            src={coverImage.large}
            alt={title}
            fill
            sizes="(max-width: 320px) 100vw, (max-width: 375px) 50vw, (max-width: 640px) 33vw, 25vw"
            className=" object-cover"
          />

          {/* overlay */}
          <div
            className={`bg-gray-950/50 absolute h-[105%] w-[105%] will-change-transform transform-gpu duration-150 ease-in-out flex justify-center items-center ${
              hovering ? "opacity-100" : "opacity-0"
            }`}
          >
            {/*PLAY */}
            <span
              className={`rounded-full p-2 duration-150 ease-in-out transform ${
                hovering ? "scale-110 opacity-80" : "scale-100 opacity-100"
              }`}
            >
              <Play size={36} className="text-white" fill="#fff" />
            </span>
          </div>
          {/* YEAR */}
          {seasonYear && (
            <div className="bg-accent items-center justify-center rounded px-1 py-0.5 absolute top-1 left-1">
              <h2 className="text-muted-foreground font-bold tracking-wider text-[11px]">
                {seasonYear}
              </h2>
            </div>
          )}
        </Link>
      </div>

      {/* details */}
      <div className="m-1  flex flex-col overflow-hidden gap-1">
        {/* TITLE */}
        <div className="flex items-center gap-1">
          <span className={`size-2 ${statusColours[status]} rounded-full`} />
          <h1
            className={`font-bold text-xs line-clamp-1 text-pretty w-full `}
            style={{
              color: `${hovering ? coverImage.color : ""}`,
            }}
          >
            {title.english || title.romaji}
          </h1>
        </div>

        {/* smaller details*/}
        <div className="flex gap-1">
          {/* format */}
          {format && (
            <div className="bg-accent items-center justify-center rounded px-1 py-0.5 ">
              <h2 className="text-muted-foreground font-bold tracking-wider text-[11px]">
                {format}
              </h2>
            </div>
          )}

          {/* SCORE */}
          {averageScore && (
            <div className="bg-accent items-center justify-center rounded px-1 py-0.5 ">
              <h2 className="text-muted-foreground font-bold tracking-wider text-[11px] flex items-center gap-0.5">
                <Star size={12} />
                {averageScore}
              </h2>
            </div>
          )}

          {/* episodes */}
          {episodes && (
            <div className="bg-accent items-center justify-center rounded px-1 py-0.5 ">
              <h2 className="text-muted-foreground font-semibold tracking-wider text-[11px] flex items-center gap-0.5">
                {isDubbed && <Mic size={12} />}
                {episodes && <Captions size={12} />}
                {nextAiringEpisode && (
                  <span>{nextAiringEpisode.episode - 1}</span>
                )}
                {nextAiringEpisode && episodes && <span>/</span>}
                {episodes && <span>{episodes}</span>}
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerticalCard;
