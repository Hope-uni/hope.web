import { ListPhaseService } from '@/services/PECS/pecs.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchListPhasesQuery = () => {
  return useQuery({
    queryKey: ['list-phases'],
    queryFn: () => ListPhaseService(),
    placeholderData: keepPreviousData,
  });
};
