type RoleProps = {
  id?: number;
  name: string;
};

export class Role {
  id: number;
  name: string;
  constructor(props?: RoleProps) {
    this.id = props?.id;
    this.name = props?.name;
  }
}
