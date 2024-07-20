import type { Config } from 'tailwindcss';

import { breakpoints } from './src/shared/breakpoints';

const tailwindConfig: Config = {
  content: [
    // "./src/cms/components/**/*.{js,ts,jsx,tsx,mdx}",
    './src/app/**/*.{js,ts,jsx,tsx,mdx,html}',
  ],
  safelist: [
    // Rich text formatting
    'text-start',
    'text-center',
    'text-end',
    'text-justify',
  ],
  theme: {
    screens: {
      xs: `${breakpoints.xs}px`,
      sm: `${breakpoints.sm}px`,
      md: `${breakpoints.md}px`,
      lg: `${breakpoints.lg}px`,
      xl: `${breakpoints.xl}px`,
      '2xl': `${breakpoints['2xl']}px`,
      '3xl': `${breakpoints['3xl']}px`,
      '4xl': `${breakpoints['4xl']}px`,
    },
    fontSize: {
      h1: [
        '6rem',
        {
          lineHeight: '1.3',
          letterSpacing: '0.175rem',
        },
      ],
      h2: [
        '4.5rem',
        {
          lineHeight: '1.3',
          letterSpacing: '0.135rem',
        },
      ],
      h3: [
        '3.75rem',
        {
          lineHeight: '1.3',
          letterSpacing: '0.1rem',
        },
      ],
      h4: [
        '3rem',
        {
          lineHeight: '1.3',
          letterSpacing: '0.0875rem',
        },
      ],
      h5: [
        '2.5rem',
        {
          lineHeight: '1.4',
          letterSpacing: '0.073rem',
        },
      ],
      h6: [
        '2rem',
        {
          lineHeight: '1.4',
          letterSpacing: '0.06rem',
        },
      ],
      '3xl': [
        '1.5rem',
        {
          lineHeight: '1.4',
          letterSpacing: '0.044rem',
        },
      ],
      '3xl-desktop': [
        '1.625rem',
        {
          lineHeight: '1.4',
          letterSpacing: '0.05rem',
        },
      ],
      '2xl': [
        '1.375rem',
        {
          lineHeight: '1.4',
          letterSpacing: '0.04rem',
        },
      ],
      '2xl-desktop': [
        '1.5rem',
        {
          lineHeight: '1.4',
          letterSpacing: '0.045rem',
        },
      ],
      xl: [
        '1.25rem',
        {
          lineHeight: '1.4',
          letterSpacing: '0.035rem',
        },
      ],
      'xl-desktop': [
        '1.375rem',
        {
          lineHeight: '1.4',
          letterSpacing: '0.039rem',
        },
      ],
      lg: [
        '1.125rem',
        {
          lineHeight: '1.4',
          letterSpacing: '0.032rem',
        },
      ],
      'lg-desktop': [
        '1.25rem',
        {
          lineHeight: '1.4',
          letterSpacing: '0.036rem',
        },
      ],
      base: [
        '1rem',
        {
          lineHeight: '1.4',
          letterSpacing: '0.029rem',
        },
      ],
      'base-desktop': [
        '1.125rem',
        {
          lineHeight: '1.4',
          letterSpacing: '0.032rem',
        },
      ],
      sm: [
        '0.875rem',
        {
          lineHeight: '1.4',
          letterSpacing: '0.025rem',
        },
      ],
      'sm-desktop': [
        '1rem',
        {
          lineHeight: '1.4',
          letterSpacing: '0.028rem',
        },
      ],
      xs: [
        '0.75rem',
        {
          lineHeight: '1.4',
          letterSpacing: '0.022rem',
        },
      ],
      'xs-desktop': [
        '0.875rem',
        {
          lineHeight: '1.4',
          letterSpacing: '0.025rem',
        },
      ],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      orchid: '#FFFDF3',
      lemongrass: '#AAD891',
      mallard: '#1C3516',
      mahogany: '#5D0E08',
      navy: '#112337',
      sky: '#147DF8',
      gray: {
        50: '#F9F9F9',
        400: '#999999',
        600: '#515151',
        800: '#262626',
      },
    },
    extend: {},
  },
  plugins: [],
};

export default tailwindConfig;
