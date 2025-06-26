import fs from 'fs';
import path from 'path';
import { SiteContent, SiteSettings } from './content-manager';

const dataDir = path.join(process.cwd(), 'data');

// Server-side functions for reading/writing data
export function getContent(): SiteContent {
  try {
    const contentPath = path.join(dataDir, 'content.json');
    const contentData = fs.readFileSync(contentPath, 'utf8');
    return JSON.parse(contentData);
  } catch (error) {
    console.error('Error reading content:', error);
    // Return default content if file doesn't exist
    return getDefaultContent();
  }
}

export function getSettings(): SiteSettings {
  try {
    const settingsPath = path.join(dataDir, 'settings.json');
    const settingsData = fs.readFileSync(settingsPath, 'utf8');
    return JSON.parse(settingsData);
  } catch (error) {
    console.error('Error reading settings:', error);
    // Return default settings if file doesn't exist
    return getDefaultSettings();
  }
}

export function updateContent(newContent: Partial<SiteContent>): void {
  try {
    const currentContent = getContent();
    const updatedContent = { ...currentContent, ...newContent };

    const contentPath = path.join(dataDir, 'content.json');
    fs.writeFileSync(contentPath, JSON.stringify(updatedContent, null, 2), 'utf8');
  } catch (error) {
    console.error('Error updating content:', error);
    throw new Error('Failed to update content');
  }
}

export function updateSettings(newSettings: Partial<SiteSettings>): void {
  try {
    const currentSettings = getSettings();
    const updatedSettings = { ...currentSettings, ...newSettings };

    const settingsPath = path.join(dataDir, 'settings.json');
    fs.writeFileSync(settingsPath, JSON.stringify(updatedSettings, null, 2), 'utf8');
  } catch (error) {
    console.error('Error updating settings:', error);
    throw new Error('Failed to update settings');
  }
}

