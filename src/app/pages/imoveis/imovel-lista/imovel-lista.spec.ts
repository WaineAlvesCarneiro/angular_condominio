import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImovelLista } from './imovel-lista';

describe('ImovelLista', () => {
  let component: ImovelLista;
  let fixture: ComponentFixture<ImovelLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImovelLista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImovelLista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
