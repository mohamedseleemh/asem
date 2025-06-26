import { getContent, getSettings } from '@/lib/data';
import HomePage from '@/components/HomePage';

export default async function Page() {
  const content = getContent();
  const settings = getSettings();

  return <HomePage initialContent={content} initialSettings={settings} />;
}
