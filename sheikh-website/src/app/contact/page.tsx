import { getContent, getSettings } from '@/lib/data';
import ContactPage from '@/components/pages/ContactPage';

export default async function Page() {
  const content = getContent();
  const settings = getSettings();

  return <ContactPage content={content} settings={settings} />;
}
