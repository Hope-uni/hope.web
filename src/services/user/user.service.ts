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
  ListPatientResponse,
  ListRoleResponse,
  ListTherapistResponse,
  ListTutorResponse,
  ListUserResponse,
} from '@/models/schema';
import { API_PAYLOAD, API_RESPONSE, API_SINGLE_RESPONSE } from '@/models/types';
import { axiosErrorHandler } from '@/utils/axios';
import { valuesWithData } from '@/utils/objects';

/*
 * Role Services
 */
export const ListRolesService = async () => {
  try {
    const response = await API_HOPE_PROTECTED.get<
      API_RESPONSE<ListRoleResponse[]>
    >(API.User.Role.Index);

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
    >(API.User.Index, {
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
    >(`${API.User.Index}/${id}`);

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const CreateUserService = async (payload: CreateUserPayload) => {
  try {
    const response = await API_HOPE_PROTECTED.post<
      API_RESPONSE<ListUserResponse>
    >(API.User.Index, {
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
    >(`${API.User.Index}/${id}`, {
      ...validatePayload,
    });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

export const DeleteUserService = async (id: string) => {
  try {
    const response = await API_HOPE_PROTECTED.delete<API_SINGLE_RESPONSE>(
      `${API.User.Index}/${id}`,
    );

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
      API_RESPONSE<ListPatientResponse[]>
    >(API.Patient.Index, {
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
      API_RESPONSE<CreatePatientResponse>
    >(`${API.Patient.Index}/${id}`);

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

export const CreatePatientService = async (payload: CreatePatientPayload) => {
  try {
    const response = await API_HOPE_PROTECTED.post<
      API_RESPONSE<CreatePatientResponse>
    >(API.Patient.Index, {
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
    >(`${API.Patient.Index}/${id}`, {
      ...validatePayload,
    });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

export const DeletePatientService = async (id: string) => {
  try {
    const response = await API_HOPE_PROTECTED.delete<API_SINGLE_RESPONSE>(
      `${API.Patient.Index}/${id}`,
    );

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
    >(API.Tutor.Index, {
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
    >(`${API.Tutor.Index}/${id}`);

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
    >(API.Tutor.Index, {
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
    >(`${API.Tutor.Index}/${id}`, {
      ...validatePayload,
    });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

export const DeleteTutorService = async (id: string) => {
  try {
    const response = await API_HOPE_PROTECTED.delete<API_SINGLE_RESPONSE>(
      `${API.Tutor.Index}/${id}`,
    );

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
      API_RESPONSE<ListTherapistResponse[]>
    >(API.Therapist.Index, {
      params: payload.paginate,
    });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

export const FindTherapistByIdService = async (id: string | undefined) => {
  try {
    const response = await API_HOPE_PROTECTED.get<
      API_RESPONSE<CreateTherapistResponse>
    >(`${API.Therapist.Index}/${id}`);

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
    >(API.Therapist.Index, {
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
    >(`${API.Therapist.Index}/${id}`, {
      ...validatePayload,
    });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

export const DeleteTherapistService = async (id: string) => {
  try {
    const response = await API_HOPE_PROTECTED.delete<API_SINGLE_RESPONSE>(
      `${API.Therapist.Index}/${id}`,
    );

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};
