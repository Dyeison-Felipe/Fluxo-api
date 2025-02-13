import { Company } from "../company.entity";

export interface CompanyRepository {
  create(create: Company): Promise<Company>;
  findAllCompanyById(id: number, addressId: number): Promise<Company>
  update(update: Company): Promise<Company>;
}