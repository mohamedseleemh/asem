'use client';

import { motion } from 'framer-motion';
import { Heart, BookOpen, Users, Star } from 'lucide-react';

interface FooterProps {
  contact: {
    phone: string;
    email: string;
    address: string;
    socialMedia: {
      youtube: string;
      facebook: string;
      telegram: string;
    };
  };
  siteTitle: string;
}

export default function Footer({ contact, siteTitle }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'عن الشيخ', href: '/about' },
    { name: 'الخدمات', href: '/services' },
    { name: 'تواصل معنا', href: '/contact' },
  ];

  const socialLinks = [
    { name: 'YouTube', url: contact.socialMedia.youtube, icon: '📺' },
    { name: 'Facebook', url: contact.socialMedia.facebook, icon: '📘' },
    { name: 'Telegram', url: contact.socialMedia.telegram, icon: '✈️' },
  ];

  return (
    <footer className="relative bg-black/50 backdrop-blur-xl border-t border-white/10">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {['🌙', '⭐', '📖', '✨'].map((emoji, index) => (
          <motion.div
            key={index}
            className="absolute text-2xl opacity-10"
            style={{
              top: `${20 + index * 20}%`,
              left: `${10 + index * 25}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              delay: index * 1,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Site Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center">
                <span className="text-white font-bold">ع</span>
              </div>
              <h3 className="text-xl font-bold text-white">{siteTitle}</h3>
            </div>

            <p className="text-white/70 leading-relaxed mb-6">
              رحلة في تعليم وتحفيظ القرآن الكريم مع خريج الأزهر الشريف. نقدم دروساً قرآنية أصيلة
              وعلوماً شرعية معاصرة.
            </p>

            <div className="flex items-center space-x-2 space-x-reverse text-white/60">
              <Heart size={16} className="text-red-400" />
              <span className="text-sm">صُنع بحب لخدمة الإسلام</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold text-white mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[var(--color-primary)] transition-colors flex items-center space-x-2 space-x-reverse group"
                  >
                    <motion.span
                      className="w-1 h-1 bg-[var(--color-primary)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.5 }}
                    />
                    <span>{link.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold text-white mb-6">معلومات الاتصال</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 space-x-reverse text-white/70">
                <span className="text-[var(--color-primary)] mt-1">📞</span>
                <div>
                  <p className="font-medium">الهاتف</p>
                  <p className="text-sm">{contact.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-x-reverse text-white/70">
                <span className="text-[var(--color-primary)] mt-1">✉️</span>
                <div>
                  <p className="font-medium">البريد الإلكتروني</p>
                  <p className="text-sm break-all">{contact.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-x-reverse text-white/70">
                <span className="text-[var(--color-primary)] mt-1">📍</span>
                <div>
                  <p className="font-medium">العنوان</p>
                  <p className="text-sm">{contact.address}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold text-white mb-6">تابعونا</h4>
            <div className="flex flex-col space-y-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 space-x-reverse text-white/70 hover:text-[var(--color-primary)] transition-colors group"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xl">{social.icon}</span>
                  <span className="group-hover:underline">{social.name}</span>
                </motion.a>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: BookOpen, label: 'دروس', value: '100+' },
                { icon: Users, label: 'طلاب', value: '5000+' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <stat.icon size={20} className="text-[var(--color-primary)] mx-auto mb-1" />
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/60">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/10 mt-12 pt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-white/60 text-sm mb-4 md:mb-0">
              © {currentYear} {siteTitle}. جميع الحقوق محفوظة.
            </p>

            <div className="flex items-center space-x-6 space-x-reverse text-white/60 text-sm">
              <a href="#" className="hover:text-[var(--color-primary)] transition-colors">
                سياسة الخصوصية
              </a>
              <span>•</span>
              <a href="#" className="hover:text-[var(--color-primary)] transition-colors">
                شروط الاستخدام
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
