'use client';

import { SiteContent, SiteSettings } from '@/lib/content-manager';
import Navbar from '@/components/layout/Navbar';
import About from '@/components/sections/About';
import Footer from '@/components/layout/Footer';
import BackgroundElements from '@/components/ui/BackgroundElements';

interface AboutPageProps {
  content: SiteContent;
  settings: SiteSettings;
}

export default function AboutPage({ content, settings }: AboutPageProps) {
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

      <Navbar navigation={content.navigation} siteTitle={content.site.title} adminMode={false} />

      <main className="pt-20">
        <About content={content.about} onUpdate={() => {}} adminMode={false} />
      </main>

      <Footer contact={content.contact} siteTitle={content.site.title} />
    </div>
  );
}
