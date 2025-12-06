import { Router } from "express";
import UnitService from "../services/UnitService";
import RoleService from "../services/RoleService";

const publicRouter = Router();

publicRouter.get('/units', async (req, res) => {
  try {
    const units = await UnitService.getAllUnits();
    return res.status(200).json(units);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

publicRouter.get('/roles', async (req, res) => {
  try {
    const roles = await RoleService.getAllRoles();
    return res.status(200).json(roles);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default publicRouter;
