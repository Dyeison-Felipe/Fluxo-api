import { EnvConfigService } from '../../envConfig/envConfig.service';
import { ConfigService } from '@nestjs/config';
import {
  Connection,
  ConnectionOptions,
  createConnection,
} from 'mysql2/promise';
import { AddressSchema } from 'src/core/address/infrastructure/address.schema';
import { CompanySchema } from 'src/core/company/infrastructure/company.schema';
import { OwnerTypeSchema } from 'src/core/ownerType/infrastructure/ownerType.schema';
import { UserSchema } from 'src/core/user/infrastructure/user.schema';
import { DataSource, DataSourceOptions } from 'typeorm';

const envConfig = new EnvConfigService(new ConfigService());

export async function setupDatabase(options: ConnectionOptions): Promise<void> {
  let connection: Connection | null = null;

  try {
    // Conectar ao banco de dados MySQL
    connection = await createConnection({
      host: options.host as string,
      port: options.port as number,
      user: options.user as string,
      password: options.password as string,
      database: options.database as string,
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
    console.error(`Erro ao criar banco de dados: ${options.database}`, error);
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
  entities: [OwnerTypeSchema, AddressSchema, CompanySchema, UserSchema], // Certifique-se de que o caminho para os schemas está correto
  migrations: [`${__dirname}/migrations/*.ts`], // Ajuste o caminho conforme necessário
  synchronize: false, // Defina como false para ambientes de produção
};

// Inicializar o DataSource do TypeORM
export const connectionSource = new DataSource(dataSourceOptions);
