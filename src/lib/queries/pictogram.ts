import { API_PAYLOAD } from '@/models/types';
import { ListCategoryPictogramService } from '@/services/category/category.service';
import { ListPictogramsService } from '@/services/pictogram/pictogram.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchListCategoryPictogramsQuery = (payload?: API_PAYLOAD) => {
  return useQuery({
    queryKey: ['list-category-pictograms'],
    queryFn: () => ListCategoryPictogramService(payload),
    placeholderData: keepPreviousData,
  });
};

export const useFetchListPictogramsQuery = (payload?: API_PAYLOAD) => {
  return useQuery({
    queryKey: ['list-pictograms'],
    queryFn: () => ListPictogramsService(payload),
    placeholderData: keepPreviousData,
  });
};
