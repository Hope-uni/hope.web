import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface GlobalNotification {
  message: string;
  description: string;
}

interface GlobalSettingsState {
  notification: GlobalNotification | null;
  errors: {
    TimeOut: {
      retryCount: number;
    };
  };
  isDemo: boolean;
  setIsDemo: (isDemo: boolean) => void;
  reset: () => void;
}

export const useGlobalSettings = create<GlobalSettingsState>()(
  persist(
    (set) => ({
      notification: null,
      errors: {
        TimeOut: {
          retryCount: 0,
        },
      },
      isDemo: false,
      setIsDemo: (isDemo: boolean) => set({ isDemo }),
      reset: () =>
        set({
          notification: null,
          errors: { TimeOut: { retryCount: 0 } },
          isDemo: false,
        }),
    }),
    {
      name: 'global-settings',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        isDemo: state.isDemo,
      }),
    },
  ),
);
