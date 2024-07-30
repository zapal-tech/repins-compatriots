'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import { Input } from '@app/components/Input';

type SearchFormProps = {
  labelInput: string;
  textButton: string;
  defaultValue?: string;
};

export const SearchForm: React.FC<SearchFormProps> = ({ labelInput, textButton, defaultValue }) => {
  const router = useRouter();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    router.push('/search?search=' + encodeURIComponent(formData.get('lastName') as string));
  }

  return (
    <form onSubmit={onSubmit} className="mb-20 flex flex-col items-center">
      <div className="w-full max-w-sm">
        <Input
          name="lastName"
          id="lastName"
          required
          label={labelInput}
          defaultValue={defaultValue}
          type="text"
          className="mb-8"
        />

        <button type="submit" className="w-full rounded-full bg-mallard py-4 text-white">
          {textButton}
        </button>
      </div>
    </form>
  );
};
