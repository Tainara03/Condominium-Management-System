import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateReservationsTable1764340096167 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

        await queryRunner.createTable(
            new Table({
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
                        isNullable: false
                    },
                    {
                        name: 'reservation_date',
                        type: 'timestamp',
                        isNullable: false
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '200',
                        isNullable: true
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
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('reservations');
    }

}

