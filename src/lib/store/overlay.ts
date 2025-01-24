import { create } from 'zustand';

interface OverlayState {
  overlay: boolean;
  messageOverlay: string | undefined;
  overlayBlocking: boolean;
  setLoading: (status: boolean) => void;
  setOverlayBlocking: (status: boolean) => void;
  setMessageOverlay: (message: string | undefined) => void;
}

export const useOverlayStore = create<OverlayState>()((set) => ({
  overlay: false,
  overlayBlocking: false,
  messageOverlay: undefined,
  setLoading: (status) => set({ overlay: status }),
  setOverlayBlocking: (status) => set({ overlayBlocking: status }),
  setMessageOverlay: (message) => set({ messageOverlay: message }),
}));
