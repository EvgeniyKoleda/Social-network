import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLoginsTable1612008832438 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'logins',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'login',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'password',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'userId',
						type: 'uuid',
						isNullable: false,
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "logins"`);
	}
}
