'use client';

import React, { FormEvent } from 'react';

import { Input } from '@app/components/Input';
import { Text } from '@app/components/Text';

type FeedbackFormProps = {
  dictionary: {
    firstName: string;
    email: string;
    link: string;
    comment: string;
    message: {
      sending: string;
      error: string;
      done: string;
    };
    submit: string;
  };
};

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ dictionary }) => {
  const [message, setMessage] = React.useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage(dictionary.message.sending);

    const formData = new FormData(event.currentTarget);

    const response = await fetch('/api/last-names/send-email-feedback', {
      method: 'POST',
      body: JSON.stringify({ ...Object.fromEntries(formData) }),
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
        <Input name="firstName" type="text" label={dictionary.firstName} required />

        <Input name="link" type="text" label={dictionary.link} required />

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

        <button type="submit" className="mb-6 block w-full rounded-full bg-mallard p-5 text-center text-gray-50">
          <Text>{dictionary.submit}</Text>
        </button>

        <Text className="mb-5 text-center">{message}</Text>
      </form>
    </div>
  );
};
