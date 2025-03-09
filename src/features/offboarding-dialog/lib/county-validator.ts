import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ErrorName } from '../model/error-name';

export function countryNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    const countryRegex = /^[\p{L}\p{M}\s'-]{2,50}$/u; // Letters, spaces, '-
    return countryRegex.test(value) ? null : { [ErrorName.COUNTRY]: true };
  };
}
