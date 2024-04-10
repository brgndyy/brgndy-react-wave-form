import React, { RefObject } from "react";

type WaveformCanvasPropsType = {
  canvasRef: RefObject<HTMLCanvasElement> | null;
  clickCanvasProgressBarHandler: (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => void;
  className: string;
  width: number;
  height: number;
};

export default function WaveFormCanvas({
  canvasRef,
  clickCanvasProgressBarHandler,
  className = "",
  width,
  height,
}: WaveformCanvasPropsType) {
  return (
    <canvas
      style={{
        cursor: "pointer",
      }}
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      onClick={clickCanvasProgressBarHandler}
    ></canvas>
  );
}
