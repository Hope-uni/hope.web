import { QueryKeys } from '@/constants';
import {
  useFetchListPatientAvailableForActivityQuery,
  useFetchListPatientQuery,
} from '@/lib/queries/user';
import { useOverlayStore } from '@/lib/store';
import { useTableStore } from '@/lib/store/table';
import { SingleActivity, SinglePatient } from '@/models/schema';
import { API_RESPONSE } from '@/models/types';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

const useActivityForm = (id: number | undefined) => {
  const { paginationTable } = useTableStore();
  const setLoading = useOverlayStore(useShallow((state) => state.setLoading));
  const [availableForActivityList, setAvailableForActivityList] = useState<
    SinglePatient[]
  >([]);
  const [assignedToActivityList, SetAssignedToActivityList] = useState<
    SinglePatient[]
  >([]);

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

  const LocalQueryKeys = useMemo(
    () => ({
      listActivity: [QueryKeys.Activity.ListActivity],
      detailActivity: ['find-activity-by-id', id],
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

  const getDetailActivityCached = useCallback(() => {
    return queryClient.getQueryData(LocalQueryKeys.detailActivity);
  }, [LocalQueryKeys.detailActivity, queryClient]);

  const getAvailableForActivity = useCallback(async () => {
    if (!id) {
      return;
    }

    const cacheData = queryClient.getQueryData<API_RESPONSE<SinglePatient[]>>(
      LocalQueryKeys?.availableForActivity,
    );

    if (cacheData) {
      setAvailableForActivityList(cacheData?.data || []);
      return;
    }

    setLoading(true);
    const { data, error } = await availablePatientForActivityQuery.refetch();
    setAvailableForActivityList(!error && data ? data.data || [] : []);
    setLoading(false);
    return;
  }, [
    id,
    queryClient,
    LocalQueryKeys?.availableForActivity,
    setLoading,
    availablePatientForActivityQuery,
  ]);

  const getAssignedToActivity = useCallback(async () => {
    if (!id) {
      return;
    }

    const cacheData = queryClient.getQueryData<API_RESPONSE<SinglePatient[]>>(
      LocalQueryKeys?.assignedToActivity,
    );

    if (cacheData) {
      SetAssignedToActivityList(cacheData?.data || []);
      return;
    }

    setLoading(true);
    const { data, error } = await PatientAssignedToActivityQuery.refetch();
    SetAssignedToActivityList(!error && data ? data.data || [] : []);
    setLoading(false);
    return;
  }, [
    id,
    queryClient,
    LocalQueryKeys?.assignedToActivity,
    setLoading,
    PatientAssignedToActivityQuery,
  ]);

  const updateActivityListAssignments = useCallback(
    async (patientIds: number[], addAssignment: boolean) => {
      await queryClient.setQueryData(
        [
          QueryKeys.Activity.ListActivity,
          {
            paginate: {
              page: paginationTable?.page,
              size: paginationTable?.size,
            },
          },
        ],
        (oldData: API_RESPONSE<SingleActivity[]>) => {
          if (!oldData?.data || !id) return oldData;

          return {
            ...oldData,
            data: oldData.data.map((item) => {
              if (item.id === id) {
                const currentAssignments = item.assignments || [];
                let updatedAssignments = currentAssignments;

                if (addAssignment) {
                  updatedAssignments = patientIds.filter(
                    (newId) => !currentAssignments.includes(newId),
                  );

                  updatedAssignments = [
                    ...currentAssignments,
                    ...updatedAssignments,
                  ];
                } else {
                  updatedAssignments = currentAssignments.filter(
                    (item) => !patientIds.includes(item),
                  );
                }

                return {
                  ...item,
                  assignments: updatedAssignments,
                };
              }
              return item;
            }),
          };
        },
      );
    },
    [id, paginationTable, queryClient],
  );

  const updateQueriesAfterAssign = useCallback(
    async (patientIds: number[]) => {
      if (id) {
        await queryClient.removeQueries({
          queryKey: LocalQueryKeys.assignedToActivity,
        });

        await queryClient.setQueryData(
          LocalQueryKeys.availableForActivity,
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

        await updateActivityListAssignments(patientIds, true);
      }
    },
    [
      LocalQueryKeys.assignedToActivity,
      LocalQueryKeys.availableForActivity,
      id,
      queryClient,
      updateActivityListAssignments,
    ],
  );

  const updateQueriesAfterUnassign = useCallback(
    async (patientIds: number[]) => {
      if (id) {
        await queryClient.removeQueries({
          queryKey: LocalQueryKeys.availableForActivity,
        });

        await queryClient.setQueryData(
          LocalQueryKeys.assignedToActivity,
          (oldData: API_RESPONSE<SinglePatient[]>) => {
            if (!oldData?.data) return oldData;

            const newData = oldData.data.filter(
              (item) => !patientIds.includes(item.id),
            );

            return {
              ...oldData,
              data: newData,
            };
          },
        );

        await getAssignedToActivity();

        await updateActivityListAssignments(patientIds, false);
      }
    },
    [
      LocalQueryKeys.assignedToActivity,
      LocalQueryKeys.availableForActivity,
      getAssignedToActivity,
      id,
      queryClient,
      updateActivityListAssignments,
    ],
  );

  const invalidateListActivity = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: LocalQueryKeys.listActivity,
    });
  }, [LocalQueryKeys.listActivity, queryClient]);

  return {
    availableForActivityList,
    assignedToActivityList,
    getDetailActivityCached,
    getAvailableForActivity,
    getAssignedToActivity,
    updateQueriesAfterAssign,
    updateQueriesAfterUnassign,
    invalidateListActivity,
  };
};

export default useActivityForm;
