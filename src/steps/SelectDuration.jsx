import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSimulator, SimulatorSteps } from '../context/SimulatorContext';
import { Sparkles, Heart, Clock, Play } from 'lucide-react';
import { FallingPetals } from '../components/FallingPetals';

const durations = [5, 10, 20, 30, 60];

const durationDetails = {
  5: {
    title: 'Short & Safe',
    funnyDesc: '🌸 Quick Tapri Chai session. Minimal risk of mutual eye contact. Safe harbor.',
    badgeColor: 'bg-green-500/20 text-green-700 dark:text-green-300'
  },
  10: {
    title: 'Cozy Conversation',
    funnyDesc: '🍵 Extended walk around the block. Heartbeat starts syncing up. Tea break disabled.',
    badgeColor: 'bg-teal-500/20 text-teal-700 dark:text-teal-300'
  },
  20: {
    title: 'Intense Eye Contact',
    funnyDesc: '🎥 Back seat theatre vibe. Popcorn-sharing tension gets real. Warning: hand brushing likely.',
    badgeColor: 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300'
  },
  30: {
    title: 'Candlelit Dinner',
    funnyDesc: '🕯️ Full virtual paneer dinner. Soft lighting, cheesy lines, neighbours are curious.',
    badgeColor: 'bg-pink-500/20 text-pink-750 dark:text-pink-300'
  },
  60: {
    title: 'Infinite Attachment',
    funnyDesc: '💍 Soul-to-soul synchronization. Love Server is operating at 9999% capacity. High threat.',
    badgeColor: 'bg-rose-500/20 text-rose-750 dark:text-rose-300 animate-pulse'
  }
};

export const SelectDuration = () => {
  const { duration, setDuration, setCurrentStep } = useSimulator();
  const [sliderIndex, setSliderIndex] = useState(durations.indexOf(duration) !== -1 ? durations.indexOf(duration) : 1);

  const handleSliderChange = (e) => {
    const index = parseInt(e.target.value);
    setSliderIndex(index);
    setDuration(durations[index]);
  };

  const handleContinue = () => {
    setCurrentStep(SimulatorSteps.START_DEBHA);
  };

  const activeDetails = durationDetails[durations[sliderIndex]] || durationDetails[10];

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-6 overflow-hidden">
      <FallingPetals />
      
      <div className="absolute w-[450px] h-[450px] bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg glass-panel rounded-3xl p-8 border border-white/40 shadow-2xl relative z-10 text-center"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gradient inline-flex items-center space-x-2">
            <span>⏱️ Set Romance Timer ⏱️</span>
          </h2>
          <p className="text-sm text-rose-800/70 dark:text-rose-200/70 mt-2 font-medium">
            How long should this simulated dating tension last?
          </p>
        </div>

        {/* Selected Display */}
        <div className="space-y-4 mb-8">
          <div className="inline-flex items-center justify-center space-x-3 bg-white/40 dark:bg-black/35 px-8 py-5 rounded-2xl border border-white/20 shadow-md">
            <Clock className="w-8 h-8 text-rose-500 animate-spin-slow" />
            <div>
              <span className="block text-4xl font-black text-rose-950 dark:text-white leading-none">
                {durations[sliderIndex]}
              </span>
              <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest">
                Minutes of Passion
              </span>
            </div>
          </div>

          <div className="inline-block">
            <span className={`text-xs font-extrabold px-3 py-1 rounded-full border border-white/25 uppercase tracking-wider ${activeDetails.badgeColor}`}>
              {activeDetails.title}
            </span>
          </div>
        </div>

        {/* Slider Track */}
        <div className="space-y-6 mb-8 px-4">
          <input
            type="range"
            min="0"
            max="4"
            step="1"
            value={sliderIndex}
            onChange={handleSliderChange}
            className="w-full h-3 bg-rose-200 dark:bg-rose-950 rounded-lg appearance-none cursor-pointer accent-rose-500 transition-all focus:outline-none"
          />

          {/* Tick Marks */}
          <div className="flex justify-between text-xs font-black text-rose-800/60 dark:text-rose-300/60 px-1">
            {durations.map((val, idx) => (
              <span 
                key={val} 
                onClick={() => {
                  setSliderIndex(idx);
                  setDuration(val);
                }}
                className={`cursor-pointer transition-all hover:text-rose-600 ${sliderIndex === idx ? 'text-rose-600 dark:text-rose-400 scale-125' : ''}`}
              >
                {val}m
              </span>
            ))}
          </div>
        </div>

        {/* Dynamic Comedic Description Card */}
        <div className="bg-white/30 dark:bg-black/30 border border-white/20 rounded-2xl p-5 mb-8 text-left shadow-inner">
          <h4 className="text-xs font-bold text-rose-900 dark:text-rose-300 uppercase tracking-widest flex items-center mb-1.5">
            <Heart className="w-3.5 h-3.5 mr-1.5 text-rose-500 fill-rose-500" />
            Romance Level Analysis:
          </h4>
          <p className="text-xs text-rose-950/80 dark:text-rose-200/80 leading-relaxed font-light">
            {activeDetails.funnyDesc}
          </p>
        </div>

        {/* Start Button */}
        <button
          onClick={handleContinue}
          className="w-full relative group cursor-pointer inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl text-lg font-bold text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-md border border-white/20 transition-all duration-200 transform hover:scale-[1.02] active:scale-95"
        >
          <Play className="w-5 h-5 text-white fill-current" />
          <span>Launch Debha Mode</span>
        </button>
      </motion.div>
    </div>
  );
};
export default SelectDuration;
