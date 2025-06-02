import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { Nutrient } from './entities/nutrient.entity';

@Injectable()
export class SoilService {
  constructor(
    private http: HttpService,
    @InjectRepository(Nutrient)
    private nutrientRepo: Repository<Nutrient>
  ) {}

  baseUrl = 'https://soilhealth4.dac.gov.in/';
  headers = {
    'content-type': 'application/json',
    'accept': 'application/json, text/plain, */*',
    'origin': 'https://soilhealth.dac.gov.in',
    'referer': 'https://soilhealth.dac.gov.in/',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site'
  };

  async fetchAllData() {
    const stateId = '63f99fbd519359b7438a84ca'; // Karnataka
    const cycle = '2024-25';

    const districts = await this.getDistricts(stateId);

    for (const district of districts) {
      const blocks = await this.getBlocks(district.id);
      for (const block of blocks) {
        const villages = await this.getVillages(block.id);
        for (const village of villages) {
          const data = await this.fetchNutrientData(stateId, district.id, block.id, village.id, cycle);
          await this.nutrientRepo.save({
            stateId,
            districtId: district.id,
            blockId: block.id,
            villageId: village.id,
            data
          });
        }
      }
    }
  }

  async postQuery(query: string, variables: any) {
  const res$ = this.http.post(this.baseUrl, { query, variables }, { headers: this.headers });
  const res = await firstValueFrom(res$);

  if (res.data?.errors) {
    throw new Error(`GraphQL error: ${res.data.errors[0].message}`);
  }

  return res.data?.data;
}

  async getDistricts(stateId: string) {
    const query = `
      query { getDistrictsByState(stateId: "${stateId}") { id name } }
    `;
    const data = await this.postQuery(query, {});
    return data.getDistrictsByState;
  }

  async getBlocks(districtId: string) {
    const query = `
      query { getBlocksByDistrict(districtId: "${districtId}") { id name } }
    `;
    const data = await this.postQuery(query, {});
    return data.getBlocksByDistrict;
  }

  async getVillages(blockId: string) {
    const query = `
      query { getVillagesByBlock(blockId: "${blockId}") { id name } }
    `;
    const data = await this.postQuery(query, {});
    return data.getVillagesByBlock;
  }

  async fetchNutrientData(state: string, district: string, block: string, village: string, cycle: string) {
    const query = `
      query GetNutrientDashboardForPortal(
        $state: ID, $district: ID, $block: ID, $village: ID, $cycle: String, $count: Boolean
      ) {
        getNutrientDashboardForPortal(
          state: $state, district: $district, block: $block, village: $village,
          cycle: $cycle, count: $count
        )
      }
    `;
    const variables = { state, district, block, village, cycle, count: false };
    const data = await this.postQuery(query, variables);
    return data.getNutrientDashboardForPortal;
  }
}
