const drawWaveForm = (
  canvasCtx: CanvasRenderingContext2D | null,
  waveform: Float32Array | null, //
  canvasWidth: number, // 캔버스 넓이
  canvasHeight: number, // 캔버스 높이
  barWidth: number, // 막대 넓이
  gap: number, // 막대 사이 간격
  baseHeightRatio: number, // 막대 기본 높이
  variability: number, // 막대 높낮이 차이
  currentTimePercent: number // 현재 재생 위치의 퍼센트
) => {
  if (waveform && canvasCtx) {
    console.log("그리기");
    canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);

    let x = 0;

    const baseHeight = canvasHeight * baseHeightRatio;
    const maxAmplitude = Math.max(...waveform);

    const currentX = currentTimePercent * canvasWidth; // 현재 재생 범위

    for (let i = 0; i < waveform.length; i++) {
      const variation = baseHeight * variability * (waveform[i] / maxAmplitude);
      const barHeight = baseHeight + variation;
      const topBarStartY = canvasHeight / 2 - barHeight;

      // 현재 재생 위치보다 왼쪽에 있는 막대의 색상을 변경
      if (x < currentX) {
        canvasCtx.fillStyle = "rgb(0, 128, 255)"; // 재생된 부분의 색상
      } else {
        canvasCtx.fillStyle = "rgb(92, 92, 92)"; // 아직 재생되지 않은 부분의 색상
      }

      canvasCtx.fillRect(x, topBarStartY, barWidth, barHeight);
      canvasCtx.fillStyle =
        x < currentX ? "rgba(0, 128, 255, 0.7)" : "rgba(92, 92, 92, 0.7)"; // 아래쪽 대칭 부분의 투명도 조절
      canvasCtx.fillRect(x, canvasHeight / 2, barWidth, barHeight * 0.5);

      x += barWidth + gap;
    }
  }
};

export default drawWaveForm;
