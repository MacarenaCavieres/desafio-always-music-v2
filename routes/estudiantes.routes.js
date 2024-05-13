import { Router } from "express";
import { allMethod } from "../controllers/estudiantes.controller.js";

const router = Router();

router.get("/estudiantes", allMethod.getAll);

router.get("/estudiantes/:rut", allMethod.getOne);

router.post("/estudiantes", allMethod.create);

router.delete("/estudiantes/:uid", allMethod.remove);

router.put("/estudiantes/:uid", allMethod.updateOne);

export default router;
