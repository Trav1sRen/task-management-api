import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { IConfig } from 'config';

const dbConfig = <IConfig>config.get('db');
type dbType = 'postgres' | 'mysql' | 'mssql' | 'mongodb';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.get<dbType>('type'),
  host: process.env.RDS_HOSTNAME || dbConfig.get('host'),
  port: Number(process.env.RDS_PORT) || dbConfig.get('port'),
  username: process.env.RDS_USERNAME || dbConfig.get('username'),
  password: process.env.RDS_PASSWORD || dbConfig.get<string>('password'),
  database: process.env.RDS_DB_NAME || dbConfig.get<string>('database'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: Boolean(process.env.TYPEORM_SYNC) || dbConfig.get('synchronize'),
};
