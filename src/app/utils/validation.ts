import type { TFunction } from 'i18next';
import * as yup from 'yup';

type EmailValidation = {
  required?: string;
  email?: yup.Message<{ regex: RegExp }>;
  t?: TFunction<any, any>;
};

export const email = ({ required, email, t }: EmailValidation) =>
  yup
    .string()
    .email(email || t?.('email', { ns: 'Namespace.Validation' }))
    .test({
      test: (value) => !new RegExp(/((yandex\.com)|(\.ru))$/).test(value || ''),
      message: t?.('russianEmailDomain', { ns: 'Namespace.Validation' }),
    })
    .required(required || t?.('required', { ns: 'Namespace.Validation' }));

type StringValidation = {
  t: TFunction<any, any>;
  required?: string;
};

export const string = ({ t, required }: StringValidation) =>
  yup.string().required(required || t?.('required', { ns: 'Namespace.Validation' }));
