import React from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export const BackgroundParticles = () => {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const options = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "bubble",
        },
      },
      modes: {
        bubble: {
          distance: 200,
          size: 24,
          duration: 2,
          opacity: 0.8,
        },
      },
    },
    particles: {
      color: {
        value: ["#ff4d6d", "#ff8da1", "#8338ec", "#ffb703"],
      },
      links: {
        enable: false,
      },
      move: {
        direction: "top",
        enable: true,
        outModes: {
          default: "out",
        },
        random: true,
        speed: { min: 1, max: 3 },
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 30,
      },
      opacity: {
        value: { min: 0.15, max: 0.6 },
      },
      shape: {
        type: "heart",
      },
      size: {
        value: { min: 10, max: 22 },
      },
    },
    detectRetina: true,
  };

  return (
    <ParticlesProvider init={particlesInit}>
      <Particles
        id="tsparticles"
        options={options}
        className="absolute inset-0 pointer-events-none -z-10"
      />
    </ParticlesProvider>
  );
};
export default BackgroundParticles;
