import clsx from 'clsx';

import { HeroType } from '@cms/types';
import { Page } from '@cms/types/generated-types';

import { Gutter } from '../Gutter';
import { Media } from '../Media';
import { RichText } from '../RichText';

export const Hero: React.FC<Page['hero']> = ({ media, richText, type }) => {
  if (type === 'none') return null;

  const containerStyles = {
    lg: 'h-[100vh]',
    md: 'h-max min-h-64',
    sm: '',
  };
  const containerStyle = containerStyles[type];

  return (
    <div className="relative pt-12 xl:pt-20">
      <div className={clsx('relative', containerStyle)}>
        {[HeroType.Large, HeroType.Medium].includes(type as HeroType) && media && typeof media === 'object' ? (
          <Media
            className="size-full overflow-hidden"
            imgClassName={clsx(
              'w-full',
              type === HeroType.Large ? 'h-full object-cover' : 'min-h-64 object-cover sm:object-contain',
              type === HeroType.Medium && '',
            )}
            resource={media}
            unoptimized
          />
        ) : null}

        <RichText
          className={clsx(
            'flex size-full max-w-full flex-col justify-end px-4 py-6 xl:px-12 xl:py-8',
            [HeroType.Large, HeroType.Medium].includes(type as HeroType) && 'absolute bottom-0 text-white',
          )}
        >
          {richText}
        </RichText>
      </div>
    </div>
  );
};
