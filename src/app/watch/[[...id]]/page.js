import React from "react";
import Player from "../../../components/player/player";
import Image from "next/image";
import { Globe, Caravan, Bell } from "lucide-react";
import { SiAnilist, SiMyanimelist } from "react-icons/si";

const getPage = async (id) => {
  const url = `http://localhost:8000/show/${id}`.toString();

  const data = await fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      return null;
    });
  return data;
};

// convert the dates from objects into dates(used only in the show details section)
const formatShowDates = ({ day, month, year }) => {
  const dateString = `${year}-${month}-${day}`;
  return new Date(dateString).toLocaleString("en-us", {
    dateStyle: "long",
  });
};

// TODO: add user's current timezone instead of fixed EST ONE
// calculate the time until airnig, and format long date
const calculate_time_until_airing = (epoch_time) => {
  const epoch_time_in_ms = epoch_time * 1000;
  const d = new Date(epoch_time_in_ms);

  // long date used next airing episode
  const long_date = d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time_of_release = d.toLocaleTimeString("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
  });

  const timezone = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
  }).format(d);

  // const remaining_time_until_release = d.

  return { long_date, time_of_release };
};

// INSANELY SLOW improve performance by caching on redis?
const Page = async ({ params, searchParams }) => {
  // QUERIES
  const { id, episode: episodeNumber } = await searchParams;

  // get page data
  const pageData = await getPage(id);
  console.log(pageData);
  if (!id || !episodeNumber || !pageData) return <h1>INVALID PARAMS</h1>;
  const {
    title,
    start_date,
    end_date,
    airing_schedule,
    external_id,
    episodes,
    cover_image,
    external_links,
    season_year,
    description,
    format,
    clear_logo,
    status,
    rating,
    studios,
    duration,
    season_quarter,
    country,
    adult,
    genres,
    seasons,
    recommendations,
    related,
  } = pageData;

  return (
    <div className="mt-4 flex flex-col gap-4 font-generalSans ">
      {/* MAIN PLAYER with episode selector */}
      {/* <Player data={{ id, episodeNumber, episodes }} /> */}

      {/* airing schedule */}
      <div className="bg-card p-4 gap-2 rounded flex items-center ">
        <Bell size={16} strokeWidth={3} />
        <h1 className="text-xs tracking-wide">
          Episode <span className="font-bold">1</span> will air on Thu Feb 20,
          2025, 10:38 EST
          <span className="font-bold"> (6 days, 10 hours)</span>
        </h1>
      </div>

      {/* seasons */}
      {/* TODO: fix seasons component */}
      {seasons.length != 0 && (
        <div className="bg-red-500 h-52 rounded">seasons</div>
      )}
      {/* show details */}
      <div className="flex-col flex lg:flex-row gap-4 justify-between items-center flex-grow rounded">
        {/* inset container */}
        <div className="rounded-md flex-grow bg-card p-2">
          <div className="flex h-full gap-2">
            {/* external links and poster image */}
            <div className="basis-72 sm:basis-56 p-2">
              <Image
                src={cover_image.url}
                alt={title.english || title.romaji || title.native}
                width={460}
                height={650}
                className="rounded-md"
              />
              {/* external links */}
              <div className="mt-2 grid grid-cols-2 gap-2 ">
                <a
                  target="_blank"
                  href={`https://www.youtube.com/watch?v=${external_links.trailer.id}`}
                  className="col-span-2 flex items-center justify-center duration-100 ease-in-out gap-1 text-center p-2 rounded  hover:outline hover:outline-textAccent outline-1 outline-muted outline hover:text-textAccent text-muted-foreground"
                >
                  <Caravan size={14} />
                  <h1 className=" text-xs font-semibold">TRAILER</h1>
                </a>
                <a
                  target="_blank"
                  href={`${external_links.official_site}`}
                  className="font-semibold col-span-2 flex items-center duration-100 ease-in-out justify-center gap-1 text-center p-2 text-xs rounded hover:outline hover:outline-textAccent  outline-1 outline-muted outline hover:text-textAccent text-muted-foreground"
                >
                  <Globe size={14} />
                  <h1 className=" text-xs font-semibold">OFFICAL SITE</h1>
                </a>
                <a
                  target="_blank"
                  href={external_links.anilist}
                  className="rounded flex items-center justify-center h-8 duration-100 ease-in-out text-center text-sm hover:outline hover:outline-textAccent  outline-1 outline-muted outline hover:text-textAccent text-muted-foreground"
                >
                  <SiAnilist className="" size={"1.5rem"} />
                </a>
                <a
                  target="_blank"
                  href={external_links.mal}
                  className="rounded flex justify-center h-8 items-center duration-100 ease-in-out text-center hover:outline hover:outline-textAccent outline-1 outline-muted outline hover:text-textAccent text-muted-foreground"
                >
                  <SiMyanimelist size={"2.75rem"} />
                </a>
              </div>
            </div>

            {/* REAL DETAILS */}
            <div className=" flex flex-col w-full">
              {/* title */}
              <h1 className="font-semibold text-lg">
                {title.english || title.romaji || title.native}
              </h1>
              {/* romaji */}
              <h2
                className="text-sm font-medium italic text-primary"
                style={{ color: cover_image.color }}
              >
                {title.romaji}
              </h2>

              {/* DESCRIPTION */}
              <p className="text-xs bg-accent p-1 rounded inline-block mt-2 text-muted-foreground text-pretty">
                {description}
              </p>

              {/* details */}
              <div className="mt-4 shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <h3 className="text-xs font-semibold tracking-wider">
                  <span className="font-medium text-muted-foreground">
                    Format:{" "}
                  </span>
                  {format}
                </h3>
                <h3 className="text-xs font-semibold tracking-wider">
                  <span className="font-medium text-muted-foreground">
                    Episodes:{" "}
                  </span>
                  {/* TODO: FIX THIgS */}
                  {/* {episodes?.current} */}
                  {/* {episodes.total && (
                    <span className="text-muted-foreground">
                      /{episodes.total}
                    </span>
                  )} */}
                </h3>
                <h3 className="text-xs font-semibold tracking-wider">
                  <span className="font-medium text-muted-foreground">
                    Start Date:{" "}
                  </span>{" "}
                  {start_date && formatShowDates(start_date)}
                </h3>
                <h3 className="text-xs font-semibold tracking-wider">
                  <span className="font-medium text-muted-foreground">
                    Duration:{" "}
                  </span>
                  {duration || "24"} mins
                </h3>
                <h3 className="text-xs font-semibold tracking-wider">
                  <span className="font-medium text-muted-foreground">
                    End Date:{" "}
                  </span>{" "}
                  {end_date && formatShowDates(end_date)}
                </h3>
                <h3 className="text-xs font-semibold tracking-wider">
                  <span className="font-medium text-muted-foreground">
                    Season:{" "}
                  </span>
                  {season_quarter}
                </h3>

                <h3 className="text-xs font-semibold tracking-wider">
                  <span className="font-medium text-muted-foreground">
                    Status:{" "}
                  </span>
                  {status}
                </h3>
                <h3 className="text-xs font-semibold tracking-wider">
                  <span className="font-medium text-muted-foreground">
                    Country:{" "}
                  </span>
                  {country}
                </h3>

                <h3 className="text-xs font-semibold tracking-wider">
                  <span className="font-medium text-muted-foreground">
                    Rating:{" "}
                  </span>
                  {rating}
                  <span className="text-muted-foreground">/100</span>
                </h3>

                <h3 className="text-xs font-semibold tracking-wider">
                  <span className="font-medium text-muted-foreground">
                    Adult:{" "}
                  </span>
                  {adult}
                </h3>
                {/* studios */}
                <h3 className="text-xs font-semibold tracking-wider text-pretty">
                  <span className="font-medium text-muted-foreground">
                    Studios:{" "}
                  </span>{" "}
                  {studios.map((studio, index) => {
                    if (index == studios.length - 1) return studio;
                    return `${studio}, `;
                  })}
                </h3>
                <h3 className="text-xs font-semibold tracking-wider">
                  <span className="font-medium text-muted-foreground">
                    Genres:{" "}
                  </span>{" "}
                  {"stuff"}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* related content to show */}
        <div className="bg-card self-start duration-300 ease-in-out rounded basis-96 lg:basis-80 xl:basis-96 shrink-0 w-full p-2">
          related content (cocming in the future)
        </div>
      </div>

      {/* recommendations */}
      <div className="bg-card h-96 rounded">
        Recommendations (coming in the future)
      </div>
    </div>
  );
};

export default Page;
