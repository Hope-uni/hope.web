import { QueryKeys } from '@/constants';
import { FiltersPatient } from '@/models/schema';
import { API_PAYLOAD, API_RESPONSE } from '@/models/types';
import {
  FindUserByIdService,
  ListPatientAvailableForActivityService,
  ListPatientService,
  ListPatientWithoutTherapistService,
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
  shouldLoad: boolean = true,
) => {
  return useQuery<API_RESPONSE<T>>({
    queryKey: [QueryKeys.User.FindByRole, [id, role]],
    queryFn: () =>
      FindUserByIdHelper(role as CurrentRoleTypeFindUser, id) as Promise<
        API_RESPONSE<T>
      >,
    placeholderData: keepPreviousData,
    enabled: shouldLoad && !!role && !!id,
  });
};

export const useFetchListPatientQuery = (
  payload?: API_PAYLOAD,
  filters?: FiltersPatient,
  shouldLoad: boolean = true,
) => {
  return useQuery({
    queryKey: [QueryKeys.User.ListPatient, [payload, filters]],
    queryFn: () => ListPatientService(payload, filters),
    placeholderData: keepPreviousData,
    enabled: shouldLoad,
  });
};

export const useFetchListPatientWithoutTherapistQuery = (
  payload?: API_PAYLOAD,
  shouldLoad: boolean = true,
) => {
  return useQuery({
    queryKey: [QueryKeys.User.ListPatientWithoutTherapist, payload],
    queryFn: () => ListPatientWithoutTherapistService(payload),
    placeholderData: keepPreviousData,
    enabled: shouldLoad,
  });
};

export const useFetchListPatientAvailableForActivityQuery = (
  id?: number,
  payload?: API_PAYLOAD,
  shouldLoad: boolean = true,
) => {
  return useQuery({
    queryKey: [QueryKeys.User.ListPatientWithoutActivity, [id, payload]],
    queryFn: () => ListPatientAvailableForActivityService(id, payload),
    placeholderData: keepPreviousData,
    enabled: shouldLoad && !!id,
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
