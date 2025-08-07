import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MoradorService } from '../morador-service';
import { Morador } from '../morador.model';
import { MoradorAdapter } from '../../shared/adapters/morador.adapter';

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

  carregarMoradores() {
    this.moradorService.getMoradores().subscribe({
      next: (dados) => {
        this.moradores = dados;
        // console.log('Moradores carregados:', this.moradores);
      },
      error: (err) => console.error('Erro ao carregar produtos:', err)
    });
  }

  carregarMoradoresPage(page: number = 0) {
    this.moradorService.getMoradoresPage(0, 10, 'nome', 'ASC').subscribe({
      next: response => {
        if (response.sucesso) {
          //console.log('Moradores carregar Page:', response.dados);
          this.moradores = response.dados.items;
          this.totalCount = response.dados.totalCount;
          this.pageIndex = response.dados.pageIndex;
          this.linesPerPage = response.dados.linesPerPage;
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
        this.carregarMoradores();
      },
      error: (err) => console.error('Erro ao excluir morador:', err)
    });
  }
}
