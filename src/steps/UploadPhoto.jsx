import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSimulator, SimulatorSteps } from '../context/SimulatorContext';
import { Upload, Sparkles, Image, CheckCircle, ArrowRight } from 'lucide-react';
import { FallingPetals } from '../components/FallingPetals';

import debhaRoses from '../assets/debha_3.jpg';

const DEMO_FRIEND_PIC = debhaRoses;

export const UploadPhoto = () => {
  const { friendPicture, setFriendPicture, setCurrentStep } = useSimulator();
  const [isDragActive, setIsDragActive] = useState(false);
  const [animateSuccess, setAnimateSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFriendPicture(reader.result);
        setAnimateSuccess(true);
        setTimeout(() => setAnimateSuccess(false), 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const loadDemo = () => {
    setFriendPicture(DEMO_FRIEND_PIC);
    setAnimateSuccess(true);
    setTimeout(() => setAnimateSuccess(false), 2000);
  };

  const handleContinue = () => {
    if (friendPicture) {
      setCurrentStep(SimulatorSteps.SELECT_POSE);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-6 overflow-hidden">
      <FallingPetals />
      <div className="absolute w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl glass-panel rounded-3xl p-8 border border-white/40 shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gradient inline-flex items-center space-x-2">
            <span>📸 Upload Friend's Photo 📸</span>
          </h2>
          <p className="text-sm text-rose-800/70 dark:text-rose-200/70 mt-2 font-medium">
            Upload a picture of the friend you want to simulate romance with.
          </p>
        </div>

        {/* Drag and Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={triggerFileSelect}
          className={`relative border-3 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 min-h-[220px] flex flex-col items-center justify-center space-y-4
            ${isDragActive 
              ? 'border-purple-500 bg-purple-500/10 scale-102 shadow-[0_0_20px_rgba(131,56,236,0.25)]' 
              : friendPicture 
                ? 'border-green-400 bg-green-500/5' 
                : 'border-rose-300/40 hover:border-rose-400 bg-white/10 dark:bg-black/10'
            }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <AnimatePresence mode="wait">
            {friendPicture ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center space-y-4"
              >
                <div className="relative group/img">
                  <img
                    src={friendPicture}
                    alt="Friend Preview"
                    className="w-36 h-36 object-cover rounded-full border-4 border-rose-500 shadow-xl"
                  />
                  {animateSuccess && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 bg-green-500/80 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-16 h-16 text-white" />
                    </motion.div>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-green-700 dark:text-green-400">
                    ✓ Partner Locked In!
                  </p>
                  <p className="text-xs text-rose-700/60 dark:text-rose-300/60">
                    Click anywhere inside to re-upload.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center space-y-3"
              >
                <div className="p-4 bg-rose-500/10 rounded-full text-rose-500">
                  <Upload className="w-8 h-8 animate-bounce" />
                </div>
                <div>
                  <p className="text-base font-bold text-rose-950 dark:text-white">
                    Drag and drop friend's image here
                  </p>
                  <p className="text-xs text-rose-800/65 dark:text-rose-300/60">
                    or click to browse your computer
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          {/* Demo Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              loadDemo();
            }}
            className="flex-1 cursor-pointer bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 text-rose-700 dark:text-rose-300 font-bold py-4 px-6 rounded-2xl border border-rose-300/30 transition-all text-sm flex items-center justify-center space-x-2"
          >
            <Image className="w-4 h-4" />
            <span>Use Demo Partner</span>
          </button>

          {/* Continue Button */}
          <button
            disabled={!friendPicture}
            onClick={handleContinue}
            className={`flex-1 relative group cursor-pointer inline-flex items-center justify-center space-x-2 py-4 px-6 rounded-2xl text-lg font-bold text-white transition-all
              ${friendPicture
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-md border border-white/20 transform hover:scale-[1.02] active:scale-95'
                : 'bg-rose-400/30 text-rose-500/40 cursor-not-allowed border border-rose-300/10'
              }`}
          >
            <span>Proceed to Pose</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
export default UploadPhoto;
