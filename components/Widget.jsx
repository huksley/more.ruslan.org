import React from "react";
import ReactPlayer from "react-player";
const audioUrl = new URL("../public/calm-ocean-waves.mp3", import.meta.url);
/**
 * Example online player https://livepush.io/hls-player/index.html
 * video from Playa Hermosa North, Costa Rica 
 * https://www.surfline.com/surf-report/playa-hermosa-north/5842041f4e65fad6a7708b50?camId=60a3c7df4f2979815d160ac1
 *
 */

export const Widget = ({ ...props }) => {
  const scale = props.scale || 1;
  return (
    <div className="w-full h-full border-2 border-black">
      <ReactPlayer
        className="w-full h-full"
        playing
        loop
        muted
        url="https://cams.cdn-surfline.com/cdn-ec/cr-backyardshermosa/chunklist.m3u8"
      />

      <audio controls loop autoPlay hidden>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};
