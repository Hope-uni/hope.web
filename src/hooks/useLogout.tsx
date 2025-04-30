import { signOut } from 'next-auth/react';
import { useOverlayStore } from '@/lib/store';
import { useTranslation } from 'react-i18next';

export default function useLogout() {
  const { t } = useTranslation();
  const { setOverlayBlocking, setMessageOverlay } = useOverlayStore();

  const logout = async () => {
    setMessageOverlay(t('Auth.form.logout_overlay_text'));
    setOverlayBlocking(true);
    await signOut();
  };

  return {
    logout,
  };
}
