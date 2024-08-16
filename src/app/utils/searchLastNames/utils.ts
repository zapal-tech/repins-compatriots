export const addUnderLine = (lastNameWithoutVowel: string) => {
  const arrayLastName = lastNameWithoutVowel.split('_').filter((item) => item !== '');
  let arrayModify: string[] = [];

  arrayModify.push(arrayLastName.join('_'));

  const arrayWithoutConsonantLastNames: string[] = [];
  for (let index = 0; index < lastNameWithoutVowel.length; index++) {
    let letterWithUnderLine = '';
    let letterWithEmpty = '';

    for (let i = 0; i < lastNameWithoutVowel.length; i++) {
      if (lastNameWithoutVowel[i] && index === i) {
        letterWithUnderLine = letterWithUnderLine + '_';
        letterWithEmpty = letterWithEmpty + '';
      } else {
        letterWithUnderLine = letterWithUnderLine + lastNameWithoutVowel[i];
        letterWithEmpty = letterWithEmpty + lastNameWithoutVowel[i];
      }
    }
    arrayWithoutConsonantLastNames.push(letterWithUnderLine);
    arrayWithoutConsonantLastNames.push(letterWithEmpty);
    letterWithUnderLine = '';
    letterWithEmpty = '';
  }

  arrayModify = arrayModify.concat(arrayWithoutConsonantLastNames);

  return arrayModify;
};
