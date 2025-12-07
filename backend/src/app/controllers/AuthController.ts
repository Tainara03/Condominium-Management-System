import { Router, Request, Response } from "express";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import RoleRepository from "../repositories/RoleRepository";
import UnitRepository from "../repositories/UnitRepository";
import { uploadMiddleware } from "../middlewares/uploadMiddleware";

const authRouter = Router();

authRouter.post(
  "/register",
  uploadMiddleware.single("comprovante"),
  async (req: Request, res: Response) => {
    try {
      const { name, email, password, phone, role_id, unit_id } = req.body;
      const comprovante_path = req.file?.path;

      if (!name || !email || !password || !role_id || !unit_id) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const role = await RoleRepository.findById(role_id);
      if (!role) return res.status(400).json({ message: "Role not found" });

      const unit = await UnitRepository.findById(unit_id);
      if (!unit) return res.status(400).json({ message: "Unit not found" });

      const created = await UserService.createUser({
        name,
        email,
        password,
        phone,
        role_id,
        unit_id,
        comprovante_path,
      });

      const token = AuthService.signToken(created);

      return res.status(201).json({
        user: {
          id: created.id,
          name: created.name,
          email: created.email,
          role: created.role,
          unit: created.unit,
          comprovante_path: created.comprovante_path,
        },
        token,
      });
    } catch (error: any) {
      return res.status(500).json({ message: "Internal server error", detail: error.message });
    }
  }
);

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const user = await UserService.getUserByEmailRaw(email);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    if (!user.is_approved)
      return res.status(403).json({ message: "User not approved" });

    const ok = await AuthService.comparePassword(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = AuthService.signToken(user);

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        unit: user.unit,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default authRouter;
