
export class DistrictResponseDto {
  districtId: number;
  districtName: string;
  districtCode: number;
  blocks: { blockId: number; blockName: string }[];
}
