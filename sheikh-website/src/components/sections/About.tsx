'use client';

import { motion } from 'framer-motion';
import EditableText from '../admin/EditableText';

interface AboutContent {
  title: string;
  subtitle: string;
  description: string;
  achievements: Array<{
    id: number;
    title: string;
    description: string;
    icon: string;
  }>;
  stats: Array<{
    value: string;
    label: string;
    icon: string;
  }>;
}

interface AboutProps {
  content: AboutContent;
  onUpdate: (updates: Partial<AboutContent>) => void;
  adminMode: boolean;
}

export default function About({ content, onUpdate, adminMode }: AboutProps) {
  const updateAchievement = (index: number, field: string, value: string) => {
    const updatedAchievements = content.achievements.map((achievement, i) =>
      i === index ? { ...achievement, [field]: value } : achievement
    );
    onUpdate({ achievements: updatedAchievements });
  };

  const updateStat = (index: number, field: string, value: string) => {
    const updatedStats = content.stats.map((stat, i) =>
      i === index ? { ...stat, [field]: value } : stat
    );
    onUpdate({ stats: updatedStats });
  };

  return (
    <section className="py-20 relative" id="about">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <EditableText
            value={content.title}
            onChange={(value) => onUpdate({ title: value })}
            className="text-4xl md:text-6xl font-bold mb-6 gradient-text"
            tag="h2"
            adminMode={adminMode}
          />

          <EditableText
            value={content.subtitle}
            onChange={(value) => onUpdate({ subtitle: value })}
            className="text-2xl md:text-3xl text-[var(--color-secondary)] mb-6"
            tag="h3"
            adminMode={adminMode}
          />

          <EditableText
            value={content.description}
            onChange={(value) => onUpdate({ description: value })}
            className="text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl mx-auto"
            tag="p"
            multiline
            adminMode={adminMode}
          />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {content.stats.map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl mb-4">{stat.icon}</div>

              <EditableText
                value={stat.value}
                onChange={(value) => updateStat(index, 'value', value)}
                className="text-3xl font-bold text-[var(--color-primary)] mb-2"
                tag="h3"
                adminMode={adminMode}
              />

              <EditableText
                value={stat.label}
                onChange={(value) => updateStat(index, 'label', value)}
                className="text-white/80 text-sm"
                tag="p"
                adminMode={adminMode}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
            الإنجازات والشهادات
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className="glass-card p-8"
                initial={{ opacity: 0, rotateY: -45 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.02,
                  rotateY: 5,
                  boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="text-5xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <EditableText
                      value={achievement.title}
                      onChange={(value) => updateAchievement(index, 'title', value)}
                      className="text-2xl font-bold text-white mb-3"
                      tag="h4"
                      adminMode={adminMode}
                    />

                    <EditableText
                      value={achievement.description}
                      onChange={(value) => updateAchievement(index, 'description', value)}
                      className="text-white/80 leading-relaxed"
                      tag="p"
                      multiline
                      adminMode={adminMode}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto glass-card p-12">
            <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed mb-6">
              "إن في تدبر آيات الله في الكون والكتاب لأعظم طريق لمعرفة الخالق عز وجل"
            </p>

            <div className="w-24 h-1 gradient-bg mx-auto rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
