import { PayloadLexicalReactContent } from '@zapal/payload-lexical-react';
import clsx from 'clsx';

import { getDictionary } from '@app/i18n';

import { columnNamePrefix } from '@cms/editor/blocks/columns';

import { Locale } from '@shared/i18n';

import { FeedbackForm } from '../FeedbackForm';
import { LexicalRenderer } from '../LexicalRenderer';

import { BackgroundImage } from './Blocks/BackgroundImage';
import { Partners } from './Blocks/Partners';

export const RichText: React.FC<
  Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & { children: any; invert?: boolean; locale?: Locale }
> = ({ children, className, invert, locale, ...props }) => (
  <div
    className={clsx(
      `mx-auto flex w-full flex-col gap-y-4 xl:gap-y-8 [&_ol]:list-inside [&_ol]:list-decimal [&_ul]:list-inside
      [&_ul]:list-disc`,
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
                    <LexicalRenderer
                      blocks={{
                        feedbackForm: async ({ fields }: any = {}) => {
                          if (!locale) return <div>Error</div>;
                          const dict = await getDictionary(locale);
                          return (
                            <div>
                              <FeedbackForm dictionary={dict.feedback.form} />
                            </div>
                          );
                        },
                      }}
                    >
                      {column}
                    </LexicalRenderer>
                  </div>
                ))}
              </div>
            );
          },
          partners: ({ fields }: any = {}) => {
            return <Partners />;
          },
          feedbackForm: async ({ fields }: any = {}) => {
            if (!locale) return <div>Error</div>;
            const dict = await getDictionary(locale);
            return (
              <div>
                <FeedbackForm dictionary={dict.feedback.form} />
              </div>
            );
          },
          youtube: ({ fields }: any = {}) => {
            return (
              <div className="aspect-video">
                {fields?.youtubeId && (
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    src={`https://www.youtube-nocookie.com/embed/${fields?.youtubeId}?modestbranding=1&amp;rel=0`}
                    title="YouTube video player"
                    width="100%"
                    height="100%"
                    className="h-full w-full border-0"
                  />
                )}
              </div>
            );
          },
          backgroundImage: ({ fields }: any = {}) => {
            return <BackgroundImage fields={fields} />;
          },
        }}
      >
        {children as PayloadLexicalReactContent}
      </LexicalRenderer>
    )}
  </div>
);
