import { Router } from "express";
import customersRouter from "@/routers/customers";

const router = Router();

router.use("/customers", customersRouter);

export default router;
