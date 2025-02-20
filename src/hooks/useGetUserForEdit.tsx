import { ROLES } from '@/constants/Role';
import { useFormCreateUserStore } from '@/lib/store/formCreateUser';
import { FormCreateUserSchema } from '@/models/schema';
import { FindUserByIdService } from '@/services';
import {
  CurrentRoleTypeFindUser,
  FindUserByIdHelper,
} from '@/services/user/helpers';
import { removeKeysFromObject } from '@/utils/objects';
import { validateRole } from '@/utils/session';
import { useCallback, useState } from 'react';
import dayjs from 'dayjs';

export const useGetUserForEdit = (id?: string) => {
  const [userNotFound, setUserNotFound] = useState(false);
  const [error, setError] = useState('');
  const [loadingEdit, setLoadingEdit] = useState(false);
  const { setFields, setCurrentRoleSelected, setIsEdit } =
    useFormCreateUserStore();

  const GetUser = useCallback(async () => {
    if (!id) {
      setUserNotFound(true);
      return;
    }

    const { data, statusCode, message } = await FindUserByIdService(id);

    if (statusCode === 404 && !data) {
      setError(message);
      setUserNotFound(true);
      setLoadingEdit(false);
      return;
    }

    if (!data || !data?.roles || data?.roles?.length === 0) {
      setError(message);
      setUserNotFound(true);
      setLoadingEdit(false);
      return;
    }

    const role = data.roles[0];

    if (!validateRole(role.name, ROLES.ADMIN)) {
      //TODO Replacing this any requires a refactor
      const userData: any = await FindUserByIdHelper(
        role?.name as CurrentRoleTypeFindUser,
        data?.profileId,
      );

      if (userData.error) {
        setError(userData.message);
        setUserNotFound(true);
        setLoadingEdit(false);
        return;
      }

      let valuesParsed = { ...userData.data };

      if (validateRole(role.name, ROLES.PATIENT)) {
        valuesParsed = removeKeysFromObject(valuesParsed, [
          'observations',
          'telephone',
        ]);

        valuesParsed = {
          ...valuesParsed,
          teaDegreeId: userData?.data?.teaDegree?.id,
          phaseId: userData?.data?.currentPhase?.id,
          tutorId: userData?.data?.tutor?.id,
        };
      }

      setFields(
        FormCreateUserSchema.parse({
          ...valuesParsed,
          id: String(userData?.data?.id),
          birthday: dayjs(userData?.data?.birthday),
          image: '',
        }),
      );
    } else {
      setFields(
        FormCreateUserSchema.parse({
          ...data,
          id: String(data?.id),
        }),
      );
    }

    setCurrentRoleSelected(role);
    setIsEdit(true);
    setLoadingEdit(false);
  }, [id, setCurrentRoleSelected, setFields, setIsEdit]);

  return {
    userNotFound,
    error,
    loadingEdit,
    GetUser,
    setLoadingEdit,
  };
};
