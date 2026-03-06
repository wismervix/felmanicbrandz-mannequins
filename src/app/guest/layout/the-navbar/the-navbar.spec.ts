import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheNavbar } from './the-navbar';

describe('TheNavbar', () => {
  let component: TheNavbar;
  let fixture: ComponentFixture<TheNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheNavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
