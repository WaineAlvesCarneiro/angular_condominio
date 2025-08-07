import { Component } from '@angular/core';
import { ImovelService } from '../imovel-service';
import { Imovel } from '../imovel.model';
import { Router } from '@angular/router';

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

  constructor(private imovelService: ImovelService, private router: Router) {}

  ngOnInit(): void {
    this.carregarImoveisPage();
  }

  getImoveis() {
    this.imovelService.getImoveis().subscribe({
      next: (dados) => {
        this.imoveis = dados.dados;
        // console.log('Imoveis carregados:', this.imoveis);
      },
      error: (err) => console.error('Erro ao carregar produtos:', err)
    });
  }

  carregarImoveisPage(page: number = 0) {
    this.imovelService.getImoveisPage(0, 10, 'bloco', 'ASC').subscribe({
      next: response => {
        if (response.sucesso) {
          // console.log('Imoveis carregar Page:', response.dados);
          this.imoveis = response.dados.items;
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

  editarImovel(id: number) {
    //console.log('Navegando para edição do imovel:', id);
    this.router.navigate(['/imoveis/', id]);
  }

  excluirImovel(id: number) {
    //console.log('Excluindo imovel com id:', id);
    this.imovelService.excluirImovel(id).subscribe({
      next: () => {
        //console.log('Imovel excluído com sucesso, recarregando lista...');
        this.carregarImoveisPage();
      },
      error: (err) => console.error('Erro ao excluir imovel:', err)
    });
  }
}
