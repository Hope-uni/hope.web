import { SinglePictogram, TEAPhase } from '@/models/schema';
import { create } from 'zustand';

interface FormCreateUserState {
  phaseList: TEAPhase[];
  pictogramList: SinglePictogram[];
  solutionSentenceList: SinglePictogram[];
  solutionSentenceText: string;
  setPhaseList: (phases: TEAPhase[]) => void;
  setPictogramList: (pictograms: SinglePictogram[]) => void;
  setSolutionSentenceList: (pictograms: SinglePictogram[]) => void;
  setSolutionSentenceText: (solution: string) => void;
}

export const useFormActivityStore = create<FormCreateUserState>()((set) => ({
  phaseList: [],
  pictogramList: [],
  solutionSentenceList: [],
  solutionSentenceText: '',
  setPhaseList: (phases: TEAPhase[]) => set({ phaseList: phases }),
  setPictogramList: (pictograms: SinglePictogram[]) =>
    set({ pictogramList: pictograms }),
  setSolutionSentenceList: (pictograms: SinglePictogram[]) =>
    set({ solutionSentenceList: pictograms }),
  setSolutionSentenceText: (solution: string) =>
    set({ solutionSentenceText: solution }),
}));
