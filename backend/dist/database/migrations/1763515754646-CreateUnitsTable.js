"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUnitsTable1763515754646 = void 0;
const typeorm_1 = require("typeorm");
class CreateUnitsTable1763515754646 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'units',
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
                    name: 'apartment',
                    type: 'varchar',
                    length: '6',
                    isNullable: false
                },
                {
                    name: 'building',
                    type: 'varchar',
                    length: '50',
                    isNullable: false
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('units');
    }
}
exports.CreateUnitsTable1763515754646 = CreateUnitsTable1763515754646;
//# sourceMappingURL=1763515754646-CreateUnitsTable.js.map