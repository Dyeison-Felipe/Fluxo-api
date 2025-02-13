import { Body, Controller, Post, Put } from "@nestjs/common";
import { CreateCompanyUseCase } from "../../application/usecase/createCompany.usecase";
import { CreateCompanyDto } from "../dtos/createCompany.dto";
import { CompanyPresenter } from "../presenter/company.presenter";
import { UpdateCompanyUseCase } from "../../application/usecase/updateCompany.usecase";
import { UpdateCompanyDto } from "../dtos/updateCompany.dto";

@Controller('/api/company/v1')
export class CompanyController {
  constructor(private readonly createCompanyUseCase: CreateCompanyUseCase,
    // private readonly updateCompanyUseCase: UpdateCompanyUseCase,
  ) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto): Promise<CompanyPresenter> {
    const company = await this.createCompanyUseCase.execute(createCompanyDto);

    return company
  }

  // @Put()
  // async update(@Body() updateCompanyDto: UpdateCompanyDto): Promise<CompanyPresenter>{
  //   const company = await this.updateCompanyUseCase.execute(updateCompanyDto);

  //   return company;
  // }
}