import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableRolesPages1738065627206 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'rolespages',
				columns: [
					{
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment', // Chave primária gerada automaticamente
          },
					{
						name: 'role_id',
						type: 'int',
					},
					{
						name: 'page_id',
						type: 'int',
					},
				],
			}),
		);

		// Criar chave estrangeira para roles (role_id)
		await queryRunner.createForeignKey(
			'rolespages',
			new TableForeignKey({
				columnNames: ['role_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'role', // Nome da tabela que contém a entidade Roles
				onDelete: 'CASCADE', // Exclui os relacionamentos ao deletar um role
			}),
		);

		// Criar chave estrangeira para pages (page_id)
		await queryRunner.createForeignKey(
			'rolespages',
			new TableForeignKey({
				columnNames: ['page_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'pages', // Nome da tabela que contém a entidade Pages
				onDelete: 'CASCADE', // Exclui os relacionamentos ao deletar uma page
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
