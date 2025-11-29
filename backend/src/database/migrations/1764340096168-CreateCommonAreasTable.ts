import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCommonAreasTable1764340096168 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
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
            }),
            true
        ); 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("areas_comuns");
    }

}
