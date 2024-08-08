'use client';

import { useRouter } from 'next/navigation';

import { GroupData, redirectToDocument } from '@app/utils/groupDataByLastName';

import { Table } from '@app/components/Table';

type DictType = {
  search: {
    table: {
      lastName: string;
      originalLastName: string;
      year: string;
      town: string;
      address: string;
      populationGroup: string;
      socialStatus: string;
      docName: string;
    };
  };
};

type DocumentTableProps = {
  data: GroupData['data'];
  dict: DictType;
};

export const DocumentTable: React.FC<DocumentTableProps> = ({ data, dict }) => {
  const router = useRouter();

  return (
    <Table
      headers={[
        dict.search.table.lastName,
        dict.search.table.originalLastName,
        dict.search.table.year,
        dict.search.table.town,
        dict.search.table.address,
        dict.search.table.populationGroup,
        dict.search.table.socialStatus,
        dict.search.table.docName,
      ]}
      data={data.map((item) => {
        item[item.length - 1] = {
          ...item[item.length - 1],
          onClick: async () => {
            if (window) window.open(await redirectToDocument(item[item.length - 1].id || ''), '_blank');
          },
        };
        return item;
      })}
    />
  );
};
