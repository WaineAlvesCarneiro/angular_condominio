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
  totalPages: number = 0;

  constructor(private moradorService: MoradorService, private router: Router) {}

  ngOnInit(): void {
    this.carregarMoradores();
  }

  carregarMoradores(page: number = 0) {
    this.moradorService.getMoradores(page).subscribe(response => {
      this.moradores = response.content.map(MoradorAdapter.fromApi);
      this.totalPages = response.totalPages;
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
