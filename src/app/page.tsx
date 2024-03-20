import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function RootLayout() {
  const cookieStore = cookies();
  const locale = cookieStore.get('NEXT_LOCALE');
  redirect(`/${locale?.value}`);
}
