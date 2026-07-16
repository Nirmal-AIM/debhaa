import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSimulator, SimulatorSteps } from '../context/SimulatorContext';
import { Battery, BatteryWarning, RefreshCw, Coffee, LogOut, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FallingPetals } from '../components/FallingPetals';
import debhaPillow from '../assets/debha_1.jpg';

export const Ending = () => {
  const { friendPicture, restartSimulator, setCurrentStep, setIsMuted } = useSimulator();

  useEffect(() => {
    // Force mute music as it "fades/pauses"
    setIsMuted(true);

    // Blast celebratory / comedy confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff8da1', '#8338ec', '#ffb703'],
    });
  }, [setIsMuted]);

  const handleCertificateRedirect = () => {
    setCurrentStep(SimulatorSteps.CERTIFICATE);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-6 overflow-hidden bg-gradient-to-br from-rose-900 via-stone-900 to-black text-white">
      <FallingPetals />
      
      <div className="absolute w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-full max-w-md glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl relative z-10 text-center"
      >
        {/* Animated Avatar of friend with distressed border */}
        <div className="relative mx-auto w-32 h-32 mb-6">
          <motion.img
            animate={{ 
              rotate: [-2, 2, -2],
              scale: [0.98, 1.02, 0.98]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            src={(friendPicture && friendPicture.startsWith('data:image/') && !friendPicture.startsWith('data:image/svg')) ? friendPicture : debhaPillow}
            alt="Tired Friend"
            className="w-full h-full object-cover rounded-full border-4 border-rose-500 shadow-2xl"
          />
          {/* Sweat drop emoji floating */}
          <motion.span
            animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-2 right-2 text-3xl"
          >
            💦
          </motion.span>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-rose-500 mb-1 tracking-tight">
          😩 I'm Tired Babeee...
        </h2>
        
        {/* Message */}
        <p className="text-base font-bold text-stone-300 mb-6 italic">
          "❤️ Please give me some gap babee 😂"
        </p>

        {/* Friendship Battery Level Card */}
        <div className="bg-black/40 border border-white/10 rounded-2xl p-5 mb-8 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold tracking-widest text-stone-400">
            <span>FRIENDSHIP BATTERY</span>
            <span className="text-rose-500 flex items-center">
              0% <BatteryWarning className="w-4 h-4 ml-1 animate-pulse" />
            </span>
          </div>

          {/* Battery Progress Bar */}
          <div className="w-full h-5 bg-stone-850 rounded-full border border-white/10 p-0.5 overflow-hidden relative flex items-center">
            {/* 0% width, just glowing red on the very left or empty */}
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 3, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-red-600 to-rose-500 rounded-full"
            />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-stone-300 uppercase tracking-widest">
              CRITICAL LOW POWER
            </span>
          </div>
        </div>

        {/* Dynamic Interactive Action Buttons */}
        <div className="grid grid-cols-1 gap-3">
          {/* Tea Break Button -> Certificate */}
          <button
            onClick={handleCertificateRedirect}
            className="w-full cursor-pointer inline-flex items-center justify-center space-x-2 py-4 px-6 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 border border-white/20 transition-all transform hover:scale-[1.02] active:scale-95"
          >
            <Coffee className="w-5 h-5 fill-current" />
            <span>☕ Take a Tea Break</span>
          </button>

          {/* Escape Button -> Certificate */}
          <button
            onClick={handleCertificateRedirect}
            className="w-full cursor-pointer inline-flex items-center justify-center space-x-2 py-4 px-6 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-purple-500 to-purple-650 hover:from-purple-600 hover:to-purple-700 border border-white/20 transition-all transform hover:scale-[1.02] active:scale-95"
          >
            <LogOut className="w-5 h-5" />
            <span>🏃 Escape Romance</span>
          </button>

          {/* Restart Button -> Main menu */}
          <button
            onClick={restartSimulator}
            className="w-full cursor-pointer inline-flex items-center justify-center space-x-2 py-4 px-6 rounded-2xl text-base font-bold text-stone-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all transform hover:scale-[1.02] active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            <span>🔄 Restart Simulator</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
export default Ending;
