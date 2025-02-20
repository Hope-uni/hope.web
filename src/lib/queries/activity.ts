import { API_PAYLOAD } from '@/models/types';
import { ListActivitiesService } from '@/services/activity/activity.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchListActivitiesQuery = (payload?: API_PAYLOAD) => {
  return useQuery({
    queryKey: ['list-catalog-role'],
    queryFn: () => ListActivitiesService(payload),
    placeholderData: keepPreviousData,
  });
};
