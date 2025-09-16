// src\app\pages\moradores\morador.model.ts

export interface Morador {
  id: number;
  nome: string;
  celular: string;
  email: string;
  isProprietario: boolean;
  dataEntrada: string | null;
  dataSaida: string | null;
  dataInclusao: string | null;
  dataAlteracao: string | null;
  imovelId: number;
  imovelDto?: {
    id: number;
    bloco: string;
    apartamento: string;
    boxGaragem: string;
  };
}
