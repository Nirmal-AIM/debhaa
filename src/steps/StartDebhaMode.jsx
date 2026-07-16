import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSimulator, SimulatorSteps } from '../context/SimulatorContext';
import { Heart, Lock, AlertTriangle, ShieldCheck, Flame, Moon, Sparkles } from 'lucide-react';
import { FallingPetals } from '../components/FallingPetals';
import debhaPillow from '../assets/debha_1.jpg';

const statusMessages = [
  '❤️ Debha Mode Activated...',
  '🌸 Privacy Mode Enabled...',
  '💌 Friendship Level +100',
  '❤️ Heart Meter 9999%',
  '🔥 Romance Engine Running...',
  '😂 Neighbours Are Curious...',
  '☕ Tea Break Disabled...',
  '🌹 Roses Delivered...',
  '💖 Candles Lit...',
  '🎉 Friendship XP +999',
  '💌 Love Server Connected...',
  '👀 Shhh! Bro-mance in progress...',
  '🚀 Turbo Love Boosters Engaged...',
];

const locationBackdrops = {
  beach: { name: 'Sunset Maldives Beach', gradient: 'from-amber-400 via-rose-450 to-indigo-600', icon: '🏖️' },
  garden: { name: 'Royal Rose Garden', gradient: 'from-emerald-400 via-rose-500 to-rose-700', icon: '🌹' },
  coffee_shop: { name: 'Cozy Coffee Tapri', gradient: 'from-orange-700 via-amber-800 to-stone-900', icon: '☕' },
  movie_theatre: { name: 'Premium Cinema Backrow', gradient: 'from-red-950 via-purple-950 to-stone-950', icon: '🎬' },
  pizza_cafe: { name: 'Italian Pizza Corner', gradient: 'from-red-500 via-orange-500 to-yellow-600', icon: '🍕' },
  park: { name: 'Golden Hour Picnic Park', gradient: 'from-emerald-500 via-amber-500 to-indigo-600', icon: '🧺' },
  living_room: { name: 'Cozy Chill Living Room', gradient: 'from-indigo-900 via-pink-900 to-purple-950', icon: '🛋️' }
};

