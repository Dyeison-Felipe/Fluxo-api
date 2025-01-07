import { AddressEntity } from 'src/core/address/domain/address.entity';
import { Auditable, AuditableProps } from 'src/shared/domain/auditable.entity';

export type CompanyProps = AuditableProps & {
  id: number;
  name: string;
  fantasyName: string;
  cnpj: string;
  email: string;
  phoneNumber: string;
  addressId: AddressEntity;
};

export class Company extends Auditable {
  id: number;
  name: string;
  fantasyName: string;
  cnpj: string;
  email: string;
  phoneNumber: string;
  addressId: AddressEntity;

  constructor(props: CompanyProps) {
    super(props);
    this.id = props.id;
    this.name = props.name;
    this.fantasyName = props.fantasyName;
    this.cnpj = props.cnpj;
    this.email = props.email;
    this.phoneNumber = props.phoneNumber;
    this.addressId = props.addressId;
  }
}
