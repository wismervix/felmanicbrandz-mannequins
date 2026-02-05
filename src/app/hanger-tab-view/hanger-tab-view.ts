import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIcon } from '../svg-icon/svg-icon';
import { BaseCarousel } from '../base-carousel/base-carousel';
import { CategoryKey, getCoursesByCategory } from '../../products';

@Component({
  selector: 'app-hanger-tab-view',
  standalone: true,
  imports: [RouterModule, BaseCarousel, SvgIcon],
  templateUrl: './hanger-tab-view.html',
  styleUrl: './hanger-tab-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangerTabView {
  getCoursesByCategory(category: CategoryKey) {
    return getCoursesByCategory(category);
  }
}
