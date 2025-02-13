import { Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { CnpjService } from "src/shared/application/utils/cnpj/cnpj.service";
import { Providers } from "../../constants/moduleConstants";

@Controller('/api/cnpj/v1')
export class CnpjController {
  constructor(@Inject(Providers.CNPJ_SERVICE) private readonly cnpjService: CnpjService) {}

  @Get(':cnpj')
  async getCnpj(@Param('cnpj') cnpj: string) {
    return this.cnpjService.searchCnpj(cnpj);
  }
}