export interface CnpjService {
  searchCnpj(cnpj: string): Promise<any>;
}