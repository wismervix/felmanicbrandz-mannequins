import { Component } from '@angular/core';
import { ProductFilterService } from '../../services/product-filter/product-filter';
import { UiDropdown, DropdownOption } from '../ui-dropdown/ui-dropdown';
import { UiPriceRange } from '../ui-price-range/ui-price-range';

@Component({
  selector: 'app-search-filter',
  imports: [UiDropdown, UiPriceRange],
  templateUrl: './search-filter.html',
  styleUrl: './search-filter.scss',
})
export class SearchFilter {
  constructor(public filter: ProductFilterService) {}

  sortOptions: DropdownOption[] = [
    { label: 'Sort products', value: 'default' },
    { label: 'Name A → Z', value: 'nameAZ' },
    { label: 'Name Z → A', value: 'nameZA' },
    { label: 'Price Low → High', value: 'priceLow' },
    { label: 'Price High → Low', value: 'priceHigh' },
  ];

  onSearch(value: string) {
    this.filter.setSearch(value);
  }

  onCategory(value: any) {
    this.filter.setCategory(value);
  }

  onSort(value: any) {
    this.filter.setSort(value);
  }
}
