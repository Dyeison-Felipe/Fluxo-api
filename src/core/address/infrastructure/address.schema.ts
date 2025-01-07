import { CompanySchema } from 'src/core/company/infrastructure/company.schema';
import { OwnerAddressSchema } from 'src/core/owner-address/infrastructure/ownerAddress.schema';
import { AuditableSchema } from 'src/shared/infrastructure/auditable.schema';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'address' })
export class AddressSchema extends AuditableSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cep: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  complement: string;

  @JoinColumn()
  @ManyToOne(() => OwnerAddressSchema, (ownerAddress) => ownerAddress.address)
  ownerAddressId: OwnerAddressSchema;

  @OneToOne(() => CompanySchema, (company) => company.addressId)
  companyId: CompanySchema;
}
