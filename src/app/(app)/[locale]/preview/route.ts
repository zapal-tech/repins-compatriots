import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

import { getMe } from '@app/utils/auth';

import { UserRole } from '@cms/types';

import { generatePreviewHmac } from '@cms/utils/preview';

import { token } from '@shared/token';

export async function GET(
  req: Request & {
    cookies: {
      get: (name: string) => {
        value: string;
      };
    };
  },
): Promise<Response> {
  const tokenCookie = req.cookies.get(token)?.value;

  const { searchParams } = new URL(req.url);

  const url = searchParams.get('url');
  const secret = searchParams.get('secret');

  if (!url) return new Response('No URL provided', { status: 404 });
  if (!tokenCookie) new Response('You are not allowed to preview this page', { status: 403 });

  const { user } = await getMe();

  if (
    !user ||
    !user.roles?.some((role) => [UserRole.Root, UserRole.Admin, UserRole.AdminDB].includes(role as UserRole))
  ) {
    draftMode().disable();

    return new Response('You are not allowed to preview this page', { status: 403 });
  }

  if (secret !== generatePreviewHmac(url)) return new Response('Invalid token', { status: 401 });

  draftMode().enable();
  redirect(url);
}
