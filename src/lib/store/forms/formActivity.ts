import { SinglePictogram, TEAPhase } from '@/models/schema';
import { create } from 'zustand';

interface FormCreateUserState {
  phaseList: TEAPhase[];
  pictogramList: SinglePictogram[];
  solutionSentenceList: SinglePictogram[];
  solutionSentenceText: string;
  loadingDetail: boolean;
  setPhaseList: (phases: TEAPhase[]) => void;
  setPictogramList: (pictograms: SinglePictogram[]) => void;
  setSolutionSentenceList: (pictograms: SinglePictogram[]) => void;
  setSolutionSentenceText: (solution: string) => void;
  seLoadingDetail: (loading: boolean) => void;
}

export const useFormActivityStore = create<FormCreateUserState>()((set) => ({
  phaseList: [],
  pictogramList: [],
  solutionSentenceList: [],
  solutionSentenceText: '',
  loadingDetail: false,
  setPhaseList: (phases: TEAPhase[]) => set({ phaseList: phases }),
  setPictogramList: (pictograms: SinglePictogram[]) =>
    set({ pictogramList: pictograms }),
  setSolutionSentenceList: (pictograms: SinglePictogram[]) =>
    set({ solutionSentenceList: pictograms }),
  setSolutionSentenceText: (solution: string) =>
    set({ solutionSentenceText: solution }),
  seLoadingDetail: (loading: boolean) => set({ loadingDetail: loading }),
}));
