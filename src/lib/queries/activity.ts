import { QueryKeys } from '@/constants';
import { API_PAYLOAD } from '@/models/types';
import {
  FindActivityByIdService,
  ListActivitiesService,
} from '@/services/activity/activity.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchListActivitiesQuery = (payload?: API_PAYLOAD) => {
  return useQuery({
    queryKey: [QueryKeys.Activity.ListActivity, payload],
    queryFn: () => ListActivitiesService(payload),
    placeholderData: keepPreviousData,
  });
};

export const useFetchFindActivityByIdQuery = (id: number | null) => {
  return useQuery({
    queryKey: [QueryKeys.Activity.FindById, id],
    queryFn: () => FindActivityByIdService(id),
    placeholderData: keepPreviousData,
    enabled: !!id,
  });
};
