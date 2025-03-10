import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { debounceTime, filter, merge, Subject, tap } from 'rxjs';
import { OffboardingData } from '../../entities/user/model/offboarding-data';
import { User } from '../../entities/user/model/user';
import { Status } from '../../shared/model/status';
import { cityValidator } from './lib/city-validator';
import { countryNameValidator } from './lib/county-validator';
import { getMessages } from './lib/get-messages';
import { phoneValidator } from './lib/phone-validator';
import { postalCodeValidator } from './lib/postal-code-validator';
import { streetLineValidator } from './lib/street-line-validator';
import { ControlName } from './model/control-name';
import { Messages } from './model/messages';
import { OffboardingDialogService } from './offboarding-dialog.service';

@Component({
  selector: 'app-offboarding-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './offboarding-dialog.component.html',
  styleUrl: './offboarding-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-offboarding-dialog',
  },
})
export class OffboardingDialogComponent implements OnInit {
  protected readonly ControlName = ControlName;
  protected readonly Status = Status;
  protected readonly errorMessages = signal<Messages>({});
  protected readonly offboardingStatus = model();

  protected readonly formGroup = new FormGroup({
    [ControlName.RECEIVER]: new FormControl('', [Validators.required]),
    [ControlName.EMAIL]: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    [ControlName.PHONE]: new FormControl('', [
      Validators.required,
      phoneValidator(),
    ]),
    [ControlName.STREET]: new FormControl('', [
      Validators.required,
      streetLineValidator(),
    ]),
    [ControlName.CITY]: new FormControl('', [
      Validators.required,
      cityValidator(),
    ]),
    [ControlName.POSTAL_CODE]: new FormControl('', [
      Validators.required,
      postalCodeValidator(),
    ]),
    [ControlName.COUNTRY]: new FormControl('', [
      Validators.required,
      countryNameValidator(),
    ]),
    [ControlName.NOTE]: new FormControl(''),
  });

  private readonly blur$ = new Subject<void>();
  private readonly user = inject<User>(MAT_DIALOG_DATA);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialogRef = inject(MatDialogRef);

  constructor(
    private readonly service: OffboardingDialogService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    merge(this.formGroup.statusChanges, this.formGroup.valueChanges, this.blur$)
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const messages = getMessages(this.formGroup);
        this.errorMessages.set(messages);
      });
  }

  protected onFormFocusOut() {
    this.blur$.next();
  }

  protected onConfirmClick(): void {
    const data = this.formGroup.value as OffboardingData;

    this.service
      .conductOffboarding(this.user?.id, data)
      .pipe(
        tap((state) => {
          this.offboardingStatus.set(state.status);
        }),
        filter((state) => state.status === Status.SUCCESS),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.router.navigate(['/']).then();
        this.dialogRef.close();
      });
  }
}
