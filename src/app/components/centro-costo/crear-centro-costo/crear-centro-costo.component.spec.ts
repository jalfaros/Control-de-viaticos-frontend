import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCentroCostoComponent } from './crear-centro-costo.component';

describe('CrearCentroCostoComponent', () => {
  let component: CrearCentroCostoComponent;
  let fixture: ComponentFixture<CrearCentroCostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearCentroCostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
