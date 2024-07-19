import type { Access } from 'payload';

import { anyAdminAccess } from '@cms/access';

export const anyAdminAndUserAccess: Access = (args) => {
  if (args.req.user) {
    if (anyAdminAccess(args)) return true;

    return { id: { equals: args.req.user.id } };
  }

  return false;
};
