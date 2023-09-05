import { Sequelize } from 'sequelize';
import 'dotenv/config';

const db = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  dialect: 'postgres',
  dialectOptions: {ssl: {required: true, rejectUnauthorized: false}}
});

// para local comentamos el dialect options

export default db;