import { QueryKeys } from '@/constants';
import { ROLES } from '@/constants/Role';
import { useFetchListTherapistQuery } from '@/lib/queries/user';
import { useOverlayStore } from '@/lib/store';
import { useTableStore } from '@/lib/store/table';
import {
  DetailPatient,
  Observation,
  SingleTutorTherapist,
} from '@/models/schema';
import { API_RESPONSE } from '@/models/types';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

const usePatientForm = () => {
  const { paginationTable } = useTableStore();
  const setLoading = useOverlayStore(useShallow((state) => state.setLoading));
  const [availableTherapistList, setAvailableTherapistList] = useState<
    SingleTutorTherapist[]
  >([]);

  const queryClient = useQueryClient();

  const availableTherapistForPatientQuery = useFetchListTherapistQuery(
    undefined,
    false,
  );

  const LocalQueryKeys = useMemo(
    () => ({
      ListAvailableTherapist: [QueryKeys.User.ListTherapist, undefined],
      ListTherapist: [
        QueryKeys.User.ListTherapist,
        {
          paginate: {
            page: paginationTable?.page,
            size: paginationTable?.size,
          },
        },
      ],
    }),
    [paginationTable?.page, paginationTable?.size],
  );

  const getAvailableTherapistForPatient = useCallback(async () => {
    const cacheData = queryClient.getQueryData<
      API_RESPONSE<SingleTutorTherapist[]>
    >(LocalQueryKeys.ListAvailableTherapist);

    if (cacheData) {
      setAvailableTherapistList(cacheData?.data || []);
      return;
    }

    setLoading(true);
    const { data, error } = await availableTherapistForPatientQuery.refetch();
    setAvailableTherapistList(!error && data ? data.data || [] : []);
    setLoading(false);
    return;
  }, [
    queryClient,
    LocalQueryKeys.ListAvailableTherapist,
    setLoading,
    availableTherapistForPatientQuery,
  ]);

  const updateQueriesAfterChangeTherapist = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: LocalQueryKeys.ListAvailableTherapist,
    });
    await queryClient.invalidateQueries({
      queryKey: LocalQueryKeys.ListTherapist,
    });
  }, [
    LocalQueryKeys.ListAvailableTherapist,
    LocalQueryKeys.ListTherapist,
    queryClient,
  ]);

  const updateQueriesAfterAddObservation = useCallback(
    async (patientId: number, observation: Observation) => {
      await queryClient.setQueryData(
        [QueryKeys.User.FindByRole, [String(patientId), ROLES.PATIENT]],
        (oldData: API_RESPONSE<DetailPatient>) => {
          if (!oldData?.data) return oldData;

          return {
            ...oldData,
            data: {
              ...oldData?.data,
              observations: [
                observation,
                ...(oldData?.data.observations || []),
              ],
            },
          };
        },
      );
    },
    [queryClient],
  );

  return {
    availableTherapistList,
    setAvailableTherapistList,
    getAvailableTherapistForPatient,
    updateQueriesAfterChangeTherapist,
    updateQueriesAfterAddObservation,
  };
};

export default usePatientForm;
