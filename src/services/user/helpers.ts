import {
  CreatePatientPayloadSchema,
  CreateTherapistTutorPayloadSchema,
  CreateUserPayloadSchema,
  FormCreateUser,
  FormCreateUserError,
} from '@/models/schema';
import { API_SINGLE_RESPONSE, I_VALIDATION_ERRORS } from '@/models/types';
import {
  CreatePatientService,
  CreateTherapistService,
  CreateTutorService,
  CreateUserService,
} from '@/services/user/user.service';
import { CustomError } from '@/utils/axios';

export type CurrentRoleType = keyof typeof CreateUserServicesByRole;

export interface ErrorAntd {
  name: string;
  errors: string[];
}

const CreateUserServicesByRole = {
  Admin: async (values: FormCreateUser) => {
    const userAdminPayload = CreateUserPayloadSchema.parse({
      username: values.username,
      email: values.email,
    });

    return await CreateUserService(userAdminPayload);
  },
  Paciente: async (values: FormCreateUser) => {
    const userPatientPayload = CreatePatientPayloadSchema.parse(values);

    return await CreatePatientService(userPatientPayload);
  },
  Tutor: async (values: FormCreateUser) => {
    const userTutorPayload = CreateTherapistTutorPayloadSchema.parse(values);

    return await CreateTutorService(userTutorPayload);
  },
  Terapeuta: async (values: FormCreateUser) => {
    const userTherapistPayload =
      CreateTherapistTutorPayloadSchema.parse(values);

    return await CreateTherapistService(userTherapistPayload);
  },
};

export const ParseToErrorAntd = (validationErrors: I_VALIDATION_ERRORS) => {
  return Object.entries(validationErrors).map(([key, message]) => ({
    name: key,
    errors: [message],
  }));
};

export const CreateUserHelper = async (
  values: FormCreateUser,
  currentRole: CurrentRoleType,
) => {
  try {
    const res = await CreateUserServicesByRole[currentRole](values);

    return {
      error: res.error,
      statusCode: res.statusCode,
      message: res.message,
      validationErrors: res?.validationErrors as FormCreateUserError,
    };
  } catch (error) {
    let message = (error as Error)?.message;
    let description = '';

    if ((error as CustomError)?.statusCode === 500) {
      message = `500 (Internal Server Error)`;
      description = message;
    }

    return {
      error: true,
      message: message || 'Unknown error',
      description,
    };
  }
};
