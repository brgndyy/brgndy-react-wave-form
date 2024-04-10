import React from "react";
import { useAudio } from "../Provider/AudioWaveFormWrapper";
import initializeWaveForm from "../../utils/initializeWaveForm";

type PlayOrPauseButtonProps = {
  audioFileSrc: string;
  className?: string;
  playOrPauseValues?: [string, string] | [React.ReactNode, React.ReactNode];
};

export default function PlayOrPauseButton({
  audioFileSrc,
  className,
  playOrPauseValues,
}: PlayOrPauseButtonProps) {
  const buttonClassName = className ?? "";
  const { playAudio, isPlaying, currentSrc, setWaveform } = useAudio();

  const buttonStateValues = playOrPauseValues ?? ["play", "pause"];

  const selectSongHandler = async (currentMusicSrc: string) => {
    setWaveform(null);

    playAudio(currentMusicSrc);

    const initializedWaveForm = await initializeWaveForm(currentMusicSrc, 200);
    setWaveform(initializedWaveForm);
  };

  return (
    <button
      onClick={() => selectSongHandler(audioFileSrc)}
      className={buttonClassName}
    >
      {isPlaying && audioFileSrc === currentSrc
        ? buttonStateValues[1]
        : buttonStateValues[0]}
    </button>
  );
}
