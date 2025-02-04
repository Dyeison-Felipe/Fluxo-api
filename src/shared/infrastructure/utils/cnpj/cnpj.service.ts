import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { CnpjService } from "src/shared/application/utils/cnpj/cnpj.service";
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CnpjServiceImpl implements CnpjService {
  constructor(private readonly httpService: HttpService) { }
  async searchCnpj(cnpj: string): Promise<any> {
    const url = `https://receitaws.com.br/v1/cnpj/${cnpj}`; // Exemplo de URL da API
    try {
      const response = await firstValueFrom(this.httpService.get(url)); // Faz a requisição HTTP
      
      return response.data; // Retorna os dados da consulta
    } catch (error) {
      throw error; // Lida com o erro conforme necessário
    }
  }
}