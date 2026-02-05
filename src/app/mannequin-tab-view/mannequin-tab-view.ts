import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIcon } from '../svg-icon/svg-icon';
import { BaseCarousel } from '../base-carousel/base-carousel';
import { CategoryKey, getCoursesByCategory } from '../../products';

@Component({
  selector: 'app-mannequin-tab-view',
  standalone: true,
  imports: [RouterModule, BaseCarousel, SvgIcon],
  templateUrl: './mannequin-tab-view.html',
  styleUrl: './mannequin-tab-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MannequinTabView {
  getCoursesByCategory(category: CategoryKey) {
    return getCoursesByCategory(category);
  }
}
