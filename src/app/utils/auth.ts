import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Payload } from 'payload';

import { User } from '@cms/types/generated-types';

import { token as cookieToken } from '@shared/token';

import { getLocalApi } from './localApi';

export type Me = {
  user: User | null;
  token?: string;
};

export const getMe = async ({
  nullUserRedirect,
  validUserRedirect,
  localApi: localApiFromProps,
}: {
  nullUserRedirect?: string;
  validUserRedirect?: string;
  localApi?: Payload;
} = {}): Promise<Me> => {
  const headerStore = headers();
  const cookieStore = cookies();
  const token = cookieStore.get(cookieToken)?.value;
  const localApi = localApiFromProps || (await getLocalApi());

  const { user } = await localApi.auth({ headers: headerStore });

  if (validUserRedirect && user) redirect(validUserRedirect);
  if (nullUserRedirect && !user) redirect(nullUserRedirect);

  return { user: user as User | null, token };
};
