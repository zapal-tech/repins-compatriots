import path from 'path';
import { fileURLToPath } from 'url';
import { en } from 'payload/i18n/en';
import { uk } from 'payload/i18n/uk';
// import { formBuilderPlugin } from '@payloadcms/plugin-form-builder';
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs';
import { redirectsPlugin } from '@payloadcms/plugin-redirects';
import { searchPlugin } from '@payloadcms/plugin-search';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { s3Storage } from '@payloadcms/storage-s3';
import { appName } from '@shared';
import { buildConfig, Config } from 'payload';
import sharp from 'sharp';

import { Archives } from '@cms/collections/Archives';
import { Documents } from '@cms/collections/Documents';
import { Funds } from '@cms/collections/Funds';
import { LastNames } from '@cms/collections/LastNames';
import { Media } from '@cms/collections/Media';
import { MediaDocuments } from '@cms/collections/MediaDocuments';
import { OpenGraphImages } from '@cms/collections/OpenGraphImages';
import { Pages } from '@cms/collections/Pages';
import { Towns } from '@cms/collections/Towns';
import { Users } from '@cms/collections/Users';

import { Footer, Header, Settings } from '@cms/globals';

import { AdminPanelGroup, Collection, CollectionLabel, UserRole } from '@cms/types';
import { Page } from '@cms/types/generated-types';

import enTranslation from '@cms/locales/en';
import ukTranslation from '@cms/locales/uk';

import { cmsLocales } from '@cms/i18n';

import { editor } from '@cms/editor';
import { seedFromGoogleSheets } from '@cms/utils/seedFromGoogleSheets';
import { generateTitle } from '@cms/utils/seo';
import { generatePublicFileURL } from '@cms/utils/storage';

import { cmsSenderEmail, cmsSenderName } from '@shared/email';
import { isDev } from '@shared/env';
import { defaultLocale } from '@shared/i18n';
import { tokenName } from '@shared/token';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const email = process.env.USER_EMAIL || 'hello@zapal.tech';
const password = process.env.USER_PASSWORD || 'zapal';

const emailAdapter =
  isDev && process.env.SMTP_HOST && process.env.SMTP_PORT
    ? (await import('@payloadcms/email-nodemailer')).nodemailerAdapter({
        defaultFromAddress: cmsSenderEmail,
        defaultFromName: cmsSenderName,
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          secure: false,
        },
      })
    : (await import('@payloadcms/email-resend')).resendAdapter({
        defaultFromAddress: cmsSenderEmail,
        defaultFromName: cmsSenderName,
        apiKey: process.env.RESEND_API_KEY || '',
      });

const dbAdapter = (
  isDev
    ? (await import('@payloadcms/db-postgres')).postgresAdapter
    : (await import('@payloadcms/db-vercel-postgres')).vercelPostgresAdapter
)({
  pool: { connectionString: process.env.DATABASE_URL },
  migrationDir: path.resolve(dirname, 'src', 'cms', 'migrations'),
});

