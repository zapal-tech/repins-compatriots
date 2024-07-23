import { createElement } from 'react';
import clsx from 'clsx';

type Props = {
  tag?: React.ElementType;
  children: React.ReactNode;
  className?: string;
};

export const Grid: React.FC<Props> = ({ tag = 'div', children, className }) =>
  createElement(tag, { className: clsx('grid grid-cols-2 gap-5 sm:grid-cols-6 xl:grid-cols-12', className) }, children);
