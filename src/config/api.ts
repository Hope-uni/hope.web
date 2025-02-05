import { API_PAYLOAD } from '@/models/types';
import axios from 'axios';

export const defaultPayload: API_PAYLOAD = {
  body: undefined,
  paginate: undefined,
};

import { getSession, signOut } from 'next-auth/react';

const URl = process.env.NEXT_PUBLIC_API_URL;

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const API_HOPE_PUBLIC = axios.create({
  baseURL: URl,
  headers,
});

export const API_HOPE_PROTECTED = axios.create({
  baseURL: URl,
  headers,
});

API_HOPE_PROTECTED.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session && session?.user?.accessToken) {
      if (config.headers) {
        config.headers['Authorization'] = `Bearer ${session.user?.accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

API_HOPE_PROTECTED.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error) && error.response?.data.statusCode === 401) {
      // TODO implements signOut and redirect to login.
    }
    return Promise.reject(error);
  },
);
