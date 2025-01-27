import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'role' })
export class RolesSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;
}
