import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
const audioUrl = new URL("../public/calm-ocean-waves.mp3", import.meta.url);
const videoUrl = "https://cams.cdn-surfline.com/cdn-ec/cr-backyardshermosa/chunklist.m3u8";

/**
 * Example online player https://livepush.io/hls-player/index.html
 * video from Playa Hermosa North, Costa Rica'
 * https://www.surfline.com/surf-report/playa-hermosa-north/5842041f4e65fad6a7708b50?camId=60a3c7df4f2979815d160ac1
 *
 */

const getTime = () => new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000 + 3600000 * -6);

const TimeDisplay = () => {
  const [time, setTime] = useState(() => getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const time = getTime();
      setTime(time);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className="time">{time.toLocaleString()}</div>;
};

export const Widget = ({ ...props }) => {
  const scale = props.scale || 1;
  return (
    <div className="container">
      <div className="label">
        <a href="https://www.surfline.com/surf-report/playa-hermosa-north/5842041f4e65fad6a7708b50?camId=60a3c7df4f2979815d160ac1">
          Camera from SurfLine
        </a>
        <TimeDisplay />
      </div>

      <ReactPlayer
        className="w-full h-full"
        playing
        loop
        muted
        url={videoUrl + "?t=" + new Date().getTime()}
        onReady={(player) => {
          const e = player.getInternalPlayer();
          console.log("onReady", e);
          e.setAttribute("crossOrigin", "anonymous");
          e.setAttribute("muted", true);
        }}
        config={{
          file: {
            forceHLS: false,
            forceVideo: true,
            hlsOptions: {
              xhrSetup: (xhr) => {
                console.log("Init XHR", xhr);
              },
            },
            attributes: {
              crossOrigin: "anonymous",
              muted: true,
            },
          },
        }}
      />

      <audio controls loop autoPlay id="audio">
        <source src={audioUrl + "?t=" + new Date().getTime()} type="audio/mpeg" />
      </audio>
    </div>
  );
};
