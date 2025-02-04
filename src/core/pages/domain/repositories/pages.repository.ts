import { Pages } from "../pages.entity";

export interface PagesRepository {
  findAll(): Promise<Pages[]>;
  create(role: Pages): Promise<Pages>;
  update(role: Pages): Promise<Pages>;
  delete(id: number): Promise<void>;
  findByName(name: string): Promise<Pages>;
  findById(id: number): Promise<Pages>;
  findByIds(ids: number[]): Promise<Pages[]>;
}
