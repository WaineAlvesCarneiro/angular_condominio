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
      imovelDto: apiData.imovelDto ? {
        id: apiData.imovelDto.id,
        bloco: apiData.imovelDto.bloco,
        apartamento: apiData.imovelDto.apartamento,
        boxGaragem: apiData.imovelDto.boxGaragem
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
      imovelDto: morador.imovelDto ? {
        id: morador.imovelDto.id,
        bloco: morador.imovelDto.bloco,
        apartamento: morador.imovelDto.apartamento,
        boxGaragem: morador.imovelDto.boxGaragem
      } : undefined
    };
  }
}
