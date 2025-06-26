// Types for our content structure
export interface SiteContent {
  site: {
    title: string;
    subtitle: string;
    description: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    backgroundImage: string;
  };
  about: {
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
  };
  services: Array<{
    id: number;
    title: string;
    description: string;
    features: string[];
    icon: string;
    color: string;
  }>;
  wisdomQuotes: Array<{
    id: number;
    arabic: string;
    translation: string;
    source: string;
  }>;
  contact: {
    phone: string;
    email: string;
    address: string;
    whatsapp: string;
    socialMedia: {
      youtube: string;
      facebook: string;
      telegram: string;
    };
  };
  navigation: Array<{
    name: string;
    path: string;
    icon: string;
  }>;
}

export interface SiteSettings {
  theme: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
      muted: string;
    };
    fonts: {
      arabic: string;
      decorative: string;
      body: string;
    };
    gradients: {
      primary: string;
      hero: string;
      card: string;
    };
  };
  layout: {
    direction: string;
    headerStyle: string;
    footerStyle: string;
    showScrollIndicator: boolean;
    showFloatingElements: boolean;
    enableAnimations: boolean;
    animationSpeed: string;
  };
  design: {
    backgroundType: string;
    enableParticles: boolean;
    enableFloatingElements: boolean;
    borderRadius: string;
    spacing: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage: string;
  };
  features: {
    adminMode: boolean;
    liveEdit: boolean;
    darkMode: boolean;
    analytics: boolean;
  };
}

// Client-side hooks and utilities
export function useContent() {
  return {
    updateContent: async (updates: Partial<SiteContent>) => {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update content');
      }

      return response.json();
    },

    updateSettings: async (updates: Partial<SiteSettings>) => {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update settings');
      }

      return response.json();
    },
  };
}
