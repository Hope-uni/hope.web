import { QueryKeys } from '@/constants';
import { useFetchListPatientWithoutTherapistQuery } from '@/lib/queries/user';
import { useOverlayStore } from '@/lib/store';
import { useTableStore } from '@/lib/store/table';
import { SinglePatient, SingleTutorTherapist } from '@/models/schema';
import { API_RESPONSE } from '@/models/types';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

const useTherapistForm = () => {
  const { paginationTable } = useTableStore();
  const setLoading = useOverlayStore(useShallow((state) => state.setLoading));
  const [availableForTherapistList, setAvailableForTherapistList] = useState<
    SinglePatient[]
  >([]);

  const queryClient = useQueryClient();

  const availablePatientForTherapistQuery =
    useFetchListPatientWithoutTherapistQuery(undefined, false);

  const LocalQueryKeys = useMemo(
    () => ({
      availableForTherapist: [
        QueryKeys.User.ListPatientWithoutTherapist,
        undefined,
      ],
      ListTherapist: QueryKeys.User.ListTherapist,
    }),
    [],
  );

  const getAvailableForTherapist = useCallback(async () => {
    const cacheData = queryClient.getQueryData<API_RESPONSE<SinglePatient[]>>(
      LocalQueryKeys.availableForTherapist,
    );

    if (cacheData) {
      setAvailableForTherapistList(cacheData?.data || []);
      return;
    }

    setLoading(true);
    const { data, error } = await availablePatientForTherapistQuery.refetch();
    setAvailableForTherapistList(!error && data ? data.data || [] : []);
    setLoading(false);
    return;
  }, [
    queryClient,
    LocalQueryKeys.availableForTherapist,
    setLoading,
    availablePatientForTherapistQuery,
  ]);

  const updateTherapistListChildrenInCharge = useCallback(
    async (patientIds: number[], therapistId: number) => {
      await queryClient.setQueryData(
        [
          LocalQueryKeys.ListTherapist,
          {
            paginate: {
              page: paginationTable?.page,
              size: paginationTable?.size,
            },
          },
        ],
        (oldData: API_RESPONSE<SingleTutorTherapist[]>) => {
          if (!oldData?.data || !therapistId) return oldData;

          return {
            ...oldData,
            data: oldData.data.map((item) => {
              if (item.id === therapistId) {
                const currentChildrenInCharge = item.childrenInCharge || 0;

                return {
                  ...item,
                  childrenInCharge: currentChildrenInCharge + patientIds.length,
                };
              }
              return item;
            }),
          };
        },
      );
    },
    [
      LocalQueryKeys.ListTherapist,
      paginationTable?.page,
      paginationTable?.size,
      queryClient,
    ],
  );

  const updateQueriesAfterAssign = useCallback(
    async (patientIds: number[], therapistId: number) => {
      if (therapistId) {
        await queryClient.setQueryData(
          LocalQueryKeys.availableForTherapist,
          (oldData: API_RESPONSE<SinglePatient[]>) => {
            if (!oldData?.data) return oldData;

            return {
              ...oldData,
              data: oldData.data.filter(
                (item) => !patientIds.includes(item.id),
              ),
            };
          },
        );

        await updateTherapistListChildrenInCharge(patientIds, therapistId);
      }
    },
    [
      LocalQueryKeys.availableForTherapist,
      queryClient,
      updateTherapistListChildrenInCharge,
    ],
  );

  return {
    availableForTherapistList,
    getAvailableForTherapist,
    updateQueriesAfterAssign,
  };
};

export default useTherapistForm;
