import { AuditableOutput } from '../../../../shared/application/output/autitable.output';

export type OwnerTypeOutput = AuditableOutput & {
  id: number;
  type: string;
};
