import { Router } from "express";
import { createCappedLogsCollection } from "./logs.controller.js";
import { insertLog } from "./logs.controller.js";



const router = Router();
router.post("/logs", insertLog);
router.post("/collection/logs/capped", createCappedLogsCollection);

export default router;
