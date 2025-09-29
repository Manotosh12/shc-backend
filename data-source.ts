import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { SoilReportStatewise } from 'src/soil/entities/soil-report-statewise';
import { State } from 'src/soil/entities/State.entity';
import { District } from 'src/soil/entities/district.entity';
import { Block } from 'src/soil/entities/block.entity';
import { SoilReportBlockwise } from 'src/soil/entities/soil-report-blockwise.entity';
import { Contact } from 'src/soil/entities/contact.entity';
import { SoilReportDistrictwise } from 'src/soil/entities/soil-report-districtwise.entity';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false, // always false in production
  logging: !isProduction,
  entities: isProduction
    ? ['dist/**/*.entity.js'] // compiled entities in production
    : [State, District, Block, SoilReportStatewise, SoilReportDistrictwise, SoilReportBlockwise, Contact],
  migrations: isProduction
    ? ['dist/migrations/*.js'] // compiled migrations in production
    : ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
  ssl: isProduction
    ? { rejectUnauthorized: false } // Render/Postgres needs SSL
    : false, // local Docker: no SSL
});
