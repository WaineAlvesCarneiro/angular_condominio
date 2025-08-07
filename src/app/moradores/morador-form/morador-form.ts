import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoradorService } from '../morador-service';
import { Morador } from '../morador.model';
import { ImovelService } from '../../imoveis/imovel-service';
import { Imovel } from '../../imoveis/imovel.model';
import { MoradorAdapter } from '../../shared/adapters/morador.adapter';

@Component({
  selector: 'app-morador-form',
  standalone: false,
  templateUrl: './morador-form.html',
  styleUrl: './morador-form.css'
})
export class MoradorForm {
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
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.imovelService.getImoveis().subscribe({
      next: (res) => {
        this.imoveis = res.dados;
        //console.log('Imoveis carregados:', this.imoveis);
      },
      error: (err) => {
        console.error('Erro ao carregar imóveis', err);
      }
    });

    if (id) {
      this.moradorService.getMorador(id).subscribe({
        next: (result) => {
          if (result.sucesso) {
            this.morador = MoradorAdapter.fromApi(result.dados);
            //console.log('Morador carregado:', this.morador);
          } else {
            console.error('Erro da API:', result.erro);
          }
        },
        error: (err) => console.error('Erro HTTP:', err)
      });
    }
  }

  salvar() {
    const imovelSelecionado = this.imoveis.find(i => i.id === Number(this.morador.imovelId));

    if (!imovelSelecionado) {
      alert('Imóvel inválido. Verifique o campo e tente novamente.');
      return;
    }

    this.morador.imovelDto = imovelSelecionado;

    if (this.morador.id === 0) {
      this.morador.dataInclusao = new Date().toISOString();
      this.morador.dataAlteracao = null;
    } else {
      this.morador.dataAlteracao = new Date().toISOString();
    }
    console.log('this.morador:', this.morador);
    const moradorToSend = MoradorAdapter.toApi(this.morador);
    console.log('moradorToSend:', moradorToSend);
    const request = this.morador.id
      ? this.moradorService.atualizarMorador(moradorToSend)
      : this.moradorService.adicionarMorador(moradorToSend);

    request.subscribe(() => this.router.navigate(['/moradores']));
  }
}
