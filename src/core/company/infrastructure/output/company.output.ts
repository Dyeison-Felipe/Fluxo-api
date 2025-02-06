import { AuditableOutput } from "src/shared/application/output/autitable.output";

export type CompanyOutput = AuditableOutput & {
  id?: number
  name: string;
  fantasyName: string;
  cnpj: string;
  email: string;
  phoneNumber: string;
  address: {
    id?: number;
    cep: string;
    country: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: number;
    complement: string;
    ownerType: {
      id?: number;
      type: string;
    };
  };
}