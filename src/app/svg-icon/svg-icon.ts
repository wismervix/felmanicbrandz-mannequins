import {
  Component,
  Input,
  ChangeDetectionStrategy,
  computed,
  signal,
  inject,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SVG_ICONS, SvgIconName } from '../../svg-icons';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  templateUrl: './svg-icon.html',
  styleUrl: './svg-icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIcon {
  private sanitizer = inject(DomSanitizer);

  /* ========= Inputs ========= */

  name = signal<SvgIconName | null>(null);

  @Input({ required: true })
  set icon(value: SvgIconName) {
    this.name.set(value);
  }

  @Input() size?: string | number;
  @Input() width?: string | number;
  @Input() height?: string | number;

  @Input() color: string = 'currentColor';
  @Input() fill: string = 'currentColor';
  @Input() stroke?: string;
  @Input() strokeWidth?: string | number;

  @Input() rotate?: string | number;
  @Input() flip?: 'horizontal' | 'vertical' | 'both';
  @Input() spin = false;

  @Input() class?: string | string[];

  /* ========= Computed ========= */

  iconExists = computed(() =>
    this.name() ? this.name()! in SVG_ICONS : false,
  );

  svg = computed<SafeHtml | null>(() => {
    if (!this.iconExists()) return null;

    let svg = SVG_ICONS[this.name()!];

    if (this.fill !== 'currentColor') {
      svg = svg.replace(/fill="currentColor"/g, `fill="${this.fill}"`);
    }

    if (this.stroke) {
      svg = svg.replace('<svg', `<svg stroke="${this.stroke}"`);
    }

    if (this.strokeWidth) {
      svg = svg.replace('<svg', `<svg stroke-width="${this.strokeWidth}"`);
    }

    return this.sanitizer.bypassSecurityTrustHtml(svg);
  });

  styles = computed<Partial<CSSStyleDeclaration>>(() => {
    const styles: Partial<CSSStyleDeclaration> = {};
    const px = (v?: string | number) => (typeof v === 'number' ? `${v}px` : v);

    styles.width = px(this.width ?? this.size) ?? '';
    styles.height = px(this.height ?? this.size) ?? '';

    if (this.color !== 'currentColor') {
      styles.color = this.color;
    }

    const transforms: string[] = [];

    if (this.rotate) {
      transforms.push(
        `rotate(${typeof this.rotate === 'number' ? this.rotate + 'deg' : this.rotate})`,
      );
    }

    if (this.flip === 'horizontal') transforms.push('scaleX(-1)');
    if (this.flip === 'vertical') transforms.push('scaleY(-1)');
    if (this.flip === 'both') transforms.push('scale(-1)');

    if (transforms.length) {
      styles.transform = transforms.join(' ');
    }

    return styles;
  });

  classes = computed(() =>
    [
      'svg-icon',
      ...(Array.isArray(this.class)
        ? this.class
        : this.class
          ? [this.class]
          : []),
      this.spin ? 'svg-icon--spin' : '',
      this.flip ? `svg-icon--flip-${this.flip}` : '',
    ].filter(Boolean),
  );
}
