export function createWaveFormDrawer({
  barWidth,
  gap,
  baseHeightRatio,
  variability,
  waveFormBackgroundTopColor,
  waveFormBackgroundBottomColor,
  waveFormBaTopColor,
  waveFormBarBottomColor,
}: {
  barWidth: number;
  gap: number;
  baseHeightRatio: number;
  variability: number;
  waveFormBackgroundTopColor: string;
  waveFormBackgroundBottomColor: string;
  waveFormBaTopColor: string;
  waveFormBarBottomColor: string;
}) {
  return function drawWaveForm(
    canvasCtx: CanvasRenderingContext2D,
    waveform: Float32Array,
    canvasWidth: number,
    canvasHeight: number,
    currentTimePercent: number
  ) {
    if (!waveform) return;

    canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);

    let x = 0;
    const baseHeight = canvasHeight * baseHeightRatio;
    const maxAmplitude = Math.max(...waveform);
    const currentX = currentTimePercent * canvasWidth; // 현재 재생 범위

    for (let i = 0; i < waveform.length; i++) {
      const variation = baseHeight * variability * (waveform[i] / maxAmplitude);
      const barHeight = baseHeight + variation;
      const topBarStartY = canvasHeight / 2 - barHeight;

      canvasCtx.fillStyle =
        x < currentX ? waveFormBaTopColor : waveFormBackgroundTopColor;
      canvasCtx.fillRect(x, topBarStartY, barWidth, barHeight);
      canvasCtx.fillStyle =
        x < currentX ? waveFormBackgroundBottomColor : waveFormBarBottomColor;
      canvasCtx.fillRect(x, canvasHeight / 2, barWidth, barHeight * 0.5);

      x += barWidth + gap;
    }
  };
}
