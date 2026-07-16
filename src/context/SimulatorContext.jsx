import React, { createContext, useContext, useState, useEffect } from 'react';

const SimulatorContext = createContext();

export const SimulatorSteps = {
  LOADING: 'loading',
  HOME: 'home',
  REGISTRATION: 'registration',
  UPLOAD_PHOTO: 'upload_photo',
  SELECT_POSE: 'select_pose',
  SELECT_LOCATION: 'select_location',
  SELECT_DURATION: 'select_duration',
  START_DEBHA: 'start_debha',
  COUNTDOWN: 'countdown',
  ENDING: 'ending',
  CERTIFICATE: 'certificate',
};

export const SimulatorProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(SimulatorSteps.LOADING);
  const [theme, setTheme] = useState('light');
  const [isMuted, setIsMuted] = useState(true);
  
  // Registration data
  const [registration, setRegistration] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    nickname: '',
    movie: '',
    picture: null, // base64 string or object URL
    isPrankChecked: false,
  });

  // Simulator choices
  const [friendPicture, setFriendPicture] = useState(null);
  const [pose, setPose] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState(10); // default 10 minutes

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Sync theme with body class
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);

  // Restart simulator
  const restartSimulator = () => {
    setRegistration({
      name: '',
      age: '',
      email: '',
      phone: '',
      nickname: '',
      movie: '',
      picture: null,
      isPrankChecked: false,
    });
    setFriendPicture(null);
    setPose('');
    setLocation('');
    setDuration(10);
    setCurrentStep(SimulatorSteps.HOME);
  };

  return (
    <SimulatorContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        theme,
        toggleTheme,
        isMuted,
        setIsMuted,
        registration,
        setRegistration,
        friendPicture,
        setFriendPicture,
        pose,
        setPose,
        location,
        setLocation,
        duration,
        setDuration,
        restartSimulator,
      }}
    >
      {children}
    </SimulatorContext.Provider>
  );
};

export const useSimulator = () => {
  const context = useContext(SimulatorContext);
  if (!context) {
    throw new Error('useSimulator must be used within a SimulatorProvider');
  }
  return context;
};
