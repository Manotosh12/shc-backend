import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import axios from 'axios';
import { HttpException } from '@nestjs/common';
import * as advisoryUtil from './advisory.util';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherService],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
  });

  describe('getForecastAdvisoryByCoords', () => {
    it('should return forecast and location data', async () => {
      // Mock weatherapi response
      const mockForecastDay = {
        date: '2024-08-04',
        day: {
          condition: { text: 'Sunny' },
          avgtemp_c: 30,
          avghumidity: 60,
          maxwind_kph: 10,
          daily_chance_of_rain: 20,
        },
      };
      const mockData = {
        location: { name: 'Test City' },
        forecast: { forecastday: [mockForecastDay] },
      };
      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      // Mock generateAdvisory
      jest.spyOn(advisoryUtil, 'generateAdvisory').mockReturnValue('Test Advisory');

      const result = await service.getForecastAdvisoryByCoords('12.34', '56.78');
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(result).toEqual({
        location: { name: 'Test City' },
        forecast: [
          {
            date: '2024-08-04',
            condition: 'Sunny',
            avgtemp_c: 30,
            humidity: 60,
            wind_kph: 10,
            chance_of_rain: 20,
            advisory: 'Test Advisory',
          },
        ],
      });
    });
  });

  describe('getForecastAdvisoryByLocation', () => {
    it('should get lat/lon and then forecast', async () => {
      // Mock geocode response
      const mockGeoData = {
        results: [
          { geometry: { lat: '12.34', lng: '56.78' } },
        ],
      };
      mockedAxios.get.mockResolvedValueOnce({ data: mockGeoData });

      // Mock weatherapi response
      const mockForecastDay = {
        date: '2024-08-04',
        day: {
          condition: { text: 'Cloudy' },
          avgtemp_c: 25,
          avghumidity: 70,
          maxwind_kph: 12,
          daily_chance_of_rain: 30,
        },
      };
      const mockWeatherData = {
        location: { name: 'Test City' },
        forecast: { forecastday: [mockForecastDay] },
      };
      mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherData });

      jest.spyOn(advisoryUtil, 'generateAdvisory').mockReturnValue('Test Advisory 2');

      const result = await service.getForecastAdvisoryByLocation('StateX', 'DistrictY', 'BlockZ');
      expect(mockedAxios.get).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        location: { name: 'Test City' },
        forecast: [
          {
            date: '2024-08-04',
            condition: 'Cloudy',
            avgtemp_c: 25,
            humidity: 70,
            wind_kph: 12,
            chance_of_rain: 30,
            advisory: 'Test Advisory 2',
          },
        ],
      });
    });

    it('should throw 404 if location not found', async () => {
      const mockGeoData = { results: [] };
      mockedAxios.get.mockResolvedValueOnce({ data: mockGeoData });

      await expect(
        service.getForecastAdvisoryByLocation('StateX', 'DistrictY', 'BlockZ')
      ).rejects.toThrow(HttpException);
    });
  });
});
