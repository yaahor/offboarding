import { FormGroup } from '@angular/forms';
import { ControlName } from '../model/control-name';
import { ErrorName } from '../model/error-name';
import { Messages } from '../model/messages';

export function getMessages(formGroup: FormGroup): Messages {
  const messages: Messages = {};

  Object.values<ControlName>(ControlName).forEach(controlName => {
    const control = formGroup.get(controlName);

    if (!control || control.untouched || control.valid) {
      messages[controlName] = '';
      return;
    }

    const requiredMessage = control.hasError(ErrorName.REQUIRED) ? 'This field is required' : '';
    const emailMessage = control.hasError(ErrorName.EMAIL) ? 'Invalid email address' : '';
    const phoneMessage = control.hasError(ErrorName.PHONE) ? '7-15 digits' : '';
    const streetLineMessage = control.hasError(ErrorName.STREET_LINE) ? '5-100 letters, numbers, spaces, \'.,/-' : '';
    const cityMessage = control.hasError(ErrorName.CITY) ? '2-50 letters, spaces, \'-' : '';
    const postalCodeMessage = control.hasError(ErrorName.POSTAL_CODE) ? '3-10 alphanumeric, spaces, -' : '';
    const countryMessage = control.hasError(ErrorName.COUNTRY) ? '2-50 Letters, spaces, \'-' : '';

    messages[controlName] = requiredMessage || emailMessage || phoneMessage || streetLineMessage || cityMessage || postalCodeMessage || countryMessage;
  });

  return messages;
}
