import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from 'typeorm';

export class CreateWalletsTable1609935775529 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'wallets',
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
						name: 'amount',
						type: 'float',
						isNullable: false,
						default: 0.0,
					},
					{
						name: 'currency',
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

		await queryRunner.createForeignKey(
			'wallets',
			new TableForeignKey({
				columnNames: ['userId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'users',
				onDelete: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "wallets"`);
	}
}
