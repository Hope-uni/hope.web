import { Show } from '@/components/Show';
import EditUserForm from '@/components/user/form/EditUserForm';
import CreateUserForm from '@/components/user/form/CreateUserForm';
import { useFetchCatalogInitCreateUserQuery } from '@/lib/queries/user';
import SkeletonFormCreateUser from '@/components/user/form/skeletons/SkeletonFormCreateUser';
import { useFormCreateUserStore } from '@/lib/store/formCreateUser';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface Props {
  isEdit?: boolean;
}

export default function UserForm({ isEdit = false }: Props) {
  const {
    setRoleList,
    setPhaseList,
    setDegreeList,
    setTutorList,
    setInitCurrentRole,
  } = useFormCreateUserStore();
  const [queryRole, queryPhase, queryDegree, queryTutor] =
    useFetchCatalogInitCreateUserQuery();

  const query = useSearchParams();
  const roleParam = query.get('role');

  const loading = useMemo(
    () =>
      !(
        !queryRole.isLoading &&
        !queryPhase.isLoading &&
        !queryDegree.isLoading &&
        !queryTutor.isLoading
      ),
    [
      queryRole.isLoading,
      queryPhase.isLoading,
      queryDegree.isLoading,
      queryTutor.isLoading,
    ],
  );

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
          <Show.When isTrue={!isEdit}>
            <CreateUserForm />
          </Show.When>
          <Show.Else>
            <EditUserForm />
          </Show.Else>
        </Show>
      ) : (
        <SkeletonFormCreateUser />
      )}
    </>
  );
}
