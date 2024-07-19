import { createHmac } from 'crypto';

export const generatePreviewHmac = (data: string): string =>
  createHmac('sha512', process.env.DRAFT_SECRET || '')
    .update(data)
    .digest('base64url');

/**
 *
 * @param url The URL to generate a preview for (e.g. `/blog/${doc.slug}`)
 * @returns The preview URL
 */
export const generatePreviewURL = (url: string): string => {
  const fullUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${url}`;
  const uri = encodeURIComponent(fullUrl);
  const hmac = generatePreviewHmac(fullUrl);

  return `${process.env.NEXT_PUBLIC_SITE_URL}/preview?url=${uri}&secret=${hmac}`;
};
