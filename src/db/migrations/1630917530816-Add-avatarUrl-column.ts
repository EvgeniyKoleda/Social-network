import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const tableName = 'users';
const columnName = 'users';

export class AddAvatarUrlColumn1630917530816 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const tableColumn = new TableColumn({
			name: columnName,
			type: 'varchar',
			isNullable: true,
			length: '255',
		});

		await queryRunner.addColumn(tableName, tableColumn);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn(tableName, columnName);
	}
}
