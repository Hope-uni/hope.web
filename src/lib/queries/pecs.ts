import { QueryKeys } from '@/constants';
import { ListPhaseService } from '@/services/PECS/pecs.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchListPhasesQuery = () => {
  return useQuery({
    queryKey: [QueryKeys.Phase.ListPhase],
    queryFn: () => ListPhaseService(),
    placeholderData: keepPreviousData,
  });
};
