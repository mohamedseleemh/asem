'use client';

import { motion } from 'framer-motion';
import EditableText from '../admin/EditableText';

interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  backgroundImage: string;
}

interface HeroProps {
  content: HeroContent;
  onUpdate: (updates: Partial<HeroContent>) => void;
  adminMode: boolean;
}

export default function Hero({ content, onUpdate, adminMode }: HeroProps) {
  const floatingElements = ['📖', '⭐', '🌙', '✨', '🕌', '📿'];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Floating Elements */}
      {floatingElements.map((emoji, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl md:text-6xl opacity-20"
          style={{
            top: `${20 + Math.sin((index * Math.PI) / 3) * 60}%`,
            left: `${10 + Math.cos((index * Math.PI) / 3) * 80}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 6 + index,
            repeat: Infinity,
            delay: index * 0.5,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center lg:text-right"
          >
            <EditableText
              value={content.title}
              onChange={(value) => onUpdate({ title: value })}
              className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)]"
              tag="h1"
              adminMode={adminMode}
            />

            <EditableText
              value={content.subtitle}
              onChange={(value) => onUpdate({ subtitle: value })}
              className="text-2xl md:text-3xl text-[var(--color-secondary)] mb-6"
              tag="h2"
              adminMode={adminMode}
            />

            <EditableText
              value={content.description}
              onChange={(value) => onUpdate({ description: value })}
              className="text-lg md:text-xl text-white/80 leading-relaxed mb-8"
              tag="p"
              multiline
              adminMode={adminMode}
            />

            <motion.button
              className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(251,191,36,0.6)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <EditableText
                value={content.ctaText}
                onChange={(value) => onUpdate({ ctaText: value })}
                className="text-current"
                tag="span"
                adminMode={adminMode}
              />
            </motion.button>
          </motion.div>

          {/* Avatar/Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] rounded-full animate-pulse" />
              <div className="absolute inset-2 bg-gradient-to-br from-gray-800 to-blue-900 rounded-full flex items-center justify-center">
                <div className="text-8xl">👨‍🏫</div>
              </div>

              {/* Orbital Elements */}
              {['📖', '⭐', '🌙', '✨'].map((emoji, index) => (
                <motion.div
                  key={index}
                  className="absolute text-4xl"
                  style={{
                    top: `${20 + Math.sin((index * Math.PI) / 2) * 60}%`,
                    left: `${20 + Math.cos((index * Math.PI) / 2) * 60}%`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [0, 360],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
