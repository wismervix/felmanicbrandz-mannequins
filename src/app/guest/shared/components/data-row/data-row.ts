import {
  Component,
  computed,
  ContentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-data-row',
  imports: [NgTemplateOutlet],
  templateUrl: './data-row.html',
  styleUrl: './data-row.scss',
})
export class DataRow {
  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<any>;

  data = input<any[]>([]);
  pagination = input<boolean>(false);

  currentPage = input<number>(0);
  totalPages = input<number>(0);

  pageChange = output<number>();

  prevPage() {
    if (this.currentPage() > 0) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages() - 1) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }

  goToPage(page: number) {
    this.pageChange.emit(page);
  }

  pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i),
  );
}
