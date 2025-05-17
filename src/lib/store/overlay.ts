import i18next from 'i18next';
import { create } from 'zustand';

interface OverlayState {
  overlay: boolean;
  messageOverlay: string | undefined;
  overlayBlocking: boolean;
  overlaySession: boolean;
  setLoading: (status: boolean) => void;
  setOverlayBlocking: (status: boolean) => void;
  setOverlaySession: (status: boolean) => void;
  setMessageOverlay: (message: string | undefined) => void;
}

export const useOverlayStore = create<OverlayState>()((set) => ({
  overlay: false,
  overlayBlocking: false,
  messageOverlay: undefined,
  overlaySession: true,
  setLoading: (status) => set({ overlay: status }),
  setOverlayBlocking: (status) => set({ overlayBlocking: status }),
  setOverlaySession: (status) => set({ overlaySession: status }),
  setMessageOverlay: (message) => set({ messageOverlay: message }),
}));

export const setOverlayBlockingEdge = (show: boolean) => {
  useOverlayStore.getState().setOverlayBlocking(show);
  useOverlayStore
    .getState()
    .setMessageOverlay(
      show ? i18next.t('Auth.form.logout_overlay_text') : undefined,
    );
};
