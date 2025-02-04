import { PagesSchema } from "src/core/pages/infrastructure/pages.schema";
import { RolesSchema } from "src/core/roles/infrastructure/roles.schema";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'rolespages' })
export class RolePagesSchema {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RolesSchema, (role) => role.rolePages)
  @JoinColumn({ name: 'role_id' })
  role: RolesSchema;

  @ManyToOne(() => PagesSchema, (page) => page.rolePages)
  @JoinColumn({ name: 'page_id' })
  page: PagesSchema;
}
