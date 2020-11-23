import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarViaticosComponent } from './listar-viaticos.component';

describe('ListarViaticosComponent', () => {
  let component: ListarViaticosComponent;
  let fixture: ComponentFixture<ListarViaticosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarViaticosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarViaticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
