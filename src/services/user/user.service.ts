import { API_HOPE_PROTECTED, defaultPayload } from '@/config';
import { API } from '@/constants/ApiUrls';
import {
  CreatePatientPayload,
  CreatePatientResponse,
  CreateTherapistResponse,
  CreateTherapistTutorPayload,
  CreateTutorResponse,
  CreateUserPayload,
  CreateUserResponse,
  ListRoleResponse,
  ListTutorResponse,
  ListUserResponse,
} from '@/models/schema';
import { API_PAYLOAD, API_RESPONSE } from '@/models/types';
import { axiosErrorHandler } from '@/utils/axios';

/*
 * Role Services
 */
export const ListRolesService = async () => {
  try {
    const response = await API_HOPE_PROTECTED.get<
      API_RESPONSE<ListRoleResponse[]>
    >(API.User.Role.List);

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

/*
 * User Services
 */
export const ListUserService = async (
  payload: API_PAYLOAD = defaultPayload,
) => {
  try {
    const response = await API_HOPE_PROTECTED.get<
      API_RESPONSE<ListUserResponse[]>
    >(API.User.List, {
      params: payload.paginate,
    });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

export const CreateUserService = async (payload: CreateUserPayload) => {
  try {
    const response = await API_HOPE_PROTECTED.post<
      API_RESPONSE<CreateUserResponse>
    >(API.User.Create, {
      ...payload,
    });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

/*
 * Patient Services
 */
export const ListPatientService = async (
  payload: API_PAYLOAD = defaultPayload,
) => {
  try {
    const response = await API_HOPE_PROTECTED.get<
      API_RESPONSE<ListUserResponse[]>
    >(API.Patient.List, {
      params: payload.paginate,
    });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

export const CreatePatientService = async (payload: CreatePatientPayload) => {
  try {
    const response = await API_HOPE_PROTECTED.post<
      API_RESPONSE<CreatePatientResponse>
    >(API.Patient.Create, {
      ...payload,
      password: 'samuel123',
    });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

/*
 * Tutor Services
 */
export const ListTutorService = async (
  payload: API_PAYLOAD = defaultPayload,
) => {
  try {
    const response = await API_HOPE_PROTECTED.get<
      API_RESPONSE<ListTutorResponse[]>
    >(API.Tutor.List, {
      params: payload.paginate,
    });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

export const CreateTutorService = async (
  payload: CreateTherapistTutorPayload,
) => {
  try {
    const response = await API_HOPE_PROTECTED.post<
      API_RESPONSE<CreateTutorResponse>
    >(API.Tutor.Create, {
      ...payload,
      password: 'samuel123',
    });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

/*
 * Therapist Services
 */
export const ListTherapistService = async (
  payload: API_PAYLOAD = defaultPayload,
) => {
  try {
    const response = await API_HOPE_PROTECTED.get<
      API_RESPONSE<ListUserResponse[]>
    >(API.Therapist.List, {
      params: payload.paginate,
    });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

export const CreateTherapistService = async (
  payload: CreateTherapistTutorPayload,
) => {
  try {
    const response = await API_HOPE_PROTECTED.post<
      API_RESPONSE<CreateTherapistResponse>
    >(API.Therapist.Create, {
      ...payload,
      password: 'samuel123',
    });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};
