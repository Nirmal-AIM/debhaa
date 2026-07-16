import React from 'react';
import { motion } from 'framer-motion';
import { useSimulator, SimulatorSteps } from '../context/SimulatorContext';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { FallingPetals } from '../components/FallingPetals';

const poses = [
  {
    id: 'heart_hands',
    name: 'Heart Hands',
    emoji: '🫶',
    description: 'Create half a heart with your hand, expecting them to complete the other half.',
    funnyTip: 'WARNING: High probability of getting left hanging.'
  },
  {
    id: 'proposal',
    name: 'Proposal Pose',
    emoji: '🧎',
    description: 'Go down on one knee dramatically in the middle of a crowded street.',
    funnyTip: 'WARNING: Neighbors might start clapping.'
  },
  {
    id: 'flower_bouquet',
    name: 'Flower Bouquet',
    emoji: '💐',
    description: 'Offering a giant bouquet of handpicked simulated roses with puppy eyes.',
    funnyTip: 'WARNING: Sneezing from virtual pollen is possible.'
  },
  {
    id: 'bollywood_hero',
    name: 'Bollywood Hero',
    emoji: '🕺',
    description: 'Extend your arms in slow motion while wind blows through your hair.',
    funnyTip: 'WARNING: Background violins will play automatically.'
  },
  {
    id: 'selfie',
    name: 'Selfie Pose',
    emoji: '🤳',
    description: 'Lean in ridiculously close for a tight-angle aesthetic Polaroid selfie.',
    funnyTip: 'WARNING: Double chins are simulated automatically.'
  },
  {
    id: 'walking_together',
    name: 'Walking Together',
    emoji: '🧑‍🤝‍🧑',
    description: 'Hold hands and walk toward a sunset that is 100% filter and zero substance.',
    funnyTip: 'WARNING: Watch out for virtual puddles.'
  }
];

export const SelectFriendPose = () => {
  const { pose, setPose, setCurrentStep } = useSimulator();

  const handleSelect = (id) => {
    setPose(id);
  };

  const handleContinue = () => {
    if (pose) {
      setCurrentStep(SimulatorSteps.SELECT_LOCATION);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-4 md:p-8 overflow-y-auto">
      <FallingPetals />
      
      <div className="absolute w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl glass-panel rounded-3xl p-6 md:p-10 border border-white/40 shadow-2xl relative z-10 my-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gradient inline-flex items-center space-x-2">
            <span>✨ Select Romance Pose ✨</span>
          </h2>
          <p className="text-sm text-rose-800/70 dark:text-rose-200/70 mt-2 font-medium">
            Choose the romantic pose for your bro-mance simulation.
          </p>
        </div>

        {/* Pose Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {poses.map((p) => {
            const isSelected = pose === p.id;
            return (
              <motion.div
                key={p.id}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(p.id)}
                className={`cursor-pointer rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between text-left h-64
                  ${isSelected
                    ? 'glass-panel border-rose-500 bg-rose-500/20 shadow-[0_0_20px_rgba(255,77,109,0.3)]'
                    : 'glass-panel border-white/20 hover:border-rose-300 bg-white/10 dark:bg-black/10'
                  }`}
              >
                {/* Heart badge when selected */}
                {isSelected && (
                  <div className="absolute top-4 right-4 bg-rose-500 text-white p-1 rounded-full animate-heartbeat-slow shadow-md border border-white/30">
                    <Heart className="w-4 h-4 fill-current" />
                  </div>
                )}

                <div>
                  {/* Emoji Avatar */}
                  <span className="text-4xl block mb-4 filter drop-shadow-sm">{p.emoji}</span>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-rose-950 dark:text-white mb-2 flex items-center">
                    {p.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-xs text-rose-800/80 dark:text-rose-200/80 leading-relaxed font-light">
                    {p.description}
                  </p>
                </div>

                {/* Funny warnings */}
                <div className="mt-4 bg-rose-500/5 dark:bg-black/20 rounded-lg p-2 border border-rose-500/10">
                  <p className="text-[10px] font-semibold text-rose-700/80 dark:text-rose-300/80 tracking-wide leading-tight">
                    {p.funnyTip}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="mt-10 text-center">
          <button
            disabled={!pose}
            onClick={handleContinue}
            className={`relative group cursor-pointer inline-flex items-center space-x-2 py-4 px-10 rounded-full text-lg font-bold text-white transition-all
              ${pose
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg border border-white/20 transform hover:scale-105 active:scale-95'
                : 'bg-rose-400/30 text-rose-500/40 cursor-not-allowed border border-rose-300/10'
              }`}
          >
            <span>Lock In Pose</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
export default SelectFriendPose;
