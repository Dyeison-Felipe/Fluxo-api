// import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// export class CreateTableCompany1735424742687 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.createTable(
//       new Table({
//         name: 'company',
//         columns: [
//           {
//             name: 'id',
//             type: 'int',
//             isPrimary: true,
//             isGenerated: true,
//             generationStrategy: 'increment',
//           },
//           {
//             name: 'name',
//             type: 'varchar',
//             length: '255',
//             isNullable: false,
//           },
//           {
//             name: 'fantasyName',
//             type: 'varchar',
//             length: '255',
//             isNullable: true,
//           },
//           {
//             name: 'cnpj',
//             type: 'varchar',
//             length: '14',
//             isNullable: false,
//           },
//           {
//             name: 'email',
//             type: 'varchar',
//             length: '255',
//             isNullable: false,
//           },
//           {
//             name: 'phoneNumber',
//             type: 'varchar',
//             length: '11',
//             isNullable: false,
//           },
//           {
//             name: 'addressId',
//             type: 'int',
//             isNullable: false,
//           },
//           {
//             name: 'createdAt',
//             type: 'TIMESTAMP',
//             default: 'CURRENT_TIMESTAMP',
//           },
//           {
//             name: 'updatedAt',
//             type: 'TIMESTAMP',
//             isNullable: true,
//             onUpdate: 'CURRENT_TIMESTAMP',
//             default: 'CURRENT_TIMESTAMP',
//           },
//           {
//             name: 'deletedAt',
//             type: 'TIMESTAMP',
//             isNullable: true,
//           },
//         ],
//         foreignKeys: [
//           {
//             columnNames: ['addressId'],
//             referencedTableName: 'address',
//             referencedColumnNames: ['id'],
//           },
//         ],
//       }),
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {}
// }
