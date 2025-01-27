import { Auditable, AuditableProps } from 'src/shared/domain/auditable.entity';

type OwnerAddressProps = AuditableProps & {
  id?: number;
  type: string;
};

export class OwnerType extends Auditable {
  id: number;
  type: string;

  constructor(props?: OwnerAddressProps) {
    super(props);
    this.id = props?.id;
    this.type = props?.type;
  }
}
