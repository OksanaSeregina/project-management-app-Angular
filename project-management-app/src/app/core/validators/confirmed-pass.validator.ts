import { AbstractControl, ValidationErrors } from '@angular/forms';

export function confirmedPassValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const repass = control.get('repass');
  if (password?.value === repass?.value) {
    return null;
  }
  return { confirmedPass: true };
}
