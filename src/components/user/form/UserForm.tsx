import { Show } from '@/components/Show';
import CreateUserForm from '@/components/user/form/CreateUserForm';
import EditUserForm from '@/components/user/form/EditUserForm';
import SkeletonFormCreateUser from '@/components/user/form/skeletons/SkeletonFormCreateUser';
import { useGetUserForEdit } from '@/hooks/useGetUserForEdit';
import { useFetchCatalogInitCreateUserQuery } from '@/lib/queries/user';
import { useFormCreateUserStore } from '@/lib/store/forms/formCreateUser';
import { Button, Result } from 'antd';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  isEdit?: boolean;
  id?: string;
}

export default function UserForm({ isEdit = false, id }: Props) {
  const { t } = useTranslation();
  const {
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
  const { userNotFound, loadingEdit, GetUser, setLoadingEdit } =
    useGetUserForEdit(id);

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

  useEffect(() => {
    if (isEdit) {
      setLoadingEdit(true);
      GetUser();
    } else {
      setIsEdit(false);
    }
  }, [
    GetUser,
    id,
    isEdit,
    setCurrentRoleSelected,
    setFields,
    setIsEdit,
    setLoadingEdit,
  ]);

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
              subTitle={t('User.form.feedback.user_not_found')}
            />
          </Show.Else>
        </Show>
      ) : (
        <SkeletonFormCreateUser />
      )}
    </>
  );
}
