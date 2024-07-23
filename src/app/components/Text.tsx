import { createElement } from 'react';
import clsx from 'clsx';

type Size = 'h1' | 'h2' | 'h3' | 'lg' | 'base' | 'sm';

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

type HeadingTag = 'h1' | 'h2' | 'h3';
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
  h1: 'text-h1 font-mono font-bold break-words hyphens-auto lg:text-h1-desktop',
  h2: 'text-h2 font-mono font-semibold break-words hyphens-auto lg:text-h2-desktop',
  h3: 'text-h3 font-mono font-bold break-words hyphens-auto lg:text-h3-desktop',
  lg: 'text-lg font-sans font-medium lg:text-lg-desktop',
  base: 'text-base font-sans font-regular lg:text-base-desktop',
  sm: 'text-sm font-sans font-regular lg:text-sm-desktop',
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
