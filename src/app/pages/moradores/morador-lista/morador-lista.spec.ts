import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoradorLista } from './morador-lista';

describe('MoradorLista', () => {
  let component: MoradorLista;
  let fixture: ComponentFixture<MoradorLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoradorLista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoradorLista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
