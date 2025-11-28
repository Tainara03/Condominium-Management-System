import "reflect-metadata"
import dotenv from "dotenv"
import { DataSource } from "typeorm"
import User from "../app/entities/User"
import Role from "../app/entities/Role"
import Unit from "../app/entities/Unit"
import { CreateRolesTable1763515687970 } from "./migrations/1763515687970-CreateRolesTable"
import { CreateUnitsTable1763515754646 } from "./migrations/1763515754646-CreateUnitsTable"
import { CreateUsersTable1763515876333 } from "./migrations/1763515876333-CreateUsersTable"
import { SeedInitialData1764098807756 } from "./migrations/1764098807756-SeedInitialData"
import { CreatePackagesTable1764373418833 } from "./migrations/1764373418833-CreatePackagesTable"
import { CreateNoticesTable1764373726647 } from "./migrations/1764373726647-CreateNoticesTable"


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
    migrations: [CreateRolesTable1763515687970, CreateUnitsTable1763515754646, CreateUsersTable1763515876333, SeedInitialData1764098807756, CreatePackagesTable1764373418833, CreateNoticesTable1764373726647],
    subscribers: [],
})