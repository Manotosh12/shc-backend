import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('advisory')
  getWeatherForecast(
    @Query('state') state?: string,
    @Query('district') district?: string,
    @Query('block') block?: string,
    @Query('lat') lat?: string,
    @Query('lon') lon?: string,
  ) {
    if (lat && lon) {
      return this.weatherService.getForecastAdvisoryByCoords(lat, lon);
    } else if (state) {
      return this.weatherService.getForecastAdvisoryByLocation(state, district, block);
    } else {
      return { message: 'Please provide either coordinates or state for forecast advisory.' };
    }
  }
}
