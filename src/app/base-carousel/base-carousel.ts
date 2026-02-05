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
import { EachProduct } from '../each-product/each-product';
import { Product, Category, OrderPayload } from '../../products';

@Component({
  selector: 'app-base-carousel',
  standalone: true,
  imports: [EachProduct],
  templateUrl: './base-carousel.html',
  styleUrl: './base-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseCarousel implements AfterViewInit, OnDestroy {
  products = input.required<Product[]>();
  category = input.required<Category>();

  @ViewChild('root', { static: true }) rootElement!: ElementRef<HTMLDivElement>;
  @ViewChild('limiter', { static: true })
  limiterElement!: ElementRef<HTMLDivElement>;
  @ViewChild('wrapper', { static: true })
  wrapperElement!: ElementRef<HTMLDivElement>;

  // Reactive state with signals
  currentIndex = signal(0);
  cardWidth = signal(0);
  maxIndex = signal(0);

  private readonly EXTRA_GAP = 350;
  private resizeObserver: ResizeObserver | null = null;
  private visibleIndices = signal<number[]>([]);

  // Computed values
  canGoPrev = computed(() => this.currentIndex() > 0);
  canGoNext = computed(() => this.currentIndex() < this.maxIndex());
  progress = computed(() => (this.currentIndex() + 1) / (this.maxIndex() + 1));
  totalProducts = computed(() => this.products().length);

  visibleRange = computed(() => {
    const currentIdx = this.currentIndex();
    const cardW = this.cardWidth();
    const total = this.totalProducts();

    if (!this.limiterElement || cardW === 0 || total === 0) {
      return { from: 1, to: 1 };
    }

    const viewportWidth = this.limiterElement.nativeElement.offsetWidth;

    // Calculate actual scroll position (same logic as updateSliderPosition)
    let scrollLeft = currentIdx * cardW;

    // Add extra breathing room at the end (same as updateSliderPosition)
    if (currentIdx === this.maxIndex()) {
      const wrapper = this.wrapperElement.nativeElement;
      const totalWidth = wrapper.scrollWidth;
      const maxOffset = Math.max(
        0,
        totalWidth - viewportWidth + this.EXTRA_GAP,
      );
      scrollLeft = Math.min(scrollLeft + this.EXTRA_GAP, maxOffset);
    }

    // Find items that are at least 60% visible
    const visibleItems: number[] = [];

    for (let i = 0; i < total; i++) {
      const itemStart = i * cardW;
      const itemEnd = (i + 1) * cardW;

      // Calculate visible portion of this item
      const visibleStart = Math.max(itemStart, scrollLeft);
      const visibleEnd = Math.min(itemEnd, scrollLeft + viewportWidth);
      const visibleWidth = Math.max(0, visibleEnd - visibleStart);

      // Check if item is 100% visible
      if (visibleWidth >= 1.0 * cardW) {
        visibleItems.push(i + 1); // 1-based indexing
      }
    }

    if (visibleItems.length === 0) {
      return { from: 1, to: 1 };
    }

    return {
      from: Math.min(...visibleItems),
      to: Math.max(...visibleItems),
    };
  });

  // Track slide wrapper elements
  trackByProductId = (_index: number, product: Product): number => product.id;

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

  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        this.move(-1);
        event.preventDefault();
        console.log('Event: ', event.key);
        break;

      case 'ArrowRight':
        this.move(1);
        event.preventDefault();
        console.log('Event: ', event.key);
        break;

      case 'Home':
        this.goToIndex(0);
        event.preventDefault();
        console.log('Event: ', event.key);
        break;

      case 'End':
        this.goToIndex(this.maxIndex());
        event.preventDefault();
        console.log('Event: ', event.key);
        break;
    }
  }

  onSeekStart(event: PointerEvent): void {
    const progressEl = event.currentTarget as HTMLElement;
    const rect = progressEl.getBoundingClientRect();

    const seek = (clientX: number) => {
      const ratio = Math.min(
        1,
        Math.max(0, (clientX - rect.left) / rect.width),
      );

      const index = Math.round(ratio * this.maxIndex());
      this.goToIndex(index);
    };

    seek(event.clientX);

    const move = (e: PointerEvent) => seek(e.clientX);
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
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
    const visibleWidth = this.limiterElement.nativeElement.offsetWidth;
    const totalWidth = wrapper.scrollWidth;
    const maxOffset = Math.max(0, totalWidth - visibleWidth + this.EXTRA_GAP);
    this.maxIndex.set(Math.ceil(maxOffset / this.cardWidth()));
  }

  private updateSliderPosition(): void {
    const wrapper = this.wrapperElement.nativeElement;
    const limiter = this.limiterElement.nativeElement;

    const totalWidth = wrapper.scrollWidth;
    const visibleWidth = limiter.offsetWidth;
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

      this.resizeObserver.observe(this.limiterElement.nativeElement);
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
