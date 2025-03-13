import { API_PAYLOAD } from '@/models/types';
import {
  FindActivityByIdService,
  ListActivitiesService,
} from '@/services/activity/activity.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchListActivitiesQuery = (payload?: API_PAYLOAD) => {
  return useQuery({
    queryKey: ['list-catalog-role', payload],
    queryFn: () => ListActivitiesService(payload),
    placeholderData: keepPreviousData,
  });
};

export const useFetchFindActivityByIdQuery = (id: number) => {
  return useQuery({
    queryKey: ['find-activity-by-id', id],
    queryFn: () => FindActivityByIdService(id),
    placeholderData: keepPreviousData,
  });
};
