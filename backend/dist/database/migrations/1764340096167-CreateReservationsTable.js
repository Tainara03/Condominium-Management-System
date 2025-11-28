"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReservationsTable1764340096167 = void 0;
const typeorm_1 = require("typeorm");
class CreateReservationsTable1764340096167 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'reservations',
            columns: [
                {
                    name: 'reservation_id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                    isNullable: false
                },
                {
                    name: 'area_id',
                    type: 'uuid',
                    isNullable: true
                },
                {
                    name: 'reservation_date',
                    type: 'timestamp',
                    isNullable: false
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onDelete: 'RESTRICT',
                    onUpdate: 'CASCADE'
                }
                /*,
                {
                    columnNames: ["area_id"],
                    referencedTableName: "areas_comuns",
                    referencedColumnNames: ["id_area"],
                    onDelete: "RESTRICT",
                    onUpdate: "CASCADE"
                }*/
            ]
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('reservations');
    }
}
exports.CreateReservationsTable1764340096167 = CreateReservationsTable1764340096167;
//# sourceMappingURL=1764340096167-CreateReservationsTable.js.map