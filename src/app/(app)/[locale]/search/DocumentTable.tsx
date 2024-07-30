'use client';

import React, { useEffect, useState } from 'react';

import { GroupData, redirectToDocument } from '@app/utils/groupDataByLastName';

import { Table } from '@app/components/Table';

type DictType = {
  search: {
    table: {
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
  title: string;
};

export const DocumentTable: React.FC<DocumentTableProps> = ({ data, dict, title }) => (
  <Table
    headers={[
      title,
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
        onClick: () => redirectToDocument(item[item.length - 1].id || ''),
      };
      return item;
    })}
  />
);
