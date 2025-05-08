import { QueryKeys } from '@/constants';
import { ROLES } from '@/constants/Role';
import { useFetchListAchievementsQuery } from '@/lib/queries/achievement';
import { useFetchListTherapistQuery } from '@/lib/queries/user';
import { useOverlayStore } from '@/lib/store';
import { useTableStore } from '@/lib/store/table';
import {
  Achievement,
  DetailPatient,
  Observation,
  SingleTutorTherapist,
} from '@/models/schema';
import { API_RESPONSE } from '@/models/types';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

const usePatientForm = (id: number | undefined) => {
  const { paginationTable } = useTableStore();
  const setLoading = useOverlayStore(useShallow((state) => state.setLoading));
  const [availableTherapistList, setAvailableTherapistList] = useState<
    SingleTutorTherapist[]
  >([]);
  const [achievementList, setAchievementList] = useState<Achievement[]>([]);

  const queryClient = useQueryClient();

  const availableTherapistForPatientQuery = useFetchListTherapistQuery(
    undefined,
    false,
  );

  const listAchievementsQuery = useFetchListAchievementsQuery(
    undefined,
    {
      patientId: id,
    },
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
      ListAchievements: [
        QueryKeys.Achievement.ListAchievement,
        [
          undefined,
          {
            patientId: id,
          },
        ],
      ],
    }),
    [id, paginationTable?.page, paginationTable?.size],
  );

  const getListAchievements = useCallback(async () => {
    const cacheData = queryClient.getQueryData<API_RESPONSE<Achievement[]>>(
      LocalQueryKeys.ListAchievements,
    );

    if (cacheData) {
      setAchievementList(cacheData?.data || []);
      return;
    }

    setLoading(true);
    const { data, error } = await listAchievementsQuery.refetch();

    setAchievementList(!error && data ? data.data || [] : []);
    setLoading(false);
    return;
  }, [
    queryClient,
    LocalQueryKeys.ListAchievements,
    setLoading,
    listAchievementsQuery,
  ]);

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

  const updateQueriesAfterChangeMonochrome = useCallback(
    async (patientId: number, isMonochrome: boolean) => {
      await queryClient.setQueryData(
        [QueryKeys.User.FindByRole, [String(patientId), ROLES.PATIENT]],
        (oldData: API_RESPONSE<DetailPatient>) => {
          if (!oldData?.data) return oldData;

          return {
            ...oldData,
            data: {
              ...oldData?.data,
              isMonochrome,
            },
          };
        },
      );
    },
    [queryClient],
  );

  const updateListAchievements = useCallback(async () => {
    queryClient.removeQueries({
      queryKey: LocalQueryKeys.ListAchievements,
    });
  }, [LocalQueryKeys.ListAchievements, queryClient]);

  const updateQueriesAfterUpdateAssignment = useCallback(
    async (patientId: number, achievement: Achievement) => {
      await queryClient.setQueryData(
        [QueryKeys.User.FindByRole, [String(patientId), ROLES.PATIENT]],
        (oldData: API_RESPONSE<DetailPatient>) => {
          if (!oldData?.data) return oldData;

          return {
            ...oldData,
            data: {
              ...oldData?.data,
              achievements: [
                ...(oldData?.data.achievements || []),
                achievement,
              ],
            },
          };
        },
      );

      await updateListAchievements();
    },
    [queryClient, updateListAchievements],
  );

  const updateQueriesAfterUnassignAssignment = useCallback(
    async (patientId: number, achievementId: number) => {
      await queryClient.setQueryData(
        [QueryKeys.User.FindByRole, [String(patientId), ROLES.PATIENT]],
        (oldData: API_RESPONSE<DetailPatient>) => {
          if (!oldData?.data) return oldData;

          const currentAchievements = oldData?.data.achievements || [];
          let updatedAchievements = currentAchievements.filter(
            (item) => item.id !== achievementId,
          );

          return {
            ...oldData,
            data: {
              ...oldData?.data,
              achievements: updatedAchievements,
            },
          };
        },
      );

      await updateListAchievements();
    },
    [queryClient, updateListAchievements],
  );

  return {
    availableTherapistList,
    achievementList,
    setAvailableTherapistList,
    getAvailableTherapistForPatient,
    getListAchievements,
    updateQueriesAfterChangeTherapist,
    updateQueriesAfterAddObservation,
    updateQueriesAfterChangeMonochrome,
    updateQueriesAfterUpdateAssignment,
    updateQueriesAfterUnassignAssignment,
  };
};

export default usePatientForm;
