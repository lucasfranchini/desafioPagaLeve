import { Router } from "express";
import * as customersController from "@/controllers/customersController";

const router = Router();

router.post("/", customersController.createNewCustomer);
router.get("/", customersController.getCustomers);

export default router;
