import { createElement } from 'react';
import clsx from 'clsx';

type Size = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | '3xl' | '2xl' | 'xl' | 'lg' | 'base' | 'sm' | 'xs';

type DefaultProps = {
  children?: React.ReactNode;
  className?: string;
  // Size
  size?: Size;
  // Style
  italic?: boolean;
  // Decoration
  underline?: boolean;
  // Whitespace
  noWrap?: boolean;
  // Transform
  uppercase?: boolean;
  // Align
  start?: boolean;
  center?: boolean;
  end?: boolean;
  justify?: boolean;
};

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type ParagraphTag = 'p';
type SpanTag = 'span';
type LabelTag = 'label';

type HeadingProps = { tag?: HeadingTag };
type ParagraphProps = { tag?: ParagraphTag };
type SpanProps = { tag?: SpanTag };
type LabelProps = { tag?: LabelTag; htmlFor?: string };

export type TextProps = DefaultProps &
  (HeadingProps | ParagraphProps | SpanProps | LabelProps) &
  React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement | HTMLLabelElement>;

const sizes: Record<Size, string> = {
  h1: 'text-h4 font-semibold break-words hyphens-auto sm:text-h2 lg:text-h1 lg:font-medium',
  h2: 'text-h5 font-semibold break-words hyphens-auto sm:text-h3 lg:text-h2',
  h3: 'text-h6 font-semibold break-words hyphens-auto sm:text-h4 lg:text-h3',
  h4: 'text-3xl font-semibold break-words hyphens-auto sm:text-h5 lg:text-h4',
  h5: 'text-2xl font-semibold break-words hyphens-auto sm:text-h6 lg:text-h5',
  h6: 'text-xl font-semibold break-words hyphens-auto sm:text-3xl lg:text-h6',
  '3xl': 'text-3xl lg:text-3xl-desktop font-semibold',
  '2xl': 'text-2xl lg:text-2xl-desktop font-semibold',
  xl: 'text-xl lg:text-xl-desktop font-semibold',
  lg: 'text-lg lg:text-lg-desktop font-medium',
  base: 'text-base lg:text-base-desktop font-medium',
  sm: 'text-sm lg:text-sm-desktop font-normal',
  xs: 'text-xs lg:text-xs-desktop font-semibold',
};

export const Text: React.FC<TextProps> = ({
  tag = 'p',
  children,
  className,
  size,
  italic,
  underline,
  noWrap,
  uppercase,
  start,
  center,
  end,
  justify,
  ...props
}) =>
  createElement(
    tag,
    {
      ...props,
      className: clsx(
        noWrap && 'whitespace-nowrap',
        !noWrap && 'whitespace-pre-wrap',
        italic && 'italic',
        uppercase && 'uppercase',
        underline && 'underline',
        start && 'text-start',
        center && 'text-center',
        end && 'text-end',
        justify && 'text-justify',
        sizes[(size ? size : tag.startsWith('h') ? tag : 'base') as Required<TextProps>['size']],
        className,
      ),
    },
    children,
  );
