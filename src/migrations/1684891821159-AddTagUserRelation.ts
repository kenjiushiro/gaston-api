import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTagUserRelation1684891821159 implements MigrationInterface {
    name = 'AddTagUserRelation1684891821159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "expense_tag"
            ADD "userId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "expense_tag"
            ADD CONSTRAINT "FK_d015a6a3e3f5d6b5bc3fc30db44" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "expense_tag" DROP CONSTRAINT "FK_d015a6a3e3f5d6b5bc3fc30db44"
        `);
        await queryRunner.query(`
            ALTER TABLE "expense_tag" DROP COLUMN "userId"
        `);
    }

}
