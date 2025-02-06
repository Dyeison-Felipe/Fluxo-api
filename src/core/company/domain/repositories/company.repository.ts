import { Company } from "../company.entity";

export interface CompanyRepository {
  create(create: Company): Promise<Company>;
}