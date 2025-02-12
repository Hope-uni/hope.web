import {
  CreatePatientPayloadSchema,
  CreateTherapistTutorPayloadSchema,
  CreateUserPayloadSchema,
  FormCreateUser,
  FormCreateUserError,
} from '@/models/schema';
import { I_VALIDATION_ERRORS } from '@/models/types';
import {
  CreatePatientService,
  CreateTherapistService,
  CreateTutorService,
  CreateUserService,
  EditPatientService,
  EditTherapistService,
  EditTutorService,
  EditUserService,
  FindPatientByIdService,
  FindTherapistByIdService,
  FindTutorByIdService,
} from '@/services/user/user.service';
import { CustomError } from '@/utils/axios';
import { valuesWithData } from '@/utils/objects';
import i18next from '@/i18n';

export type CurrentRoleType = keyof typeof CreateUserServicesByRole;
export type CurrentRoleTypeFindUser = keyof typeof FindUsersByRole;

export interface ErrorAntd {
  name: string;
  errors: string[];
}

const CreateUserServicesByRole = {
  Admin: async (values: FormCreateUser, update: boolean, id?: string) => {
    const userAdminPayload = CreateUserPayloadSchema.parse({
      username: values.username,
      email: values.email,
    });

    if (update) {
      if (id) {
        return await EditUserService(userAdminPayload, id);
      } else {
        return {
          error: true,
          message: i18next.t('Feedback.id_not_provided'),
        };
      }
    }

    return await CreateUserService(userAdminPayload);
  },
  Paciente: async (values: FormCreateUser, update: boolean, id?: string) => {
    const userPatientPayload = CreatePatientPayloadSchema.parse(values);

    if (update) {
      if (id) {
        return await EditPatientService(userPatientPayload, id);
      } else {
        return {
          error: true,
          message: i18next.t('Feedback.id_not_provided'),
        };
      }
    }

    return await CreatePatientService(userPatientPayload);
  },
  Tutor: async (values: FormCreateUser, update: boolean, id?: string) => {
    const userTutorPayload = CreateTherapistTutorPayloadSchema.parse(values);

    if (update) {
      if (id) {
        return await EditTutorService(userTutorPayload, id);
      } else {
        return {
          error: true,
          message: i18next.t('Feedback.id_not_provided'),
        };
      }
    }

    return await CreateTutorService(userTutorPayload);
  },
  Terapeuta: async (values: FormCreateUser, update: boolean, id?: string) => {
    const userTherapistPayload =
      CreateTherapistTutorPayloadSchema.parse(values);

    if (update) {
      if (id) {
        return await EditTherapistService(userTherapistPayload, id);
      } else {
        return {
          error: true,
          message: i18next.t('Feedback.id_not_provided'),
        };
      }
    }

    return await CreateTherapistService(userTherapistPayload);
  },
};

const FindUsersByRole = {
  Paciente: async (id?: string) => {
    if (id) {
      return await FindPatientByIdService(id);
    } else {
      return {
        error: true,
        message: i18next.t('Feedback.id_not_provided'),
      };
    }
  },
  Tutor: async (id?: string) => {
    if (id) {
      return await FindTutorByIdService(id);
    } else {
      return {
        error: true,
        message: i18next.t('Feedback.id_not_provided'),
      };
    }
  },
  Terapeuta: async (id?: string) => {
    if (id) {
      return await FindTherapistByIdService(id);
    } else {
      return {
        error: true,
        message: i18next.t('Feedback.id_not_provided'),
      };
    }
  },
};

export const ParseToErrorAntd = (validationErrors: I_VALIDATION_ERRORS) => {
  return Object.entries(valuesWithData(validationErrors)).map(
    ([key, message]) => ({
      name: key,
      errors: [String(message)],
    }),
  );
};

export const CreateUserHelper = async (
  values: FormCreateUser,
  currentRole: CurrentRoleType,
  update: boolean = false,
  id?: string,
) => {
  try {
    const res = await CreateUserServicesByRole[currentRole](values, update, id);

    return {
      error: res.error,
      data: res.data,
      statusCode: res?.statusCode,
      message: res.message,
      validationErrors: res?.validationErrors as FormCreateUserError,
    };
  } catch (error) {
    let message = (error as Error)?.message;
    let description = '';
    let validationErrors = (error as CustomError)?.validationErrors;

    if ((error as CustomError)?.statusCode === 500) {
      message = `500 (Internal Server Error)`;
      description = message;
    }

    return {
      error: true,
      message: message || i18next.t('Feedback.unknow_error'),
      description,
      validationErrors,
    };
  }
};

export const FindUserByIdHelper = async (
  currentRole: CurrentRoleTypeFindUser,
  id?: string,
) => {
  try {
    const res = await FindUsersByRole[currentRole](id);

    return {
      data: res.data,
      error: res.error,
      statusCode: res?.statusCode,
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
      message: message || i18next.t('Feedback.unknow_error'),
      description,
    };
  }
};
