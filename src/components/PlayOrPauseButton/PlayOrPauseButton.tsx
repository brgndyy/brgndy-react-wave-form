import React from "react";
import { useAudio } from "../Provider/AudioWaveFormWrapper";

type PlayOrPauseButtonProps = {
  src: string;
  selectSongHandler: (currentMusicSrc: string) => void;
  className: string;
  playOrPauseValues: [string, string] | [React.ReactNode, React.ReactNode];
};

export default function PlayOrPauseButton({
  src,
  selectSongHandler,
  className,
  playOrPauseValues,
}: PlayOrPauseButtonProps) {
  const { isPlaying, currentSrc } = useAudio();

  return (
    <>
      <button onClick={() => selectSongHandler(src)} className={className}>
        {isPlaying && src === currentSrc
          ? playOrPauseValues[1]
          : playOrPauseValues[0]}
      </button>
    </>
  );
}
