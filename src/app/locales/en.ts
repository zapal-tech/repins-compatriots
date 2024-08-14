import { link } from 'fs';

export default {
  footer: {
    navigation: 'Navigation:',
    contacts: 'Contacts:',
    messengers: 'Messengers:',
  },
  search: {
    table: {
      lastName: 'Last name',
      originalLastName: 'Last name( original from document)',
      year: 'The year of information fixation',
      town: 'Town',
      address: 'Church attendance or address',
      populationGroup: 'Population group according to the document',
      socialStatus: 'Social status / background',
      docName: 'File name and link',
    },
    form: {
      label: 'Last name',
      submit: 'Search',
    },
    notFound: {
      title: 'Last name not found',
      description: 'Check the spelling',
    },
    content: {
      title: 'Start studying your family history',
      description:
        'If you are looking for your ancestors in our region or are simply interested in the local history of the ancient city of Chuguiv and nearby villages, then come to us! We will not search for you, we will help you master the wisdom of genealogy and finding information about your ancestors in archival sources, we will tell you about their varieties and features.Discover the fascinating world of family research!',
      linkText: 'How to start your research?',
    },
  },
  checkDoc: {
    helpRead: 'Help read',
    documentNumber: 'Sequence number',
    form: {
      title: 'Fill it out so we can help',
      firstName: 'First name',
      lastName: 'Lirst name',
      phone: 'Phone',
      email: 'Email',
      comment: 'Comment',
      submit: 'Send',
      message: {
        sending: 'Sending...',
        error: 'Something went wrong. Try again later',
        done: 'Request sent successfully',
      },
    },
  },
  feedback: {
    form: {
      firstName: 'First name',
      email: 'Email',
      link: 'Link',
      comment: 'Comment',
      submit: 'Send',
      message: {
        sending: 'Sending...',
        error: 'Something went wrong. Try again later',
        done: 'Request sent successfully',
      },
    },
  },
  error: {
    pageNotFound: 'Page not found',
  },
} as const;
