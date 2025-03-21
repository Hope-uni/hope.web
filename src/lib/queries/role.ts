import { QueryKeys } from '@/constants';
import { ListRolesService } from '@/services';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchListRoleQuery = () => {
  return useQuery({
    queryKey: [QueryKeys.Role.ListRole],
    queryFn: () => ListRolesService(),
    placeholderData: keepPreviousData,
  });
};
