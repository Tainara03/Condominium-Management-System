import "reflect-metadata"
import dotenv from "dotenv"
import { DataSource } from "typeorm"
import User from "../app/entities/User"
import Role from "../app/entities/Role"
import Unit from "../app/entities/Unit"
import Reservation from "../app/entities/Reservation"
import CommonAreas from "../app/entities/CommonAreas"
import { CreateRolesTable1763515687970 } from "./migrations/1763515687970-CreateRolesTable"
import { CreateUnitsTable1763515754646 } from "./migrations/1763515754646-CreateUnitsTable"
import { CreateUsersTable1763515876333 } from "./migrations/1763515876333-CreateUsersTable"
import { CreateReservationsTable1764340096167 } from "./migrations/1764340096167-CreateReservationsTable"
import { CreateCommonAreasTable1764340096168 } from "./migrations/1764340096168-CreateCommonAreasTable"
import { SeedInitialData1764346356542 } from "./migrations/1764346356542-SeedInitialData"

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
    entities: [Role, Unit, User, Reservation, CommonAreas],
    migrations: [CreateRolesTable1763515687970, CreateUnitsTable1763515754646, CreateUsersTable1763515876333, 
                 CreateReservationsTable1764340096167, CreateCommonAreasTable1764340096168, SeedInitialData1764346356542],
    subscribers: [],
})