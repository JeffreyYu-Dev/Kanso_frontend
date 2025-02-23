"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import HorizontalCard from "@/components/carousel/cards/horizontalCard";

const MiniSidebarContainer = ({ data, title, url }) => {
  const [isOpen, setisOpen] = useState(false);
  const containerRef = useRef(null);

  const handleScroll = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setisOpen((state) => !state);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="pt-4 pl-2 pr-4 pb-2 bg-card rounded-md">
        {/* title header */}
        <Link href={url}>
          <h1 className="inline-flex items-center text-3xl font-satoshi font-bold duration-300 hover:translate-x-4 ease-in-out transform-gpu will-change-transform hover:text-textAccent">
            {title}
            <ChevronRight size={40} strokeWidth={3} />
          </h1>
        </Link>

        {/* content container */}
        <div
          ref={containerRef}
          className={`flex gap-y-2 flex-col overflow-hidden scroll-smooth bg-secondary/20 p-2 ${
            isOpen ? "h-[30rem] overflow-y-auto" : "h-[26rem]"
          } font-satoshi mt-2 duration-300 ease-in-out`}
        >
          {data.map((show, index) => {
            return (
              <HorizontalCard
                index={index}
                key={show.title.native}
                details={show}
              />
            );
          })}
        </div>

        {/* more button */}
        <div className="bg-primary-foreground mt-2 rounded py-1">
          <button
            className="w-full h-full flex items-center justify-center hover:text-textAccent duration-300 ease-in-out"
            onClick={handleScroll}
          >
            {isOpen ? (
              <ChevronUp size={28} strokeWidth={4} />
            ) : (
              <ChevronDown size={28} strokeWidth={4} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniSidebarContainer;
