"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../app/entities/User"));
const Role_1 = __importDefault(require("../app/entities/Role"));
const Unit_1 = __importDefault(require("../app/entities/Unit"));
const Reservation_1 = __importDefault(require("../app/entities/Reservation"));
const CommonAreas_1 = __importDefault(require("../app/entities/CommonAreas"));
const _1763515687970_CreateRolesTable_1 = require("./migrations/1763515687970-CreateRolesTable");
const _1763515754646_CreateUnitsTable_1 = require("./migrations/1763515754646-CreateUnitsTable");
const _1763515876333_CreateUsersTable_1 = require("./migrations/1763515876333-CreateUsersTable");
const _1764098807756_SeedInitialData_1 = require("./migrations/1764098807756-SeedInitialData");
const _1764340096167_CreateReservationsTable_1 = require("./migrations/1764340096167-CreateReservationsTable");
const _1764340096168_CreateCommonAreasTable_1 = require("./migrations/1764340096168-CreateCommonAreasTable");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(String(process.env.DB_PORT)),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [Role_1.default, Unit_1.default, User_1.default, Reservation_1.default, CommonAreas_1.default],
    migrations: [_1763515687970_CreateRolesTable_1.CreateRolesTable1763515687970, _1763515754646_CreateUnitsTable_1.CreateUnitsTable1763515754646, _1763515876333_CreateUsersTable_1.CreateUsersTable1763515876333,
        _1764098807756_SeedInitialData_1.SeedInitialData1764098807756, _1764340096167_CreateReservationsTable_1.CreateReservationsTable1764340096167, _1764340096168_CreateCommonAreasTable_1.CreateCommonAreasTable1764340096168],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map