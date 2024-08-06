'use client';

import { ForwardedRef, forwardRef } from 'react';
import clsx from 'clsx';

import { CMSLink } from '@app/components/CMSLink';
import { Text } from '@app/components/Text';

import { mobileMenuToggleId } from '@app/constants';

import { LinkData } from '@cms/types/fields/link';

type NavigationLinkProps = LinkData & {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  button?: boolean;
  active?: boolean;
  href?: string;
  hrefLang?: string;
  closeMenuOnClick?: boolean;
  onClick?: React.MouseEventHandler;
  absolute?: boolean;
};

export const NavigationLink = forwardRef<HTMLAnchorElement | HTMLButtonElement, NavigationLinkProps>(
  (
    {
      children,
      className,
      active,
      button,
      href = '',
      hrefLang,
      onClick,
      absolute,
      closeMenuOnClick = true,
      ...linkProps
    },
    ref,
  ) => {
    const Element = button ? 'button' : CMSLink;

    const handleClick: React.MouseEventHandler = (e) => {
      if (closeMenuOnClick) {
        const mobileMenuToggle = document.getElementById(mobileMenuToggleId) as HTMLInputElement | null;

        if (mobileMenuToggle?.checked) mobileMenuToggle.click();
      }

      button && onClick?.(e);
    };

    return (
      <Element
        ref={ref as ForwardedRef<HTMLButtonElement>}
        onClick={handleClick}
        hrefLang={button ? undefined : hrefLang}
        className={clsx(
          absolute ? 'absolute' : 'relative',
          `outline-none transition-colors duration-200 ease-in-out before:pointer-events-none before:absolute
          before:bottom-0 before:left-0 before:h-0.5 before:w-full before:origin-center-right before:scale-x-0
          before:bg-current before:transition-transform before:duration-200 before:will-change-transform
          hover:before:origin-center-left hover:before:scale-x-100 focus-visible:text-black
          focus-visible:before:origin-center-left focus-visible:before:scale-x-100 group-hover:text-black`,
          active ? 'xl:text-black' : 'xl:text-gray-400',
          className,
        )}
        {...linkProps}
        label={undefined}
        type={button ? 'button' : (linkProps.type as 'button')}
      >
        <Text tag="span" noWrap size="lg" className="pointer-events-none">
          {linkProps.label || children}
        </Text>
      </Element>
    );
  },
);

NavigationLink.displayName = 'NavigationLink';
