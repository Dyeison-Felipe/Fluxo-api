import { Module } from '@nestjs/common';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  connectionSource,
  dataSourceOptions,
  setupDatabase,
} from './typeOrm/databaseConfig';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => dataSourceOptions,

      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        await setupDatabase(options as MysqlConnectionOptions);

        return addTransactionalDataSource(connectionSource);
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
