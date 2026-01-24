import {
  Component,
  input,
  computed,
  signal,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AdCourse, Category } from '../../products';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-each-ad',
  imports: [TitleCasePipe],
  templateUrl: './each-ad.html',
  styleUrl: './each-ad.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EachAd {
  ad = input.required<AdCourse>();
  category = input.required<Category>();

  // constructor() {
  //   effect(() => {
  //     const ad = this.ad();
  //     if (ad) {
  //       console.log('Ad mounted:', ad);
  //     }
  //   });
  // }

  // Computed signals for reactive values
  starWidth = computed(() => {
    const rating = this.ad()?.rating ?? 0;
    return (Math.min(Math.max(rating, 0), 5) / 5) * 100; // 0-100%
  });

  isBestSelling = computed(() => this.ad()?.bestSelling === 1);

  // Event handler
  onButtonClick() {
    if (this.isBestSelling()) {
      console.log('Continue studying:', this.ad()?.name);
      // Emit event or navigate
      // this.continueStudy.emit(this.ad()!);
    } else {
      console.log('Course locked:', this.ad()?.name);
    }
  }
}
