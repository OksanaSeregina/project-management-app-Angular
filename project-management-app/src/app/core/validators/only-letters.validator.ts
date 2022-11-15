import { FormControl, ValidationErrors } from '@angular/forms';

export function onlyLettersValidator(control: FormControl): ValidationErrors | null {
  const hasNotOnlyLetters = /^[a-zA-Z]+$/.test(control.value);
  const isValid = hasNotOnlyLetters;
  if (!isValid) {
    return { onlyLetters: true };
  }
  return null;
}
