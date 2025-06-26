'use client';

import { SiteContent, SiteSettings } from '@/lib/content-manager';
import Navbar from '@/components/layout/Navbar';
import Services from '@/components/sections/Services';
import Footer from '@/components/layout/Footer';
import BackgroundElements from '@/components/ui/BackgroundElements';

interface ServicesPageProps {
  content: SiteContent;
  settings: SiteSettings;
}

export default function ServicesPage({ content, settings }: ServicesPageProps) {
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
        <Services services={content.services} onUpdate={() => {}} adminMode={false} />
      </main>

      <Footer contact={content.contact} siteTitle={content.site.title} />
    </div>
  );
}
