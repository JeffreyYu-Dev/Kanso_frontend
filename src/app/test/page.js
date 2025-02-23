import React from "react";
// Base styles for media player and provider (~400B).
import "@vidstack/react/player/styles/base.css";
import { MediaPlayer, MediaProvider, Track } from "@vidstack/react";

//
const Test = () => {
  return (
    <MediaPlayer
      title="Sprite Fight"
      src="https://vd2.biananset.net/_v7/780282fe20804fdb74e8cff214163796bfba278d2e876b2217f7df591c87824eb1831e69a7475394f6ad5fb130e50afecff935aba496b804dbec1ff170cf60a8a0bed18953e5055c0e191d6d34211da1f60bb510d495048a9eb03c871abc8eda179a66cc3d183733967bf2b7b3a44faa953cf67f027e29962ff331b535640b6d/master.m3u8"
    >
      <MediaProvider>
        <Track
          src="https://s.megastatics.com/subtitle/64d5d5ba9039a08f9eb369320b03df29/eng-2.vtt"
          kind="subtitles"
          label="English"
          lang="en-US"
          default
        />
      </MediaProvider>
    </MediaPlayer>
  );
};

export default Test;
