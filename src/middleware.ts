import { i18nRouter } from 'next-i18n-router';
import { MiddlewareConfig, NextMiddleware } from 'next/server';

import i18nConfig from '../i18nConfig';

export const middleware: NextMiddleware = (request) => i18nRouter(request, i18nConfig);

export const config: MiddlewareConfig = {
  matcher: '/((?!api|sitemap|shop/sitemap|static|admin|payload|.*\\..*|_next).*)',
};
