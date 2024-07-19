export const getPathFromSlugArr = (slug: string[]) => `/${slug.join('/')}`;
export const getSlugArrFromPath = (path: string) => path.split('/').filter(Boolean);
