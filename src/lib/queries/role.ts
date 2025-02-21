import { ListRolesService } from '@/services';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchListRoleQuery = () => {
  return useQuery({
    queryKey: ['list-roles'],
    queryFn: () => ListRolesService(),
    placeholderData: keepPreviousData,
  });
};
