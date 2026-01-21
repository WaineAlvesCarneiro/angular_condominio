// src\app\pages\moradores\morador-lista\morador-lista.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../notification/services/notification-service';
import { DialogService } from '../../../modal/services/dialog-service';
import { Morador } from '../morador.model';
import { MoradorService } from '../services/morador-service';

@Component({
  selector: 'app-morador-lista',
  standalone: false,
  templateUrl: './morador-lista.html',
  styleUrl: './morador-lista.css'
})
export class MoradorLista {
  moradores: Morador[] = [];
  totalCount: number = 0;
  pageIndex: number = 0;
  linesPerPage: number = 0;

  constructor(
    private moradorService: MoradorService,
    private router: Router,
    private notificationService: NotificationService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.carregarMoradoresPage();
  }

  getMoradores() {
    this.moradorService.getMoradores().subscribe({
      next: (dados) => {
        this.moradores = dados;
      },
      error: (err) => {
        if (err.error && err.error.erro) {
          this.notificationService.showAlerta(err.error.erro);
        } else {
          this.notificationService.showError('Erro ao carregar moradores.');
          console.error('Erro ao carregar moradores metodo getMoradores: ', err);
        }
      }
    });
  }

  carregarMoradoresPage(page: number = 0) {
    this.moradorService.getMoradoresPage(page, 10, 'nome', 'ASC').subscribe({
      next: response => {
        if (response.sucesso) {
          this.moradores = Array.isArray(response.dados.items) ? response.dados.items : [];
          this.totalCount = response.dados.totalCount;
          this.pageIndex = response.dados.pageIndex;
          this.linesPerPage = response.dados.linesPerPage;
        } else {
          if (response.erro) {
            this.notificationService.showAlerta(response.erro);
          } else {
            this.notificationService.showError('Erro ao carregar moradores.');
            console.error('Erro ao carregar moradores metodo carregarMoradoresPage: ', response.erro);
          }
        }
      },
      error: (err) => {
        if (err.error && err.error.erro) {
          this.notificationService.showAlerta(err.error.erro);
        } else {
          this.notificationService.showError('Erro ao carregar moradores.');
          console.error('Erro ao carregar moradores metodo carregarMoradoresPage: ', err);
        }
      }
    });
  }

  editarMorador(id: number) {
    this.router.navigate(['/moradores/', id]);
  }

  excluirMorador(id: number) {
    this.dialogService.openConfirmation('Tem certeza que deseja excluir este morador?').subscribe(confirmed => {
      if (confirmed) {
        this.moradorService.excluirMorador(id).subscribe({
          next: () => {
            this.notificationService.showSuccess('Morador excluído com sucesso!');
            this.carregarMoradoresPage();
          },
          error: (err) => {
            if (err.error && err.error.erro) {
              this.notificationService.showAlerta(err.error.erro);
            } else {
              this.notificationService.showError('Erro ao excluir morador.');
              console.error('Erro ao excluir morador: ', err);
            }
          }
        });
      }
    });
  }
}
