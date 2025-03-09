import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ErrorName } from '../model/error-name';

export function streetLineValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    const streetRegex = /^[\p{L}\p{M}0-9\s'.,/-]{5,100}$/u; // Letters, numbers, spaces, '.,/-
    return streetRegex.test(value) ? null : { [ErrorName.STREET_LINE]: true };
  };
}
