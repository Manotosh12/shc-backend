import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

describe('WeatherController', () => {
  let controller: WeatherController;
  let service: WeatherService;

  beforeEach(async () => {
    const mockWeatherService = {
      getForecastAdvisoryByCoords: jest.fn().mockResolvedValue({ forecast: 'ByCoords' }),
      getForecastAdvisoryByLocation: jest.fn().mockResolvedValue({ forecast: 'ByLocation' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [
        { provide: WeatherService, useValue: mockWeatherService },
      ],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
    service = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getForecastAdvisoryByCoords when lat and lon are provided', async () => {
    const result = await controller.getWeatherForecast(undefined, undefined, undefined, '12.34', '56.78');
    expect(service.getForecastAdvisoryByCoords).toHaveBeenCalledWith('12.34', '56.78');
    expect(result).toEqual({ forecast: 'ByCoords' });
  });

  it('should call getForecastAdvisoryByLocation when state is provided', async () => {
    const result = await controller.getWeatherForecast('StateX', 'DistrictY', 'BlockZ', undefined, undefined);
    expect(service.getForecastAdvisoryByLocation).toHaveBeenCalledWith('StateX', 'DistrictY', 'BlockZ');
    expect(result).toEqual({ forecast: 'ByLocation' });
  });

  it('should return message when neither coords nor state is provided', async () => {
    const result = await controller.getWeatherForecast(undefined, undefined, undefined, undefined, undefined);
    expect(result).toEqual({ message: 'Please provide either coordinates or state for forecast advisory.' });
  });
});