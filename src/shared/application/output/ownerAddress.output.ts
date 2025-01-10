import { AuditableOutput } from './autitable.output';

export type OwnerAddressOutput = AuditableOutput & {
  id: number;
  type: string;
};
