import { FormControl, ValidationErrors } from '@angular/forms';

export function isLettersAndNumbersValidator(control: FormControl): ValidationErrors | null {
  const hasNumber = /\d/.test(control.value);
  const hasLetter = /[a-zA-Z]/.test(control.value);
  const isValid = hasNumber && hasLetter;
  if (!isValid) {
    return { isLettersAndNumbers: true };
  }
  return null;
}
