import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

// Carrega variáveis de ambiente do .env
dotenv.config();

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// conexão com o banco
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Testa conexão
pool.connect()
  .then(() => console.log('Conectado ao banco de dados'))
  .catch((err: unknown) => console.error('Erro ao conectar ao banco', err));

// Rota de teste
app.get('/', (req: Request, res: Response) => {
  res.send('Backend funcionando!');
});

// Inicia servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

export default app;
