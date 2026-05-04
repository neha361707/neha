import { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Trophy, Music, Ghost } from 'lucide-react';

export default function App() {
  const [score, setScore] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center justify-center overflow-hidden relative selection:bg-cyan-500/30">
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

      <main className="w-full max-w-6xl z-10 flex flex-col lg:grid lg:grid-cols-12 gap-8 items-center lg:items-start">
        
        {/* Left Side: Stats & Info (Desktop) / Header (Mobile) */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 w-full max-w-sm">
          <div className="flex flex-col">
            <motion.h1 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-5xl font-black tracking-tighter leading-none italic mb-2"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                NEON
              </span><br />
              RHYTHM
            </motion.h1>
            <p className="text-slate-500 text-sm font-medium tracking-tight">
              SURVIVE THE GRID. EMBRACE THE BEAT.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col lg:gap-4">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 text-fuchsia-400 mb-1">
                <Trophy className="w-4 h-4" />
                <span className="text-[10px] font-bold tracking-widest uppercase">Score</span>
              </div>
              <div className="text-3xl font-black tabular-nums">{score}</div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <Music className="w-4 h-4" />
                <span className="text-[10px] font-bold tracking-widest uppercase">Status</span>
              </div>
              <div className="text-sm font-bold flex items-center gap-2">
                {isMusicPlaying ? (
                  <span className="text-green-500 animate-pulse">STREAMING</span>
                ) : (
                  <span className="text-slate-600 uppercase">Standby</span>
                )}
              </div>
            </motion.div>
          </div>

          <div className="hidden lg:block">
            <MusicPlayer onPlayStateChange={setIsMusicPlaying} />
          </div>
        </div>

        {/* Center: Snake Game */}
        <div className="col-span-12 lg:col-span-6 flex flex-col items-center justify-center w-full">
          <SnakeGame onScoreChange={setScore} isPaused={false} />
          
          {/* Mobile Music Player (Visible only on small screens) */}
          <div className="mt-8 w-full max-w-sm lg:hidden">
            <MusicPlayer onPlayStateChange={setIsMusicPlaying} />
          </div>
        </div>

        {/* Right Side: Legend & Details */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 w-full max-w-sm">
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-slate-900/30 border border-slate-800/50 p-6 rounded-2xl backdrop-blur-md"
          >
            <h4 className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mb-4">Grid Intel</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-4 h-4 bg-cyan-500 rounded mt-0.5 shadow-[0_0_8px_#22d3ee]" />
                <div>
                  <div className="text-sm font-bold">THE SIGNAL</div>
                  <div className="text-xs text-slate-500">Your presence on the grid. Move with determination.</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-4 h-4 bg-fuchsia-500 rounded-full mt-0.5 shadow-[0_0_8px_#d946ef]" />
                <div>
                  <div className="text-sm font-bold">DATA CORE</div>
                  <div className="text-xs text-slate-500">Consume to expand your sequence and boost frequency.</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-4 h-4 border border-slate-700 rounded mt-0.5" />
                <div>
                  <div className="text-sm font-bold">VOID BORDERS</div>
                  <div className="text-xs text-slate-500">Phase through walls, but never bite your own tail.</div>
                </div>
              </li>
            </ul>
          </motion.div>

          <div className="flex-1" />

          <div className="p-4 border-l border-slate-800 text-[10px] font-mono text-slate-600 leading-relaxed">
            SYSTEM STATUS: OPERATIONAL<br />
            LOCATION: AIS-CLOUD-REGION-01<br />
            VERSION: 1.0.4-NEON
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="mt-12 text-slate-700 text-[10px] font-bold tracking-[0.4em] uppercase z-10">
        Engineered for high-fidelity performance
      </footer>
    </div>
  );
}
