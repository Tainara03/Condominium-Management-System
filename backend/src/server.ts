// import 'reflect-metadata';
// import express from "express";
// import cors from 'cors';
// import bodyParser  from 'body-parser';

// import { AppDataSource } from "./database/data-source";

// import routers from './app/routes/routes';
// import dotenv from "dotenv"



// dotenv.config()

// const app = express();

// app.use(cors());

// app.use(bodyParser.json());

// app.use(express.json());

// app.use(routers);

// const PORT = parseInt(String(process.env.PORT));

// //Conexão BD
// AppDataSource.initialize().then(async () => {

//     console.log("DataSource Connected");


//     const server = app.listen(PORT, ()=> console.log(`Server Started on port ${PORT}`))

//     // console.log("Inserting a new user into the database...")
//     // const user = new Usuario()
//     // user.nome = "Timber"
//     // user.email = "email@email.com"
//     // await AppDataSource.manager.save(user)
//     // console.log("Saved a new user with id: " + user.id)

//     // console.log("Loading users from the database...")
//     // const users = await AppDataSource.manager.find(Usuario)
//     // console.log("Loaded users: ", users)

//     // console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))
import "reflect-metadata"
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { AppDataSource } from "./database/data-source"

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

const PORT = parseInt(process.env.BACK_PORT || "3000")

async function waitForDB() {
  const { Client } = require('pg');
  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  let connected = false;
  while (!connected) {
    try {
      await client.connect();
      connected = true;
      await client.end();
    } catch (err) {
      console.log("DB not ready, retrying in 2s...");
      await new Promise(res => setTimeout(res, 2000));
    }
  }
}

async function startServer() {
    try {

        await waitForDB();
        
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
