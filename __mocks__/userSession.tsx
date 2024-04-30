export const useSessionMock = () => ({
  data: {
    user: {
      id: 1,
      username: 'hope',
      email: 'superadmin@hope.com',
      role: {
        id: 1,
        name: 'Superadmin',
        permissions: [
          {
            name: 'create_user',
          },
        ],
      },
    },
  },
});
