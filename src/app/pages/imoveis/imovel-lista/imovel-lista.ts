// src\app\pages\imoveis\imovel-lista\imovel-lista.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../notification/services/notification-service';
import { DialogService } from '../../../modal/services/dialog-service';
import { Imovel } from '../imovel.model';
import { ImovelService } from '../services/imovel-service';

@Component({
  selector: 'app-imovel-lista',
  standalone: false,
  templateUrl: './imovel-lista.html',
  styleUrl: './imovel-lista.css'
})
export class ImovelLista {
  imoveis: Imovel[] = [];
  totalCount: number = 0;
  pageIndex: number = 0;
  linesPerPage: number = 0;

  constructor(
    private imovelService: ImovelService,
    private router: Router,
    private notificationService: NotificationService,
        private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.carregarImoveisPage();
  }

  getImoveis() {
    this.imovelService.getImoveis().subscribe({
      next: (dados) => {
        this.imoveis = dados.dados;
      },
      error: (err) => {
        if (err.error && err.error.erro) {
          this.notificationService.showAlerta(err.error.erro);
        } else {
          this.notificationService.showError('Erro ao carregar imoveis.');
          console.error('Erro ao carregar imoveis metodo getImoveis: ', err);
        }
      }
    });
  }

  carregarImoveisPage(page: number = 0) {
    this.imovelService.getImoveisPage(page, 10, 'id', 'ASC').subscribe({
      next: response => {
        if (response.sucesso) {
          this.imoveis = response.dados.items;
          this.totalCount = response.dados.totalCount;
          this.pageIndex = response.dados.pageIndex;
          this.linesPerPage = response.dados.linesPerPage;
        } else {
          if (response.erro) {
            this.notificationService.showAlerta(response.erro);
          } else {
            this.notificationService.showError('Erro ao carregar imoveis.');
            console.error('Erro ao carregar imoveis metodo carregarImoveisPage: ', response.erro);
          }
        }
      },
      error: (err) => {
        if (err.error && err.error.erro) {
          this.notificationService.showAlerta(err.error.erro);
        } else {
          this.notificationService.showError('Erro ao carregar imóvel.');
          console.error('Erro ao carregar imóvel metodo carregarImoveisPage: ', err);
        }
      }
    });
  }

  editarImovel(id: number) {
    this.router.navigate(['/imoveis/', id]);
  }

  excluirImovel(id: number) {
    this.dialogService.openConfirmation('Tem certeza que deseja excluir este imóvel?').subscribe(confirmed => {
      if (confirmed) {
      this.imovelService.excluirImovel(id).subscribe({
        next: () => {
          this.notificationService.showSuccess('Imóvel excluido com sucesso!');
          this.carregarImoveisPage();
        },
        error: (err) => {
          if (err.error && err.error.erro) {
            this.notificationService.showAlerta(err.error.erro);
          } else {
            this.notificationService.showError('Erro ao excluir imóvel.');
            console.error('Erro ao excluir imóvel metodo excluirImovel: ', err);
          }
          }
        });
      }
    });
  }
}