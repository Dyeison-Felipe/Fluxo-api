import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressSchema } from 'src/core/address/infrastructure/address.schema';
import { CompanySchema } from 'src/core/company/infrastructure/company.schema';
import { OwnerTypeSchema } from 'src/core/ownerType/infrastructure/ownerType.schema';
import { UserSchema } from 'src/core/user/infrastructure/user.schema';
import { Providers } from 'src/shared/infrastructure/constants/moduleConstants';
import { EnvConfigModule } from 'src/shared/infrastructure/envConfig/envConfig.module';
import { EnvConfigService } from 'src/shared/infrastructure/envConfig/envConfig.service';
import { DataSource } from 'typeorm';
import { setupDatabase } from '../databaseConfig';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export function configDatabase() {
  const isTestEnvironment = process.env.NODE_ENV === 'test';

  const module = TypeOrmModule.forRootAsync({
    imports: [EnvConfigModule],
    useFactory: async (envConfig: EnvConfigService) => {
      return {
        type: isTestEnvironment ? 'sqlite' : 'mysql',
        host: isTestEnvironment ? undefined : envConfig.getDbHost(),
        port: isTestEnvironment ? undefined : envConfig.getDbPort(),
        username: isTestEnvironment ? undefined : envConfig.getDbUser(),
        password: isTestEnvironment ? undefined : envConfig.getDbPassword(),
        database: isTestEnvironment ? ':memory' : envConfig.getDbName(),
        entities: [OwnerTypeSchema, AddressSchema, CompanySchema, UserSchema],
        synchronize: true,
        logging: isTestEnvironment,
      };
    },
    inject: [Providers.ENV_CONFIG_SERVICE],
    dataSourceFactory: async (options) => {
      if (!options) {
        throw new Error('Invalid options passed');
      }

      await setupDatabase(options as MysqlConnectionOptions);
      return new DataSource(options);
    },
  });
  return module;
}
