import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedBillingsAndHistory1764395710090 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        // insere fatura em atraso não paga
        await queryRunner.query(`
            INSERT INTO billings (ammount,tipo_cobranca, due_date, is_paid, paid_at, description, unit_id)
            SELECT 
                500.00,
                'Condominio',
                '2025-11-01',
                false,
                NULL,
                'Cobrança de condomínio',
                (SELECT id FROM units WHERE apartment='404' AND building='A' LIMIT 1)
            WHERE NOT EXISTS (
                SELECT 1 FROM billings 
                WHERE due_date='2025-11-01'
                  AND unit_id = (SELECT id FROM units WHERE apartment='404' AND building='A' LIMIT 1)
            );
        `);

        // insere fatura paga na data correta
        await queryRunner.query(`
            INSERT INTO billings (ammount,tipo_cobranca, due_date, is_paid, paid_at, description, unit_id)
            SELECT 
                500.00,
                'Condominio',
                '2025-10-01',
                true,
                '2025-10-01',
                'Cobrança de condomínio',
                (SELECT id FROM units WHERE apartment='404' AND building='A' LIMIT 1)
            WHERE NOT EXISTS (
                SELECT 1 FROM billings 
                WHERE due_date='2025-10-01'
                  AND is_paid = true
                  AND unit_id = (SELECT id FROM units WHERE apartment='404' AND building='A' LIMIT 1)
            );
        `);

        // insere fatura em aberto sem atraso
        await queryRunner.query(`
            INSERT INTO billings (ammount, tipo_cobranca, due_date, is_paid, paid_at, description, unit_id)
            SELECT 
                500.00,
                'Condominio',
                '2026-01-01',
                false,
                NULL,
                'Cobrança de condomínio',
                (SELECT id FROM units WHERE apartment='404' AND building='A' LIMIT 1)
            WHERE NOT EXISTS (
                SELECT 1 FROM billings 
                WHERE due_date='2026-01-01'
                  AND is_paid = false
                  AND unit_id = (SELECT id FROM units WHERE apartment='404' AND building='A' LIMIT 1)
            );
        `);

    
        // insere criação das faturas acima no histórico
        await queryRunner.query(`
            INSERT INTO history (event_title, table_name, event_id, target_entity, created_at, performed_by)
            SELECT
                'Cobrança Criada', 
                'billings',
                b.id,
                b.unit_id,
                '2025-01-01 10:00:00',
                (SELECT id FROM users WHERE name='Sicero' LIMIT 1)
            FROM billings b
            WHERE b.description = 'Cobrança de condomínio'
              AND b.unit_id = (SELECT id FROM units WHERE apartment='404' AND building='A' LIMIT 1)
              AND NOT EXISTS (
                    SELECT 1 FROM history h
                    WHERE h.event_id = b.id
                      AND h.table_name = 'billings'
              );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM billings`);
        await queryRunner.query(`DELETE FROM history`);
    }

}
