import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BlockModule } from './soil/modules/block.module';
import { SoilReportModule } from './soil/modules/soil-report.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432'), // Default to 5432 if DB_PORT is undefined
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // Set false in production(At the time of deployment)
      migrations: [__dirname + '/migrations/*{.ts,.js}'], // where migration files live
    }),
    BlockModule,SoilReportModule,
  ],
})
export class AppModule {}

