import { Body, Controller, Post } from "@nestjs/common";
import { CreateCompanyUseCase } from "../../application/usecase/createCompany.usecase";
import { CreateCompanyDto } from "../dtos/createCompany.dto";
import { CompanyPresenter } from "../presenter/company.presenter";

@Controller('/api/company/v1')
export class CompanyController {
  constructor(private readonly createCompanyUseCase: CreateCompanyUseCase) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto): Promise<CompanyPresenter> {
    const company = await this.createCompanyUseCase.execute(createCompanyDto);

    return company
  }
}