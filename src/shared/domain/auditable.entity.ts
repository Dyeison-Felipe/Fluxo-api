export type AuditableProps = {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class Auditable {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(props: AuditableProps) {
    this.createdAt = props?.createdAt;
    this.updatedAt = props?.updatedAt;
    this.deletedAt = props?.deletedAt;
  }
}
