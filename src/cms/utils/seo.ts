import { GenerateTitle } from '@payloadcms/plugin-seo/types';
import { appName } from '@shared';

export const generateTitle: GenerateTitle = ({ doc }) => {
  const suffix = appName;
  const separator = ' | ';
  const title = (doc as any)?.title?.value as string | undefined;

  if (typeof title === 'string' && title) return `${title}${separator}${suffix}`;

  return suffix;
};
