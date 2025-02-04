type PagesProps = {
  id?: number;
  name: string;
}

export class Pages {
  id: number;
  name: string;
  constructor(props?: PagesProps) {
    this.id = props?.id;
    this.name = props?.name;
  }
}