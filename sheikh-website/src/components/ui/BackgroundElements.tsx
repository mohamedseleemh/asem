'use client';

import { motion } from 'framer-motion';
import { SiteSettings } from '@/lib/content-manager';

interface BackgroundElementsProps {
  settings: SiteSettings;
}

export default function BackgroundElements({ settings }: BackgroundElementsProps) {
  if (!settings.design.enableFloatingElements) return null;

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
  }));

  const floatingEmojis = ['⭐', '🌙', '✨', '💫', '🔮', '🌟'];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/10 via-transparent to-[var(--color-secondary)]/10"
          animate={{
            background: [
              'linear-gradient(45deg, var(--color-primary)/10, transparent, var(--color-secondary)/10)',
              'linear-gradient(135deg, var(--color-secondary)/10, transparent, var(--color-accent)/10)',
              'linear-gradient(225deg, var(--color-accent)/10, transparent, var(--color-primary)/10)',
              'linear-gradient(315deg, var(--color-primary)/10, transparent, var(--color-secondary)/10)',
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Floating Particles */}
      {settings.design.enableParticles && (
        <>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute bg-white/20 rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </>
      )}

      {/* Floating Emojis */}
      {settings.layout.showFloatingElements && (
        <>
          {floatingEmojis.map((emoji, index) => (
            <motion.div
              key={emoji + index}
              className="absolute text-4xl md:text-6xl opacity-10 select-none"
              style={{
                left: `${10 + index * 15}%`,
                top: `${20 + (index % 3) * 30}%`,
              }}
              animate={{
                y: [-30, 30, -30],
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 8 + index * 2,
                repeat: Infinity,
                delay: index * 1.5,
                ease: 'easeInOut',
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </>
      )}

      {/* Cosmic Rays */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              width: '200px',
              top: `${20 + i * 15}%`,
              left: `-100px`,
              transform: `rotate(${-45 + i * 15}deg)`,
            }}
            animate={{
              x: ['0vw', '100vw'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 2,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Pulsing Circles */}
      <div className="absolute inset-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-white/10 rounded-full"
            style={{
              width: `${300 + i * 200}px`,
              height: `${300 + i * 200}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i * 2,
              repeat: Infinity,
              delay: i,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Twinkling Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}
