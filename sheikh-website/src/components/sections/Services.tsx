'use client';

import { motion } from 'framer-motion';
import EditableText from '../admin/EditableText';

interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
}

interface ServicesProps {
  services: Service[];
  onUpdate: (services: Service[]) => void;
  adminMode: boolean;
}

export default function Services({ services, onUpdate, adminMode }: ServicesProps) {
  const updateService = (index: number, field: string, value: string | string[]) => {
    const updatedServices = services.map((service, i) =>
      i === index ? { ...service, [field]: value } : service
    );
    onUpdate(updatedServices);
  };

  const updateFeature = (serviceIndex: number, featureIndex: number, value: string) => {
    const updatedServices = services.map((service, i) =>
      i === serviceIndex
        ? {
            ...service,
            features: service.features.map((feature, fi) =>
              fi === featureIndex ? value : feature
            ),
          }
        : service
    );
    onUpdate(updatedServices);
  };

  const addFeature = (serviceIndex: number) => {
    const updatedServices = services.map((service, i) =>
      i === serviceIndex ? { ...service, features: [...service.features, 'ميزة جديدة'] } : service
    );
    onUpdate(updatedServices);
  };

  const removeFeature = (serviceIndex: number, featureIndex: number) => {
    const updatedServices = services.map((service, i) =>
      i === serviceIndex
        ? { ...service, features: service.features.filter((_, fi) => fi !== featureIndex) }
        : service
    );
    onUpdate(updatedServices);
  };

  return (
    <section className="py-20 relative" id="services">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">خدماتنا</h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            نقدم مجموعة شاملة من الخدمات التعليمية والدعوية لنشر تعاليم الإسلام الحنيف
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="glass-card p-8 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                rotateY: 10,
                boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Service Icon */}
              <motion.div
                className="text-6xl mb-6 text-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {service.icon}
              </motion.div>

              {/* Service Title */}
              <EditableText
                value={service.title}
                onChange={(value) => updateService(index, 'title', value)}
                className="text-2xl font-bold text-white mb-4 text-center"
                tag="h3"
                adminMode={adminMode}
              />

              {/* Service Description */}
              <EditableText
                value={service.description}
                onChange={(value) => updateService(index, 'description', value)}
                className="text-white/80 leading-relaxed mb-6 text-center"
                tag="p"
                multiline
                adminMode={adminMode}
              />

              {/* Features List */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-[var(--color-primary)] mb-3">
                  المميزات:
                </h4>
                {service.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    className="flex items-center space-x-3 space-x-reverse"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full flex-shrink-0" />
                    <div className="flex-1 flex items-center gap-2">
                      <EditableText
                        value={feature}
                        onChange={(value) => updateFeature(index, featureIndex, value)}
                        className="text-white/90 text-sm"
                        tag="span"
                        adminMode={adminMode}
                      />
                      {adminMode && service.features.length > 1 && (
                        <button
                          onClick={() => removeFeature(index, featureIndex)}
                          className="text-red-400 hover:text-red-300 text-xs ml-2"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}

                {adminMode && (
                  <button
                    onClick={() => addFeature(index)}
                    className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] text-sm mt-2"
                  >
                    + إضافة ميزة
                  </button>
                )}
              </div>

              {/* CTA Button */}
              <motion.button
                className="w-full mt-8 gradient-bg text-white py-3 rounded-xl font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                تواصل معنا
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Add Service Button (Admin Mode) */}
        {adminMode && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <button
              onClick={() => {
                const newService = {
                  id: Date.now(),
                  title: 'خدمة جديدة',
                  description: 'وصف الخدمة الجديدة',
                  features: ['ميزة 1', 'ميزة 2'],
                  icon: '📚',
                  color: 'from-blue-600 to-purple-600',
                };
                onUpdate([...services, newService]);
              }}
              className="bg-[var(--color-primary)] text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-[var(--color-secondary)] transition-colors"
            >
              + إضافة خدمة جديدة
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
