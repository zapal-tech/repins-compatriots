import { createElement } from 'react';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  className?: string;
  tag?: React.ElementType;
  id?: string;
  // preventScroll?: boolean;
  ref?: React.Ref<HTMLElement>;
};

export const Gutter: React.FC<Props> = ({ children, className, tag = 'div', id, ref /* , preventScroll */ }) =>
  createElement(
    tag,
    {
      className: clsx(
        'mx-auto w-full max-w-screen-3xl px-4 sm:px-5',
        className,
      ) /* data-lenis-prevent={preventScroll} */,
      id,
      ref,
    },
    children,
  );
