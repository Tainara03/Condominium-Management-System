import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1763515876333 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

        await queryRunner.createTable(
            new Table({
                name: 'users',
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
                        name: 'name',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'password_hash',
                        type: 'varchar',
                        length: '255',
                        isNullable: false
                    },
                    {
                        name: 'phone',
                        type: 'varchar',
                        length: '20',
                        isNullable: true
                    },
                    {
                        name: 'role_id',
                        type: 'uuid',
                        isNullable: false
                    },
                    {
                        name: 'unit_id',
                        type: 'uuid',
                        isNullable: false
                    },
                    {
                        name: 'is_approved',
                        type: 'boolean',
                        default: 'false',
                        isNullable: true
                    },
                    {
                        name: 'comprovante_path',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ['role_id'],
                        referencedTableName: 'roles',
                        referencedColumnNames: ['id'],
                        onDelete: 'RESTRICT',
                        onUpdate: 'CASCADE'
                    },
                    {
                        columnNames: ['unit_id'],
                        referencedTableName: 'units',
                        referencedColumnNames: ['id'],
                        onDelete: 'RESTRICT',
                        onUpdate: 'CASCADE'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
