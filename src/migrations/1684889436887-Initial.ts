import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1684889436887 implements MigrationInterface {
    name = 'Initial1684889436887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "expense_tag" (
                "id" SERIAL NOT NULL,
                "name" text NOT NULL,
                CONSTRAINT "PK_b2d64750a9bb0bfc97a1853f1dc" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "expense_currency" (
                "id" SERIAL NOT NULL,
                "name" text NOT NULL,
                CONSTRAINT "PK_0faf8e64b8acbe65bbd92366578" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "email" text NOT NULL,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "expense" (
                "id" SERIAL NOT NULL,
                "amount" numeric NOT NULL,
                "description" text NOT NULL,
                "date" date NOT NULL,
                "currencyId" integer,
                "userId" integer,
                CONSTRAINT "PK_edd925b450e13ea36197c9590fc" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "expense_tags_expense_tag" (
                "expenseId" integer NOT NULL,
                "expenseTagId" integer NOT NULL,
                CONSTRAINT "PK_301d9e693865cd37910055a2f1b" PRIMARY KEY ("expenseId", "expenseTagId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_346489aac5c60020fc11823de9" ON "expense_tags_expense_tag" ("expenseId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_079c571bebe35e9b0c22711850" ON "expense_tags_expense_tag" ("expenseTagId")
        `);
        await queryRunner.query(`
            ALTER TABLE "expense"
            ADD CONSTRAINT "FK_cf05486337b769f6c0e0cd1fac0" FOREIGN KEY ("currencyId") REFERENCES "expense_currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "expense"
            ADD CONSTRAINT "FK_06e076479515578ab1933ab4375" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "expense_tags_expense_tag"
            ADD CONSTRAINT "FK_346489aac5c60020fc11823de9e" FOREIGN KEY ("expenseId") REFERENCES "expense"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "expense_tags_expense_tag"
            ADD CONSTRAINT "FK_079c571bebe35e9b0c22711850f" FOREIGN KEY ("expenseTagId") REFERENCES "expense_tag"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "expense_tags_expense_tag" DROP CONSTRAINT "FK_079c571bebe35e9b0c22711850f"
        `);
        await queryRunner.query(`
            ALTER TABLE "expense_tags_expense_tag" DROP CONSTRAINT "FK_346489aac5c60020fc11823de9e"
        `);
        await queryRunner.query(`
            ALTER TABLE "expense" DROP CONSTRAINT "FK_06e076479515578ab1933ab4375"
        `);
        await queryRunner.query(`
            ALTER TABLE "expense" DROP CONSTRAINT "FK_cf05486337b769f6c0e0cd1fac0"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_079c571bebe35e9b0c22711850"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_346489aac5c60020fc11823de9"
        `);
        await queryRunner.query(`
            DROP TABLE "expense_tags_expense_tag"
        `);
        await queryRunner.query(`
            DROP TABLE "expense"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "expense_currency"
        `);
        await queryRunner.query(`
            DROP TABLE "expense_tag"
        `);
    }

}
