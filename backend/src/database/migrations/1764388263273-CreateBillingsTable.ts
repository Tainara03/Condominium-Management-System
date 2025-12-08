import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBillingTable1764388263273 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'billings',
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
                        name: 'tipo_cobranca',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'ammount',
                        type: 'decimal',
                        isNullable: false
                    },
                    {
                        name: 'due_date',
                        type: 'timestamp',
                        isNullable: false
                    },
                    {
                        name: 'is_paid',
                        type: 'boolean',
                        isNullable: false,
                        default: false
                    },
                    {
                        name: 'file_path',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'paid_at',
                        type: 'timestamp',
                        isNullable: true,
                        default: null
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                        default: null
                    },
                    {
                        name: 'unit_id',
                        type: 'uuid',
                        isNullable: false
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ['unit_id'],
                        referencedTableName: 'units',
                        referencedColumnNames: ['id'],
                        onDelete: 'RESTRICT',
                        onUpdate: 'CASCADE'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.dropTable("billings");
    }

}
