import { Router } from "express";
import { createAuthorImplicit } from "./authors.controller.js";

const router = Router();

router.post("/collection/authors", createAuthorImplicit);

export default router;
