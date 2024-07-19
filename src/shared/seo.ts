import { appName } from '.';

export const generatePageTitle = (title?: string) => (title ? `${title} | ${appName}` : appName);
