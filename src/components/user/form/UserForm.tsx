import { Show } from '@/components/Show';
import CreateUserForm from '@/components/user/form/CreateUserForm';
import EditUserForm from '@/components/user/form/EditUserForm';
import SkeletonFormCreateUser from '@/components/user/form/skeletons/SkeletonFormCreateUser';
import { useFetchCatalogInitCreateUserQuery } from '@/lib/queries/user';
import { useFormCreateUserStore } from '@/lib/store/formCreateUser';
import { FormCreateUserSchema, Role } from '@/models/schema';
import { FindUserByIdService } from '@/services';
import {
  CurrentRoleTypeFindUser,
  FindUserByIdHelper,
} from '@/services/user/helpers';
import { Button, Result } from 'antd';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface Props {
  isEdit?: boolean;
  id?: string;
}

export default function UserForm({ isEdit = false, id }: Props) {
  const [userNotFound, setUserNotFound] = useState(false);
  const [error, setError] = useState('');
  const [loadingEdit, setLoadingEdit] = useState(false);
  const {
    currentRoleSelected,
    fields,
    setFields,
    setRoleList,
    setPhaseList,
    setDegreeList,
    setTutorList,
    setInitCurrentRole,
    setCurrentRoleSelected,
    setIsEdit,
  } = useFormCreateUserStore();

  const [queryRole, queryPhase, queryDegree, queryTutor] =
    useFetchCatalogInitCreateUserQuery(isEdit);

  const query = useSearchParams();
  const roleParam = query.get('role');

  const loading = useMemo(
    () =>
      !(
        !queryRole.isLoading &&
        !queryPhase.isLoading &&
        !queryDegree.isLoading &&
        !queryTutor.isLoading &&
        !loadingEdit
      ),
    [
      queryRole.isLoading,
      queryPhase.isLoading,
      queryDegree.isLoading,
      queryTutor.isLoading,
      loadingEdit,
    ],
  );

  const GetUser = useCallback(async () => {
    const { data, statusCode, message } = await FindUserByIdService(id);

    if (statusCode === 404 && !data) {
      setUserNotFound(true);
      return;
    }

    let role: Role = {
      id: 2,
      name: 'Admin',
    };

    // TODO stopper by backend
    /* if (!data || !data?.roles || data?.roles?.length === 0) {
      setUserNotFound(true);
      return;
    } */

    if (data && data?.roles && data?.roles?.length > 0) {
      role = data.roles[0];
    }

    if (role.name !== 'Admin') {
      const userData = await FindUserByIdHelper(
        role?.name as CurrentRoleTypeFindUser,
        data?.profileId,
      );

      if (userData.error) {
        setError(message);
        setUserNotFound(true);
        setLoadingEdit(false);
        return;
      }

      setFields(
        FormCreateUserSchema.parse({
          ...userData.data,
          id: String(userData?.data?.id),
          birthday: dayjs(userData?.data?.birthday),
          phoneNumber: String(userData?.data?.phoneNumber),
          telephone: String(userData?.data?.telephone),
        }),
      );
    } else {
      setFields(
        FormCreateUserSchema.parse({
          ...data,
          id: undefined,
        }),
      );
    }

    setCurrentRoleSelected(role);
    setIsEdit(true);
    setLoadingEdit(false);
  }, [id, setCurrentRoleSelected, setFields, setIsEdit]);

  useEffect(() => {
    if (isEdit) {
      setLoadingEdit(true);
      GetUser();
    } else {
      setIsEdit(false);
    }
  }, [GetUser, id, isEdit, setCurrentRoleSelected, setFields, setIsEdit]);

  useEffect(() => {
    if (!loading) {
      if (queryRole?.data) {
        const roleList = queryRole?.data.data || [];
        setRoleList(roleList);

        const currenRoleData = roleList.find(
          (role) => role.name.toLowerCase() === roleParam?.toLowerCase(),
        );

        if (currenRoleData) {
          setInitCurrentRole(currenRoleData.id);
        }
      }

      if (queryPhase?.data) {
        setPhaseList(queryPhase?.data.data || []);
      }

      if (queryDegree?.data) {
        setDegreeList(queryDegree?.data.data || []);
      }

      if (queryTutor?.data) {
        setTutorList(queryTutor?.data.data || []);
      }
    }
  }, [
    loading,
    roleParam,
    queryRole?.data,
    queryPhase?.data,
    queryDegree?.data,
    queryTutor?.data,
    setRoleList,
    setPhaseList,
    setDegreeList,
    setTutorList,
    setInitCurrentRole,
  ]);

  return (
    <>
      {!loading ? (
        <Show>
          <Show.When isTrue={!userNotFound}>
            <Show>
              <Show.When isTrue={!isEdit}>
                <CreateUserForm />
              </Show.When>
              <Show.Else>
                <EditUserForm />
              </Show.Else>
            </Show>
          </Show.When>
          <Show.Else>
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={<Button type="primary">Back Home</Button>}
            />
          </Show.Else>
        </Show>
      ) : (
        <SkeletonFormCreateUser />
      )}
    </>
  );
}
