// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AddressSchema } from 'src/core/address/infrastructure/address.schema';
// import { CompanySchema } from 'src/core/company/infrastructure/company.schema';
// import { OwnerTypeSchema } from 'src/core/ownerType/infrastructure/ownerType.schema';
// import { UserSchema } from 'src/core/user/infrastructure/user.schema';
// import { Providers } from 'src/shared/infrastructure/constants/moduleConstants';
// import { EnvConfigModule } from 'src/shared/infrastructure/envConfig/envConfig.module';
// import { EnvConfigService } from 'src/shared/infrastructure/envConfig/envConfig.service';
// import { DataSource } from 'typeorm';
// import { addTransactionalDataSource } from 'typeorm-transactional';

// export function configDatabase() {
//   const module = TypeOrmModule.forRootAsync({
//     imports: [EnvConfigModule],
//     useFactory: async (envConfig: EnvConfigService) => {
//       return {
//         type: 'mysql',
//         host: envConfig.getDbHost(),
//         port: envConfig.getDbPort(),
//         username: envConfig.getDbUser(),
//         password: envConfig.getDbPassword(),
//         database: envConfig.getDbName(),
//         entities: [OwnerTypeSchema, AddressSchema, CompanySchema, UserSchema],
//         synchronize: true,
//         logging: true,
//       };
//     },
//     inject: [Providers.ENV_CONFIG_SERVICE],
//     dataSourceFactory: async (options) => {
//       if (!options) {
//         throw new Error('Invalid options passed');
//       }

//       return addTransactionalDataSource(new DataSource(options));
//     },
//     inject: [Providers.ENV_CONFIG_SERVICE],
//   });
// }
