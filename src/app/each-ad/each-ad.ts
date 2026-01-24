import {
  Component,
  input,
  computed,
  signal,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AdCourse, Availability } from '../../products';

@Component({
  selector: 'app-each-ad',
  imports: [],
  templateUrl: './each-ad.html',
  styleUrl: './each-ad.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EachAd {
  ad = input.required<AdCourse>();

  // constructor() {
  //   effect(() => {
  //     const ad = this.ad();
  //     if (ad) {
  //       console.log('Ad mounted:', ad);
  //     }
  //   });
  // }

  // Computed signals for reactive values
  isAvailable = computed(() => this.ad()?.available === 1);

  safeProgress = computed(() => {
    const progress = this.ad()?.progress ?? 0;
    return progress > 0 ? progress : 1;
  });

  // Event handler
  onButtonClick() {
    if (this.isAvailable()) {
      console.log('Continue studying:', this.ad()?.name);
      // Emit event or navigate
      // this.continueStudy.emit(this.ad()!);
    } else {
      console.log('Course locked:', this.ad()?.name);
    }
  }
}
