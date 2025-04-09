import { QueryKeys } from '@/constants';
import {
  useFetchListPatientAvailableForActivityQuery,
  useFetchListPatientQuery,
  useFetchListPatientWithoutTherapistQuery,
} from '@/lib/queries/user';
import { useOverlayStore } from '@/lib/store';
import { SinglePatient } from '@/models/schema';
import { API_RESPONSE } from '@/models/types';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

interface PatientListOptions {
  filterBy:
    | 'available-patient-for-activity'
    | 'patients-assigned-to-activity'
    | 'available-patient-for-therapist'
    | 'patients-assigned-to-therapist';
}

const usePatientList = (
  id: number | undefined,
  { filterBy }: PatientListOptions,
) => {
  const [patientList, setPatientList] = useState<SinglePatient[]>([]);
  const setLoading = useOverlayStore(useShallow((state) => state.setLoading));
  const queryClient = useQueryClient();

  const availablePatientForActivityQuery =
    useFetchListPatientAvailableForActivityQuery(id, undefined, false);

  const PatientAssignedToActivityQuery = useFetchListPatientQuery(
    undefined,
    {
      activityId: id,
    },
    false,
  );

  const availablePatientForTherapistQuery =
    useFetchListPatientWithoutTherapistQuery(undefined, false);

  const LocalQueryKeys = useMemo(
    () => ({
      availableForActivity: [
        QueryKeys.User.ListPatientWithoutActivity,
        [id, undefined],
      ],
      assignedToActivity: [
        QueryKeys.User.ListPatient,
        [
          undefined,
          {
            activityId: id,
          },
        ],
      ],
      availableForTherapist: [
        QueryKeys.User.ListPatientWithoutTherapist,
        undefined,
      ],
    }),
    [id],
  );

  const activeQuery = useMemo(() => {
    if (id) {
      if (filterBy === 'available-patient-for-activity') {
        return availablePatientForActivityQuery;
      }

      if (filterBy === 'patients-assigned-to-activity') {
        return PatientAssignedToActivityQuery;
      }

      if (filterBy === 'available-patient-for-therapist') {
        return availablePatientForTherapistQuery;
      }
    }
  }, [
    PatientAssignedToActivityQuery,
    availablePatientForActivityQuery,
    availablePatientForTherapistQuery,
    filterBy,
    id,
  ]);

  const cachedPatients = useCallback(() => {
    if (filterBy === 'available-patient-for-activity') {
      return queryClient.getQueryData<API_RESPONSE<SinglePatient[]>>(
        LocalQueryKeys?.availableForActivity,
      );
    }

    if (filterBy === 'patients-assigned-to-activity') {
      return queryClient.getQueryData<API_RESPONSE<SinglePatient[]>>(
        LocalQueryKeys?.assignedToActivity,
      );
    }

    if (filterBy === 'available-patient-for-therapist') {
      return queryClient.getQueryData<API_RESPONSE<SinglePatient[]>>(
        LocalQueryKeys.availableForTherapist,
      );
    }
  }, [LocalQueryKeys, filterBy, queryClient]);

  const getPatients = useCallback(async () => {
    if (!id) {
      return;
    }

    const cacheData = cachedPatients();

    if (cacheData) {
      setPatientList(cacheData?.data || []);
      return;
    }

    if (activeQuery) {
      setLoading(true);
      const { data, error } = await activeQuery.refetch();
      setPatientList(!error && data ? data.data || [] : []);
      setLoading(false);
      return;
    }

    return;
  }, [id, cachedPatients, activeQuery, setLoading]);

  return {
    patientList,
    getPatients,
  };
};

export default usePatientList;
