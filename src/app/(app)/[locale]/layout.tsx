import type { Metadata } from 'next';

// import font from 'next/font/local';

import '@app/styles/globals.css';

import { dir } from 'i18next';

// import { Header } from '@app/components/Header';
// import { Footer } from '@app/components/Footer';

import { Locale, locales } from '@shared/i18n';
import { generatePageTitle } from '@shared/seo';

// const nameFont = font({
// });

export const metadata: Metadata = {
  title: generatePageTitle(),
  description: 'Крафтові чаї',
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
};

const RootLayout = ({ children, params: { locale } }: RootLayoutProps) => (
  <html lang={locale} dir={dir(locale)} /* className={nameFont.className} */>
    <body>
      {/* <Header locale={locale} /> */}
      {children}
      {/* <Footer locale={locale} /> */}
    </body>
  </html>
);

export const generateStaticParams = (): RootLayoutProps['params'][] => locales.map((locale) => ({ locale }));

export default RootLayout;
