import { AuditableOutput } from '../../../../shared/application/output/autitable.output';

export type LoginOutput = AuditableOutput & {
  id: number;
  username: string;
};
