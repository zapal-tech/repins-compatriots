import { BasePayload } from 'payload';

import { Collection } from '@cms/types';

import { ExistListType } from './types';

export const getExistTown = async (payload: BasePayload) => {
  try {
    const towns = (await payload.find({ collection: Collection.Towns })).docs;

    const existTown: ExistListType = {};

    towns.forEach((town) => {
      existTown[town.name] = town.id;
    });

    return existTown;
  } catch (error) {
    payload.logger.error(error);
  }

  return {};
};

export const getExistArchive = async (payload: BasePayload) => {
  try {
    const archives = (await payload.find({ collection: Collection.Archives })).docs;

    const existArchive: ExistListType = {};

    archives.forEach((archive) => {
      existArchive[archive.shortName] = archive.id;
    });

    return existArchive;
  } catch (error) {
    payload.logger.error(error);
  }

  return {};
};

export const getExistArchiveWithFund = async (payload: BasePayload) => {
  try {
    const funds = (await payload.find({ collection: Collection.Funds, depth: 2 })).docs;

    const existArchiveWithFund: ExistListType = {};

    funds.forEach((fund) => {
      if (typeof fund.archive === 'object')
        existArchiveWithFund[`${fund.archive.shortName}:${fund.shortName}`] = fund.id;
    });

    return existArchiveWithFund;
  } catch (error) {
    payload.logger.error(error);
  }

  return {};
};
