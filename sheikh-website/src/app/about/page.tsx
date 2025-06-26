import { getContent, getSettings } from '@/lib/data';
import AboutPage from '@/components/pages/AboutPage';

export default async function Page() {
  const content = getContent();
  const settings = getSettings();

  return <AboutPage content={content} settings={settings} />;
}
