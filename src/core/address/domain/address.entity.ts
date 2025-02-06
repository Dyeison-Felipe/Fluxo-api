import { OwnerType } from 'src/core/ownerType/domain/ownerType.entity';
import { Auditable, AuditableProps } from 'src/shared/domain/auditable.entity';

export type AddressProps = AuditableProps & {
  id?: number;
  cep: string;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
  complement: string;
  ownerType: OwnerType;
};

export class Address extends Auditable {
  id?: number;
  cep: string;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
  complement: string;
  ownerType: OwnerType;

  constructor(props: AddressProps) {
    super(props);
    this.id = props.id;
    this.cep = props.cep;
    this.country = props.country;
    this.state = props.state;
    this.city = props.city;
    this.neighborhood = props.neighborhood;
    this.street = props.street;
    this.number = props.number;
    this.complement = props.complement;
    this.ownerType = props.ownerType;
  }
}
