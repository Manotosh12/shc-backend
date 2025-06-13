import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { BlockModule } from './soil/modules/block.module';
import { SoilReportBlockwiseModule } from './soil/modules/soil-report-blockwise.module';
import { StateModule } from './soil/modules/state.module';
import { DistrictModule } from './soil/modules/district.module';
import { SoilReportDistrictwiseModule } from './soil/modules/soil-report-districtwise.module';
import { SoilReportStatetwiseModule } from './soil/modules/soil-report-statewise.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, 
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
    }),

    BlockModule,
    SoilReportBlockwiseModule,
    StateModule, 
    DistrictModule,
    SoilReportDistrictwiseModule,
    SoilReportStatetwiseModule
  ],
})
export class AppModule {}
