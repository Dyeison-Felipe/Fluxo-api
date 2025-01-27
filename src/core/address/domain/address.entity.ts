import { Auditable, AuditableProps } from 'src/shared/domain/auditable.entity';

export type AddressProps = AuditableProps & {
  id: number;
  cep: string;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
  complement: string;
};

export class AddressEntity extends Auditable {
  id: number;
  cep: string;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
  complement: string;

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
  }
}
