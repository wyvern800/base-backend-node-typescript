/* eslint-disable import/prefer-default-export */
/**
 * Parses the user role from numeric to text
 *
 * @param { number } role The role ID
 * @returns { string} The role name parsed
 */
export const getRole = (role: number): string => {
  switch (role) {
    case 2:
      return 'admin';
    case 1:
      return 'staff';
    default:
      return 'user';
  }
};
