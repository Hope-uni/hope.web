// import { useSession } from 'next-auth/react';
import { useSessionMock } from '../../__mocks__/userSession';

export default function usePermission() {
  const {
    data: {
      user: { role: permissions },
    },
  } = useSessionMock();

  const rolUser = permissions?.name;
  const permissionsUser = permissions?.permissions.map((p: any) => p.name);

  return {
    permissions: permissionsUser,
    roles: [rolUser],
  };
}
