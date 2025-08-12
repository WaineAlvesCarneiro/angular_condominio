import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MoradorService } from '../morador-service';
import { Morador } from '../morador.model';

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

  constructor(private moradorService: MoradorService, private router: Router) {}

  ngOnInit(): void {
    this.carregarMoradoresPage();
  }

  getMoradores() {
    this.moradorService.getMoradores().subscribe({
      next: (dados) => {
        this.moradores = dados;
        // console.log('Moradores carregados:', this.moradores);
      },
      error: (err) => console.error('Erro ao carregar produtos:', err)
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

          // console.log('Response dados:', response.dados);
          //console.log('Items:', response.dados.items);
        } else {
          console.error('Erro:', response.erro);
        }
      },
      error: err => console.error('Erro na requisição:', err)
    });
  }

  editarMorador(id: number) {
    //console.log('Navegando para edição do morador:', id);
    this.router.navigate(['/moradores/', id]);
  }

  excluirMorador(id: number) {
    //console.log('Excluindo morador com id:', id);
    this.moradorService.excluirMorador(id).subscribe({
      next: () => {
        //console.log('Morador excluído com sucesso, recarregando lista...');
        this.carregarMoradoresPage();
      },
      error: (err) => console.error('Erro ao excluir morador:', err)
    });
  }
}
