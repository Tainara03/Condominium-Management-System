"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFKReservationsArea = void 0;
const typeorm_1 = require("typeorm");
class AddFKReservationsArea {
    async up(queryRunner) {
        await queryRunner.createForeignKey("reservations", new typeorm_1.TableForeignKey({
            columnNames: ["area_id"],
            referencedTableName: "areas_comuns",
            referencedColumnNames: ["id_area"],
            onDelete: "RESTRICT",
            onUpdate: "CASCADE"
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable("reservations");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("area_id") !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey("reservations", foreignKey);
        }
    }
}
exports.AddFKReservationsArea = AddFKReservationsArea;
//# sourceMappingURL=1764346356541-AddFKReservationsArea.js.map