import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ErrorName } from '../model/error-name';

export function cityValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    const cityRegex = /^[\p{L}\p{M}\s'-]{2,50}$/u; // Letters, spaces, '-
    return cityRegex.test(value) ? null : { [ErrorName.CITY]: true };
  };
}
