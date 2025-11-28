"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const routers = (0, express_1.Router)();
routers.get("/", (req, res) => {
    return res.json({ status: "ok" });
});
routers.use('/auth', AuthController_1.default);
routers.use('/users', UserController_1.default);
exports.default = routers;
//# sourceMappingURL=routes.js.map