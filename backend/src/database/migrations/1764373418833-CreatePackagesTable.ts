import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePackagesTable1764373418833 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

        await queryRunner.createTable(
            new Table({
                name: "packages",
                columns: [
                    {
                        name: "id_package",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "received_at",
                        type: "timestamp",
                        isNullable: false
                    },
                    {
                        name: "status",
                        type: "enum",
                        enum: ["pending", "received"],
                        default: "'pending'"
                    },
                    {
                        name: "unit_id",
                        type: "uuid",
                        isNullable: false
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["unit_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "units",
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover enum antes de dropar tabela (PostgreSQL exige isso)
        await queryRunner.query(`DROP TYPE IF EXISTS "packages_status_enum";`);
        await queryRunner.dropTable("packages");
    }
}
