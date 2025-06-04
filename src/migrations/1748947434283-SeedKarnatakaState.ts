import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedKarnatakaState1748947434283 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO state (state_name, state_code) VALUES ('Karnataka', 29);
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DELETE FROM state WHERE state_code = 29;
    `);
    }

}
