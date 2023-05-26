import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPassword1685027084310 implements MigrationInterface {
    name = 'AddPassword1685027084310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "password" text NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "password"
        `);
    }

}
