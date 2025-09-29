import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { BlockModule } from './soil/modules/block.module';
import { SoilReportBlockwiseModule } from './soil/modules/soil-report-blockwise.module';
import { StateModule } from './soil/modules/state.module';
import { DistrictModule } from './soil/modules/district.module';
import { SoilReportDistrictwiseModule } from './soil/modules/soil-report-districtwise.module';
import { SoilReportStatetwiseModule } from './soil/modules/soil-report-statewise.module';
import { ContactModule } from './soil/modules/contact.module';
import { AuthModule } from './auth/auth.module';
import { WeatherModule } from './weather/weather.module';
import { DirectRecommendationModule } from './recommendation/direct-recommendation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WeatherModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true, // still okay for Nest
      synchronize: process.env.NODE_ENV !== 'production', // disable in prod
      ssl: process.env.NODE_ENV === 'production' 
        ? { rejectUnauthorized: false } 
        : false, // only enable SSL on Render
    }),

    BlockModule,
    SoilReportBlockwiseModule,
    StateModule,
    DistrictModule,
    SoilReportDistrictwiseModule,
    SoilReportStatetwiseModule,
    ContactModule,
    AuthModule,
    DirectRecommendationModule,
  ],
})
export class AppModule {}
