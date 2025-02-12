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
import { valuesWithData } from '@/utils/objects';

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

export const FindUserByIdService = async (id: string | undefined) => {
  try {
    const response = await API_HOPE_PROTECTED.get<
      API_RESPONSE<ListUserResponse>
    >(`${API.User.find}/${id}`);

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const CreateUserService = async (payload: CreateUserPayload) => {
  try {
    const response = await API_HOPE_PROTECTED.post<
      API_RESPONSE<ListUserResponse>
    >(API.User.Create, {
      ...payload,
    });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

export const EditUserService = async (
  payload: CreateUserPayload,
  id: string,
) => {
  try {
    const validatePayload = valuesWithData(payload);
    const response = await API_HOPE_PROTECTED.put<
      API_RESPONSE<ListUserResponse>
    >(`${API.User.Create}/${id}`, {
      ...validatePayload,
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

export const FindPatientByIdService = async (id: string) => {
  try {
    const response = await API_HOPE_PROTECTED.get<
      API_RESPONSE<ListUserResponse[]>
    >(`${API.Patient.find}/${id}`);

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
    });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

export const EditPatientService = async (
  payload: CreatePatientPayload,
  id: string,
) => {
  try {
    const validatePayload = valuesWithData(payload);
    const response = await API_HOPE_PROTECTED.put<
      API_RESPONSE<CreatePatientResponse>
    >(`${API.Patient.Create}/${id}`, {
      ...validatePayload,
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

export const FindTutorByIdService = async (id: string | undefined) => {
  try {
    const response = await API_HOPE_PROTECTED.get<
      API_RESPONSE<CreateTutorResponse>
    >(`${API.Tutor.find}/${id}`);

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
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
    });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

export const EditTutorService = async (
  payload: CreateTherapistTutorPayload,
  id: string,
) => {
  try {
    const validatePayload = valuesWithData(payload);
    const response = await API_HOPE_PROTECTED.put<
      API_RESPONSE<CreateTutorResponse>
    >(`${API.Tutor.Create}/${id}`, {
      ...validatePayload,
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
    const response = await API_HOPE_PROTECTED.get<API_RESPONSE<any[]>>(
      API.Therapist.List,
      {
        params: payload.paginate,
      },
    );

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

export const FindTherapistByIdService = async (id: string | undefined) => {
  try {
    const response = await API_HOPE_PROTECTED.get<
      API_RESPONSE<CreateTherapistResponse>
    >(`${API.Therapist.find}/${id}`);

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
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
    });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

export const EditTherapistService = async (
  payload: CreateTherapistTutorPayload,
  id: string,
) => {
  try {
    const validatePayload = valuesWithData(payload);
    const response = await API_HOPE_PROTECTED.put<
      API_RESPONSE<CreateTherapistResponse>
    >(`${API.Therapist.Create}/${id}`, {
      ...validatePayload,
    });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};
