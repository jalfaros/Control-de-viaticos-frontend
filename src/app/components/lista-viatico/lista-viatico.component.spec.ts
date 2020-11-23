import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaViaticoComponent } from './lista-viatico.component';

describe('ListaViaticoComponent', () => {
  let component: ListaViaticoComponent;
  let fixture: ComponentFixture<ListaViaticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaViaticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaViaticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
