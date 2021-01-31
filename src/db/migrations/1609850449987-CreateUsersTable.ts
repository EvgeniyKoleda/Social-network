import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1609850449987 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users',
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
						name: 'firstName',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'lastName',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'fullName',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'email',
						type: 'varchar',
						isNullable: false,
						isUnique: true,
					},
					{
						name: 'birthDate',
						type: 'date',
						isNullable: false,
					},
					{
						name: 'city',
						type: 'varchar',
						isNullable: false,
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "users"`);
	}
}
