import { RolePagesSchema } from 'src/core/rolesPages/infrastructure/rolesPages.schema';
import { UserSchema } from 'src/core/user/infrastructure/user.schema';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'role' })
export class RolesSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @OneToMany(() => RolePagesSchema, (role) => role.role)
  rolePages: RolePagesSchema[];

  @OneToMany(() => UserSchema, (user) => user.role)
  users: UserSchema[];
}
