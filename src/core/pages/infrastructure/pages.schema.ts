import { RolePagesSchema } from "src/core/rolesPages/infrastructure/rolesPages.schema";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'pages' })
export class PagesSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => RolePagesSchema, (pages) => pages.page)
  rolePages: RolePagesSchema[];
}