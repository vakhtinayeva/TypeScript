import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  entities: ['dist/src/models/*.entity{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrations: ['migrations/*.ts'],
} as DataSourceOptions).initialize();
