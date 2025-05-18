import { Router } from "express";
import { getQr, getQrById, createQr, deleteQr } from "./qr.service.js";

const router = Router();

router.get("/codigos", getQr);

router.get("/codigos/:id", getQrById);

router.post("/codigos", createQr);

router.delete("/codigos/:id", deleteQr);

export default router;
