import { API_PAYLOAD } from '@/models/types';
import {
  FindUserByIdService,
  ListPatientService,
  ListRolesService,
  ListTherapistService,
  ListTutorService,
  ListUserService,
} from '@/services';
import {
  ListDegreeService,
  ListPhaseService,
} from '@/services/PECS/pecs.service';
import {
  CurrentRoleTypeFindUser,
  FindUserByIdHelper,
} from '@/services/user/helpers';
import { keepPreviousData, useQueries, useQuery } from '@tanstack/react-query';

export const useFetchCatalogInitCreateUserQuery = (isEdit: boolean) => {
  return useQueries({
    queries: [
      {
        queryKey: ['list-catalog-role'],
        queryFn: () => ListRolesService(),
        enabled: !isEdit,
        placeholderData: keepPreviousData,
      },
      {
        queryKey: ['list-catalog-phase'],
        queryFn: () => ListPhaseService(),
        placeholderData: keepPreviousData,
      },
      {
        queryKey: ['list-catalog-degree'],
        queryFn: () => ListDegreeService(),
        placeholderData: keepPreviousData,
      },
      {
        queryKey: ['list-catalog-tutor'],
        queryFn: () => ListTutorService(),
        placeholderData: keepPreviousData,
      },
    ],
  });
};

export const useFetchListUserQuery = (payload?: API_PAYLOAD) => {
  return useQuery({
    queryKey: ['list-user', payload],
    queryFn: () => ListUserService(payload),
    placeholderData: keepPreviousData,
  });
};

export const useFetchFindUserByIdQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ['find-user-by-id', id],
    queryFn: () => FindUserByIdService(id),
    placeholderData: keepPreviousData,
  });
};

export const useFetchFindUserByRoleQuery = (
  role: string,
  id: string | undefined,
) => {
  return useQuery({
    queryKey: ['find-user-by-id', id],
    queryFn: () => FindUserByIdHelper(role as CurrentRoleTypeFindUser, id),
    enabled: !!role && !!id,
    placeholderData: keepPreviousData,
  });
};

export const useFetchListPatientQuery = (payload?: API_PAYLOAD) => {
  return useQuery({
    queryKey: ['list-patient', payload],
    queryFn: () => ListPatientService(payload),
    placeholderData: keepPreviousData,
  });
};

export const useFetchListTutorQuery = (payload?: API_PAYLOAD) => {
  return useQuery({
    queryKey: ['list-tutor', payload],
    queryFn: () => ListTutorService(payload),
    placeholderData: keepPreviousData,
  });
};

export const useFetchListTherapistQuery = (payload?: API_PAYLOAD) => {
  return useQuery({
    queryKey: ['list-therapist', payload],
    queryFn: () => ListTherapistService(payload),
    placeholderData: keepPreviousData,
  });
};
