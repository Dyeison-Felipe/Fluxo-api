import { Encryption } from 'src/shared/application/utils/encryption/encryption';
import { compareSync, hashSync } from 'bcrypt';
import { EnvConfig } from '../envConfig/envConfig.interface';

export class EncryptionImpl implements Encryption {
  constructor(private readonly envConfigService: EnvConfig) {}
  compareHash(passwordCompare: string, passwordEncrypted: string): boolean {
    return compareSync(passwordCompare, passwordEncrypted);
  }

  generateHash(password: string): string {
    const salts = this.envConfigService.getEncryptionSalts();
    return hashSync(password, salts);
  }
}
