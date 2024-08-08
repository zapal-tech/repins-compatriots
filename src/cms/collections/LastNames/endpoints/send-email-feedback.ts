import { PayloadHandler } from 'payload';

import { Global } from '@cms/types';

import { senderEmail, senderName } from '@shared/email';

type TemplateProps = {
  userData: {
    firstName: string;
    link: string;
    email: string;
    comment: string;
  };
};

const templateEmail = ({ userData }: TemplateProps) => {
  return `Привіт!

Зворотній зв'язок від користувача:
Ім'я: ${userData.firstName}
E-mail: ${userData.email}
Посилання: ${userData.link}
Повідомлення: ${userData.comment}
`;
};

export const SendEmailFeedback: PayloadHandler = async ({ json, payload }): Promise<Response> => {
  // return new Response(JSON.stringify({ message: 'done!' }), { status: 200 });

  const data = await json?.();

  if (!data) return new Response(JSON.stringify({ error: 'Not found lastNameId' }), { status: 404 });

  let email: string | null = '-';

  email = (await payload.findGlobal({ slug: Global.Settings }))?.email as string;

  if (!email) return new Response(JSON.stringify({ error: 'Not found email' }), { status: 404 });

  const userData = {
    firstName: data.firstName,
    link: data.link,
    email: data.email,
    comment: data.comment,
  };

  const dataToEmail = {
    to: email,
    subject: `Зворотній зв'язок`,
    from: {
      name: senderName,
      address: senderEmail,
    },
    text: templateEmail({ userData }),
  };

  await payload.sendEmail(dataToEmail);

  return new Response(JSON.stringify({ message: 'done!', dataToEmail, data }), { status: 200 });
};
