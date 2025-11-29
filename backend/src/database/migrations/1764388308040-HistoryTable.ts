import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class HistoryTable1764388308040 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'history',
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
                        //nome da tabela em que o evento foi criado
                        name: 'table_name',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        //id do evento
                        name: 'event_id',
                        type: 'uuid',
                        isNullable: false
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        isNullable: true,
                        default: null
                    },
                    {
                        name: 'performed_by',
                        type: 'uuid',
                        isNullable: true //deixei nulo aqui mas acho interessante criar um softdelete para usuário e impedir o delete ativamente
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ['performed_by'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'CASCADE'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('history');
    }

}
