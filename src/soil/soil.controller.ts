import { Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { SoilService } from './soil.service';

@Controller('soil')
export class SoilController {
  constructor(private readonly soilService: SoilService) {}

  @Post('fetch')
  async fetchAll() {
    try {
      await this.soilService.fetchAllData();
      return { message: 'Data fetched and saved successfully' };
    } catch (error) {
      throw new HttpException(
        { message: 'Error fetching soil data', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}

