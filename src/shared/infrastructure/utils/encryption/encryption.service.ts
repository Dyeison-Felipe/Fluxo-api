import { Encryption } from 'src/shared/application/utils/encryption/encryption';
import * as bcrypt from 'bcryptjs';
import { EnvConfig } from '../../envConfig/envConfig.interface';

export class EncryptionImpl implements Encryption {
  constructor(private readonly envConfigService: EnvConfig) {}
  compareHash(passwordCompare: string, passwordEncrypted: string): boolean {
    return bcrypt.compareSync(passwordCompare, passwordEncrypted);
  }

  generateHash(password: string): string {
    const salts = this.envConfigService.getEncryptionSalts();
    return bcrypt.hashSync(password, salts);
  }
}
