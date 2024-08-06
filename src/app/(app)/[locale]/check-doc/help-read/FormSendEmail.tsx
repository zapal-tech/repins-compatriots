'use client';

import React, { FormEvent } from 'react';

import { Input } from '@app/components/Input';
import { Text } from '@app/components/Text';

type FormSendEmailProps = {
  lastNamesId: string | number;
  dictionary: {
    title: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    comment: string;
    submit: string;
    message: {
      sending: string;
      error: string;
      done: string;
    };
  };
};

export const FormSendEmail: React.FC<FormSendEmailProps> = ({ lastNamesId, dictionary }) => {
  const [message, setMessage] = React.useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage(dictionary.message.sending);

    const formData = new FormData(event.currentTarget);

    const response = await fetch('/api/last-names/send-email-help-read', {
      method: 'POST',
      body: JSON.stringify({ lastNameId: formData.get('lastNameId'), ...Object.fromEntries(formData) }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      setMessage(dictionary.message.error);
      return;
    }

    setMessage(dictionary.message.done);
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <form onSubmit={onSubmit} className="w-full max-w-full md:max-w-3xl">
        <Text tag="h2" size="h1" className="mb-6 text-center">
          {dictionary.title}
        </Text>

        <div className="flex flex-col gap-x-4 md:flex-row">
          <Input name="firstName" type="text" label={dictionary.firstName} required />

          <Input name="lastName" type="text" label={dictionary.lastName} required />
        </div>

        <Input name="phone" type="tel" label={dictionary.phone} required />

        <Input name="email" type="email" label={dictionary.email} required />

        <div className="mb-4 w-full">
          <Text tag="label" htmlFor="comment" size="sm" className="mb-1.5">
            {dictionary.comment}
          </Text>

          <textarea
            name="comment"
            rows={3}
            required
            className="w-full border border-gray-600 bg-transparent p-3 text-base focus:border-gray-800
              focus:ring-gray-800 xl:text-base-desktop"
          />
        </div>

        <input name="lastNameId" type="hidden" value={lastNamesId} />

        <button type="submit" className="mb-6 block w-full rounded-full bg-mallard p-5 text-center text-gray-50">
          <Text>{dictionary.submit}</Text>
        </button>

        <Text className="mb-24 text-center">{message}</Text>
      </form>
    </div>
  );
};
