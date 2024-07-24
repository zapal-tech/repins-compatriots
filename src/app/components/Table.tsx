import { createElement } from 'react';
import clsx from 'clsx';

import { Text } from './Text';

export type TableProps = {
  headers: string[];
  data: {
    title: string;
    onClick?: () => void;
  }[][];
  firstInRowIsRowHeading?: boolean;
};

export const Table: React.FC<TableProps> = ({ headers, data, firstInRowIsRowHeading = true }) => (
  <div className="relative overflow-x-auto">
    <table className="w-full text-start">
      <thead>
        <tr>
          {headers.map((header, idx) => (
            <Text
              tag="th"
              size="sm"
              key={`header-${idx}`}
              scope="col"
              className="h-full px-5 py-3 text-left align-text-bottom font-medium text-gray-600"
            >
              {header}
            </Text>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((rowData, idx) => (
          <tr key={`row-${idx}`}>
            {rowData.map(({ title, onClick }, cellIdx) => (
              <Text
                tag={firstInRowIsRowHeading && cellIdx === 0 ? 'th' : 'td'}
                size="sm"
                key={`cell-${cellIdx}`}
                scope={firstInRowIsRowHeading && cellIdx === 0 ? 'row' : undefined}
                className={clsx(
                  'px-5 py-4 text-left',
                  firstInRowIsRowHeading && cellIdx === 0 ? 'font-medium' : 'font-normal',
                  firstInRowIsRowHeading && cellIdx === 0 && !onClick && 'text-gray-600',
                  onClick && 'cursor-pointer text-sky',
                )}
                onClick={onClick}
              >
                {title}
              </Text>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
