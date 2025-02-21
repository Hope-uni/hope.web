import { API_PAYLOAD } from '@/models/types';
import { ListPictogramsService } from '@/services/pictogram/pictogram.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchListPictogramsQuery = (payload?: API_PAYLOAD) => {
  return useQuery({
    queryKey: ['list-pictograms'],
    queryFn: () => ListPictogramsService(payload),
    placeholderData: keepPreviousData,
  });
};
