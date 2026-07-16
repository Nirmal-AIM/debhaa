import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SimulatorProvider, useSimulator, SimulatorSteps } from './context/SimulatorContext';
import { CustomCursor } from './components/CustomCursor';

// Steps
import { LoadingScreen } from './steps/LoadingScreen';
import { HomePage } from './steps/HomePage';
import { Registration } from './steps/Registration';
import { SuccessPage } from './steps/SuccessPage';
import { UploadPhoto } from './steps/UploadPhoto';
import { SelectFriendPose } from './steps/SelectFriendPose';
import { SelectLocation } from './steps/SelectLocation';
import { SelectDuration } from './steps/SelectDuration';
import { StartDebhaMode } from './steps/StartDebhaMode';
import { Ending } from './steps/Ending';
import { FinalCertificate } from './steps/FinalCertificate';

// Premium Looping Romantic Background Music
const ROMANTIC_MUSIC_URL = 'https://assets.mixkit.co/music/preview/mixkit-delicate-piano-461.mp3';

const AppContent = () => {
  const { currentStep, isMuted } = useSimulator();
  const audioRef = useRef(null);

  // Sync mute state with HTML5 audio
  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.warn('Audio play failed, user interaction may be required:', err);
        });
      }
    }
  }, [isMuted]);

  // Render current step with page transition animations
  const renderStep = () => {
    switch (currentStep) {
      case SimulatorSteps.LOADING:
        return <LoadingScreen key="loading" />;
      case SimulatorSteps.HOME:
        return <HomePage key="home" />;
      case SimulatorSteps.REGISTRATION:
        return <Registration key="registration" />;
      case 'success':
        return <SuccessPage key="success" />;
      case SimulatorSteps.UPLOAD_PHOTO:
        return <UploadPhoto key="upload_photo" />;
      case SimulatorSteps.SELECT_POSE:
        return <SelectFriendPose key="select_pose" />;
      case SimulatorSteps.SELECT_LOCATION:
        return <SelectLocation key="select_location" />;
      case SimulatorSteps.SELECT_DURATION:
        return <SelectDuration key="select_duration" />;
      case SimulatorSteps.START_DEBHA:
        return <StartDebhaMode key="start_debha" />;
      case SimulatorSteps.ENDING:
        return <Ending key="ending" />;
      case SimulatorSteps.CERTIFICATE:
        return <FinalCertificate key="certificate" />;
      default:
        return <HomePage key="home" />;
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between select-none">
      {/* HTML5 Audio Loop */}
      <audio
        ref={audioRef}
        src={ROMANTIC_MUSIC_URL}
        loop
        preload="auto"
      />

      {/* Floating Hearts Cursor Trail */}
      <CustomCursor />

      {/* Main Switcher with Transition Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="flex-1 w-full"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <SimulatorProvider>
      <AppContent />
    </SimulatorProvider>
  );
}
