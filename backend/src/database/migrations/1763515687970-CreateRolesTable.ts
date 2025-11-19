import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRolesTable1763515687970 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'roles',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'role',
                        type: 'varchar',
                        length: '50',
                        isNullable: false
                    },
                    {
                        name: 'level',
                        type: 'int',
                        isNullable: false
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('roles');
    }

}
