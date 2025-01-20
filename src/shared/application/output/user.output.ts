import { AuditableOutput } from './autitable.output';

export type UserOutput = AuditableOutput & {
  id: number;
  username: string;
};
