import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMotivoComponent } from './crear-motivo.component';

describe('CrearMotivoComponent', () => {
  let component: CrearMotivoComponent;
  let fixture: ComponentFixture<CrearMotivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearMotivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearMotivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
