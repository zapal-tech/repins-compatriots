'use client';

import { ChangeEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { mobileMenuId, mobileMenuToggleId } from '@app/constants';

import classes from './index.module.scss';

export const MobileMenuButton: React.FC = () => {
  const [rootWrapper, setRootWrapper] = useState<null | HTMLElement>(null);
  const [mobileMenu, setMobileMenu] = useState<null | HTMLElement>(null);
  const mobileMenuToggleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (document) {
      setRootWrapper(document.querySelector('body'));
      setMobileMenu(document.getElementById(mobileMenuId));
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuToggleRef.current?.checked) mobileMenuToggleRef.current.click();
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ currentTarget }) => {
      if (!rootWrapper || !mobileMenu || !currentTarget) return;

      if ((currentTarget as HTMLInputElement).checked) {
        rootWrapper.classList.add('overflow-hidden');
        rootWrapper.classList.remove('overflow-auto');

        mobileMenu.classList.add('left-0');
        mobileMenu.classList.remove('left-full');

        mobileMenu.classList.add('opacity-100');
        mobileMenu.classList.remove('opacity-0');
      } else {
        rootWrapper.classList.add('overflow-auto');
        rootWrapper.classList.remove('overflow-hidden');

        mobileMenu.classList.add('left-full');
        mobileMenu.classList.remove('left-0');

        mobileMenu.classList.add('opacity-0');
        mobileMenu.classList.remove('opacity-100');
      }
    },
    [rootWrapper, mobileMenu],
  );

  return (
    <>
      <input
        ref={mobileMenuToggleRef}
        id={mobileMenuToggleId}
        onChange={handleChange}
        type="checkbox"
        className={clsx('hidden', classes.checkbox)}
      />

      <label htmlFor={mobileMenuToggleId} className={classes.label}>
        <span />
        <span />
        <span />
      </label>
    </>
  );
};
