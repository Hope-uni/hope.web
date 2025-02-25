import { API_HOPE_PROTECTED, defaultPayload } from '@/config';
import { API } from '@/constants/ApiUrls';
import { PayloadPhase, TEAGrade, TEAPhase } from '@/models/schema';
import { API_PAYLOAD, API_RESPONSE } from '@/models/types';
import { axiosErrorHandler } from '@/utils/axios';
import { valuesWithData } from '@/utils/objects';

export const ListPhaseService = async (
  payload: API_PAYLOAD = defaultPayload,
) => {
  try {
    const response = await API_HOPE_PROTECTED.get<API_RESPONSE<TEAPhase[]>>(
      API.PECS.Phase.index,
      {
        params: payload.paginate,
      },
    );

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const EditPhaseService = async (payload: PayloadPhase, id: string) => {
  try {
    const validatePayload = valuesWithData(payload);
    const response = await API_HOPE_PROTECTED.put<API_RESPONSE<TEAPhase>>(
      `${API.PECS.Phase.index}/${id}`,
      {
        ...validatePayload,
      },
    );

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const ListDegreeService = async () => {
  try {
    const response = await API_HOPE_PROTECTED.get<API_RESPONSE<TEAGrade[]>>(
      API.PECS.Degree.index,
    );

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};
