/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import { generatePageMetadata, RootPage } from '@payloadcms/next/views';
import config from '@payload-config';
import { Metadata } from 'next';

// import { importMap } from '../importMap';

type Args = {
  params: {
    segments: string[];
  };
  searchParams: {
    [key: string]: string | string[];
  };
};

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

const Page = ({ params, searchParams }: Args) => RootPage({ config, params, searchParams });

export default Page;
