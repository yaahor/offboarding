import { DialogRef } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, merge, Subject } from 'rxjs';
import { cityValidator } from './lib/city-validator';
import { countryNameValidator } from './lib/county-validator';
import { getMessages } from './lib/get-messages';
import { phoneValidator } from './lib/phone-validator';
import { postalCodeValidator } from './lib/postal-code-validator';
import { streetLineValidator } from './lib/street-line-validator';
import { ControlName } from './model/control-name';
import { Messages } from './model/messages';

@Component({
  selector: 'app-offboarding-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './offboarding-dialog.component.html',
  styleUrl: './offboarding-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-offboarding-dialog'
  }
})
export class OffboardingDialogComponent implements OnInit {
  private readonly blur$ = new Subject<void>();
  private readonly dialogRef = inject(DialogRef);
  protected readonly ControlName = ControlName;

  protected readonly formGroup = new FormGroup({
    [ControlName.RECEIVER]: new FormControl('', [Validators.required]),
    [ControlName.EMAIL]: new FormControl('', [Validators.required, Validators.email]),
    [ControlName.PHONE]: new FormControl('', [Validators.required, phoneValidator()]),
    [ControlName.STREET]: new FormControl('', [Validators.required, streetLineValidator()]),
    [ControlName.CITY]: new FormControl('', [Validators.required, cityValidator()]),
    [ControlName.POSTAL_CODE]: new FormControl('', [Validators.required, postalCodeValidator()]),
    [ControlName.COUNTRY]: new FormControl('', [Validators.required, countryNameValidator()]),
    [ControlName.NOTE]: new FormControl(''),
  });

  protected readonly errorMessages = signal<Messages>({});
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    merge(this.formGroup.statusChanges, this.formGroup.valueChanges, this.blur$)
      .pipe(
        debounceTime(300),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        const messages = getMessages(this.formGroup);
        this.errorMessages.set(messages);
      });
  }

  protected onFormFocusOut() {
    this.blur$.next();
  }

  protected onConfirmClick(): void {
    this.dialogRef.close(this.formGroup.value);
  }
}
