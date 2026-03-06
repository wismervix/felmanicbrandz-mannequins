import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheHero } from './the-hero';

describe('TheHero', () => {
  let component: TheHero;
  let fixture: ComponentFixture<TheHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheHero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheHero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
