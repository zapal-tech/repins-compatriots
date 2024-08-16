import { addUnderLine } from './utils';

export const getSQLSearchWhereQuery = async ({ lastName }: { lastName: string }) => {
  if (lastName.length < 3) return '';

  const vowelLetters = [
    'а',
    'е',
    'є',
    'и',
    'і',
    'ї',
    'о',
    'у',
    'ю',
    'я',
    'А',
    'Е',
    'Є',
    'И',
    'І',
    'Ї',
    'О',
    'У',
    'Ю',
    'Я',
  ];
  const req = new RegExp(vowelLetters.join('|'), 'gi');

  let arrayChar: string[] = [];

  const numberLoop = lastName.length - (lastName.length >= 7 ? 4 : lastName.length > 5 ? 2 : 0) - 1;

  const lastNameWithoutVowels = lastName.replace(req, '_');

  let elementLetters = {
    letters: '',
    numberConsonantLetters: 0,
  };
  for (let index = 0; index < numberLoop; index++) {
    elementLetters.letters = elementLetters.letters + lastNameWithoutVowels[index];

    if (lastNameWithoutVowels[index] !== '_') elementLetters.numberConsonantLetters += 1;

    if (
      elementLetters.numberConsonantLetters >= 3 ||
      (numberLoop === index + 1 && elementLetters.numberConsonantLetters > 2)
    ) {
      arrayChar.push(
        `title ILIKE '${elementLetters.letters.length !== index ? '%' : ''}${elementLetters.letters}%' OR original_last_name ILIKE '${'%'}${elementLetters.letters}%'`,
      );

      elementLetters.letters = '';
      elementLetters.numberConsonantLetters = 0;
    }
  }
  let currentLastName: string = '';
  if (lastNameWithoutVowels.slice(0, numberLoop).length > 2)
    currentLastName = lastNameWithoutVowels.slice(0, numberLoop);
  else currentLastName = lastNameWithoutVowels;

  if (currentLastName.length)
    arrayChar.push(`title ILIKE '%${currentLastName}%' OR original_last_name ILIKE '%${currentLastName}%'`);

  if (lastName.length > 5)
    addUnderLine(lastNameWithoutVowels).map((item) => {
      arrayChar.push(`title ILIKE '%${item}%' OR original_last_name ILIKE '%${item}%'`);
    });

  arrayChar.push(`title = '${lastName}' OR original_last_name = '${lastName}'`);

  const result = arrayChar.join(' OR ');

  return result;
};
