export const checkPermissions = (
  userPermissions: any,
  permissionCheck = [],
) => {
  if (!userPermissions) return false;

  /** No permissions required
   */
  if (!permissionCheck) {
    return true;
  }

  if (!Array.isArray(permissionCheck)) {
    permissionCheck = permissionCheck;
  }

  return permissionCheck.some((p) => userPermissions.includes(p));
};

export const checkRole = (userRole: any, rolesCheck = []) => {
  if (!userRole) return false;

  /** No roles required
   */
  if (!rolesCheck) {
    return true;
  }

  if (!Array.isArray(rolesCheck)) {
    rolesCheck = [rolesCheck];
  }

  return rolesCheck.some((p) => userRole.includes(p));
};
