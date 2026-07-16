import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSimulator, SimulatorSteps } from '../context/SimulatorContext';
import { Heart, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FallingPetals } from '../components/FallingPetals';

export const SuccessPage = () => {
  const { setCurrentStep } = useSimulator();
  const [debhaId, setDebhaId] = useState('');

  useEffect(() => {
    // Generate random 4-digit ID
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    setDebhaId(`DB-2026-${randomDigits}`);

    // Launch Confetti Explosion
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#ff4d6d', '#ff8da1', '#8338ec', '#ffb703'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#ff4d6d', '#ff8da1', '#8338ec', '#ffb703'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
  }, []);

  const handleContinue = () => {
    setCurrentStep(SimulatorSteps.UPLOAD_PHOTO);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-6 overflow-hidden">
      <FallingPetals />

      <div className="absolute w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[90px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', damping: 15 }}
        className="w-full max-w-md glass-panel rounded-3xl p-8 text-center border border-white/40 shadow-2xl relative z-10"
      >
        {/* Animated Check/Success Shield */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mx-auto w-20 h-20 bg-gradient-to-tr from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg border border-white/20 mb-6"
        >
          <CheckCircle2 className="w-10 h-10 text-white" />
        </motion.div>

        <h2 className="text-3xl font-extrabold text-rose-800 dark:text-rose-200 mb-1">
          Congratulations!
        </h2>
        <p className="text-sm font-semibold text-rose-600/80 dark:text-rose-300/80 mb-6">
          You are officially registered.
        </p>

        {/* Info Card */}
        <div className="bg-white/30 dark:bg-black/40 border border-white/20 rounded-2xl p-6 space-y-4 mb-8 shadow-inner">
          <div className="space-y-1">
            <span className="block text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest">
              DEBHA LICENSE ID
            </span>
            <span className="font-mono text-2xl font-black text-rose-950 dark:text-white tracking-widest drop-shadow-[0_1.5px_3px_rgba(255,77,109,0.2)]">
              {debhaId}
            </span>
          </div>

          <div className="h-px bg-rose-300/20 dark:bg-rose-700/20" />

          <div className="flex justify-between items-center px-2">
            <span className="text-xs font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider">
              STATUS:
            </span>
            <div className="flex items-center space-x-1.5 bg-rose-500/20 px-3 py-1 rounded-full border border-rose-500/30">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs font-black text-rose-600 dark:text-rose-300 flex items-center">
                Ready <Heart className="w-3 h-3 text-rose-500 fill-rose-500 ml-1" />
              </span>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full relative group cursor-pointer inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl text-lg font-bold text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-md border border-white/20 transition-all duration-200 transform hover:scale-[1.02] active:scale-95"
        >
          <span>Continue Journey</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};
export default SuccessPage;
