import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/infrastructure/database/database.module';
import { EnvConfigModule } from './shared/infrastructure/envConfig/envConfig.module';

@Module({
  imports: [DatabaseModule, EnvConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
