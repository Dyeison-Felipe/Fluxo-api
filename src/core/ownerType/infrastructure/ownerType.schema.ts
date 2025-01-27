import { AddressSchema } from 'src/core/address/infrastructure/address.schema';
import { AuditableSchema } from 'src/shared/infrastructure/auditable.schema';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ownerType' })
export class OwnerTypeSchema extends AuditableSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @OneToMany(() => AddressSchema, (address) => address.ownerAddressId)
  address: AddressSchema;
}
