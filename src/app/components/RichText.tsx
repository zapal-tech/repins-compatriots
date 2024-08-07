import { PayloadLexicalReactContent } from '@zapal/payload-lexical-react';
import clsx from 'clsx';
import Image from 'next/image';

import { columnNamePrefix } from '@cms/editor/blocks/columns';

import { LexicalRenderer } from './LexicalRenderer';

export const RichText: React.FC<
  Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & { children: any; invert?: boolean }
> = ({ children, className, invert, ...props }) => (
  <div
    className={clsx(
      'mx-auto w-full flex-col gap-y-16 xl:gap-y-24',
      // invert && 'prose-invert',
      className,
    )}
    {...props}
  >
    {children && (
      <LexicalRenderer
        blocks={{
          columns: ({ fields }: any = {}) => {
            const columnsSizes = (fields.size as string).split(' ');
            const gridSize = columnsSizes.reduce((acc, size) => acc + parseInt(size), 0);
            const columnsToRender = columnsSizes.length;

            const columns = Object.entries(fields as Record<string, any>)
              .filter(
                ([field]) => field.startsWith(columnNamePrefix) && parseInt(field[field.length - 1]) <= columnsToRender,
              )
              .map(([, value]) => value);

            return (
              <div className={`grid grid-cols-1 gap-x-5 gap-y-6 xl:grid-cols-${gridSize}`}>
                {columns.map((column, idx) => (
                  <div key={`column-${idx}`} className={`xl:col-span-${columnsSizes[idx]} flex flex-col gap-6`}>
                    <LexicalRenderer>{column}</LexicalRenderer>
                  </div>
                ))}
              </div>
            );
          },
          partners: ({ fields }: any = {}) => {
            return (
              <div className="flex flex-wrap gap-x-20 gap-y-10 xl:justify-between">
                <Image
                  src={process.env.NEXT_PUBLIC_SITE_URL + '/partners/1.png'}
                  alt={'partners'}
                  width={190}
                  height={56}
                  unoptimized
                />
                <Image
                  src={process.env.NEXT_PUBLIC_SITE_URL + '/partners/2.png'}
                  alt={'partners'}
                  width={140}
                  height={56}
                  unoptimized
                />
                <Image
                  src={process.env.NEXT_PUBLIC_SITE_URL + '/partners/3.png'}
                  alt={'partners'}
                  width={114}
                  height={56}
                  unoptimized
                />
                <Image
                  src={process.env.NEXT_PUBLIC_SITE_URL + '/partners/4.png'}
                  alt={'partners'}
                  width={130}
                  height={56}
                  unoptimized
                />
                <Image
                  src={process.env.NEXT_PUBLIC_SITE_URL + '/partners/5.png'}
                  alt={'partners'}
                  width={56}
                  height={56}
                  unoptimized
                />
                <Image
                  src={process.env.NEXT_PUBLIC_SITE_URL + '/partners/6.png'}
                  alt={'partners'}
                  width={154}
                  height={56}
                  unoptimized
                />
              </div>
            );
          },
        }}
      >
        {children as PayloadLexicalReactContent}
      </LexicalRenderer>
    )}
  </div>
);
