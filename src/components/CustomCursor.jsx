import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Limit rate of heart spawning
      if (Math.random() > 0.15) return;

      const heartEmojis = ['💖', '❤️', '🌸', '💕', '🌹', '✨'];
      const randomEmoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      
      const newHeart = {
        id: Math.random().toString(),
        x: e.clientX,
        y: e.clientY,
        emoji: randomEmoji,
        size: Math.random() * 16 + 12, // 12px to 28px
      };

      setHearts((prev) => [...prev, newHeart]);

      // Remove after 1.2s
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 1200);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="cursor-trail-heart"
          style={{
            left: h.x,
            top: h.y,
            fontSize: `${h.size}px`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
};
