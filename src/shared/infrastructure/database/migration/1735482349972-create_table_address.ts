// import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// export class CreateTableAddress1735482349972 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.createTable(
//       new Table({
//         name: 'address',
//         columns: [
//           {
//             name: 'id',
//             type: 'int',
//             isPrimary: true,
//             generationStrategy: 'increment',
//             isGenerated: true,
//           },
//           {
//             name: 'cep',
//             type: 'varchar',
//             length: '8',
//             isNullable: false,
//           },
//           {
//             name: 'country',
//             type: 'varchar',
//             length: '255',
//             isNullable: false,
//           },
//           {
//             name: 'state',
//             type: 'varchar',
//             length: '255',
//             isNullable: false,
//           },
//           {
//             name: 'city',
//             type: 'varchar',
//             length: '255',
//             isNullable: false,
//           },
//           {
//             name: 'neighborhood',
//             type: 'varchar',
//             length: '255',
//             isNullable: false,
//           },
//           {
//             name: 'street',
//             type: 'varchar',
//             length: '255',
//             isNullable: false,
//           },
//           {
//             name: 'number',
//             type: 'int',
//             length: '10',
//             isNullable: false,
//           },
//           {
//             name: 'ownerAddressId',
//             type: 'int',
//             isNullable: false,
//           },
//           {
//             name: 'complement',
//             type: 'varchar',
//             length: '255',
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
//             columnNames: ['ownerAddressId'],
//             referencedTableName: 'ownerAddress',
//             referencedColumnNames: ['id'],
//           },
//         ],
//       }),
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {}
// }
