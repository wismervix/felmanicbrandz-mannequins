import {
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  HostListener,
  ElementRef,
  Component,
} from '@angular/core';

export interface DropdownOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-ui-dropdown',
  imports: [],
  templateUrl: './ui-dropdown.html',
  styleUrl: './ui-dropdown.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDropdown {
  options = input.required<DropdownOption[]>();
  value = input<string>('default');
  placeholder = input('Select');

  changed = output<string>();

  open = signal(false);

  selectedLabel = computed(() => {
    const found = this.options().find((o) => o.value === this.value());
    return found ? found.label : this.placeholder();
  });

  constructor(private el: ElementRef) {}

  toggle() {
    this.open.update((v) => !v);
  }

  select(option: DropdownOption) {
    this.changed.emit(option.value);
    this.open.set(false);
  }

  @HostListener('document:click', ['$event'])
  closeOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.open.set(false);
    }
  }
}
