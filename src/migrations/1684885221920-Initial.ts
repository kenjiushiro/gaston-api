import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1684885221920 implements MigrationInterface {
    name = 'Initial1684885221920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "expense_currency" (
                "id" SERIAL NOT NULL,
                "name" text NOT NULL,
                CONSTRAINT "PK_0faf8e64b8acbe65bbd92366578" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "expense_tag" (
                "id" SERIAL NOT NULL,
                "name" text NOT NULL,
                CONSTRAINT "PK_b2d64750a9bb0bfc97a1853f1dc" PRIMARY KEY ("id")
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
                CONSTRAINT "PK_edd925b450e13ea36197c9590fc" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user_expenses_expense" (
                "userId" integer NOT NULL,
                "expenseId" integer NOT NULL,
                CONSTRAINT "PK_5423ce0ffcaa5098e40a9517c29" PRIMARY KEY ("userId", "expenseId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_2b4e8ced7cbf79379a36ba5036" ON "user_expenses_expense" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_42cb0deac63d9b39e6c48c836c" ON "user_expenses_expense" ("expenseId")
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
            CREATE TABLE "expense_user_user" (
                "expenseId" integer NOT NULL,
                "userId" integer NOT NULL,
                CONSTRAINT "PK_850b809dfba9bcc7c683a09feb8" PRIMARY KEY ("expenseId", "userId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_4f2fb95957d9e16c1016c7928d" ON "expense_user_user" ("expenseId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_bd73b3a73c60df7a5ee0700d5a" ON "expense_user_user" ("userId")
        `);
        await queryRunner.query(`
            ALTER TABLE "expense"
            ADD CONSTRAINT "FK_cf05486337b769f6c0e0cd1fac0" FOREIGN KEY ("currencyId") REFERENCES "expense_currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user_expenses_expense"
            ADD CONSTRAINT "FK_2b4e8ced7cbf79379a36ba50364" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "user_expenses_expense"
            ADD CONSTRAINT "FK_42cb0deac63d9b39e6c48c836ce" FOREIGN KEY ("expenseId") REFERENCES "expense"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "expense_tags_expense_tag"
            ADD CONSTRAINT "FK_346489aac5c60020fc11823de9e" FOREIGN KEY ("expenseId") REFERENCES "expense"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "expense_tags_expense_tag"
            ADD CONSTRAINT "FK_079c571bebe35e9b0c22711850f" FOREIGN KEY ("expenseTagId") REFERENCES "expense_tag"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "expense_user_user"
            ADD CONSTRAINT "FK_4f2fb95957d9e16c1016c7928d2" FOREIGN KEY ("expenseId") REFERENCES "expense"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "expense_user_user"
            ADD CONSTRAINT "FK_bd73b3a73c60df7a5ee0700d5ae" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "expense_user_user" DROP CONSTRAINT "FK_bd73b3a73c60df7a5ee0700d5ae"
        `);
        await queryRunner.query(`
            ALTER TABLE "expense_user_user" DROP CONSTRAINT "FK_4f2fb95957d9e16c1016c7928d2"
        `);
        await queryRunner.query(`
            ALTER TABLE "expense_tags_expense_tag" DROP CONSTRAINT "FK_079c571bebe35e9b0c22711850f"
        `);
        await queryRunner.query(`
            ALTER TABLE "expense_tags_expense_tag" DROP CONSTRAINT "FK_346489aac5c60020fc11823de9e"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_expenses_expense" DROP CONSTRAINT "FK_42cb0deac63d9b39e6c48c836ce"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_expenses_expense" DROP CONSTRAINT "FK_2b4e8ced7cbf79379a36ba50364"
        `);
        await queryRunner.query(`
            ALTER TABLE "expense" DROP CONSTRAINT "FK_cf05486337b769f6c0e0cd1fac0"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_bd73b3a73c60df7a5ee0700d5a"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_4f2fb95957d9e16c1016c7928d"
        `);
        await queryRunner.query(`
            DROP TABLE "expense_user_user"
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
            DROP INDEX "public"."IDX_42cb0deac63d9b39e6c48c836c"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_2b4e8ced7cbf79379a36ba5036"
        `);
        await queryRunner.query(`
            DROP TABLE "user_expenses_expense"
        `);
        await queryRunner.query(`
            DROP TABLE "expense"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "expense_tag"
        `);
        await queryRunner.query(`
            DROP TABLE "expense_currency"
        `);
    }

}
