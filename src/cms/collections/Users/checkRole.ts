import type { User } from '@cms/types/generated-types';

export const checkRole = (allRoles: User['roles'] = [], user?: User | null): boolean => {
  if (user && allRoles && allRoles.some((role) => user?.roles?.some((individualRole) => individualRole === role)))
    return true;

  return false;
};
