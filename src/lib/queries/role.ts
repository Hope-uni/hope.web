import { ListRolesService } from '@/services';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchListRoleQuery = () => {
  return useQuery({
    queryKey: ['list-catalog-role'],
    queryFn: () => ListRolesService(),
    placeholderData: keepPreviousData,
  });
};
