import {
  Component,
  computed,
  EventEmitter,
  inject,
  input,
  Input,
  Output,
  signal,
  OnDestroy,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DisplayImage,
  Product,
} from '../../../../../core/models/products.model';
import {
  FormGroup,
  FormArray,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../../../../../core/services/api.service';
import { Media } from '../../../../../core/models/shared/types';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm implements OnDestroy {
  private fb = inject(FormBuilder);
  public apiService = inject(ApiService);

  private _product = signal<Product | null>(null);
  readonly productSignal = this._product.asReadonly();

  loading = input.required<boolean>();
  errorMessage = input.required<string | null>();

  readonly isEdit = signal(false);
  readonly formTouched = signal(false);
  readonly serverErrors = signal<Array<{ field?: string; message: string }>>(
    [],
  );

  constructor() {
    // Clear server errors when form values change
    this.form.valueChanges.subscribe(() => {
      if (this.serverErrors().length > 0) {
        this.serverErrors.set([]);
      }
    });
  }

  thumbnailFile = signal<File | null>(null);
  thumbnailPreview = signal<string | null>(null);

  displayImages = signal<DisplayImage[]>([]);
  removedImages = signal<string[]>([]);

  onThumbnailSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    // 🔥 revoke old
    const old = this.thumbnailPreview();
    if (old && old.startsWith('blob:')) {
      URL.revokeObjectURL(old);
    }

    this.thumbnailFile.set(file);
    this.thumbnailPreview.set(URL.createObjectURL(file));

    // ✅ IMPORTANT: reset input so same file triggers change again
    input.value = '';
  }

  onImagesSelected(event: Event) {
    const target = event.target as HTMLInputElement;

    if (!target.files) return;

    const newImages: DisplayImage[] = Array.from(target.files).map((file) => ({
      type: 'new',
      url: URL.createObjectURL(file),
      file,
    }));

    this.displayImages.update((images) => [...images, ...newImages]);

    target.value = '';
  }

  removeImage(index: number) {
    const image = this.displayImages()[index];

    // 🔥 revoke if it's a new image
    if (image.type === 'new' && image.url.startsWith('blob:')) {
      URL.revokeObjectURL(image.url);
    }

    if (image.type === 'existing' && image.public_id) {
      this.removedImages.update((arr) => [...arr, image.public_id!]);
    }

    this.displayImages.update((arr) => arr.filter((_, i) => i !== index));
  }

  private toDateTimeLocal(value?: string | Date | null): string {
    if (!value) return '';

    const date = value instanceof Date ? value : new Date(value);

    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60000);

    return local.toISOString().slice(0, 16);
  }

  private toISO(value?: string | null): string {
    return value ? new Date(value).toISOString() : new Date().toISOString();
  }

  private createReview(review?: any): FormGroup {
    return this.fb.group({
      rating: [review?.rating ?? 0, [Validators.min(0), Validators.max(5)]],
      comment: [review?.comment ?? ''],
      date: [this.toDateTimeLocal(review?.date ?? new Date().toISOString())],
      reviewerName: [review?.reviewerName ?? ''],
      reviewerEmail: [review?.reviewerEmail ?? '', [Validators.email]],
    });
  }

  addReview() {
    this.reviewsArray.push(this.createReview());
  }

  addTag(value: string = '') {
    this.tagsArray.push(this.fb.control(value, Validators.required));
  }

  removeReview(index: number) {
    this.reviewsArray.removeAt(index);
  }

  removeTag(index: number) {
    this.tagsArray.removeAt(index);
  }

  get reviewsArray(): FormArray {
    return this.form.get('reviews') as FormArray;
  }

  get tagsArray(): FormArray {
    return this.form.get('tags') as FormArray;
  }

  control(name: string) {
    return this.form.get(name);
  }

  hasError(name: string, error: string) {
    const c = this.form.get(name);
    return c?.touched && c?.hasError(error);
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
    if (errorKey === 'min')
      return `Must be at least ${control.errors['min'].min}`;
    if (errorKey === 'max')
      return `Must be at most ${control.errors['max'].max}`;
    if (errorKey === 'pattern') return 'Invalid format';

    return null;
  }

  @Input() set product(value: Product | null) {
    this._product.set(value);
    this.isEdit.set(!!value);

    if (value) {
      // console.log('Product Value: ', value);

      // const { thumbnail, ...safeValue } = value;

      // this.form.patchValue(value);
      this.form.patchValue({
        ...value,
        // ...safeValue,
        meta: {
          ...value.meta,
          createdAt: this.toDateTimeLocal(value.meta?.createdAt),
          updatedAt: this.toDateTimeLocal(value.meta?.updatedAt),
        },
      });

      this.reviewsArray.clear();

      value.reviews?.forEach((review) => {
        this.reviewsArray.push(this.createReview(review));
      });

      this.tagsArray.clear();

      value.tags?.forEach((tag) => {
        this.addTag(tag);
      });

      // Load existing images (from backend)
      if (value.images?.length) {
        this.displayImages.set(
          value.images.map((img) => ({
            type: 'existing',
            url: this.apiService.getMediaUrl(img),
            public_id: img.public_id ?? undefined,
          })),
        );
      }

      if (value.thumbnail) {
        this.thumbnailPreview.set(this.apiService.getMediaUrl(value.thumbnail)); // 'http://localhost:8000' + value.thumbnail );
      }
    }
  }

  starWidth = computed(() => {
    const rating = this._product()?.rating ?? 0;
    return (Math.min(Math.max(rating, 0), 5) / 5) * 100; // 0-100%
  });

  // @Output() save = new EventEmitter<Product>();
  @Output() save = new EventEmitter<{
    product: Product;
    thumbnail?: Media | File | null;
    images?: File[];
    removedImages?: string[];
  }>();

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.minLength(10)]],
    category: ['mannequins'],
    price: [0, [Validators.required, Validators.min(0)]],
    discount_percentage: [0, [Validators.min(0), Validators.max(100)]],
    rating: [0, [Validators.min(0), Validators.max(5)]],
    stock: [0, [Validators.min(0)]],
    brand: [''],
    sku: [''],
    weight: [0, [Validators.min(0)]],
    warranty_information: [''],
    shipping_information: [''],
    availability_status: ['In Stock'],
    return_policy: [''],
    minimum_order_quantity: [1, [Validators.min(1)]],
    tags: this.fb.array([]),
    // images: this.fb.control([]), //temp
    dimensions: this.fb.group({
      width: [0],
      height: [0],
      depth: [0],
    }),
    reviews: this.fb.array([]),
    meta: this.fb.group({
      barcode: [''],
      qrCode: [''],
      createdAt: [''],
      updatedAt: [''],
      thumbnail: [''],
    }),
  });

  submit() {
    // Mark form as touched to show all validation errors
    this.formTouched.set(true);

    if (this.form.invalid) return;

    const convertedReviews = this.form.value.reviews.map((review: any) => ({
      ...review,
      date: this.toISO(review.date),
    }));

    const updatedProduct: Product = this.isEdit()
      ? {
          ...this._product()!,
          ...this.form.value,
          reviews: convertedReviews,
          meta: {
            ...this._product()!.meta,
            ...this.form.value.meta,
            createdAt: this.toISO(this.form.value.meta?.createdAt),
            updatedAt: this.toISO(this.form.value.meta?.updatedAt),
          },
          updated_at: new Date().toISOString(),
        }
      : {
          ...this.form.value,
          reviews: convertedReviews,
          meta: {
            ...this.form.value.meta,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

    const newImages = this.displayImages()
      .filter((img) => img.type === 'new')
      .map((img) => img.file!);

    // console.log(
    //   'Format being emitted: ',
    //   this.thumbnailFile(),
    //   // newImages,
    //   // this.removedImages(),
    // );

    // // this.save.emit(updatedProduct);
    // this.save.emit({
    //   product: updatedProduct,
    const { images, thumbnail, ...safeProduct } = updatedProduct as any;

    console.log('SAFE PRODUCT:', safeProduct);

    this.save.emit({
      product: safeProduct, // ✅ CLEAN payload
      thumbnail:
        this.thumbnailFile() instanceof File ? this.thumbnailFile() : null,
      images: newImages,
      removedImages: this.removedImages(),
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
    if (errors) {
      this.serverErrors.set(errors);
      // Mark form as touched so errors are visible
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }

  ngOnDestroy() {
    // 🔥 thumbnail
    const thumb = this.thumbnailPreview();
    if (thumb && thumb.startsWith('blob:')) {
      URL.revokeObjectURL(thumb);
    }

    // 🔥 all new images
    this.displayImages().forEach((img) => {
      if (img.type === 'new' && img.url.startsWith('blob:')) {
        URL.revokeObjectURL(img.url);
      }
    });
  }
}
