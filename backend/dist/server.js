"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const data_source_1 = require("./database/data-source");
const routes_1 = __importDefault(require("./app/routes/routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
const PORT = parseInt(process.env.BACK_PORT || "3000");
async function waitForDB() {
    const client = new pg_1.Client({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
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
        }
        catch (err) {
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
        await data_source_1.AppDataSource.initialize();
        console.log("✅ DataSource connected");
        // Roda todas as migrations pendentes automaticamente
        await data_source_1.AppDataSource.runMigrations();
        console.log("✅ Migrations applied");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    }
    catch (err) {
        console.error("❌ Error starting server:", err);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=server.js.map