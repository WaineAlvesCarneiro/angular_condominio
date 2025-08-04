export interface Morador {
  id: number;
  data_alteracao: Date;
  data_entrada: Date;
  data_inclusao: Date;
  data_saida: Date | null; 
  email: string;
  is_proprietario: boolean;
  nome: string;
  imovel_id: number;
  imovel?: any;
  imovelApto: string | null;
  imovelBloco: string | null;
  imovelBox: string | null;
}