import { RefObject } from "react";
import initializeWaveForm from "./initializeWaveForm";
import drawWaveForm from "./drawWaveForm";

const drawInitializedWaveForm = async (
  audioFileSrc: string,
  canvasRef: RefObject<HTMLCanvasElement>,
  waveFormBarWidth: number,
  waveFormBarGap: number,
  waveFormBaseBarHeight: number,
  waveFormBarVariability: number,
  currentTimePercent: number,
  waveFormBackgroundTopColor: string,
  waveFormBackgroundBottomColor: string,
  waveFormBaTopColor: string,
  waveFormBarBottomColor: string
) => {
  const initializedWaveForm = await initializeWaveForm(audioFileSrc, 200);

  if (canvasRef.current) {
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext("2d");
    canvasRef.current.width = canvasRef.current.offsetWidth;
    canvasRef.current.height = canvasRef.current.offsetHeight;
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    drawWaveForm(
      canvasCtx,
      initializedWaveForm,
      WIDTH,
      HEIGHT,
      waveFormBarWidth,
      waveFormBarGap,
      waveFormBaseBarHeight,
      waveFormBarVariability,
      currentTimePercent,
      waveFormBackgroundTopColor,
      waveFormBackgroundBottomColor,
      waveFormBaTopColor,
      waveFormBarBottomColor
    );
  }
};

export default drawInitializedWaveForm;
