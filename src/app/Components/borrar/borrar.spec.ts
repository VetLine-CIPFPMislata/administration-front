import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Borrar } from './borrar';

describe('Borrar', () => {
  let component: Borrar;
  let fixture: ComponentFixture<Borrar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Borrar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Borrar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
