import { Morador } from '../../moradores/morador.model';
import { formatarDataParaInput, formatarDataParaApi } from '../../shared/utils/date-utils';

export class MoradorAdapter {
  static fromApi(apiData: any): Morador {
    return {
      id: apiData.id,
      nome: apiData.nome,
      celular: apiData.celular,
      email: apiData.email,
      isProprietario: apiData.isProprietario,
      dataEntrada: formatarDataParaInput(apiData.dataEntrada) || '',      // obrigatória
      dataSaida: apiData.dataSaida ? formatarDataParaInput(apiData.dataSaida) : null,
      dataInclusao: formatarDataParaInput(apiData.dataInclusao) || '',     // obrigatória
      dataAlteracao: apiData.dataAlteracao ? formatarDataParaInput(apiData.dataAlteracao) : null,
      imovelId: apiData.imovelId,
      imovel: apiData.imovel ? {
        id: apiData.imovel.id,
        bloco: apiData.imovel.bloco,
        apartamento: apiData.imovel.apartamento,
        boxGaragem: apiData.imovel.boxGaragem
      } : undefined
    };
  }

  static toApi(morador: Morador): any {
    return {
      id: morador.id,
      nome: morador.nome,
      celular: morador.celular,
      email: morador.email,
      isProprietario: morador.isProprietario,
      dataEntrada: formatarDataParaApi(morador.dataEntrada),
      dataSaida: formatarDataParaApi(morador.dataSaida),
      dataInclusao: formatarDataParaApi(morador.dataInclusao),
      dataAlteracao: morador.dataAlteracao ? formatarDataParaApi(morador.dataAlteracao) : null,
      imovelId: morador.imovelId,
      imovel: morador.imovel ? {
        id: morador.imovel.id,
        bloco: morador.imovel.bloco,
        apartamento: morador.imovel.apartamento,
        boxGaragem: morador.imovel.boxGaragem
      } : undefined
    };
  }
}
