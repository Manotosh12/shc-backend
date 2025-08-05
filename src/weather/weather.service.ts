import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';
import { generateAdvisory } from './advisory.util';

@Injectable()
export class WeatherService {
  private async getLatLon(state: string, district?: string, block?: string) {
    const location = [block, district, state, 'India'].filter(Boolean).join(', ');
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      location,
    )}&key=${process.env.OPENCAGE_API_KEY}`;

    const response = await axios.get(url);
    const result = response.data.results[0];

    if (!result) {
      throw new HttpException('Location not found', 404);
    }

    const { lat, lng } = result.geometry;
    return { lat, lon: lng };
  }

  private async fetchForecast(lat: string, lon: string) {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${lon}&days=3`;

    const response = await axios.get(url);
    return response.data;
  }

  async getForecastAdvisoryByCoords(lat: string, lon: string) {
    const data = await this.fetchForecast(lat, lon);

    const forecast = data.forecast.forecastday.map((day) => ({
      date: day.date,
      condition: day.day.condition.text,
      avgtemp_c: day.day.avgtemp_c,
      humidity: day.day.avghumidity,
      wind_kph: day.day.maxwind_kph,
      chance_of_rain: day.day.daily_chance_of_rain,
      advisory: generateAdvisory(day),
    }));

    return {
      location: data.location,
      forecast,
    };
  }

  async getForecastAdvisoryByLocation(state: string, district?: string, block?: string) {
    const { lat, lon } = await this.getLatLon(state, district, block);
    return this.getForecastAdvisoryByCoords(lat, lon);
  }
}