const payloadConfig: Config = {
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || '',
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: Collection.Users,
    components: {
      graphics: {
        Icon: '@cms/components/NavLogo#NavLogo',
        Logo: '@cms/components/Logo#Logo',
      },
    },
    dateFormat: 'dd.MM.yyyy HH:mm:ss',
    meta: {
      icons: [
        {
          type: 'image/x-icon',
          rel: 'icon',
          url: '/favicon.ico',
        },
      ],
      titleSuffix: ` | ${appName} CMS`,
    },
    autoLogin: isDev
      ? {
          email,
          password,
          prefillOnly: true,
        }
      : false,
  },
  upload: { defParamCharset: 'utf8' },
  collections: [Media, OpenGraphImages, Pages, Users, Documents, Funds, Archives, LastNames, Towns, MediaDocuments],
  globals: [Header, Footer, Settings],
  cookiePrefix: tokenName,
  cors: [process.env.NEXT_PUBLIC_SITE_URL || ''].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SITE_URL || ''].filter(Boolean),
  db: dbAdapter,
  editor,
  email: emailAdapter,
  i18n: {
    supportedLanguages: { en, uk },
    translations: {
      en: enTranslation,
      uk: ukTranslation,
    },
  },
  localization: {
    defaultLocale,
    fallback: false,
    locales: cmsLocales,
  },
  plugins: [
    s3Storage({
      bucket: process.env.S3_BUCKET_NAME || '',
      config: {
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
      },
      collections: {
        [Collection.Media]: {
          generateFileURL: generatePublicFileURL,
          prefix: 'public/media',
        },
        [Collection.MediaDocuments]: {
          generateFileURL: generatePublicFileURL,
          prefix: 'public/documents-media',
        },
        [Collection.OpenGraphImages]: {
          generateFileURL: generatePublicFileURL,
          prefix: 'public/open-graph-images',
        },
      },
    }),
    redirectsPlugin({
      collections: [Collection.Pages],
      overrides: {
        labels: CollectionLabel.Redirects,
        admin: {
          group: AdminPanelGroup.General,
        },
        fields: ({ defaultFields }) => defaultFields,
      },
    }),
    nestedDocsPlugin({
      collections: [Collection.Pages],
      generateLabel: (_, currentDoc) => currentDoc.title as string,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${(doc as any as Page).slug}`, ''),
    }),
    // formBuilder({
    //   fields: {
    //     checkbox,
    //     country: false,
    //     email,
    //     message: false,
    //     number,
    //     payment: false,
    //     select,
    //     state: false,
    //     text,
    //     textarea,
    //   },
    //   formOverrides: {
    //     fields: [richTextHTMLConvertedField('confirmationMessage')],
    //   },
    // }),
    seoPlugin({
      collections: [Collection.Pages],
      generateTitle,
      uploadsCollection: Collection.OpenGraphImages,
    }),
    searchPlugin({
      collections: [Collection.Documents, Collection.LastNames],
      defaultPriorities: {
        [Collection.LastNames]: 10,
        [Collection.Documents]: 20,
      },
      beforeSync: ({ originalDoc, searchDoc }) => ({
        ...searchDoc,
        title: originalDoc?.lastName,
        originalLastName: originalDoc?.originalLastName,
      }),
      searchOverrides: {
        labels: CollectionLabel.Search,
        admin: {
          group: AdminPanelGroup.General,
          description: {
            en: 'This is a collection of automatically created search results. These results are used by the global site search and will be updated automatically as documents in the CMS are created or updated.',
            uk: 'Це колекція автоматично створених результатів пошуку. Ці результати використовуються глобальним пошуком по сайту і оновлюються автоматично при створенні або оновленні документів в CMS.',
          },
        },
        fields: ({ defaultFields }) => [
          ...defaultFields,
          {
            admin: { readOnly: true },
            name: 'originalLastName',
            type: 'text',
          },
        ],
      },
    }),
  ],
  async onInit(payload) {
    if (isDev) {
      const existingUsers = await payload.find({ collection: Collection.Users, limit: 1 });

      if (existingUsers.docs.length === 0) {
        await payload.create({
          collection: Collection.Users,
          data: {
            email,
            password,
            firstName: 'Zapal',
            lastName: 'Tech',
            roles: [UserRole.Root],
          },
        });
      }
    }

    const existingLastNames = await payload.find({ collection: Collection.LastNames, limit: 1 });

    if (existingLastNames.docs.length === 0) await seedFromGoogleSheets(payload);
  },
  telemetry: isDev,
  // graphQL: { schemaOutputFile: path.resolve(dirname, 'src', 'cms', 'graphql', 'generated-schema.graphql') },
  typescript: { outputFile: path.resolve(dirname, 'src', 'cms', 'types', 'generated-types.ts') },
  sharp,
};

export default buildConfig(payloadConfig);
