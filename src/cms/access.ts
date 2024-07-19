import { Access, FieldAccess, PayloadRequest } from 'payload';

import { checkRole } from '@cms/collections/Users/checkRole';

import { UserRole } from '@cms/types';

// Collections and Globals

export const rootAccess: Access = ({ req: { user } }) => checkRole([UserRole.Root], user);
export const anyAdminAccess: Access = ({ req: { user } }) => checkRole([UserRole.Root, UserRole.Admin], user);

export const anyoneAccess: Access = () => true;

export const anyAdminOrSignedInAccess: Access<any> = ({ req }) => {
  if (checkRole([UserRole.Root, UserRole.Admin], req.user)) return true;

  return !!req.user;
};

export const anyAdminOrPublishedAccess: Access = ({ req: { user } }) => {
  if (user && checkRole([UserRole.Root, UserRole.Admin], user)) return true;

  return { _status: { equals: 'published' } };
};

// Admin UI collections and globals access

type AdminAccess = ({ req }: { req: PayloadRequest }) => boolean | Promise<boolean>;

export const rootAdminUIAccess: AdminAccess = ({ req: { user } }) => checkRole([UserRole.Root], user);
export const anyAdminAdminUIAccess: AdminAccess = ({ req: { user } }) =>
  checkRole([UserRole.Root, UserRole.Admin], user);

// Field

export const rootFieldAccess: FieldAccess = ({ req: { user } }) => checkRole([UserRole.Root], user);
export const anyAdminFieldAccess: FieldAccess = ({ req: { user } }) => checkRole([UserRole.Root, UserRole.Admin], user);
