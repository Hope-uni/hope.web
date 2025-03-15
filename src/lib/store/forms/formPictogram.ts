import { CategoryPictogram } from '@/models/schema';
import { create } from 'zustand';

interface FormPictogramState {
  categoryList: CategoryPictogram[];
  setCategoryList: (categories: CategoryPictogram[]) => void;
}

export const useFormPictogramStore = create<FormPictogramState>()((set) => ({
  categoryList: [],
  setCategoryList: (categories: CategoryPictogram[]) =>
    set({ categoryList: categories }),
}));
