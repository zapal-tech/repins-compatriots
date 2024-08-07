import clsx from 'clsx';

import { HeroType } from '@cms/types';
import { Page } from '@cms/types/generated-types';

import { Media } from '../Media';
import { RichText } from '../RichText';

export const Hero: React.FC<Page['hero']> = ({ media, richText, type }) => {
  if (type === 'none') return null;

  const HeroTypeLarge = HeroType.Large;
  const HeroTypeMedium = HeroType.Medium;

  return (
    <div className="relative pt-12 xl:pt-20">
      <div
        className={clsx(
          'relative',
          HeroTypeLarge === type && 'xl:h-[calc(100vh-79px)]',
          HeroTypeMedium === type && 'min-h-64 xl:h-[calc(100vh-79px)]',
        )}
      >
        {[HeroType.Large, HeroType.Medium].includes(type as HeroType) && media && typeof media === 'object' ? (
          <Media
            className="size-full overflow-hidden"
            imgClassName={clsx(
              'w-full',
              type === HeroType.Large ? 'h-full object-cover' : 'min-h-64 object-cover',
              type === HeroType.Medium && 'h-full object-cover',
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
