import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoCategory } from './nuevo-category';

describe('NuevoCategory', () => {
  let component: NuevoCategory;
  let fixture: ComponentFixture<NuevoCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
