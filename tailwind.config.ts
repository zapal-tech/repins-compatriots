import type { Config } from 'tailwindcss';

import { breakpoints } from './src/shared/breakpoints';

const tailwindConfig: Config = {
  content: [
    // "./src/cms/components/**/*.{js,ts,jsx,tsx,mdx}",
    './src/app/**/*.{js,ts,jsx,tsx,mdx,html}',
  ],
  safelist: [
    // Mobile menu
    'overflow-hidden',
    'overflow-auto',
    'left-0',
    'opacity-0',
    'opacity-100',
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
    fontFamily: {
      sans: ['var(--e-ukraine-font)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      mono: ['var(--cascadia-mono-font)', 'monospace'],
    },
    fontSize: {
      h1: [
        '1.5rem',
        {
          lineHeight: '1.1',
          letterSpacing: '-0.125rem',
        },
      ],
      'h1-desktop': [
        '2.75rem',
        {
          lineHeight: '1.1',
          letterSpacing: '-0.125rem',
        },
      ],
      h2: [
        '1.25rem',
        {
          lineHeight: '1.15',
          letterSpacing: '-0.06rem',
        },
      ],
      'h2-desktop': [
        '1.5rem',
        {
          lineHeight: '1.15',
          letterSpacing: '-0.06rem',
        },
      ],
      h3: [
        '1.15rem',
        {
          lineHeight: '1.2',
          letterSpacing: '-0.05rem',
        },
      ],
      'h3-desktop': [
        '1.25rem',
        {
          lineHeight: '1.2',
          letterSpacing: '-0.05rem',
        },
      ],
      lg: ['1.125rem', { lineHeight: '1.1' }],
      'lg-desktop': ['1.25rem', { lineHeight: '1.1' }],
      base: ['1rem', { lineHeight: '1.1' }],
      'base-desktop': ['1.125rem', { lineHeight: '1.1' }],
      sm: ['0.875rem', { lineHeight: '1.1' }],
      'sm-desktop': ['1rem', { lineHeight: '1.1' }],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      black: '#000000',
      'white-orchid': '#FFFDF3',
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
    extend: {
      transformOrigin: {
        'center-left': 'left center',
        'center-right': 'right center',
      },
    },
  },
};

export default tailwindConfig;
