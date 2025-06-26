import { getContent, getSettings } from '@/lib/content-manager';
import ServicesPage from '@/components/pages/ServicesPage';

export default async function Page() {
  const content = getContent();
  const settings = getSettings();

  return <ServicesPage content={content} settings={settings} />;
}
