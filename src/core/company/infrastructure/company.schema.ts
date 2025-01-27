import { AddressSchema } from 'src/core/address/infrastructure/address.schema';
import { AuditableSchema } from 'src/shared/infrastructure/auditable.schema';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CompanySchema extends AuditableSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  fantasyName: string;

  @Column()
  cpnj: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @JoinColumn({ name: 'addressId' })
  @OneToOne(() => AddressSchema, (address) => address.companyId)
  addressId: AddressSchema;
}
