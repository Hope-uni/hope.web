import { API_PAYLOAD } from '@/models/types';
import {
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
import { keepPreviousData, useQueries, useQuery } from '@tanstack/react-query';

export const useFetchCatalogInitCreateUserQuery = () => {
  return useQueries({
    queries: [
      {
        queryKey: ['list-catalog-role'],
        queryFn: () => ListRolesService(),
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

export const useFetchListPatientQuery = (payload?: API_PAYLOAD) => {
  return useQuery({
    queryKey: ['list-patient', payload],
    queryFn: () => ListPatientService(payload),
    placeholderData: keepPreviousData,
  });
};

export const useFetchListTutorQuery = (payload?: API_PAYLOAD) => {
  return useQuery({
    queryKey: ['list-patient', payload],
    queryFn: () => ListTutorService(payload),
    placeholderData: keepPreviousData,
  });
};

export const useFetchListTherapistQuery = (payload?: API_PAYLOAD) => {
  return useQuery({
    queryKey: ['list-patient', payload],
    queryFn: () => ListTherapistService(payload),
    placeholderData: keepPreviousData,
  });
};
