import {
  Component,
  input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { EachAd } from '../each-ad/each-ad';
import { AdCourse } from '../../products';

@Component({
  selector: 'app-ad-slider',
  standalone: true,
  imports: [EachAd],
  templateUrl: './ad-slider.html',
  styleUrl: './ad-slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdSlider implements AfterViewInit, OnDestroy {
  ads = input.required<AdCourse[]>();

  @ViewChild('root', { static: true }) rootElement!: ElementRef<HTMLDivElement>;
  @ViewChild('wrapper', { static: true })
  wrapperElement!: ElementRef<HTMLDivElement>;

  // Reactive state with signals
  currentIndex = signal(0);
  cardWidth = signal(0);
  maxIndex = signal(0);

  private readonly EXTRA_GAP = 350;
  private resizeObserver: ResizeObserver | null = null;

  // Computed values
  canGoPrev = computed(() => this.currentIndex() > 0);
  canGoNext = computed(() => this.currentIndex() < this.maxIndex());

  // Track slide wrapper elements
  trackByAdId = (_index: number, ad: AdCourse): number => ad.id;

  ngAfterViewInit(): void {
    this.calculateDimensions();
    this.setupResizeObserver();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  move(step: -1 | 1): void {
    const newIndex = this.currentIndex() + step;
    this.currentIndex.set(Math.max(0, Math.min(this.maxIndex(), newIndex)));
    this.updateSliderPosition();
  }

  goToIndex(index: number): void {
    this.currentIndex.set(Math.max(0, Math.min(this.maxIndex(), index)));
    this.updateSliderPosition();
  }

  private calculateDimensions(): void {
    const wrapper = this.wrapperElement.nativeElement;
    const slideWrappers =
      wrapper.querySelectorAll<HTMLElement>('.slide-wrapper');

    if (!slideWrappers.length) return;

    // Calculate card width including gap
    const firstSlide = slideWrappers[0];
    const computedStyle = window.getComputedStyle(firstSlide);
    const cardWidth = firstSlide.offsetWidth;
    const marginRight = parseFloat(computedStyle.marginRight || '0');
    this.cardWidth.set(cardWidth + marginRight);

    // Calculate max index
    const visibleWidth = this.rootElement.nativeElement.offsetWidth;
    const totalWidth = wrapper.scrollWidth;
    const maxOffset = Math.max(0, totalWidth - visibleWidth + this.EXTRA_GAP);
    this.maxIndex.set(Math.ceil(maxOffset / this.cardWidth()));
  }

  private updateSliderPosition(): void {
    const wrapper = this.wrapperElement.nativeElement;
    const root = this.rootElement.nativeElement;

    const totalWidth = wrapper.scrollWidth;
    const visibleWidth = root.offsetWidth;
    const maxOffset = totalWidth - visibleWidth + this.EXTRA_GAP;

    // Calculate base scroll amount
    let scrollAmount = this.currentIndex() * this.cardWidth();

    // Add extra breathing room at the end
    if (this.currentIndex() === this.maxIndex()) {
      scrollAmount = Math.min(scrollAmount + this.EXTRA_GAP, maxOffset);
    }

    // Apply transform with smooth transition
    wrapper.style.transform = `translateX(-${scrollAmount}px)`;
  }

  private setupResizeObserver(): void {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.calculateDimensions();
        this.updateSliderPosition();
      });

      this.resizeObserver.observe(this.rootElement.nativeElement);
      this.resizeObserver.observe(this.wrapperElement.nativeElement);
    } else {
      // Fallback for older browsers
      window.addEventListener('resize', this.handleResize);
    }
  }

  private handleResize = (): void => {
    this.calculateDimensions();
    this.updateSliderPosition();
  };
}