import {
  FormCreateUser,
  ListRoleResponse,
  ListTutorResponse,
  TEAGrade,
  TEAPhase,
} from '@/models/schema';
import { ErrorAntd } from '@/services/user/helpers';
import { create } from 'zustand';

interface ErrorsForm {
  user: ErrorAntd[] | undefined;
  person: ErrorAntd[] | undefined;
}

interface FormCreateUserState {
  loadingForm: boolean;
  initCurrentRole: number;
  currentRoleSelected: ListRoleResponse;
  isAdminRoleSelected: boolean;
  roleList: ListRoleResponse[];
  phaseList: TEAPhase[];
  degreeList: TEAGrade[];
  tutorList: ListTutorResponse[];
  fields: FormCreateUser;
  errors: ErrorsForm | undefined;
  setLoadingForm: (loading: boolean) => void;
  setRoleList: (roles: ListRoleResponse[]) => void;
  setPhaseList: (roles: TEAPhase[]) => void;
  setDegreeList: (roles: TEAGrade[]) => void;
  setTutorList: (roles: ListTutorResponse[]) => void;
  setInitCurrentRole: (id: number) => void;
  setCurrentRoleSelected: (role: ListRoleResponse) => void;
  setIsAdminRoleSelected: (value: boolean) => void;
  setFields: (fields: FormCreateUser) => void;
  setErrors: (fields: ErrorsForm | undefined) => void;
}

export const useFormCreateUserStore = create<FormCreateUserState>()((set) => ({
  initCurrentRole: 4,
  currentRoleSelected: {} as ListRoleResponse,
  isAdminRoleSelected: false,
  loadingForm: false,
  roleList: [],
  phaseList: [],
  degreeList: [],
  tutorList: [],
  fields: {} as FormCreateUser,
  errors: {} as ErrorsForm,
  setLoadingForm: (loading: boolean) => set({ loadingForm: loading }),
  setRoleList: (roles) => set({ roleList: roles }),
  setPhaseList: (phases: TEAPhase[]) => set({ phaseList: phases }),
  setDegreeList: (degrees: TEAGrade[]) => set({ degreeList: degrees }),
  setTutorList: (tutors: ListTutorResponse[]) => set({ tutorList: tutors }),
  setInitCurrentRole: (id: number) => set({ initCurrentRole: id }),
  setCurrentRoleSelected: (role) => set({ currentRoleSelected: role }),
  setIsAdminRoleSelected: (value) => set({ isAdminRoleSelected: value }),
  setFields: (fields: FormCreateUser) => set({ fields: fields }),
  setErrors: (errors: ErrorsForm | undefined) => set({ errors: errors }),
}));
