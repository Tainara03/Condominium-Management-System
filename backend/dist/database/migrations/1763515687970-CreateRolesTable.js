"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRolesTable1763515687970 = void 0;
const typeorm_1 = require("typeorm");
class CreateRolesTable1763515687970 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'roles',
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
                    name: 'role',
                    type: 'varchar',
                    length: '50',
                    isNullable: false
                },
                {
                    name: 'level',
                    type: 'int',
                    isNullable: false
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('roles');
    }
}
exports.CreateRolesTable1763515687970 = CreateRolesTable1763515687970;
//# sourceMappingURL=1763515687970-CreateRolesTable.js.map