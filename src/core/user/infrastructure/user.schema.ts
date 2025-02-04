import { RolesSchema } from 'src/core/roles/infrastructure/roles.schema';
import { AuditableSchema } from 'src/shared/infrastructure/auditable.schema';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserSchema extends AuditableSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => RolesSchema, (role) => role.users)
  @JoinColumn({ name: 'role' })
  role: RolesSchema;
}
