"use client";

// nextjs
import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// VIDSTACk
import { MediaPlayer, MediaProvider, Track } from "@vidstack/react";
// ICONS
import { ArrowLeftRight } from "lucide-react";

// buttons
const EpisodeButton = ({ episode, isFiller, handleEpisodeChange }) => {
  const episodeType = {
    default: "bg-secondary",
    active: "bg-textAccent",
    filler: "bg-red-500",
    completed: "bg-secondary opacity-50",
  };
  const currentEpisode = useSearchParams().get("episode");

  // active button
  if (currentEpisode == episode) {
    return (
      <button
        onClick={() => handleEpisodeChange(episode)}
        className={`${episodeType.active} flex justify-center rounded py-1 w-auto h-fit hover:bg-textAccent duration-150 ease-in`}
      >
        <h1 className="text-sm">{episode}</h1>
      </button>
    );
  }

  // filler
  if (isFiller) {
    return (
      <button
        onClick={() => handleEpisodeChange(episode)}
        className={`${episodeType.filler} flex justify-center rounded py-1 w-auto h-fit hover:bg-textAccent duration-150 ease-in`}
      >
        <h1 className="text-sm">{episode}</h1>
      </button>
    );
  }

  // default
  return (
    <button
      onClick={() => handleEpisodeChange(episode)}
      className={`${episodeType.default} flex justify-center rounded py-1 w-auto h-fit hover:bg-textAccent duration-150 ease-in`}
    >
      <h1 className="text-sm">{episode}</h1>
    </button>
  );
};

const PlayerOptions = () => {
  return <div className="bg-card rounded h-6 mt-1">Player OPTIONS</div>;
};

// this calculates how many "FAKE" episode buttons to add, based on the total # of actual episodes we have in our database
const AdditionalButtons = ({ episodes, handleEpisodeChange }) => {
  const airing = episodes.current != episodes.total;

  if (airing) {
    // this is for airing episodes
    const remaining = episodes.current - episodes.data.aniwatch.subbed.length;
    const buttons = [];

    for (let i = 0; i < remaining; i++) {
      buttons.push(episodes.data.aniwatch.subbed.length + i + 1);
    }

    return buttons.map((button) => {
      return (
        <EpisodeButton
          key={button}
          episode={button}
          isFiller={false}
          handleEpisodeChange={handleEpisodeChange}
        />
      );
    });
  } else {
    const remaining = episodes.total - episodes.data.aniwatch.subbed.length;
    const buttons = [];

    for (let i = 0; i < remaining; i++) {
      buttons.push(episodes.data.aniwatch.subbed.length + i + 1);
    }

    return buttons.map((button) => {
      return (
        <EpisodeButton
          key={button}
          episode={button}
          isFiller={false}
          handleEpisodeChange={handleEpisodeChange}
        />
      );
    });
  }
};

const Player = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [playerSettings, setPlayerSettings] = useState({
    autoplay: false,
    auto_next: false,
    auto_skip_intro: false,
  });

  const [currentEpisode, setCurrentEpisode] = useState(
    parseInt(searchParams.get("episode"))
  );

  const { id, episodeNumber, episodes } = data;
  const aniwatch = episodes.data.aniwatch;

  const handleEpisodeChange = (episode) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("episode", episode);
    window.history.pushState(null, "", `?${params.toString()}`);
    setCurrentEpisode(episode);
  };

  // fetch episodes based on the link
  useEffect(() => {});

  // TODO: pagination
  // create all episode buttons

  //TODO: if there are on current episodes at all for a show we have to fetch first before loading the media
  // TODO: add dynamically loading episode buttons
  return (
    <>
      <div className="flex-col flex lg:flex-row gap-4 justify-between h-fit">
        <div className="flex-grow flex flex-col">
          {episodes.data.aniwatch.subbed != 0 && (
            <MediaPlayer
              storage="storage-key"
              src={aniwatch.subbed[currentEpisode - 1].stream_links[0].url}
              className="aspect-video"
              controls
              crossOrigin
              playsInline
            >
              <MediaProvider>
                {aniwatch.subbed[currentEpisode - 1].subtitle_links.map(
                  (subtitle, index) => (
                    <Track
                      src={subtitle.file}
                      key={index}
                      kind={subtitle.kind}
                      label={subtitle.label}
                      default={subtitle?.default}
                    />
                  )
                )}
              </MediaProvider>
            </MediaPlayer>
          )}
          <PlayerOptions />
        </div>

        {/* episode list */}
        <div className="bg-card duration-300 ease-in-out rounded shrink-0 lg:basis-80 xl:basis-96 flex flex-col">
          <div className="bg-card h-8">episode options</div>
          <div className="grid grid-cols-4 xl:grid-cols-5 m-1 gap-1 overflow-y-auto">
            {/* actual buttons */}
            {aniwatch.subbed.map((item) => {
              return (
                <EpisodeButton
                  key={item.number}
                  episode={item.number}
                  isFiller={item.filler}
                  handleEpisodeChange={handleEpisodeChange}
                />
              );
            })}

            {/* additional buttons based on what's missing */}
            {/* airing  */}
            <AdditionalButtons
              episodes={episodes}
              handleEpisodeChange={handleEpisodeChange}
            />
            {/* completed */}
          </div>
        </div>
      </div>

      {/* episode DETAILS AND server */}
      <div className="flex-col flex lg:flex-row gap-4 justify-between">
        {/* larger container */}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex-grow bg-card rounded p-2">
            {/* EPISODE DETAILS */}
            {episodes.data.aniwatch.subbed.length != 0 && (
              <h2 className="font-semibold text-lg line-clamp-1">
                {episodes.data.aniwatch.subbed[currentEpisode - 1].title
                  .english || aniwatch.subbed[currentEpisode - 1].title.romaji}
              </h2>
            )}

            {/* description of episode */}
            {episodes.data.aniwatch.subbed.length != 0 && (
              <p className="text-xs line mt-2">
                {aniwatch.subbed[currentEpisode - 1].description}
              </p>
            )}
          </div>

          {/* if server doesn't work text */}
          <div className="rounded flex items-center gap-2 p-2 mt-auto bg-card">
            <ArrowLeftRight size={16} color="#FFD700" />
            <h2 className="font-semibold text-sm text-pretty ">
              If the player doesn&apos;t work or keeps buffering,{" "}
              <span className="text-yellow-400">
                <button
                  onClick={() => {
                    router.refresh();
                  }}
                >
                  <span className="underline ">try refreshing the page </span>
                </button>{" "}
                or switching providers.
              </span>
            </h2>
          </div>
        </div>

        {/* servers */}
        <div className="bg-card duration-300 ease-in-out h-40 rounded basis-96 lg:basis-80 xl:basis-96 shrink-0 p-2">
          servers(coming in the future)
        </div>
      </div>
    </>
  );
};

export default Player;
