import { addDataAndFileToRequest } from '@payloadcms/next/utilities';
import { PayloadHandler } from 'payload';

import { Collection, Global } from '@cms/types';
import { LastName } from '@cms/types/generated-types';

import { senderEmail, senderName } from '@shared/email';

type TemplateProps = {
  userData: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    comment: string;
  };
  lastName: LastName;
};

const templateEmail = ({ userData, lastName }: TemplateProps) => {
  return `Привіт!

Користувач не зміг прочитати документ з прізвищем ${lastName.lastName}. 
Посилання на документ: ${process.env.NEXT_PUBLIC_SITE_URL}/admin/collections/last-names/${lastName.id}

Контакти користувача:
Ім'я: ${userData.firstName}
Прізвище: ${userData.lastName}
E-mail: ${userData.email}
Телефон: ${userData.phone}
Коментар: ${userData.comment}
`;
};

export const SendEmailHelpRead: PayloadHandler = async ({ json, payload }): Promise<Response> => {
  return new Response(JSON.stringify({ message: 'done!' }), { status: 200 });

  // const data = await json?.();

  // if (!data || !data['lastNameId'])
  //   return new Response(JSON.stringify({ error: 'Not found lastNameId' }), { status: 404 });

  // let email: string | null = '-';
  // let lastName: LastName | null = null;

  // email = (await payload.findGlobal({ slug: Global.Settings }))?.email as string;
  // lastName = await payload.findByID({ collection: Collection.LastNames, id: data['lastNameId'] });

  // if (!email || !lastName)
  //   return new Response(JSON.stringify({ error: 'Not found email or lastName' }), { status: 404 });

  // const userData = {
  //   firstName: data.firstName,
  //   lastName: data.lastName,
  //   phone: data.phone,
  //   email: data.email,
  //   comment: data.comment,
  // };

  // const dataToEmail = {
  //   to: email,
  //   subject: `Проблеми з прочитанням документу`,
  //   from: {
  //     name: senderName,
  //     address: senderEmail,
  //   },
  //   text: templateEmail({ userData, lastName }),
  // };

  // await payload.sendEmail(dataToEmail);

  // return new Response(JSON.stringify({ message: 'done!', dataToEmail, data }), { status: 200 });
};
