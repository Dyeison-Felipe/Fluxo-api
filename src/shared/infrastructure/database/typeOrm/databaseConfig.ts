import { EnvConfigService } from '../../envConfig/envConfig.service';
import { ConfigService } from '@nestjs/config';
import { Connection, createConnection } from 'mysql2/promise';
import { AddressSchema } from 'src/core/address/infrastructure/address.schema';
import { CompanySchema } from 'src/core/company/infrastructure/company.schema';
import { OwnerTypeSchema } from 'src/core/ownerType/infrastructure/ownerType.schema';
import { UserSchema } from 'src/core/user/infrastructure/user.schema';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { DataSource, DataSourceOptions } from 'typeorm';
import { RolesSchema } from 'src/core/roles/infrastructure/roles.schema';

const envConfig = new EnvConfigService(new ConfigService());

export async function setupDatabase(
  options: MysqlConnectionOptions,
): Promise<void> {
  console.log('🚀 ~ setupDatabase ~ options:', options);
  let connection: Connection | null = null;

  try {
    // Conectar ao banco de dados MySQL
    connection = await createConnection({
      host: options.host,
      port: options.port as number,
      user: options.username,
      password: options.password,
      database: options.database,
    });

    // Verificar se o banco de dados existe
    const [rows] = await connection.query(
      'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?',
      [options.database],
    );

    // Criar o banco de dados se ele não existir
    if ((rows as any[]).length === 0) {
      await connection.query(`CREATE DATABASE \`${options.database}\``);
      console.log(`Banco de dados ${options.database} criado.`);
    }
  } catch (error) {
    console.error(`Erro ao criar banco de dados ${options.database}: `, error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: envConfig.getDbHost(),
  port: envConfig.getDbPort(),
  username: envConfig.getDbUser(),
  password: envConfig.getDbPassword(),
  database: envConfig.getDbName(),
  entities: [
    OwnerTypeSchema,
    AddressSchema,
    CompanySchema,
    UserSchema,
    RolesSchema,
  ], // Certifique-se de que o caminho para os schemas está correto
  migrations: [`${__dirname}/migrations/{.ts,*.js}`], // Ajuste o caminho conforme necessário
  synchronize: false, // Defina como false para ambientes de produção
  migrationsRun: true,
};

// Inicializar o DataSource do TypeORM
export const connectionSource = new DataSource(dataSourceOptions);
