import React from 'react';

export const FallingPetals = () => {
  const petals = Array.from({ length: 30 }, (_, i) => {
    const left = Math.random() * 100; // 0% to 100%
    const delay = Math.random() * 10; // 0s to 10s delay
    const duration = Math.random() * 12 + 8; // 8s to 20s fall duration
    const size = Math.random() * 16 + 12; // 12px to 28px
    const rotation = Math.random() * 360;
    const opacity = Math.random() * 0.5 + 0.3; // 0.3 to 0.8 opacity
    const types = ['🌸', '🌹', '💖', '✨', '🎈'];
    const type = types[Math.floor(Math.random() * types.length)];

    return { id: i, left, delay, duration, size, rotation, opacity, type };
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute text-center inline-block animate-petal-fall"
          style={{
            left: `${p.left}%`,
            top: `-50px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}px`,
            transform: `rotate(${p.rotation}deg)`,
            opacity: p.opacity,
          }}
        >
          {p.type}
        </span>
      ))}
    </div>
  );
};
