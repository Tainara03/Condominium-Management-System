import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddFKReservationsArea implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            "reservations",
            new TableForeignKey({
                columnNames: ["area_id"],
                referencedTableName: "areas_comuns",
                referencedColumnNames: ["id_area"],
                onDelete: "RESTRICT",
                onUpdate: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("reservations");
        const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf("area_id") !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey("reservations", foreignKey);
        }
    }
}
