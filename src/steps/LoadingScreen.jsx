import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSimulator, SimulatorSteps } from '../context/SimulatorContext';
import { FallingPetals } from '../components/FallingPetals';
import debhaRoses from '../assets/debha_3.jpg';

const loadingTexts = [
  'Searching for true love...',
  'Preparing Debha...',
  'Finding perfect match...',
  'Calibrating Romance Engine...',
  'Polishing Relationship Dashboard...',
  'Checking Bro-mantic compatibility...',
];

export const LoadingScreen = () => {
  const { setCurrentStep } = useSimulator();
  const [textIndex, setTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Rotate text
  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 1500);

    return () => clearInterval(textInterval);
  }, []);

  // Increment progress
  useEffect(() => {
    const duration = 6000; // 6 seconds loading time
    const intervalTime = 50;
    const step = 100 / (duration / intervalTime);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsFinished(true);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(progressInterval);
  }, []);

  // Handle transition when finished
  useEffect(() => {
    if (isFinished) {
      const timeout = setTimeout(() => {
        setCurrentStep(SimulatorSteps.HOME);
      }, 2000); // Wait 2 seconds to show Perfect Match Found
      return () => clearTimeout(timeout);
    }
  }, [isFinished, setCurrentStep]);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-pink-300 via-rose-300 to-purple-400 p-6">
      {/* Falling Petals Background */}
      <FallingPetals />

      {/* Outer Glowing Rings */}
      <div className="absolute w-[450px] h-[450px] bg-pink-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute w-[300px] h-[300px] bg-rose-500/10 rounded-full blur-[60px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full glass-panel p-8 rounded-3xl text-center shadow-2xl border border-white/40">
        
        {/* Large Glowing Pulsing Heart / Match Avatar */}
        <div className="relative mb-8 h-32 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key="heart"
                animate={{
                  scale: [1, 1.12, 1.05, 1.18, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative text-7xl drop-shadow-[0_0_25px_rgba(239,68,68,0.75)]"
              >
                ❤️
                {/* Sparkles on top */}
                <motion.span 
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-4 -right-4 text-3xl"
                >
                  ✨
                </motion.span>
              </motion.div>
            ) : (
              <motion.div
                key="avatar"
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1.1, rotate: 0, opacity: 1 }}
                className="relative"
              >
                <img
                  src={debhaRoses}
                  alt="Perfect Match"
                  className="w-32 h-32 rounded-full object-cover border-4 border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.7)]"
                />
                <span className="absolute -top-2 -right-2 text-2xl animate-bounce">💖</span>
                <span className="absolute -bottom-2 -left-2 text-2xl animate-bounce delay-300">✨</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Text Area */}
        <div className="h-16 flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.h3
                key={textIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-lg font-semibold text-rose-700 dark:text-rose-300 tracking-wide"
              >
                {loadingTexts[textIndex]}
              </motion.h3>
            ) : (
              <motion.h3
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 1 }}
                className="text-2xl font-bold text-rose-800 dark:text-rose-200 tracking-wider animate-bounce"
              >
                ❤️ Perfect Match Found ❤️
              </motion.h3>
            )}
          </AnimatePresence>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-white/20 dark:bg-black/20 h-4 rounded-full overflow-hidden p-0.5 border border-white/30 backdrop-blur-sm shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        {/* Percentage Display */}
        <p className="mt-3 text-sm font-bold text-rose-800 dark:text-rose-300">
          {Math.round(progress)}%
        </p>
      </div>

      {/* Floating Sparkle Elements */}
      <div className="absolute top-1/4 left-1/4 animate-ping text-xl opacity-40">✨</div>
      <div className="absolute top-3/4 right-1/4 animate-ping text-2xl opacity-40 delay-1000">✨</div>
    </div>
  );
};
export default LoadingScreen;
