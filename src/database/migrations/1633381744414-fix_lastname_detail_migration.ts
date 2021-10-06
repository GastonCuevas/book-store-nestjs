import {MigrationInterface, QueryRunner} from "typeorm";

export class fixLastnameDetailMigration1633381744414 implements MigrationInterface {
    name = 'fixLastnameDetailMigration1633381744414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user_details" ALTER COLUMN "lastname" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user_details" ALTER COLUMN "lastname" SET NOT NULL`);
    }

}
