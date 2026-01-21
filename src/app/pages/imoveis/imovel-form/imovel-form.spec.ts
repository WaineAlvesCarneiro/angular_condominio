import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImovelForm } from './imovel-form';

describe('ImovelForm', () => {
  let component: ImovelForm;
  let fixture: ComponentFixture<ImovelForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImovelForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImovelForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
