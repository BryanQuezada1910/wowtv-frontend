import React from "react";

// This imports the functional component from the previous sample.
import VideoJS from "./VideoJS";

const Live = () => {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "https://cdn.elsalvadordigital.com:1936/wowtv/smil:wowtv.smil/playlist.m3u8",
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      VideoJS.log("player is waiting");
    });

    player.on("dispose", () => {
      VideoJS.log("player will dispose");
    });
  };

  return (
    <>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </>
  );
};

export default Live;
