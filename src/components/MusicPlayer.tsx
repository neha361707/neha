import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, Disc } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
  color: string;
  duration: string;
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: "Neon Pulse",
    artist: "AI Synthwave",
    url: "https://cdn.pixabay.com/audio/2022/03/10/audio_c3527e58c2.mp3", // Lofi style
    color: "cyan",
    duration: "2:54"
  },
  {
    id: 2,
    title: "Midnight Drift",
    artist: "Cyber Lofi",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "fuchsia",
    duration: "3:12"
  },
  {
    id: 3,
    title: "Chrome Skies",
    artist: "Dungeon Dream",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "purple",
    duration: "4:05"
  }
];

interface MusicPlayerProps {
  onPlayStateChange: (isPlaying: boolean) => void;
}

export default function MusicPlayer({ onPlayStateChange }: MusicPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(e => console.error("Playback failed", e));
    }
    setIsPlaying(!isPlaying);
    onPlayStateChange(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
    onPlayStateChange(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
    onPlayStateChange(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack.url;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      }
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const p = (audio.currentTime / audio.duration) * 100;
      setProgress(isNaN(p) ? 0 : p);
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const colorMap: Record<string, string> = {
    cyan: "text-cyan-400 border-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.3)]",
    fuchsia: "text-fuchsia-400 border-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.3)]",
    purple: "text-purple-400 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
  };

  const glowColorMap: Record<string, string> = {
    cyan: "bg-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.2)]",
    fuchsia: "bg-fuchsia-500/20 shadow-[0_0_20px_rgba(217,70,239,0.2)]",
    purple: "bg-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
  };

  return (
    <div className="w-full max-w-sm p-6 bg-slate-900/80 border border-slate-700/50 rounded-2xl backdrop-blur-xl shadow-2xl">
      <audio ref={audioRef} />
      
      <div className="flex items-start gap-4 mb-6">
        <div className={`relative w-24 h-24 rounded-lg overflow-hidden flex items-center justify-center ${glowColorMap[currentTrack.color]}`}>
          <motion.div
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className={`w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center ${colorMap[currentTrack.color].split(' ')[0]}`}
          >
            <Disc className="w-8 h-8" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
        </div>
        
        <div className="flex-1 overflow-hidden">
          <motion.h3 
            key={currentTrack.title}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`text-lg font-bold truncate ${colorMap[currentTrack.color].split(' ')[0]}`}
          >
            {currentTrack.title}
          </motion.h3>
          <p className="text-slate-400 text-sm font-medium">{currentTrack.artist}</p>
          <div className="mt-2 flex items-center gap-1">
            <Volume2 className="w-3 h-3 text-slate-500" />
            <div className="h-1 bg-slate-800 flex-1 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full opacity-50 ${currentTrack.color === 'cyan' ? 'bg-cyan-500' : currentTrack.color === 'fuchsia' ? 'bg-fuchsia-500' : 'bg-purple-500'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6">
        <button 
          onClick={prevTrack}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
        >
          <SkipBack className="w-6 h-6" />
        </button>
        
        <button 
          onClick={togglePlay}
          className={`p-4 rounded-full transition-all active:scale-90 ${isPlaying ? 'bg-slate-800' : 'bg-white text-slate-900 shadow-lg shadow-white/10 hover:shadow-white/20'}`}
        >
          {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </button>
        
        <button 
          onClick={nextTrack}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
        >
          <SkipForward className="w-6 h-6" />
        </button>
      </div>

      <div className="mt-6 flex justify-between items-center text-[10px] font-bold tracking-widest text-slate-500 uppercase">
        <div className="flex items-center gap-2">
           <div className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'animate-pulse' : ''} ${currentTrack.color === 'cyan' ? 'bg-cyan-500' : currentTrack.color === 'fuchsia' ? 'bg-fuchsia-500' : 'bg-purple-500' }`} />
           LIVE FEED
        </div>
        <div>
          {currentTrack.duration}
        </div>
      </div>
    </div>
  );
}
