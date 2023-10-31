import { DataSource } from 'typeorm';
import User from './models/User';

require('dotenv').config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: (process.env.DATABASE_PORT as unknown) as number,
  username: process.env.DATABASE_USER || '',
  password: process.env.DATABASE_PASS || '',
  database: process.env.DATABASE_NAME || '',
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
});

export default AppDataSource;
