import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUnitsTable1763515754646 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'units',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
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
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('units');
    }

}
