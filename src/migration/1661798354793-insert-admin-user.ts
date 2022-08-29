import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertAdminUser1661798354793 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`INSERT INTO usuario("name", "email", "password", "type") VALUES ('Administrador', 'admin@mail.com', '4429f702260179f0611a1a0ae9d2b65869418962d5f8b0b14b9f13249dc91cb6', 'Admin');`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`DELETE FROM users WHERE name = 'Administrador';`,
		);
	}
}
