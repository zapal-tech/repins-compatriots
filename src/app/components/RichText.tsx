import { PayloadLexicalReactContent } from '@zapal/payload-lexical-react';
import clsx from 'clsx';

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
        }}
      >
        {children as PayloadLexicalReactContent}
      </LexicalRenderer>
    )}
  </div>
);
