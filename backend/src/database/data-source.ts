import "reflect-metadata"
import dotenv from "dotenv"
import { DataSource } from "typeorm"
import User from "../app/entities/User"
import Role from "../app/entities/Role"
import Unit from "../app/entities/Unit"
import { CreateRolesTable1763515687970 } from "./migrations/1763515687970-CreateRolesTable"
import { CreateUnitsTable1763515754646 } from "./migrations/1763515754646-CreateUnitsTable"
import { CreateUsersTable1763515876333 } from "./migrations/1763515876333-CreateUsersTable"


dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(String(process.env.DB_PORT)),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [Role, Unit, User],
    migrations: [CreateRolesTable1763515687970, CreateUnitsTable1763515754646, CreateUsersTable1763515876333],
    subscribers: [],
})