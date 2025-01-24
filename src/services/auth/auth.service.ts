import { API_HOPE_PUBLIC } from '@/config';
import { API } from '@/constants/ApiUrls';
import {
  ForgotPasswordPayload,
  LoginPayload,
  LoginResponse,
  MePayload,
  MeResponse,
  ResetPasswordPayload,
} from '@/models/schema';
import { API_RESPONSE, API_SINGLE_RESPONSE } from '@/models/types';
import { axiosErrorHandler } from '@/utils/axios';

export const LoginService = async (loginPayload: LoginPayload) => {
  try {
    const response = await API_HOPE_PUBLIC.post<API_RESPONSE<LoginResponse>>(
      API.Login,
      loginPayload,
    );

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const serviceMe = async (MePayload: MePayload) => {
  try {
    const response = await API_HOPE_PUBLIC.get<API_RESPONSE<MeResponse>>(
      API.Me,
      {
        headers: {
          Authorization: `bearer ${MePayload.accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const ForgotPasswordService = async (
  resetPasswordPayload: ForgotPasswordPayload,
) => {
  try {
    const response = await API_HOPE_PUBLIC.post<API_SINGLE_RESPONSE>(
      API.Forgot_Password,
      resetPasswordPayload,
    );

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const ResetPasswordService = async (
  resetPasswordPayload: ResetPasswordPayload,
) => {
  try {
    const response = await API_HOPE_PUBLIC.post<API_SINGLE_RESPONSE>(
      API.Reset_Password,
      resetPasswordPayload,
    );

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};
