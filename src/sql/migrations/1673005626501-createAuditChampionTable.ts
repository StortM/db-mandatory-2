import { MigrationInterface, QueryRunner } from 'typeorm'

export class createAuditChampionTable1673005626501
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS AUDIT_CHAMPION(
          OP CHAR(1) NOT NULL,
          STAMP TIMESTAMP NOT NULL,
          USER_ID CHAR(20) NOT NULL,
          NAME VARCHAR(25)
      );
      CREATE INDEX IF NOT EXISTS AUDIT_CHAMPION_STAMP ON AUDIT_CHAMPION(STAMP);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE AUDIT_CHAMPION;`)
  }
}
