"use client";
import React, { useState } from "react";
import { statusColours } from "@/utils/status";
import Image from "next/image";
import { Star, Captions, Mic } from "lucide-react";
import Link from "next/link";

const HorizontalCard = ({ ref, details, index }) => {
  const [hovering, setHovering] = useState(false);

  // HOW THIS WORKS
  // we know it's dubbed if the length of the voiceActors array > 1
  // we know that 1 is the subbsed language(chinese/japanese)
  const languages = details.characters.edges[0]?.voiceActors;
  const isDubbed = languages?.length > 1;

  // const statusColours = {
  //   FINISHED: "bg-sky-500",
  //   RELEASING: "bg-lime-500",
  //   NOT_YET_RELEASED: "bg-orange-500",
  //   CANCELLED: "bg-red-500",
  //   HIATUS: "bg-yellow-500",
  // };

  return (
    <Link
      href={{
        pathname: "/watch/",
        query: { id: details.id, episode: 1 },
      }}
      className="relative"
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="absolute w-full h-full flex items-center">
        <h2
          className="text-7xl font-bold font-generalSans italic translate-x-1"
          style={{
            color: `${
              details.coverImage.color ? details.coverImage.color : "#a78bfa"
            }`,
          }}
        >
          #{index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}
        </h2>
      </div>

      <div
        className={`rounded-lg flex bg-primary-foreground h-24 duration-1000 ease-in-out transform-gpu will-change-contents ${
          hovering ? "translate-x-36" : "translate-x-0 "
        }`}
      >
        {/* Poster - Fixed the width and height to maintain aspect ratio */}
        <div className="relative h-full w-16 flex-shrink-0">
          <Image
            src={details.coverImage.large}
            alt={
              details.title.native ||
              details.title.english ||
              details.title.romaji
            }
            fill
            className="object-cover rounded-md"
            priority
          />
        </div>

        {/* details */}
        <div className="grow p-2 flex flex-col justify-center">
          {/* TITLE */}
          <div className="flex items-center gap-2 ">
            <span
              className={`size-2 ${statusColours[details.status]} rounded-full`}
            />
            <h1
              className="font-bold line-clamp-2 text-sm/4 text-pretty w-full text-foreground duration-300 ease-in-out"
              style={{
                color: `${hovering ? details.coverImage.color : ""}`,
              }}
            >
              {details.title.english || details.title.romaji}
            </h1>
          </div>

          <div className="ml-3.5 mt-2">
            {/* smaller details*/}
            <div className="flex gap-1">
              {/* format */}
              {details.format && (
                <div className="bg-secondary/50 items-center justify-center rounded px-1 py-0.5">
                  <h2 className="text-muted-foreground text-[10px] font-semibold">
                    {details.format}
                  </h2>
                </div>
              )}

              {/* SCORE */}
              {details.averageScore && (
                <div className="bg-secondary/50 items-center justify-center rounded px-1 py-0.5">
                  <h2 className="text-muted-foreground font-semibold flex items-center text-[10px] gap-0.5">
                    <Star size={12} />
                    {details.averageScore}
                  </h2>
                </div>
              )}

              {/* episodes */}
              {details.episodes && (
                <div className="bg-secondary/50 items-center justify-center rounded px-1 py-0.5">
                  <h2 className="text-muted-foreground font-semibold flex items-center text-[10px] gap-0.5">
                    {isDubbed && <Mic size={12} />}
                    {details.episodes && <Captions size={12} />}
                    {details.nextAiringEpisode && (
                      <span>{details.nextAiringEpisode.episode - 1}</span>
                    )}
                    {details.nextAiringEpisode && details.episodes && (
                      <span>/</span>
                    )}
                    {details.episodes && <span>{details.episodes}</span>}
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HorizontalCard;
