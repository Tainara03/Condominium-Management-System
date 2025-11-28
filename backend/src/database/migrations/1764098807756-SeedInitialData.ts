import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedInitialData1764098807756 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

         //Inserir roles padrão
        await queryRunner.query(`
            INSERT INTO roles (role, level) VALUES
            ('morador', 1),
            ('funcionario', 2),
            ('sindico', 3),
            ('admin', 4)
        `);

        //Aqui inseri uma unidade padrão para funcionarios, sindicos e administradores
        await queryRunner.query(`
            INSERT INTO units (apartment, building)
            VALUES ('1', 'Administração')
        `);

        
        //Senha padrão: admin
        const adminHash = '$2b$10$AykSXxT.W0HyB77eFZ2oyuNTkiewmrCrLrAtxGvMlL2HpCGeccPkm';
        
        //Inserir usuário administrador padrão
        await queryRunner.query(`
            INSERT INTO users (name, email, password_hash, phone, role_id, unit_id, is_approved)
            VALUES (
                'Administrador',
                'admin@admin.com',
                '${adminHash}',
                '11999999999',
                (SELECT id FROM roles WHERE level = '4' AND role = 'admin' LIMIT 1),
                (SELECT id FROM units WHERE apartment = '1' AND building = 'Administração' LIMIT 1),
                true
            )
        `);

        //REMOVER ANTES DE SUBIR EM PRODUÇÃO

        //inserir unidade de teste
        await queryRunner.query(`
            INSERT INTO units (apartment, building)
            VALUES ('404', 'A')
        `);

        //Inserindo alguns usuários para teste

        //Usuário aprovado pelo admin
        await queryRunner.query(`
            INSERT INTO users (name, email, password_hash, phone, role_id, unit_id, is_approved)
            VALUES (
                'José Maria',
                'jm@email.com',
                '${adminHash}',
                '11999999999',
                (SELECT id FROM roles WHERE level = '1' AND role = 'morador' LIMIT 1),
                (SELECT id FROM units WHERE apartment = '404' AND building = 'A' LIMIT 1),
                true
            )
        `);

        //Usuário não aprovado pelo admin
        await queryRunner.query(`
            INSERT INTO users (name, email, password_hash, phone, role_id, unit_id, is_approved)
            VALUES (
                'Maria José',
                'mj@admin.com',
                '${adminHash}',
                '11999999999',
                (SELECT id FROM roles WHERE level = '1' AND role = 'morador' LIMIT 1),
                (SELECT id FROM units WHERE apartment = '404' AND building = 'A' LIMIT 1),
                false
            )
        `);

        //Síndico
        await queryRunner.query(`
            INSERT INTO users (name, email, password_hash, phone, role_id, unit_id, is_approved)
            VALUES (
                'Sicero',
                'sindico@email.com',
                '${adminHash}',
                '11999999999',
                (SELECT id FROM roles WHERE level = '3' AND role = 'sindico' LIMIT 1),
                (SELECT id FROM units WHERE apartment = '1' AND building = 'Administração' LIMIT 1),
                true
            )
        `);

        await queryRunner.query(`
            INSERT INTO users (name, email, password_hash, phone, role_id, unit_id, is_approved)
            VALUES (
                'firmino',
                'firmino@email.com',
                '${adminHash}',
                '11999999999',
                (SELECT id FROM roles WHERE level = '2' AND role = 'funcionario' LIMIT 1),
                (SELECT id FROM units WHERE apartment = '1' AND building = 'Administração' LIMIT 1),
                true
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM users`);
        await queryRunner.query(`DELETE FROM units`);
        await queryRunner.query(`DELETE FROM roles`);
    }

}
