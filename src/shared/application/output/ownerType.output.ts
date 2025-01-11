import { AuditableOutput } from './autitable.output';

export type OwnerTypeOutput = AuditableOutput & {
  id: number;
  type: string;
};
