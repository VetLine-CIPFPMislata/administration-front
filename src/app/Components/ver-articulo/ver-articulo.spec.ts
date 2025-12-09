import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerArticulo } from './ver-articulo';

describe('VerArticulo', () => {
  let component: VerArticulo;
  let fixture: ComponentFixture<VerArticulo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerArticulo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerArticulo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
