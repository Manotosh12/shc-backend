import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Village } from "../entities/village.entity";
import { Repository } from "typeorm";

@Injectable()
export class VillageService{
    constructor(
        @InjectRepository(Village)
        private villageRepository: Repository<Village>
    ) {}

    
        
}