# Condominium-Management-System

#### Usuários principais
- Síndico/Administração
- Morador
- Funcionários

#### Ideias iniciais
- Cadastro de moradores e apartamentos/unidades
- Comunicados internos
- Reserva de áreas comuns (salão de festas, churrasqueira, quadra)
- Registro de ocorrências (barulho, manutenção, segurança)
- Integração de notificações
- Controle de cobranças e condomínio

#### Arquitetura e Tecnologias
- Linguagem Backend:
→ TypeScript e Node.js
- Banco de Dados:
→ PostgreSQL
- Frontend:
→ Angular, TypeScript
- Gerenciamento de Dependências:
→ npm
- Controle de Versão:
→ Git
- Containerização:
→ Docker
- Padrão de arquitetura utilizada: 
→ MVC

#### Estrutura dos diretórios:
```bash
Condominium-Management-System/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   └── index.ts
│   ├── tests/
│   ├── prisma/orm/
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/
│   │   │   ├── shared/
│   │   │   ├── modules/
│   │   │   │   ├── moradores/
│   │   │   │   ├── comunicados/
│   │   │   │   ├── reservas/
│   │   │   │   ├── ocorrencias/
│   │   │   │   ├── cobrancas/
│   │   │   └── app.module.ts
│   │   ├── assets/
│   │   ├── environments/
│   │   └── index.html
│   ├── Dockerfile
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
├── db/
│   ├── init.sql
│   └── data/ 
│
├── docs/
│
├── docker-compose.yml
├── .gitignore
└── README.md
```
