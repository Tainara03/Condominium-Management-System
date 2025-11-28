"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommonAreasTable1764340096168 = void 0;
const typeorm_1 = require("typeorm");
class CreateCommonAreasTable1764340096168 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'areas_comuns',
            columns: [
                {
                    name: 'id_area',
                    type: 'uuid',
                    isPrimary: true,
                    isNullable: false,
                    default: "uuid_generate_v4()"
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '100',
                    isNullable: false
                },
                {
                    name: 'capacity',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'reservation_id',
                    type: 'uuid',
                    isNullable: true
                }
            ],
            foreignKeys: [
                {
                    columnNames: ["reservation_id"],
                    referencedTableName: "reservations",
                    referencedColumnNames: ["reservation_id"],
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE"
                }
            ]
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable("areas_comuns");
    }
}
exports.CreateCommonAreasTable1764340096168 = CreateCommonAreasTable1764340096168;
//# sourceMappingURL=1764340096168-CreateCommonAreasTable.js.map