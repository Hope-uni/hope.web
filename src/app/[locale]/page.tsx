import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Index');
  return (
    <main>
      <h1>Under construction {t('title')}</h1>
      <footer>
        <p>&copy; hope 2024</p>
      </footer>
    </main>
  );
}
