import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ErrorName } from '../model/error-name';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const phoneRegex = /^[0-9]{7,15}$/; // Digits

    return phoneRegex.test(value) ? null : { [ErrorName.PHONE]: true };
  };
}
