import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoradorService } from '../morador-service';
import { Morador } from '../morador.model';
import { ImovelService } from '../../imoveis/imovel-service';
import { Imovel } from '../../imoveis/imovel.model';
import { formatarDataParaInput, formatarDataParaApi } from '../../shared/utils/date-utils';

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
    imovel: undefined
  };

  imoveis: Imovel[] = [];

  constructor(
    private moradorService: MoradorService,
    private imovelService: ImovelService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.imovelService.getImoveis().subscribe({
      next: (res) => {
        this.imoveis = res;
      },
      error: (err) => {
        console.error('Erro ao carregar imóveis', err);
      }
    });

    if (id) {
      this.moradorService.getMorador(id).subscribe({
        next: (p) => {
          this.morador = {
            ...p,
            dataEntrada: formatarDataParaInput(p.dataEntrada) || '',
            dataSaida: p.dataSaida ? formatarDataParaInput(p.dataSaida) : null,
            dataInclusao: formatarDataParaInput(p.dataInclusao) || '',
            dataAlteracao: p.dataAlteracao ? formatarDataParaInput(p.dataAlteracao) : null
          };
        },
        error: (err) => console.error('Erro ao carregar morador', err)
      });
    }
  }

  salvar() {
    const dataAtual = new Date().toISOString();

    if (this.morador.id === 0) {
      this.morador.dataInclusao = dataAtual;
      this.morador.dataAlteracao = null;
    } else {
      this.morador.dataAlteracao = dataAtual;
    }

    const imovelIdNum = Number(this.morador.imovelId);
    const imovelSelecionado = this.imoveis.find(i => i.id === imovelIdNum);

    if (!imovelSelecionado) {
      alert('Imóvel inválido. Verifique o campo e tente novamente.');
      return;
    }

    const moradorToSend: Morador = {
      id: this.morador.id,
      nome: this.morador.nome,
      celular: this.morador.celular,
      email: this.morador.email,
      isProprietario: this.morador.isProprietario,
      dataEntrada: formatarDataParaApi(this.morador.dataEntrada),
      dataSaida: formatarDataParaApi(this.morador.dataSaida),
      dataInclusao: formatarDataParaApi(this.morador.dataInclusao),
      dataAlteracao: this.morador.dataAlteracao ? formatarDataParaApi(this.morador.dataAlteracao) : null,
      imovelId: imovelIdNum,
      imovel: imovelSelecionado
    };

    const request = this.morador.id
      ? this.moradorService.atualizarMorador(moradorToSend)
      : this.moradorService.adicionarMorador(moradorToSend);

    request.subscribe(() => this.router.navigate(['/moradores']));
  }
}
