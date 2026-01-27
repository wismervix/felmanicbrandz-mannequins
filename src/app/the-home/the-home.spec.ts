import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheHome } from './the-home';

describe('TheHome', () => {
  let component: TheHome;
  let fixture: ComponentFixture<TheHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
