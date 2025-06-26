'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import EditableText from '../admin/EditableText';

interface ContactData {
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  socialMedia: {
    youtube: string;
    facebook: string;
    telegram: string;
  };
}

interface ContactProps {
  contact: ContactData;
  onUpdate: (updates: Partial<ContactData>) => void;
  adminMode: boolean;
}

export default function Contact({ contact, onUpdate, adminMode }: ContactProps) {
  const contactMethods = [
    {
      icon: Phone,
      label: 'الهاتف',
      value: contact.phone,
      link: `tel:${contact.phone}`,
      field: 'phone',
    },
    {
      icon: MessageCircle,
      label: 'واتساب',
      value: 'تواصل عبر واتساب',
      link: contact.whatsapp,
      field: 'whatsapp',
    },
    {
      icon: Mail,
      label: 'البريد الإلكتروني',
      value: contact.email,
      link: `mailto:${contact.email}`,
      field: 'email',
    },
    {
      icon: MapPin,
      label: 'العنوان',
      value: contact.address,
      link: `https://maps.google.com/?q=${encodeURIComponent(contact.address)}`,
      field: 'address',
    },
  ];

  const socialLinks = [
    {
      name: 'YouTube',
      url: contact.socialMedia.youtube,
      icon: '📺',
      color: 'bg-red-600',
      field: 'youtube',
    },
    {
      name: 'Facebook',
      url: contact.socialMedia.facebook,
      icon: '📘',
      color: 'bg-blue-600',
      field: 'facebook',
    },
    {
      name: 'Telegram',
      url: contact.socialMedia.telegram,
      icon: '✈️',
      color: 'bg-blue-500',
      field: 'telegram',
    },
  ];

  const updateSocialMedia = (field: string, value: string) => {
    onUpdate({
      socialMedia: {
        ...contact.socialMedia,
        [field]: value,
      },
    });
  };

  return (
    <section className="py-20 relative" id="contact">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">تواصل معنا</h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            نحن هنا للإجابة على استفساراتكم وتقديم المساعدة في رحلتكم التعليمية
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">طرق التواصل</h3>

            <div className="space-y-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <motion.div
                    key={method.label}
                    className="glass-card p-6 group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, x: 10 }}
                  >
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <motion.div
                        className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        <Icon size={20} className="text-white" />
                      </motion.div>

                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-1">{method.label}</h4>
                        {method.field === 'whatsapp' ? (
                          <span className="text-white/80">{method.value}</span>
                        ) : (
                          <EditableText
                            value={method.value}
                            onChange={(value) => onUpdate({ [method.field]: value })}
                            className="text-white/80"
                            tag="span"
                            adminMode={adminMode}
                          />
                        )}
                      </div>

                      <motion.a
                        href={method.link}
                        target={method.field === 'whatsapp' ? '_blank' : undefined}
                        rel={method.field === 'whatsapp' ? 'noopener noreferrer' : undefined}
                        className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors opacity-0 group-hover:opacity-100"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        تواصل
                      </motion.a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Social Media & Quick Contact */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Social Media */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-8">تابعونا على</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} text-white p-6 rounded-2xl flex flex-col items-center justify-center h-32 group transition-all duration-300`}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-3xl mb-2">{social.icon}</div>
                      <span className="font-semibold">{social.name}</span>

                      {adminMode && (
                        <input
                          type="url"
                          value={social.url}
                          onChange={(e) => updateSocialMedia(social.field, e.target.value)}
                          className="mt-2 text-xs bg-white/20 border border-white/30 rounded px-2 py-1 w-full"
                          placeholder="URL"
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}
                    </motion.a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Message */}
            <motion.div
              className="glass-card p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-white mb-6">رسالة سريعة</h3>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="الاسم"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                />

                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                />

                <textarea
                  rows={4}
                  placeholder="رسالتك..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
                />

                <motion.button
                  className="w-full gradient-bg text-white py-3 rounded-lg font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  إرسال الرسالة
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* WhatsApp Float Button */}
        <motion.a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl z-30"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <MessageCircle size={24} />
        </motion.a>
      </div>
    </section>
  );
}
