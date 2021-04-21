import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameTableUser1619033728249 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('user', 'users');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('users', 'user');
  }
}
