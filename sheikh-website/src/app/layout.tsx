import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: 'الشيخ عاصم فايد - معلم ومحفظ القرآن الكريم',
  description:
    'تعلم وحفظ القرآن الكريم مع الشيخ عاصم فايد، خريج الأزهر الشريف وحاصل على دبلوم العلوم الشرعية',
  keywords: ['القرآن الكريم', 'تحفيظ القرآن', 'التفسير', 'الشيخ عاصم فايد', 'الأزهر الشريف'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-cairo antialiased`}>{children}</body>
    </html>
  );
}
