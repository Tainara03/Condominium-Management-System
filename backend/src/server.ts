import "reflect-metadata"
import express from "express"
import cors from "cors"
import { Client } from 'pg';
import { AppDataSource } from "./database/data-source"
import routers from "./app/routes/routes";
import dotenv from "dotenv";
dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'));
app.use(routers);

const PORT = parseInt(process.env.BACK_PORT || "3000")

async function waitForDB() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  let connected = false;
  let attempts = 0;
  while (attempts < 10 && !connected) {
    try {
      await client.connect();
      connected = true;
      await client.end();
    } catch (err) {
      attempts++;
      console.log("DB not ready - attempt ${attempts}/${DB_MAX_RETRIES} - retrying in 2s...");
      await new Promise(res => setTimeout(res, 2000));
    }
  }
  if (!connected) {
    throw new Error('Unable to connect to database after multiple attempts');
  }
}

async function startServer() {
  try {

    console.log('Starting server...');
    await waitForDB();
    console.log('DB reachable, initializing TypeORM DataSource...');

    await AppDataSource.initialize()
    console.log("✅ DataSource connected")

    // Roda todas as migrations pendentes automaticamente
    await AppDataSource.runMigrations()
    console.log("✅ Migrations applied")

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error("❌ Error starting server:", err)
    process.exit(1)
  }
}

startServer()
