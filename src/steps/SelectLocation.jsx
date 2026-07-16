import React from 'react';
import { motion } from 'framer-motion';
import { useSimulator, SimulatorSteps } from '../context/SimulatorContext';
import { Sparkles, ArrowRight, MapPin, Compass } from 'lucide-react';
import { FallingPetals } from '../components/FallingPetals';

const locations = [
  {
    id: 'beach',
    name: 'Beach Sunset',
    emoji: '🏖️',
    description: 'Golden hour sand, ocean waves, and the scent of simulated sunscreen.',
    funnySubtext: 'WARNING: Crab pinching is simulated.'
  },
  {
    id: 'garden',
    name: 'Rose Garden',
    emoji: '🌹',
    description: 'Lush red roses, maze walks, and classical violin music playing in the bushes.',
    funnySubtext: 'WARNING: Call search & rescue if lost.'
  },
  {
    id: 'coffee_shop',
    name: 'Coffee Shop',
    emoji: '☕',
    description: 'Cozy fireplace corner. Sharing one caramel macchiato with two straws.',
    funnySubtext: 'WARNING: Double cup charge is active.'
  },
  {
    id: 'movie_theatre',
    name: 'Movie Theatre',
    emoji: '🎬',
    description: 'Back row recliner seats. Pure popcorn-sharing cinematic tension.',
    funnySubtext: 'WARNING: Floor is sticky.'
  },
  {
    id: 'pizza_cafe',
    name: 'Pizza Cafe',
    emoji: '🍕',
    description: 'Recreating the Lady and the Tramp scene but with a cheese pull.',
    funnySubtext: 'WARNING: Fight over the last slice.'
  },
  {
    id: 'park',
    name: 'Sunset Park',
    emoji: '🧺',
    description: 'Picnic blanket, strawberries, and soft wind blowing through trees.',
    funnySubtext: 'WARNING: Pigeons will try to rob you.'
  },
  {
    id: 'living_room',
    name: 'Living Room',
    emoji: '🛋️',
    description: 'Netflix & Chill. Deciding what to watch for 3 hours straight.',
    funnySubtext: 'WARNING: WiFi signal may fluctuate.'
  }
];

export const SelectLocation = () => {
  const { location, setLocation, setCurrentStep } = useSimulator();

  const handleSelect = (id) => {
    setLocation(id);
  };

  const handleContinue = () => {
    if (location) {
      setCurrentStep(SimulatorSteps.SELECT_DURATION);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-4 md:p-8 overflow-y-auto">
      <FallingPetals />
      
      <div className="absolute w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl glass-panel rounded-3xl p-6 md:p-10 border border-white/40 shadow-2xl relative z-10 my-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gradient inline-flex items-center space-x-2">
            <span>📍 Choose Romantic Location 📍</span>
          </h2>
          <p className="text-sm text-rose-800/70 dark:text-rose-200/70 mt-2 font-medium">
            Where will the simulated magic take place? Choose wisely.
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {locations.map((loc) => {
            const isSelected = location === loc.id;
            return (
              <motion.div
                key={loc.id}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(loc.id)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between text-left h-64
                  ${isSelected
                    ? 'glass-panel border-rose-500 bg-rose-500/20 shadow-[0_0_20px_rgba(255,77,109,0.3)]'
                    : 'glass-panel border-white/20 hover:border-rose-300 bg-white/10 dark:bg-black/10'
                  }`}
              >
                {/* Pin badge when selected */}
                {isSelected && (
                  <div className="absolute top-4 right-4 bg-rose-500 text-white p-1 rounded-full animate-pulse shadow-md border border-white/30">
                    <MapPin className="w-4 h-4 fill-current" />
                  </div>
                )}

                <div>
                  {/* Emoji Avatar */}
                  <span className="text-4xl block mb-3 filter drop-shadow-sm">{loc.emoji}</span>
                  
                  {/* Title */}
                  <h3 className="text-base font-bold text-rose-950 dark:text-white mb-1.5 flex items-center">
                    {loc.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-xs text-rose-800/80 dark:text-rose-200/80 leading-relaxed font-light">
                    {loc.description}
                  </p>
                </div>

                {/* Subtext */}
                <div className="mt-3 bg-purple-500/5 dark:bg-black/20 rounded-lg p-1.5 border border-purple-500/10">
                  <p className="text-[9px] font-semibold text-rose-700/80 dark:text-rose-300/80 tracking-wide leading-tight flex items-center">
                    <Compass className="w-2.5 h-2.5 mr-1 text-rose-500" />
                    {loc.funnySubtext}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="mt-10 text-center">
          <button
            disabled={!location}
            onClick={handleContinue}
            className={`relative group cursor-pointer inline-flex items-center space-x-2 py-4 px-10 rounded-full text-lg font-bold text-white transition-all
              ${location
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg border border-white/20 transform hover:scale-105 active:scale-95'
                : 'bg-rose-400/30 text-rose-500/40 cursor-not-allowed border border-rose-300/10'
              }`}
          >
            <span>Lock In Location</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
export default SelectLocation;
