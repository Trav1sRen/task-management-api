import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5050,
  username: 'root',
  password: 'root',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
