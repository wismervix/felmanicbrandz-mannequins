import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  inject,
  computed,
  OnDestroy,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { User } from '../../../../../core/models/user.model';
import { ApiService } from '../../../../../core/services/api.service';
import { calculateAge } from '../../../../../core/utils/date.utils';
import { Card } from '../../../../shared/components/card/card';
// import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user-form',
  // imports: [CommonModule, ReactiveFormsModule, Card, JsonPipe],
  imports: [CommonModule, ReactiveFormsModule, Card],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm implements OnDestroy {
  constructor() {
    this.form.get('birthDate')?.valueChanges.subscribe((value) => {
      this.birthDateSignal.set(value);
    });

    console.log('user: ', this.userSignal());

    // Clear server errors when form values change
    this.form.valueChanges.subscribe(() => {
      if (this.serverErrors().length > 0) {
        this.serverErrors.set([]);
      }
    });
  }

  private fb = inject(FormBuilder);
  public apiService = inject(ApiService);

  private _user = signal<User | null>(null);
  readonly userSignal = this._user.asReadonly();

  // Submission and validation states
  readonly isSubmitting = signal(false);
  readonly serverErrors = signal<Array<{ field?: string; message: string }>>(
    [],
  );
  readonly formTouched = signal(false);

  birthDateSignal = signal<string | null>(null);
  readonly calculatedAge = computed(() => {
    const birthDate = this.birthDateSignal();
    return birthDate ? calculateAge(birthDate) : null;
  });

  imageFile = signal<File | null>(null);
  imagePreview = signal<string | null>(null);

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    // 🔥 cleanup old preview first
    const oldPreview = this.imagePreview();
    if (oldPreview && oldPreview.startsWith('blob:')) {
      URL.revokeObjectURL(oldPreview);
    }

    this.imageFile.set(file);
    this.imagePreview.set(URL.createObjectURL(file));

    // ✅ IMPORTANT: reset input so same file triggers change again
    input.value = '';
  }

  get formControlsDebug() {
    return Object.entries(this.form.controls).map(([key, control]) => ({
      key,
      value: control.value,
      valid: control.valid,
      errors: control.errors,
    }));
  }

  /**
   * Check if a field error should be displayed
   * Shows error if: touched AND has errors, OR form was submitted
   */
  shouldShowError(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    if (!control) return false;
    return (
      (control.touched && control.invalid) ||
      (this.formTouched() && control.invalid)
    );
  }

  /**
   * Get error message for a field
   * Returns server error first, then client-side validation error
   */
  getFieldError(fieldName: string): string | null {
    // Check for server-side errors first
    const serverError = this.serverErrors().find(
      (err) => err.field === fieldName,
    );
    if (serverError) return serverError.message;

    const control = this.form.get(fieldName);
    if (!control || !control.errors) return null;

    // Return first client-side validation error
    const errorKey = Object.keys(control.errors)[0];
    if (errorKey === 'required')
      return `${fieldName.replace(/_/g, ' ')} is required`;
    if (errorKey === 'minlength')
      return `Minimum length is ${control.errors['minlength'].requiredLength}`;
    if (errorKey === 'maxlength')
      return `Maximum length is ${control.errors['maxlength'].requiredLength}`;
    if (errorKey === 'email') return 'Enter a valid email address';
    if (errorKey === 'pattern') return 'Invalid format';

    return null;
  }

  @Input() set user(value: User | null) {
    this._user.set(value);
    if (value) {
      this.form.patchValue(value);
      // this.form.patchValue({
      //   ...value,
      //   image: value.image?.url || '',
      // });
      this.birthDateSignal.set(value.birthDate);

      if (value.image) {
        this.imagePreview.set(this.apiService.getMediaUrl(value.image));
      }
    }
  }

  // @Output() save = new EventEmitter<User>();
  @Output() save = new EventEmitter<{ user: User; image?: File | null }>();

  form: FormGroup = this.fb.group({
    first_name: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ],
    last_name: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ],
    gender: ['other', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(100)],
    ],
    birthDate: ['', Validators.required],
    // image: [''],
    role: ['user', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    country: ['', Validators.required],
  });

  submit() {
    // Mark form as touched to show all validation errors
    this.formTouched.set(true);

    if (this.form.invalid || !this._user()) return;

    // Set loading state
    this.isSubmitting.set(true);

    const age = calculateAge(this.form.value.birthDate);

    const updatedUser: User = {
      ...this._user()!,
      ...this.form.value,
      age,
      updated_at: new Date().toISOString(),
    };

    console.log('User from form: ', updatedUser, this.imageFile());

    this.save.emit({
      user: updatedUser,
      image: this.imageFile(),
    });
  }

  /**
   * Call this from parent component after server response
   * Handles both success and error scenarios
   */
  setSubmissionState(
    isSubmitting: boolean,
    errors?: Array<{ field?: string; message: string }>,
  ) {
    this.isSubmitting.set(isSubmitting);
    if (errors) {
      this.serverErrors.set(errors);
      // Mark form as touched so errors are visible
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }

  ngOnDestroy() {
    const preview = this.imagePreview();
    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }
  }
}
