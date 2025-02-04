import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTableUser1736213678171 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'username',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'TIMESTAMP',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'TIMESTAMP',
            isNullable: true,
            onUpdate: 'CURRENT_TIMESTAMP',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deletedAt',
            type: 'TIMESTAMP',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            referencedTableName: 'role',
            referencedColumnNames: ['id'],
            columnNames: ['role'],
            onDelete: 'CASCADE'
          },
        ]
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> { }
}
