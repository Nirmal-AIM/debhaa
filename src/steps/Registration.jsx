import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSimulator, SimulatorSteps } from '../context/SimulatorContext';
import { Sparkles, ArrowRight, User, Mail, Calendar, Phone, Heart, Film, Upload, CheckSquare, Square } from 'lucide-react';
import { FallingPetals } from '../components/FallingPetals';
import debhaRoses from '../assets/debha_3.jpg';

export const Registration = () => {
  const { registration, setRegistration, setCurrentStep } = useSimulator();
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistration((prev) => ({ ...prev, [name]: value }));
    // Clear error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = () => {
    setRegistration((prev) => ({ ...prev, isPrankChecked: !prev.isPrankChecked }));
    if (errors.isPrankChecked) {
      setErrors((prev) => ({ ...prev, isPrankChecked: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRegistration((prev) => ({ ...prev, picture: reader.result }));
      };
      reader.readAsDataURL(file);
      
      if (errors.picture) {
        setErrors((prev) => ({ ...prev, picture: '' }));
      }
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!registration.name.trim()) newErrors.name = 'Name is required';
    if (!registration.age.trim()) {
      newErrors.age = 'Age is required';
    } else if (isNaN(registration.age) || parseInt(registration.age) <= 0) {
      newErrors.age = 'Provide a valid age';
    }
    if (!registration.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(registration.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!registration.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!registration.nickname.trim()) newErrors.nickname = 'Romantic nickname is required';
    if (!registration.movie.trim()) newErrors.movie = 'Romantic movie is required';
    if (!registration.picture) newErrors.picture = 'Profile picture is required';
    if (!registration.isPrankChecked) newErrors.isPrankChecked = 'You must accept the prank warning!';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Shake animation effect could be triggered here
      return;
    }

    // Form is valid! Transition to Success Page
    setCurrentStep('success');
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-4 md:p-8 overflow-y-auto">
      <FallingPetals />
      
      {/* Decorative glows */}
      <div className="absolute w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] -bottom-20 -right-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl glass-panel rounded-3xl p-6 md:p-10 shadow-2xl border border-white/30 z-10 my-10"
      >
        {/* Banner Picture at Top of Card */}
        <div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-6 relative border border-rose-350/20 shadow-md">
          <img 
            src={debhaRoses} 
            alt="Debha Roses Banner" 
            className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700" 
          />
          {/* Subtle overlay text gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
            <span className="text-white text-[10px] font-black uppercase tracking-widest bg-rose-500/80 px-3 py-1 rounded-full flex items-center space-x-1.5">
              <span>Your Bromance Awaits</span> <span>🌹</span>
            </span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gradient drop-shadow-sm inline-flex items-center space-x-2">
            <span>❤️ Register for Debha ❤️</span>
          </h2>
          <p className="text-sm text-rose-800/70 dark:text-rose-200/70 mt-2 font-medium">
            Join the elite club of simulated romantic bros. All fields required.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Name field */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400" />
                <input
                  type="text"
                  name="name"
                  value={registration.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 bg-white/20 dark:bg-black/30 border border-rose-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-rose-950 dark:text-white placeholder-rose-600/40 dark:placeholder-rose-300/30 font-medium transition-all"
                />
              </div>
              {errors.name && <p className="text-xs font-bold text-rose-600 dark:text-rose-400 mt-1">⚠️ {errors.name}</p>}
            </div>

            {/* Age field */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">Age</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400" />
                <input
                  type="text"
                  name="age"
                  value={registration.age}
                  onChange={handleChange}
                  placeholder="e.g. 24"
                  className="w-full pl-10 pr-4 py-3 bg-white/20 dark:bg-black/30 border border-rose-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-rose-950 dark:text-white placeholder-rose-600/40 dark:placeholder-rose-300/30 font-medium transition-all"
                />
              </div>
              {errors.age && <p className="text-xs font-bold text-rose-600 dark:text-rose-400 mt-1">⚠️ {errors.age}</p>}
            </div>

            {/* Email field */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400" />
                <input
                  type="email"
                  name="email"
                  value={registration.email}
                  onChange={handleChange}
                  placeholder="your.love@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-white/20 dark:bg-black/30 border border-rose-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-rose-950 dark:text-white placeholder-rose-600/40 dark:placeholder-rose-300/30 font-medium transition-all"
                />
              </div>
              {errors.email && <p className="text-xs font-bold text-rose-600 dark:text-rose-400 mt-1">⚠️ {errors.email}</p>}
            </div>

            {/* Phone field */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400" />
                <input
                  type="tel"
                  name="phone"
                  value={registration.phone}
                  onChange={handleChange}
                  placeholder="e.g. +1 234 567 890"
                  className="w-full pl-10 pr-4 py-3 bg-white/20 dark:bg-black/30 border border-rose-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-rose-950 dark:text-white placeholder-rose-600/40 dark:placeholder-rose-300/30 font-medium transition-all"
                />
              </div>
              {errors.phone && <p className="text-xs font-bold text-rose-600 dark:text-rose-400 mt-1">⚠️ {errors.phone}</p>}
            </div>

            {/* Nickname field */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">Romantic Nickname</label>
              <div className="relative">
                <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400" />
                <input
                  type="text"
                  name="nickname"
                  value={registration.nickname}
                  onChange={handleChange}
                  placeholder="e.g. Cutie Pie, Honey Bun"
                  className="w-full pl-10 pr-4 py-3 bg-white/20 dark:bg-black/30 border border-rose-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-rose-950 dark:text-white placeholder-rose-600/40 dark:placeholder-rose-300/30 font-medium transition-all"
                />
              </div>
              {errors.nickname && <p className="text-xs font-bold text-rose-600 dark:text-rose-400 mt-1">⚠️ {errors.nickname}</p>}
            </div>

            {/* Movie field */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">Favourite Romantic Movie</label>
              <div className="relative">
                <Film className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400" />
                <input
                  type="text"
                  name="movie"
                  value={registration.movie}
                  onChange={handleChange}
                  placeholder="e.g. Titanic, DDLJ"
                  className="w-full pl-10 pr-4 py-3 bg-white/20 dark:bg-black/30 border border-rose-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-rose-950 dark:text-white placeholder-rose-600/40 dark:placeholder-rose-300/30 font-medium transition-all"
                />
              </div>
              {errors.movie && <p className="text-xs font-bold text-rose-600 dark:text-rose-400 mt-1">⚠️ {errors.movie}</p>}
            </div>

          </div>

          {/* Profile picture upload */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">Upload Profile Picture</label>
            <div 
              onClick={triggerFileSelect}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center space-y-2
                ${registration.picture 
                  ? 'border-green-400 bg-green-500/5' 
                  : errors.picture 
                    ? 'border-rose-500 bg-rose-500/5' 
                    : 'border-rose-300/40 hover:border-rose-500 bg-white/10 dark:bg-black/10'
                }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              
              {registration.picture ? (
                <div className="flex items-center space-x-4">
                  <img
                    src={registration.picture}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-full border-2 border-rose-500 shadow-md"
                  />
                  <div className="text-left">
                    <p className="text-sm font-bold text-green-700 dark:text-green-400">✓ Picture Loaded Successfully!</p>
                    <p className="text-xs text-rose-700/60 dark:text-rose-300/60">Click to change picture</p>
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-rose-500 animate-bounce" />
                  <p className="text-sm font-bold text-rose-950 dark:text-white">
                    Drag and drop or click to upload your selfie
                  </p>
                  <p className="text-xs text-rose-800/60 dark:text-rose-300/55">
                    Supports PNG, JPG, GIF up to 5MB
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const demoUserPic = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2050/svg' width='100' height='100'><circle cx='50' cy='50' r='50' fill='%23ff8da1'/><text x='25' y='65' font-size='50'>😎</text></svg>";
                      setRegistration(prev => ({ ...prev, picture: demoUserPic }));
                      if (errors.picture) setErrors(prev => ({ ...prev, picture: '' }));
                    }}
                    className="mt-2 text-xs font-bold text-rose-650 dark:text-rose-300 bg-rose-500/10 px-3 py-1.5 rounded-lg hover:bg-rose-500/20 transition-all cursor-pointer z-20"
                  >
                    Or Use Demo Selfie
                  </button>
                </>
              )}
            </div>
            {errors.picture && <p className="text-xs font-bold text-rose-600 dark:text-rose-400">⚠️ {errors.picture}</p>}
          </div>

          {/* Prank Disclaimer Checkbox */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleCheckboxChange}
              className="flex items-start space-x-3 text-left focus:outline-none select-none cursor-pointer"
            >
              <div className="mt-0.5 text-rose-600">
                {registration.isPrankChecked ? (
                  <CheckSquare className="w-5 h-5 fill-rose-500/25" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-rose-950 dark:text-white">
                  "This is only a funny parody prank."
                </p>
                <p className="text-xs text-rose-800/60 dark:text-rose-300/60 leading-tight">
                  I agree that this is a joke and no real romance engine will actually scan my soul.
                </p>
              </div>
            </button>
            {errors.isPrankChecked && <p className="text-xs font-bold text-rose-600 dark:text-rose-400 mt-1">⚠️ {errors.isPrankChecked}</p>}
          </div>

          {/* Register Button */}
          <div className="pt-4 text-center">
            <button
              type="submit"
              className="relative group cursor-pointer inline-flex items-center space-x-2 px-8 py-4 rounded-full text-lg font-bold text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg border border-white/20 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span>Register for Debha Mode</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};
export default Registration;
