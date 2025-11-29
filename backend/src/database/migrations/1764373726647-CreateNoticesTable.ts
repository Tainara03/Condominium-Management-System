import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNoticesTable1764373726647 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

        await queryRunner.createTable(
            new Table({
                name: "notices",
                columns: [
                    {
                        name: "id_notice",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "title",
                        type: "varchar",
                        length: "150",
                        isNullable: false
                    },
                    {
                        name: "message",
                        type: "text",
                        isNullable: false
                    },
                    {
                        name: "sent_at",
                        type: "timestamp",
                        isNullable: false
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: false
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["user_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("notices");
    }
}
