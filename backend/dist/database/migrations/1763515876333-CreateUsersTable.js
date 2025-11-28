"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1763515876333 = void 0;
const typeorm_1 = require("typeorm");
class CreateUsersTable1763515876333 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '100',
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'password_hash',
                    type: 'varchar',
                    length: '255',
                    isNullable: false
                },
                {
                    name: 'phone',
                    type: 'varchar',
                    length: '20',
                    isNullable: true
                },
                {
                    name: 'role_id',
                    type: 'uuid',
                    isNullable: false
                },
                {
                    name: 'unit_id',
                    type: 'uuid',
                    isNullable: false
                },
                {
                    name: 'is_approved',
                    type: 'boolean',
                    default: 'false',
                    isNullable: false
                }
            ],
            foreignKeys: [
                {
                    columnNames: ['role_id'],
                    referencedTableName: 'roles',
                    referencedColumnNames: ['id'],
                    onDelete: 'RESTRICT',
                    onUpdate: 'CASCADE'
                },
                {
                    columnNames: ['unit_id'],
                    referencedTableName: 'units',
                    referencedColumnNames: ['id'],
                    onDelete: 'RESTRICT',
                    onUpdate: 'CASCADE'
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
    }
}
exports.CreateUsersTable1763515876333 = CreateUsersTable1763515876333;
//# sourceMappingURL=1763515876333-CreateUsersTable.js.map