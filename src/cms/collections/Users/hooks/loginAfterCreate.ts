import { CollectionAfterChangeHook } from 'payload';

import { Collection } from '@cms/types';

export const loginAfterCreate: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
  req: { data, user, payload },
}) => {
  if (operation === 'create' && !user && data) {
    try {
      const { username, email, password } = data;

      const isValidUsername = username && typeof username === 'string';
      const isValidEmail = username && typeof username === 'string';

      if ((isValidUsername || isValidEmail) && password) {
        const { token, user } = await payload.login({
          collection: Collection.Users,
          data:
            // @ts-expect-error username and email are exclusive
            username ? { username, password } : { email, password },
          req,
        });

        return { ...doc, token, user };
      }
    } catch (error) {
      payload.logger.error('Login after create error', error);
    }
  }

  return doc;
};
