import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ErrorName } from '../model/error-name';

export function postalCodeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    const postalCodeRegex = /^[A-Za-z0-9\s-]{3,10}$/; // Alphanumeric, spaces, -
    return postalCodeRegex.test(value)
      ? null
      : { [ErrorName.POSTAL_CODE]: true };
  };
}
