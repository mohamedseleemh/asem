'use client';

import { useState } from 'react';
import { SiteContent, SiteSettings, useContent } from '@/lib/content-manager';
import Navbar from './layout/Navbar';
import Hero from './sections/Hero';
import WisdomQuotes from './sections/WisdomQuotes';
import About from './sections/About';
import Services from './sections/Services';
import Contact from './sections/Contact';
import Footer from './layout/Footer';
import AdminPanel from './admin/AdminPanel';
import BackgroundElements from './ui/BackgroundElements';

interface HomePageProps {
  initialContent: SiteContent;
  initialSettings: SiteSettings;
}

export default function HomePage({ initialContent, initialSettings }: HomePageProps) {
  const [content, setContent] = useState(initialContent);
  const [settings, setSettings] = useState(initialSettings);
  const { updateContent, updateSettings } = useContent();

  const handleContentUpdate = async (updates: Partial<SiteContent>) => {
    const newContent = { ...content, ...updates };
    setContent(newContent);
    try {
      await updateContent(updates);
    } catch (error) {
      console.error('Failed to update content:', error);
      // Revert on error
      setContent(content);
    }
  };

  const handleSettingsUpdate = async (updates: Partial<SiteSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    try {
      await updateSettings(updates);
    } catch (error) {
      console.error('Failed to update settings:', error);
      // Revert on error
      setSettings(settings);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden"
      style={
        {
          '--color-primary': settings.theme.colors.primary,
          '--color-secondary': settings.theme.colors.secondary,
          '--color-accent': settings.theme.colors.accent,
        } as React.CSSProperties
      }
    >
      <BackgroundElements settings={settings} />

      <Navbar
        navigation={content.navigation}
        siteTitle={content.site.title}
        adminMode={settings.features.adminMode}
      />

      <main>
        <Hero
          content={content.hero}
          onUpdate={(heroUpdates) =>
            handleContentUpdate({ hero: { ...content.hero, ...heroUpdates } })
          }
          adminMode={settings.features.adminMode}
        />

        <WisdomQuotes
          quotes={content.wisdomQuotes}
          onUpdate={(quotesUpdates) => handleContentUpdate({ wisdomQuotes: quotesUpdates })}
          adminMode={settings.features.adminMode}
        />

        <About
          content={content.about}
          onUpdate={(aboutUpdates) =>
            handleContentUpdate({ about: { ...content.about, ...aboutUpdates } })
          }
          adminMode={settings.features.adminMode}
        />

        <Services
          services={content.services}
          onUpdate={(servicesUpdates) => handleContentUpdate({ services: servicesUpdates })}
          adminMode={settings.features.adminMode}
        />

        <Contact
          contact={content.contact}
          onUpdate={(contactUpdates) =>
            handleContentUpdate({ contact: { ...content.contact, ...contactUpdates } })
          }
          adminMode={settings.features.adminMode}
        />
      </main>

      <Footer contact={content.contact} siteTitle={content.site.title} />

      <AdminPanel
        content={content}
        settings={settings}
        onContentUpdate={handleContentUpdate}
        onSettingsUpdate={handleSettingsUpdate}
      />
    </div>
  );
}
