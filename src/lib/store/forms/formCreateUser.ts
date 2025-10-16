import {
  FormCreateUser,
  ListRoleResponse,
  SingleTutorTherapist,
  Role,
  TEAGrade,
  TEAPhase,
} from '@/models/schema';
import { ErrorAntd } from '@/services/user/helpers';
import { create } from 'zustand';

interface ErrorsForm {
  general: ErrorAntd[] | undefined;
  specific: ErrorAntd[] | undefined;
  user: ErrorAntd[] | undefined;
}

interface FormCreateUserState {
  isEdit: boolean;
  loadingForm: boolean;
  hasUnsavedChanges: boolean;
  initCurrentRole: number;
  currentRoleSelected: ListRoleResponse | Role;
  isAdminRoleSelected: boolean;
  roleList: ListRoleResponse[];
  phaseList: TEAPhase[];
  degreeList: TEAGrade[];
  tutorList: SingleTutorTherapist[];
  fields: FormCreateUser;
  errors: ErrorsForm | undefined;
  messageErrorForm?: string;
  messageErrorDetail?: string;
  setIsEdit: (value: boolean) => void;
  setLoadingForm: (loading: boolean) => void;
  setHasUnsavedChanges: (value: boolean) => void;
  setRoleList: (roles: ListRoleResponse[]) => void;
  setPhaseList: (roles: TEAPhase[]) => void;
  setDegreeList: (roles: TEAGrade[]) => void;
  setTutorList: (roles: SingleTutorTherapist[]) => void;
  setInitCurrentRole: (id: number) => void;
  setCurrentRoleSelected: (role: ListRoleResponse | Role) => void;
  setIsAdminRoleSelected: (value: boolean) => void;
  setFields: (fields: FormCreateUser) => void;
  setErrors: (fields: ErrorsForm | undefined) => void;
  setMessageErrorForm: (message?: string) => void;
  setMessageErrorDetail: (message?: string) => void;
}

export const initStateFormCreateUser = {
  isEdit: false,
  hasUnsavedChanges: false,
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
  messageErrorForm: '',
  messageErrorDetail: '',
};

export const useFormCreateUserStore = create<FormCreateUserState>()((set) => ({
  ...initStateFormCreateUser,
  setIsEdit: (value: boolean) => set({ isEdit: value }),
  setLoadingForm: (loading: boolean) => set({ loadingForm: loading }),
  setHasUnsavedChanges: (value: boolean) => set({ hasUnsavedChanges: value }),
  setRoleList: (roles) => set({ roleList: roles }),
  setPhaseList: (phases: TEAPhase[]) => set({ phaseList: phases }),
  setDegreeList: (degrees: TEAGrade[]) => set({ degreeList: degrees }),
  setTutorList: (tutors: SingleTutorTherapist[]) => set({ tutorList: tutors }),
  setInitCurrentRole: (id: number) => set({ initCurrentRole: id }),
  setCurrentRoleSelected: (role) => set({ currentRoleSelected: role }),
  setIsAdminRoleSelected: (value) => set({ isAdminRoleSelected: value }),
  setFields: (fields: FormCreateUser) => set({ fields: fields }),
  setErrors: (errors: ErrorsForm | undefined) => set({ errors: errors }),
  setMessageErrorForm: (message?: string) => set({ messageErrorForm: message }),
  setMessageErrorDetail: (message?: string) =>
    set({ messageErrorDetail: message }),
}));
