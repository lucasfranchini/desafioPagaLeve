import { Router } from "express";
import * as customersController from "@/controllers/customersController";

const router = Router();

router.post("/", customersController.createNewCustomer);
router.get("/", customersController.getCustomers);
router.get("/:id", customersController.getCustomer);
router.delete("/:id", customersController.deleteCustomer);

export default router;
