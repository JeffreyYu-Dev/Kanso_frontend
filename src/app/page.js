import Hero from "@/components/carousel/hero";
import ContinueWatchingContainer from "@/components/carousel/continueWatching";
import MainSection from "@/components/home/mainSection";

async function getData() {
  // list of end points
  const endpoints = [
    "http://localhost:8000/trending",
    "http://localhost:8000/latest-aired",
    "http://localhost:8000/top-airing",
    "http://localhost:8000/upcoming",
  ];

  // fetch all endpoints
  const data = await Promise.all(
    endpoints.map(async (url) => {
      const res = await fetch(url, {
        next: { revalidate: true | 0 | 60 },
        // Expire every minute? ion know
        // FIXME: tweak
      }).then((res) => res.json());
      return res.data;
    })
  );

  return data;
}

export default async function Home() {
  const [trending, latestAired, topAiring, upcoming] = await getData();

  // trim to 24 shows
  const trimLatestAired = latestAired.slice(0, 24);

  return (
    <div className="mt-4">
      <Hero carouselData={trending} />
      <ContinueWatchingContainer />
      <MainSection
        latestAired={trimLatestAired}
        topAiring={topAiring}
        upcoming={upcoming}
      />
    </div>
  );
}
