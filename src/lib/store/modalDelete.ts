import { create } from 'zustand';

interface OverlayState {
  open: boolean;
  loading: boolean;
  setOpen: (value: boolean) => void;
  setLoading: (value: boolean) => void;
}

export const useModalDelete = create<OverlayState>()((set) => ({
  open: false,
  loading: false,
  setOpen: (value: boolean) => set({ open: value }),
  setLoading: (value: boolean) => set({ loading: value }),
}));
