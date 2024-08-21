import clsx from 'clsx';

import { HeroType } from '@cms/types';
import { Page } from '@cms/types/generated-types';

import { Gutter } from '../Gutter';
import { Media } from '../Media';
import { RichText } from '../RichText';

export const Hero: React.FC<Page['hero']> = ({ media, richText, type, eclipseType, eclipseOpacity }) => {
  if (type === 'none') return null;

  const HeroTypeLarge = HeroType.Large;
  const HeroTypeMedium = HeroType.Medium;

  return (
    <div className="relative pt-12 xl:pt-20">
      <div
        className={clsx(
          'relative',
          HeroTypeLarge === type && 'h-[calc(100vh-47px)] xl:h-[calc(100vh-79px)]',
          HeroTypeMedium === type && 'min-h-[27rem] xl:h-[calc(100vh-79px)]',
        )}
      >
        {[HeroType.Large, HeroType.Medium].includes(type as HeroType) && media && typeof media === 'object' ? (
          <div className="size-full">
            <Media
              className={clsx('size-full overflow-hidden')}
              imgClassName={clsx(
                'relative z-0 w-full',
                type === HeroType.Large ? 'h-full object-cover' : 'min-h-[27rem] object-cover',
                type === HeroType.Medium && 'h-full object-cover',
                eclipseType === 'full' && 'brightness-[0.3]',
              )}
              resource={media}
              unoptimized
            />
            <div
              className={clsx(
                'absolute top-0 z-10 size-full',
                eclipseType === 'gradient' && 'bg-gradient-to-t from-black',
                eclipseType === 'gradient' && eclipseOpacity === '100' ? 'opacity-100' : '',
                eclipseType === 'gradient' && eclipseOpacity === '80' ? 'opacity-80' : '',
                eclipseType === 'gradient' && eclipseOpacity === '70' ? 'opacity-70' : '',
                eclipseType === 'gradient' && eclipseOpacity === '60' ? 'opacity-60' : '',
              )}
            />
          </div>
        ) : null}

        {type !== HeroType.Small ? (
          <RichText
            className={clsx(
              'flex size-full max-w-full flex-col justify-end px-4 py-6 xl:px-12 xl:py-8',
              [HeroType.Large, HeroType.Medium].includes(type as HeroType) && 'absolute bottom-0 z-20 text-white',
            )}
          >
            {richText}
          </RichText>
        ) : (
          <Gutter>
            <RichText
              className={clsx(
                'flex size-full max-w-full flex-col justify-end pt-6 xl:pt-8',
                [HeroType.Large, HeroType.Medium].includes(type as HeroType) && 'absolute bottom-0 text-white',
              )}
            >
              {richText}
            </RichText>
          </Gutter>
        )}
      </div>
    </div>
  );
};
