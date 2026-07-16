import React from 'react';
import { motion } from 'framer-motion';
import { useSimulator, SimulatorSteps } from '../context/SimulatorContext';
import { Sparkles, Heart, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { FallingPetals } from '../components/FallingPetals';
import { BackgroundParticles } from '../components/BackgroundParticles';
import debhaCandle from '../assets/debha_2.jpg';

export const HomePage = () => {
  const { setCurrentStep, theme, toggleTheme, isMuted, setIsMuted } = useSimulator();

  const handleStart = () => {
    setCurrentStep(SimulatorSteps.REGISTRATION);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between items-center overflow-hidden p-6">
      {/* Visual background layers */}
      <BackgroundParticles />
      <FallingPetals />

      {/* Header controls (Theme and Audio) */}
      <header className="w-full max-w-6xl flex justify-between items-center z-20">
        <div className="flex items-center space-x-2 glass-panel px-4 py-2 rounded-full border border-white/20">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-heartbeat-slow" />
          <span className="font-bold text-xs uppercase tracking-widest text-rose-600 dark:text-rose-300">Bro-Mance v2.0</span>
        </div>
        <div className="flex space-x-3 z-30">
          {/* Audio Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-3 rounded-full glass-panel hover:scale-110 active:scale-95 transition-transform text-rose-600 dark:text-rose-300 border border-white/20 shadow-lg cursor-pointer"
            title={isMuted ? "Unmute Romantic Music" : "Mute Music"}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 animate-bounce" />}
          </button>
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full glass-panel hover:scale-110 active:scale-95 transition-transform text-rose-600 dark:text-rose-300 border border-white/20 shadow-lg cursor-pointer"
            title="Toggle theme mode"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center items-center text-center z-10 max-w-3xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          className="space-y-6"
        >
          {/* Over-the-top glowing love badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 via-pink-500/25 to-rose-500/20 border border-rose-400/40 rounded-full px-5 py-2 backdrop-blur-md shadow-[0_0_20px_rgba(244,63,94,0.2)]">
            <Sparkles className="w-4 h-4 text-pink-500 animate-spin-slow" />
            <span className="text-sm font-semibold tracking-wider uppercase text-rose-700 dark:text-rose-300">
              Premium Valentine Edition
            </span>
            <Sparkles className="w-4 h-4 text-pink-500 animate-spin-slow" />
          </div>

          {/* Huge Heading */}
          <div className="relative">
            <h1 className="text-7xl md:text-9xl font-extrabold tracking-tight pb-3">
              <span className="text-gradient drop-shadow-[0_4px_12px_rgba(255,77,109,0.35)]">
                DEBHA DEBHA
              </span>
            </h1>
            {/* Soft background glow */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-500 to-purple-600 blur-3xl opacity-20 dark:opacity-30 rounded-full scale-75" />
          </div>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-2xl md:text-3xl font-serif italic text-rose-700 dark:text-rose-300 tracking-wide font-medium"
          >
            "The World's No.1 Romantic Bro Simulator"
          </motion.h2>

          {/* Polaroid Preview */}
          <motion.div
            initial={{ opacity: 0, rotate: -6, scale: 0.8 }}
            animate={{ opacity: 1, rotate: [-4, -8, -4], scale: 1 }}
            transition={{
              opacity: { delay: 0.5, duration: 0.6 },
              rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" },
              scale: { delay: 0.5, type: "spring" }
            }}
            className="w-48 h-60 bg-white dark:bg-zinc-900 p-3 pb-8 rounded-lg shadow-2xl border border-rose-200/50 mx-auto my-4 transform -rotate-6 relative group"
          >
            <div className="w-full h-44 overflow-hidden rounded bg-pink-100">
              <img 
                src={debhaCandle} 
                alt="Debha Hero" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="mt-2 text-center">
              <span className="font-serif text-sm font-bold text-rose-600 dark:text-rose-455">
                🔥 Heart Stealer 🔥
              </span>
            </div>
            {/* Corner tape/sticker */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white/40 dark:bg-black/30 backdrop-blur-sm px-4 py-1 text-[10px] text-rose-700 dark:text-rose-300 font-bold border border-rose-300/20 rounded shadow-sm rotate-2">
              MY MATCH
            </div>
          </motion.div>

          {/* Interactive features description card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="glass-panel max-w-lg mx-auto p-6 rounded-2xl border border-white/40 shadow-xl space-y-3"
          >
            <p className="text-sm md:text-base text-rose-950/80 dark:text-rose-100/80 leading-relaxed font-light">
              Experience the cinematic depth, heart-throbbing poses, luxury locations, and automated matchmaking engine. Guaranteed to escalate your bromance level to infinity!
            </p>
            <div className="flex justify-center space-x-6 text-xs text-rose-600 dark:text-rose-400 font-bold tracking-wider">
              <span>❤️ CINEMATIC DEPICTIONS</span>
              <span>⚡ ROMANCE SIMULATED</span>
              <span>✨ 100% PARODY</span>
            </div>
          </motion.div>

          {/* Glowing Start Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="pt-6"
          >
            <button
              onClick={handleStart}
              className="relative group cursor-pointer inline-flex items-center space-x-3 px-10 py-5 rounded-full text-xl font-extrabold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:via-pink-600 hover:to-purple-700 shadow-[0_10px_35px_rgba(244,63,94,0.5)] border border-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            >
              {/* Outer pulsing glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 blur-lg opacity-60 group-hover:opacity-100 group-hover:blur-xl transition-all duration-300 -z-10" />
              <span>❤️ Start Love Journey</span>
              <motion.span
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                ➡️
              </motion.span>
            </button>
          </motion.div>
        </motion.div>
      </main>

      {/* Decorative Footer */}
      <footer className="w-full text-center z-10 py-6 text-xs text-rose-700/60 dark:text-rose-300/40 font-semibold uppercase tracking-widest">
        <span>© 2026 DEBHA-DEBHA STUDIOS INC. • MADE WITH EXAGGERATED LOVE</span>
      </footer>
    </div>
  );
};
export default HomePage;
