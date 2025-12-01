import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedInitialData1764346356542 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        // Inserir roles padrão (somente se não existirem)
        await queryRunner.query(`
            INSERT INTO roles (role, level)
            SELECT 'morador', 1 WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role='morador');
        `);
        await queryRunner.query(`
            INSERT INTO roles (role, level)
            SELECT 'funcionario', 2 WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role='funcionario');
        `);
        await queryRunner.query(`
            INSERT INTO roles (role, level)
            SELECT 'sindico', 3 WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role='sindico');
        `);
        await queryRunner.query(`
            INSERT INTO roles (role, level)
            SELECT 'admin', 4 WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role='admin');
        `);

        // Inserir unidade padrão (somente se não existir)
        await queryRunner.query(`
            INSERT INTO units (apartment, building)
            SELECT '1', 'Administração' WHERE NOT EXISTS (
                SELECT 1 FROM units WHERE apartment='1' AND building='Administração'
            );
        `);

        // Senha padrão: admin
        const adminHash = '$2b$10$AykSXxT.W0HyB77eFZ2oyuNTkiewmrCrLrAtxGvMlL2HpCGeccPkm';

        // Inserir usuário administrador padrão (somente se não existir)
        await queryRunner.query(`
            INSERT INTO users (name, email, password_hash, phone, role_id, unit_id, is_approved, comprovante_path)
            SELECT 'Administrador', 'admin@admin.com', '${adminHash}', '11999999999',
                (SELECT id FROM roles WHERE level = 4 AND role='admin' LIMIT 1),
                (SELECT id FROM units WHERE apartment='1' AND building='Administração' LIMIT 1),
                true, NULL
            WHERE NOT EXISTS (SELECT 1 FROM users WHERE email='admin@admin.com');
        `);

        // Inserir unidade de teste (somente se não existir)
        await queryRunner.query(`
            INSERT INTO units (apartment, building)
            SELECT '404', 'A' WHERE NOT EXISTS (
                SELECT 1 FROM units WHERE apartment='404' AND building='A'
            );
        `);

        // Inserir usuários de teste (somente se não existirem)
        await queryRunner.query(`
            INSERT INTO users (name, email, password_hash, phone, role_id, unit_id, is_approved, comprovante_path)
            SELECT 'José Maria', 'jm@email.com', '${adminHash}', '11999999999',
                (SELECT id FROM roles WHERE level = 1 AND role='morador' LIMIT 1),
                (SELECT id FROM units WHERE apartment='404' AND building='A' LIMIT 1),
                true, NULL
            WHERE NOT EXISTS (SELECT 1 FROM users WHERE email='jm@email.com');
        `);

        await queryRunner.query(`
            INSERT INTO users (name, email, password_hash, phone, role_id, unit_id, is_approved, comprovante_path)
            SELECT 'Maria José', 'mj@admin.com', '${adminHash}', '11999999999',
                (SELECT id FROM roles WHERE level = 1 AND role='morador' LIMIT 1),
                (SELECT id FROM units WHERE apartment='404' AND building='A' LIMIT 1),
                false, NULL
            WHERE NOT EXISTS (SELECT 1 FROM users WHERE email='mj@admin.com');
        `);

        await queryRunner.query(`
            INSERT INTO users (name, email, password_hash, phone, role_id, unit_id, is_approved, comprovante_path)
            SELECT 'Sicero', 'sindico@email.com', '${adminHash}', '11999999999',
                (SELECT id FROM roles WHERE level = 3 AND role='sindico' LIMIT 1),
                (SELECT id FROM units WHERE apartment='1' AND building='Administração' LIMIT 1),
                true, NULL
            WHERE NOT EXISTS (SELECT 1 FROM users WHERE email='sindico@email.com');
        `);

        await queryRunner.query(`
            INSERT INTO users (name, email, password_hash, phone, role_id, unit_id, is_approved, comprovante_path)
            SELECT 'firmino', 'firmino@email.com', '${adminHash}', '11999999999',
                (SELECT id FROM roles WHERE level = 2 AND role='funcionario' LIMIT 1),
                (SELECT id FROM units WHERE apartment='1' AND building='Administração' LIMIT 1),
                true, NULL
            WHERE NOT EXISTS (SELECT 1 FROM users WHERE email='firmino@email.com');
        `);

        // Inserir áreas comuns (somente se não existirem)
        await queryRunner.query(`
            INSERT INTO areas_comuns (name, capacity)
            SELECT 'Salão de Festas', 50 WHERE NOT EXISTS (SELECT 1 FROM areas_comuns WHERE name='Salão de Festas');
        `);
        await queryRunner.query(`
            INSERT INTO areas_comuns (name, capacity)
            SELECT 'Piscina', 30 WHERE NOT EXISTS (SELECT 1 FROM areas_comuns WHERE name='Piscina');
        `);
        await queryRunner.query(`
            INSERT INTO areas_comuns (name, capacity)
            SELECT 'Churrasqueira', 20 WHERE NOT EXISTS (SELECT 1 FROM areas_comuns WHERE name='Churrasqueira');
        `);
        await queryRunner.query(`
            INSERT INTO areas_comuns (name, capacity)
            SELECT 'Academia', 15 WHERE NOT EXISTS (SELECT 1 FROM areas_comuns WHERE name='Academia');
        `);


        // Inserir reservas (somente se não existirem)
        await queryRunner.query(`
            INSERT INTO reservations (user_id, area_id, reservation_date)
            SELECT 
                (SELECT id FROM users WHERE email = 'jm@email.com' LIMIT 1),
                (SELECT id_area FROM areas_comuns WHERE name = 'Salão de Festas' LIMIT 1),
                '2025-12-01 10:00:00'
            WHERE NOT EXISTS (
                SELECT 1 FROM reservations
                WHERE user_id = (SELECT id FROM users WHERE email='jm@email.com')
                AND area_id = (SELECT id_area FROM areas_comuns WHERE name='Salão de Festas')
                AND reservation_date='2025-12-01 10:00:00'
            );
        `);

        await queryRunner.query(`
            INSERT INTO reservations (user_id, area_id, reservation_date)
            SELECT 
                (SELECT id FROM users WHERE email = 'mj@admin.com' LIMIT 1),
                (SELECT id_area FROM areas_comuns WHERE name = 'Piscina' LIMIT 1),
                '2025-12-02 14:00:00'
            WHERE NOT EXISTS (
                SELECT 1 FROM reservations
                WHERE user_id = (SELECT id FROM users WHERE email='mj@admin.com')
                AND area_id = (SELECT id_area FROM areas_comuns WHERE name='Piscina')
                AND reservation_date='2025-12-02 14:00:00'
            );
        `);

        await queryRunner.query(`
            INSERT INTO reservations (user_id, area_id, reservation_date)
            SELECT 
                (SELECT id FROM users WHERE email = 'sindico@email.com' LIMIT 1),
                (SELECT id_area FROM areas_comuns WHERE name = 'Academia' LIMIT 1),
                '2025-12-03 08:00:00'
            WHERE NOT EXISTS (
                SELECT 1 FROM reservations
                WHERE user_id = (SELECT id FROM users WHERE email='sindico@email.com')
                AND area_id = (SELECT id_area FROM areas_comuns WHERE name='Academia')
                AND reservation_date='2025-12-03 08:00:00'
            );
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM reservations`);
        await queryRunner.query(`DELETE FROM areas_comuns`);
        await queryRunner.query(`DELETE FROM users`);
        await queryRunner.query(`DELETE FROM units`);
        await queryRunner.query(`DELETE FROM roles`);
    }
}
