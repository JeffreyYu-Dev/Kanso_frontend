import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import VerticalCard from "@/components/carousel/cards/verticalCard";
import MiniSidebarContainer from "./miniSidebar/miniSidebarContainer";

const MainSection = ({ latestAired, topAiring, upcoming }) => {
  return (
    <div className="mt-8 xl:flex lg:gap-8">
      {/* section title latest aired */}
      <div className="xl:w-8/12 2xl:w-9/12">
        <Link href="/just-aired ">
          <h1 className="inline-flex items-center text-3xl font-satoshi font-bold duration-300 hover:translate-x-4 ease-in-out transform-gpu will-change-transform hover:text-textAccent">
            Just Aired
            <ChevronRight size={40} strokeWidth={3} />
          </h1>
        </Link>

        {/* latest aired content */}
        {/* GRID ?  */}
        <div className="grid grid-cols-1 xxs:grid-cols-2 xs:grid-cols-3 sm++:grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-4 rounded-md mt-2">
          {latestAired.map((show, index) => {
            return <VerticalCard showDetails={show} key={index} />;
          })}
        </div>
      </div>

      {/* mini content */}
      <div className=" lg:flex-1 mt-8 gap-x-4 flex xl:flex-col xxs:flex-col sm:flex-row gap-y-4">
        <MiniSidebarContainer
          data={topAiring}
          title={"Top Airing"}
          url={"/top-airing"}
        />
        <MiniSidebarContainer
          data={upcoming}
          title={"Upcoming"}
          url={"/upcoming"}
        />
      </div>
    </div>
  );
};

export default MainSection;
