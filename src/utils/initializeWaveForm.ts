const initializeWaveForm = async (fileUrl: string, samples: number) => {
  try {
    const audioContext = new AudioContext();
    const res = await fetch(fileUrl);

    const data = await res.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(data);

    const leftChannel = audioBuffer.getChannelData(0);
    const rightChannel =
      audioBuffer.numberOfChannels > 1
        ? audioBuffer.getChannelData(1)
        : leftChannel;

    // const samples = 200; // 원하는 샘플 수 많아질수록 오디오 막대들이 빽빽해짐
    const blockSize = Math.floor(leftChannel.length / samples);
    let waveform = new Float32Array(samples);

    for (let i = 0; i < samples; i++) {
      let blockStart = i * blockSize;
      let sum = 0;
      for (let j = 0; j < blockSize; j++) {
        sum += (leftChannel[blockStart + j] + rightChannel[blockStart + j]) / 2;
      }
      waveform[i] = sum / blockSize;
    }

    return waveform;
  } catch (err) {
    console.error("WaveForm 생성 중 오류가 발생했어요 ! ", err);
    return null;
  }
};

export default initializeWaveForm;
