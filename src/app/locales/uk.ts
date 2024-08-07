export default {
  footer: {
    navigation: 'Навігація:',
    contacts: 'Контакти:',
    messengers: 'Месенджери:',
  },
  search: {
    table: {
      lastName: 'Прізвище',
      originalLastName: 'Прізвище (мовою оригінала документу)',
      year: 'Рік фіксації інформації',
      town: 'Населений пункт',
      address: 'Прихід церкви або адреса',
      populationGroup: 'Група населення за документом',
      socialStatus: 'Соціальний статус / походження',
      docName: 'Назва та посилання на файл',
    },
    form: {
      label: 'Прізвище',
      submit: 'Шукати',
    },
    notFound: {
      title: 'Прізвище не знайдено',
      description: 'Перевірте правильність написання',
    },
    content: {
      title: 'Почніть вивчати історію своєї родини',
      description:
        'Якщо Ви шукаєте своїх предків у наших краях або просто цікавитесь локальною історією давнього міста Чугуїв та прилеглих сіл, то Вам до нас! Ми не будемо шукати для Вас, ми допоможемо Вам освоїти премудрості генеалогії та пошуку інформації про Ваших прародичів у архівних джерелах, розкажемо про їх різновиди та особливості.Відкрийте для себе захопливий світ родинних досліджень!',
      linkText: 'Як розпочати своє дослідження?',
    },
  },
  checkDoc: {
    helpRead: 'Допоможіть прочитати',
    documentNumber: 'Порядковий номер',
    form: {
      title: 'Заповніть, щоб ми змогли допомогти',
      firstName: "Ім'я",
      lastName: 'Прізвище',
      phone: 'Мобільний телефон',
      email: 'Електрона пошта',
      comment: 'Коментар',
      submit: 'Відправити',
      message: {
        sending: 'Відправляємо...',
        error: 'Щось пішло не так. Спробуйте ще раз пізніше',
        done: 'Запит успішно відправлено',
      },
    },
  },
} as const;
