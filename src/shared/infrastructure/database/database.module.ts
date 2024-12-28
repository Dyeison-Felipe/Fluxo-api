import { Module } from '@nestjs/common';
import { EnvConfigModule } from '../envConfig/envConfig.module';
import { EnvConfigService } from '../envConfig/envConfig.service';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvConfigModule],
      useFactory: async (envConfig: EnvConfigService) => ({
        type: 'mysql',
        host: envConfig.getDbHost(),
        port: envConfig.getDbPort(),
        username: envConfig.getDbUser(),
        password: envConfig.getDbPassword(),
        database: envConfig.getDbName(),
        entities: [],
        migrations: [`${__dirname}/migration/{.ts,*.js}`],
        migrationsRun: true,
        synchronize: false,
      }),
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
      inject: [EnvConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
