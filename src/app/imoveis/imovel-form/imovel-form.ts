import { Component, OnInit } from '@angular/core';
import { ImovelService } from '../imovel-service';
import { Imovel } from '../imovel.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-imovel-form',
  standalone: false,
  templateUrl: './imovel-form.html',
  styleUrl: './imovel-form.css'
})
export class ImovelForm implements OnInit {
  imovel: Imovel = {
    id: 0,
    bloco: '',
    apartamento: '',
    boxGaragem: ''
  };

  constructor(
    private imovelService: ImovelService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.imovelService.getImovel(id).subscribe({
        next: (imovel) => {
          this.imovel = imovel;
        },
        error: (err) => console.error('Erro ao carregar imóvel:', err)
      });
    }
  }

  salvar() {
    
    this.imovel.id = Number(this.imovel.id);

    const request = this.imovel.id 
      ? this.imovelService.atualizarImovel(this.imovel)
      : this.imovelService.adicionarImovel(this.imovel);

    request.subscribe(() => this.router.navigate(['/imoveis']));
  }
}
