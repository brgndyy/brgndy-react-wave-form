import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useRef,
  useEffect,
} from "react";

interface AudioContextType {
  playAudio: (src: string) => void;
  isPlaying: boolean;
  currentSrc: string;
  audioFile: HTMLAudioElement | null;
  prevSrc: string;
}

const AudioContext = createContext<AudioContextType>({
  playAudio: () => {},
  isPlaying: false,
  currentSrc: "",
  audioFile: null,
  prevSrc: "",
});

export const useAudio = () => {
  return useContext(AudioContext);
};

const AudioWaveFormWrapper = ({ children }: PropsWithChildren<{}>) => {
  const [currentSrc, setCurrentSrc] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [prevSrc, setPrevSrc] = useState("");

  const audioRef = useRef(new Audio());

  const playAudio = (src: string) => {
    const absoluteSrc = new URL(src, window.location.origin).href;

    if (audioRef.current.src !== absoluteSrc) {
      setPrevSrc(audioRef.current.src);
      audioRef.current.src = absoluteSrc;
      audioRef.current.play();
      setIsPlaying(true);
      setCurrentSrc(src);
    } else {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      setCurrentSrc(src);
    }
  };

  useEffect(() => {
    audioRef.current.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentSrc("");
    });

    return () => {
      audioRef.current.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, [audioRef, isPlaying]);

  return (
    <AudioContext.Provider
      value={{
        playAudio,
        isPlaying,
        currentSrc,
        audioFile: audioRef.current,
        prevSrc,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioWaveFormWrapper;
