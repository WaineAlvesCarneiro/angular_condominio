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
  totalPages: number = 0;

  constructor(private imovelService: ImovelService, private router: Router) {}

  ngOnInit(): void {
    this.carregarImoveisPage();
  }

  carregarImoveis() {
    this.imovelService.getImoveis().subscribe({
      next: (data) => {
        this.imoveis = data;
        // console.log('Produtos carregados:', this.produtos);
      },
      error: (err) => console.error('Erro ao carregar produtos:', err)
    });
  }

  carregarImoveisPage(page: number = 0) {
    this.imovelService.getImoveisPage(0, 10).subscribe(response => {
      this.imoveis = response.content;
      this.totalPages = response.totalPages;
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
