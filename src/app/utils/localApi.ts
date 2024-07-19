import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';

export const getLocalApi = async () => await getPayloadHMR({ config });
