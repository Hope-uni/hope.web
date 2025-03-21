import { QueryKeys } from '@/constants';
import { API_PAYLOAD, API_RESPONSE } from '@/models/types';
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
        queryKey: [QueryKeys.Role.CatalogRole],
        queryFn: () => ListRolesService(),
        enabled: !isEdit,
        placeholderData: keepPreviousData,
      },
      {
        queryKey: [QueryKeys.Phase.CatalogPhase],
        queryFn: () => ListPhaseService(),
        placeholderData: keepPreviousData,
      },
      {
        queryKey: [QueryKeys.Degree.CatalogDegree],
        queryFn: () => ListDegreeService(),
        placeholderData: keepPreviousData,
      },
      {
        queryKey: [QueryKeys.User.CatalogTutor],
        queryFn: () => ListTutorService(),
        placeholderData: keepPreviousData,
      },
    ],
  });
};

export const useFetchListUserQuery = (payload?: API_PAYLOAD) => {
  return useQuery({
    queryKey: [QueryKeys.User.ListUser, payload],
    queryFn: () => ListUserService(payload),
    placeholderData: keepPreviousData,
  });
};

export const useFetchFindUserByIdQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: [QueryKeys.User.FindById, id],
    queryFn: () => FindUserByIdService(id),
    placeholderData: keepPreviousData,
  });
};

export const useFetchFindUserByRoleQuery = <T = unknown>(
  role: string,
  id: string | undefined,
) => {
  return useQuery<API_RESPONSE<T>>({
    queryKey: [QueryKeys.User.FindByRole, [id, role]],
    queryFn: () =>
      FindUserByIdHelper(role as CurrentRoleTypeFindUser, id) as Promise<
        API_RESPONSE<T>
      >,
    enabled: !!role && !!id,
    placeholderData: keepPreviousData,
  });
};

export const useFetchListPatientQuery = (payload?: API_PAYLOAD) => {
  return useQuery({
    queryKey: [QueryKeys.User.ListPatient, payload],
    queryFn: () => ListPatientService(payload),
    placeholderData: keepPreviousData,
  });
};

export const useFetchListTutorQuery = (payload?: API_PAYLOAD) => {
  return useQuery({
    queryKey: [QueryKeys.User.ListTutor, payload],
    queryFn: () => ListTutorService(payload),
    placeholderData: keepPreviousData,
  });
};

export const useFetchListTherapistQuery = (payload?: API_PAYLOAD) => {
  return useQuery({
    queryKey: [QueryKeys.User.ListTherapist, payload],
    queryFn: () => ListTherapistService(payload),
    placeholderData: keepPreviousData,
  });
};
