// src\app\pages\imoveis\imovel-form\imovel-form.ts

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../notification/services/notification-service';
import { Imovel } from '../imovel.model';
import { ImovelService } from '../services/imovel-service';

@Component({
  selector: 'app-imovel-form',
  standalone: false,
  templateUrl: './imovel-form.html',
  styleUrls: ['./imovel-form.css']
})
export class ImovelForm implements OnInit , AfterViewInit {
  @ViewChild('focusInput') focusInputRef!: ElementRef;
  
  ngAfterViewInit(): void {
    this.focusInputRef.nativeElement.focus();
  }

  imovelForm!: FormGroup;
  isSaving = false;
  formSubmetido = false;

  imovel: Imovel = {
    id: 0,
    bloco: '',
    apartamento: '',
    boxGaragem: ''
  };

  constructor(
    private imovelService: ImovelService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.imovelForm = this.fb.group({
      id: [{ value: 0, disabled: true }],
      bloco: ['', Validators.required],
      apartamento: ['', Validators.required],
      boxGaragem: ['', Validators.required]
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.imovelService.getImovel(id).subscribe({
        next: (result) => {
          this.imovel = result;

          this.imovelForm.patchValue({
            id: result.id,
            bloco: result.bloco,
            apartamento: result.apartamento,
            boxGaragem: result.boxGaragem
          });
          this.imovelForm.get('id')?.disable();
        },
        error: (err) => {
          if (err.error && err.error.erro) {
            this.notificationService.showAlerta(err.error.erro);
          } else {
            this.notificationService.showError('Erro ao carregar imóvel.');
            console.error('Erro ao carregar imóvel com id metodo ngOnInit: ', err);
          }
        }
      });
    }
  }

  salvar(): void {
    this.formSubmetido = true;
    this.imovelForm.markAllAsTouched();

    if (this.imovelForm.invalid) {
      this.notificationService.showAlerta('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    this.isSaving = true;

    const imovelSalvar = { ...this.imovel, ...this.imovelForm.getRawValue() };

    const request = imovelSalvar.id 
      ? this.imovelService.atualizarImovel(imovelSalvar)
      : this.imovelService.adicionarImovel(imovelSalvar);

    request.subscribe({
      next: () => {
        this.isSaving = false;
        this.notificationService.showSuccess('Imóvel salvo com sucesso!');
        this.router.navigate(['/imoveis']);
      },
      error: (err) => {
        this.isSaving = false;
        if (err.error && err.error.erro) {
          this.notificationService.showAlerta(err.error.erro);
        } else {
          this.notificationService.showError('Erro ao salvar imóvel.');
          console.error('Erro ao salvar imóvel metodo salvar: ', err);
        }
      }
    });
  }

  cancelar(): void {
    this.formSubmetido = false;
    this.router.navigate(['/imoveis']);
  }
}