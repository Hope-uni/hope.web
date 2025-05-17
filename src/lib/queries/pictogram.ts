import { QueryKeys } from '@/constants';
import { FiltersPictogram } from '@/models/schema';
import { API_PAYLOAD } from '@/models/types';
import { ListCategoryPictogramService } from '@/services/category/category.service';
import { ListPictogramsService } from '@/services/pictogram/pictogram.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchListCategoryPictogramsQuery = (payload?: API_PAYLOAD) => {
  return useQuery({
    queryKey: [QueryKeys.Pictogram.ListCategory, payload],
    queryFn: () => ListCategoryPictogramService(payload),
    placeholderData: keepPreviousData,
  });
};

export const useFetchListPictogramsQuery = (
  payload?: API_PAYLOAD,
  filters?: FiltersPictogram,
) => {
  return useQuery({
    queryKey: [QueryKeys.Pictogram.ListPictogram, [payload, filters]],
    queryFn: () => ListPictogramsService(payload, filters),
    placeholderData: keepPreviousData,
  });
};
