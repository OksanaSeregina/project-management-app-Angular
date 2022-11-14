import { FormControl, ValidationErrors } from '@angular/forms';

export function onlyLettersAndNumbersValidator(control: FormControl): ValidationErrors | null {
  const hasNoNumberNoLetters = /^[0-9a-zA-Z]+$/.test(control.value);
  const isValid = hasNoNumberNoLetters;
  if (!isValid) {
    return { onlyLettersAndNumbers: true };
  }
  return null;
}
