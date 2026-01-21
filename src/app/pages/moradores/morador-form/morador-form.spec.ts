import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoradorForm } from './morador-form';

describe('MoradorForm', () => {
  let component: MoradorForm;
  let fixture: ComponentFixture<MoradorForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoradorForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoradorForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
