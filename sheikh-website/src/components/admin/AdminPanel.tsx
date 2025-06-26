'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Eye, EyeOff, Save, Download, Upload, RefreshCw } from 'lucide-react';
import ColorPicker from './ColorPicker';
import { SiteContent, SiteSettings } from '@/lib/content-manager';

interface AdminPanelProps {
  content: SiteContent;
  settings: SiteSettings;
  onContentUpdate: (updates: Partial<SiteContent>) => void;
  onSettingsUpdate: (updates: Partial<SiteSettings>) => void;
}

export default function AdminPanel({
  content,
  settings,
  onContentUpdate,
  onSettingsUpdate,
}: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'theme' | 'layout'>('content');
  const [isAdminMode, setIsAdminMode] = useState(settings.features.adminMode);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsAdminMode(settings.features.adminMode);
  }, [settings.features.adminMode]);

  const toggleAdminMode = () => {
    const newAdminMode = !isAdminMode;
    setIsAdminMode(newAdminMode);
    onSettingsUpdate({
      features: {
        ...settings.features,
        adminMode: newAdminMode,
        liveEdit: newAdminMode,
      },
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // إشارة بصرية للحفظ
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('تم الحفظ بنجاح');
    } catch (error) {
      console.error('خطأ في الحفظ:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const exportData = () => {
    const data = { content, settings };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website-backup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.content) onContentUpdate(data.content);
        if (data.settings) onSettingsUpdate(data.settings);
      } catch (error) {
        console.error('خطأ في تحميل الملف:', error);
      }
    };
    reader.readAsText(file);
  };

  const tabs = [
    { id: 'content', label: 'المحتوى', icon: '📝' },
    { id: 'theme', label: 'الألوان', icon: '🎨' },
    { id: 'layout', label: 'التخطيط', icon: '📐' },
  ];

  return (
    <>
      {/* Admin Toggle Button */}
      <motion.button
        onClick={toggleAdminMode}
        className={`fixed top-4 left-4 z-50 p-3 rounded-full shadow-lg ${
          isAdminMode ? 'bg-gold-400 text-gray-900' : 'bg-gray-800 text-white'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        {isAdminMode ? <EyeOff size={20} /> : <Eye size={20} />}
      </motion.button>

      {/* Admin Panel Button */}
      <AnimatePresence>
        {isAdminMode && (
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="fixed bottom-6 left-6 z-50 bg-gold-400 text-gray-900 p-4 rounded-full shadow-xl"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <Settings size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Admin Panel */}
      <AnimatePresence>
        {isOpen && isAdminMode && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Panel */}
            <motion.div
              className="relative bg-gray-900 border border-white/20 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white">لوحة التحكم</h2>
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSaving ? (
                      <RefreshCw size={16} className="animate-spin" />
                    ) : (
                      <Save size={16} />
                    )}
                    {isSaving ? 'جاري الحفظ...' : 'حفظ'}
                  </motion.button>

                  <motion.button
                    onClick={exportData}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download size={16} />
                    تصدير
                  </motion.button>

                  <label className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-purple-700 transition-colors">
                    <Upload size={16} />
                    استيراد
                    <input type="file" accept=".json" onChange={importData} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/10">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-3 transition-colors ${
                      activeTab === tab.id
                        ? 'text-gold-400 border-b-2 border-gold-400'
                        : 'text-white/70 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </motion.button>
                ))}
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-96">
                {activeTab === 'content' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white mb-4">تعديل المحتوى</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-white/70 mb-2">عنوان الموقع</label>
                        <input
                          type="text"
                          value={content.site.title}
                          onChange={(e) =>
                            onContentUpdate({
                              site: { ...content.site, title: e.target.value },
                            })
                          }
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-gold-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-white/70 mb-2">العنوان الفرعي</label>
                        <input
                          type="text"
                          value={content.site.subtitle}
                          onChange={(e) =>
                            onContentUpdate({
                              site: { ...content.site, subtitle: e.target.value },
                            })
                          }
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-gold-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-white/70 mb-2">وصف الموقع</label>
                      <textarea
                        value={content.site.description}
                        onChange={(e) =>
                          onContentUpdate({
                            site: { ...content.site, description: e.target.value },
                          })
                        }
                        rows={3}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-gold-400 resize-none"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'theme' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white mb-4">ألوان الموقع</h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <ColorPicker
                        label="اللون الأساسي"
                        value={settings.theme.colors.primary}
                        onChange={(color) =>
                          onSettingsUpdate({
                            theme: {
                              ...settings.theme,
                              colors: { ...settings.theme.colors, primary: color },
                            },
                          })
                        }
                        adminMode={true}
                      />

                      <ColorPicker
                        label="اللون الثانوي"
                        value={settings.theme.colors.secondary}
                        onChange={(color) =>
                          onSettingsUpdate({
                            theme: {
                              ...settings.theme,
                              colors: { ...settings.theme.colors, secondary: color },
                            },
                          })
                        }
                        adminMode={true}
                      />

                      <ColorPicker
                        label="لون ا��تمييز"
                        value={settings.theme.colors.accent}
                        onChange={(color) =>
                          onSettingsUpdate({
                            theme: {
                              ...settings.theme,
                              colors: { ...settings.theme.colors, accent: color },
                            },
                          })
                        }
                        adminMode={true}
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'layout' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white mb-4">إعدادات التخطيط</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white">إظهار العناصر المتحركة</span>
                        <input
                          type="checkbox"
                          checked={settings.layout.showFloatingElements}
                          onChange={(e) =>
                            onSettingsUpdate({
                              layout: {
                                ...settings.layout,
                                showFloatingElements: e.target.checked,
                              },
                            })
                          }
                          className="w-5 h-5"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-white">تفعيل الحركات</span>
                        <input
                          type="checkbox"
                          checked={settings.layout.enableAnimations}
                          onChange={(e) =>
                            onSettingsUpdate({
                              layout: {
                                ...settings.layout,
                                enableAnimations: e.target.checked,
                              },
                            })
                          }
                          className="w-5 h-5"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
