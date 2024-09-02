import type { Metadata } from 'next';
import font from 'next/font/local';

import '@app/styles/globals.css';

import { GoogleAnalytics } from '@next/third-parties/google';
import clsx from 'clsx';

import { Footer } from '@app/components/Footer';
import { Header } from '@app/components/Header';

import { Locale, locales } from '@shared/i18n';
import { generatePageTitle } from '@shared/seo';

const eUkraineFont = font({
  src: [
    {
      path: '../../../../public/fonts/e-Ukraine/e-Ukraine-Regular.woff2',
      weight: '400',
    },
    {
      path: '../../../../public/fonts/e-Ukraine/e-Ukraine-Medium.woff2',
      weight: '500',
    },
  ],
  display: 'swap',
  variable: '--e-ukraine-font',
});

const cascadiaMonoFont = font({
  src: [
    {
      path: '../../../../public/fonts/CascadiaMono/CascadiaMono-SemiBold.woff2',
      weight: '600',
    },
    {
      path: '../../../../public/fonts/CascadiaMono/CascadiaMono-Bold.woff2',
      weight: '700',
    },
  ],
  display: 'swap',
  variable: '--cascadia-mono-font',
});

export const metadata: Metadata = {
  title: generatePageTitle(),
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
};

const RootLayout = ({ children, params: { locale } }: RootLayoutProps) => (
  <html lang={locale} className={clsx(eUkraineFont.variable, cascadiaMonoFont.variable)}>
    <body>
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
      <GoogleAnalytics gaId="G-SRZQ6QK012" />
    </body>
  </html>
);

export const generateStaticParams = (): RootLayoutProps['params'][] => locales.map((locale) => ({ locale }));

export default RootLayout;
