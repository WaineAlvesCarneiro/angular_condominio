// src\app\pages\moradores\morador-form\morador-form.ts

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../notification/services/notification-service';
import { Morador } from '../morador.model';
import { Imovel } from '../../imoveis/imovel.model';
import { MoradorAdapter } from '../../../shared/adapters/morador-adapter';
import { MoradorService } from '../services/morador-service';
import { ImovelService } from '../../imoveis/services/imovel-service';

@Component({
  selector: 'app-morador-form',
  standalone: false,
  templateUrl: './morador-form.html',
  styleUrls: ['./morador-form.css']
})
export class MoradorForm implements OnInit, AfterViewInit {
  @ViewChild('focusInput') focusInputRef!: ElementRef;
  
  ngAfterViewInit(): void {
    this.focusInputRef.nativeElement.focus();
  }

  moradorForm!: FormGroup;
  isSaving = false;
    formSubmetido = false;

  morador: Morador = {
    id: 0,
    nome: '',
    celular: '',
    email: '',
    isProprietario: true,
    dataEntrada: '',
    dataSaida: null,
    dataInclusao: '',
    dataAlteracao: null,
    imovelId: 0,
    imovelDto: undefined
  };

  imoveis: Imovel[] = [];

  constructor(
    private moradorService: MoradorService,
    private imovelService: ImovelService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.moradorForm = this.fb.group({
      id: [{ value: 0, disabled: true }],
      nome: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      email: ['', Validators.required],
      dataEntrada: ['', Validators.required],
      dataSaida: '',
      isProprietario: false,
      imovelId: ['', Validators.required]
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.imovelService.getImoveis().subscribe({
      next: (res) => {
        this.imoveis = res.dados;
      },
        error: (err) => {
          if (err.error && err.error.erro) {
            this.notificationService.showAlerta(err.error.erro);
          } else {
            this.notificationService.showError('Erro ao carregar imóvel.');
            console.error('Erro ao carregar imóvel metodo ngOnInit do morador: ', err);
          }
        }
    });

    if (id) {
      this.moradorService.getMorador(id).subscribe({
        next: (result) => {
          this.morador = result;

          this.moradorForm.patchValue({
            id: result.id,
            nome: result.nome,
            celular: result.celular,
            email: result.email,
            dataEntrada: result.dataEntrada,
            isProprietario: result.isProprietario,
            dataSaida: result.dataSaida,
            imovelId: result.imovelId
          });
          this.moradorForm.get('id')?.disable();
        },
        error: (err) => {
          if (err.error && err.error.erro) {
            this.notificationService.showAlerta(err.error.erro);
          } else {
            this.notificationService.showError('Erro ao carregar morador.');
            console.error('Erro ao carregar morador metodo ngOnInit: ', err);
          }
        }
      });
    }
  }

  salvar() {
    this.formSubmetido = true;
    this.moradorForm.markAllAsTouched();

    if (this.moradorForm.invalid) {
      this.notificationService.showAlerta('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const formValues = this.moradorForm.getRawValue();

    this.isSaving = true;

    const imovelSelecionado = this.imoveis.find(i => i.id === Number(formValues.imovelId));

    if (!imovelSelecionado) {
      this.notificationService.showAlerta('Imóvel inválido. Verifique o campo e tente novamente.');
      return;
    }

    this.morador = { ...this.morador, ...formValues };

    this.morador.imovelDto = imovelSelecionado;

    if (this.morador.id === 0) {
      this.morador.dataInclusao = new Date().toISOString();
      this.morador.dataAlteracao = null;
    } else {
      this.morador.dataAlteracao = new Date().toISOString();
    }
    const moradorToSend = MoradorAdapter.toApi(this.morador);
    const request = this.morador.id
      ? this.moradorService.atualizarMorador(moradorToSend)
      : this.moradorService.adicionarMorador(moradorToSend);

    request.subscribe({
        next: () => {
          this.isSaving = false;
          this.notificationService.showSuccess('Morador salvo com sucesso!');
          this.router.navigate(['/moradores']);
    },
        error: (err) => {
          this.isSaving = false;
          if (err.error && err.error.erro) {
            this.notificationService.showAlerta(err.error.erro);
          } else {
            this.notificationService.showError('Erro ao salvar morador.');
            console.error('Erro ao salvar morador metodo salvar: ', err);
          }
        }
      });
  }

  cancelar(): void {
    this.formSubmetido = false;
    this.router.navigate(['/moradores']);
  }
}
