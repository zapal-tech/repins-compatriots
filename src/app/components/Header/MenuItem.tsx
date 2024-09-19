'use client';

import { mobileMenuToggleId } from '@app/constants';

import { Header } from '@cms/types/generated-types';

import { CMSLink } from '../CMSLink';
import { Text } from '../Text';

const handlerClick = () => {
  const mobileMenuToggle = document.getElementById(mobileMenuToggleId) as HTMLInputElement | null;
  if (mobileMenuToggle?.checked) mobileMenuToggle.click();
};

export const MenuItem: React.FC<{ link: Header['navItems'][0]['link'] }> = ({ link }) => (
  <Text className="transition-colors hover:text-mallard" onClick={handlerClick}>
    <CMSLink {...link} isHeaderLink />
  </Text>
);
