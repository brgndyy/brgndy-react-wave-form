import React, { useEffect, useRef, RefObject } from "react";
import WaveFormCanvas from "../WaveFormCanvas/WaveFormCanvas";
import drawWaveForm from "../../utils/drawWaveForm";
import { useAudio } from "../Provider/AudioWaveFormWrapper";
import drawInitializedWaveForm from "../../utils/drawInitializedWaveForm";

type AudioWaveFormPropsType = {
  audioFileSrc: string;
  waveFormClassName?: string;
  waveFormWidth?: number;
  waveFromHeight?: number;
  barWidth?: number;
  barGap?: number;
  baseBarHeight?: number;
  barVariability?: number;
};

export default function AudioWaveForm({
  audioFileSrc,
  waveFormClassName,
  waveFormWidth,
  waveFromHeight,
  barWidth,
  barGap,
  baseBarHeight,
  barVariability,
}: AudioWaveFormPropsType) {
  const classNameOfWaveForm = waveFormClassName ?? "";

  const widthOfWaveForm = waveFormWidth ?? 500;
  const heightOfWaveForm = waveFromHeight ?? 200;

  const waveFormBarWidth = barWidth ?? 3;
  const waveFormBarGap = barGap ?? 3;
  const waveFormBaseBarHeight = baseBarHeight ?? 0.2;
  const waveFormBarVariability = barVariability ?? 0.6;

  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);
  const { currentSrc, isPlaying, audioFile, prevSrc, waveform } = useAudio();

  useEffect(() => {
    if (audioFile) {
      const handleTimeUpdate = async () => {
        if (audioFileSrc !== currentSrc) {
          return;
        }

        if (canvasRef.current && waveform) {
          const canvas = canvasRef.current;
          const canvasCtx = canvas.getContext("2d");
          const WIDTH = canvas.width;
          const HEIGHT = canvas.height;
          const currentTimePercent = audioFile.currentTime / audioFile.duration;
          drawWaveForm(
            canvasCtx,
            waveform,
            WIDTH,
            HEIGHT,
            waveFormBarWidth,
            waveFormBarGap,
            waveFormBaseBarHeight,
            waveFormBarVariability,
            currentTimePercent
          );
        }
      };
      const handleAudioEnded = async () => {
        await drawInitializedWaveForm(
          audioFileSrc,
          canvasRef,
          waveFormBarWidth,
          waveFormBarGap,
          waveFormBaseBarHeight,
          waveFormBarVariability
        );
      };

      audioFile.addEventListener("timeupdate", handleTimeUpdate);
      audioFile.addEventListener("ended", handleAudioEnded);
      return () => {
        audioFile.removeEventListener("timeupdate", handleTimeUpdate);
        audioFile.removeEventListener("ended", handleAudioEnded);
      };
    }
  }, [currentSrc, isPlaying, audioFileSrc, canvasRef, waveform]);

  // 초기에 파형 그려주기
  useEffect(() => {
    const drawInitialWaveForm = async () => {
      await drawInitializedWaveForm(
        audioFileSrc,
        canvasRef,
        waveFormBarWidth,
        waveFormBarGap,
        waveFormBaseBarHeight,
        waveFormBarVariability
      );
    };

    drawInitialWaveForm();
  }, [prevSrc]);

  const clickCanvasProgressBarHandler = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (!audioFile) return;

    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const clientX = event.clientX;

    const clickPosition = (clientX - rect.left) / rect.width;
    const newTime = clickPosition * audioFile.duration;

    if (newTime >= 0 && newTime <= audioFile.duration) {
      audioFile.currentTime = newTime;
    }
  };

  return (
    <WaveFormCanvas
      canvasRef={canvasRef}
      className={classNameOfWaveForm}
      width={widthOfWaveForm}
      height={heightOfWaveForm}
      clickCanvasProgressBarHandler={clickCanvasProgressBarHandler}
    />
  );
}
