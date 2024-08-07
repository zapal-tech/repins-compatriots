'use client';

import clsx from 'clsx';

import { Text } from '@app/components/Text';

import { mobileMenuToggleId } from '@app/constants';

import { LinkData } from '@cms/types/fields/link';

type LanguageSwitcherButtonProps = LinkData & {
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

export const LanguageSwitcherButton: React.FC<LanguageSwitcherButtonProps> = ({
  children,
  className,
  active,
  button,
  onClick,
  absolute,
  closeMenuOnClick = true,
}) => {
  const handleClick: React.MouseEventHandler = (e) => {
    if (closeMenuOnClick) {
      const mobileMenuToggle = document.getElementById(mobileMenuToggleId) as HTMLInputElement | null;

      if (mobileMenuToggle?.checked) mobileMenuToggle.click();
    }

    button && onClick?.(e);
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        absolute ? 'absolute' : 'relative',
        'outline-none transition-colors duration-200 ease-in-out hover:text-mallard focus-visible:text-mallard',
        active ? 'text-black' : 'text-gray-400',
        className,
      )}
      type="button"
    >
      <Text tag="span" noWrap className="pointer-events-none">
        {children}
      </Text>
    </button>
  );
};
