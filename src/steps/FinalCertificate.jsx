import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSimulator, SimulatorSteps } from '../context/SimulatorContext';
import { Award, Download, RefreshCw, Star, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FallingPetals } from '../components/FallingPetals';

export const FinalCertificate = () => {
  const { registration, location, duration, restartSimulator } = useSimulator();
  const canvasRef = useRef(null);

  useEffect(() => {
    // Spark continuous small bursts of confetti
    const interval = setInterval(() => {
      confetti({
        particleCount: 15,
        spread: 40,
        origin: { y: 0.7 },
        colors: ['#ff4d6d', '#ff8da1', '#ffb703'],
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Draw high quality certificate
    // Width: 1200px, Height: 850px (High-res landscape)
    
    // 1. Background Gradient
    const grad = ctx.createRadialGradient(600, 425, 50, 600, 425, 700);
    grad.addColorStop(0, '#fff5f6');
    grad.addColorStop(1, '#ffe3e8');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 850);

    // 2. Luxury Golden/Red Border
    ctx.strokeStyle = '#c9184a';
    ctx.lineWidth = 15;
    ctx.strokeRect(20, 20, 1160, 810);

    ctx.strokeStyle = '#ffb703';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, 1120, 770);

    // Corner flourishes (simple geometric luxury corners)
    ctx.fillStyle = '#ffb703';
    ctx.fillRect(35, 35, 40, 6);
    ctx.fillRect(35, 35, 6, 40);
    
    ctx.fillRect(1125, 35, 40, 6);
    ctx.fillRect(1159, 35, 6, 40);

    ctx.fillRect(35, 809, 40, 6);
    ctx.fillRect(35, 775, 6, 40);

    ctx.fillRect(1125, 809, 40, 6);
    ctx.fillRect(1159, 775, 6, 40);

    // 3. Ornate Header
    ctx.fillStyle = '#c9184a';
    ctx.font = 'bold 36px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('🏆 CERTIFICATE OF BROMANCE 🏆', 600, 130);

    ctx.fillStyle = '#5c0632';
    ctx.font = '24px Arial, sans-serif';
    ctx.fillText('This certifies that the legendary duo', 600, 200);

    // 4. User's Name
    ctx.fillStyle = '#ff4d6d';
    ctx.font = 'italic bold 52px Georgia, serif';
    ctx.fillText(registration.name || 'The Ultimate Bro', 600, 280);

    ctx.fillStyle = '#5c0632';
    ctx.font = '24px Arial, sans-serif';
    ctx.fillText('& Their Selected Bromance Partner', 600, 350);

    // 5. Completion Text
    ctx.fillStyle = '#8338ec';
    ctx.font = 'bold 32px Arial, sans-serif';
    ctx.fillText('Have Successfully Completed The', 600, 420);

    ctx.fillStyle = '#c9184a';
    ctx.font = 'bold 44px Georgia, serif';
    ctx.fillText('💖 DEBHA DEBHA ROMANCE SIMULATOR 💖', 600, 495);

    // 6. Stats & Rating
    ctx.fillStyle = '#5c0632';
    ctx.font = 'italic 20px Arial, sans-serif';
    ctx.fillText(`Simulated Location: ${location.toUpperCase()}  |  Duration: ${duration} Minutes`, 600, 560);

    // Stars
    ctx.fillStyle = '#ffb703';
    ctx.font = '36px Arial, sans-serif';
    ctx.fillText('⭐⭐⭐⭐⭐', 600, 615);

    // Score
    ctx.fillStyle = '#c9184a';
    ctx.font = 'bold 30px Courier New, monospace';
    ctx.fillText('RELATIONSHIP SCORE: 99999999 / 100', 600, 675);

    // Seal logo or footnote
    ctx.fillStyle = '#ff8da1';
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.fillText('ISSUED BY THE DEBHA-DEBHA ROMANCE REGISTRY BOARD (2026)', 600, 750);

    // 7. Download Trigger
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `debha_legend_${registration.name || 'bro'}.png`;
    link.href = image;
    link.click();
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-4 md:p-8 overflow-y-auto">
      <FallingPetals />
      
      <div className="absolute w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hidden high-res canvas used for download compilation */}
      <canvas 
        ref={canvasRef} 
        width="1200" 
        height="850" 
        className="hidden" 
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl glass-panel rounded-3xl p-6 md:p-10 border border-white/40 shadow-2xl relative z-10 text-center space-y-8 my-10"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-yellow-500/20 rounded-full border border-yellow-500/30 text-yellow-600 dark:text-yellow-400">
            <Award className="w-10 h-10 animate-bounce" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gradient drop-shadow-sm">
            🏆 Certified Debha Legend
          </h2>
          <p className="text-sm text-rose-800/70 dark:text-rose-200/70 font-medium">
            You have braved the extreme heights of simulated affection. Here is your reward.
          </p>
        </div>

        {/* Visual Certificate Card Preview */}
        <div className="border-4 border-double border-rose-500 bg-white/50 dark:bg-black/35 rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-inner max-w-2xl mx-auto">
          {/* Gold Star corners */}
          <Star className="w-5 h-5 absolute top-4 left-4 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 absolute top-4 right-4 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 absolute bottom-4 left-4 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 absolute bottom-4 right-4 text-yellow-500 fill-yellow-500" />

          <div className="space-y-2">
            <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest block">
              OFFICIAL BROMANCE CREDENTIAL
            </span>
            <p className="text-xs text-rose-900/80 dark:text-rose-200/80 font-light">
              This certifies that the legendary duo
            </p>
            <h3 className="text-2xl md:text-3xl font-serif italic font-bold text-rose-600 dark:text-rose-450">
              {registration.name || 'The Ultimate Bro'}
            </h3>
            <p className="text-xs text-rose-900/80 dark:text-rose-200/80 font-light">
              & Partner have successfully completed the
            </p>
            <h4 className="text-base md:text-lg font-black text-rose-950 dark:text-white uppercase tracking-wider flex items-center justify-center space-x-1.5">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-heartbeat-slow" />
              <span>Debha Debha Romance Simulator</span>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-heartbeat-slow" />
            </h4>
          </div>

          <div className="h-px bg-rose-300/35 dark:bg-rose-700/30 w-1/2 mx-auto" />

          {/* Rating and Score block */}
          <div className="space-y-2">
            <div className="flex justify-center space-x-1 text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            
            <div className="bg-rose-500/10 inline-block px-4 py-2 rounded-xl border border-rose-500/20">
              <span className="block text-[9px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                RELATIONSHIP SCORE
              </span>
              <span className="font-mono text-xl font-black text-rose-700 dark:text-rose-350 tracking-wider">
                99999999
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="flex-1 relative group cursor-pointer inline-flex items-center justify-center space-x-2 py-4 px-6 rounded-2xl text-lg font-bold text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-md border border-white/20 transition-all transform hover:scale-[1.02] active:scale-95"
          >
            <Download className="w-5 h-5" />
            <span>Download Certificate</span>
          </button>

          {/* Restart Button */}
          <button
            onClick={restartSimulator}
            className="sm:w-1/3 cursor-pointer inline-flex items-center justify-center space-x-2 py-4 px-6 rounded-2xl text-base font-bold text-rose-800 dark:text-rose-300 bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 border border-rose-350/20 transition-all transform hover:scale-[1.02] active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Restart</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
export default FinalCertificate;
