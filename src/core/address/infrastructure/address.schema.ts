import { CompanySchema } from 'src/core/company/infrastructure/company.schema';
import { OwnerTypeSchema } from 'src/core/ownerType/infrastructure/ownerType.schema';
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
  @ManyToOne(() => OwnerTypeSchema, (ownerAddress) => ownerAddress.address)
  ownerAddressId: OwnerTypeSchema;

  @OneToOne(() => CompanySchema, (company) => company.addressId)
  companyId: CompanySchema;
}