export const StartDebhaMode = () => {
  const { registration, friendPicture, location, duration, setCurrentStep } = useSimulator();
  const [phase, setPhase] = useState('walking'); // walking, door_closing, active, finished
  const [statusIndex, setStatusIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(duration); // simulated countdown
  const [heartbeatCount, setHeartbeatCount] = useState(9999);

  const activeLoc = locationBackdrops[location] || locationBackdrops.coffee_shop;

  // 1. Walk phase timeout
  useEffect(() => {
    const walkTimer = setTimeout(() => {
      setPhase('door_closing');
    }, 4500);
    return () => clearTimeout(walkTimer);
  }, []);

  // 2. Door closing phase timeout + vibration trigger
  useEffect(() => {
    if (phase === 'door_closing') {
      const doorTimer = setTimeout(() => {
        setPhase('active');
        
        // Trigger a strong locking double-slam vibration
        if (navigator.vibrate) {
          navigator.vibrate([400, 150, 400]);
        }
      }, 2000); // Door closing animation takes 2 seconds
      return () => clearTimeout(doorTimer);
    }
  }, [phase]);

  // 3. Status rotation & heartbeat vibration pulses
  useEffect(() => {
    if (phase === 'active') {
      const statusTimer = setInterval(() => {
        setStatusIndex((prev) => (prev + 1) % statusMessages.length);
        // Slightly randomise heart meter
        setHeartbeatCount((prev) => prev + Math.floor(Math.random() * 20 - 10));
        
        // Comedic heartbeat vibration on every status transition
        if (navigator.vibrate) {
          navigator.vibrate([100, 80, 100]);
        }
      }, 1500);
      return () => clearInterval(statusTimer);
    }
  }, [phase]);

  // 4. Timer Countdown (1 second per simulated minute)
  useEffect(() => {
    if (phase === 'active') {
      const countdownTimer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            setPhase('finished');
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // 1 real second = 1 virtual minute
      return () => clearInterval(countdownTimer);
    }
  }, [phase]);

  // 5. Finished transition
  useEffect(() => {
    if (phase === 'finished') {
      const finishTimer = setTimeout(() => {
        setCurrentStep(SimulatorSteps.ENDING);
      }, 1500);
      return () => clearTimeout(finishTimer);
    }
  }, [phase, setCurrentStep]);

  // Calculate SVG circular stroke offset
  const progressRatio = timeRemaining / duration;
  const strokeDashoffset = 282.6 * (1 - progressRatio); // circumference = 2 * pi * r = 2 * 3.14 * 45 = 282.6

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-black text-white">
      
      {/* Falling petals layer always active */}
      <FallingPetals />

      {/* BACKGROUND SCENE: Location representation */}
      <div className={`absolute inset-0 bg-gradient-to-b ${activeLoc.gradient} transition-all duration-1000`} />
      
      {/* Location card HUD */}
      <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 z-20 flex items-center space-x-2">
        <span className="text-xl">{activeLoc.icon}</span>
        <span className="text-xs font-bold tracking-widest uppercase text-pink-300">
          Location: {activeLoc.name}
        </span>
      </div>

      {/* PHASE 1: WALKING ANIMATION */}
      {phase === 'walking' && (
        <div className="relative w-full max-w-4xl flex flex-col items-center justify-between min-h-[500px] z-10 px-4">
          <div className="text-center mt-4">
            <h2 className="text-3xl font-extrabold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              Walking to {activeLoc.name}...
            </h2>
            <p className="text-sm text-pink-200 mt-2 font-medium tracking-wide">
              Eye contact levels climbing. Romance engines spooling up.
            </p>
          </div>

          {/* Avatars moving toward center */}
          <div className="relative w-full h-80 flex items-center justify-between px-10">
            {/* User Avatar */}
            <motion.div
              initial={{ x: -100, y: 50, opacity: 0 }}
              animate={{ x: '120%', y: 0, opacity: 1 }}
              transition={{ duration: 4, ease: "easeOut" }}
              className="flex flex-col items-center space-y-2 absolute left-10"
            >
              <img
                src={registration.picture}
                alt="User"
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-4 border-rose-500 shadow-2xl animate-bounce"
              />
              <span className="bg-rose-500/80 px-3 py-1 rounded-full text-xs font-bold shadow-md">
                {registration.nickname || 'You'}
              </span>
            </motion.div>

            {/* Path indicator */}
            <div className="w-full h-1 bg-white/20 border-t border-dashed border-white/40 absolute left-0 right-0 -z-10" />

            {/* Partner Avatar */}
            <motion.div
              initial={{ x: 100, y: 50, opacity: 0 }}
              animate={{ x: '-120%', y: 0, opacity: 1 }}
              transition={{ duration: 4, ease: "easeOut" }}
              className="flex flex-col items-center space-y-2 absolute right-10"
            >
              <img
                src={friendPicture}
                alt="Friend"
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-4 border-purple-500 shadow-2xl animate-bounce"
                style={{ animationDelay: '0.2s' }}
              />
              <span className="bg-purple-500/80 px-3 py-1 rounded-full text-xs font-bold shadow-md">
                Bro Partner
              </span>
            </motion.div>
          </div>

          <div className="w-full max-w-xs bg-black/30 h-2 rounded-full overflow-hidden p-0.5 border border-white/20">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 4, ease: "linear" }}
              className="h-full bg-pink-500 rounded-full"
            />
          </div>
        </div>
      )}

      {/* PHASE 2 & 3: DOOR CLOSING & ACTIVE MODE */}
      {(phase === 'door_closing' || phase === 'active' || phase === 'finished') && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          
          {/* LEFT DOOR */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: phase === 'finished' ? '-100%' : '0%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-1/2 h-full bg-gradient-to-r from-rose-900 to-rose-950 border-r-4 border-rose-500 flex justify-end items-center relative overflow-hidden shadow-2xl"
          >
            {/* Window detail glowing pink with Debha silhouette */}
            <div className="absolute top-1/4 left-10 w-24 h-36 bg-black/60 border-2 border-rose-550/30 rounded-xl overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
              <img 
                src={debhaPillow} 
                alt="Debha Glow"
                className="w-full h-full object-cover filter saturate-150 brightness-75 contrast-125 sepia hue-rotate-[320deg]" 
              />
              <motion.div
                animate={{ opacity: [0.2, 0.7, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-pink-500/30 backdrop-blur-xs shadow-[inset_0_0_30px_rgba(236,72,153,0.6)]"
              />
            </div>
            {/* Ornate door details */}
            <div className="w-8 h-8 rounded-full bg-rose-500 border border-white/20 mr-4 shadow-lg flex items-center justify-center">
              <Lock className="w-4 h-4 text-white" />
            </div>
          </motion.div>

          {/* RIGHT DOOR */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: phase === 'finished' ? '100%' : '0%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-1/2 h-full bg-gradient-to-l from-rose-900 to-rose-950 border-l-4 border-rose-500 flex justify-start items-center relative overflow-hidden shadow-2xl"
          >
            {/* Ornate door details */}
            <div className="w-8 h-8 rounded-full bg-rose-500 border border-white/20 ml-4 shadow-lg flex items-center justify-center">
              <Lock className="w-4 h-4 text-white" />
            </div>

            {/* Window detail glowing pink with Debha silhouette */}
            <div className="absolute top-1/4 right-10 w-24 h-36 bg-black/60 border-2 border-rose-550/30 rounded-xl overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
              <img 
                src={debhaPillow} 
                alt="Debha Glow"
                className="w-full h-full object-cover filter saturate-150 brightness-75 contrast-125 sepia hue-rotate-[320deg]" 
              />
              <motion.div
                animate={{ opacity: [0.2, 0.7, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                className="absolute inset-0 bg-pink-500/30 backdrop-blur-xs shadow-[inset_0_0_30px_rgba(236,72,153,0.6)]"
              />
            </div>
          </motion.div>

          {/* DOOR HUD: Sign, timer, statuses overlay */}
          {phase !== 'door_closing' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute flex flex-col items-center justify-center text-center z-40 max-w-md w-full px-6 space-y-6"
            >
              {/* Do Not Disturb Sign */}
              <motion.div
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-amber-500 border-4 border-amber-600 rounded-xl px-6 py-3 shadow-[0_10px_25px_rgba(0,0,0,0.5)] transform -rotate-3 border-t-amber-400 relative"
              >
                {/* Hanger rope */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-6 border-2 border-amber-800 border-b-0 rounded-t-full" />
                <span className="block text-xs font-black text-amber-950 uppercase tracking-widest">
                  🔒 ACCESS RESTRICTED 🔒
                </span>
                <span className="block text-lg font-black text-amber-950 tracking-wider">
                  DO NOT DISTURB
                </span>
              </motion.div>

              {/* Heart progress timer */}
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="88"
                    cy="88"
                    r="45"
                    className="stroke-rose-950 fill-none"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="88"
                    cy="88"
                    r="45"
                    className="stroke-rose-500 fill-none"
                    strokeWidth="8"
                    strokeDasharray="282.6"
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transition={{ ease: "linear", duration: 1 }}
                  />
                </svg>

                {/* Pulsing heart inside */}
                <div className="absolute flex flex-col items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                  >
                    <Heart className="w-10 h-10 text-rose-500 fill-rose-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]" />
                  </motion.div>
                  <span className="font-mono text-lg font-bold text-white mt-1">
                    {String(Math.floor(timeRemaining)).padStart(2, '0')}:00
                  </span>
                </div>
              </div>

              {/* Giant Heart Meter */}
              <div className="glass-panel w-full p-4 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
                <span className="block text-[10px] font-bold text-rose-400 uppercase tracking-widest">
                  ROMANCE ENGINE HEART METER
                </span>
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  className="block text-5xl font-black text-rose-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] my-1"
                >
                  {heartbeatCount}%
                </motion.span>
                <div className="w-full bg-rose-950 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: ['90%', '100%', '90%'] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="h-full bg-rose-500" 
                  />
                </div>
              </div>

              {/* Rotating Comedic Statuses */}
              <div className="h-12 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={statusIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-bold text-pink-300 tracking-wider flex items-center space-x-2 bg-rose-550/30 px-4 py-2 rounded-full border border-pink-500/20 shadow-inner"
                  >
                    {statusMessages[statusIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

            </motion.div>
          )}

        </div>
      )}

    </div>
  );
};
export default StartDebhaMode;
