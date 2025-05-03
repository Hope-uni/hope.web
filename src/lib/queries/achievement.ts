import { QueryKeys } from '@/constants';
import { FiltersAchievement } from '@/models/schema';
import { API_PAYLOAD } from '@/models/types';
import { ListAchievementService } from '@/services/achievements/achievements.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchListAchievementsQuery = (
  payload?: API_PAYLOAD,
  filters?: FiltersAchievement,
  shouldLoad: boolean = true,
) => {
  return useQuery({
    queryKey: [QueryKeys.Achievement.ListAchievement, [payload, filters]],
    queryFn: () => ListAchievementService(payload, filters),
    placeholderData: keepPreviousData,
    enabled: shouldLoad,
  });
};
