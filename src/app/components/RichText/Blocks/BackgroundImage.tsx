import React from 'react';
import clsx from 'clsx';

import { LexicalRenderer } from '@app/components/LexicalRenderer';
import { Media } from '@app/components/Media';

import { columnNamePrefix } from '@cms/editor/blocks/columns';

export const BackgroundImage: React.FC<{ fields: any }> = ({ fields }: any = {}) => {
  const minHeight = fields?.minHeight;
  const fullScreen = fields?.fullScreen;
  const richTextPosition = fields?.richTextPosition || 'top';

  const eclipseType = fields?.eclipseType;
  const eclipseOpacity = fields?.eclipseOpacity;

  return (
    <div className={clsx('relative block h-max w-full', fields?.textColor === 'white' && 'text-gray-50')}>
      {minHeight && (
        <div className={clsx('absolute h-full', fullScreen ? 'left-1/2 w-dvw -translate-x-1/2' : 'w-full')}>
          <Media
            resource={fields?.image}
            imgClassName={clsx(
              'h-full bg-cover bg-repeat-y object-cover xl:min-h-0',
              fullScreen ? 'w-dvw' : 'w-full',
              eclipseType === 'full' && 'brightness-[0.3]',
            )}
            className={clsx(
              'absolute z-0 h-full overflow-hidden',
              fullScreen ? 'top-1/2 w-dvw -translate-y-1/2' : 'w-full',
            )}
          />
          <div
            className={clsx(
              'absolute top-0 z-10 size-full',
              fullScreen ? 'left-1/2 w-dvw -translate-x-1/2' : 'w-full',
              eclipseType === 'gradient' && 'bg-gradient-to-t from-black',
              eclipseType === 'gradient' && eclipseOpacity === '100' ? 'opacity-100' : '',
              eclipseType === 'gradient' && eclipseOpacity === '80' ? 'opacity-80' : '',
              eclipseType === 'gradient' && eclipseOpacity === '70' ? 'opacity-70' : '',
              eclipseType === 'gradient' && eclipseOpacity === '60' ? 'opacity-60' : '',
            )}
          />

          {fields?.richText && (
            <div className="relative -z-50 w-full select-none px-6 py-6 text-transparent md:px-8 md:py-10">
              <LexicalRenderer
                blocks={{
                  columns: ({ fields }: any = {}) => {
                    const columnsSizes = (fields.size as string).split(' ');
                    const gridSize = columnsSizes.reduce((acc, size) => acc + parseInt(size), 0);
                    const columnsToRender = columnsSizes.length;

                    const columns = Object.entries(fields as Record<string, any>)
                      .filter(
                        ([field]) =>
                          field.startsWith(columnNamePrefix) && parseInt(field[field.length - 1]) <= columnsToRender,
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
                }}
              >
                {fields?.richText}
              </LexicalRenderer>
            </div>
          )}
        </div>
      )}

      {!minHeight && (
        <div>
          <div
            className={clsx(
              'absolute top-0 z-10 size-full',
              fullScreen ? 'left-1/2 w-dvw -translate-x-1/2' : 'w-full',
              eclipseType === 'gradient' && 'bg-gradient-to-t from-black',
              eclipseType === 'gradient' && eclipseOpacity === '100' ? 'opacity-100' : '',
              eclipseType === 'gradient' && eclipseOpacity === '80' ? 'opacity-80' : '',
              eclipseType === 'gradient' && eclipseOpacity === '70' ? 'opacity-70' : '',
              eclipseType === 'gradient' && eclipseOpacity === '60' ? 'opacity-60' : '',
            )}
          />
          <Media
            resource={fields?.image}
            imgClassName={clsx(
              'h-full object-contain',
              fullScreen ? 'w-dvw' : 'w-full',
              eclipseType === 'full' && 'brightness-[0.3]',
            )}
            className={clsx('relative z-0 h-full', fullScreen ? 'left-1/2 w-dvw -translate-x-1/2' : 'w-full')}
          />
        </div>
      )}

      {fields?.richText && (
        <div
          className={clsx(
            'z-20 w-full px-6 py-6 md:px-8 md:py-10',
            minHeight ? 'relative' : 'absolute',
            richTextPosition === 'down' ? 'bottom-0' : richTextPosition === 'top' && 'top-0',
          )}
        >
          <LexicalRenderer
            blocks={{
              columns: ({ fields }: any = {}) => {
                const columnsSizes = (fields.size as string).split(' ');
                const gridSize = columnsSizes.reduce((acc, size) => acc + parseInt(size), 0);
                const columnsToRender = columnsSizes.length;

                const columns = Object.entries(fields as Record<string, any>)
                  .filter(
                    ([field]) =>
                      field.startsWith(columnNamePrefix) && parseInt(field[field.length - 1]) <= columnsToRender,
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
            }}
          >
            {fields?.richText}
          </LexicalRenderer>
        </div>
      )}
    </div>
  );
};
