import {
  CategoryPictogram,
  FiltersPictogram,
  SinglePictogram,
  TEAPhase,
} from '@/models/schema';
import { create } from 'zustand';

interface FormCreateUserState {
  phaseList: TEAPhase[];
  pictogramList: SinglePictogram[];
  categoriesPictogramList: CategoryPictogram[];
  solutionSentenceList: SinglePictogram[];
  solutionSentenceText: string;
  loadingDetail: boolean;
  filters?: FiltersPictogram;
  isRefetchingPictograms: boolean;
  setPhaseList: (phases: TEAPhase[]) => void;
  setPictogramList: (pictograms: SinglePictogram[]) => void;
  setCategoryPictogramList: (categories: CategoryPictogram[]) => void;
  setSolutionSentenceList: (pictograms: SinglePictogram[]) => void;
  setSolutionSentenceText: (solution: string) => void;
  seLoadingDetail: (loading: boolean) => void;
  setFiltersPictogram: (filters: FiltersPictogram | undefined) => void;
  setIsRefetchingPictograms: (status: boolean) => void;
}

export const useFormActivityStore = create<FormCreateUserState>()((set) => ({
  phaseList: [],
  pictogramList: [],
  categoriesPictogramList: [],
  solutionSentenceList: [],
  solutionSentenceText: '',
  loadingDetail: false,
  filters: undefined,
  isRefetchingPictograms: false,
  setPhaseList: (phases: TEAPhase[]) => set({ phaseList: phases }),
  setPictogramList: (pictograms: SinglePictogram[]) =>
    set({ pictogramList: pictograms }),
  setCategoryPictogramList: (categories: CategoryPictogram[]) =>
    set({ categoriesPictogramList: categories }),
  setSolutionSentenceList: (pictograms: SinglePictogram[]) =>
    set({ solutionSentenceList: pictograms }),
  setSolutionSentenceText: (solution: string) =>
    set({ solutionSentenceText: solution }),
  seLoadingDetail: (loading: boolean) => set({ loadingDetail: loading }),
  setFiltersPictogram: (filters: FiltersPictogram | undefined) =>
    set({ filters }),
  setIsRefetchingPictograms: (status: boolean) =>
    set({ isRefetchingPictograms: status }),
}));
