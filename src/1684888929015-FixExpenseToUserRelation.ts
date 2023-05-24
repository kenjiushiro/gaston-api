import { MigrationInterface, QueryRunner } from "typeorm";

export class FixExpenseToUserRelation1684888929015 implements MigrationInterface {
    name = 'FixExpenseToUserRelation1684888929015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "expense"
            ADD "userId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "expense"
            ADD CONSTRAINT "FK_06e076479515578ab1933ab4375" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "expense" DROP CONSTRAINT "FK_06e076479515578ab1933ab4375"
        `);
        await queryRunner.query(`
            ALTER TABLE "expense" DROP COLUMN "userId"
        `);
    }

}
