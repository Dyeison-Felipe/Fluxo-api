import { Encryption } from 'src/shared/application/utils/encryption/encryption';
import { EnvConfigService } from '../envConfig/envConfig.service';
import { compareSync, hashSync } from 'bcrypt';

export class EncryptionImpl implements Encryption {
  constructor(private readonly envConfigService: EnvConfigService) {}
  compareHash(passwordCompare: string, passwordEncrypted: string): boolean {
    return compareSync(passwordCompare, passwordEncrypted);
  }

  generateHash(password: string): string {
    // const salts = this.envConfigService.getEncryptionSalts();
    return hashSync(password, 10);
  }
}
