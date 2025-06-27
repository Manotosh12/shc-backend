import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialSchema1751001616462 implements MigrationInterface {
    name = 'CreateInitialSchema1751001616462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "soil_report_blockwise" ("blockwise_report_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "n" jsonb NOT NULL, "p" jsonb NOT NULL, "k" jsonb NOT NULL, "OC" jsonb NOT NULL, "pH" jsonb NOT NULL, "timestamp" TIMESTAMP NOT NULL, "blockBlockId" uuid, CONSTRAINT "PK_6dd1409e46731b3b9c5b0717065" PRIMARY KEY ("blockwise_report_id"))`);
        await queryRunner.query(`CREATE TABLE "blocks" ("block_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "block_name" character varying(100) NOT NULL, "districtDistrictId" uuid, CONSTRAINT "PK_954748a2efbed396553eb1c9bce" PRIMARY KEY ("block_id"))`);
        await queryRunner.query(`CREATE TABLE "soil_report_districtwise" ("districtwise_report_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "n" jsonb NOT NULL, "p" jsonb NOT NULL, "k" jsonb NOT NULL, "OC" jsonb NOT NULL, "pH" jsonb NOT NULL, "timestamp" TIMESTAMP NOT NULL, "districtDistrictId" uuid, CONSTRAINT "PK_ff1c2f90d08e90ab18cb496c48b" PRIMARY KEY ("districtwise_report_id"))`);
        await queryRunner.query(`CREATE TABLE "district" ("district_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "district_name" character varying NOT NULL, "stateStateId" uuid, CONSTRAINT "PK_d13cbacbdeab4c466c8c8dadd5d" PRIMARY KEY ("district_id"))`);
        await queryRunner.query(`CREATE TABLE "state" ("state_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "state_name" character varying NOT NULL, CONSTRAINT "PK_c6c635621335b860a10c0763e78" PRIMARY KEY ("state_id"))`);
        await queryRunner.query(`CREATE TABLE "soil_report_statewise" ("statewise_report_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "n" jsonb NOT NULL, "p" jsonb NOT NULL, "k" jsonb NOT NULL, "OC" jsonb NOT NULL, "pH" jsonb NOT NULL, "timestamp" TIMESTAMP NOT NULL, "stateStateId" uuid, CONSTRAINT "PK_07c0198e00905d8b112bff58feb" PRIMARY KEY ("statewise_report_id"))`);
        await queryRunner.query(`CREATE TABLE "contact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "designation" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "category" character varying NOT NULL, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "soil_report_blockwise" ADD CONSTRAINT "FK_9623ad01a7817d59734a9f8e28a" FOREIGN KEY ("blockBlockId") REFERENCES "blocks"("block_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blocks" ADD CONSTRAINT "FK_93d03b7d6043ae83331c5fc4bc8" FOREIGN KEY ("districtDistrictId") REFERENCES "district"("district_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "soil_report_districtwise" ADD CONSTRAINT "FK_dff56fac22ed17990964a246f1f" FOREIGN KEY ("districtDistrictId") REFERENCES "district"("district_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "district" ADD CONSTRAINT "FK_667684d74d163dd5324d1de695f" FOREIGN KEY ("stateStateId") REFERENCES "state"("state_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "soil_report_statewise" ADD CONSTRAINT "FK_865d7d732731b8ce9dc85db5e30" FOREIGN KEY ("stateStateId") REFERENCES "state"("state_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "soil_report_statewise" DROP CONSTRAINT "FK_865d7d732731b8ce9dc85db5e30"`);
        await queryRunner.query(`ALTER TABLE "district" DROP CONSTRAINT "FK_667684d74d163dd5324d1de695f"`);
        await queryRunner.query(`ALTER TABLE "soil_report_districtwise" DROP CONSTRAINT "FK_dff56fac22ed17990964a246f1f"`);
        await queryRunner.query(`ALTER TABLE "blocks" DROP CONSTRAINT "FK_93d03b7d6043ae83331c5fc4bc8"`);
        await queryRunner.query(`ALTER TABLE "soil_report_blockwise" DROP CONSTRAINT "FK_9623ad01a7817d59734a9f8e28a"`);
        await queryRunner.query(`DROP TABLE "contact"`);
        await queryRunner.query(`DROP TABLE "soil_report_statewise"`);
        await queryRunner.query(`DROP TABLE "state"`);
        await queryRunner.query(`DROP TABLE "district"`);
        await queryRunner.query(`DROP TABLE "soil_report_districtwise"`);
        await queryRunner.query(`DROP TABLE "blocks"`);
        await queryRunner.query(`DROP TABLE "soil_report_blockwise"`);
    }

}