function getDefaultContent(): SiteContent {
  return {
    site: {
      title: 'الشيخ عاصم فايد',
      subtitle: 'معلم ومحفظ القرآن الكريم - خريج الأزهر الشريف',
      description: 'رحلة في تعليم وتحفيظ القرآن الكريم - دروس قرآنية أصيلة من خريج الأزهر الشريف',
    },
    hero: {
      title: 'الشيخ عاصم فايد',
      subtitle: 'معلم ومحفظ القرآن الكريم - خريج الأزهر الشريف',
      description: 'رحلة في تعليم وتحفيظ القرآن الكريم - دروس قرآنية أصيلة من خريج الأزهر الشريف',
      ctaText: 'تواصل معنا',
      backgroundImage: '/images/hero-bg.jpg',
    },
    about: {
      title: 'الشيخ عاصم فايد',
      subtitle: 'معلم ومحفظ القرآن الكريم',
      description:
        'درست بالأزهر الشريف منذ نعومة أظافرى وحفظت القرآن الكريم فى سن صغيرة والتحقت بكلية اللغة العربية بجامعة الأزهر فرع المنصورة وحصلت على درجة الليسانس ثم حصلت على دبلوم العلوم الشرعية بأكاديمية زاد بالمملكة العربية السعودية وشرفنى الله بإمامة العديد من المساجد وأعمل كمعلم ومحفظ للقرآن الكريم',
      achievements: [
        {
          id: 1,
          title: 'التعليم بالأزهر الشريف',
          description: 'درست بالأزهر الشريف منذ نعومة أظاف��ى وحفظت القرآن الكريم فى سن صغيرة',
          icon: '🕌',
        },
        {
          id: 2,
          title: 'ليسانس اللغة العربية',
          description: 'حاصل على درجة الليسانس من كلية اللغة العربية بجامعة الأزهر فرع المنصورة',
          icon: '🎓',
        },
        {
          id: 3,
          title: 'دبلوم العلوم الشرعية',
          description: 'حصلت على دبلوم العلوم الشرعية من أكاديمية زاد بالمملكة العربية السعودية',
          icon: '📜',
        },
        {
          id: 4,
          title: 'إمامة المساجد',
          description: 'شرفنى الله بإمامة العديد من المساجد والقيام بالواجبات الدينية',
          icon: '🕋',
        },
        {
          id: 5,
          title: 'تعليم وتحفيظ القرآن',
          description: 'أعمل كمعلم ومحفظ للقرآن الكريم لنشر تعاليم الإسلام',
          icon: '📖',
        },
      ],
      stats: [
        { value: '25+', label: 'سنة من التدريس', icon: '📚' },
        { value: '5000+', label: 'طالب تخرج', icon: '👥' },
        { value: '50+', label: 'شهادة وإجازة', icon: '🏆' },
        { value: '100+', label: 'محاضرة', icon: '⭐' },
      ],
    },
    services: [
      {
        id: 1,
        title: 'تحفيظ القرآن الكريم',
        description: 'برامج تحفيظ متدرجة للأطفال والكبار مع المتابعة والمراجعة المستمرة',
        features: ['تحفيظ متدرج', 'مراجعة مستمرة', 'متابعة فردية', 'شهادات معتمدة'],
        icon: '📖',
        color: 'from-emerald-600 to-teal-600',
      },
      {
        id: 2,
        title: 'تفسير القرآن الكريم',
        description: 'دروس تفسير معاصرة تربط بين الآيات والحياة العملية',
        features: ['تفسير مبسط', 'أمثلة معاصرة', 'ربط بالواقع', 'دروس تفاعلية'],
        icon: '💡',
        color: 'from-blue-600 to-indigo-600',
      },
      {
        id: 3,
        title: 'دروس العلوم الشرعية',
        description: 'تعليم أساسيات العلوم الشرعية والفقه الإسلامي',
        features: ['فقه مبسط', 'أحكام عملية', 'أدلة شرعية', 'فتاوى معاصرة'],
        icon: '🕌',
        color: 'from-purple-600 to-pink-600',
      },
    ],
    wisdomQuotes: [
      {
        id: 1,
        arabic: '﴿ وَهُوَ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ بِالْحَقِّ ﴾',
        translation: 'وهو الذي خلق السماوات والأرض بالحق',
        source: 'سورة الأنعام - الآية 73',
      },
      {
        id: 2,
        arabic: '﴿ وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ ﴾',
        translation: 'وجعلنا من الماء كل شيء حي',
        source: 'سورة الأنبياء - الآية 30',
      },
      {
        id: 3,
        arabic: '﴿ وَالسَّمَاءَ بَنَيْنَاهَا بِأَيْدٍ وَإِنَّا لَمُوسِعُونَ ﴾',
        translation: 'والسماء بنيناها بأيد وإنا لموسعون',
        source: 'سورة الذاريات - الآية 47',
      },
    ],
    contact: {
      phone: '+20 100 000 0000',
      email: 'info@sheikhassem.com',
      address: 'القاهرة، مصر',
      whatsapp: 'https://wa.me/201000000000',
      socialMedia: {
        youtube: 'https://youtube.com/@sheikhassem',
        facebook: 'https://facebook.com/sheikhassem',
        telegram: 'https://t.me/sheikhassem',
      },
    },
    navigation: [
      { name: 'الرئيسية', path: '/', icon: 'BookOpen' },
      { name: 'عن الشيخ', path: '/about', icon: 'User' },
      { name: 'الخدمات', path: '/services', icon: 'Settings' },
      { name: 'تواصل معنا', path: '/contact', icon: 'Phone' },
    ],
  };
}

function getDefaultSettings(): SiteSettings {
  return {
    theme: {
      colors: {
        primary: '#fbbf24',
        secondary: '#059669',
        accent: '#1e3a8a',
        background: '#0f172a',
        text: '#ffffff',
        muted: '#64748b',
      },
      fonts: {
        arabic: 'Cairo',
        decorative: 'Amiri',
        body: 'Cairo',
      },
      gradients: {
        primary: 'from-gold-400 via-emerald-500 to-blue-500',
        hero: 'from-gray-900 via-blue-900 to-purple-900',
        card: 'from-white/10 to-white/5',
      },
    },
    layout: {
      direction: 'rtl',
      headerStyle: 'centered',
      footerStyle: 'detailed',
      showScrollIndicator: true,
      showFloatingElements: true,
      enableAnimations: true,
      animationSpeed: 'normal',
    },
    design: {
      backgroundType: 'cosmic',
      enableParticles: true,
      enableFloatingElements: true,
      borderRadius: 'rounded-3xl',
      spacing: 'spacious',
    },
    seo: {
      metaTitle: 'الشيخ عاصم فايد - معلم ومحفظ القرآن الكريم - خريج الأزهر الشريف',
      metaDescription:
        'تعلم وحفظ القرآن الكريم مع الشيخ عاصم فايد، خريج الأزهر الشريف وحاصل على دبلوم العلوم الشرعية',
      keywords: [
        'القرآن الكريم',
        'تحفيظ القرآن',
        'التفسير',
        'الشيخ عاصم فايد',
        'الأزهر الشريف',
        'العلوم الشرعية',
      ],
      ogImage: '/images/og-image.jpg',
    },
    features: {
      adminMode: false,
      liveEdit: false,
      darkMode: false,
      analytics: false,
    },
  };
}
